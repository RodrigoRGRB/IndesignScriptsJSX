var  WJ_ImportFileAttachment04 = app.trustedFunction(function()
{
   app.beginPriv();


var paginaAtual;
var numeroDePaginas = this.numPages;
var primeiraPagina = parseInt(this.getPageLabel(0));
var comecaImpar = true;
var nomeUsuario = identity.loginName;
nomeUsuario = nomeUsuario.toUpperCase();
var espacoTopo = 0;
//var pagImpar = "/I/Objetos/Scripts/AcrobatPDF/ImagensCabeco/CabecoPDFImpar.jpg";
//var pagPar = "/I/Objetos/Scripts/AcrobatPDF/ImagensCabeco/CabecoPDFPar.jpg";

//var marcaProva = "/D/Lucas/Arquivo pessoal/Resources/AcrobatPDF/TesteScript/testeProva/prova.pdf";
var marcaProva = "/I/Objetos/Scripts/AcrobatPDF/Prova/prova.pdf";

//************CÁLCULO DA BORDA *************
//Pegar largura da página
var mult = 2.834; //mm
var aRect = this.getPageBox();

var width = aRect[2] - aRect[0];
var larguraMilimetros = parseInt(width/mult);

var heigth = aRect[1] - aRect[3];
//var alturaMilimetros = (heigth/mult);
var alturaMilimetros = parseInt((heigth/mult));
//console.println("Largura = " + larguraMilimetros);
//console.println("Altura = " + alturaMilimetros);

//Calcular valor da borda direita
var larguraDaPagina = 210; // define a largura padrão de todos os documentos
var bordaDireita = -((larguraMilimetros - larguraDaPagina) / 2);
bordaDireita = bordaDireita - 2; //margem em mm a partir da borda da página
bordaDireita = bordaDireita * 2.834; // Coverte milimetros para pontos

//************ FIM DO CÁLCULO DA BORDA *************

//************ CALCULAR NUMERO DA PROVA *************

//var numeroProva = 1;
//numeroProva = numeroProva + "a PROVA";

var numeroProva = app.popUpMenu("1ª prova","2ª prova","3ª prova","4ª prova", "5ª prova","6ª prova","7ª prova","8ª prova","-","PDF Final");
//var numeroProva = app.popUpMenu("1ª prova","2ª prova","3ª prova","4ª prova", "5ª prova","6ª prova","7ª prova","8ª prova","-","Remover");
//app.alert(numeroProva);

//ADICIONA ESPACOS DE ACORDO COM A PROVA SELECIONADA

var constante = 23;
if(numeroProva=="2ª prova"){
	espacoTopo = -(constante*2);
	}

if(numeroProva=="3ª prova"){
	espacoTopo = -(constante*4);
	}

if(numeroProva=="4ª prova"){
	espacoTopo = -(constante*6);
	}

if(numeroProva=="5ª prova"){
	espacoTopo = -(constante*8);
	}

if(numeroProva=="6ª prova"){
	espacoTopo = -(constante*10);
	}

if(numeroProva=="7ª prova"){
	espacoTopo = -(constante*12);
	}

if(numeroProva=="8ª prova"){
	espacoTopo = -(constante*14);
	}

if(numeroProva=="PDF Final"){
	bordaDireita = bordaDireita + 27;
	}

//FIM ADICIONA ESPACOS 

//Se selecionar algum valor, executa inserção
if(numeroProva != null){
	
//Muda o numero da prova pra maiuscula
numeroProva = numeroProva.toUpperCase();

//************ FIM CALCULAR NUMERO DA PROVA *************


//************ CALCULAR DATA *************
var d = new Date();
//console.println(numeroProva+"a PROVA \n" + util.printd("dd-mm-yyyy (HH:MM)", d));
//var textoProva = numeroProva+"a PROVA \n" + util.printd("dd-mm-yyyy (HH:MM)", d);
var data = util.printd("dd-mm-yyyy (HH:MM)", d);
//************ FIM CALCULAR DATA *************

for(i=0;i<numeroDePaginas;i++){

	paginaAtual = i;
	this.addWatermarkFromFile({
		cDIPath: marcaProva,
		nScale: 1.1,
		nStart: paginaAtual,
		nEnd: paginaAtual,
		bOnTop: true,
		nHorizAlign: app.constants.align.right,
		nVertAlign: app.constants.align.center,
		nHorizValue: bordaDireita, nVertValue: espacoTopo,
	});



	
//ADICIONA NUMERO DA PROVA SEPARADO DA DATA
//Adiciona numero da prova

	this.addWatermarkFromText({
		cText: numeroProva,
		nTextAlign: app.constants.align.center,
		nFontSize: 5,
		nRotation: -90,
		nScale: 1.1,
		nStart: paginaAtual,
		nEnd: paginaAtual,
		bOnTop: true,
		nHorizAlign: app.constants.align.right,
		nVertAlign: app.constants.align.center,
		nHorizValue: bordaDireita-1.5, nVertValue: espacoTopo,
	});

//Adiciona nome do usuario

	this.addWatermarkFromText({
		cText: nomeUsuario,
		nTextAlign: app.constants.align.center,
		nFontSize: 3,
		nRotation: -90,
		nScale: 1.1,
		nStart: paginaAtual,
		nEnd: paginaAtual,
		bOnTop: true,
		nHorizAlign: app.constants.align.right,
		nVertAlign: app.constants.align.center,
		nHorizValue: bordaDireita-7, nVertValue: espacoTopo,
	});

//Adiciona data

	this.addWatermarkFromText({
		cText: data,
		nTextAlign: app.constants.align.center,
		nFontSize: 4,
		nRotation: -90,
		nScale: 1.1,
		nStart: paginaAtual,
		nEnd: paginaAtual,
		bOnTop: true,
		nHorizAlign: app.constants.align.right,
		nVertAlign: app.constants.align.center,
		nHorizValue: bordaDireita-10.5, nVertValue: espacoTopo,
	});



}



}
//********************************************
 
   app.endPriv();
});
//</CodeAbove>

