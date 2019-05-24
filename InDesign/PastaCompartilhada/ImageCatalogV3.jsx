//ImageCatalog.jsx
//An InDesign C5 JavaScript 
/*  
@@@BUILDINFO@@@ "ImageCatalog.jsx" 3.0.0 15 December 2009
*/ 
//Creates an image catalog from the graphic files in a selected folder. 
//Each file can be labeled with the file name, and the labels are placed on 
//a separate layer and formatted using a paragraph style ("label") you can 
//modify to change the appearance of the labels. 
// 
//For more information on InDesign scripting, go to http://www.adobe.com/products/indesign/scripting/index.html 
//Or visit the InDesign Scripting User to User forum at http://www.adobeforums.com . 
// 
//The myExtensions array contains the extensions of the graphic file types you want 
//to include in the catalog. You can remove extensions from or add extensions to this list. 
//myExtensions is a global. Mac OS users should also look at the file types in the myFileFilter function.

var myExtensions = new Array();
main();

var ultimoTextFrame;

function selecionaUltimoTextFrame(myDocument){
    
    ultimoTextFrame = myDocument.textFrames[myDocument.textFrames.length-1];
    //app.selection = ultimoTextFrame;
    //alert(ultimoTextFrame.overflows);

}


function arrumaTextFrames(myDocument){
        selecionaUltimoTextFrame(myDocument);

        while(ultimoTextFrame.overflows == true){
            
            //Adiciona uma página
            myDocument.pages.add(); 
            
            //Adiciona um textFrame
            var margem = myDocument.marginPreferences.right;
            var geometricBoundsTemp = [myDocument.pages[0].bounds[0]+margem,myDocument.pages[0].bounds[1]+margem,myDocument.pages[0].bounds[2]-margem,myDocument.pages[0].bounds[3]-margem];
                
            //adiciona o textFrame
            var tempTextFrame = myDocument.pages[myDocument.pages.length-1].textFrames.add();
            tempTextFrame.geometricBounds = geometricBoundsTemp;
            //Junta todos os textFrames
            myDocument.pages[myDocument.pages.length-2].textFrames[0].nextTextFrame = myDocument.pages[myDocument.pages.length-1].textFrames[0]; 
            
            //Seleciona de novo um textFrame
            selecionaUltimoTextFrame(myDocument);
            
        }

        //Apaga páginas em branco
        selecionaUltimoTextFrame(myDocument);

        while(ultimoTextFrame.contents == ""){  
            //ultimoTextFrame.remove();
            myDocument.pages[myDocument.pages.length-1].remove();
            
            selecionaUltimoTextFrame(myDocument);
        }
}


function tudoProTextFrame(myDocument){
    
        //tamanho do textFrame
        var margem = myDocument.marginPreferences.right;
        var geometricBoundsTemp = [myDocument.pages[0].bounds[0]+margem,myDocument.pages[0].bounds[1]+margem,myDocument.pages[0].bounds[2]-margem,myDocument.pages[0].bounds[3]-margem];

        //Cria o textframe em todas as páginas
        for(numPaginas = 0; numPaginas < myDocument.pages.length; numPaginas++){
            
                //adiciona o textFrame
                var tempTextFrame = myDocument.pages[numPaginas].textFrames.add();
                tempTextFrame.geometricBounds = geometricBoundsTemp;
                
                if(numPaginas > 0){
                    //Junta todos os textFrames
                    myDocument.pages[numPaginas-1].textFrames[0].nextTextFrame = myDocument.pages[numPaginas].textFrames[0]; 
                }
            
            }


        //Copia e cola as imagens nos textFrames
        for(numGrupos = 0, lopping = myDocument.groups.length; numGrupos < lopping; numGrupos++){
            
                var myTextFrame = myDocument.textFrames[0]; 
                var myInsertionPoint = myTextFrame.insertionPoints[0];   
                //var myInlineFrame = myInsertionPoint.rectangles.add();

                app.selection = myDocument.groups[0];  
                //alert("selecionado");
                app.cut();

                app.selection = myInsertionPoint;
                app.paste(); 
        }
}

