$(function()
{
	require('slick-carousel')
    const crypto = require('crypto')
    const Datastore = require('nedb')
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

    /*
    *
    * Init and load db
    *
    */
    const db = new Datastore({
        filename: 'db/keychain.db',
        autoload: true,
        afterSerialization: cryptData,
        beforeDeserialization:decryptData
    })
    db.loadDatabase(function(err){
        if(err)
            console.log('DB issue while loading Data')
    })
    //@To remove when over
    // db.remove({},{multi:true}, function(err, numRemoved){
    //     if(err)
    //         console.log(err.message)
    // })
    let slick = $('#lockedDoors').slick({
        centerMode:true,
        slidesToShow:5,
        focusOnSelect: true,
        prevArrow: "<button type='button' class='slick-prev'><img src='assets/images/left-arrow-red-xs.png'/></button>",
        nextArrow: "<button type='button' class='slick-next'><img src='assets/images/right-arrow-red-xs.png'/></button>"
    })
    slick.on('reInit', function(event, slick){
            if(slick.slideCount > 0) //If there is no slide
                $('#empty-text').hide()
            else //If user has removed all slide
                $('#empty-text').show()
    })
    //Create dom element from db
    db.find({}, function(err,docs){ //Find all
        if(docs.length >0){
            $('#empty-text').hide()//hide an info if there is doors 
            for(doc of docs)
            {
                $('#lockedDoors').slick('slickAdd', doorToHtml(doc))
            }     
        }
    })

    //It seems that it setting parameters in slick lock buttons 
    $("#update-btn").on('click', ()=>{
        const doorName = $('#name').text() //Get current door name from html
        const oldState = getItem(doorName)
        oldState.then(function(value)
        {
            //Create newState of the door
            let newState = Object.assign({},value)
            //Get inputs from form
            const fields = $('.update-door-field')
            //update the door object
            applyFunctionOnArray(fields, setProperty, newState)
            //update door in db --actual mode is a replace docr by doorToUpdate --
            db.update(value, newState, function(err)
            {
                if(err)
                    console.log(err)
                else
                    alert("Information updated")
            })        
        })
    })
    //if user want to add a new item
    $("#add-btn").on('click', function()
    {
        if($('#nameField').val().length <1)
            alert("You can't add an unamed element")
        else
        {
            const newDoor = {name: $('#nameField').val()} //Build a simple object from input value
            const promise1 = getNumberOfMatchingElement(newDoor) //search the number of existing element with this name
            
            promise1.then(function(value){
                //if there is no element with this name
                if(value == 0)
                    return saveNew(newDoor) //return a new Promise for db saving
                else//return a failed rejected promiss allow the second then
                    return Promise.reject('Sorry but this name already exist')
            })
            .then(function(value)
            { //db saving then process
                //If it's okay add element in carousel
                $('#lockedDoors').slick('slickAdd', doorToHtml(value))
                .slick('refresh')
                $('#nameField').val('') //reset input
            }, function(reason)
            {
                //If it's not okay (as if name already exist)
                //Alert the user with the reason
                //@NB: user can't get db error because saveNew
                //reject a predefined string
                alert(reason)
            })
        }
    })

    //If user want to delete element
    $("#delete-btn").on('click', function()
    {
        const doorName = getCurrentSlideId()
        //Supprime l'objet de la DB
        const promise = remove({name:doorName})
        promise.then(function(value)
        {

            const slickCurrentSlideIndex = $('#lockedDoors').slick('slickCurrentSlide')
            console.log(slickCurrentSlideIndex)
            //Supprime le slide dans le carousel
            $('#lockedDoors').slick('slickRemove',slickCurrentSlideIndex)
            .slick('refresh') //hard to find because it is not in the official doc!

            //Clear form
            $('#name').text('')
            $('#url').val('')
            $('#login').val('')
            $('#password').val('')
            $('#delete-btn').val('')
            $('#delete-btn').attr('disabled', true)
            alert("Item has been deleted")
        })
    })
    //Method utilisé après le changement de slide
    $("#lockedDoors").on('afterChange', function(event, slick, currentSlide)
    {
        console.log(currentSlide)
        showCurrentData()
    })

    function remove(obj)
    {
        return new Promise(function(resolve,reject)
        {
            db.remove(obj, {}, function(err, numRemoved)
            {
                if(!err)
                    resolve(numRemoved)
                else
                    reject(err)
            })
        })
    }
    //Get current door name
    function getCurrentSlideId()
    {
        return $('.slick-current').attr('id')
    }
    //Affich data of object
    function printCurrentInformation( doc )
    {
        $( '#name' ).text( doc.name )
        $( '#url' ).val( doc.url )
        $( '#login' ).val( doc.login )
        $( '#password' ).val( doc.password )   
    }
    //Get currentObject from its name
    function getItem(currentId)
    {
        //Create a promise to get data
        return new Promise(function(resolve, reject)
        {
            db.findOne({name:currentId}, function(err,doc)
            {
                if(!err)
                    resolve(doc)
                else
                    reject('getItem Ko') 
            })
        })
    }
    //Get door corresponding to current slide of carousel and print its data
    function showCurrentData()
    {
        const doorName = getCurrentSlideId() //Get current door name
        const promise = getItem(doorName) //Call function to get promise
        //If promise is kept
        promise.then(function(value)
        {
            printCurrentInformation(value)
            $('#delete-btn').attr('disabled', false)            
        })       
    }

    function getNumberOfMatchingElement(object){
        return new Promise(function(resolve, reject)
        {
            db.find(object, function(err, docs)
            {
                if(!err)
                    resolve(docs.length)
                else
                    reject(err)
            })
        })
    }
    //perfom db insert for new element
    function saveNew(newOne){
        return new Promise(function(resolve, reject)
        {
            db.insert(newOne, function(err, doc)
            {
                if(!err)
                    resolve(doc)
                else
                    reject('Insert failed')
            })
        })
    }
})
