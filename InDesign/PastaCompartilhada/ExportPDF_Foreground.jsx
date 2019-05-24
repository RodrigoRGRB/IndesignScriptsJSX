//ExportPDF_in_Foreground_CS5.jsx
//Uwe Laubender
/**
* @@@BUILDINFO@@@ ExportPDF_in_Foreground_CS5.jsx !Version! Thu Jul 08 2010 10:51:10 GMT+0200
*/
//DESCRIPTION:PDF-Export in foreground (old school) for InDesign CS5 only!

if(app.documents.length>0){
    var d=app.activeDocument;
    };
else{
    alert("Please open a document to execute Export to PDF. Script will be aborted.");
    exit();
    }
if(d.saved == false){
    alert("Save your document first before executing Export to PDF. Script will be aborted.");
    exit();
    };

var pdfPath = Folder.selectDialog("Folder to save PDF:");
var pdfName = d.name+".pdf";

var userDefFileName = prompt("File name:",pdfName,undefined);

if(userDefFileName == null){
    exit();
    };

var pdfFullName = pdfPath+"/"+userDefFileName;

if(File(pdfFullName).exists){
    c=confirm("The PDF-file "+userDefFileName+" is already existing. Do you want to overwrite it?",true,undefined);
    if (c==0){exit()};  
    };
//Error-handling if PDF file override is on and PDF is already opened in PDF reader app:
try{
d.exportFile(ExportFormat.PDF_TYPE,File(pdfFullName),true,undefined,undefined);
}catch(e){
    alert("Error: "+e.message+" (Line "+ e.line+" in script code.)");
    exit();
    };