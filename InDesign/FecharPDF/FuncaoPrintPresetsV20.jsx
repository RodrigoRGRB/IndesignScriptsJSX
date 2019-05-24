function setIntervaloImpressao(myDocument,intervaloPDF){
	if(intervaloPDF != null){
		with(myDocument.printPreferences){
			//pageRange = "1, 3-6, 7, 9-11, 12";
			pageRange = intervaloPDF;
		}
	}				
}
/*
app.activeDocument.printPreferences.pageRange = "22"
app.activeDocument.print(false);
*/

function printPresets(carimbo,myDocument,intervaloPDF){
	
		//Adding our preset to the application
		var scriptsFile = new File($.fileName);
		var printPreset = new File(scriptsFile.path+"/Links/ScriptPrintPresetsHumanasv2.prst");
		app.importFile(1918071916, printPreset);

		nomePdfPreset = printPreset.name.split(".")[0];
		//alert(nomePdfPreset);
		myprintPreset = app.printerPresets.item(nomePdfPreset);

		//Intervalo das páginas 
		setIntervaloImpressao(myDocument,intervaloPDF);
		
		//Ajusta as preferencias da impressao atual
		with(myDocument.printPreferences){
			//flip = Flip.none;
			//flip = Flip.horizontal;
			pageRange = intervaloPDF;
			}

		//myPreset = app.printerPresets.item("ps");
		myDocument.print(true, myprintPreset); 

		//Remove o PrinterPresets
		app.printerPresets.item(nomePdfPreset).remove();
	
	}
/*

var intervaloPDF = "6";
var arquivo = "";
var carimbo = "oi";
printPresets(carimbo,app.activeDocument,intervaloPDF);
*/