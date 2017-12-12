// Load native UI library
var gui = require('nw.gui');
var win = gui.Window.get();
//创建window menu
var windowMenu = new gui.Menu({ type: 'menubar' });
var windowSubmenu = new gui.Menu();
var subMenuItem = new gui.MenuItem({ label: '子菜单项' ,icon:'logo.png', });
windowSubmenu.append(subMenuItem);
windowMenu.append(
    new gui.MenuItem({ label: '文件', submenu: windowSubmenu })
);
windowMenu.append(
    new gui.MenuItem({ label: '编辑', submenu: windowSubmenu })
);
win.menu = windowMenu;
// Create an empty menu
var menu = new gui.Menu();
// Add some items
menu.append(new gui.MenuItem({ label: 'Item A'}));
menu.append(new gui.MenuItem({ label: 'Item B' }));
menu.append(new gui.MenuItem({ type: 'separator' }));
menu.append(new gui.MenuItem({ label: 'Item C' }));
menu.append(new gui.MenuItem({ label: '请选择',type:'checkbox' }));
// Remove one item
menu.removeAt(1);
// Popup as context menu
menu.popup(10, 10);
// Iterate menu's items
for (var i = 0; i < menu.items.length; ++i) {
    var element = document.createElement('div');
    element.appendChild(document.createTextNode(menu.items[i].label));
    document.body.appendChild(element);
}

menu.items[0].click = function() {
    var element = document.createElement('div');
    element.appendChild(document.createTextNode('我被点击了'));
    document.body.appendChild(element);
};

document.body.addEventListener('contextmenu', function (ev) {
    ev.preventDefault();
    menu.popup(ev.x, ev.y);
    return false;
});