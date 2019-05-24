//Verifica se tem algum arquivo aberto
if(app.documents.length > 0) { 
	
////************************* INCLUIR FUNÇÕES ************************* 


#includepath "D:\ROdrigo\SCRIPTS\FecharPDF"
#include "FuncaoCriaCarimbov20.jsx"
#include "FuncaoExportarPDFv20.jsx"
#include "FuncaoPDFPlacerV20.jsx"
#include "funcaoBordasExatasV20.jsx"
#include "funcaoAlinhamentoV20.jsx"
#include "FuncaoPrintPresetsV20.jsx"
#include "FuncaoRemovePresetsV20.jsx"

////************************* FIM DA INCLUSÃO DE FUNÇÕES ************************* 


var rodaPrograma = false;
var f; //funcao carregar arquivo
var erroArquivoPDF = false;
var intervaloPDF = null;
var chkIntervalo;
var carimbo;
var distorcaoHorizontal;
var distorcaoVertical;
var sangriaInfSup;
var sangriaDirEsq;
var distorcerDeAcordoComMargem;
var originalDocument = app.activeDocument;
var novoDocumentoCriado = false;
	
	// Define components
	var res =
           "dialog { \
		          grupoProva: Panel { text: 'Adicionar número da prova', orientation:'column', preferredSize: [350, 20],\
				  	whichInfo: DropDownList { preferredSize: [315, 20],  alignment:'left' }, \
                           info2: Group { orientation: 'column', alignment:'left' , \
						labelPDF: StaticText { text:'' }, \
                           }, \
                   }, \
		         		          grupoPaginas: Panel { text: 'Páginas a serem Impressas', orientation:'column', preferredSize: [350, 20],\
							todas: Group { orientation: 'row',  alignment:'left' ,\
							   } \
							paginas: Group { orientation: 'row',  alignment:'left' ,\
							   } \
                   }, \
                   buttons: Group { orientation: 'row', alignment: 'right', \
                           okBtn: Button { text:'OK', properties:{name:'ok'} } \
						cnlBtn: Button { text:'Cancelar', properties:{name:'cancelar'} } \
                   } \
           }";
		   
		   //Cria janela
		   var win = new Window (res,"Fechar PDF - Versão 2.0 - Rodrigo Gabriel",);  
		   //var win2 = new Window (res2,"Executando - Lucas ®",); 
	
	//CRIA JANELA PARA CONFERIR CAMPOS
	// Create a palette-type window (a modeless or floating dialog),
	var win2 = new Window("palette", "Fechar PDF - Versão 2.0 - Rodrigo Gabriel", [150, 150, 350, 200]); 
	this.windowRef = win2;
	win2.center();

	// Add a panel to contain the components
	//win2.pnl = win2.add("panel", [10, 10, 440, 100], "Aguarde... conferindo campos");
	win2.pnl = win2.add("statictext", [20, 20, 350, 200], "Aguarde... conferindo campos");
	
		   
//********************FUNCOES DA JANELA****************************

function corrigeNomeArquivo(arquivo){
	
var nomeCorrigido = arquivo.split('%20').join(' ')
.split("%C3%A9").join('é')
.split("%C3%AA").join('ê')
.split("%C3%BA").join('ú')
.split("%C3%A1").join('á')
.split("%C3%A9").join('é')
.split("%C3%AD").join('í')
.split("%C3%B3").join('ó')
.split("%C3%BA").join('ú')
.split("%C3%81").join('Á')
.split("%C3%89").join('É')
.split("%C3%8D").join('Í')
.split("%C3%93").join('Ó')
.split("%C3%9A").join('Ú')
.split("%C3%A3").join('ã')
.split("%C3%B5").join('õ')
.split("%C3%83").join('Ã')
.split("%C3%95").join('Õ')
.split("%C3%BC").join('ü')
.split("%C3%9C").join('Ü')
.split("%25").join('%')
.split("%C2%A8").join('¨')
.split("%7B").join('{')
.split("%5B").join('[')
.split("%5D").join(']')
.split("%7D").join('}')
.split("%5E").join('^')
.split("%C3%A7").join('ç')
.split("%C3%87").join('Ç')
.split("%C2%B0").join('°')
.split("%C2%BA").join('º')
.split("%C2%AA").join('ª')
.split("%C2%A7").join('§');

return nomeCorrigido;
	}


//***************

function checkSequenciaInvalida(splitIntervalo){
	
	//alert(splitIntervalo);
	sequenciaInvalida = false;
	
	//splitIntervalo.length
	if(splitIntervalo.length > 1){
	for(i=1;i < splitIntervalo.length;i++){

		if(parseInt(splitIntervalo[i])<parseInt(splitIntervalo[i-1])){
			//alert("errado");
			sequenciaInvalida = true;
			break;
			}
		
		}
	}
	return sequenciaInvalida;
	}

//********************
//************ FUNCAO PÁGINAS INEXISTENTES
function checkPaginasInexistentesTemp(intervaloAtual){

	//Varre todas as páginas do documento e cria um array
	var arrayPaginas = new Array();
	for(z=0;z<app.activeDocument.pages.length;z++){
		arrayPaginas[z] = app.activeDocument.pages[z].name;
	}

	for(j=0;j<arrayPaginas.length;j++){
		if(intervaloAtual == arrayPaginas[j]){
			return true;
			}
		}

return false;
	
}

function checkPaginasInexistentes(splitIntervalo){
	//alert(splitIntervalo);

for(i=0;i<splitIntervalo.length;i++){

	var numeroAtual = parseInt(splitIntervalo[i]);
	var intervaloValido = checkPaginasInexistentesTemp(numeroAtual);
	//alert(""+ numeroAtual + intervaloValido);
	if(intervaloValido == false){
		//contemIntervaloInvalido = true;
		return true;
		}
	
	}
return false;
}
			
//************ FIM FUNCAO PÁGINAS INEXISTENTES

//************ CRIA PROGRESS BAR ****************

#targetengine "session"
//Because these terms are defined in the "session" engine,
//they will be available to any other JavaScript running
//in that instance of the engine.
//function myCreateProgressPanel(myMaximumValue, myProgressBarWidth){

// Create a palette-type window (a modeless or floating dialog),
var myProgressPanel = new Window("palette", "Fechar PDF  - Versão 2.0 - Fernanda Bernardes", [150, 150, 600, 270]); 
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
        var mensagemErro = "because it is already open."
        
         //alert(e.split(",")+"\n"+mensagemErro);
         var errorTemp = e+"";
         errorTemp = errorTemp.split(',');
         errorTemp = errorTemp[1];
         
         //alert(errorTemp+"\n"+mensagemErro);
        
        

		if((errorTemp+"") == mensagemErro){
			
			alert("Erro: Você não pode salvar o arquivo \""+f.displayName+"\". Você não tem permissão ou o arquivo está em uso.","Editorial - Área Restrita",true);
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

//******************** FUNCAO CONFIG DO NOVO ARQUIVO ********************
function addConfigJanela (myDocument){
	
			//Set the measurement units to milimeters.
			myDocument.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.millimeters;
			myDocument.viewPreferences.verticalMeasurementUnits = MeasurementUnits.millimeters;
	
			with(myDocument.documentPreferences){
				
			facingPages = true;
			documentBleedUniformSize = false;
			documentSlugUniformSize = false;
			//Bleed
			documentBleedBottomOffset = parseInt(win.grupoPredefinicao.grupoSangria.info.InfSup.inputInfSup.text);
			documentBleedTopOffset = parseInt(win.grupoPredefinicao.grupoSangria.info.InfSup.inputInfSup.text);
			documentBleedInsideOrLeftOffset = parseInt(win.grupoPredefinicao.grupoSangria.info.DirEsq.inputDirEsq.text);
			documentBleedOutsideOrRightOffset = parseInt(win.grupoPredefinicao.grupoSangria.info.DirEsq.inputDirEsq.text);
			//Slug
			/*
			slugBottomOffset = "18p";
			slugTopOffset = "3p";
			slugInsideOrLeftOffset = "3p";
			slugRightOrOutsideOffset = "3p";
			*/
			//Size
			pageWidth = win.grupoPredefinicao.grupoTamanhoPagina.info.largura.inputLargura.text;
			pageHeight = win.grupoPredefinicao.grupoTamanhoPagina.info.altura.inputAltura.text;
		
		}
	
	}


//******************** FIM FUNCAO CONFIG DO NOVO ARQUIVO ********************


//******************** FUNCAO VALIDA CARACTERES ********************

function validaCaracteres(arrayDeCaracteres){
	var finalizaLooping = false;
	var caracteresValidos = ["-",",","0","1","2","3","4","5","6","7","8","9"];
	arrayDeCaracteres = arrayDeCaracteres.split("");
	//alert(arrayDeCaracteres);
	//alert(arrayDeCaracteres);
for(i=0;i<arrayDeCaracteres.length;i++){
	if(chkIntervalo == false){
		//alert("valor não encontrado");
		break;
		}
	loop:
	for(j =0;j<caracteresValidos.length;j++){
		//alert(arrayDeCaracteres[i] +" == "+caracteresValidos[j]);
			if(arrayDeCaracteres[i] == caracteresValidos[j]){
					finalizaLooping = true;
					chkIntervalo = true;
					break loop;
				}
			else if(caracteresValidos[j] == (caracteresValidos[j].length)-1){
				chkIntervalo = false;
				}
		}
	}
//return finalizaLooping;
if(chkIntervalo != true){
	chkIntervalo = false;
}
}


///******************* COMECO MENU PREDEFINICOES ***********************

//Ajusta o tamanho do menu drop down
//win.grupoPredefinicao.whichInfo.preferredSize = [290, 15];


// Leitura do arquivo XML (TXT com split "|")
var listaTXT = 
//#includepath "/I/Objetos/Scripts/InDesign/CriarCapa/"
//#includepath "D/Lucas/Temp/Script Indesign/"
#include "PredefinicoesFecharPDFv2.xml"

// Cria Array


//Preenche o campo Adicionar Prova
for(i=0; i < 3;i++){
	
	win.grupoProva.whichInfo.add ('item', "Prova "+i);
	
	}
win.grupoProva.whichInfo.add ('item', "Prova Espc");
win.grupoProva.whichInfo.add ('item', "Prova Final");

//Desabilita o campo PDF Final
//win.grupoErratasPDF.visible = false;



// Add radioButton
win.grupoPaginas.todas.radTodas = win.grupoPaginas.todas.add("radiobutton", [30, 15,90, 30], "Todas");
win.grupoPaginas.paginas.radIntervalo = win.grupoPaginas.paginas.add("radiobutton", [30, 15,100, 30], "Intervalo:");
win.grupoPaginas.paginas.intervalo = win.grupoPaginas.paginas.add('edittext', [150, 15, 385, 35], '');

//Alterna o radioButton
win.grupoPaginas.todas.radTodas.onClick = function()
	{	
	win.grupoPaginas.paginas.radIntervalo.value = false;
	win.grupoPaginas.paginas.intervalo.enabled = false;
	}

win.grupoPaginas.paginas.radIntervalo.onClick = function()
	{	
	win.grupoPaginas.todas.radTodas.value = false;
	win.grupoPaginas.paginas.intervalo.enabled = true;
	}



///******************* FIM MENU PREDEFINICOES ***********************


	//Valores default para os campos
	//win.grupoErratasPDF.info.arquivo.inputCaminho.enabled = true;
	
	//Adicionar paginas
	win.grupoPaginas.todas.radTodas.value = true;
	win.grupoPaginas.paginas.intervalo.enabled = false;
	
	//Seleciona primeiro item da prova
	win.grupoProva.whichInfo.selection = win.grupoProva.whichInfo.items[0];
	
	//Seleciona primeiro item das predefinições
	win.buttons.cnlBtn.onClick = function()
	{
			rodaPrograma = false;
			win.close();
	}
	
