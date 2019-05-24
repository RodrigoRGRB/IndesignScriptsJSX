//function bordasExatas(myDocument,sangria,setPorcentagemHorizontal,setPorcentagemVertical,alinharPelaPagina){
	
function bordasExatas(myDocument,sangriaInfSup,sangriaDirEsq,setPorcentagemHorizontal,setPorcentagemVertical,distorcerDeAcordoComMargem){
	
		var arrayBordasPagina = new Array;
		
		//alert(sangria);
		sangria = parseInt(sangriaInfSup);
		
		// Valor da porcentagem a diminuir
		setPorcentagemHorizontal = setPorcentagemHorizontal/100;
		setPorcentagemVertical = setPorcentagemVertical/100;
		
		var myScaleMatrix = app.transformationMatrices.add({horizontalScaleFactor:setPorcentagemHorizontal,
		verticalScaleFactor:setPorcentagemVertical});

		//Ajustar sangria
		var bleedAjust = distorcerDeAcordoComMargem;

		//************FUNCAO AJUSTA PAGINAS ***************

		function ajustaPaginaPar(){
			
				if(bleedAjust == false){
							myRectangle.graphics[0].horizontalScale = 100;
							myRectangle.graphics[0].verticalScale = 100;
							myRectangle.graphics[0].transform(CoordinateSpaces.pasteboardCoordinates, AnchorPoint.centerAnchor, myScaleMatrix, undefined, true);
					}

				if(distorcerDeAcordoComMargem == true){
						var arrayTemp = myRectangle.geometricBounds;
						arrayTemp[3] = arrayTemp[3]+sangriaDirEsq;
						myRectangle.graphics[0].geometricBounds = arrayTemp;
						
						//Corrige páginas sozinhas
						if(myRectangle.geometricBounds[3] != myRectangle.parent.bounds[3]){
							myRectangle.graphics[0].geometricBounds = myRectangle.geometricBounds;
							}
						
					}
				else{
					alinharDireita();
					centralizarV();
					}
			
			}

		function ajustaPaginaImpar(){
			
			//Ajusta sangria
			if(bleedAjust == false){
				myRectangle.graphics[0].horizontalScale = 100;
				myRectangle.graphics[0].verticalScale = 100;
				myRectangle.graphics[0].transform(CoordinateSpaces.pasteboardCoordinates, AnchorPoint.centerAnchor, myScaleMatrix, undefined, true);
				}
			//Fim ajusta sangria

				if(distorcerDeAcordoComMargem == true){
						var arrayTemp = myRectangle.geometricBounds;
						arrayTemp[1] = arrayTemp[1]-sangriaDirEsq;
						myRectangle.graphics[0].geometricBounds = arrayTemp;

						//Corrige páginas sozinhas
						if(myRectangle.geometricBounds[1] != myRectangle.parent.bounds[1]){
							myRectangle.graphics[0].geometricBounds = myRectangle.geometricBounds;
							}
					}
				else{
					alinharEsquerda();
					centralizarV();
					}
			
			}

		function ajustaPaginaImparAlt(){
			
			//Ajusta sangria
			if(bleedAjust == false){
				myRectangle.graphics[0].horizontalScale = 100;
				myRectangle.graphics[0].verticalScale = 100;
				myRectangle.graphics[0].transform(CoordinateSpaces.pasteboardCoordinates, AnchorPoint.centerAnchor, myScaleMatrix, undefined, true);
				}
			//Fim ajusta sangria
					
				if(distorcerDeAcordoComMargem == true){
						var arrayTemp = myRectangle.geometricBounds;
						arrayTemp[1] = arrayTemp[1]-sangriaDirEsq;
						myRectangle.graphics[0].geometricBounds = arrayTemp;

						//Corrige páginas sozinhas
						if(myRectangle.geometricBounds[1] != myRectangle.parent.bounds[1]){
							myRectangle.graphics[0].geometricBounds = myRectangle.geometricBounds;
							}
					}
				else{
					alinharEsquerda();
					centralizarV();
					}
			
			}



		//***************************


		//****************FUNCAO AJUSTA SANGRIA

		function ajustaSangria(arrayBordasPagina,i){
			var numPagina;
			var numProxPagina;
			var numAntPagina;
			var contador = i;

			
			//página atual
			numPagina = parseInt(myDocument.pages[i].name);
			
			//Se Proxima pagina maior que a pagina atual, recebe valor
			if(myDocument.pages[contador+1] != null){
				if(parseInt(myDocument.pages[contador+1].name) > numPagina){
					numProxPagina = parseInt(myDocument.pages[contador+1].name);
					}
					else{
						numProxPagina = null;
						}
			}
			
			//Se página anterior menor que a página atual, recebe valor
			if(parseInt(myDocument.pages[contador-1].name) < numPagina){
				numAntPagina = parseInt(myDocument.pages[contador-1].name);
				}
			else{
				numAntPagina = null;
				}
			
				myRectangle.graphics[0].geometricBounds = [arrayBordasPagina[0]-sangriaInfSup, arrayBordasPagina[1]-sangriaDirEsq,arrayBordasPagina[2]+sangriaInfSup, arrayBordasPagina[3]+sangriaDirEsq];
				
				//Par
				if(numPagina%2 == 0){
					

					
					//Se proxima pagina for impar
						if(numProxPagina%2 != 0 && numProxPagina != null){
							myRectangle.geometricBounds = [arrayBordasPagina[0]-sangriaInfSup, arrayBordasPagina[1]-sangriaDirEsq,arrayBordasPagina[2]+sangriaInfSup, arrayBordasPagina[3]];
							}
						else{
								if(numProxPagina == null){
									myRectangle.geometricBounds = [arrayBordasPagina[0]-sangriaInfSup, arrayBordasPagina[1]-sangriaDirEsq,arrayBordasPagina[2]+sangriaInfSup, arrayBordasPagina[3]+sangriaDirEsq];
								}
							else{
								myRectangle.geometricBounds = [arrayBordasPagina[0]-sangriaInfSup, arrayBordasPagina[1]-sangriaDirEsq,arrayBordasPagina[2]+sangriaInfSup, arrayBordasPagina[3]+sangriaDirEsq];
								}
						}
					//Roda a função para setar a porcentagem
					ajustaPaginaPar();
					}
				
				//Impar
				else{
					
					//Se pagina anterior for par
					if(numAntPagina%2 == 0){

					
						myRectangle.geometricBounds = [arrayBordasPagina[0]-sangriaInfSup, arrayBordasPagina[1],arrayBordasPagina[2]+sangriaInfSup, arrayBordasPagina[3]+sangriaDirEsq];
						}
					//Se pagina anterior for null
					if(numAntPagina == null || numAntPagina%2 != 0){


						myRectangle.geometricBounds = [arrayBordasPagina[0]-sangriaInfSup, arrayBordasPagina[1]-sangriaDirEsq,arrayBordasPagina[2]+sangriaInfSup, arrayBordasPagina[3]+sangriaDirEsq];
						//Roda a função para setar a porcentagem
						ajustaPaginaImparAlt();
						}			
					else{
						
						myRectangle.geometricBounds = [arrayBordasPagina[0]-sangriaInfSup, arrayBordasPagina[1],arrayBordasPagina[2]+sangriaInfSup, arrayBordasPagina[3]+sangriaDirEsq];
						
						//Roda a função para setar a porcentagem
						ajustaPaginaImpar();
						
					}
					}
						//Roda a função para setar a porcentagem
						//ajustaPaginaPar();
			}

		//****************FUM FUNCAO AJUSTA SANGRIA

for(i=0; i < myDocument.pages.length;i++) {

		myPage2 = myDocument.pages[i];
		myRectangle = myPage2.rectangles.item(0);
		
		//alert(myPage2.name);
		arrayBordasPagina = myPage2.bounds;
		if(myPage2.rectangles.length > 0){
			ajustaSangria(arrayBordasPagina,i);
		}
}


}

/*
#includepath "/D/Lucas/Temp/Script Indesign/"
#include "funcaoAlinhamento.jsx"

var distorcerDeAcordoComMargem = false;
var sangriaInfSup = 10;
var sangriaDirEsq = 20;

var myDocument = app.activeDocument;

var setPorcentagemHorizontal = 50;
var setPorcentagemVertical = 50;

bordasExatas(myDocument,sangriaInfSup,sangriaDirEsq,setPorcentagemHorizontal,setPorcentagemVertical,distorcerDeAcordoComMargem);

*/