function alinharLegenda(primeiroRetangulo, segundoRetangulo,myDocument){
    try{
        
    //Muda a unidade de medida atual para milimetros
    var guardaMedidaHorizontal = app.activeDocument.viewPreferences.horizontalMeasurementUnits;
    var guardaMedidaVertical = app.activeDocument.viewPreferences.verticalMeasurementUnits;

    with(app.activeDocument.viewPreferences){
        horizontalMeasurementUnits = MeasurementUnits.millimeters;
        verticalMeasurementUnits = MeasurementUnits.millimeters;
    }

    var arrayPrimeiro = primeiroRetangulo.geometricBounds;
    var arraySegundo = segundoRetangulo.geometricBounds;

    arraySegundo[1] = arrayPrimeiro[1];
    arraySegundo[3] = arrayPrimeiro[3];

    var altura = arraySegundo[2] - arraySegundo[0];

    var espessuraDaLinha = primeiroRetangulo.strokeWeight;

    //converte pt para mm
    espessuraDaLinha = espessuraDaLinha / 2.83286118980169971671388101983;

    //alert(primeiroRetangulo.strokeAlignment);


    if(primeiroRetangulo.strokeAlignment == "1936998729"){ //INSIDE_ALIGNMENT
        
        //alert("inside");
        
        espessuraDaLinha = 0;
        
        }
    else if(primeiroRetangulo.strokeAlignment == "1936998723"){ //CENTER_ALIGNMENT
        
        //alert("center");
        
        espessuraDaLinha = espessuraDaLinha / 2;
        
        }

    //if(primeiroRetangulo.strokeAlignment == 

    arraySegundo[0] = arrayPrimeiro[2] + 1 + espessuraDaLinha; //mm
    arraySegundo[2] = arrayPrimeiro[2] + 1 + espessuraDaLinha+ altura; //mm

    segundoRetangulo.geometricBounds = arraySegundo;

    //Tenta ajustar o tamanho da legenda
    //alert(segundoRetangulo);
    if(segundoRetangulo == "[object TextFrame]"){
        
        segundoRetangulo.fit(FitOptions.frameToContent);
        
        }
    //Distancia da parte debaixo da legenda
    arraySegundo = segundoRetangulo.geometricBounds;
    arraySegundo[2] = arraySegundo[2]+5;
    segundoRetangulo.geometricBounds = arraySegundo;

    //segundoRetangulo.geometricBounds = arraySegundo;


    //alert("Objetos alinhados","Lucas ®",false);

    //Devolve a unidade de medida original
    //var myDocument = app.activeDocument;
    with(app.activeDocument.viewPreferences){
        horizontalMeasurementUnits = guardaMedidaHorizontal;
        verticalMeasurementUnits = guardaMedidaVertical;
    }

    //CRIAR OS GRUPOS COM OS RETANGULOS SELECIONADOS
    /*
    app.selection = primeiroRetangulo;
    alert("01");
    app.selection = segundoRetangulo;
    alert("02");
    */

    var myArray = new Array;
    myArray.push(primeiroRetangulo);
    myArray.push(segundoRetangulo);
    myDocument.groups.add(myArray);
    

    }
    catch(e){
        
        alert(e,"Lucas ®",true);
        
        }

    //************ FIM PROGRAMA *************
}

