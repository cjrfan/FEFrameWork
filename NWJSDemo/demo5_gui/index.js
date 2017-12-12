var path = require('path'),
    fs = require('fs'),
    ROOT = path.dirname(process.execPath),
    LOG_PATCH = ROOT + '\\logs',
    FILE_PATCH = ROOT + '\\files',
    CONFIG_FILE = ROOT + '\\config.json',
    DEFAULT_CONFIG = {port: 4646, path: FILE_PATCH};

console.log(process);
console.log(ROOT);
console.log(LOG_PATCH);
console.log(FILE_PATCH);
console.log(CONFIG_FILE);
console.log(DEFAULT_CONFIG);

var gui = require('nw.gui');
var menubar = new gui.Menu({ type: 'menubar' });
var sub1 = new gui.Menu();

sub1.append(new gui.MenuItem({
    label: '子菜单1',
    click: function () {
        var element = document.createElement('div');
        element.appendChild(document.createTextNode('Test 1'));
        document.body.appendChild(element);
    }
}));

menubar.append(new gui.MenuItem({ label: '菜单1', submenu: sub1 }));
var win = gui.Window.get();
win.menu = menubar;

console.log(getDay() + '、' + getTime()+'、'+getIPAdress());


function getDay() {
    var date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();
    return year + '-' + digit(month) + '-' + digit(day);
}
function getTime() {
    var date = new Date(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds();
    return digit(hour) + ':' + digit(minute) + ':' + digit(second);
}
/**
 * 转成两位数
 * @param {*} num 
 */
function digit(num) {
    return num < 10 ? ('0' + num) : ('' + num);
}

/**
 * @param [in] dirpath 要创建的目录,支持多层级创建
 */
function mkdirsSync(dirpath, mode) {
    try {
        if (!fs.existsSync(dirpath)) {
            var pathtmp;
            dirpath.split(/[/\\]/).forEach(function (dirname) {  //这里指用/ 或\ 都可以分隔目录  如  linux的/usr/local/services   和windows的 d:\temp\aaaa
                if (pathtmp) {
                    pathtmp = path.join(pathtmp, dirname);
                } else {
                    pathtmp = dirname;
                }
                if (!fs.existsSync(pathtmp)) {
                    if (!fs.mkdirSync(pathtmp, mode)) {
                        return false;
                    }
                }
            });
        }
        return true;
    } catch (e) {
        console.log("create director fail! path=" + dirpath + " errorMsg:" + e);
        return false;
    }
}

//获取本地IP
function getIPAdress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

function saveLog(text, file_name) {
    if (!fs.existsSync(LOG_PATCH)) {
        mkdirsSync(LOG_PATCH);
    }

    file_name = file_name || getDay();
    fs.open(LOG_PATCH + '\\' + file_name + '.log', 'a', function (err, fd) { //把查询记录写进日志,一天一份
        if (!err) {
            fs.write(fd, text + "\r\n", function (err, len, str) {
                fs.close(fd);
            });
        }
    });
}