/*
//LÊ O ÍCONE DO BOTÃO
	// import icon (25x25 pixels) from the file specified
	//this.importIcon("myIcon", "/D/b.jpg", 0);
	this.importIcon("myIcon", "/I/Objetos/Scripts/AcrobatPDF/Botoes/prova.jpg", 0);

	// convert the icon to a stream.
	var oIcon = util.iconStreamFromIcon(this.getIcon("myIcon"));
*/

//<JSCodeSnippet name="EventCode">
var DoCmdImportNamedAttach04 = 
"// Enter your JavaScript code here\n" +
"// Or select one or more JavaScrippets\n" +
"WJ_ImportFileAttachment04();"
//</JSCodeSnippet>

//<JSCodeSnippet name="ButtonObjDef">
var oButObjImportNamedAttach04 = 
{cName: "ImportNamedAttach04",
cExec: DoCmdImportNamedAttach04,
//oIcon: oIcon,
cMarked: "event.rc = false",
cTooltext: "Adicionar Prova",
nPos: -1};



try
{
//</JSCodeSnippet>
//<JSCodeSnippet name="AddButtonfn">
    app.addToolButton(oButObjImportNamedAttach04);
//</JSCodeSnippet>
if((event.type == "Doc") && (app.viewerVersion >= 7))
    global["ImportNamedAttach04_InDoc"] = "3:28:2009:9:48:55";
else
    global["ImportNamedAttach04"] = "3:28:2009:9:48:55";
//<JSCodeSnippet name="CatchAddBut">
}catch(e)
{
   if((global.bReportNameCollision != null) && (global.bReportNameCollision == true))
   {
    var strError = 'Cannot Install AcroButton "oButObjImportNamedAttach04"\n';
    strError += ':' + e.fileName + '\n';
    strError += 'Error: ' + e.name + '\n';
    strError += e.message + '\n';
    strError += 'Possible Name conflict';
    app.alert(strError,0,0,'AcroButton Error');
   }
}
//</JSCodeSnippet>
 
//</AcroButtons>