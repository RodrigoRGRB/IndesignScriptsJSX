//ADICIONA OVERPRINT APENAS NO PRETO 100% (TANTO NO "FILL" QUANTO NO "STROKE"

// Selects all paths not part of a compound path
//if ( app.documents.length > 0 ) {
doc = app.activeDocument;
count = 0;
if ( doc.pathItems.length > 0 ) {
thePaths = doc.pathItems;
numPaths = thePaths.length;
for ( contador = 0; contador < doc.pathItems.length; contador++ ) {
itm = doc.pathItems[contador];
itm.fillOverprint = false;
itm.strokeOverprint = false;

if(itm.fillColor.black == 100 && itm.fillColor.cyan == 0 && itm.fillColor.magenta == 0 && itm.fillColor.yellow == 0 ){
itm.fillOverprint = true;
}
if(itm.strokeColor.black == 100 && itm.strokeColor.cyan == 0 && itm.strokeColor.magenta == 0 && itm.strokeColor.yellow == 0 ){
itm.strokeOverprint = true;
}

if(itm.fillColor.gray == 100){
itm.fillOverprint = true;
}
if(itm.strokeColor.gray == 100){
itm.strokeOverprint = true;
}

}
}
//}
	
	if ( app.activeDocument.textFrames.length > 0 ) {
	//alert(app.activeDocument.textFrames.length);
	var contadorLetras = app.activeDocument.textFrames.length -1;
		//alert("Existe letra");
	while (contadorLetras != -1){
	var contadorLetras2 = app.activeDocument.textFrames[contadorLetras].characters.length;
	contadorLetras2--;
	
	while(contadorLetras2 != -1){
		if(app.activeDocument.textFrames[contadorLetras].characters[contadorLetras2].fillColor.black == 100){
			//alert("letra preta");
			app.activeDocument.textFrames[contadorLetras].characters[contadorLetras2].characterAttributes.overprintFill = true;
			}	
		if(app.activeDocument.textFrames[contadorLetras].characters[contadorLetras2].fillColor.gray == 100){
			app.activeDocument.textFrames[contadorLetras].characters[contadorLetras2].overprintFill = true;
			}	
		else{
			app.activeDocument.textFrames[contadorLetras].characters[contadorLetras2].overprintFill = false;
			}
	contadorLetras2--;	
	//fecha while2
		}
	contadorLetras--;
	//fecha while1
	}
	
}