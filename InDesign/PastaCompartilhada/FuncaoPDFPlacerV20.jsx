function pdfPlacer(originalDocument,myDocument,f2,intervalo){
	
	
	//************* LABEL PROGRESS BAR ******************
	myProgressPanel.pnl.text = "IMPORTANDO PDF";
	//************* LABEL PROGRESS BAR ******************
	
	var contador = 0;
	
	//Make certain that user interaction (display of dialogs, etc.) is turned on.
	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
	
	//RENUMERAR ARQUIVO
	//Cria um array com o intervalo de páginas
	var arrayPaginas = new Array();
	var contador = 0;
	//alert(intervalo);
	try{
		var intervaloTemp = intervalo;
		intervaloTemp = intervaloTemp.split(",");
		intervalo = intervaloTemp;
	}
	catch(e){
		/*
	var arrayTemp = new Array();
	arrayTemp[0] = intervalo;
	intervalo = arrayTemp;
	*/
	}

	for(x =0;x<intervalo.length;x++){

		var intervaloTemp = intervalo[x].split("-");
				
		if(intervaloTemp.length > 1){
			for(g = parseInt(intervaloTemp[0]); g <= (parseInt(intervaloTemp[1])); g++){
				//alert(g);
				arrayPaginas[contador] =  g;
				contador++;
				//alert(arrayPaginas);
			}
		}
		else{
				arrayPaginas[contador] = parseInt(intervaloTemp[0]);
				contador++;
			}
	}
	
	//Display a standard Open File dialog box.
	var myPDFFile = f2;
	if((myPDFFile != "")&&(myPDFFile != null)){

		var myPage = myDocument.pages.item(0);
		myPlacePDF(myDocument, myPage, myPDFFile);
		
	}

	//CONTINUAÇÃO RENUMERAR ARQUIVO
	//Atribui o array criado para o  o novo Documento criado
	for(count=0;count<app.activeDocument.pages.length;count++){
		//app.activeDocument.pages[count].label = arrayPaginas[count];
		var meuDocumento = app.activeDocument; 
		//alert(app.activeDocument.pages[arrayPaginas[count]]);
		var mySection = meuDocumento.sections.add(app.activeDocument.pages[count]);
		mySection = meuDocumento.sections.item(meuDocumento.sections.length-1);
		mySection.continueNumbering = false;
		mySection.pageNumberStart = parseInt(arrayPaginas[count], 10);
	}
	// FIM RENUMERAR ARQUIVO

}
//************************************************

var contadorInterno = 0;

function myPlacePDF(myDocument, myPage, myPDFFile){
	
	var myPDFPage;
	app.pdfPlacePreferences.pdfCrop = PDFCrop.cropMedia;
	var myCounter = 1;
	var myBreak = false;
	while(myBreak == false){
	
		if(myCounter > 1){
			myPage = myDocument.pages.add(LocationOptions.after, myPage);
		}
		app.pdfPlacePreferences.pageNumber = myCounter;
		myPDFPage = myPage.place(File(myPDFFile), [0,0])[0];
		if(myCounter == 1){
			var myFirstPage = myPDFPage.pdfAttributes.pageNumber;
		}
		else{
			if(myPDFPage.pdfAttributes.pageNumber == myFirstPage){
				myPage.remove();
				myBreak = true;
			}
		}
		myCounter = myCounter + 1;
		
	//************* INCREMENTA PROGRESS BAR ******************
	//alert(numeroDePaginas);
	//alert("oi");
	if(contadorInterno < numeroDePaginas.length){
		myProgressPanel.pnl.myProgressBarLabel.text = "Importando página " + numeroDePaginas[contadorInterno];
		//alert(contadorInterno);
		contadorInterno++;
		myProgressPanel.pnl.myProgressBar.value = contador++;
		//************* FIM INCREMENTA PROGRESS BAR ******************
	}
	
	
	}
}

//************************************************
/*

function criaSecao(primeiroNumero) {
	
	var meuDocumento = app.activeDocument; 
	//var mySection = myDocument.sections.item(0);
	var mySection = meuDocumento.sections.add();
	
	//pega a ultima secao criada
	mySection = meuDocumento.sections.item(meuDocumento.sections.length-1);
	mySection.continueNumbering = false;
	
	//Converte String para Integer, selecionando a base 10
	var temp = parseInt(primeiroNumero, 10);
	//alert("Cria Secao = "+primeiroNumero);
	//alert("Temp = "+temp); 
	mySection.pageNumberStart = temp;
	
	}

//***********************************************

function myPlacePDF(myDocument, myPage, myPDFFile,primeiroNumero){


	var verificaSecao = true;
	var myPDFPage;
	app.pdfPlacePreferences.pdfCrop = PDFCrop.cropMedia;
	var myCounter = 1;
	var myBreak = false;
	while(myBreak == false){
		if(myCounter > 1){
			myPage = myDocument.pages.add(LocationOptions.after, myPage);
		}
		app.pdfPlacePreferences.pageNumber = myCounter;
		
		if(verificaSecao){
			//alert("verifica secao "+primeiroNumero);
			criaSecao(primeiroNumero);
			verificaSecao = false;
			}
		myPDFPage = myPage.place(File(myPDFFile), [0,0])[0];
		if(myCounter == 1){
			var myFirstPage = myPDFPage.pdfAttributes.pageNumber;
		}
		else{
			if(myPDFPage.pdfAttributes.pageNumber == myFirstPage){
				myPage.remove();
				myBreak = true;
			}
		}
		myCounter = myCounter + 1;
	}
}
*/
/*
var myPDFFile = File.saveDialog("Salvar PDF ", "*.pdf");
var myDocument = app.activeDocument;
var myPage = app.activeDocument.pages[0];
var primeiroNumero = 1;

pdfPlacer(originalDocument,myDocument,f2)

myPlacePDF(myDocument, myPage, myPDFFile,primeiroNumero);
*/
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