function main(){
	var myFilteredFiles;
	//Make certain that user interaction (display of dialogs, etc.) is turned on.
	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll; 
	//myExtensions = [".jpg", ".jpeg", ".eps", ".ps", ".pdf", ".tif", ".tiff", ".gif", ".psd", ".ai"] 
	//Display the folder browser. 
	var myFolder = Folder.selectDialog("Select the folder containing the images", ""); 
    
    filtroDosArquivos(myFolder);
    
	//Get the path to the folder containing the files you want to place. 
	if(myFolder != null){ 
			if(File.fs == "Macintosh"){
				myFilteredFiles = myMacOSFileFilter(myFolder);
			}
			else{
				myFilteredFiles = myWinOSFileFilter(myFolder);
			}
			if(myFilteredFiles.length != 0){ 
					myDisplayDialog(myFilteredFiles, myFolder); 
                       alert("Tá feito","Lucas ®",false);
			} 
        else{
                       alert("Nenhuma imagem selecionada","Lucas ®",true);
                }
	}
}
//Windows version of the file filter.
function myWinOSFileFilter(myFolder){
	var myFiles = new Array;
	var myFilteredFiles = new Array; 
	for(myExtensionCounter = 0; myExtensionCounter < myExtensions.length; myExtensionCounter++){ 
		myExtension = myExtensions[myExtensionCounter]; 
        myFiles = myFolder.getFiles("*"+ myExtension); 
		if(myFiles.length != 0){ 
			for(var myFileCounter = 0; myFileCounter < myFiles.length; myFileCounter++){ 
                //alert(myFiles[myFileCounter].name);
				myFilteredFiles.push(myFiles[myFileCounter]); 
			} 
		} 
	}	
	return myFilteredFiles;
}
function myMacOSFileFilter(myFolder){
	var myFilteredFiles = myFolder.getFiles(myFileFilter);
	return myFilteredFiles;
}
//Mac OS version of file filter
//Have to provide a separate version because not all Mac OS users use file extensions
//and/or file extensions are sometimes hidden by the Finder.
function myFileFilter(myFile){
	var myFileType = myFile.type;
	switch (myFileType){
		case "JPEG":
		case "EPSF":
		case "PICT":
		case "TIFF":
		case "8BPS":
		case "GIFf":
		case "PDF ":
			return true;
			break;
		default:
		for(var myCounter = 0; myCounter<myExtensions.length; myCounter++){
			var myExtension = myExtensions[myCounter]; 	
			if(myFile.name.indexOf(myExtension)>-1){
				return true;
				break;			
			}
		}
	}
	return false;	
}
function filtroDosArquivos(myFolder){ 

    var checkAI;
    var checkJPG;
    var checkPSD;
    var checkPS;
    var checkPDF;
    var checkTIF;
    var checkGIF;
    
	var myLabelWidth = 112; 
	var myStyleNames = myGetParagraphStyleNames(app);
	var myLayerNames = ["Layer 1", "Labels"];
	var myDialog = app.dialogs.add({name:"Image Catalog"}); 
	with(myDialog.dialogColumns.add()){
		with(dialogRows.add()){ 
				staticTexts.add({staticLabel:"Tipos de arquivo a serem importados:"}); 
		} 
		with(borderPanels.add()){
			with(dialogColumns.add()){
				with(dialogRows.add()){ 
						checkEPS = checkboxControls.add({staticLabel:"EPS", checkedState:true}); 
						checkAI = checkboxControls.add({staticLabel:"AI", checkedState:true}); 
						checkJPG = checkboxControls.add({staticLabel:"JPG", checkedState:false});  //".jpg", ".jpeg"
						checkPSD = checkboxControls.add({staticLabel:"PSD", checkedState:false}); 
						checkPS = checkboxControls.add({staticLabel:"PS", checkedState:false}); 
						checkPDF = checkboxControls.add({staticLabel:"PDF", checkedState:false}); 
						checkTIF = checkboxControls.add({staticLabel:"TIF", checkedState:false});  //".tif", ".tiff", 
						checkGIF = checkboxControls.add({staticLabel:"GIF", checkedState:false}); 
				}
			}
		}
        var myResult = myDialog.show(); 
        if(myResult == true){ 
            //alert("oi");
            //myExtensions = [".jpg", ".jpeg", ".eps", ".ps", ".pdf", ".tif", ".tiff", ".gif", ".psd", ".ai"] 
            
            //alert(checkEPS.checkedState);
            
            if(checkEPS.checkedState){
                myExtensions.push(".eps");
                }
            if(checkAI.checkedState){
                myExtensions.push(".ai");
                }
            if(checkJPG.checkedState){
                myExtensions.push(".jpg");
                myExtensions.push(".jpeg");
                }
            if(checkPSD.checkedState){
                myExtensions.push(".psd");
                }
            if(checkPS.checkedState){
                myExtensions.push(".ps");
                }
            if(checkPDF.checkedState){
                myExtensions.push(".pdf");
                }
            if(checkTIF.checkedState){
                myExtensions.push(".tif");
                myExtensions.push(".tiff");
                }
            if(checkGIF.checkedState){
                myExtensions.push(".gif");
                }
            //alert(myExtensions);
			myDialog.destroy();
        } 
		else{
			myDialog.destroy(); 
		}
	}
}
function myDisplayDialogOld(myFiles, myFolder){ 
	var myLabelWidth = 112; 
	var myStyleNames = myGetParagraphStyleNames(app);
	var myLayerNames = ["Layer 1", "Labels"];
	var myDialog = app.dialogs.add({name:"Image Catalog"}); 
	with(myDialog.dialogColumns.add()){
		with(dialogRows.add()){ 
			staticTexts.add({staticLabel:"Information:"}); 
		}
		with(borderPanels.add()){
			with(dialogColumns.add()){
				with(dialogRows.add()){ 
					staticTexts.add({staticLabel:"Source Folder:", minWidth:myLabelWidth}); 
					staticTexts.add({staticLabel:myFolder.path + "/" + myFolder.name}); 
				} 
				with(dialogRows.add()){ 
					staticTexts.add({staticLabel:"Number of Images:", minWidth:myLabelWidth}); 
					staticTexts.add({staticLabel:myFiles.length + ""}); 
				} 
			}
		}
		with(dialogRows.add()){ 
				staticTexts.add({staticLabel:"Options:"}); 
		} 
		with(borderPanels.add()){
			with(dialogColumns.add()){
				with(dialogRows.add()){
					staticTexts.add({staticLabel:"Number of Rows:", minWidth:myLabelWidth}); 
					var myNumberOfRowsField = integerEditboxes.add({editValue:2}); 
				} 
				with(dialogRows.add()){ 
					staticTexts.add({staticLabel:"Number of Columns:", minWidth:myLabelWidth}); 
					var myNumberOfColumnsField = integerEditboxes.add({editValue:2}); 
				} 
				with(dialogRows.add()){ 
					staticTexts.add({staticLabel:"Horizontal Offset:", minWidth:myLabelWidth}); 
					var myHorizontalOffsetField = measurementEditboxes.add({editValue:12, editUnits:MeasurementUnits.points}); 
				} 
				with(dialogRows.add()){ 
					staticTexts.add({staticLabel:"Vertical Offset:", minWidth:myLabelWidth}); 
					var myVerticalOffsetField = measurementEditboxes.add({editValue:24, editUnits:MeasurementUnits.points}); 
				} 
				with (dialogRows.add()){
					with(dialogColumns.add()){
						staticTexts.add({staticLabel:"Fitting:", minWidth:myLabelWidth});  
					}
					with(dialogColumns.add()){
						var myFitProportionalCheckbox = checkboxControls.add({staticLabel:"Proportional", checkedState:false});
						var myFitCenterContentCheckbox = checkboxControls.add({staticLabel:"Center Content", checkedState:false});
						var myFitFrameToContentCheckbox = checkboxControls.add({staticLabel:"Frame to Content", checkedState:true});
					}
				}
				with(dialogRows.add()){ 
						var myRemoveEmptyFramesCheckbox = checkboxControls.add({staticLabel:"Remove Empty Frames:", checkedState:true}); 
				}
			}
		}
		with(dialogRows.add()){ 
				staticTexts.add({staticLabel:""}); 
		} 
		var myLabelsGroup = enablingGroups.add({staticLabel:"Labels", checkedState:true});
        //alert(myLabelsGroup.visible);    
		with (myLabelsGroup){
			with(dialogColumns.add()){
				//Label type
				with(dialogRows.add()){
					with(dialogColumns.add()){
						staticTexts.add({staticLabel:"Label Type:", minWidth:myLabelWidth});
					}
					with(dialogColumns.add()){
						var myLabelTypeDropdown = dropdowns.add({stringList:["File name", "File path", "XMP description", "XMP author"], selectedIndex:0});
					}
				}
				//Text frame height
				with(dialogRows.add()){
					with(dialogColumns.add()){
						staticTexts.add({staticLabel:"Label Height:", minWidth:myLabelWidth});
					}
					with(dialogColumns.add()){
						var myLabelHeightField = measurementEditboxes.add({editValue:24, editUnits:MeasurementUnits.points});
					}
				}
				//Text frame offset
				with(dialogRows.add()){
					with(dialogColumns.add()){
						staticTexts.add({staticLabel:"Label Offset:", minWidth:myLabelWidth});
					}
					with(dialogColumns.add()){
						var myLabelOffsetField = measurementEditboxes.add({editValue:0, editUnits:MeasurementUnits.points});
					}
				}
				//Style to apply
				with(dialogRows.add()){
					with(dialogColumns.add()){
						staticTexts.add({staticLabel:"Label Style:", minWidth:myLabelWidth});
					}
					with(dialogColumns.add()){
						var myLabelStyleDropdown = dropdowns.add({stringList:myStyleNames, selectedIndex:0});
					}
				}
				//Layer
				with(dialogRows.add()){
					with(dialogColumns.add()){
						staticTexts.add({staticLabel:"Layer:", minWidth:myLabelWidth});
					}
					with(dialogColumns.add()){
						var myLayerDropdown = dropdowns.add({stringList:myLayerNames, selectedIndex:0});
					}
				}
			}
		}
        var myResult = myDialog.show(); 
        if(myResult == true){ 
			var myNumberOfRows = myNumberOfRowsField.editValue; 
			var myNumberOfColumns = myNumberOfColumnsField.editValue; 
			var myRemoveEmptyFrames = myRemoveEmptyFramesCheckbox.checkedState;
			var myFitProportional = myFitProportionalCheckbox.checkedState;
			var myFitCenterContent = myFitCenterContentCheckbox.checkedState;
			var myFitFrameToContent = myFitFrameToContentCheckbox.checkedState;
			var myHorizontalOffset = myHorizontalOffsetField.editValue;
			var myVerticalOffset = myVerticalOffsetField.editValue;
			var myMakeLabels = myLabelsGroup.checkedState;
			var myLabelType = myLabelTypeDropdown.selectedIndex;
			var myLabelHeight = myLabelHeightField.editValue;
			var myLabelOffset = myLabelOffsetField.editValue;
			var myLabelStyle = myStyleNames[myLabelStyleDropdown.selectedIndex];
			var myLayerName = myLayerNames[myLayerDropdown.selectedIndex];
			myDialog.destroy();
			myMakeImageCatalog(myFiles, myNumberOfRows, myNumberOfColumns, myRemoveEmptyFrames, myFitProportional, myFitCenterContent, myFitFrameToContent, myHorizontalOffset, myVerticalOffset, myMakeLabels, myLabelType, myLabelHeight, myLabelOffset, myLabelStyle,  myLayerName); 
        } 
		else{
			myDialog.destroy(); 
		}
	}
}

