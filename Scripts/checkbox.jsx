var w = new Window ("dialog");
var check1 = w.add ("checkbox", undefined, "Prefer white");
var check2 = w.add ("checkbox", undefined, "Prefer black and white");
check1.value = true;
w.show ();