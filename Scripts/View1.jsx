var myWindow = new Window ("dialog", "Form");
//Orientação!
myWindow.orientation = "row";
myWindow.add ("statictext", undefined, "Name:");
var myText = myWindow.add ("edittext");
myWindow.show ();

