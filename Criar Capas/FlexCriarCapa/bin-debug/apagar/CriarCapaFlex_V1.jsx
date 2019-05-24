#includepath "/I/Objetos/Scripts/InDesign/CriarCapa/FlexCriarCapa/src"
#include "FuncaoExportarPDF.jsx"

var template = "/I/Objetos/Scripts/InDesign/CriarCapa/Template/CapaTemplate.indt";
var rodaPrograma = false;
var nome;
var capaLargura;
var capaAltura;
var capaLombada;
var sangriaDirEsq;
var sangriaInfSup;
var arquivoCapa;
var arquivoCapa;
var arquivoISBN;
var isbnNum;
var layerISBN;
var posIsbnX;
var posIsbnY;
var arquivoPDF;
var fecharIndesign;

//************ CRIA PROGRESS BAR ****************

#targetengine "session"
//Because these terms are defined in the "session" engine,
//they will be available to any other JavaScript running
//in that instance of the engine.
//function myCreateProgressPanel(myMaximumValue, myProgressBarWidth){

// Create a palette-type window (a modeless or floating dialog),
var myProgressPanel = new Window("palette", "Fechar PDF - Lucas ®", [150, 150, 600, 270]); 
this.windowRef = myProgressPanel;

// Add a panel to contain the components
myProgressPanel.pnl = myProgressPanel.add("panel", [10, 10, 440, 100], "Iniciando script");

// Add a progress bar with a label and initial value of 0, max value of 200.
myProgressPanel.pnl.myProgressBarLabel = myProgressPanel.pnl.add("statictext", [20, 20, 320, 35], "Iniciando script");
myProgressPanel.pnl.myProgressBar = myProgressPanel.pnl.add("progressbar", [20, 35, 410, 60], 0, 200);

// Add buttons
//myProgressPanel.goButton = myProgressPanel.add("button", [25, 110, 125, 140], "Start");
//myProgressPanel.resetButton = myProgressPanel.add("button", [150, 110, 250, 140], "Reset");
//myProgressPanel.doneButton = myProgressPanel.add("button", [310, 110, 410, 140], "Done");
/*
myProgressPanel.cnlButton = myProgressPanel.add("button", [25, 110, 125, 140], "Cancelar");

myProgressPanel.cnlButton.onClick = function () {
    //alert("oi");
    myProgressPanel.close();
    }
    */

myProgressPanel.center();
    
//}

//************ FIM CRIA PROGRESS BAR ****************

//************* FUNCAO PARA CRIAR CÓDIGO DE BARRAS *************

