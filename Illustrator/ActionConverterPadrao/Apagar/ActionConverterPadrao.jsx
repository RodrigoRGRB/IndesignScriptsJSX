//alert("ae juliao");

//ADICIONA OVERPRINT APENAS NO PRETO 100% (TANTO NO "FILL" QUANTO NO "STROKE"

doc = app.activeDocument;
count = 0;

//Converte todos os shapes
if ( doc.pathItems.length > 0 ) {
	
thePaths = doc.pathItems;
numPaths = thePaths.length;

for ( contadorCMYK = 0; contadorCMYK < doc.pathItems.length; contadorCMYK++ ) {
itm = doc.pathItems[contadorCMYK];
//alert(itm.fillColor.black);

var somaFillColor = itm.fillColor.black + itm.fillColor.cyan + itm.fillColor.magenta + itm.fillColor.yellow;
//alert(somaFillColor);

//Se a soma dos valores da paleta forem maior que 248, converte para preto
if(somaFillColor > 248 && itm.fillColor.black > 80) {
	
	//alert("convertendo para preto");
	
	itm.fillColor.black = 100;
	itm.fillColor.cyan = 0;
	itm.fillColor.magenta = 0;
	itm.fillColor.yellow = 0;
	
	}

var somaStrokeColor = itm.strokeColor.black + itm.strokeColor.cyan + itm.strokeColor.magenta + itm.strokeColor.yellow;
//alert(somaFillColor);

//Se a soma dos valores da paleta forem maior que 248, converte para preto
if(somaStrokeColor > 248 && itm.strokeColor.black > 80) {
	
	//alert("convertendo para preto");
	
	itm.strokeColor.black = 100;
	itm.strokeColor.cyan = 0;
	itm.strokeColor.magenta = 0;
	itm.strokeColor.yellow = 0;
	
	}

}

}

//Converte todos as letras
//alert(app.activeDocument.textFrames[0].fillColor);

if ( app.activeDocument.textFrames.length > 0 ) {

	for ( contadorCMYK = 0; contadorCMYK < doc.textFrames.length; contadorCMYK++ ) {
	textFrame = doc.textFrames[contadorCMYK];
	
	//alert(textFrame.characters.length);

		for(var contadorLetras = 0; contadorLetras < textFrame.characters.length; contadorLetras++){
			
				//alert(contadorLetras);
				//alert(textFrame.characters[contadorLetras].fillColor.black = 100);

				var itm = textFrame.characters[contadorLetras];
				
				var somaFillColor = itm.fillColor.black + itm.fillColor.cyan + itm.fillColor.magenta + itm.fillColor.yellow;
				//alert(somaFillColor);

				//Se a soma dos valores da paleta forem maior que 248, converte para preto
				if(somaFillColor > 248) {
					
					//alert("convertendo para preto");
					
					itm.fillColor.black = 100;
					itm.fillColor.cyan = 0;
					itm.fillColor.magenta = 0;
					itm.fillColor.yellow = 0;
					
					}

				var somaStrokeColor = itm.strokeColor.black + itm.strokeColor.cyan + itm.strokeColor.magenta + itm.strokeColor.yellow;
				//alert(somaFillColor);

				//Se a soma dos valores da paleta forem maior que 248, converte para preto
				if(somaStrokeColor > 248) {
					
					//alert("convertendo para preto");
					
					itm.strokeColor.black = 100;
					itm.strokeColor.cyan = 0;
					itm.strokeColor.magenta = 0;
					itm.strokeColor.yellow = 0;
					
					}

			}

	}
	
}