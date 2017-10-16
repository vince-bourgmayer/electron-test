
$(()=>{
	require('slick-carousel')
    const Datastore = require('nedb')
    window.lockedDoors = []
    // let lockedDoors


    /**function **/
    //Function to create the carousel element of a door
    function doorToHtml(door){
        // return "<div class='door'><div><img src='assets/images/lockedDoor-green-small.png' class='img-fluid' alt='Responsive image'><h3>"+door.name+"</h3></div></div>"
        return "<div class='door'><div><div class='lock-img'></div><h5>"+door.name+"</h5></div></div>"
    }
    //Attach a property (object with name and value) to an object
    function setProperty(source, objet){
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
        window.lockedDoors = docs
        let slick = $('#lockedDoors').slick({
            centerMode:true,
            slidesToShow:5,
            focusOnSelect: true,
            prevArrow: "<button type='button' class='slick-prev'><img src='assets/images/left-arrow-red-xs.png'/></button>",
            nextArrow: "<button type='button' class='slick-next'><img src='assets/images/right-arrow-red-xs.png'/></button>"
        })
        if(window.lockedDoors.length >0){ //hide at initialisation if there is some door
            $('#no-door-text').hide()   
        }
        slick.on('reInit', function(event, slick){
                if(slick.slideCount > 0) //If there is no slide
                    $('#no-door-text').hide()
                else //If user has removed all slide
                    $('#no-door-text').show()
        })
    })

    //I wonder if it is better to to like that or to use <script>document.write(...) directly in page
    $('#node-version').text("Node "+process.versions.node)
    //It seems that it setting parameters in slick lock buttons 
    $("#update-btn").on('click', ()=>{
        //Get current door
        const doorName = $('#name').text()
        const doorIndex = window.lockedDoors.findIndex((x) => {
            return x.name === doorName
        })
        const door = window.lockedDoors[doorIndex]
        let doorToUpdate = Object.assign({},door )
        const fields = $('.update-door-field')
        //update the door object
        applyFunctionOnArray(fields, setProperty, doorToUpdate)
        //update door in db
        db.update(door, doorToUpdate, function(err){
            if(err)
                console.log(err)
            else
                //Update local list of doors
                window.lockedDoors[doorIndex]=doorToUpdate
                alert("Information updated")
        })
    })
    $("#add-btn").on('click', function(){
        if($('#nameField').val().length <1){
            alert("You can't add an unamed element")
        }else{
            let door = $('')
            let fields = $('.new-door-field')
            fields.keyup()
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
                    addEltToList(doc, window.lockedDoors)
            })
            //Update carousel
            if(door){
                $('#lockedDoors').slick('slickAdd', doorToHtml(door))
            }
            //Clear form
            applyFunctionOnArray(fields, resetValue, null)
        }
    })
    $("#lockedDoors").on('afterChange', function(event, slick, currentSlide, nextSlide){
        obj = window.lockedDoors[currentSlide]
        $('#name').text(obj.name)
        $('#url').val(obj.url)
        $('#login').val(obj.login)
        $('#password').val(obj.password)
        $('#delete-btn').val(obj.name)
    })




})