if (app.documents.length > 0) {
	
var myDocument = app.activeDocument;

// Valor da porcentagem a diminuir
var setPorcentagemHorizontal = 0.95;
var setPorcentagemVertical = 0.95;

if(myDocument.sections.item(0).pageNumberStart%2 == 0){
	//alert("par"); ESQUERDA
	#includepath "/I/Objetos/Scripts/InDesign/ImportarPDF"
	#include "PDFBordasEsquerdaMATEMATICA.jsx"
	
	}
else{
	//alert("impar"); DIREITA
	#includepath "/I/Objetos/Scripts/InDesign/ImportarPDF"
	#include "PDFBordasDireitaMATEMATICA.jsx"
	
	}

alert ("Concluído com sucesso","Lucas ®",false);

}
else{
	alert ("Nenhum arquivo aberto","Lucas ®",true);
	}