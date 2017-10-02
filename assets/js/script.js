
$(()=>{
	require('slick-carousel')
    const Datastore = require('nedb')
    const jsonify = require('jsonify')

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
    db.insert([{name:'toto'},{name:'titi'}, {name:'toutou'}, {name:'tata'}], function(err, newDoc){
        console.log('data inserted')
    })


    db.find({}, function(err,docs){
        let slideIndex = 0
        for(doc of docs){
            $('#lockedDoors').append('<div class="door">'+(slideIndex++)+'</div>')
        }
        $('#lockedDoors').slick({
            centerMode:true,
            slidesToShow:5,
            centerPadding:'20px'
        })
        $('.slick-current').append('<button>Remove</button>')
    })

    //I wonder if it is better to to like that or to use <script>document.write(...) directly in page
    $('#node-version').text("Node "+process.versions.node)
    //It seems that it setting parameters in slick lock buttons 

})