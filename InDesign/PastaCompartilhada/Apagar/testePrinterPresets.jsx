//Adding our preset to the application
var scriptsFile = new File($.fileName);
var printPreset = new File(scriptsFile.path+"/Links/PrintPresetsHumanas.prst");
app.importFile(1918071916, printPreset);

nomePdfPreset = printPreset.name.split(".")[0];
//alert(nomePdfPreset);
myprintPreset = app.printerPresets.item(nomePdfPreset);

//Intervalo das páginas 
setIntervaloImpressao(myDocument,intervaloPDF);

//myPreset = app.printerPresets.item("ps");
app.activeDocument.print(false, myprintPreset); 

//Remove o PrinterPresets
app.printerPresets.item(nomePdfPreset).remove();







var scriptsFile = new File($.fileName);
var presetTemp = new File(scriptsFile.path+"/Links/PrintPresetsHumanas.prst");
app.open(presetTemp); 

nomePdfPreset = presetTemp.name.split(".")[0];
//alert(nomePdfPreset);



app.activeDocument.print(false); 

var myPDFExportPreset = app.printerPresets.item(nomePdfPreset);
/*
//var myPDFExportPreset = app.pdfExportPresets.item("X1aTemp");
myDocument.exportFile(
		ExportFormat.pdfType,
		arquivo,
		//File(Folder.desktop + "/ExportPDFWithPreset.pdf"),
		false, 
		myPDFExportPreset
	);
	*/

