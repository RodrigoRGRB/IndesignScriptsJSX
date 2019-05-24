if(app.documents.length > 0) {
//Varre todas a paginas do documento e ajusta a sangria

//Valor da sangria em milimetros
var sangria = 5;
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
		
		var selecao = myDocument.selection;
		
		//Verifica se existe algum objeto selecionado
		if(app.selection !=""){		 
				 if(app.selection[0].parent == "[object Page]"){
					 //alert("Rectangle");
					 myPage = app.selection[0].parent;
					 myRectangle = myDocument.selection;
					 }				 
				 if(app.selection[0].parent.parent == "[object Page]"){
					 //alert("Rectangle interno");
					 myPage = app.selection[0].parent.parent;
					 myRectangle =  myDocument.selection.parent;
					 }	
				 
			if(app.selection[0].parent == "[object Spread]" && app.selection[0].parent.parent == "[object Document]" ){
				alert ("O objeto está fora da página","Lucas ®",true);
				}
			else{		
				myRectangle = myPage.rectangles.item(0);	
				arrayBordasPagina = myPage.bounds;
				ajustaSangria(arrayBordasPagina,myPage);
				alert ("Concluído com sucesso","Lucas ®",false);	
			}		
		}		
		else{
		alert ("Selecione o objeto que deseja ajustar","Lucas ®",true);
	}
}
else{
alert("É necessário criar um arquivo","Lucas ®",true);
}