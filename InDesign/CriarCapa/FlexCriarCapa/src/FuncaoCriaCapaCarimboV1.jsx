//*********** FUNCÃO REMOVE CARIMBO *********************
function removeCarimbo(){
	
	try{
		app.activeDocument.layers.item("ScriptLayer").remove();
	}
	catch(e){
		}
	
	}

//*********** FIM FUNCÃO REMOVE CARIMBO *********************

//*********** FUNCÃO DE ALINHAMENTO DO CARIMBO *********************
function alinhaTextFrame(textFrame,deslocamento,itemBounds,alinhar){
	
		//alert(textFrame.parent.parent.parent); //Spread
		//alert(textFrame.parent.parent); //Document
	
		//Calcula o local para inserir o carimbo
		//var bounds = itemBounds.geometricBounds;
		var bounds = itemBounds;
		
		deslocamento += 0.7;
	
		//Rotaciona e posiciona o texto
		//textFrame.paragraphs.item(0).justification = Justification.centerAlign;
		textFrame.paragraphs.item(0).justification = Justification.leftAlign;
		
		if(alinhar){
			textFrame.rotationAngle = -90;
			textFrame.geometricBounds = [bounds[0],bounds[1]-deslocamento,bounds[2],bounds[3]-deslocamento];
			}
		else{
			//alert(textFrame.geometricBounds);
			textFrame.geometricBounds = [bounds[0],bounds[1],bounds[2],bounds[3]];
			}
		
		textFrame.fit(FitOptions.frameToContent);
		

	
	}

//*********** FIM FUNCÃO DE ALINHAMENTO DO CARIMBO *********************

//*********** FUNCÃO CRIA CARIMBO *********************

//function criaCarimbo(textoCarimbo,myDocument,intervaloPDF){
function criaCarimbo(textoCarimbo,myDocument){
	
//Remove carimbo anterior, se houver
//removeCarimbo();

//Cria layer para adicionar carimbo
//app.activeDocument.layers.add({name:"ScriptLayer"});
myDocument.layers.add({name:"Carimbo"});

	
//Captura o nome do usuário do windows
var nomeUsuario = $.getenv('USERNAME');
nomeUsuario = nomeUsuario.toUpperCase();
//nomeUsuario = "MARCELO.NASCIMENTO";


//Inicializa as variáveis
var espacoTopo = -50;

//this.xmlFile = new File(scriptsFile.parent.parent.fsName + "/resources/SnpXMLTreeView.xml");
//var marcaProva = this.xmlFile = new File(scriptsFile.parent.parent.fsName + "/resources/SnpXMLTreeView.xml");
//var marcaProva = "/I/Objetos/Scripts/AcrobatPDF/Prova/prova.pdf";
var scriptsFile = new File($.fileName);
//var marcaProva = new File(scriptsFile.path+"/Links/prova.pdf");

//var numeroDePaginas = app.activeDocument.pages.length;
//var myDocument = app.activeDocument;
//var numeroDePaginas = capturaIntervalo(intervaloPDF); //Recebe o array de páginas
//var numeroDePaginas = myDocument.pages.length;
//var numeroDePaginas = myDocument.pages;
var bordaDireita = 10;

//Pega o número da prova
var numeroProva = textoCarimbo;
//Distância padrão entre as marcas
var constante = 9;
var PdfFinal = false;

//Set the measurement units to milimeters.
myDocument.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.millimeters;
myDocument.viewPreferences.verticalMeasurementUnits = MeasurementUnits.millimeters;

//Se selecionar algum valor, executa inserção
if(numeroProva != null){
	
//Muda o numero da prova pra maiuscula
numeroProva = numeroProva.toUpperCase();

//configuracaoPagina = configuracaoPagina.toUpperCase();

//************ FIM CALCULAR NUMERO DA PROVA *************


//************ CALCULAR DATA *************
var d = new Date();
//var data = util.printd("dd-mm-yyyy (HH:MM)", d);
//var data = ""+d.getUTCDay()+"-"+d.getMonth()+"-"+d.getFullYear()+" ("+d.getHours()+":"+d.getMinutes()+")";

var mydate= new Date()
var theyear=""+mydate.getFullYear();
var themonth=""+(mydate.getMonth()+1);
var thetoday=""+mydate.getDate();
var theHour = ""+mydate.getHours();
var theMinutes = ""+mydate.getMinutes();


if(thetoday.length == 1){
	thetoday = "0"+thetoday;
	}

if(themonth.length == 1){
	themonth = "0"+themonth;
	}

if(theHour.length == 1){
	theHour = "0"+theHour;
	}

if(theMinutes.length == 1){
	theMinutes = "0"+theMinutes;
	}
	

var data = ""+thetoday+"-"+themonth+"-"+theyear+" ("+theHour+":"+theMinutes+")";
//alert(data);

//************ FIM CALCULAR DATA *************
	
	//Importa o carimbo para a página atual
	//var myPage = myDocument.pages.itemByName(""+parseInt(numeroDePaginas[i]));
	var myPage = myDocument.pages[0];
	//var myPage = myDocument.pages[i];
			
	//Calcula o local para inserir o carimbo
	//Cria uma caixa imaginária fora da área de impressão da página
	var bounds = myPage.bounds;
	var itemBounds = [bounds[2]+3,bounds[1],bounds[2]+5,bounds[3]];

	//Adiciona e formata a prova
	var myTextFrame = myPage.textFrames.add();
	
	myTextFrame.textFramePreferences.ignoreWrap = true;
	
	  myTextFrame.textFramePreferences.textColumnCount = 1;
	
	//myTextFrame.contents = numeroProva +" / " + configuracaoPagina +" / " + nomeUsuario + " / " + data;
	myTextFrame.contents = "     "+numeroProva +" / " + nomeUsuario + " / " + data;
	var myParagraph = myTextFrame.paragraphs.item(0);
	
	//Muda o estilo do parágrafo
	myParagraphStyle = myDocument.paragraphStyles.item("[Basic Paragraph]");
	myParagraph.applyParagraphStyle(myParagraphStyle,true);

	//Muda o estilo do caracter
	myCharacterStyle = myDocument.characterStyles.item("[None]");
	myParagraph.applyCharacterStyle(myCharacterStyle,true);
	
	//Remove a cor do text frame
	myTextFrame.fillColor = myDocument.swatches.item("None");
	myTextFrame.strokeColor = myDocument.swatches.item("None");
	
	myParagraph.clearOverrides();

	//Muda o tamanho e o estilo do caracter
	myParagraph.parentStory.appliedFont = app.fonts.item("Helvetica\tBold");
	myParagraph.parentStory.pointSize = 6;
	
	myTextFrame.textFramePreferences.insetSpacing = [0,0,0,0];
	//alinhaTextFrame(myTextFrame,0,espacoTopo,bordaDireita,myPage,itemBounds);
	alinhaTextFrame(myTextFrame,0,itemBounds,false);

}
//********************************************

//************ FINALIZA O PROGRESS BAR *****************

//t.end();

//**************************************************************
 }

//*********** FIM FUNCÃO CRIA CARIMBO *********************
/*
//**************** TESTE DO CARIMBO
//var carimbo = "2ª prova";
var carimbo = "> 2011 > Ensino Médio > Artes > 1º Ano > Livro 1 / Largura: 210 / Altura: 280 / Páginas: 304 / Lombada: 11.5";
//var intervaloPDF = "1-7";

criaCarimbo(carimbo,app.activeDocument);
//*************** FIM TESTE DO CARIMBO
*/