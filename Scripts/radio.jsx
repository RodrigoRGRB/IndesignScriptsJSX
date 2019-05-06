var w = new Window ("dialog");
w.alignChildren = "left";
var radio1 = w.add ("radiobutton", undefined, "Prefer white");
var radio2 = w.add ("radiobutton", undefined, "Prefer black and white");
radio1.value = true;
w.show ();