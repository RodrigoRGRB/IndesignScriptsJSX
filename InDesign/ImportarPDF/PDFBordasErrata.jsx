//Varre todas a paginas do documento e ajusta a sangria

//Valor da sangria em milimetros
var sangria = 7.5;
myDocument = app.activeDocument;
var arrayBordasPagina = new Array;


//****************FUNCAO AJUSTA SANGRIA

function ajustaSangria(arrayBordasPagina,myPage){
	
	var numPagina = parseInt(myPage.name);
	
		myRectangle.graphics[0].geometricBounds = [arrayBordasPagina[0]-sangria, arrayBordasPagina[1]-sangria,arrayBordasPagina[2]+sangria, arrayBordasPagina[3]+sangria];
		
		if(numPagina%2 == 0){
			myRectangle.geometricBounds = [arrayBordasPagina[0]-sangria, arrayBordasPagina[1]-sangria,arrayBordasPagina[2]+sangria, arrayBordasPagina[3]];
			}
		else{
			myRectangle.geometricBounds = [arrayBordasPagina[0]-sangria, arrayBordasPagina[1],arrayBordasPagina[2]+sangria, arrayBordasPagina[3]+sangria];
			}
	
	}

//****************FUM FUNCAO AJUSTA SANGRIA

for(i=0; i < myDocument.pages.length;i++) {

		myPage = myDocument.pages[i];
		myRectangle = myPage.rectangles.item(0);
		
		//alert(myPage.name);
		arrayBordasPagina = myPage.bounds;
		ajustaSangria(arrayBordasPagina,myPage);		
}
	
alert ("Concluído com sucesso","Lucas ®",false);