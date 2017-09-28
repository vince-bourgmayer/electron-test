const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let win

function createWindow(){
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

	//Show Chrome dev tools
	// win.webContents.openDevTools()

	win.on('closed', () => {
		win = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if(process.platform !== 'darwin')
		app.quit()
})

app.on('activate', () => {
	if(win === null)
		createWindow()
})