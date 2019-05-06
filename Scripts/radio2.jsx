var w = new Window ("dialog");
var radio_group = w.add ("panel");
 radio_group.alignChildren = "left";
 radio_group.add ("radiobutton", undefined, "InDesign");
 radio_group.add ("radiobutton", undefined, "PDF");
 radio_group.add ("radiobutton", undefined, "IDML");
 radio_group.add ("radiobutton", undefined, "Text");
w.add ("button", undefined, "OK");
// set dialog defaults
radio_group.children[0].value = true;
function selected_rbutton (rbuttons)
 {
 for (var i = 0; i < rbuttons.children.length; i++)
 if (rbuttons.children[i].value == true)
 return rbuttons.children[i].text;
 }
if (w.show () == 1)
 alert ("You picked " + selected_rbutton (radio_group));