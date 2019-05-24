//ADICIONA OVERPRINT APENAS NA COR PROFESSOR (TANTO NO "FILL" QUANTO NO "STROKE")

// Selects all paths not part of a compound path
if ( app.documents.length > 0 ) {

#includepath "/I/Objetos/Scripts/Overprint&CoresSpot/"
#include "OverPrintBlack.jsx"

doc = app.activeDocument;
count = 0;
if ( doc.pathItems.length > 0 ) {
thePaths = doc.pathItems;
numPaths = thePaths.length;
for ( contador = 0; contador < doc.pathItems.length; contador++ ) {
itm = doc.pathItems[contador];
//itm.fillOverprint = false;
//itm.strokeOverprint = false;

//alert(itm.spot.name);

if(itm.fillColor == "[SpotColor]"){
	
	//alert("fill é spot");

	if(itm.fillColor.spot.name == "Professor"){
	//alert(itm.fillColor.spot.name); 
	itm.fillOverprint = true;
	}
}

if(itm.strokeColor == "[SpotColor]"){
	
	//alert("stroke é spot");
	if(itm.strokeColor.spot.name == "Professor"){
	//alert(itm.strokeColor.spot.name); 	
	itm.strokeOverprint = true;
	}

}

}
}

	if ( app.activeDocument.textFrames.length > 0 ) {
	//alert(app.activeDocument.textFrames.length);
	var contadorLetras = app.activeDocument.textFrames.length -1;
		//alert("Existe letra");
	while (contadorLetras != -1){
	var contadorLetras2 = app.activeDocument.textFrames[contadorLetras].characters.length;
	contadorLetras2--;
	
	while(contadorLetras2 != -1){
		
		if(app.activeDocument.textFrames[contadorLetras].characters[contadorLetras2].fillColor == "[SpotColor]"){
		if(app.activeDocument.textFrames[contadorLetras].characters[contadorLetras2].fillColor.spot.name == "Professor"){
			//alert("letra preta");
			app.activeDocument.textFrames[contadorLetras].characters[contadorLetras2].characterAttributes.overprintFill = true;
			}	
		}
		
	contadorLetras2--;	
	//fecha while2
		}
	contadorLetras--;
	//fecha while1
	}
}

alert("Executado com sucesso");
}