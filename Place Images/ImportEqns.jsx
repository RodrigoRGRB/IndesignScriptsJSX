function funcaoAjustaEquacao(graphics){
	
		//Se largura do objeto tiver sofrido o CROP, lança um erro para finalizar script
		var myRectangle = graphics.parent;
		var myGraphics = graphics;
		
		//alert(myGraphics.itemLink.filePath);
		/*
		alert(myGraphics.geometricBounds);
		alert(myRectangle.geometricBounds);
		*/

		if(myGraphics.geometricBounds[3] != myRectangle.geometricBounds[3]){
			throw "Erro Crop";
		}

		//alert(myGraphics.itemLink.filePath);
		var caminhoArquivo = myGraphics.itemLink.filePath; 

		var temp = caminhoArquivo.split(".eps").length;
		temp = parseInt(temp);

		//Se o objeto não for EPS não executa o script
		if(temp == 1){
			throw "Erro eps";
		}
		
		//alert(myGraphics.itemLink.filePath);
		var caminhoArquivo = myGraphics.itemLink.filePath; 

		var eqn = File(caminhoArquivo);
		//var eqn = File.openDialog("Salvar PDF ");

		eqn.open("r");

		//alert(eqn.read());
		var baseline = eqn.read(1000).split("%%Baseline: ");

		//alert(baseline[1]);

		/*
		var eqn2 = new File("/D/Lucas/equa.txt");
		var arquivoTXT = eqn.read(1000).split("%%Baseline: ");
		eqn2.open( "w" ); 
		eqn2.write(arquivoTXT); 
		eqn2.close(); 
		*/

		var baseline = baseline[1].split("%%");

		//alert(baseline[0]);
		baseline = baseline[0];
		eqn.close();

		//alert(baseline);

		baseline = parseInt(baseline);
		//alert(baseline);

		//Muda a unidade de medida atual para milimetros
		var guardaMedidaHorizontal = app.activeDocument.viewPreferences.horizontalMeasurementUnits;
		var guardaMedidaVertical = app.activeDocument.viewPreferences.verticalMeasurementUnits;

		var myDocument = app.activeDocument;
		with(myDocument.viewPreferences){
			horizontalMeasurementUnits = MeasurementUnits.millimeters;
			verticalMeasurementUnits = MeasurementUnits.millimeters;
		}

		//seleciona o link atual e ajusta de acordo com o baseline
		var myRectangle = myGraphics.parent;
		var arrayMyRectangle = myRectangle.geometricBounds;

		//Converte baseline em milimetros e movimenta a equação
		var distanciaBaseline = baseline/2.8344671201814058956916099773243;
		myRectangle.move(undefined, [0, distanciaBaseline]);

		//Crop na largura
		myRectangle = myGraphics.parent;
		var arrayBounds = myRectangle.geometricBounds;
		arrayBounds[1] = arrayBounds[1]+0.65;
		arrayBounds[3] = arrayBounds[3]-0.7;
		myRectangle.geometricBounds = arrayBounds;

		//Ajusta o leading da próxima linha
		//alert(pontoDeInsercao.paragraphs[0]);
		
		//var story = pontoDeInsercao.parent; 		
		var story = pontoDeInsercao.paragraphs[0];
		var proximaLinha = story.lines.nextItem(pontoDeInsercao.lines[0]);
		var fontSize = pontoDeInsercao.pointSize;
		var leadingAtual = fontSize*1.2;
		
		//alert("01");

		//Confere todos 
		var tamanhoEquacao = arrayMyRectangle[2]-arrayMyRectangle[0];
		var leadingMilimetros = tamanhoEquacao - (tamanhoEquacao - distanciaBaseline);

		//mm para pt
		var leading = leadingMilimetros*2.83286118980169971671388101983;
		leading = leading + ((leadingAtual/3)*1.85);
		
		//alert("02");
		
		var charactersLength = 1*proximaLinha.characters.length;

		if(proximaLinha.characters[charactersLength-1].leading == "1635019116"){
			var leadingUltimoCaracter = leadingAtual;
			}
		else{
			var leadingUltimoCaracter = proximaLinha.characters[charactersLength-1].leading;
			}
		
		//alert("03");

		if(leadingAtual < leading){
			//if(proximaLinha.leading == "1635019116" || proximaLinha.leading < leading){
			if(leadingUltimoCaracter < leading){
				proximaLinha.leading = leading;
				//proximaLinha.characters[0].leading = leading;
			}
		}

		//alert("04");

		//Arruma terceira linha
		//Pega o leading do último caractere da terceira linha e configura para toda a linha
		var terceiraLinha = story.lines.nextItem(proximaLinha);
		var leadingTerceiraLinha = terceiraLinha.characters[terceiraLinha.characters.length-1].leading;
		//alert(leadingTerceiraLinha);
		terceiraLinha.leading = leadingTerceiraLinha;
		
		//alert("05");

		//Devolve a unidade de medida original
		var myDocument = app.activeDocument;
		with(myDocument.viewPreferences){
			horizontalMeasurementUnits = guardaMedidaHorizontal;
			verticalMeasurementUnits = guardaMedidaVertical;
		}
	
		//alert("OK");
	
}
//Fim FUNÇÂO EQUACAO

var name, f, file, text,
	arr = [];
	
	if(app.documents.length != 0) {
		var doc = app.activeDocument;	
		var folder = Folder.selectDialog("Selecione a pastas com os MATHTYPES");

		if (folder != null) {
			app.findObjectPreferences = app.changeGrepPreferences  = NothingEnum.NOTHING;
			app.findGrepPreferences.findWhat = "<<.+?>>";
			f = doc.findGrep(true);
            
            if(f.length >0){
                alert('achamos coisas');
                }
			
			for (i = 0; i < f.length; i++) {
				
                name = f[i].contents.replace(/</g, "");
                    
                    
                  nameFinal = name.replace(/>/g, "");
                  
                  
				file = new File(folder.fsName + "/" + nameFinal);
				
				if (file.exists) {
					
                    f[i].remove();
                    var pontoDeInsercao = f[i].insertionPoints[0]
                    f[i].insertionPoints[0].place(file);
                                 
                   
                   var numeroDeGraficos = pontoDeInsercao.lines[0].allGraphics.length;
                    //alert(numeroDeGraficos);  
                                                                       
                 
                    try{
                    funcaoAjustaEquacao(pontoDeInsercao.lines[0].allGraphics[0]);
                    }
                    catch(e){
                        //Erro da função
                        //alert("Erro da função: "+ e);
                        }
                                     
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