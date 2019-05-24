try{
	
//verifica se existe algum documento aberto
if (app.documents.length > 0)
{

// Declaracao de variaveis
var escalaCompleta;
var escalaSimples;
var inserirProjecao;
var escala = "";

var nomeDocumentoAtual = app.activeDocument.name;
var documentoAtual = app.activeDocument;
//alert(nomeDocumentoAtual);

 var paisEscolhido = "vazio";
 var msg = "";
 var docRef = activeDocument;
 var constante;
 var temp2 = null;
 var projecao = false;
 mySelection = docRef.selection;
 
//************** FUNCOES DO PROGRAMA **************
//*****************************************************************************
//************************** FUNÇÕES **************************

// Funcao que Exibe a mensagem
function rodaMensagem() {
	msg = "1 cm equivale a \n" +escala + " Km";
	alert ( msg,"Escala "+paisEscolhido,false);
	}

	
//*****************************************************************************
//************************** INSERIR ESCALA COMPLETA **************************
//*****************************************************************************

	
// Funcao inserir Escala Completa
	function EscalaCompleta () {
	// Caminho para o PDF
//	var caminhoPDF = "/D/ScriptEscala/Escala.pdf"
	var caminhoPDF = "/I/Objetos/ScriptEscala/EscalaProjecao.pdf"
//	var caminhoPDF = "/C/Arquivos de programas/Adobe/Adobe Illustrator CS2/Presets/Scripts/Escala.pdf"


	var embedDoc = new File(caminhoPDF); //any pdf file
	if ( app.documents.length > 0 && embedDoc.exists ) {
	var doc = app.activeDocument;
	
	doc.layers.add();
	var placed = doc.groupItems.createFromFile( embedDoc );
	}
	
	if ( app.documents.length > 0
	&& app.activeDocument.textFrames.length > 0 ) {
	var text

	// Criar escala numerica
	var escalaNumerica = escala * 100000;
	var escalaNumerica = "" + escalaNumerica;

	// Conta o numero de letras
	var numeroDeLetras
	for (var x=0;escalaNumerica.charAt(x) != "" ;x++)
	{
		// alert (escalaNumerica.charAt(x))
		numeroDeLetras = x;
	}
//	alert (numeroDeLetras)

	// Separa em grupo de 3 algarismos com espacos
	var escalaFinal = "";
	var x = numeroDeLetras

	while (x!=0 & x!=-1 & x!=-2) {
		escalaFinal = escalaNumerica.charAt(x-2) + escalaNumerica.charAt(x-1) + escalaNumerica.charAt(x) + " " + escalaFinal;
		x = x-3
//		alert (escalaFinal)

		if (x==0){
		escalaFinal = escalaNumerica.charAt(x) + " " + escalaFinal
		}
	}

		text = app.activeDocument.textFrames[0].textRange;
		var primeiraEscala = text.words[0];
		text = app.activeDocument.textFrames[1].textRange;
		var segundaEscala = text.words[0];
		text = app.activeDocument.textFrames[2].textRange;
		var terceiraEscala = text.words[0];

	// Adicionar calculo da escala ao arquivo
	primeiraEscala.contents = escala;
	primeiraEscala.justification = Justification.CENTER;
	
	segundaEscala.contents = escala * 2;
	segundaEscala.justification = Justification.CENTER;

	terceiraEscala.contents = "ESCALA 1:"+escalaFinal;
	terceiraEscala.justification = Justification.CENTER;
	
	insereProjecao();
	
	}
	}
	
//*****************************************************************************
//************************** FIM INSERIR ESCALA COMPLETA **********************
//*****************************************************************************


//*****************************************************************************
//******************** INSERIR ESCALA SIMPLES **************
//*****************************************************************************

// Funcao inserir Escala Simples
	function EscalaSimples () {
		try{
		
	//alert("EscalaSimples executando");
	
	// Caminho para o PDF
	var caminhoPDF = "/I/Objetos/ScriptEscala/EscalaSimplesProjecao.pdf"

	var embedDoc = new File(caminhoPDF); //any pdf file
	
	if ( app.documents.length > 0 && embedDoc.exists ) {
		
	//alert(app.activeDocument);
	
	//var doc = app.activeDocument;
	var doc = app.documents.getByName(nomeDocumentoAtual);
	
	doc.layers.add();
	var placed = doc.groupItems.createFromFile( embedDoc );
	}
	
	if ( app.documents.length > 0
	&& app.activeDocument.textFrames.length > 0 ) {
	var text;

	text = app.activeDocument.textFrames[0].textRange;
	var primeiraEscala = text.words[0];

	primeiraEscala.contents = escala + " km";
	primeiraEscala.justification = Justification.CENTER;
	
	// Centralizar Escala
	text = app.activeDocument.textFrames[1].textRange;
	var segundaEscala = text.words[0];
	segundaEscala.justification = Justification.CENTER;

	// Centralizar numero 0
	text = app.activeDocument.textFrames[2].textRange;
	var terceiraEscala = text.words[0];
	terceiraEscala.justification = Justification.CENTER;
	
	insereProjecao();

	}
		}//Captura erro da função
		catch(e){
			//alert(e,"Lucas ®",true);
		}
	}
	
//*****************************************************************************
//******************** FIM ESCALA SIMPLES******************
//*****************************************************************************	

//*****************************************************************************
//******************** INSERE PROJEÇÃO  ******************
//*****************************************************************************

function insereProjecao () {
	
	//alert(win.chkProjecao.value);
	
	//Se não quiser inserir a projeção, ela será excluída
	if(projecao == false){
		//Exclui o tipo da projeção
		app.activeDocument.textFrames[3].textRange.remove();
		}
	else{
		// Insere o tipo da projeção
		text = app.activeDocument.textFrames[3].textRange;
		var textoProjecao = text;
		
		//Converte letras
		projecao = projecao.toUpperCase(); //Maiúscula
		//projecao = projecao.toLowerCase(); //Minúscula
		
		textoProjecao.contents = projecao;
		textoProjecao.justification = Justification.CENTER;
		}
}
	
//*****************************************************************************
//******************** FIM INSERE PROJEÇÃO  ******************
//*****************************************************************************

//*****************************************************************************
//******************** INSERE ROSA DOS VENTOS  ******************
//*****************************************************************************	

// Funcao inserir Escala Simples
	function RosaDosVentos () {
	var caminho2PDF = "/I/Objetos/ScriptEscala/RosaDosVentos.pdf";
	//var embedDoc = new File(caminho2PDF); //any pdf file
	//var placed = doc.groupItems.createFromFile( embedDoc );
	
	var embedDoc = new File(caminho2PDF); //any pdf file
	if ( app.documents.length > 0 && embedDoc.exists ) {
	var doc = app.activeDocument;
	
	//doc.layers.add();
	var placed = doc.groupItems.createFromFile( embedDoc );
	}
}

//*****************************************************************************
//******************** FIM INSERE ROSA DOS VENTOS  ******************
//*****************************************************************************	

//************** FIM DAS FUNCOES DO PROGRAMA **************
	
//************** AÇÕES DO PROGRAMA ANTES DA EXIBIÇÃO DA JANELA **************

	
// Verifica se selecionou algum objeto
if (mySelection[0] == null) {
	//alert ("Voce deve selecionar e agrupar o pais que deseja calcular","Lucas ®",true);
	throw "Voce deve selecionar e agrupar o pais que deseja calcular";
}

// Verifica se selecionou 2 objetos ou mais
if (mySelection[1] != null) {
	//alert ("Voce deve agrupar os objetos antes de continuar","Lucas ®",true);
	throw "Voce deve agrupar os objetos antes de continuar";
}

var largura = mySelection[0].width;
// var largura = groupItems.width;
//largura = largura * 0.0352875; //VALOR ANTIGO
largura = largura * 0.03527778; //VALOR NOVO

// Tells us where this script is running from
var scriptsFile = new File($.fileName);

//this.flashFile = new File(scriptsFile.parent.parent.fsName + "/resources/ScriptEscala.swf");
this.flashFile = new File(scriptsFile.parent.fsName + "/ScriptEscala.swf");

//var flashPalette = new Window('palette', 'Escala - Lucas ®',);
var flashPalette = new Window('dialog', 'Escala - Lucas ®',);

// Set the player bounds to match the palette
var cBounds = flashPalette.frameBounds;
flashPalette.margins = [0,0,0,0];
//alert(flashPalette.margins);
// add the Flash Player control to the palette.	

//alert(flashPalette.opacity = 0.5);

var flashPlayer = flashPalette.add("flashplayer", cBounds);
flashPlayer.preferredSize = [450, 530];

var scriptsFile = new File($.fileName);
//this.flashFile = new File(scriptsFile.parent.parent.fsName + "/resources/ScriptEscala.swf");
this.flashFile = new File(scriptsFile.parent.fsName + "/ScriptEscala.swf");
flashPlayer.loadMovie(this.flashFile);
				
//************************************************* PASSAR LARGURA PARA O ILLUSTRATOR **************************
//var largura = "50";	
// Envia um parâmetro para o FlashBuilder
flashPlayer.capturaLargura = function()
{
	return largura;
}
//************************************************* PASSAR LARGURA PARA O ILLUSTRATOR **************************	

flashPlayer.capturaXML = function()
{
	var scriptsFile = new File($.fileName);
	//LOCAL DO ARQUIVO
	//this.xmlFile = new File(scriptsFile.parent.parent.fsName + "/resources/SnpXMLTreeView.xml");
	this.xmlFile = new File(scriptsFile.parent.fsName + "/arquivos/paises.xml");
	
	//alert(this.xmlFile);

	this.xmlFile.open("r");
	var contents = this.xmlFile.read();
	this.xmlFile.close();
	
	return contents;
}

// Botão cancelar
flashPlayer.cancelarButton = function()
{
	flashPalette.close();
}
//Botão OK - CAPTURA PARAMETROS DA JANELA DO FLEX
// Envia um parâmetro para o FlashBuilder
flashPlayer.okButton = function(escalaCompletaTemp, escalaSimplesTemp, inserirProjecaoTemp, escalaTemp,projecaoDeTemp)
{
	/*
	alert("escalaCompleta " + escalaCompletaTemp);
	alert("escalaSimples " + escalaSimplesTemp);
	alert("inserirProjecao " + inserirProjecaoTemp);
	alert("escalaTemp " + escalaTemp);
	alert("projecaoDeTemp " + projecaoDeTemp);
	*/

	//alert("projecaoDeTemp " + inserirProjecaoTemp);

	escalaCompleta = escalaCompletaTemp;
	escalaSimples = escalaSimplesTemp;
	inserirProjecao = inserirProjecaoTemp;
	escala = escalaTemp;
	if(inserirProjecaoTemp){
			projecao = projecaoDeTemp;
		}

	flashPalette.close();
	rodaPrograma();
}
//Fim do botão OK

//Exibe a janela
flashPalette.show();

//************* EXECUTA PROGRAMA *********************
function rodaPrograma(){
//alert("rodando programa");

// Exibe a mensagem
//rodaMensagem();

// Insere a escala no documento
/*
alert(escalaSimples);
alert(escalaCompleta);
*/

if (escalaSimples) { 
	EscalaSimples();
		};
			
if (escalaCompleta) {
	EscalaCompleta();
		};
	 
}

//************* FIM EXECUTA PROGRAMA *********************
}
else 
{
alert ("Nenhum arquivo aberto","Lucas ®",true);
}

}
catch(e){
	alert(e,"Lucas ®",true);
}