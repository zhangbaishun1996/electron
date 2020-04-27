const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const loginUrl = 'https://p.deliyun.cn/login'
const filter = {
  urls: ["https://p.deliyun.cn/login"]
};
/*获取electron窗体的菜单栏*/
const Menu = electron.Menu
/*隐藏electron创听的菜单栏*/
Menu.setApplicationMenu(null)
let loginUrlReg = new RegExp('^https://p.deliyun.cn/login')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
	  show: false
	  ,title: '智慧物业管理平台'
	  ,titleBarStyle: 'hidden'
	})
  // mainWindow.webContents.openDevTools();
  // and load the index.html of the app.
  mainWindow.setMenu(null)
  mainWindow.maximize()
  mainWindow.show()
  mainWindow.loadURL(loginUrl+'?type=zx')
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
  mainWindow.on('page-title-updated', function(event) {event.preventDefault()})
  
   electron.session.defaultSession.webRequest.onBeforeRequest(filter,(details, callback) => {
	  if(loginUrlReg.test(details.url) && details.url.indexOf("type=zx") == -1 && details.url.indexOf("loginfo") == -1) {
		 callback({redirectURL: loginUrl+'?type=zx'})
	  } else {
		  callback({cancel: false})
	  }
  }) 
  /*
  mainWindow.webContents.on('will-navigate', function(event, url){
	  if(loginUrlReg.test(url) && url.indexOf("type=zx") == -1) {
		 console.log(url)
		 mainWindow.loadURL(loginUrl+'?type=zx')
	  }
  })
  */
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
