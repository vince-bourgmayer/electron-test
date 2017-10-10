
$(()=>{
	require('slick-carousel')
    const Datastore = require('nedb')
    let lockedDoors
    /**function **/
    //Function to create the carousel element of a door
    function doorToHtml(door){
        //This function is pure.
        const removeButtonHtml="<div class='btn-in-carousel'><button class='btn-remove-btn' id='"+door.name+"'>delete</button></div>"
        return "<div class='door'><div><h3>"+door.name+"</h3></div>"+removeButtonHtml+"</div>"
    }
    //Attach a property to an object
    function setProperty(source, objet){
        // return {attr: value} => Doesn't work
        return Object.defineProperty(objet, source.name, {value: source.value, enumerable:true})
    }
    //Add an element to a liste and return the list
    function addEltToList(elt, list){
        return list.push(elt)
    }
    //Set value of an object to ''
    function resetValue(object){
        object.value = ''
        return object
    }
    //Function to apply a function with some extra args on array
    function applyFunctionOnArray(array, func, args){
        for(elt of array){
            func.apply(this, [elt, args])
        }
    }
    //Load Data
    let db = new Datastore({filename: 'keychain.db', autoload: true});
    db.loadDatabase(function(err){
        if(err){
            console.log('DB issue while loading Data')
        }
    })
    //@To remove when over
    // db.remove({},{multi:true}, function(err, numRemoved){
    //     if(err)
    //         console.log(err.message)
    // })
    db.find({}, function(err,docs){
        for(doc of docs){
            $('#lockedDoors').append(doorToHtml(doc))
        }
        lockedDoors = docs
        $('#lockedDoors').slick({
            centerMode:true,
            slidesToShow:5,
            focusOnSelect: true
        })
    })


    //I wonder if it is better to to like that or to use <script>document.write(...) directly in page
    $('#node-version').text("Node "+process.versions.node)
    //It seems that it setting parameters in slick lock buttons 
    $("#addDoorBtn").on('click', ()=>{
        let door = {}
        let fields = $('.new-door-field')



        //Build the door object
        applyFunctionOnArray(fields, setProperty, door)
        //Check if a door with this name already exist
        // const doorAlreadyExist = lockedDoors.findIndex({name:door.name})
        // const doorAlreadyExist = lockedDoors.indexOf(door)
        // console.log(doorAlreadyExist)
        //Save door in DB
        db.insert(door, function(err, doc){
            if(err)
                console.log(err)
            else
                addEltToList(doc, lockedDoors)
        })
        //Update carousel
        if(door){
            $('#lockedDoors').slick('slickAdd', doorToHtml(door))
        }
        //Clear form
        applyFunctionOnArray(fields, resetValue, null)
    })

    $("#lockedDoors").on('afterChange', function(event, slick, currentSlide, nextSlide){
        obj = lockedDoors[currentSlide]
        $('#name').text(obj.name)
        $('#url').text(obj.url)
        $('#login').text(obj.login)
        $('#password').text(obj.password)
    })
})