function criaISBN(funcaoNumeroISBN,myDocument){

var arrayImpar = [];
arrayImpar[0] = "0001101";
arrayImpar[1] = "0011001";
arrayImpar[2] = "0010011";
arrayImpar[3] = "0111101";
arrayImpar[4] = "0100011";
arrayImpar[5] = "0110001";
arrayImpar[6] = "0101111";
arrayImpar[7] = "0111011";
arrayImpar[8] = "0110111";
arrayImpar[9] = "0001011";

var arrayPar = [];
arrayPar[0] = "0100111";
arrayPar[1] = "0110011";
arrayPar[2] = "0011011";
arrayPar[3] = "0100001";
arrayPar[4] = "0011101";
arrayPar[5] = "0111001";
arrayPar[6] = "0000101";
arrayPar[7] = "0010001";
arrayPar[8] = "0001001";
arrayPar[9] = "0010111";

var arrayR = [];
arrayR[0] = "1110010";
arrayR[1] = "1100110";
arrayR[2] = "1101100";
arrayR[3] = "1000010";
arrayR[4] = "1011100";
arrayR[5] = "1001110";
arrayR[6] = "1010000";
arrayR[7] = "1000100";
arrayR[8] = "1001000";
arrayR[9] = "1110100";

var arrayCodificacao = [];
arrayCodificacao[0] = "iiiiii";
arrayCodificacao[1] = "iipipp";
arrayCodificacao[2] = "iippip";
arrayCodificacao[3] = "iipppi";
arrayCodificacao[4] = "ipiipp";
arrayCodificacao[5] = "ippiip";
arrayCodificacao[6] = "ipppii";
arrayCodificacao[7] = "ipipip";
arrayCodificacao[8] = "ipippi";
arrayCodificacao[9] = "ippipi";


//var isbn = "4012345678901";
var isbn = funcaoNumeroISBN;
isbn = isbn.split("");

//alert(isbn[12]);

var isbnEsquerda = [isbn[1],isbn[2],isbn[3],isbn[4],isbn[5],isbn[6]];
//alert(isbnEsquerda);

var isbnDireita = [isbn[7],isbn[8],isbn[9],isbn[10],isbn[11],isbn[12]];
//alert(isbnDireita);

//************ CALCULA NUMEROS DA COLUNA DIREITA DO ISBN *****************

var numerosBinariosEsquerda = "";

var codificacao = arrayCodificacao[isbn[0]];
codificacao = codificacao.split("");
//alert(codificacao);
//alert(isbn[0] +" tem codificacao "+codificacao);

for(i=0;i<isbnEsquerda.length;i++){
    
    if(codificacao[i] == "i"){
        numerosBinariosEsquerda = numerosBinariosEsquerda+arrayImpar[isbnEsquerda[i]];
        }
    else{
        numerosBinariosEsquerda = numerosBinariosEsquerda+arrayPar[isbnEsquerda[i]];
        }    
    }
    
//alert(numerosBinariosEsquerda);

//************ FIM DA COLUNA ESQUERDA DO ISBN *****************

//************ CALCULA NUMEROS DA COLUNA DIREITA DO ISBN *****************
var numerosBinariosDireita = "";

for(i=0;i<isbnDireita.length;i++){
    numerosBinariosDireita = numerosBinariosDireita+arrayR[isbnDireita[i]];
    }

//alert(numerosBinariosDireita);

//************ FIM DA COLUNA DIREITA DO ISBN *****************

var numerosBinariosFinal = numerosBinariosEsquerda+numerosBinariosDireita;

//alert(numerosBinariosFinal);

constroiISBN(numerosBinariosFinal,myDocument);

//*********** ADICIONA OS NÚMEROS DO ISBN********************************

/*
myDocument = app.activeDocument;
var isbn = "9788598293295";
isbn = isbn.split("");
*/

myRectangle = myDocument.groups[12];

//Preenche o número acima do código
var numeroISBNSeparado = "ISBN "+isbn[0]+isbn[1]+isbn[2]+"-"+isbn[3]+isbn[4]+"-"+isbn[5]+isbn[6]+isbn[7]+isbn[8]+isbn[9]+"-"+isbn[10]+isbn[11]+"-"+isbn[12]
myRectangle.textFrames[0].contents = numeroISBNSeparado;
//myRectangle.textFrames[0].contents = numeroISBNSeparado;

//Ajusta largura do textFrame
myDocument.layoutWindows[0].transformReferencePoint =AnchorPoint.LEFT_CENTER_ANCHOR;
myRectangle.textFrames[0].fit(FitOptions.FRAME_TO_CONTENT);

//alert(myRectangle.textFrames[0].geometricBounds);
var larguraDoFrame = myRectangle.textFrames[0].geometricBounds[3]-myRectangle.textFrames[0].geometricBounds[1];
//alert(larguraDoFrame);

var larguraDaBarra = 28.197;

var porcentagem = (larguraDoFrame*100)/larguraDaBarra;
while(porcentagem<101){
myRectangle.textFrames[0].horizontalScale = 101;
    larguraDoFrame = myRectangle.textFrames[0].geometricBounds[3]-myRectangle.textFrames[0].geometricBounds[1];
    porcentagem = (larguraDoFrame*100)/larguraDaBarra;
    //alert(porcentagem);
}

//Preenche os números abaixo do código
for(x=0; x < myRectangle.textFrames.length-1;x++){

    myRectangle.textFrames[x+1].contents = ""+isbn[x];

}

//alert("aqui");

//*********** FIM ADICIONA OS NÚMEROS DO ISBN********************************

}


