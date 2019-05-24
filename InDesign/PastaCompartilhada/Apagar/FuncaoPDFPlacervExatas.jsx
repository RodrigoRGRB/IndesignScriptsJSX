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
		var intervaloTemp2 = intervalo;
		intervaloTemp2 = intervaloTemp.split(",");
		intervalo = intervaloTemp2;
	}
	catch(e){
		/*
	var arrayTemp = new Array();
	arrayTemp[0] = intervalo;
	intervalo = arrayTemp;
	
	alert(intervalo.length);
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
	if(contadorInterno < numeroDePaginas){
		myProgressPanel.pnl.myProgressBarLabel.text = "Importando página " + (contadorInterno+1);
		//alert(contadorInterno);
		contadorInterno++;
		myProgressPanel.pnl.myProgressBar.value = contador++;
		//************* FIM INCREMENTA PROGRESS BAR ******************
	}
	
	
	}
}
