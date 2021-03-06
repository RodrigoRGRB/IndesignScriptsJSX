var  WJ_ImportFileAttachment06 = app.trustedFunction(function()
{
   app.beginPriv();

// *** C�digo adaptado ao tamanho dos PDFs gerados para A5 em 16/03/2012 ***


//console.println(app.activeDocs.length);
if(app.activeDocs.length > 0){

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

//************C�LCULO DA BORDA *************
//Pegar largura da p�gina
var mult = 2.924; //mm
var aRect = this.getPageBox();

var width = aRect[2] - aRect[0];
var larguraMilimetros = parseInt(width/mult);

var heigth = aRect[1] - aRect[3];
//var alturaMilimetros = (heigth/mult);
var alturaMilimetros = parseInt((heigth/mult));
//console.println("Largura = " + larguraMilimetros);
//console.println("Altura = " + alturaMilimetros);

//Calcular valor da borda direita
var larguraDaPagina = 148; // define a largura padr�o de todos os documentos
var bordaDireita = -((larguraMilimetros - larguraDaPagina) / 2);
bordaDireita = bordaDireita - 5; //margem em mm a partir da borda da p�gina
bordaDireita = bordaDireita * 2.924; // Coverte milimetros para pontos

//************ FIM DO C�LCULO DA BORDA *************

//************ CALCULAR NUMERO DA PROVA *************

//var numeroProva = 1;
//numeroProva = numeroProva + "a PROVA";

var numeroProva = app.popUpMenu("1� prova","2� prova","3� prova","4� prova");
//var numeroProva = app.popUpMenu("1� prova","2� prova","3� prova","4� prova","-","Remover");
//app.alert(numeroProva);

//ADICIONA ESPACOS DE ACORDO COM A PROVA SELECIONADA

var constante = 23;
if(numeroProva=="2� prova"){
	espacoTopo = -(constante*2);
	}

if(numeroProva=="3� prova"){
	espacoTopo = -(constante*4);
	}

if(numeroProva=="4� prova"){
	espacoTopo = -(constante*6);
	}

//FIM ADICIONA ESPACOS 

//Se selecionar algum valor, executa inser��o
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

//************ INICIALIZA O PROGRESS BAR *************

var t = app.thermometer; // acquire a thermometer object
	t.duration = this.numPages;
	t.begin();
	//var cnt=0;
	//cnt += getPageNumWords(i);
	//console.println("There are " + cnt + "words in this doc.");


//************************************************************

for(i=0;i<numeroDePaginas;i++){
	
	
	//********** CONTAGEM PROGRESS BAR
	
	t.value = i;
	//t.text = "Aplicando prova na p�gina " + (i + 1);
	t.text = "Aplicando '"+ numeroProva +"' na p�gina "+ this.getPageLabel(i);
	
	
	//********************************************

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

// CANCELA O PROGRESS BAR

if (t.cancelled) break;

//****************************

}

}
//********************************************

//************ FINALIZA O PROGRESS BAR *****************

t.end();

//**************************************************************
 }
//Se nenhum arquivo aberto
else{
	app.alert("nenhum arquivo aberto");
	}

   app.endPriv();
});
//</CodeAbove>

/*
//L� O �CONE DO BOT�O
	// import icon (25x25 pixels) from the file specified
	//this.importIcon("myIcon", "/D/b.jpg", 0);
	this.importIcon("myIcon", "/I/Objetos/Scripts/AcrobatPDF/Botoes/prova.jpg", 0);

	// convert the icon to a stream.
	var oIcon = util.iconStreamFromIcon(this.getIcon("myIcon"));
*/

//<JSCodeSnippet name="EventCode">
var DoCmdImportNamedAttach06 = 
"// Enter your JavaScript code here\n" +
"// Or select one or more JavaScrippets\n" +
"WJ_ImportFileAttachment06();"
//</JSCodeSnippet>

//<JSCodeSnippet name="ButtonObjDef">
var oButObjImportNamedAttach06 = 
{cName: "ImportNamedAttach06",
cExec: DoCmdImportNamedAttach06,
//oIcon: oIcon,
cMarked: "event.rc = false",
cTooltext: "Provas A5",
nPos: -1};



try
{
//</JSCodeSnippet>
//<JSCodeSnippet name="AddButtonfn">
    app.addToolButton(oButObjImportNamedAttach06);
//</JSCodeSnippet>
if((event.type == "Doc") && (app.viewerVersion >= 8))
    global["ImportNamedAttach06_InDoc"] = "3:28:2009:9:48:55";
else
    global["ImportNamedAttach06"] = "3:28:2009:9:48:55";
//<JSCodeSnippet name="CatchAddBut">
}catch(e)
{
   if((global.bReportNameCollision != null) && (global.bReportNameCollision == true))
   {
    var strError = 'Cannot Install AcroButton "oButObjImportNamedAttach06"\n';
    strError += ':' + e.fileName + '\n';
    strError += 'Error: ' + e.name + '\n';
    strError += e.message + '\n';
    strError += 'Possible Name conflict';
    app.alert(strError,0,0,'AcroButton Error');
   }
}
//</JSCodeSnippet>
 
//</AcroButtons>