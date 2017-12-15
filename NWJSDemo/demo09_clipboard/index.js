var gui = require('nw.gui');
// We can not create a clipboard, we have to receive the system clipboard
var clipboard = gui.Clipboard.get();
function apendText(text) {
    var element = document.createElement('div');
    element.appendChild(document.createTextNode(text));
    document.body.appendChild(element);
}
function clearText() {
    // And clear it!
    clipboard.clear();
    apendText('剪贴板内容已清除');
}
function setText() {
    // Or write something
    clipboard.set('这是node-webkit向剪贴板写的内容', 'text');
}
function getText() {
    // Read from clipboard
    var text = clipboard.get('text');
    apendText(text);
}

var isShowWindow = true;
var win = gui.Window.get();
var tray = new gui.Tray({ title: '软件', icon: 'logo.png' });
tray.tooltip = '点此打开';
//添加一个菜单
var menu = new gui.Menu();
menu.append(new gui.MenuItem({ type: 'checkbox', label: '选择我' }));
tray.menu = menu;
//click事件
tray.on('click', function () {
    if (isShowWindow) {
        win.hide();
        isShowWindow = false;
    }
    else {
        win.show();
        isShowWindow = true;
    }
});