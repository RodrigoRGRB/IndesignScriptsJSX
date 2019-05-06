var names = ["Annabel", "Bertie", "Caroline", "Debbie", "Erica"];
var w = new Window ("dialog", "Place documents", undefined, {closeButton: false});
w.alignChildren = "right";
var main = w.add ("group");
 main.add ("statictext", undefined, "Folder: ");
 var group = main.add ("group {alignChildren: 'left'}");
 if (File.fs !== "Windows") {
 var list = group.add ("dropdownlist", undefined, names);
 var e = group.add ("edittext");
 } else {
 var e = group.add ("edittext");
 var list = group.add ("dropdownlist", undefined, names);
 }
 e.text = names[0]; e.active = true;
 list.preferredSize.width = 240;
 e.preferredSize.width = 220; e.preferredSize.height = 20;

var buttons = w.add ("group")
 buttons.add ("button", undefined, "OK");
 buttons.add ("button", undefined, "Cancel");

list.onChange = function () {
 e.text = list.selection.text;
 e.active = true;
}
w.show ();