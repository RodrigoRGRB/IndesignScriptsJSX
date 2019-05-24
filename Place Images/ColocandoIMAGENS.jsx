main();

function main() {
	var name, f, file, text,
	arr = [];
	
	if(app.documents.length != 0) {
		var doc = app.activeDocument;	
		var folder = Folder.selectDialog("Pasta das imagens");

		if (folder != null) {
			app.findObjectPreferences = app.changeGrepPreferences  = NothingEnum.NOTHING;
			app.findGrepPreferences.findWhat = "I.+?11";
			f = doc.findGrep(true);
			//ID002-I001-2019-PV-MAT-L3-F3-C11
			for (i = 0; i < f.length; i++) {
				name = f[i].contents;
                name = name+".ai"
                alert(name);
				file = new File(folder.fsName + "/" + name);
				
				if (file.exists) {
					f[i].remove();
					f[i].insertionPoints[0].place(file);
				}
				else {
					arr.push("File doesn't exist '" + name + "'");
				}
			}
		
			app.findObjectPreferences = app.changeGrepPreferences  = NothingEnum.NOTHING;
			
			arr.push("------------------------------------------");
			text = arr.join("\r");
			writeToFile(text);
		}
	}
	else{
		alert("Please open a document and try again.");
	}	
}

function writeToFile(text) {
	var file = new File("~/Desktop/Place inline images.txt");
	if (file.exists) {
		file.open("e");
		file.seek(0, 2);
	}
	else {
		file.open("w");
	}
	file.write(text + "\r"); 
	file.close();
}