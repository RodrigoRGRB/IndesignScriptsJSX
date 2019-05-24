//ADICIONA OVERPRINT APENAS NO PRETO 100% (TANTO NO "FILL" QUANTO NO "STROKE"

// Selects all paths not part of a compound path
//if ( app.documents.length > 0 ) {
doc = app.activeDocument;
count = 0;
if ( doc.pathItems.length > 0 ) {
thePaths = doc.pathItems;
numPaths = thePaths.length;
for ( contadorCMYK = 0; contadorCMYK < doc.pathItems.length; contadorCMYK++ ) {
itm = doc.pathItems[contadorCMYK];

//alert(itm.filled);
//if(itm.filled && itm.fillColor !=  "[CMYKColor]"){

if(itm.filled && itm.fillColor ==  "[SpotColor]" && itm.fillColor.spot.name !=  "Professor"){
	
if(itm.fillColor.black != 0 || itm.fillColor.cyan != 0 || itm.fillColor.magenta != 0 || itm.fillColor.yellow != 0 ){

//alert(itm.fillColor.spot.name);

var CMYKvalues= itm.fillColor.spot.color;  
//alert(CMYKvalues);

/*
alert(newCMYKColor.black);
alert(newCMYKColor.cyan);
alert(newCMYKColor.yellow);
alert(newCMYKColor.magenta);
*/

// Use the color object in the path item
itm.fillColor = CMYKvalues;
}
}

//alert(itm.stroked);
//if(itm.stroked && itm.strokeColor !=  "[CMYKColor]"){
if(itm.stroked && itm.strokeColor ==  "[SPOTColor]" && itm.strokeColor.spot.name !=  "Professor"){
if(itm.strokeColor.black != 0 || itm.strokeColor.cyan != 0 || itm.strokeColor.magenta != 0 || itm.strokeColor.yellow != 0 ){

//alert(itm.strokeColor);

var CMYKvalues= itm.strokeColor.spot.color;  
//alert(CMYKvalues);

/*
alert(newCMYKColor.black);
alert(newCMYKColor.cyan);
alert(newCMYKColor.yellow);
alert(newCMYKColor.magenta);
*/

// Use the color object in the path item
itm.strokeColor = CMYKvalues;
}

}
}

}
//}