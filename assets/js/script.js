
$(()=>{
	require('slick-carousel')
    const Datastore = require('nedb')
    /**function **/
    //Add a locked door (save new door in db and if everything ok, then add it to slick)
    function addDoor(){
        door ={name:'',
            url:'',
            login:'',
            password:''
        }
        db.insert(door, function(err, newDoor){
            if(!err)
                $('#lockedDoors').slick('slickAdd', doorToHtml(door))
        })
    }

    function doorToHtml(door){
        const addButtonHtml ="<div class='btn-in-carousel'><button onclick='printCreateDoorForm()'class='btn-add-door'>New door...</button></div>"
        const removeButtonHtml="<div class='btn-in-carousel'><button class='btn-remove-btn' id='"+door.name+"'>delete</button></div>"
        return "<div class='door'>"+addButtonHtml+"<div><h3>"+door.name+"</h3></div>"+removeButtonHtml+"</div>"
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
    //@To remove when over
    db.insert([{name:'toto'},{name:'toto'},{name:'toto'},{name:'toto'},{name:'titi'}, {name:'toutou'}, {name:'tata'}], function(err, newDoc){
        console.log('data inserted')
    })

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
    })

    //I wonder if it is better to to like that or to use <script>document.write(...) directly in page
    $('#node-version').text("Node "+process.versions.node)
    //It seems that it setting parameters in slick lock buttons 

})