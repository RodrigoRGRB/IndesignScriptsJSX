var w = new Window ("dialog");
var myDropdown = w.add ("dropdownlist", undefined, ["one", "two", "three"]);
myDropdown.selection = 1;
w.show ();
myChoice = myDropdown.selection.text;
alert(myChoice)

myChoice = myDropdown.selection.index;
alert(myChoice)