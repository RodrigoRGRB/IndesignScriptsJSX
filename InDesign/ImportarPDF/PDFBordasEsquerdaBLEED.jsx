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

//confirm();

//Verifica se existe segunda página
if(myDocument.pages.length > 0){
	
	for(j=0; j < TotalPaginas; j++){
		
	myPage = myDocument.pages[j];
		if(myPage.rectangles.item(0)){
	myRectangle = myPage.rectangles.item(0);

	//Páginas par
		if(myPage.rectangles.length > 0){
			
			//Ajusta sangria
			if(bleedAjust == true){
				//alert("Ajuste de pagina");
				myRectangle.graphics[0].geometricBounds = [-5, -5, 285, 215];
				}
			
	myRectangle.geometricBounds = [-5, -5, 285, 210];
	}
	}
	
	//alert("J = "+j);
	//alert("Total Paginas = "+TotalPaginas);
	
	if(j < TotalPaginas-1){
	
	j++;
	myPage = myDocument.pages[j];
		if(myPage.rectangles.item(0)){
	myRectangle = myPage.rectangles.item(0);

	//Páginas ímpar
		if(myPage.rectangles.length > 0){
			
			//Ajusta sangria
			if(bleedAjust == true){
				//alert("Ajuste de pagina");
				myRectangle.graphics[0].geometricBounds = [-5, 205, 285, 425];
				}
			
	myRectangle.geometricBounds = [-5, 210, 285, 425];
	}
	}
		
		}
	
	
	}
}

//Se última pagina for par
var ultimaPagina = myDocument.pages.length;
//alert(ultimaPagina%2 == 0);

if(ultimaPagina%2 != 0){

//Devolve sangria para última página
myPage = myDocument.pages[myDocument.pages.length-1];
myRectangle = myPage.rectangles.item(0);
	if(myPage.rectangles.length > 0){
		
			//Ajusta sangria
			if(bleedAjust == true){
				//alert("Ajuste de pagina");
				myRectangle.graphics[0].geometricBounds = [-5, -5, 285, 215];
				}
			
myRectangle.geometricBounds = [-5, -5, 285, 215];
}

}