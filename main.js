const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const jsonify = require('jsonify')
let win

// const doors = []
const mockObject = {login:"toto", password:"titi"}
let mockData = jsonify.stringify(mockObject)
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

app.on('window-all-closed', () => {
	if(process.platform !== 'darwin')
		app.quit()
})

app.on('activate', () => {
	if(win === null)
		createMainWindow()
})