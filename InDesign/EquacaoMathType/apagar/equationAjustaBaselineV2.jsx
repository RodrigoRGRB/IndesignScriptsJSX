try{

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

//alert(objectEps[0].itemLink.filePath);
var caminhoArquivo = objectEps[0].itemLink.filePath; 

//alert(caminhoArquivo.split(".eps").length); 

var temp = caminhoArquivo.split(".eps").length;

temp = parseInt(temp);

//alert(temp);

//Se o objeto não for EPS não executa o script
if(temp == 1){
	throw "Erro eps";
}


//alert(objectEps[0].itemLink.filePath);
var caminhoArquivo = objectEps[0].itemLink.filePath; 

var eqn = File(caminhoArquivo);
//var eqn = File.openDialog("Salvar PDF ");

eqn.open("r");

//alert(eqn.read(2));
var baseline = eqn.read(1000).split("%%Baseline: ");

//alert(baseline[1]);
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

//Ajusta o leading da próxima linha
var story = pontoDeInsercao.parent;
var proximaLinha = story.lines.nextItem(pontoDeInsercao.lines[0]);

var fontSize = pontoDeInsercao.pointSize;
var leadingAtual = fontSize*1.2;

/*
//O leading equivale a dois terços do baseline + o leading atual
var leading = leadingAtual + ((baseline/3)*2);
*/

//Se a equacao for grande, incrementa o valor do leading
var tamanhoEquacao = arrayMyRectangle[2]-arrayMyRectangle[0];

//***************************
//Se distanciaBaseline for maior que a metade do tamanhoda equacao, executa o ajuste
var leadingMilimetros = tamanhoEquacao - (tamanhoEquacao - distanciaBaseline);
//mm para pt
var leading = leadingMilimetros*2.83286118980169971671388101983;
//alert(leadingAtual);
//leading = (leading + leadingAtual)-2;
leading = leading + ((leadingAtual/3)*1.85);
//alert(leading);

/*
alert("tamanho equação "+tamanhoEquacao);
alert("mm "+leadingMilimetros);
alert("pt "+leading);
*/
/*
//******************************************
if(tamanhoEquacao > 15 && tamanhoEquacao < 20){
	leading+= 3;
	}

if(tamanhoEquacao > 20 && tamanhoEquacao < 23){
	leading+= 8;
	}

if(tamanhoEquacao > 23 && tamanhoEquacao < 25){
	leading+= 13;
	}
*/
//alert(leading);
proximaLinha.leading = leading;

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