if ( app.documents.length > 0 && app.activeDocument.selection.length > 0 ) {
	var docRef=app.activeDocument;
	var pathRef=docRef.selection[0];
	var pathRefArea=pathRef.area;
	
	alert ("Square Points: "+Math.round(pathRefArea*100)/100+"\n"
	+"Square Picas: "+(Math.round((pathRefArea/144)*100))/100+"\n"
	+"Square Inches: "+(Math.round((pathRefArea/5184)*100))/100+"\n"
	+"Square Millimeters: "+(Math.round((pathRefArea/8.037)*100))/100+"\n"
	+"Square Centimeters: "+(Math.round((pathRefArea/803.520)*100))/100);
	}
	
