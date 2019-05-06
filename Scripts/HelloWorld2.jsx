//construindo
var win = createWindow();
//Mostrando
win.show();

//Criando função
function createWindow () {
var w = new Window ('dialog');
var m = w.add ('statictext');
m.text = 'Hello, world!';
return w;
}