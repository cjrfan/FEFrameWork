const electron = require('electron');//引入electron模块
const app = electron.app;//用来控制应用生命周期

const path = require('path');
const url = require('url');

const BrowserWindow = electron.BrowserWindow;//用来创建浏览器窗口
let mainWindow;//创建一个全局变量，名字任意，相当于普通网页的window对象  
// 初始化并准备创建主窗口  
app.on('ready', function () {
    // 创建一个宽800px 高500px的窗口  
    mainWindow = new BrowserWindow({
        width: 800,
        height: 500,
    });
    // 加载项目目录下的index.html  
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/index.html'),
        protocol: 'file:',
        slashes: true
    }));
    // 窗口关闭时触发  
    mainWindow.on('closed', function () {
        // 想要取消窗口对象的引用， 如果你的应用支持多窗口，你需要将所有的窗口对象存储到一个数组中，然后在这里删除想对应的元素  
        mainWindow = null
    });
});  