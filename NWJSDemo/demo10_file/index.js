var gui = require('nw.gui');
var win = gui.Window.get();
var chooser = document.querySelector('#fileDialog');

// chooser.addEventListener("change", function (evt) {
//     apendText(this.value);
// }, false);

chooser.addEventListener("change", function (evt) {
    var files = this.files;
    for (var i = 0; i < files.length; ++i)
    // apendText(files[i].name);
    apendText(files[i].path);
}, false);

function apendText(text) {
    var element = document.createElement('div');
    element.appendChild(document.createTextNode(text));
    document.body.appendChild(element);
}