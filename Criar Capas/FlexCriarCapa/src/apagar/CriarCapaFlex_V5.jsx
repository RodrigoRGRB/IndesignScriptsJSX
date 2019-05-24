#includepath "/I/Objetos/Scripts/InDesign/CriarCapa/FlexCriarCapa/src"
#include "FuncaoExportarPDF.jsx"

var template = "/I/Objetos/Scripts/InDesign/CriarCapa/Template/CapaTemplate.indt";
var templateEspiral = "/I/Objetos/Scripts/InDesign/CriarCapa/Template/CapaTemplateEspiral.indt";
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
var arrayDados;
var numeroDeCapas;

var isbnCorC;
var isbnCorM;
var isbnCorY;
var isbnCorK;
var isbnRotacao;
var seloPath;
var seloX;
var seloY;

var criarEspiral;

var capasGeradas = 0;
var geraRelatorio = "";

var capasNaoGeradas = "";
var capasGeradasContador = 0;

//********************* FUNÇÃO PARA ALINHAR GRÁFICOS *******************

//Definir gráficos como 100%
function graphics100(myGraphic){
         //Define o alinhamento das imagens pelo centro
        myDocument.layoutWindows[0].transformReferencePoint =AnchorPoint.CENTER_ANCHOR;
        
        centralizar(myGraphic);
        
        myGraphic.horizontalScale = 100;
        myGraphic.verticalScale = 100;
    }

//********************* FIM FUNÇÃO PARA ALINHAR GRÁFICOS *******************

//****************** SALVA RELATORIO ************************

function salvaRelatorio(relatorio){
    
    try{
    //****************Local para criar o arquivo*******************
    var caminho = "/I/Objetos/Scripts/InDesign/CriarCapa/FlexCriarCapa/src/arquivos/log.txt";

    //****************Cria o arquivo *******************
    var arquivo = new File(caminho);

    arquivo.open( "r" );
    var texto = arquivo.read();

    //alert(texto);

    //var teste = "Teste de escrita";
    
    var separador = "*************************************************************";
    var usuario = $.getenv('USERNAME');
    
    
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

    arquivo.open( "w" ); 
    arquivo.write(texto+"\n"+separador+"\n"+usuario+" - "+data+"\n\n"+relatorio); 
    arquivo.close(); 

    //alert("Flash configurado!","Flash - Lucas ®");

    }
    catch(e){
        
        //alert(e);
        
        }

}


//****************** FIM SALVA RELATORIO ************************

//************ CRIA PROGRESS BAR ****************

#targetengine "session"
//Because these terms are defined in the "session" engine,
//they will be available to any other JavaScript running
//in that instance of the engine.
//function myCreateProgressPanel(myMaximumValue, myProgressBarWidth){

// Create a palette-type window (a modeless or floating dialog),
var myProgressPanel = new Window("palette", "Capa Generator Plus - Lucas ®", [150, 150, 600, 270]); 
this.windowRef = myProgressPanel;

// Add a panel to contain the components
myProgressPanel.pnl = myProgressPanel.add("panel", [10, 10, 440, 100], "Iniciando script");

// Add a progress bar with a label and initial value of 0, max value of 200.
myProgressPanel.pnl.myProgressBarNome = myProgressPanel.pnl.add("statictext", [20, 20, 320, 35], "");
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

//myRectangle = myDocument.groups[myDocument.groups.length-1];
myRectangle = myDocument.groups[myDocument.groups.length-1];

//Preenche o número acima do código
//var numeroISBNSeparado = "ISBN "+isbn[0]+isbn[1]+isbn[2]+"-"+isbn[3]+isbn[4]+"-"+isbn[5]+isbn[6]+isbn[7]+isbn[8]+isbn[9]+"-"+isbn[10]+isbn[11]+"-"+isbn[12]
var numeroISBNSeparado = "ISBN "+isbn[0]+isbn[1]+isbn[2]+"-"+isbn[3]+isbn[4]+"-"+isbn[5]+isbn[6]+isbn[7]+isbn[8]+"-"+isbn[9]+isbn[10]+isbn[11]+"-"+isbn[12];
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
            
            //var numeroDeBarras = myDocument.groups[myDocument.groups.length-1].rectangles;
            var numeroDeBarras = myDocument.groups[myDocument.groups.length-1].rectangles;
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

//***************ALINHA AS MARCAS DE CORTE PARA ESPIRAL **************