function myDisplayDialog(myFiles, myFolder){ 
            var myLabelWidth = 112; 
            var myStyleNames = myGetParagraphStyleNames(app);
            var myLayerNames = ["Layer 1", "Labels"];
            var myDialog = app.dialogs.add({name:"Image Catalog"}); 
            
            var myDialog = app.dialogs.add({name:"Image Catalog"}); 
            with(myDialog.dialogColumns.add()){
                with(dialogRows.add()){ 
                    staticTexts.add({staticLabel:"Information:"}); 
                }
                with(borderPanels.add()){
                    with(dialogColumns.add()){
                        with(dialogRows.add()){ 
                            staticTexts.add({staticLabel:"Source Folder:", minWidth:myLabelWidth}); 
                            staticTexts.add({staticLabel:myFolder.path + "/" + myFolder.name}); 
                        } 
                        with(dialogRows.add()){ 
                            staticTexts.add({staticLabel:"Number of Images:", minWidth:myLabelWidth}); 
                            staticTexts.add({staticLabel:myFiles.length + ""}); 
                        } 
                    }
                }
            }
        
        var myResult = myDialog.show(); 
        if(myResult == true){ 
            
                    var myNumberOfRows = 2; 
                    var myNumberOfColumns = 2; 
                    var myRemoveEmptyFrames = true;
                    var myFitProportional = false;
                    var myFitCenterContent = false;
                    var myFitFrameToContent = true;
                    var myHorizontalOffset = 10;
                    var myVerticalOffset = 10;
                    var myMakeLabels = true;
                    var myLabelType = "File name";
                    var myLabelHeight = 24;
                    var myLabelOffset = 0;
                    var myLabelStyle = "[No Paragraph Style]";
                    var myLayerName = "Layer 1";
                    //myDialog.destroy();
                    myMakeImageCatalog(myFiles, myNumberOfRows, myNumberOfColumns, myRemoveEmptyFrames, myFitProportional, myFitCenterContent, myFitFrameToContent, myHorizontalOffset, myVerticalOffset, myMakeLabels, myLabelType, myLabelHeight, myLabelOffset, myLabelStyle,  myLayerName); 
                    myDialog.destroy();
            }
    }
