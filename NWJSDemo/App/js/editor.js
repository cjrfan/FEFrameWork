var gui = require('nw.gui');
var marked = require('marked');
var fs = require('fs');
var win = gui.Window.get();
var is_open = true;

function reload() {
    var renderer = new marked.Renderer();

    marked.setOptions({
        renderer: renderer,
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
    });
    marked.setOptions({
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });

    var text = $('#editor').val();
    $('#preview').html(marked(text));
}

function loadText(text) {
    var editor = $('#editor');
    editor.val(text);
    reload();
}

function loadFile(file) {
    console.log(file)
    fs.readFile(file, 'utf8', function (err, data) {
        console.log(data);
        if (err) {
            return console.log(err);
        }
        loadText(data);
    });
};

function chooseFile(name, callback) {
    var chooser = $(name);
    chooser.change(function (evt) {
        if (typeof callback === 'function') {
            callback($(this).val());
        }
    });

    chooser.trigger('click');
}

function initMenu() {
    var menubar = gui.Menu({
        type: 'menubar'
    });

    // 文件
    var fileMenu = gui.Menu();
    fileMenu.append(gui.MenuItem({
        label: '新建文件',
        click: function () {
            loadText('');
            $('#openFileDialog').val('');
        }
    }));
    fileMenu.append(gui.MenuItem({
        label: '打开文件',
        click: function () {
            chooseFile("#openFileDialog", function (filename) {
                loadFile(filename);
            });
        }
    }));

    fileMenu.append(gui.MenuItem({
        label: '保存',
        click: function () {
            chooseFile("#saveFileDialog", function (filename) {
                var editor = $('#editor');
                fs.writeFile(filename, editor.val(), function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        return alert('文件已保存！');
                    }
                });
            });
        }
    }));

    fileMenu.append(gui.MenuItem({
        label: '退出',
        click: function () {
            gui.App.quit();
        }
    }));

    menubar.append(gui.MenuItem({
        label: '文件',
        submenu: fileMenu
    }));

    // 帮助
    var helpMenu = gui.Menu();
    helpMenu.append(gui.MenuItem({
        label: '关于',
        click: function () {
            if (is_open) {
                nw.Window.open('../html/about.html', {
                    "width": 300,
                    "height": 200,
                    "position": 'center',
                    "focus": true,
                    "resizable": false
                }, function (new_win) {
                    is_open = false;
                });
            }
        }
    }));

    menubar.append(gui.MenuItem({
        label: '帮助',
        submenu: helpMenu
    }));

    win.menu = menubar;
}

// 系统托盘
function showTray() {
    var tray;
    win.hide();
    tray = new gui.Tray({
        icon: 'img/M2.png'
    });
    tray.tooltip = 'hello Markdown';

    var menu = gui.Menu();
    menu.append(gui.MenuItem({
        label: '打开主界面',
        click: function () {
            win.show();
            win.restore();
            tray.remove();
            tray = null;
        }
    }));
    menu.append(gui.MenuItem({
        label: '退出',
        click: function () {
            gui.App.quit();
        }
    }));
    tray.menu = menu;
    tray.on('click', function () {
        win.show();
        win.restore();
        this.remove();
        tray = null;
    });
}


$(function () {
    initMenu();

    // if (gui.App.argv.length > 0) {
    //     loadFile(gui.App.argv[0]);
    // }

    $('.editor').on('input propertychange', function (e) {
        reload();
    });

    // tabOverride.set(document.getElementsByTagName('textarea'));

    // 最小化显示托盘
    win.on('minimize', function () {
        showTray();
    });
});