function alinharMarcasDeCorteEspiral(){
		
         //PÁGINA 01
         //Alinha a primeira marca de corte - OK
		var bordaAtual = myDocument.groups[0].geometricBounds;
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[0].geometricBounds = [-10,-10,0,0];

		//Alinha a segunda marca de corte (registro)
		var bordaAtual = myDocument.groups[1].geometricBounds;
		var altura = bordaAtual[2]-bordaAtual[0];
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[1].geometricBounds = [(capaAltura/2)-(altura/2),0-largura-1,(capaAltura/2)+(altura/2),-1];
		
		//Alinha a terceira marca de corte 
		var bordaAtual = myDocument.groups[2].geometricBounds;
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[2].geometricBounds = [capaAltura,-10,capaAltura+10,0];
        
		//Alinha a sexta marca de corte  (registro)
		var bordaAtual = myDocument.groups[3].geometricBounds;
		var altura = bordaAtual[2]-bordaAtual[0];
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[3].geometricBounds = [0-1-altura,(capaLargura/2)-(largura/2),-1,(capaLargura/2)+(largura/2)];	

		//Alinha a sétima marca de corte  (registro)
		var bordaAtual = myDocument.groups[4].geometricBounds;
		var altura = bordaAtual[2]-bordaAtual[0];
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[4].geometricBounds = [capaAltura+1,(capaLargura/2)-(largura/2),capaAltura+altura+1,(capaLargura/2)+(largura/2)];
		
		//Alinha a décima marca de corte - OK
		var bordaAtual = myDocument.groups[5].geometricBounds;
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[5].geometricBounds = [-10,capaLargura,0,capaLargura+10];

		//Alinha a décima primeira marca de corte (registro)
		var bordaAtual = myDocument.groups[6].geometricBounds;
		var altura = bordaAtual[2]-bordaAtual[0];
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[6].geometricBounds = [(capaAltura/2)-(altura/2),capaLargura+1,(capaAltura/2)+(altura/2),capaLargura+1+largura];

		//Alinha a décima segunda marca de corte - OK
		var bordaAtual = myDocument.groups[7].geometricBounds;
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[7].geometricBounds = [capaAltura,capaLargura,capaAltura+10,capaLargura+10];
        
         //PÁGINA 02
         //Alinha a primeira marca de corte - OK
		var bordaAtual = myDocument.groups[8].geometricBounds;
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[8].geometricBounds = [-10,-10,0,0];

		//Alinha a segunda marca de corte (registro)
		var bordaAtual = myDocument.groups[9].geometricBounds;
		var altura = bordaAtual[2]-bordaAtual[0];
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[9].geometricBounds = [(capaAltura/2)-(altura/2),0-largura-1,(capaAltura/2)+(altura/2),-1];
		
		//Alinha a terceira marca de corte 
		var bordaAtual = myDocument.groups[10].geometricBounds;
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[10].geometricBounds = [capaAltura,-10,capaAltura+10,0];
        
		//Alinha a sexta marca de corte  (registro)
		var bordaAtual = myDocument.groups[11].geometricBounds;
		var altura = bordaAtual[2]-bordaAtual[0];
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[11].geometricBounds = [0-1-altura,(capaLargura/2)-(largura/2),-1,(capaLargura/2)+(largura/2)];

		//Alinha a sétima marca de corte  (registro)
		var bordaAtual = myDocument.groups[12].geometricBounds;
		var altura = bordaAtual[2]-bordaAtual[0];
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[12].geometricBounds = [capaAltura+1,(capaLargura/2)-(largura/2),capaAltura+altura+1,(capaLargura/2)+(largura/2)];
		
		//Alinha a décima marca de corte - OK
		var bordaAtual = myDocument.groups[13].geometricBounds;
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[13].geometricBounds = [-10,capaLargura,0,capaLargura+10];

		//Alinha a décima primeira marca de corte (registro)
		var bordaAtual = myDocument.groups[14].geometricBounds;
		var altura = bordaAtual[2]-bordaAtual[0];
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[14].geometricBounds = [(capaAltura/2)-(altura/2),capaLargura+1,(capaAltura/2)+(altura/2),capaLargura+1+largura];

		//Alinha a décima segunda marca de corte - OK
		var bordaAtual = myDocument.groups[15].geometricBounds;
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[15].geometricBounds = [capaAltura,capaLargura,capaAltura+10,capaLargura+10];

}