function constroiISBN(numerosBinariosFinalTemp,myDocumentTemp){

            //myDocument = app.activeDocument;
            var myDocument = myDocumentTemp;

            /*
            var numeroDeBarras = myDocument.rectangles;
            var numeroDeBarrasContador = numeroDeBarras.length;
            //alert(myDocument.rectangles.length);
            */
            
            var numeroDeBarras = myDocument.groups[12].rectangles;
            var numeroDeBarrasContador = numeroDeBarras.length;

            var numerosBinariosFinal =""+numerosBinariosFinalTemp;
            numerosBinariosFinal = numerosBinariosFinal.split("");
            //alert(numerosBinariosFinal);
            //alert(numeroDeBarras.length);

            // ********************* Exclui as barras do código de barras **************
            var y = 0;
            for(x = 0; x < numeroDeBarrasContador; x++){ 
                //alert(x);
                //alert(y);
                /*
                //Pula as 2 barras centrais
                if(y == 44){
                    x = x+2;
                    }
                    */
                
                if(numerosBinariosFinal[y] == "0"){
                    numeroDeBarras[x].remove();
                    x--
                    numeroDeBarrasContador--
                    }
                
                y++
                
                }
            //alert("aqui");
            // ********************* Fim exclui as barras do código de barras **************
    }

//************* FIM FUNCAO PARA CRIAR CÓDIGO DE BARRAS *************

//************* FUNCAO VERIFICA PDF ****************

function verificaPDF(f){
	if(f != null){
	try{
		var myDocumentTemp = app.documents.add(false);
		//alert(myDocumentTemp);
		
		app.pdfExportPreferences.viewPDF = false;
		//app.activeDocument.exportFile(ExportFormat.pdfType,f,false);
		myDocumentTemp.exportFile(ExportFormat.pdfType,f,false);
		
		if((myDocumentTemp+"") != "undefined"){
			myDocumentTemp.close();
		}
		//alert(f);
		
		return f;
	}
	catch(e){
        
        //alert(e);
		
        //var mensagemErro = "Error: Cannot save to the file \""+f.displayName+"\".  You may not have permission or the file may be in use."
        var mensagemErro = " because it is already open."
        
         //alert(e.split(",")+"\n"+mensagemErro);
         var errorTemp = e+"";
         errorTemp = errorTemp.split(',');
         errorTemp = errorTemp[1];
         
         //alert(errorTemp+"\n"+mensagemErro);
        
        

		if((errorTemp+"") == mensagemErro){
			
			alert("Erro: Você não pode salvar o arquivo \""+f.displayName+"\". Você não tem permissão ou o arquivo está em uso.","Lucas ®",true);
			f = File.saveDialog("Salvar PDF ", "*.pdf");
			//if(f != null){ f = verificaPDF(f);}
			f = verificaPDF(f);
			
			}
		
		if((myDocumentTemp+"") != "undefined"){
			myDocumentTemp.close();
		}
		//alert(f);
		return f;
	}
	}
	else{
		return null;
		}
		
}

//************* FIM FUNCAO VERIFICA PDF ****************

//FUNÇÕES DE ALINHAMENTO
		function alinharDireita(myGraphic){
			var distancia;
			//alert(myGraphic.parent.geometricBounds);
			//alert(myGraphic.geometricBounds);
			var bordasRetangulo = myGraphic.parent.geometricBounds;
			var bordasLink = myGraphic.geometricBounds;
			
			//Distancia da borda direita do retangulo até o link
			distancia = bordasRetangulo[3]-bordasLink[3];
			
			//Ajusta borda direita
			myGraphic.geometricBounds = [bordasLink[0], bordasLink[1]+distancia, bordasLink[2], bordasRetangulo[3]];
			
			//alert("executando");
			
			}

		function alinharEsquerda(myGraphic){
			var distancia;
			var bordasRetangulo = myGraphic.parent.geometricBounds;
			var bordasLink = myGraphic.geometricBounds;
			
			//Distancia da borda esquerda do retangulo até o link
			distancia = bordasRetangulo[1]-bordasLink[1];
			
			//Ajusta borda direita
			myGraphic.geometricBounds = [bordasLink[0], bordasRetangulo[1], bordasLink[2], bordasLink[3]+distancia];
			
			}

		function centralizarH(myGraphic){
			var distancia;
			var bordasRetangulo = myGraphic.parent.geometricBounds;
			var bordasLink = myGraphic.geometricBounds;
			
			distancia = (bordasRetangulo[3]-bordasLink[3])+(bordasRetangulo[1]-bordasLink[1]);
			
			//Ajusta borda direita
			myGraphic.geometricBounds = [bordasLink[0], bordasLink[1]+(distancia/2), bordasLink[2], bordasLink[3]+(distancia/2)];
			
			}

		function centralizarV(myGraphic){
			var distancia;
			var bordasRetangulo = myGraphic.parent.geometricBounds;
			var bordasLink = myGraphic.geometricBounds;
			
			//Distancia da borda até o link
			distancia = (bordasRetangulo[0]-bordasLink[0])+(bordasRetangulo[2]-bordasLink[2]);
			
			//Ajusta borda direita
			myGraphic.geometricBounds = [bordasLink[0]+(distancia/2), bordasLink[1], bordasLink[2]+(distancia/2), bordasLink[3]];
			
			}
		
		function centralizar(myGraphic){
			centralizarH (myGraphic);
			centralizarV (myGraphic);
			}
		
