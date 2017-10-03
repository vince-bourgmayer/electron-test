const {app, BrowserWindow, ipcMain} = require('electron')
// const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const jsonify = require('jsonify')

let mainWindow
let doorCreationWindow

//function to create mainWindow
function createMainWindow(){
	mainWindow = new BrowserWindow({
		width:662, 
		height:350, 
		resizable:false,
		fullscreen:false,
		fullscreenable :false,
		title: "Password Keeper"
	})
	doorCreationWindow = new BrowserWindow({
		parent:mainWindow,
		width: 300,
		height: 300,
		fullscreen: false,
		fullscreenable: false,
		resizable:false,
		show:false})
	//Disable default menu
	mainWindow.setMenu(null)
	//Load index.html
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes:true
	}))
	doorCreationWindow.loadURL(url.format({
		pathname:path.join(__dirname, '/assets/html/doorCreation.html'),
		protocol: 'file',
		slashes: true
	}))

	ipcMain.on('asynchronous-message', (event, arg)=>{
		if(arg == 'createDoor')
			doorCreationWindow.show()
	})

	//Show Chrome dev tools
	// mainWindow.webContents.openDevTools()

	//free memory when windows is closed
	mainWindow.on('closed', () => {
		mainWindow = null
	})
}

app.on('ready', createMainWindow)

//What will happen if all windows are closed
app.on('window-all-closed', () => {
	if(process.platform !== 'darwin'){
		app.quit()
	}
})

app.on('activate', () => {
	if(mainWindow === null)
		createMainWindow()
})