//***************FIM DO ALINHAMENTO DAS MARCAS DE CORTE PARA ESPIRAL **************
 
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
//this.flashFile = new File("/I/Objetos/Scripts/InDesign/CriarCapa/FlexCriarCapa/FlexCriarCapa.swf");
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

//flashPlayer.gerarCapa = function(name, largura, altura, lombada, sangriaDirEsqTemp, sangriaSupInfTemp, isbnNumTemp, isbnX, isbnY,jpgFile,pdfFile,fecharIndesignTemp)
//ExternalInterface.call("gerarCapa",numeroDeCapas,myArray,stringIndesign);

flashPlayer.gerarCapa = function(numeroDeCapasTemp,myArray,fecharIndesignTemp){
    /*
    alert(numeroDeCapas);
    alert(myArray);
    alert(fecharIndesignTemp);
    */
    

    numeroDeCapas = numeroDeCapasTemp*1;
    
    //alert(numeroDeCapas);
    
    myArray = myArray+""

    arrayDados = myArray.split(",");
    //arrayDados = myArray;
    //alert(myArray.length);
    
    fecharIndesign = fecharIndesignTemp;

    flashPalette.close();
    rodaPrograma = true;

}


//************************ SCRIPT ESTRANGEIRO *****************************************
               
//function RealizaCalculo()
flashPlayer.calcularLombada = function(pagsTemp,gramatTemp,strTipoPapelSelecionadoTemp){

//alert("aqui");
  
  /*
  var pags = win3.grupoCalcular.info.paginas.inputPaginas.text;
  var gramat = win3.grupoCalcular.info.gramatura.inputGramatura.text;
  var strTipoPapelSelecionado = win3.grupoCalcular.info.nomeDoPapel.whichInfo.selection.text;
  */

var espess = 0;
var pags = pagsTemp;
var gramat = gramatTemp;
var strTipoPapelSelecionado = strTipoPapelSelecionadoTemp;
var erro = false;
  
  switch (strTipoPapelSelecionado)
  {
    case "Alta Alvura Alcalino":
      switch (gramat)
      {
        case "63": espess = 74; break;
        case "70": espess = 83; break;
        case "75": espess = 99; break;
        case "90": espess = 104; break;
        case "120": espess = 143; break;
        case "150": espess = 180; break;
        case "180": espess = 221; break;
        case "240": espess = 295; break;
        default: erro = true;
      }
      break;
    case "Paperfect Offset":
      switch (gramat)
      {
        case "56": espess = 76; break;
        case "60": espess = 81; break;
        case "63": espess = 85; break;
        case "70": espess = 90; break;
        case "75": espess = 101; break;
        case "80": espess = 108; break;
        case "90": espess = 122; break;
        case "104": espess = 135; break;
        default: erro = true;
      }
      break;
    case "Pólen Soft":
      switch (gramat)
      {
        case "70": espess = 95; break;
        case "80": espess = 108; break;
        default: erro = true;
      }
      break;
    case "Pólen Bold":
      switch (gramat)
      {
        case "70": espess = 112; break;
        case "90": espess = 144; break;
        default: erro = true;
      }
      break;
    case "Reciclato":
      switch (gramat)
      {
        case "75": espess = 95; break;
        case "90": espess = 117; break;
        case "120": espess = 156; break;
        case "150": espess = 195; break;
        case "180": espess = 234; break;
        case "240": espess = 312; break;
        default: erro = true;
      }
      break;
    default: erro = true; break;
  }

  //var result = ((espess/1015)*pags)/2;
  
  //var result = ((espess/1025)*pags)/2;
  
  //var result = ((espess/1023)*pags)/2;
  
  var result = ((espess/1000)*pags)/2;
  
  //alert(result);
  
  var numeroCalculo = 0;
  
  while(numeroCalculo < result){
      
      numeroCalculo = numeroCalculo+0.5;
      
      }
  
  //alert("result: "+ result +"\nArredondamento: "+numeroCalculo);
  
  //alert(numeroCalculo-result);
  
  
  if(numeroCalculo - result > 0.25){
      
      numeroCalculo = numeroCalculo-0.5;
      
      }
  
  //alert("result: "+ result +"\nArredondamento: "+numeroCalculo);  
  
  result = Math.floor(result+0.5);
  //win3.grupoCalcular.info.resultado.resultadoTexto.text = result;
  
  //alert(erro);
  
//return ("resultado");
  
if (erro)
  {
    //win3.grupoCalcular.info.resultado.resultadoTexto.text = "Gramatura inválida";
    return ("Gramatura inválida");
  }
else{
    //return ("resultado");
    //return (result);
    return (numeroCalculo);
    
    }
    

  }

               
