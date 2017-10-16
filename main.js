const {app, BrowserWindow, ipcMain} = require('electron')
// const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let mainWindow

//function to create mainWindow
function createMainWindow(){
	mainWindow = new BrowserWindow({
		width:800, 
		height:600, 
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

