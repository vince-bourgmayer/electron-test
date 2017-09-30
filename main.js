const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const jsonify = require('jsonify')
const Datastore = require('nedb')

const mockObject = {login:"toto", password:"titi"}
let mockData = jsonify.stringify(mockObject)
let win
//Open or create (if not exist) Database
let db = new Datastore({filename: 'db/keychain.db', autoload: true});

// function loadLockedDoor(){
// 	let sql = "SELECT Name name, Url url, Login login, Password password FROM lockeddoor ORDER BY name"
// 	db.all(sql,'',(err, rows ) => {
// 	    if (err) {
// 		    console.log(err.message)
// 		    return null
// 		}
// 		return rows
// 	});	
// }

//function to create mainWindow
function createMainWindow(){
	win = new BrowserWindow({
		width:662, 
		height:271, 
		resizable:false,
		fullscreen:false,
		fullscreenable :false,
		title: "Password Keeper"
	})
	//Disable default menu
	win.setMenu(null)
	//Load index.html
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'UI/index.html'),
		protocol: 'file:',
		slashes:true
	}))

	// let keychain = loadLockedDoor()

	//send data to HTML
	win.webContents.on('did-finish-load', () =>{
		win.webContents.send('data', mockData)
	})

	//Show Chrome dev tools
	// win.webContents.openDevTools()

	//free memory when windows is closed
	win.on('closed', () => {
		win = null
	})
}


app.on('ready', createMainWindow)

//What will happen if all windows are closed
app.on('window-all-closed', () => {
	if(process.platform !== 'darwin'){
		db.close((err) => {
  			if (err) {console.error(err.message)}
	  		console.log('Close the database connection.')
		});
		app.quit()
	}
})

app.on('activate', () => {
	if(win === null)
		createMainWindow()
})