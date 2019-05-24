/*
To add PDF Presets:

set myApp = CreateObject("InDesignServer.Application.CS3")
myApp.Open("PDFPresetName.joboptions")

- run this only once.
- PDFPresetName.jojptions should include the full path

to use:
myDoc.Export "Adobe PDF", "FullPath PDF Name", myApp.PDFExportPresets.Item("[PDFPresetName]") 



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

*/

	
	/*
var myPreset = File("d:\webPDF.joboptions");



 var pdfPreset = app.pdfExportPresets.add(myPreset);

pdfPreset.name = "First_JOB";



 myFolder = "d:\";

 myBaseName  = "Dummy";

 

var myFile= new File(myFolder+"/"+myBaseName +"_web"+ ".pdf");
var result = "exported to:  " + myFile.fullName;
if(!myFile.parent.exists && !myFile.parent.create())
{
  result = "Not exported.  Unable to create the folder:  " + myFile.parent.fullName;
} else {
  app.documents.item(0).exportFile(ExportFormat.pdfType, myFile);
}
	
	*/
	
	
var scriptsFile = File($.fileName);
var presetTemp = File(scriptsFile.path+"/Links/X1a.joboptions");

var pdfPreset = app.pdfExportPresets.add(presetTemp);
/*
alert(pdfPreset);

pdfPreset.name = "ScriptPresetTemp";
*/

arquivo = File.saveDialog("Salvar PDF ", "*.pdf");
app.activeDocument.exportFile(ExportFormat.pdfType, arquivo,false,pdfPreset);

app.pdfExportPresets.item(pdfPreset.name).remove(); 

/*

//alert(myPDFExportPresetName);

myPDFExportPreset = app.pdfExportPresets.itemByName("["+myPDFExportPresetName+"]");

alert(myPDFExportPreset.fullName);

alert(app.pdfExportPresets.itemByName("["+myPDFExportPresetName+"]"));


myDocument = app.activeDocument;
myDocument.exportFile(ExportFormat.pdfType, arquivo, true,app.pdfExportPresets.Item("["+myPDFExportPresetName+"]")); 
*/