
$(()=>{
	require('slick-carousel')
    const Datastore = require('nedb')
    /**function **/
    //Add a locked door (save new door in db and if everything ok, then add it to slick)
    //This function isn't pure...
    function getDataOfNewDoor(){
        // console.log('getDataOfNewDoor')
        const doorName= $('#doorName').val()
        const doorUrl= $('#doorURL').val()
        const doorLogin= $('#doorLogin').val()
        const doorPassword= $('#doorPassword').val()
        return {
            name: doorName,
            url: doorUrl,
            login: doorLogin,
            password: doorPassword
        }
    }

    //This function is pure.
    //Function to create the carousel element of a door
    function doorToHtml(door){
        const removeButtonHtml="<div class='btn-in-carousel'><button class='btn-remove-btn' id='"+door.name+"'>delete</button></div>"
        return "<div class='door'><div><h3>"+door.name+"</h3></div>"+removeButtonHtml+"</div>"
    }

    //Function to add a new door (not pure)
    function addDoor(db){
        const door = getDataOfNewDoor()
        db.insert(door, function(err, doc){
            if(err)
                console.log(err)
        })
        if(door){
            $('#lockedDoors').slick('slickAdd', doorToHtml(door))
            return 1
        } 
        return null   
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
        let slideIndex = 0
        for(doc of docs){
            $('#lockedDoors').append(doorToHtml(doc))
        }
        $('#lockedDoors').slick({
            centerMode:true,
            slidesToShow:5,
            focusOnSelect: true
        })
       $("#lockedDoors").on('afterChange', function(event, slick, currentSlide, nextSlide){
            obj = docs[currentSlide]
            $('#name').text(obj.name)
            $('#url').text(obj.url)
            $('#login').text(obj.login)
            $('#password').text(obj.password)
        })
    })

    //I wonder if it is better to to like that or to use <script>document.write(...) directly in page
    $('#node-version').text("Node "+process.versions.node)
    //It seems that it setting parameters in slick lock buttons 
    $("#addDoorBtn").on('click', ()=>{
        const res = addDoor(db)
    })

})