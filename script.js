const {remote} = require('electron')

document.getElementById('X').addEventListener('click',closeWindow);
document.getElementById('minus').addEventListener('click',minimizeWindow);

//Кнопка минимизации
function closeWindow(){
    var window = remote.getCurrentWindow()
    window.close();
}

//Кнопка закрытия
function minimizeWindow(){
    var window = remote.getCurrentWindow()
    window.minimize();
}
