//alert(app.documents.length);
if(app.documents.length > 0) {
myDocument = app.activeDocument;
//var sangria = 0;

//Varre as paginas do documento
for(i=0; i < myDocument.pages.length;i++) {
	
		myPage = myDocument.pages[i];
		
		//Pega as bordas da pagina atual
		arrayBordasPagina = myPage.bounds;
		
		//Verifica se existe algum retangulo		
		//alert(myPage.rectangles.length);
		if(myPage.rectangles.length > 0){
			myRectangle = myPage.rectangles.item(0);
			
			//Aplica bordas da pagina ao retangulo
			myRectangle.geometricBounds = [arrayBordasPagina[0], arrayBordasPagina[1],arrayBordasPagina[2], arrayBordasPagina[3]];
			
					//Verifica se existe algum graphics e aplica bordas da pagina ao graphic
					if(myRectangle.graphics.length > 0){
						myRectangle.graphics[0].geometricBounds = [arrayBordasPagina[0], arrayBordasPagina[1],arrayBordasPagina[2], arrayBordasPagina[3]];
					}	
		}

	}
}
else{
alert("É necessário criar um arquivo","Lucas ®",true);
}