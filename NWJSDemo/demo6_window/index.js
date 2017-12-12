var gui = require('nw.gui');
var win = gui.Window.get();
win.on('minimize', function () {
    var element = document.createElement('div');
    element.appendChild(document.createTextNode('窗口最小化'));
    document.body.appendChild(element);
});
win.minimize();

// var new_win = gui.Window.get(
//     window.open('http://www.baidu.com')
// );

// new_win.on('focus', function () {
//     var element = document.createElement('div');
//     element.appendChild(document.createTextNode('新窗口被激活'));
//     document.body.appendChild(element);
//     //Unlisten the minimize event
//     win.removeAllListeners('minimize');
// });

win.x = 0;
win.y = 0;

var windowWidth = win.width;
var windowHeight = win.height;

if (win.window == window) {//比较是否为DOM window
    var element = document.createElement('div');
    element.appendChild(document.createTextNode('Window.window 和DOM window对象相同' + '------nativeWidth:' + windowWidth));
    document.body.appendChild(element);
}

function changeTitle() {
    win.title = "新标题";
}

function min(){
    win.minimize();
}
function max(){
    win.maximize();
}
function full(){
    win.toggleFullscreen();
}

function closeWin(){
    win.close();
}

function minTo(){
    var tray;
    win.hide();
    tray = new gui.Tray({icon: 'logo.png'});
    tray.on('click', function () {
        win.show();
        this.remove();
        tray = null;
    });
}

function takeSnapshot() {
    win.capturePage(function (img) {
        var base64Data = img.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
        require("fs").writeFile(new Date().getTime()+".png", base64Data, 'base64', function (err) {
            console.log(err);
        });
    }, 'png');
}