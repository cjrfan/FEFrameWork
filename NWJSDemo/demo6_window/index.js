var gui = require('nw.gui');
var win = nw.Window.get();
// win.on('minimize', function () {
//     console.log('window is minimized');
//     var element = document.createElement('div');
//     element.appendChild(document.createTextNode('窗口最小化'));
//     document.body.appendChild(element);
// });
// win.minimize();
// win.removeAllListeners('minimize');//去除最小化监听事件

// var new_win = nw.Window.get(
//     window.open('http://www.baidu.com')
// );

// new_win.on('focus', function () {
//     var element = document.createElement('div');
//     element.appendChild(document.createTextNode('新窗口被激活'));
//     document.body.appendChild(element);
//     //Unlisten the minimize event
//     win.removeAllListeners('minimize');
// });

// nw.Window.open('https://github.com', {}, function (new_win) {
//     // And listen to new window's focus event
//     new_win.on('focus', function () {
//         console.log('New window is focused');
//         var element = document.createElement('div');
//         element.appendChild(document.createTextNode('New window is focused'));
//         document.body.appendChild(element);
//     });
// });


console.log('win.window',win.window);
console.log('win.x',win.x);
console.log('win.y',win.y);
console.log('win.width',win.width);
console.log('win.height',win.height);
console.log('win.title',win.title);
console.log('win.menu',win.menu);
console.log('win.isFullscreen',win.isFullscreen);
console.log('win.isTransparent',win.isTransparent);
console.log('win.isKioskMode',win.isKioskMode);
console.log('win.zoomLevel',win.zoomLevel);
console.log('win.isTransparent',win.isTransparent);
console.log('win.isTransparent',win.isTransparent);
console.log('win.isTransparent',win.isTransparent);
console.log('win.isTransparent',win.isTransparent);


// win.x = 0;
// win.y = 0;

var windowWidth = win.width;
var windowHeight = win.height;

if (win.window == window) { //比较是否为DOM window
    var element = document.createElement('div');
    element.appendChild(document.createTextNode('Window.window 和DOM window对象相同' + '------nativeWidth:' + windowWidth));
    document.body.appendChild(element);
}

function changeTitle() {
    win.title = "新标题";
}

function min() {
    win.minimize();
}

function max() {
    win.maximize();
}

function full() {
    win.toggleFullscreen();
}

function closeWin() {
    win.close();
}

function minTo() {
    var tray;
    win.hide();
    tray = new gui.Tray({
        icon: 'logo.png'
    });
    tray.on('click', function () {
        win.show();
        this.remove();
        tray = null;
    });
}

function takeSnapshot() {
    win.capturePage(function (img) {
        var base64Data = img.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
        require("fs").writeFile(new Date().getTime() + ".png", base64Data, 'base64', function (err) {
            console.log(err);
        });
    }, 'png');
}

// win.moveTo(800,400);
// win.moveBy(100,200);
// win.resizeTo(400, 200);
// win.resizeBy(100, 100)
// win.focus()
// win.blur()
// win.show()
// win.hide()

// win.on('close', function () {
//     this.hide(); // 阻止关闭窗口
//     console.log("We're closing...");
//     this.close(true); // 强制关闭窗口
// });

// win.close();

// win.reload()
// win.maximize()
// win.minimize()
// win.restore()
// win.enterFullscreen()
// win.leaveFullscreen()
// win.toggleFullscreen()