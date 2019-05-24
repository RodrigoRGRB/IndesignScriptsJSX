/*
Dimensioning - Nick Blakey 2007

This will add measurement marks and dimensions to any selected item.

This script requires that a swatch already exist for the colour "Cutter" (or "cutter")
*/

var myDocument = app.activeDocument;
var selectedObject = myDocument.selection;
var activeLayer = app.activeDocument.activeLayer;
var layerName = activeLayer.name;
activeLayer.name = "Source4Measure";

// Get position of selection bounds
var myBounds = selectedObject[0].geometricBounds;

// Set up X and Y co-ordinates
var x1 = myBounds[0];
var x2 = myBounds[2];
var y1 = myBounds[1];
var y2 = myBounds[3];

// Set up data for the Measurements
var ptWidth = myBounds[2] - myBounds[0];
var ptHeight = myBounds[1] - myBounds[3];
var tmpWidth = Math.round(ptWidth / 0.02834645);
var tmpHeight = Math.round(ptHeight / 0.02834645);
var finalWidth = tmpWidth / 100;
var finalHeight = tmpHeight / 100;

//Find Centre of Object
var xCentre = x1 + (ptWidth / 2);
var yCentre = y1 - (ptHeight / 2);

// Find Cutter swatch position
var origSwatches = myDocument.swatches;
var swatchesLength = origSwatches.length;
for (i=0;i<swatchesLength;i++) {
	if (origSwatches[i].name == "cutter" || origSwatches[i].name == "Cutter") {
		var cutterSwatch = origSwatches[i];
		}
	}

// Check if Cutter swatch is defined
if (cutterSwatch == undefined) {
	alert("Please create a cutter swatch");
	}
else {
	makeDimensions();
	releaseLayer();
}


function makeDimensions() {

// Lock the active layer to prevent colour change
activeLayer.locked = true;

// Create Measurements Layer
//Now moved to separate function
/*var mLayer = myDocument.layers.add();
//mLayer.name = "Measurements";*/
mLayerCreate();

// Set Document colors to Cutter
myDocument.defaultFillColor = cutterSwatch.color;
myDocument.defaultStrokeColor = cutterSwatch.color;
	
// Create White Color Object for Measurement Boxes
newWhite = new CMYKColor();
newWhite.black = 0;
newWhite.cyan = 0;
newWhite.magenta = 0;
newWhite.yellow = 0;

// Create groups for measurements
var yMeasure = mLayer.groupItems.add();
yMeasure.name = "Height";
var xMeasure = mLayer.groupItems.add();
xMeasure.name = "Width";

// X Measurement Line and Endpoints
var xLine1 = xMeasure.pathItems.add();
xLine1.stroked = true;
xLine1.setEntirePath ([[x1,y1+36],[xCentre - 30,y1+36]]);
var xLine2 = xMeasure.pathItems.add();
xLine2.stroked = true;
xLine2.setEntirePath ([[xCentre + 30,y1+36],[x2,y1+36]]);
var xLineEnd1 = xMeasure.pathItems.add();
xLineEnd1.stroked = true;
xLineEnd1.setEntirePath ([[x1,y1+40],[x1,y1+32]]);
var xLineEnd2 = xMeasure.pathItems.add();
xLineEnd2.stroked = true;
xLineEnd2.setEntirePath ([[x2,y1+40],[x2,y1+32]]);

// Y Measurement Line and Endpoints
var yLine1 = yMeasure.pathItems.add();
yLine1.stroked = true;
yLine1.setEntirePath ([[x2+36,y1],[x2+36,yCentre + 30]]);
var yLine2 = yMeasure.pathItems.add();
yLine2.stroked = true;
yLine2.setEntirePath ([[x2+36,yCentre - 30],[x2+36,y2]]);
var yLineEnd1 = yMeasure.pathItems.add();
yLineEnd1.stroked = true;
yLineEnd1.setEntirePath ([[x2+32,y1],[x2+40,y1]]);
var yLineEnd2 = yMeasure.pathItems.add();
yLineEnd2.stroked = true;
yLineEnd2.setEntirePath ([[x2+32,y2],[x2+40,y2]]);

/* Create Box for X Measurement text
	
Deprecated by use of two lines in measurement line	
	
var xBox = xMeasure.pathItems.rectangle (y1 + 46, xCentre - 30, 60, 20);
xBox.filled = true;
xBox.fillColor = newWhite;
xBox.fillOverprint = false;
xBox.stroked = false;*/

// Create Text for X Measurement
var xText = xMeasure.textFrames.add();
xText.contents = finalWidth + "mm";
xText.top = y1 + 42;
xText.left = xCentre;
xText.paragraphs[0].paragraphAttributes.justification = Justification.CENTER;
for (i=0;i<xText.textRange.characters.length;i++) {
	xText.characters[i].characterAttributes.fillColor = cutterSwatch.color;
}

/* Create Box for Y Measurement Text
	
Deprecated by use of two lines in measurement line	
	
var yBox = yMeasure.pathItems.rectangle (yCentre + 30, x2 + 26, 20, 60);
yBox.filled = true;
yBox.fillColor = newWhite;
yBox.fillOverprint = false;
yBox.stroked = false;*/

// Create Text for Y Measurement
var yText = yMeasure.textFrames.add();
yText.contents = finalHeight + "mm";
yText.rotate (-90); //, true, false, false, false, Transformation.CENTER);
yText.top = yCentre;
yText.left = x2 + 30;
yText.paragraphs[0].paragraphAttributes.justification = Justification.CENTER;
for (i=0;i<yText.textRange.characters.length;i++) {
	yText.characters[i].characterAttributes.fillColor = cutterSwatch.color;
	}
}

function mLayerCreate() {
	
	var mLayerNotExists = true;

// Check if measurements layer exists
for(i = 0; i < activeDocument.layers.length; i++){
	if(activeDocument.layers[i].name == "Measurements"){
		mLayer = activeDocument.activeLayer = activeDocument.layers[i]; // not using var to declare makes it global
		mLayerNotExists = false;
	}
}

// Create Measurements Layer
if(mLayerNotExists){
mLayer = myDocument.layers.add();// not using var to declare makes it global
mLayer.name = "Measurements";
}
}

function releaseLayer(){
	for(i = 0; i < activeDocument.layers.length; i++) {
		if(activeDocument.layers[i].name == "Source4Measure") {
			activeDocument.layers[i].name = layerName;
			activeDocument.layers[i].locked = false;
			activeDocument.activeLayer = activeDocument.layers[i];
			}
		}
	// Set Document colors back to Default
	black = new CMYKColor();
	black.black = 100;
	myDocument.defaultFillColor = newWhite;
	myDocument.defaultStrokeColor = black;
	}