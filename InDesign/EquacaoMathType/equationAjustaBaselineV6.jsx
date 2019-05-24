try{
	
var menuName = "Ajustar equacões do MathType";
	
//Confere se o menu está selecionado
var scriptMenu = app.menus.item("$ID/Main").submenus.item("Poliedro Scripts");
var menuChecked = scriptMenu.menuItems.item(menuName).associatedMenuAction.checked;
//alert(menuChecked);

if(menuChecked == false){
	throw "Não selecionado";
	}

//Se objeto não for inserido na alça finaliza script
if(app.selection[0].parent != "[object Story]"){
	throw "Erro Story";
}

//Captura o arquivo que foi importado com o place
//Verifica aonde o cursor dentro do frame está ativo e captura o arquivo que está na sequencia
var pontoDeInsercao = app.selection[0];
var proximoPontoDeInsercao = pontoDeInsercao.parent.insertionPoints.nextItem(pontoDeInsercao); 
var rangeInsercao = pontoDeInsercao.parent.insertionPoints.itemByRange(pontoDeInsercao,proximoPontoDeInsercao);
var objectEps = rangeInsercao.allGraphics[0];

//Se largura do objeto tiver sofrido o CROP, lança um erro para finalizar script
var myRectangle = objectEps[0].parent;
var myGraphics = objectEps[0];
//alert(myGraphics.geometricBounds);
//alert(myRectangle.geometricBounds);

if(myGraphics.geometricBounds[3] != myRectangle.geometricBounds[3]){
	throw "Erro Crop";
}

//alert(objectEps[0].itemLink.filePath);
var caminhoArquivo = objectEps[0].itemLink.filePath; 

var temp = caminhoArquivo.split(".eps").length;
temp = parseInt(temp);

//Se o objeto não for EPS não executa o script
if(temp == 1){
	throw "Erro eps";
}


//alert(objectEps[0].itemLink.filePath);
var caminhoArquivo = objectEps[0].itemLink.filePath; 

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
var myRectangle = objectEps[0].parent;
var arrayMyRectangle = myRectangle.geometricBounds;

//Converte baseline em milimetros e movimenta a equação
var distanciaBaseline = baseline/2.8344671201814058956916099773243;
myRectangle.move(undefined, [0, distanciaBaseline]);

//Crop na largura
myRectangle = objectEps[0].parent;
var arrayBounds = myRectangle.geometricBounds;
arrayBounds[1] = arrayBounds[1]+0.65;
arrayBounds[3] = arrayBounds[3]-0.7;
myRectangle.geometricBounds = arrayBounds;

//Insere um espaço antes e depois da equação

/*
//********** ADICIONA ESPAÇO ***********
//Se nao existir um espaço no próximo ponto de inserção, adiciona " ";
var proximoPontoDeInsercao = 0;
proximoPontoDeInsercao = pontoDeInsercao.parent.insertionPoints.nextItem(pontoDeInsercao); 
var depoisDaEquacaoPontoDeInsercao = pontoDeInsercao.parent.insertionPoints.nextItem(proximoPontoDeInsercao); 
var rangeInsercao = pontoDeInsercao.parent.insertionPoints.itemByRange(proximoPontoDeInsercao,depoisDaEquacaoPontoDeInsercao);
//alert(rangeInsercao.contents);
if(rangeInsercao.contents != " "){
	
	rangeInsercao.contents = " "+rangeInsercao.contents;
	
	}

//Se nao existir um espaço antes do ponto de inserção, adiciona " ";
var anteriorPontoDeInsercao = 0;
anteriorPontoDeInsercao = pontoDeInsercao.parent.insertionPoints.previousItem(pontoDeInsercao); 
//var antesDaEquacaoPontoDeInsercao = pontoDeInsercao.parent.insertionPoints.previousItem(anteriorPontoDeInsercao); 
var rangeInsercao = pontoDeInsercao.parent.insertionPoints.itemByRange(anteriorPontoDeInsercao,pontoDeInsercao);
//alert(rangeInsercao.contents);
if(rangeInsercao.contents != " "){
	
	rangeInsercao.contents = rangeInsercao.contents+" ";
	
	}

//********** FIM ADICIONA ESPAÇO ***********
*/


//Ajusta o leading da próxima linha
var story = pontoDeInsercao.parent;
var proximaLinha = story.lines.nextItem(pontoDeInsercao.lines[0]);
var fontSize = pontoDeInsercao.pointSize;
var leadingAtual = fontSize*1.2;

//Confere todos 
var tamanhoEquacao = arrayMyRectangle[2]-arrayMyRectangle[0];
var leadingMilimetros = tamanhoEquacao - (tamanhoEquacao - distanciaBaseline);

//mm para pt
var leading = leadingMilimetros*2.83286118980169971671388101983;
leading = leading + ((leadingAtual/3)*1.85);

/*
alert(proximaLinha.leading);
alert(proximaLinha.characters[proximaLinha.characters.length-1].leading);
alert(leading);
*/

if(proximaLinha.characters[proximaLinha.characters.length-1].leading == "1635019116"){
	var leadingUltimoCaracter = leadingAtual;
	}
else{
	var leadingUltimoCaracter = proximaLinha.characters[proximaLinha.characters.length-1].leading;
	}

if(leadingAtual < leading){
	//if(proximaLinha.leading == "1635019116" || proximaLinha.leading < leading){
	if(leadingUltimoCaracter < leading){
		proximaLinha.leading = leading;
		//proximaLinha.characters[0].leading = leading;
	}
}

//alert("OK");

//Arruma terceira linha
//Pega o leading do último caractere da terceira linha e configura para toda a linha
var terceiraLinha = story.lines.nextItem(proximaLinha);
var leadingTerceiraLinha = terceiraLinha.characters[terceiraLinha.characters.length-1].leading;
//alert(leadingTerceiraLinha);
terceiraLinha.leading = leadingTerceiraLinha;

//Devolve a unidade de medida original
var myDocument = app.activeDocument;
with(myDocument.viewPreferences){
	horizontalMeasurementUnits = guardaMedidaHorizontal;
	verticalMeasurementUnits = guardaMedidaVertical;
}
}
catch(e){
	//alert(e);
	}