//DESCRIPTION: Breaks out selected text frame from a story

if ((app.documents.length != 0) && (app.selection.length != 0)) {
 if (app.selection[0].constructor.name == "TextFrame"){
  myFrame = app.selection[0];
  myText = myFrame.texts[0];
  myDupeFrame = myFrame.duplicate();
  try{
   myText.remove();
  } catch (e) {} // An error indicates the frame was already empty
  myFrame.remove();
 }
} else {
 errorExit();
}

// +++++++ Functions Start Here +++++++++++++++++++++++

function errorExit(message) {
 if (arguments.length > 0) {
  if (app.version != 3) { beep() } // CS2 includes beep() function.
  alert(message);
 }
 exit(); // CS exits with a beep; CS2 exits silently.
}