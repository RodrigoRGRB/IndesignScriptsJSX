if (app.documents.length > 0) {
	
var myDocument = app.activeDocument;

if(myDocument.sections.item(0).pageNumberStart%2 == 0){
	//alert("par"); ESQUERDA
	#includepath "/I/Objetos/Scripts/InDesign/ImportarPDF"
	#include "PDFBordasEsquerdaBLEED.jsx"
	
	}
else{
	//alert("impar"); DIREITA
	#includepath "/I/Objetos/Scripts/InDesign/ImportarPDF"
	#include "PDFBordasDireitaBLEED.jsx"
	
	}

alert ("Concluído com sucesso","Lucas ®",false);

}
else{
	alert ("Nenhum arquivo aberto","Lucas ®",true);
	}