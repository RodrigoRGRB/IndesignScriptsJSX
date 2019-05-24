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
	
	/*
	
	//*************  ATUALIZA PROGRESS BAR ******************
	myProgressPanel.pnl.text = "EXPORTANDO PDF";
	myProgressPanel.pnl.myProgressBarLabel.text = "Fechando PDF, aguarde...";
	myProgressPanel.pnl.myProgressBar.value = tamanhoDoProcesso;
	//*************  FIM ATUALIZA PROGRESS BAR ******************
	*/
	
	setIntervaloPDF(intervaloPDF);			
	app.pdfExportPreferences.viewPDF = true;
	
	var scriptsFile = new File($.fileName);
	
	//alert("carimbo veio como: "+carimbo);
	
		//Funcao para exportar PDF
		if( carimbo == "PDF Final" || carimbo == "PDF Final - Erratas" ){
			//alert("ação executada foi: "+"PDF Final");
				app.pdfExportPreferences.viewPDF = true;
				//var presetTemp = File.openDialog("Abrir joboptions");
				var presetTemp = new File(scriptsFile.path+"/Links/ScriptPresetTemp_PROL.joboptions");
		}
		else if( carimbo == "X1ATemp"){
			//alert("ação executada foi: "+"X1ATemp");
				app.pdfExportPreferences.viewPDF = false;
				var presetTemp = new File(scriptsFile.path+"/Links/ScriptPresetTemp_X1aTemp.joboptions");
		}
		else{
			//alert("ação executada foi: "+"X1A");
				app.pdfExportPreferences.viewPDF = true;
				var presetTemp = new File(scriptsFile.path+"/Links/ScriptPresetTemp_X1a.joboptions");
		}

	app.open(presetTemp);
	

	nomePdfPreset = presetTemp.name.split(".")[0];
	//alert(nomePdfPreset);
	
	//Intervalo das páginas 
	setIntervaloPDF(intervaloPDF);	

	var myPDFExportPreset = app.pdfExportPresets.item(nomePdfPreset);
	//var myPDFExportPreset = app.pdfExportPresets.item("X1aTemp");
	myDocument.exportFile(
			ExportFormat.pdfType,
			arquivo,
			//File(Folder.desktop + "/ExportPDFWithPreset.pdf"),
			false, 
			myPDFExportPreset
		);
	
	app.pdfExportPresets.item(nomePdfPreset).remove();
	
	}