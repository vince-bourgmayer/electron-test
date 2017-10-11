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
		width:760, 
		height:500, 
		resizable:false,
		fullscreen:false,
		fullscreenable :false,
		title: "Password Keeper"
	})

	//Disable default menu
	mainWindow.setMenu(null)

	//Load index.html
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes:true
	}))

	mainWindow.webContents.on('new-window', (event, urllink, frameName) => {
		if(frameName === 'doorCreation'){
			event.preventDefault()
			const childWindow = new BrowserWindow({
			parent:mainWindow,
			width: 300,
			height: 300,
			fullscreen: false,
			fullscreenable: false,
			resizable:false,
			show:false})
			childWindow.setMenu(null)
			childWindow.once('ready-to-show', () => childWindow.show())
			childWindow.loadURL(url.format({
				pathname:path.join(__dirname, '/assets/html/doorCreation.html'),
				protocol: 'file',
				slashes: true
			}))
			event.newGuest = childWindow
		}
	})
	//Show Chrome dev tools
	mainWindow.webContents.openDevTools()

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