//FIM DAS FUNÇÕES DE ALINHAMENTO

//***************ALINHA AS MARCAS DE CORTE**************

function alinharMarcasDeCorte(){
	
		//Alinha primeira marca de corte
		
		//Alinha a primeira marca de corte - OK
		var bordaAtual = myDocument.groups[0].geometricBounds;
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[0].geometricBounds = [-10,-10,0,0];
		
		//Alinha a segunda marca de corte (registro)
		var bordaAtual = myDocument.groups[1].geometricBounds;
		var altura = bordaAtual[2]-bordaAtual[0];
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[1].geometricBounds = [(capaAltura/2)-(altura/2),0-largura-1,(capaAltura/2)+(altura/2),-1];
		
		//Alinha a terceira marca de corte - OK
		var bordaAtual = myDocument.groups[2].geometricBounds;
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[2].geometricBounds = [capaAltura,-10,capaAltura+10,0];

		//Alinha a quarta marca de corte - OK
		var bordaAtual = myDocument.groups[3].geometricBounds;
		myDocument.groups[3].geometricBounds = [-10,capaLargura,-3,capaLargura+1];
		
		//Alinha a quinta marca de corte - OK
		var bordaAtual = myDocument.groups[4].geometricBounds;
		myDocument.groups[4].geometricBounds = [capaAltura+3,capaLargura,capaAltura+10,capaLargura+1]; 
		
		//Alinha a sexta marca de corte  (registro)
		var bordaAtual = myDocument.groups[5].geometricBounds;
		var altura = bordaAtual[2]-bordaAtual[0];
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[5].geometricBounds = [0-1-altura,(capaLargura+(capaLombada/2))-(largura/2),-1,(capaLargura+(capaLombada/2))+(largura/2)];	

		//Alinha a sétima marca de corte  (registro)
		var bordaAtual = myDocument.groups[6].geometricBounds;
		var altura = bordaAtual[2]-bordaAtual[0];
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[6].geometricBounds = [capaAltura+1,(capaLargura+(capaLombada/2))-(largura/2),capaAltura+altura+1,(capaLargura+(capaLombada/2))+(largura/2)];
		
		//Alinha a oitava marca de corte - OK
		var bordaAtual = myDocument.groups[7].geometricBounds;
		myDocument.groups[7].geometricBounds = [-10,capaLargura+capaLombada,-3,capaLargura+capaLombada+1];
		
		//Alinha a nona marca de corte - OK
		var bordaAtual = myDocument.groups[8].geometricBounds;
		myDocument.groups[8].geometricBounds = [capaAltura+3,capaLargura+capaLombada,capaAltura+10,capaLargura+capaLombada+1]; 
		
		//Alinha a décima marca de corte - OK
		var bordaAtual = myDocument.groups[9].geometricBounds;
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[9].geometricBounds = [-10,(capaLargura*2)+capaLombada,0,(capaLargura*2)+capaLombada+10];
		
		//Alinha a décima primeira marca de corte (registro)
		var bordaAtual = myDocument.groups[10].geometricBounds;
		var altura = bordaAtual[2]-bordaAtual[0];
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[10].geometricBounds = [(capaAltura/2)-(altura/2),(capaLargura*2)+capaLombada+1,(capaAltura/2)+(altura/2),(capaLargura*2)+capaLombada+1+largura];
		
		//Alinha a décima segunda marca de corte - OK
		var bordaAtual = myDocument.groups[11].geometricBounds;
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[11].geometricBounds = [capaAltura,(capaLargura*2)+capaLombada,capaAltura+10,(capaLargura*2)+capaLombada+10];

}

