#includepath "/I/Objetos/Scripts/InDesign/ImportarPDF"
#include "funcaoAlinhamento.jsx"

//var myDocument = app.documents.add();
var myDocument = app.activeDocument;
//var myPage = myDocument.pages.item(0);

// Numero de Paginas
//alert(myDocument.pages.length);
var TotalPaginas = myDocument.pages.length;
var myPage;

var TotalPaginas = myDocument.pages.length;
var myPage;

var bleedAjust = true;

//alert("direita");

		// Valor da porcentagem a diminuir
		//var setPorcentagemHorizontal = 0.95;
		//var setPorcentagemVertical = 0.95;
		
		var myScaleMatrix = app.transformationMatrices.add({horizontalScaleFactor:setPorcentagemHorizontal,
		verticalScaleFactor:setPorcentagemVertical});
		//Fim porcentagem

//Verifica se existe segunda página
if(myDocument.pages.length > 0){
	
	
	//devolve borda para a primeira página
	myPage = myDocument.pages[0];
	if(myPage.rectangles.item(0)){
		//alert("rodando");
		myRectangle = myPage.rectangles.item(0);
		
		//Páginas ímpar
		if(myPage.rectangles.length > 0){
					
			//Ajusta sangria
			if(bleedAjust == true){
				myRectangle.graphics[0].horizontalScale = 100;
				myRectangle.graphics[0].verticalScale = 100;
				myRectangle.transform(CoordinateSpaces.pasteboardCoordinates, AnchorPoint.centerAnchor, myScaleMatrix, undefined, true);
				//Centralizar conteúdo
				
				}
			//Fim ajusta sangria
			
			myRectangle.geometricBounds = [-5, 0, 285, 215];
			alinharEsquerda();
			centralizarV();
			myRectangle.geometricBounds = [-5, -5, 285, 215];
			//centralizarH();
			
		}
	}
	
	for(j=1; j < TotalPaginas; j++){
		
	myPage = myDocument.pages[j];
	if(myPage.rectangles.item(0)){
	myRectangle = myPage.rectangles.item(0);

	//Páginas par
	if(myPage.rectangles.length > 0){

			//Ajusta sangria
			if(bleedAjust == true){
				//myRectangle.graphics[0].geometricBounds = [-5, -5, 285, 215];
				myRectangle.graphics[0].horizontalScale = 100;
				myRectangle.graphics[0].verticalScale = 100;
				myRectangle.transform(CoordinateSpaces.pasteboardCoordinates, AnchorPoint.centerAnchor, myScaleMatrix, undefined, true);
				}

	myRectangle.geometricBounds = [-5, -5, 285, 210];
	alinharDireita();
	centralizarV();
	
	}

	}
	
	if(j < TotalPaginas-1){
	
	j++;
	myPage = myDocument.pages[j];
		if(myPage.rectangles.item(0)){
	myRectangle = myPage.rectangles.item(0);

	//Páginas ímpar
	if(myPage.rectangles.length > 0){
		
			//Ajusta sangria
			if(bleedAjust == true){
				//myRectangle.graphics[0].geometricBounds = [-5, -5, 285, 215];
				myRectangle.graphics[0].horizontalScale = 100;
				myRectangle.graphics[0].verticalScale = 100;
				myRectangle.transform(CoordinateSpaces.pasteboardCoordinates, AnchorPoint.centerAnchor, myScaleMatrix, undefined, true);
				}

	myRectangle.geometricBounds = [-5, 210, 285, 425];
	alinharEsquerda();
	centralizarV();
	
	}
	}
		
		}
	
	
	}
}

//Se última pagina for par
var ultimaPagina = myDocument.pages.length;
//alert(ultimaPagina%2 == 0);

if(ultimaPagina%2 == 0){

//Devolve sangria para última página
myPage = myDocument.pages[myDocument.pages.length-1];
myRectangle = myPage.rectangles.item(0);
if(myPage.rectangles.length > 0){
	
			//Ajusta sangria
			if(bleedAjust == true){
				//myRectangle.graphics[0].geometricBounds = [-5, -5, 285, 215];
				myRectangle.graphics[0].horizontalScale = 100;
				myRectangle.graphics[0].verticalScale = 100;
				myRectangle.transform(CoordinateSpaces.pasteboardCoordinates, AnchorPoint.centerAnchor, myScaleMatrix, undefined, true);
				}			
			
myRectangle.geometricBounds = [-5, -5, 285, 210];
alinharDireita();
centralizarV();
myRectangle.geometricBounds = [-5, -5, 285, 215];
}

}