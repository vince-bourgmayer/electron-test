
$(()=>{
	require('slick-carousel')
    const crypto = require('crypto')
    const Datastore = require('nedb')
    window.lockedDoors = []
    //Just for test
    const algo = "aes192"
    const password = 'toto'


    function cryptData(data){
        const cipher = crypto.createCipher(algo,password) //Cipher instance can only crypt one data
        let crypted = cipher.update(data,'utf8','base64')
        crypted += cipher.final('base64')
        return crypted
    }
    function decryptData(crypted){
        const decipher = crypto.createDecipher(algo,password)
        let data = decipher.update(crypted,'base64','utf8')
        data += decipher.final('utf8')
        return data
    }

    //Load Data
    let db = new Datastore({
        filename: 'db/keychain.db',
        autoload: true,
        afterSerialization: cryptData,
        beforeDeserialization:decryptData
    });
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
    $("#delete-btn").on('click', function(){
        const index = $(this).val()
        obj = window.lockedDoors.slice(index, 1) //Supprime de la liste courante
        //Il faut supprimer de la BDD
        $('#lockedDoors').slick('slickRemove',$(this).val())
        $('#name').text('')
        $('#url').val('')
        $('#login').val('')
        $('#password').val('')
        $('#delete-btn').val()
        $('#delete-btn').attr('disabled', true)
        //little problems index of lockedoors are decaled
    })
    //Method utilisé après le changement de slide
    $("#lockedDoors").on('afterChange', function(event, slick, currentSlide, nextSlide){
        console.log('afterchange')        
        obj = window.lockedDoors[currentSlide]
        $('#name').text(obj.name)
        $('#url').val(obj.url)
        $('#login').val(obj.login)
        $('#password').val(obj.password)
        $('#delete-btn').val(currentSlide)
        $('#delete-btn').attr('disabled', false)

        //enable delete-btn 
        //But what if user destroy all door? in this cas delete-btn should be disable 
    })




})