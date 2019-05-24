//*********** FUNCÃO REMOVE CARIMBO *********************
function removeCarimbo(){
	
	try{
		app.activeDocument.layers.item("ScriptLayer").remove();
	}
	catch(e){
		}
	
	}

//*********** FIM FUNCÃO REMOVE CARIMBO *********************




//*********** CRIA ARRAY COM PÁGINAS DO INTERVALO PDF *********************

function capturaIntervalo(intervaloPDF){
	
	var intervalo = intervaloPDF

	//Cria um array com o intervalo de páginas
	var arrayPaginas = new Array();
	var contador = 0;
	//alert(intervalo);
	intervalo = intervalo.split(",");

	for(x =0;x<intervalo.length;x++){

		var intervaloTemp = intervalo[x].split("-");
				
		if(intervaloTemp.length > 1){
			for(g = parseInt(intervaloTemp[0]); g <= (parseInt(intervaloTemp[1])); g++){
				//alert(g);
				arrayPaginas[contador] =  g;
				contador++;
				//alert(arrayPaginas);
			}
		}
		else{
				arrayPaginas[contador] = parseInt(intervaloTemp[0]);
				contador++;
			}
	}
//alert(arrayPaginas);
return arrayPaginas;
}

//*********** FIM CRIA ARRAY COM PÁGINAS DO INTERVALO PDF *********************