//***************FIM DO ALINHAMENTO DAS MARCAS DE CORTE**************


//************** AÇÕES DO PROGRAMA ANTES DA EXIBIÇÃO DA JANELA **************

// Tells us where this script is running from
var scriptsFile = new File($.fileName);

//var flashPalette = new Window('palette', 'Escala - Lucas ®',);
var flashPalette = new Window('dialog', 'Capa Generator Plus - Lucas ®',);

// Set the player bounds to match the palette
var cBounds = flashPalette.frameBounds;
flashPalette.margins = [0,0,0,0];
//alert(flashPalette.margins);
// add the Flash Player control to the palette.	

//alert(flashPalette.opacity = 0.5);

var flashPlayer = flashPalette.add("flashplayer", cBounds);
flashPlayer.preferredSize = [1000, 800];

var scriptsFile = new File($.fileName);
//this.flashFile = new File(scriptsFile.parent.parent.fsName + "/resources/ScriptEscala.swf");
this.flashFile = new File(scriptsFile.parent.fsName + "/FlexCriarCapa.swf");
flashPlayer.loadMovie(this.flashFile);  


//************** FIM DAS AÇÕES DO PROGRAMA ANTES DA EXIBIÇÃO DA JANELA **************

//****************  CAPTURA CAMINHO ***************

//function capturaCaminho(extensao){

flashPlayer.capturaCaminho = function(extensao)
{
    //alert("aqui");
    //var caminho = File.saveDialog("Salvar aqruivo", "*.pdf");
    var caminho = File.saveDialog("Salvar arquivo", extensao); 
    //  alert(caminho);
    
    if(caminho != null){
        return caminho.fullName;
    }
    else{
        return "null";
        }
    
    }
    
//****************  FIM CAPTURA CAMINHO ***************

//********** SALVA XML ************

flashPlayer.salvarXML = function(xml)
{
    var xmlFile = new File("/I/Objetos/Scripts/InDesign/CriarCapa/FlexCriarCapa/src/arquivos/colecoes.xml");
	xmlFile.open( "w" ); 
	xmlFile.write(xml); 
	xmlFile.close(); 

    //alert("Predefinição salva","XML - Lucas ®"); 
    
	return ("Arquivo XML salvo");

    }

//********** FIM SALVA XML ************

flashPlayer.gerarCapa = function(name, largura, altura, lombada, sangriaDirEsqTemp, sangriaSupInfTemp, isbnNumTemp, isbnX, isbnY,jpgFile,pdfFile,fecharIndesignTemp)
{
    
    
	nome = name;
	capaLargura = largura*1;
	capaAltura = altura*1;
	capaLombada = lombada*1;
	sangriaDirEsq = sangriaDirEsqTemp*1; 
	sangriaInfSup = sangriaSupInfTemp*1;
	arquivoCapa = jpgFile;
    /*
	arquivoISBN = isbnFile;
	layerISBN = isbnLayer;
    */
    isbnNum = ""+isbnNumTemp;
	posIsbnX = isbnX*1;
	posIsbnY = isbnY*1;
	arquivoPDF = pdfFile;
    fecharIndesign = fecharIndesignTemp;
    
    flashPalette.close();
    //alert("oi");
    rodaPrograma = true;
}


//***************************
/*
//nome = name;
capaLargura = 210;
capaAltura = 280;
capaLombada = 12;
sangriaDirEsq = 15;
sangriaInfSup = 10;
arquivoCapa = "/M/2011/Capas/Capas EM_2011/Arquivos abertos/CapaEM2011_21x28_BiologiaL1.jpg";
arquivoISBN = new File("/M/2011/ISBN e Ficha Catalográfica/Código de barras/Ensino Médio.ai"); 
layerISBN = "2º ANO - Matemática 3";
posIsbnX = 105;
posIsbnY = 256;
arquivoPDF = "/M/2011/Capas/Capas EM_2011/PDFScriptTemp.pdf";

rodaPrograma = true;
*/
//*************************** 
if (flashPalette.show() == 1) // Cancelar
 {
     
     }
    else
    { // Gerar capa
        if(rodaPrograma){
            //alert("Gerando capa");
            main();
        } else{
            //alert("Cancel");
            }
 }
 
