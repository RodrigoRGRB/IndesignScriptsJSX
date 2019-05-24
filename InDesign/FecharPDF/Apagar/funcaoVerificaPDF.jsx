function verificaPDF(f){
	try{
		var myDocumentTemp = app.documents.add(false);
		//alert(myDocumentTemp);
		
		app.pdfExportPreferences.viewPDF = false;
		//app.activeDocument.exportFile(ExportFormat.pdfType,f,false);
		myDocumentTemp.exportFile(ExportFormat.pdfType,f,false);
		
		if((myDocumentTemp+"") != "undefined"){
			myDocumentTemp.close();
		}
	}
	catch(e){
		
		var mensagemErro = "Error: Cannot save to the file \""+f.displayName+"\".  You may not have permission or the file may be in use."

		if((e+"") == mensagemErro){
			
			alert("Erro: Você não pode salvar o arquivo \""+f.displayName+"\". Você não tem permissão ou o arquivo está em uso.","Lucas ®",true);
			f = File.saveDialog("Salvar PDF ", "*.pdf");
			if(f != null){ verificaPDF(f);}
			
			}
		
		if((myDocumentTemp+"") != "undefined"){
			myDocumentTemp.close();
		}
	}
}

f = File.saveDialog("Salvar PDF ", "*.pdf");
if(f != null){ verificaPDF(f);}
