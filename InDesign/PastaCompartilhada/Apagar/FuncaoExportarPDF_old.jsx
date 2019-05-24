function encontraPdfPresets(nome){
	
		var atual = app.pdfExportPresets.firstItem();
		
		for(i=0;i<app.pdfExportPresets.length-1;i++){
				
					var atual = app.pdfExportPresets.nextItem(atual);
					//alert(atual.name); 
					
					if((atual.name+"") == nome){
						//alert("ok"); 
						return pdfPresets = atual;
					}
				
		}
	}

function setIntervaloPDF(intervaloPDF){
	if(intervaloPDF != null){
		with(app.pdfExportPreferences){
			//pageRange = "1, 3-6, 7, 9-11, 12";
			pageRange = intervaloPDF;
		}
	}				
}

function exportaPDF(carimbo,arquivo,myDocument,intervaloPDF){
	


	var AdobePresets;
	var myPDFExportPreset ;
	//var arquivoPDF = arquivo;
	

	
		//Configurações do documento
		if(AdobePresets == "X1A"){

			//alert("X1A");
			var tempPreset = app.pdfExportPresets.firstItem();
			myPDFExportPreset = app.pdfExportPresets.nextItem(tempPreset);
			
			setIntervaloPDF(intervaloPDF);
			
			app.pdfExportPreferences.viewPDF = true;
			//app.activeDocument.exportFile(ExportFormat.pdfType, File("/D/myTestDocument.pdf"),false, myPDFExportPreset);
			//app.activeDocument.exportFile(ExportFormat.pdfType,arquivo,false, myPDFExportPreset);
			myDocument.exportFile(ExportFormat.pdfType,arquivo,false, myPDFExportPreset);

		}
	
		//Configurações do documento
		if(AdobePresets == "X1ATemp"){

			//alert("X1ATemp");
			var tempPreset = app.pdfExportPresets.firstItem();
			myPDFExportPreset = app.pdfExportPresets.nextItem(tempPreset);
			
			app.pdfExportPreferences.viewPDF = false;

			//app.activeDocument.exportFile(ExportFormat.pdfType, File("/D/myTestDocument.pdf"),false, myPDFExportPreset);
			//app.activeDocument.exportFile(ExportFormat.pdfType,arquivo,false, myPDFExportPreset);
			myDocument.exportFile(ExportFormat.pdfType,arquivo,false, myPDFExportPreset);

		}
	
		//Prol
		if(AdobePresets == "PROL"){
				//alert("PROL");
				myPDFExportPreset = encontraPdfPresets("PROL");
				app.activeDocument.exportFile(ExportFormat.pdfType,arquivo,false, myPDFExportPreset);
			}
	
	
	}