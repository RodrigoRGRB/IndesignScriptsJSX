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
		
		deslocamento += 0.9;      //Valor anterior era 0.7 -   16/10/12 - FB
	
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

//function criaCarimbo(textoCarimbo,myDocument,intervaloPDF){
function criaCarimbo(textoCarimbo,configuracaoPagina,myDocument,intervaloPDF,f){
	
//Remove carimbo anterior, se houver
removeCarimbo();

//Cria layer para adicionar carimbo
//app.activeDocument.layers.add({name:"ScriptLayer"});
//myDocument.layers.add({name:"ScriptLayer"});
var myLayer = myDocument.layers.add({name:"ScriptLayer"});

//Coloca o ScriptLayer como o primeiro layer
//myLayer.move(LocationOptions.AT_END); // move to the bottom
myLayer.move(LocationOptions.AT_BEGINNING); 
	
//Captura o nome do usuário do windows
var nomeUsuario = $.getenv('USERNAME');
nomeUsuario = nomeUsuario.toUpperCase();
//nomeUsuario = "Editora.Poliedro";


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
var bordaDireita = 10;

//Pega o número da prova
var numeroProva = textoCarimbo;
//Distância padrão entre as marcas
var constante = 9;
var PdfFinal = false;
var PdfFinal2 = false;

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

if(numeroProva=="PDF Final - Versão 2.0"){
	var PdfFinal2 = true;
	}

if(numeroProva=="PDF Final - Erratas"){
	var PdfFinal = true;
	}

//FIM ADICIONA ESPACOS 

//Se selecionar algum valor, executa inserção
if(numeroProva != null){
	
//Muda o numero da prova pra maiuscula
numeroProva = numeroProva.toUpperCase();

configuracaoPagina = configuracaoPagina.toUpperCase();

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
	function makeColor(colorName, colorSpace, colorModel, colorValue) {  
    var doc = app.activeDocument;  
    var color = doc.colors.item(colorName);  
    if (!color.isValid) {  
        color = doc.colors.add({name: colorName, space: colorSpace, model: colorModel, colorValue: colorValue});  
    }  
    return color;  
}

	
	if(PdfFinal == false){
				
				//Calcula o local para inserir o carimbo
				//Cria uma caixa imaginária fora da área de impressão da página
				var bounds = myPage.bounds;
				var itemBounds = [bounds[2]+3,bounds[1],bounds[2]+5,bounds[3]];

				//Adiciona e formata a prova
				var myTextFrame = myPage.textFrames.add();
				
				myTextFrame.textFramePreferences.ignoreWrap = true;
                
                  myTextFrame.textFramePreferences.textColumnCount = 1;
				
				myTextFrame.contents =f.name+" - " + data  +" - "+ nomeUsuario +" - "+  numeroProva;
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
    
     //Criar a nova cor
                   color = makeColor("C=0 M=0 Y=0 K=100", ColorSpace.CMYK, ColorModel.process, [0, 0, 0, 100]);
                   colorTeste = makeColor("C=0 M=0 Y=0 K=0", ColorSpace.CMYK, ColorModel.process, [0, 0, 0, 0]);
                   myParagraph.fillColor = color;
                   myParagraph.strokeColor = colorTeste;
                   myParagraph.strokeWeight = 0.5;
                   
				//Muda o tamanho e o estilo do caracter
				myParagraph.parentStory.appliedFont = app.fonts.item("Calibri\tBold");
				myParagraph.parentStory.pointSize = 6;
				
				myTextFrame.textFramePreferences.insetSpacing = [0,0,0,0];
				//alinhaTextFrame(myTextFrame,0,espacoTopo,bordaDireita,myPage,itemBounds);
				alinhaTextFrame(myTextFrame,0,itemBounds,false);
		}
	
		if(PdfFinal == true){
			
				//Calcula o local para inserir o carimbo
				//Cria uma caixa imaginária fora da área de impressão da página
				var bounds = myPage.bounds;
				var itemBounds = [bounds[2]+3,bounds[1],bounds[2]+5,bounds[3]];

				//Adiciona e formata a prova
				var myTextFrame = myPage.textFrames.add();
				
				myTextFrame.textFramePreferences.ignoreWrap = true;
                
                  myTextFrame.textFramePreferences.textColumnCount = 1;
				
				myTextFrame.contents ="Nome Arquivo - " +  nomeUsuario +" - "+  data+" - "+  numeroProva;
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