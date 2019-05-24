// ESSE SCRIPT CONVERTE TODAS AS CORES SPOT DO DOCUMENTO ABERTO PARA PARA CORES CMYK
// SÓ NÃO CONVERTE A COR COM O NOME "PROFESSOR"

if ( app.documents.length > 0 ) {

var numeroDeCores = app.activeDocument.swatches.length;
//var numeroDeCoresSpot = app.activeDocument.spots.length;

//alert(numeroDeCores);
//alert(numeroDeCoresSpot);

var contadorCores = 1; 

while (contadorCores < numeroDeCores){
	
	var colorToChange = app.activeDocument.swatches[contadorCores];
	//var colorToChange = app.activeDocument.spots.index[contadorCores];
	//alert(colorToChange.name);
	
	// VERIFICA SE É PROFESSOR
	if (colorToChange.name == "Professor" || colorToChange.name ==  "C=0 M=0 Y=0 K=50"){ 
		//alert("Eh Professor");
		}
	else{
		//alert("nao e professor");
		
		//VERIFICA SE É SPOT
		if(colorToChange.color.spot && colorToChange.name != "[Registration]" ){
			//alert("Eh Spot");
			var CMYKvalues=colorToChange.color.spot.color;  
			//alert(CMYKvalues);
			colorToChange.color=CMYKColor;
			colorToChange.color=CMYKvalues;
		
			}
		}
	//alert(contadorCores);
	contadorCores++;
	}
} 

/*
// Deletes all spots colors from the current document
if ( app.documents.length > 0 ) {
var spotCount = app.activeDocument.spots.length;
if (spotCount > 0) {
app.activeDocument.spots.removeAll();
}
}
*/