//*********** FUNCÃO DE ALINHAMENTO DO CARIMBO *********************
function alinhaTextFrame(textFrame,deslocamento,itemBounds,alinhar){
	
		//alert(textFrame.parent.parent.parent); //Spread
		//alert(textFrame.parent.parent); //Document
	
		//Calcula o local para inserir o carimbo
		//var bounds = itemBounds.geometricBounds;
		var bounds = itemBounds;
		
		deslocamento += 0.7;
	
		//Rotaciona e posiciona o texto
		textFrame.paragraphs.item(0).justification = Justification.centerAlign;
		
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

function criaCarimbo(textoCarimbo,myDocument,intervaloPDF){
	
//Remove carimbo anterior, se houver
removeCarimbo();

//Cria layer para adicionar carimbo
//app.activeDocument.layers.add({name:"ScriptLayer"});
myDocument.layers.add({name:"ScriptLayer"});

	
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
var marcaProva = new File(scriptsFile.path+"/Links/prova.pdf");

//var numeroDePaginas = app.activeDocument.pages.length;
//var myDocument = app.activeDocument;
var numeroDePaginas = capturaIntervalo(intervaloPDF); //Recebe o array de páginas
//var numeroDePaginas = myDocument.pages.length;
//var numeroDePaginas = myDocument.pages;
var bordaDireita = 15;

//Pega o número da prova
var numeroProva = textoCarimbo;
//Distância padrão entre as marcas
var constante = 9;
var PdfFinal = false;

//Set the measurement units to milimeters.
myDocument.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.millimeters;
myDocument.viewPreferences.verticalMeasurementUnits = MeasurementUnits.millimeters;


//ADICIONA ESPACOS DE ACORDO COM A PROVA SELECIONADA

//alert(numeroProva);

if(numeroProva=="2ª Prova"){
	espacoTopo += (constante*2);
	}

if(numeroProva=="3ª Prova"){
	espacoTopo += (constante*4);
	}

if(numeroProva=="4ª Prova"){
	espacoTopo += (constante*6);
	}

if(numeroProva=="5ª Prova"){
	espacoTopo += (constante*8);
	}

if(numeroProva=="6ª Prova"){
	espacoTopo += (constante*10);
	}

if(numeroProva=="7ª Prova"){
	espacoTopo += (constante*12);
	}

if(numeroProva=="8ª Prova"){
	espacoTopo += (constante*14);
	}

if(numeroProva=="PDF Final"){
	var PdfFinal = true;
	}

if(numeroProva=="PDF Final - Erratas"){
	var PdfFinal = true;
	}

//FIM ADICIONA ESPACOS 

//Se selecionar algum valor, executa inserção
if(numeroProva != null){
	
//Muda o numero da prova pra maiuscula
numeroProva = numeroProva.toUpperCase();

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

//alert(numeroDePaginas.length);

///******TEMP
//************* LABEL PROGRESS BAR ******************
myProgressPanel.pnl.text = "ADICIONANDO CARIMBO";
//************* LABEL PROGRESS BAR ******************
//*///***TEMP
//alert(numeroDePaginas);

for(i=0;i<numeroDePaginas.length;i++){
	
	//Importa o carimbo para a página atual
	//Get the current page.
	//alert(myDocument.pages[i].name);
	//var myPage = myDocument.pages[parseInt(numeroDePaginas[i].name)];
	//alert(numeroDePaginas[i]);
	var myPage = myDocument.pages.itemByName(""+parseInt(numeroDePaginas[i]));
	//var myPage = myDocument.pages[i];
	
	///******TEMP
	//************* INCREMENTA PROGRESS BAR ******************
	//myProgressPanel.myProgressBar.value = contador++;
	//alert(myPage.name);
	myProgressPanel.pnl.myProgressBarLabel.text = "Adicionando carimbo na página " + numeroDePaginas[i];  
	myProgressPanel.pnl.myProgressBar.value = contador++;
	//************* FIM INCREMENTA PROGRESS BAR ******************
	//*///***TEMP
	

	
	if(PdfFinal == false){
				
				/*
				//Calcula o local para inserir o carimbo
				var bounds = myPage.bounds;
				var myX = (bounds[3])-bordaDireita;
				var myY = (bounds[2]/2)+espacoTopo;
				*/
			
				//Calcula o local para inserir o carimbo
				var bounds = myPage.bounds;
				var myYTemp = (bounds[2]-Math.abs(bounds[0]));
				var myY = (myYTemp/2)+espacoTopo;
				var myX = (bounds[3])-bordaDireita;

				itemBounds = myPage.rectangles.add({geometricBounds:[myY, myX, myY+16, myX+5.7]});
				itemBounds.strokeColor = myDocument.swatches.item("Black");
				itemBounds.fillColor = myDocument.swatches.item("None");
				itemBounds.strokeTint = 100;
				itemBounds.strokeWeight = 0.5;
				

				//ADICIONA E FORMATA A PROVA
				var myTextFrame = myPage.textFrames.add();
				myTextFrame.contents = numeroProva;
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

				//Muda o tamanho e o estilo do caracter
				myParagraph.parentStory.appliedFont = app.fonts.item("Helvetica\tBold");
				myParagraph.parentStory.pointSize = 6;
				
				//alinhaTextFrame(myTextFrame,0,espacoTopo,bordaDireita,myPage,itemBounds);
				alinhaTextFrame(myTextFrame,-0.2,itemBounds.geometricBounds,true);


				//ADICIONA E FORMATA O NOME
				var myTextFrame3 = myPage.textFrames.add();
				myTextFrame3.contents = nomeUsuario;
				var myParagraph = myTextFrame3.paragraphs.item(0);
				
				//Muda o estilo do parágrafo
				myParagraphStyle = myDocument.paragraphStyles.item("[Basic Paragraph]");
				myParagraph.applyParagraphStyle(myParagraphStyle,true);

				//Muda o estilo do caracter
				myCharacterStyle = myDocument.characterStyles.item("[None]");
				myParagraph.applyCharacterStyle(myCharacterStyle,true);
				
				//Remove a cor do text frame
				myTextFrame3.fillColor = myDocument.swatches.item("None");
				myTextFrame3.strokeColor = myDocument.swatches.item("None");

				//Muda o tamanho e o estilo do caracter
				myParagraph.parentStory.appliedFont = app.fonts.item("Helvetica\tBold");
				myParagraph.parentStory.pointSize = 3.5;
				
				//alinhaTextFrame(myTextFrame3,1.8,espacoTopo,bordaDireita,myPage,itemBounds); 
				alinhaTextFrame(myTextFrame3,1.8,itemBounds.geometricBounds,true);

				//ADICIONA E FORMATA A DATA
				var myTextFrame2 = myPage.textFrames.add();
				myTextFrame2.contents = data;
				var myParagraph = myTextFrame2.paragraphs.item(0);
				
				//Muda o estilo do parágrafo
				myParagraphStyle = myDocument.paragraphStyles.item("[Basic Paragraph]");
				myParagraph.applyParagraphStyle(myParagraphStyle,true);

				//Muda o estilo do caracter
				myCharacterStyle = myDocument.characterStyles.item("[None]");
				myParagraph.applyCharacterStyle(myCharacterStyle,true);
				
				//Remove a cor do text frame
				myTextFrame2.fillColor = myDocument.swatches.item("None");
				myTextFrame2.strokeColor = myDocument.swatches.item("None");

				//Muda o tamanho e o estilo do caracter
				myParagraph.parentStory.appliedFont = app.fonts.item("Helvetica\tMedium");
				myParagraph.parentStory.pointSize = 4;
				
				//alinhaTextFrame(myTextFrame2,3,espacoTopo,bordaDireita,myPage,itemBounds);
				alinhaTextFrame(myTextFrame2,3.1,itemBounds.geometricBounds,true);
		}
	
		if(PdfFinal == true){
			
				//Calcula o local para inserir o carimbo
				//Cria uma caixa imaginária fora da área de impressão da página
				var bounds = myPage.bounds;
				var itemBounds = [bounds[2]+3,bounds[1],bounds[2]+5,bounds[3]];

				//Adiciona e formata a prova
				var myTextFrame = myPage.textFrames.add();
				myTextFrame.contents = numeroProva + " / " + nomeUsuario + " / " + data;
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

				//Muda o tamanho e o estilo do caracter
				myParagraph.parentStory.appliedFont = app.fonts.item("Helvetica\tBold");
				myParagraph.parentStory.pointSize = 6;
				
				//alinhaTextFrame(myTextFrame,0,espacoTopo,bordaDireita,myPage,itemBounds);
				alinhaTextFrame(myTextFrame,0,itemBounds,false);

		
		}


// CANCELA O PROGRESS BAR

//if (t.cancelled) break;

//****************************

}

}
//********************************************

//************ FINALIZA O PROGRESS BAR *****************

//t.end();

//**************************************************************
 }

//*********** FIM FUNCÃO CRIA CARIMBO *********************
/**************** TESTE DO CARIMBO
var carimbo = "2ª prova";
var intervaloPDF = "1-7";

criaCarimbo(carimbo,app.activeDocument,intervaloPDF);
*///*************** FIM TESTE DO CARIMBO