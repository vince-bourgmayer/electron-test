
$(()=>{
	require('slick-carousel')
    const jsonify = require('jsonify')
    let mockData;
    ipcRenderer.on('data',(event, message)=>{
        mockData = jsonify.parse(message)
        $('#login').append(mockData.login)
        $('#password').append(mockData.password)
    })
    //I wonder if it is better to to like that or to use <script>document.write(...) directly in page
    $('#node-version').text("Node "+process.versions.node)
    //It seems that it setting parameters in slick lock buttons 
    $('#lockedDoors').slick({
    	centerMode:true,
    	slidesToShow:5,
    	centerPadding:'20px'
    })
})