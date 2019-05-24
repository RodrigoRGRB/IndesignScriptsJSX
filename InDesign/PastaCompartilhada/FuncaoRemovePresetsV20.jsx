function removerPresets(){

	var presetTemp;
	var nomePdfPreset;
	var scriptsFile = new File($.fileName);

    try{
		presetTemp = new File(scriptsFile.path+"/Links/ScriptPresetTemp_PROL.joboptions");
		nomePdfPreset = presetTemp.name.split(".")[0];
		app.pdfExportPresets.item(nomePdfPreset).remove();	
	}catch(e){};    
    
    try{
		presetTemp = new File(scriptsFile.path+"/Links/ScriptPresetTemp_PROL2.joboptions");
		nomePdfPreset = presetTemp.name.split(".")[0];
		app.pdfExportPresets.item(nomePdfPreset).remove();	
	}catch(e){};

	try{
		presetTemp = new File(scriptsFile.path+"/Links/ScriptPresetTemp_X1aTemp.joboptions");
		nomePdfPreset = presetTemp.name.split(".")[0];
		app.pdfExportPresets.item(nomePdfPreset).remove();	
	}catch(e){};

	try{
		presetTemp = new File(scriptsFile.path+"/Links/ScriptPresetTemp_X1a.joboptions");
		nomePdfPreset = presetTemp.name.split(".")[0];
		app.pdfExportPresets.item(nomePdfPreset).remove();
	}catch(e){};

	try{
		presetTemp = new File(scriptsFile.path+"/Links/ScriptPrintPresetsHumanas.prst");
		nomePdfPreset = presetTemp.name.split(".")[0];
		app.printerPresets.item(nomePdfPreset).remove();
	}catch(e){};
		
}