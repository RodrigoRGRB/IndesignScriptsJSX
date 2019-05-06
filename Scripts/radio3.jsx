var w = new Window ("dialog");
w.orientation = "row";
var panel1 = w.add ("panel");
 for (var i = 0; i < 5; i++) {panel1.add ("radiobutton", undefined, "Rb "+i);}
var panel2 = w.add ("panel");
 for (var i = 0; i < 5; i++) {panel2.add ("radiobutton", undefined, "Rb "+i);}
panel1.children[0].value = true;
panel1.addEventListener ("click", function ()
 {
 for (var i = 0; i < panel2.children.length; i++)
 panel2.children[i].value = false;
 }
);
panel2.addEventListener ("click", function ()
 {
 for (var i = 0; i < panel1.children.length; i++)
 panel1.children[i].value = false;
 }
);
w.show();