var presetTemp = File.openDialog("Abrir joboptions");
app.open(presetTemp);

arquivo = File.saveDialog("Salvar PDF ", "*.pdf");
nomePdfPreset = presetTemp.name.split(".")[0];

var myDocument = app.activeDocument;
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