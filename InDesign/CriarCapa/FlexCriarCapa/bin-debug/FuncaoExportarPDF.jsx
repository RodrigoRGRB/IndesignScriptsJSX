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

function exportaPDF(arquivoPDF,myDocument){
				
	app.pdfExportPreferences.viewPDF = true;
     var exibeJanela = false;
	
	var scriptsFile = new File($.fileName);
	
	//alert("carimbo veio como: "+carimbo);

    app.pdfExportPreferences.viewPDF = true;
    var presetTemp = new File(scriptsFile.path+"/arquivos/CapasPoliedro.joboptions");
	app.open(presetTemp);
	nomePdfPreset = presetTemp.name.split(".")[0];
    
	//alert(nomePdfPreset);
	
	//Intervalo das páginas 
	with(app.pdfExportPreferences){
			//pageRange = "1, 3-6, 7, 9-11, 12";
			pageRange = PageRange.allPages;
	}
    

	var myPDFExportPreset = app.pdfExportPresets.item(nomePdfPreset);
	//var myPDFExportPreset = app.pdfExportPresets.item("X1aTemp");
	myDocument.exportFile(
			ExportFormat.pdfType,
			arquivoPDF,
			//File(Folder.desktop + "/ExportPDFWithPreset.pdf"),
			exibeJanela, 
			myPDFExportPreset
		);
	
	app.pdfExportPresets.item(nomePdfPreset).remove();
	
	}