function myGetParagraphStyleNames(myDocument){
	var myStyleNames = new Array;
	var myAddLabelStyle = true;
	for(var myCounter = 0; myCounter < myDocument.paragraphStyles.length; myCounter++){
		myStyleNames.push(myDocument.paragraphStyles.item(myCounter).name);
		if (myDocument.paragraphStyles.item(myCounter).name == "Labels"){
			myAddLabelStyle = false;
		}
	}
	if(myAddLabelStyle == true){
		myStyleNames.push("Labels");
	}
	return myStyleNames;
}
function myMakeImageCatalog(myFiles, myNumberOfRows, myNumberOfColumns, myRemoveEmptyFrames, myFitProportional, myFitCenterContent, myFitFrameToContent, myHorizontalOffset, myVerticalOffset, myMakeLabels, myLabelType, myLabelHeight, myLabelOffset, myLabelStyle,  myLayerName){
	var myPage, myFile, myCounter, myX1, myY1, myX2, myY2, myRectangle, myLabelStyle, myLabelLayer; 
	var myParagraphStyle, myError;
	var myFramesPerPage = myNumberOfRows * myNumberOfColumns;  
	var myDocument = app.documents.add(); 
	myDocument.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.points; 
	myDocument.viewPreferences.verticalMeasurementUnits = MeasurementUnits.points; 
	var myDocumentPreferences = myDocument.documentPreferences;  
	var myNumberOfFrames = myFiles.length; 
	var myNumberOfPages = Math.round(myNumberOfFrames / myFramesPerPage); 
	if ((myNumberOfPages * myFramesPerPage) < myNumberOfFrames){  
		myNumberOfPages++; 
	}
	//If myMakeLabels is true, then add the label style and layer if they do not already exist.
	if(myMakeLabels == true){
		try{
			myLabelLayer = myDocument.layers.item(myLayerName);
			//if the layer does not exist, trying to get the layer name will cause an error.
			myLabelLayer.name;
		}
		catch (myError){
			myLabelLayer = myDocument.layers.add({name:myLayerName}); 
		}
		//If the paragraph style does not exist, create it.
		try{
			myParagraphStyle = myDocument.paragraphStyles.item(myLabelStyle);
			myParagraphStyle.name;
		}
		catch(myError){
			myDocument.paragraphStyles.add({name:myLabelStyle});
		}        
	}
	myDocumentPreferences.pagesPerDocument = myNumberOfPages;  
	myDocumentPreferences.facingPages = false;  
	var myPage = myDocument.pages.item(0);  
	var myMarginPreferences = myPage.marginPreferences; 
	var myLeftMargin = myMarginPreferences.left;  
	var myTopMargin = myMarginPreferences.top;  
	var myRightMargin = myMarginPreferences.right;  
	var myBottomMargin = myMarginPreferences.bottom;  
	var myLiveWidth = (myDocumentPreferences.pageWidth - (myLeftMargin + myRightMargin)) + myHorizontalOffset
	var myLiveHeight = myDocumentPreferences.pageHeight - (myTopMargin + myBottomMargin)
	var myColumnWidth = myLiveWidth / myNumberOfColumns
	var myFrameWidth = myColumnWidth - myHorizontalOffset
	var myRowHeight = (myLiveHeight / myNumberOfRows)
	var myFrameHeight = myRowHeight - myVerticalOffset
	var myPages = myDocument.pages;
	// Construct the frames in reverse order. Don't laugh--this will  
	// save us time later (when we place the graphics).  
	for (myCounter = myDocument.pages.length-1; myCounter >= 0; myCounter--){  
		myPage = myPages.item(myCounter); 
		for (var myRowCounter = myNumberOfRows; myRowCounter >= 1; myRowCounter--){  
			myY1 = myTopMargin + (myRowHeight * (myRowCounter-1));
			myY2 = myY1 + myFrameHeight;
			for (var myColumnCounter = myNumberOfColumns; myColumnCounter >= 1; myColumnCounter--){  
				myX1 = myLeftMargin + (myColumnWidth * (myColumnCounter-1));
				myX2 = myX1 + myFrameWidth;
				myRectangle = myPage.rectangles.add(myDocument.layers.item(-1), undefined, undefined, {geometricBounds:[myY1, myX1, myY2, myX2], strokeWeight:0.5, strokeColor:myDocument.swatches.item("Black")});  
			} 
		}
	}
	// Because we constructed the frames in reverse order, rectangle 1  
	// is the first rectangle on page 1, so we can simply iterate through  
	// the rectangles, placing a file in each one in turn. myFiles = myFolder.Files;  
	for (myCounter = 0, myCounterFiles = 0; myCounterFiles < myNumberOfFrames; myCounter++){  
        
        myFile = myFiles[myCounterFiles++];  
        myRectangle = myDocument.rectangles.item(myCounter); 
        
        //alert(myFile.name); 
    
		myRectangle.place(File(myFile)); 
		myRectangle.label = myFile.fsName.toString();
		//Apply fitting options as specified.
		if(myFitProportional){
			myRectangle.fit(FitOptions.proportionally); 
		}
		if(myFitCenterContent){
			myRectangle.fit(FitOptions.centerContent); 
		}
		if(myFitFrameToContent){
			myRectangle.fit(FitOptions.frameToContent); 
		}
    
        var bordasTemp = myRectangle.geometricBounds;
        var distanciaBorda = 3;
        bordasTemp = [bordasTemp[0]-distanciaBorda,bordasTemp[1]-distanciaBorda,bordasTemp[2]+distanciaBorda,bordasTemp[3]+distanciaBorda]; 
        myRectangle.geometricBounds = bordasTemp;
        
		//Add the label, if necessary.
		if(myMakeLabels == true){ 
			myAddLabel(myRectangle, myLabelType, myLabelHeight, myLabelOffset, myLabelStyle, myLayerName);
            
            //ALINHA AS LEGENDAS E CRIAR OS GRUPOS
            alinharLegenda(myDocument.rectangles[myCounter], myDocument.textFrames[0],myDocument);
            myCounter--;
            // FIM ALINHA AS LEGENDAS E CRIAR OS GRUPOS
             
		} 
	}
	if (myRemoveEmptyFrames == 1){  
		for (var myCounter = myDocument.rectangles.length-1; myCounter >= 0;myCounter--){  
			if (myDocument.rectangles.item(myCounter).contentType == ContentType.unassigned){ 
				myDocument.rectangles.item(myCounter).remove(); 
			}  
			else{ 
				//As soon as you encounter a rectangle with content, exit the loop. 
				break; 
			} 
		}
	}

    //ADICIONA TODOS OS GRUPOS A UM FRAME  A UM GRUPO
    tudoProTextFrame(myDocument); 
    
    //alert("aqui");
    
    //VERIFICA SE O EXISTE OVERFLOW E ADICIONA MAIS FRAMES
    arrumaTextFrames(myDocument);
    
    
}
//Function that adds the label.
function myAddLabel(myFrame, myLabelType, myLabelHeight, myLabelOffset, myLabelStyleName, myLayerName){
	var myDocument = app.documents.item(0);
	var myLabel;
	var myLabelStyle = myDocument.paragraphStyles.item(myLabelStyleName);
	var myLabelLayer = myDocument.layers.item(myLayerName);
	var myLink =myFrame.graphics.item(0).itemLink;
    /*
	//Label type defines the text that goes in the label.
	switch(myLabelType){
		//File name
		case 0:
			myLabel = myLink.name;
			break;
		//File path
		case 1:
			myLabel = myLink.filePath;
			break;
		//XMP description
		case 2:
			try{
				myLabel = myLink.linkXmp.description;
				if(myLabel.replace(/^\s*$/gi, "")==""){
					throw myError;
				}
			}
			catch(myError){
				myLabel = "No description available.";
			}
			break;
		//XMP author
		case 3:
			try{
				myLabel = myLink.linkXmp.author
				if(myLabel.replace(/^\s*$/gi, "")==""){
					throw myError;
				}
			}
			catch(myError){
				myLabel = "No author available.";
			}
			break;
	}
    */
    myLabel = myLink.name;
	var myX1 = myFrame.geometricBounds[1]; 
	var myY1 = myFrame.geometricBounds[2] + myLabelOffset; 
	var myX2 = myFrame.geometricBounds[3]; 
	var myY2 = myY1 + myLabelHeight;
	var myTextFrame = myFrame.parent.textFrames.add(myLabelLayer, undefined, undefined,{geometricBounds:[myY1, myX1, myY2, myX2], contents:myLabel});  
	myTextFrame.textFramePreferences.firstBaselineOffset = FirstBaseline.leadingOffset; 
	myTextFrame.parentStory.texts.item(0).appliedParagraphStyle = myLabelStyle;				
}