//************************ FIM SCRIPT ESTRANGEIRO *****************************************

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
	
	//try{
    
                //**** INICIA O LOOP PARA TODAS AS CAPAS
                var contadorCapas = 1;
                var contadorArray = 0;
                
                //alert(numeroDeCapas);
                
                 //************* EXIBE PROGRESS BAR ******************
                #targetengine "session"
                //var numeroDePaginas = capturaIntervalo(intervaloPDF);
                //Numero do intervalo de páginas vezes o número de processos pendentes (carimbo)
                //var tamanhoDoProcesso = (numeroDePaginas.length)*1;
                //myProgressPanel.pnl.myProgressBar.maxvalue = 5;
                myProgressPanel.pnl.myProgressBar.maxvalue = numeroDeCapas*5;
                myProgressPanel.pnl.myProgressBar.value = 0;
                myProgressPanel.show(); 
                
                //************* FIM EXIBE PROGRESS BAR ******************
                
                //while(contadorCapas <= numeroDeCapas) {
                for(z=0;z<numeroDeCapas;z++){
                    
                    try{
                    
                    nome =  arrayDados[contadorArray++];
                    capaLargura =  arrayDados[contadorArray++]*1;
                    capaAltura = arrayDados[contadorArray++]*1;
                    criarEspiral = arrayDados[contadorArray++];
                    capaLombada = arrayDados[contadorArray++]*1;
                    sangriaDirEsq = arrayDados[contadorArray++]*1; 
                    sangriaInfSup = arrayDados[contadorArray++]*1;
                    isbnNum = ""+arrayDados[contadorArray++];
                    posIsbnX = arrayDados[contadorArray++]*1;
                    posIsbnY = arrayDados[contadorArray++]*1;
                    arquivoCapa = arrayDados[contadorArray++];
                    arquivoPDF = arrayDados[contadorArray++];
                    isbnCorC = arrayDados[contadorArray++];
                    isbnCorM = arrayDados[contadorArray++];
                    isbnCorY = arrayDados[contadorArray++];
                    isbnCorK = arrayDados[contadorArray++];
                    isbnRotacao = arrayDados[contadorArray++];
                    seloPath = arrayDados[contadorArray++];
                    seloX = arrayDados[contadorArray++];
                    seloY = arrayDados[contadorArray++];
                    /*
                        alert(nome);
                        alert(capaLargura);
                        alert(capaAltura);
                        alert(criarEspiral);
                        alert(capaLombada);
                        alert(sangriaDirEsq);
                        alert(sangriaInfSup);
                        alert(isbnNum);
                        alert(posIsbnX);
                        alert(posIsbnY);
                        alert(arquivoCapa);
                        alert(arquivoPDF);
                        alert(isbnCorC);
                        alert(isbnCorM);
                        alert(isbnCorY);
                        alert(isbnCorK);
                        alert(isbnRotacao);
                        alert(seloPath);
                        alert(seloX);
                        alert(seloY);
                        */
                
                //*************  ATUALIZA PROGRESS BAR ******************
                myProgressPanel.pnl.myProgressBar.value = z*5;
                //*************  FIM ATUALIZA PROGRESS BAR ******************
                
                
                //************** CRIAR CAPA COM LOMBADA *******************
                if(criarEspiral == "não"){
                
                
                myProgressPanel.pnl.text = nome;
                myProgressPanel.pnl.myProgressBarLabel.text = "Inserindo arquivo da capa...";
                myProgressPanel.pnl.myProgressBar.value = myProgressPanel.pnl.myProgressBar.value+1;
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
/*
				//Definir gráficos como 100%
				function graphics100(myGraphic){
					myGraphic.horizontalScale = 100;
					myGraphic.verticalScale = 100;
					}
                    */
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
                //myProgressPanel.pnl.text = "MARCAS DE CORTE";
                myProgressPanel.pnl.myProgressBarLabel.text = "Alinhando marcas de corte...";
                //myProgressPanel.pnl.myProgressBar.value = 2;
                myProgressPanel.pnl.myProgressBar.value = myProgressPanel.pnl.myProgressBar.value+1;
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
                //myProgressPanel.pnl.text = "ISBN";
                myProgressPanel.pnl.myProgressBarLabel.text = "Conferindo/inserindo ISBN...";
                //myProgressPanel.pnl.myProgressBar.value = 3;
                myProgressPanel.pnl.myProgressBar.value = myProgressPanel.pnl.myProgressBar.value+1;
                //*************  FIM ATUALIZA PROGRESS BAR ******************
                
                
            
            //Se ISBN existir, cria ISBN
            if(isbnNum != ""){
                criaISBN(isbnNum,myDocument);
                
                //Grupo ISBN
                var myGroup = myDocument.groups[myDocument.groups.length-1];
                
                //Gira o ISBN
                if(isbnRotacao != ""){
                    isbnRotacao = isbnRotacao*1;
                    myGroup.rotationAngle = isbnRotacao;
                }
                
                //Alinha o ISBN
                //var myGroup = myDocument.groups[myDocument.groups.length-1];
                var larguraGrupo = (myGroup.geometricBounds[3]-myGroup.geometricBounds[1])/2;
                var alturaGrupo = (myGroup.geometricBounds[2]-myGroup.geometricBounds[0])/2;

                myDocument.groups[myDocument.groups.length-1].geometricBounds = [posIsbnY-alturaGrupo,posIsbnX-larguraGrupo ,posIsbnY+alturaGrupo,posIsbnX+larguraGrupo ];
                
                //Se existir cor do ISBN, aplica
                if(isbnCorC != "" && isbnCorM != "" && isbnCorY != "" && isbnCorK != ""){
                    
                    //Converte valores para inteiros
                    isbnCorC = 1*isbnCorC;
                    isbnCorM = 1*isbnCorM;
                    isbnCorY = 1*isbnCorY;
                    isbnCorK = 1*isbnCorK;
                    var arrayCores = [isbnCorC,isbnCorM,isbnCorY,isbnCorK];
                    
                    //Aplica os valores para a swatch CorISBN
                    myDocument.swatches.item("CorISBN").colorValue = arrayCores;
                    
                    //Aplica às barras
                    for(x = 0;x<myGroup.rectangles.length;x++){
                        
                        //alert(myGroup.rectangles[x].fillColor.colorValue);
                        myGroup.rectangles[x].fillColor = myDocument.swatches.item("CorISBN");

                        }
                    
                    //Aplica ao texto
                    for(x = 0; x<myGroup.textFrames.length; x++){
                        
                        var words = myGroup.textFrames[x].words;
                        
                        for(i = 0; i<words.length; i++){
                            words[i].fillColor = myDocument.swatches.item("CorISBN");
                            }
                        }
                    }
            
            }
        else{

            myDocument.groups[myDocument.groups.length-1].remove();
            //alert("deletado");
            
            }
        
            //Verifica se existe selo
            if(seloPath != "" && seloX != "" && seloY != ""){
                
                seloX = seloX*1;
                seloY  = seloY *1;

                 //*************  ATUALIZA PROGRESS BAR ******************
                //myProgressPanel.pnl.text = "INSERINDO SELO";
                myProgressPanel.pnl.myProgressBarLabel.text = "Inserindo selo...";
                //myProgressPanel.pnl.myProgressBar.value = 4;
                myProgressPanel.pnl.myProgressBar.value = myProgressPanel.pnl.myProgressBar.value+1;
                //*************  FIM ATUALIZA PROGRESS BAR ******************
                

                //Insere o arquivo do selo
                var retangulo = myDocument.pages[0].place(File(seloPath), [0,0])[0];
                var larguraRetangulo = (retangulo.geometricBounds[3]-retangulo.geometricBounds[1])/2;
                var alturaRetangulo = (retangulo.geometricBounds[2]-retangulo.geometricBounds[0])/2;

                //Alinha o conteúdo
                //retangulo.geometricBounds = [seloY-alturaRetangulo,seloX-larguraRetangulo ,seloY+alturaRetangulo,seloX+larguraRetangulo ];
                retangulo.geometricBounds = [seloY-alturaRetangulo,(seloX-larguraRetangulo)+capaLombada,seloY+alturaRetangulo,(seloX+larguraRetangulo)+capaLombada];
                
                //Alinha o retangulo externo
                retangulo.parent.geometricBounds = retangulo.geometricBounds;

            }
            
            if(arquivoPDF != ""){
            
                    //*************  ATUALIZA PROGRESS BAR ******************
                    //myProgressPanel.pnl.text = "EXPORTANDO PDF";
                    myProgressPanel.pnl.myProgressBarLabel.text = "Fechando PDF, aguarde...";
                    //myProgressPanel.pnl.myProgressBar.value = 5;
                    myProgressPanel.pnl.myProgressBar.value = myProgressPanel.pnl.myProgressBar.value+1;
                    //*************  FIM ATUALIZA PROGRESS BAR ******************
                        
                    //Selecione o lugar para salvar o arquivo final
                    //f = File.saveDialog("Salvar PDF ", "*.pdf");
                    var caminhoPDF = new File(arquivoPDF);
                    caminhoPDF = verificaPDF(caminhoPDF);
                    
                    exportaPDF(caminhoPDF,app.activeDocument);
                }
                
                //alert(fecharIndesign);
                
                if(fecharIndesign == "true" && arquivoPDF != ""){
                    //alert("fechando indesign");
                    myDocument.close(SaveOptions.no);
                    }
                /*
                //************* FECHA PROGRESS BAR ******************
                myProgressPanel.close();
                //************* FECHA PROGRESS BAR ******************
                */

        //alert("aqui");
                
                }
            else{ 
                //************** CRIAR CAPA COM ESPIRAL *******************
                
                
                //*************  ATUALIZA PROGRESS BAR ******************
                //myProgressPanel.pnl.text = "CAPA";
                myProgressPanel.pnl.myProgressBarLabel.text = "Inserindo arquivo da capa...";
                //myProgressPanel.pnl.myProgressBar.value = 1;
                myProgressPanel.pnl.myProgressBar.value = myProgressPanel.pnl.myProgressBar.value+1;
                //*************  FIM ATUALIZA PROGRESS BAR ******************
                
				//win2.show();
				myDocument = app.open(File(templateEspiral)); 

				//Importar arquivo
				myRectangle1 = myDocument.pages[0].rectangles;
				myRectangle1.item(0).graphics[0].place(File(arquivoCapa));
                
                  myRectangle2 = myDocument.pages[1].rectangles;
				myRectangle2.item(0).graphics[0].place(File(arquivoCapa));    

				//Definir tamanho da página
				//var myDocument = app.documents.add();
				with(myDocument.documentPreferences){
					pageHeight =  capaAltura;
					//pageWidth =((capaLargura*2)+capaLombada)+"mm";  
                       pageWidth =capaLargura+"mm";  
				}

				//Definir sangria da página
				with(myDocument.documentPreferences){
					documentBleedBottomOffset =  sangriaInfSup+ "mm";
					documentBleedTopOffset =  sangriaInfSup+ "mm";
					documentBleedInsideOrLeftOffset = sangriaDirEsq + "mm";
					documentBleedOutsideOrRightOffset = sangriaDirEsq + "mm";
				}
/*
				//Definir gráficos como 100%
				function graphics100(myGraphic){
					myGraphic.horizontalScale = 100;
					myGraphic.verticalScale = 100;
					}
                    */
				graphics100(myRectangle1.item(0).graphics[0]);
				graphics100(myRectangle2.item(0).graphics[0]);
				//graphics100(myRectangle.item(2).graphics[0]);

				//Alinhar retângulos
				myRectangle1.item(0).geometricBounds = [-sangriaInfSup, -sangriaDirEsq, capaAltura+sangriaInfSup, capaLargura+sangriaDirEsq];
				//myRectangle2.item(0).geometricBounds = [-sangriaInfSup, capaLargura, capaAltura+sangriaInfSup, capaLargura+capaLombada];
                  myRectangle2.item(0).geometricBounds = [-sangriaInfSup, -sangriaDirEsq, capaAltura+sangriaInfSup, capaLargura+sangriaDirEsq];
				//myRectangle.item(2).geometricBounds = [-sangriaInfSup, capaLargura+capaLombada, capaAltura+sangriaInfSup, (capaLargura*2)+capaLombada+sangriaDirEsq];

				//Alinhar gráficos
				centralizar(myRectangle1.item(0).graphics[0]);
				centralizar(myRectangle2.item(0).graphics[0]);
				//centralizar(myRectangle.item(2).graphics[0]);

				alinharDireita(myRectangle1.item(0).graphics[0]);
				//centralizarH(myRectangle.item(1).graphics[0]);
				alinharEsquerda(myRectangle2.item(0).graphics[0]);
                
                //*************  ATUALIZA PROGRESS BAR ******************
                //myProgressPanel.pnl.text = "MARCAS DE CORTE";
                myProgressPanel.pnl.myProgressBarLabel.text = "Alinhando marcas de corte...";
                //myProgressPanel.pnl.myProgressBar.value = 2;
                myProgressPanel.pnl.myProgressBar.value = myProgressPanel.pnl.myProgressBar.value+1;
                //*************  FIM ATUALIZA PROGRESS BAR ******************

				//Alinhar marca de corte
				alinharMarcasDeCorteEspiral();
				
            
                //*************  ATUALIZA PROGRESS BAR ******************
                //myProgressPanel.pnl.text = "ISBN";
                myProgressPanel.pnl.myProgressBarLabel.text = "Conferindo/inserindo ISBN...";
                //myProgressPanel.pnl.myProgressBar.value = 3;
                myProgressPanel.pnl.myProgressBar.value = myProgressPanel.pnl.myProgressBar.value+1;
                //*************  FIM ATUALIZA PROGRESS BAR ******************
            
            //Se ISBN existir, cria ISBN
            if(isbnNum != ""){
                criaISBN(isbnNum,myDocument);
                
                //Grupo ISBN
                var myGroup = myDocument.groups[16];
                
                //Gira o ISBN
                if(isbnRotacao != ""){
                    isbnRotacao = isbnRotacao*1;
                    myGroup.rotationAngle = isbnRotacao;
                }
                
                //Alinha o ISBN
                //var myGroup = myDocument.groups[myDocument.groups.length-1];
                var larguraGrupo = (myGroup.geometricBounds[3]-myGroup.geometricBounds[1])/2;
                var alturaGrupo = (myGroup.geometricBounds[2]-myGroup.geometricBounds[0])/2;

                myDocument.groups[myDocument.groups.length-1].geometricBounds = [posIsbnY-alturaGrupo,posIsbnX-larguraGrupo ,posIsbnY+alturaGrupo,posIsbnX+larguraGrupo ];
                
                //Se existir cor do ISBN, aplica
                if(isbnCorC != "" && isbnCorM != "" && isbnCorY != "" && isbnCorK != ""){
                    
                    //Converte valores para inteiros
                    isbnCorC = 1*isbnCorC;
                    isbnCorM = 1*isbnCorM;
                    isbnCorY = 1*isbnCorY;
                    isbnCorK = 1*isbnCorK;
                    var arrayCores = [isbnCorC,isbnCorM,isbnCorY,isbnCorK];
                    
                    //Aplica os valores para a swatch CorISBN
                    myDocument.swatches.item("CorISBN").colorValue = arrayCores;
                    
                    //Aplica às barras
                    for(x = 0;x<myGroup.rectangles.length;x++){
                        
                        //alert(myGroup.rectangles[x].fillColor.colorValue);
                        myGroup.rectangles[x].fillColor = myDocument.swatches.item("CorISBN");

                        }
                    
                    //Aplica ao texto
                    for(x = 0; x<myGroup.textFrames.length; x++){
                        
                        var words = myGroup.textFrames[x].words;
                        
                        for(i = 0; i<words.length; i++){
                            words[i].fillColor = myDocument.swatches.item("CorISBN");
                            }
                        }
                    }
            
            }
        else{

            myDocument.groups[myDocument.groups.length-1].remove();
            //alert("deletado");
            
            }
        
            //Verifica se existe selo
            if(seloPath != "" && seloX != "" && seloY != ""){
                
                seloX = seloX*1;
                seloY  = seloY *1;

                 //*************  ATUALIZA PROGRESS BAR ******************
                //myProgressPanel.pnl.text = "INSERINDO SELO";
                myProgressPanel.pnl.myProgressBarLabel.text = "Inserindo selo...";
                //myProgressPanel.pnl.myProgressBar.value = 4;
                myProgressPanel.pnl.myProgressBar.value = myProgressPanel.pnl.myProgressBar.value+1;
                //*************  FIM ATUALIZA PROGRESS BAR ******************
                

                //Insere o arquivo do selo
                var retangulo = myDocument.pages[0].place(File(seloPath), [0,0])[0];
                var larguraRetangulo = (retangulo.geometricBounds[3]-retangulo.geometricBounds[1])/2;
                var alturaRetangulo = (retangulo.geometricBounds[2]-retangulo.geometricBounds[0])/2;

                //Alinha o conteúdo
                //retangulo.geometricBounds = [seloY-alturaRetangulo,seloX-larguraRetangulo ,seloY+alturaRetangulo,seloX+larguraRetangulo ];
                retangulo.geometricBounds = [seloY-alturaRetangulo,(seloX-larguraRetangulo)+capaLombada,seloY+alturaRetangulo,(seloX+larguraRetangulo)+capaLombada];
                
                //Alinha o retangulo externo
                retangulo.parent.geometricBounds = retangulo.geometricBounds;

            }
            
            if(arquivoPDF != ""){
            
                    //*************  ATUALIZA PROGRESS BAR ******************
                    //myProgressPanel.pnl.text = "EXPORTANDO PDF";
                    myProgressPanel.pnl.myProgressBarLabel.text = "Fechando PDF, aguarde...";
                    //myProgressPanel.pnl.myProgressBar.value = 5;
                    myProgressPanel.pnl.myProgressBar.value = myProgressPanel.pnl.myProgressBar.value+1;
                    //*************  FIM ATUALIZA PROGRESS BAR ******************
                        
                    //Selecione o lugar para salvar o arquivo final
                    //f = File.saveDialog("Salvar PDF ", "*.pdf");
                    var caminhoPDF = new File(arquivoPDF);
                    caminhoPDF = verificaPDF(caminhoPDF);
                    
                    exportaPDF(caminhoPDF,app.activeDocument);
                }
                
                //alert(fecharIndesign);
                
                if(fecharIndesign == "true" && arquivoPDF != ""){
                    //alert("fechando indesign");
                    myDocument.close(SaveOptions.no);
                    }
                
                    }
                
                //Incrementa relatório
                capasGeradas++;
                geraRelatorio = geraRelatorio + "\n"  + nome;
                
                }
                catch(e){
                    
                    //alert(e);
                        
                        //Incrementa relatório
                        capasNaoGeradas = capasNaoGeradas + "\n" + nome + "\n"+"Erro: "+e+ "\n";
                        capasGeradasContador++;
                    
                        //tenta fechar documento
                        try{
                            myDocument.close(SaveOptions.no);
                            }
                        catch(e){};
                    
                    
                    }


				//}             
                    contadorCapas++;
                }
                //**** FIM DO LOOP PARA TODAS AS CAPAS
                
               //alert(myProgressPanel.pnl.myProgressBar.value);
                
                //************* FECHA PROGRESS BAR ******************
                myProgressPanel.close();
                //************* FECHA PROGRESS BAR ******************
                
                //Relatório final
                //Construção da Janela de Relatório
                res = 
                    "dialog { properties:{ resizeable:true }, \
                        text: 'Alert Box Builder', frameLocation:[100,100], \
                        msgPnl: Panel { orientation:'row', alignChildren:['left', 'top'],\
                            text: 'Relatório de criação', \
                            title: Group { \
                            }, \
                            } \
                    }";
                    
                win = new Window (res,"Lucas ®",); 
                win.msgPnl.preferredSize = [600, 300];
                //Fim Janela

                if(geraRelatorio != ""){
                //alert(capasGeradas + " arquivo(s) convertido(s): \n" + geraRelatorio + "\n \n" + capasGeradasContador + " arquivo(s) não convertidos: \n" + capasNaoGeradas,"Lucas ®",false); 
                var relatorio = capasGeradas + " capa(s) criada(s): \n" + geraRelatorio + "\n " + "---------------------------------------\n\n"+ capasGeradasContador +" capa(s) não criada(s): \n" + capasNaoGeradas;

                //Salva relatório
                salvaRelatorio(relatorio);

                win.msgPnl.title.add('edittext', [0,0,570,280],relatorio, {multiline:true});

                win.center();
                win.show();

                }

                if(capasNaoGeradas != "" && geraRelatorio == ""){
                //alert(capasGeradasContador + " arquivo(s) não convertido(s): \n" + capasNaoGeradas,"Lucas ®",false); 
                var relatorio = capasGeradasContador + " capa(s) não criada(s): \n" + capasNaoGeradas;

                //Salva relatório
                salvaRelatorio(relatorio);

                win.msgPnl.title.add('edittext', [0,0,570,280],relatorio, {multiline:true});

                win.center();
                win.show();
                }
                
				
		}
    
 //************* FIM EXECUTA PROGRAMA *********************