//Exibe a janela
//flashPalette.show();

//************* EXECUTA PROGRAMA *********************

function main(){
	
	try{
                //************* EXIBE PROGRESS BAR ******************
                #targetengine "session"
                //var numeroDePaginas = capturaIntervalo(intervaloPDF);
                //Numero do intervalo de páginas vezes o número de processos pendentes (carimbo)
                //var tamanhoDoProcesso = (numeroDePaginas.length)*1;
                myProgressPanel.pnl.myProgressBar.maxvalue = 4;
                myProgressPanel.show();
                var contador = 1;
                //************* FIM EXIBE PROGRESS BAR ******************
                
                //*************  ATUALIZA PROGRESS BAR ******************
                myProgressPanel.pnl.text = "CAPA";
                myProgressPanel.pnl.myProgressBarLabel.text = "Inserindo arquivo da capa...";
                myProgressPanel.pnl.myProgressBar.value = 1;
                //*************  FIM ATUALIZA PROGRESS BAR ******************
                
				//win2.show();
				myDocument = app.open(File(template));  

				//Importar arquivo
				myRectangle = myDocument.pages[0].rectangles;

				myRectangle.item(0).graphics[0].place(File(arquivoCapa));    
				myRectangle.item(1).graphics[0].place(File(arquivoCapa));
				myRectangle.item(2).graphics[0].place(File(arquivoCapa));

				//Definir tamanho da página
				//var myDocument = app.documents.add();
				with(myDocument.documentPreferences){
					pageHeight =  capaAltura;
					pageWidth =((capaLargura*2)+capaLombada)+"mm";  
				}

				//Definir sangria da página
				with(myDocument.documentPreferences){
					documentBleedBottomOffset =  sangriaInfSup+ "mm";
					documentBleedTopOffset =  sangriaInfSup+ "mm";
					documentBleedInsideOrLeftOffset = sangriaDirEsq + "mm";
					documentBleedOutsideOrRightOffset = sangriaDirEsq + "mm";
				}

				//Definir gráficos como 100%
				function graphics100(myGraphic){
					myGraphic.horizontalScale = 100;
					myGraphic.verticalScale = 100;
					}
				graphics100(myRectangle.item(0).graphics[0]);
				graphics100(myRectangle.item(1).graphics[0]);
				graphics100(myRectangle.item(2).graphics[0]);

				//Alinhar retângulos
				myRectangle.item(0).geometricBounds = [-sangriaInfSup, -sangriaDirEsq, capaAltura+sangriaInfSup, capaLargura];
				myRectangle.item(1).geometricBounds = [-sangriaInfSup, capaLargura, capaAltura+sangriaInfSup, capaLargura+capaLombada];
				myRectangle.item(2).geometricBounds = [-sangriaInfSup, capaLargura+capaLombada, capaAltura+sangriaInfSup, (capaLargura*2)+capaLombada+sangriaDirEsq];

				//Alinhar gráficos
				centralizar(myRectangle.item(0).graphics[0]);
				centralizar(myRectangle.item(1).graphics[0]);
				centralizar(myRectangle.item(2).graphics[0]);

				alinharEsquerda(myRectangle.item(0).graphics[0]);
				centralizarH(myRectangle.item(1).graphics[0]);
				alinharDireita(myRectangle.item(2).graphics[0]);
                
                //*************  ATUALIZA PROGRESS BAR ******************
                myProgressPanel.pnl.text = "MARCAS DE CORTE";
                myProgressPanel.pnl.myProgressBarLabel.text = "Alinhando marcas de corte...";
                myProgressPanel.pnl.myProgressBar.value = 2;
                //*************  FIM ATUALIZA PROGRESS BAR ******************

				//Alinhar marca de corte
				alinharMarcasDeCorte();
				
                /*
				//Insere arquivo ISBN
				var retangulo = app.activeDocument.pages[0].place(File(arquivoISBN), [0,0])[0];
				retangulo.parent.geometricBounds = [posIsbnY-10,posIsbnX-20,posIsbnY+10,posIsbnX+20];
				
				//Alinha o ISBN
				centralizar(retangulo);
                */
            //criaISBN("4012345678901",app.activeDocument);
            //criaISBN("9788598293158",app.activeDocument);
            
                //*************  ATUALIZA PROGRESS BAR ******************
                myProgressPanel.pnl.text = "ISBN";
                myProgressPanel.pnl.myProgressBarLabel.text = "Conferindo/inserindo ISBN...";
                myProgressPanel.pnl.myProgressBar.value = 3;
                //*************  FIM ATUALIZA PROGRESS BAR ******************
            
            //Se ISBN existir, cria ISBN
            if(isbnNum != ""){
                criaISBN(isbnNum,myDocument);
                
                //Alinha o ISBN
                var myGroup = myDocument.groups[12];
                var larguraGrupo = (myGroup.geometricBounds[3]-myGroup.geometricBounds[1])/2;
                var alturaGrupo = (myGroup.geometricBounds[2]-myGroup.geometricBounds[0])/2;

                myDocument.groups[12].geometricBounds = [posIsbnY-alturaGrupo,posIsbnX-larguraGrupo ,posIsbnY+alturaGrupo,posIsbnX+larguraGrupo ];
            
            }
        else{

            myDocument.groups[12].remove();
            //alert("deletado");
            
            }
            
            
				/*
				//Escolhe o Layer do ISBN                
                //Deixa apenas o layer escolhido visivel
                if(retangulo.graphicLayerOptions.graphicLayers.itemByName(layerISBN).isValid){
                    retangulo.graphicLayerOptions.graphicLayers.itemByName(layerISBN).currentVisibility = true; 
                    }
                else{
                    throw "Layer inválido";
                    //alert("Layer inválido");
                    }
                    */
                
                /*
                //Deixa todos os layer invisiveis                
                var x =  app.activeDocument.links[app.activeDocument.links.length-1].parent.graphicLayerOptions.graphicLayers.length-1;
                alert(x);
                
                while(x > 0){
                    var layerAtual = retangulo.graphicLayerOptions.graphicLayers[x];
                    //alert(layerAtual.name+", "+layerISBN);
                    alert(layerAtual.locked);
                    //if(layerAtual.name != layerISBN){
                            //app.activeDocument.links[app.activeDocument.links.length-1].parent.graphicLayerOptions.graphicLayers[x-1].currentVisibility = false;
                            layerAtual.currentVisibility = false;
                        }
                    x--;
                }
                */
            
                //*************  ATUALIZA PROGRESS BAR ******************
                myProgressPanel.pnl.text = "EXPORTANDO PDF";
                myProgressPanel.pnl.myProgressBarLabel.text = "Fechando PDF, aguarde...";
                myProgressPanel.pnl.myProgressBar.value = 4;
                //*************  FIM ATUALIZA PROGRESS BAR ******************
                    
                //Selecione o lugar para salvar o arquivo final
                //f = File.saveDialog("Salvar PDF ", "*.pdf");
                var caminhoPDF = new File(arquivoPDF);
                caminhoPDF = verificaPDF(caminhoPDF);
                
                exportaPDF(caminhoPDF,app.activeDocument);
                
                //alert(fecharIndesign);
                
                if(fecharIndesign == "true"){
                    //alert("fechando indesign");
                    myDocument.close(SaveOptions.no);
                    }
                
                //************* FECHA PROGRESS BAR ******************
                myProgressPanel.close();
                //************* FECHA PROGRESS BAR ******************

				//win2.close();
				alert("Capa criada com sucesso","Criar capas - Lucas ®");
                
				
				}
			
			catch(e){
            
            
                try{
                    //************* FECHA PROGRESS BAR ******************
                    myProgressPanel.close();
                    //************* FECHA PROGRESS BAR ******************
                    }
                catch(e){
                    }
                
				myDocument.close(SaveOptions.no);
				//app.activeDocument.close(SaveOptions.yes);
                
				//alert("Não foi possível criar a capa","Criar capas - Lucas ®");
				//alert(e,"Criar capas - Lucas ®"); 
                
				}
                
				
		}
    
 //************* FIM EXECUTA PROGRAMA *********************