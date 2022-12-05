const {app, BrowserWindow} = require('electron')
const path = require('path')
const child_process = require('child_process')

const __DEBUG = true

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'js/preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    win.loadFile('src/index.html')

    if(__DEBUG){
        win.webContents.openDevTools()
    }
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// handle python child thread

var pyProc = null;

const createPyProc = () => {
    if(__DEBUG){
        let script = path.join(__dirname, '..', 'server', 'main.py')
        // console.log(script);
        pyProc = child_process.spawn("C:\\Users\\hra20\\anaconda3\\envs\\thrift\\python.exe", [script])
        // console.log(pyProc)
    }
    else{
        // TODO add none debug environment arguments.
    }
    if (pyProc != null) {
        console.log('successfully start child process')
    }
}

const exitPyProc = () => {
    if(pyProc != null){
        console.log('successfully kill child process')
        pyProc.kill()
        pyProc = null
    }
}

app.on('ready', createPyProc)
app.on('will-quit', exitPyProc)
