var gui = require('nw.gui');
var marked = require('marked');
var fs = require('fs');
var win = gui.Window.get();
var is_open = true;
var current_file_path;

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
    var editor_scroll = $('#editor')[0].scrollHeight + $('#editor').height();
    var preview_scroll = $('#preview')[0].scrollHeight + $('#preview').height();
    $('#editor').off('scroll');
    $('#editor').on('scroll', function (e) {
        var top = parseInt(($(this).scrollTop() / editor_scroll) * preview_scroll);
        $('#preview').scrollTop(top);
    });
    // $('#preview').on('scroll', function (e) {
    //     var top = parseInt(($(this).scrollTop() / preview_scroll) * editor_scroll);
    //     $('#editor').scrollTop(top);
    // });
}

function loadFile(file) {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        loadText(data);
    });
};

function chooseFile(name, callback) {
    var chooser = $(name);
    chooser.change(function (evt) {
        current_file_path = this.value;
        console.log(this.value);
        if (typeof callback === 'function') {
            callback($(this).val());
        }
    });

    chooser.trigger('click');
}

function writeFile(filename) {
    fs.writeFile(filename, $('#editor').val(), function (err) {
        if (err) {
            return console.log(err);
        } else {
            return alert('文件已保存！');
        }
    });
}


function initMenu() {
    var menubar = gui.Menu({
        type: 'menubar'
    });

    // 文件
    var fileMenu = gui.Menu();
    fileMenu.append(gui.MenuItem({
        label: '新建文件',
        key: "n",
        modifiers: "ctrl",
        click: function () {
            loadText('');
            $('#openFileDialog').val('');
        }
    }));
    fileMenu.append(gui.MenuItem({
        label: '打开文件',
        key: "o",
        modifiers: "ctrl",
        click: function () {
            chooseFile("#openFileDialog", function (filename) {
                loadFile(filename);
            });
        }
    }));

    fileMenu.append(gui.MenuItem({
        label: '另存为',
        key: "s",
        modifiers: "ctrl-shift",
        click: function () {
            if ($('#editor').val().trim() == '') return;
            fs.exists(current_file_path, function (exists) {
                if (exists) {
                    writeFile(current_file_path);
                } else {
                    chooseFile("#saveFileDialog", function (filename) {
                        writeFile(filename);
                    });
                }
            });
        }
    }));

    fileMenu.append(gui.MenuItem({
        label: '退出',
        key: "Esc",
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
    // tray.icon = 'img/M.png';

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