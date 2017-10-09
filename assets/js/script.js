
$(()=>{
	require('slick-carousel')
    const Datastore = require('nedb')
    let lockedDoors
    /**function **/

    function addPropertyandValToObject(attr, val, objet={}){
        // return {attr: value} => Doesn't work
        return Object.defineProperty(objet, attr, {value: val, enumerable:true})
    }
    //This function is pure.
    //Function to create the carousel element of a door
    function doorToHtml(door){
        const removeButtonHtml="<div class='btn-in-carousel'><button class='btn-remove-btn' id='"+door.name+"'>delete</button></div>"
        return "<div class='door'><div><h3>"+door.name+"</h3></div>"+removeButtonHtml+"</div>"
    }

    function addEltToList(elt, list){
        return list.push(elt)
    }

    //Load Data
    let db = new Datastore({filename: 'keychain.db', autoload: true});
    db.loadDatabase(function(err){
        if(err){
            console.log('DB issue while loading Data')
        }
    })
    //@To remove when over
    db.remove({},{multi:true}, function(err, numRemoved){
        if(err)
            console.log(err.message)
    })
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

    function makeObjectFromUI(array){
        let object = {}
        for(elt of array){
            addPropertyandValToObject(elt.name, elt.value, object)
        }
        return object
    }


    //I wonder if it is better to to like that or to use <script>document.write(...) directly in page
    $('#node-version').text("Node "+process.versions.node)
    //It seems that it setting parameters in slick lock buttons 
    $("#addDoorBtn").on('click', ()=>{
        let door = makeObjectFromUI($('.new-door-field'))
        db.insert(door, function(err, doc){
            if(err)
                console.log(err)
            else
                addEltToList(doc, lockedDoors)
        })
        if(door){
            $('#lockedDoors').slick('slickAdd', doorToHtml(door))
        } 
    })
   $("#lockedDoors").on('afterChange', function(event, slick, currentSlide, nextSlide){
        obj = lockedDoors[currentSlide]
        $('#name').text(obj.name)
        $('#url').text(obj.url)
        $('#login').text(obj.login)
        $('#password').text(obj.password)
    })
})