const path = require('path');
const url = require('url');
const {app,BrowserWindow} = require('electron');


let win = null;

function createWindow(){
    win = new BrowserWindow({
        width:1000,
        height:600,
        frame: false,
        resizable:false,
        icon: __dirname + "/img/pensil5.png" ,
        webPreferences: {
            nodeIntegration: true
          }
        

    })

    win.loadFile('index.html');

    //win.webContents.openDevTools();

   win.on('closed',() =>{
    win = null;
})
}

app.on('ready', createWindow);
