//Verifica se tem algum arquivo aberto
if(app.documents.length > 0) { 
	
////************************* INCLUIR FUNÇÕES ************************* 

//#includepath "/I/Objetos/Scripts/InDesign/ImportarPDF"
//#includepath "/D/Lucas/Temp/Script Indesign/"
#includepath "/I/Objetos/Scripts/InDesign/FecharPDF/"
#include "FuncaoCriaCarimbov6.jsx"
#include "FuncaoExportarPDFv2.jsx"
#include "FuncaoPDFPlacer.jsx"
//#include "PDFBordas.jsx"
#include "funcaoBordasExatas.jsx"
#include "funcaoAlinhamento.jsx"
#include "FuncaoPrintPresetsv2.jsx"
#include "FuncaoRemovePresets.jsx"

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
		          grupoPredefinicao: Panel { text: 'Configuração da página ', orientation:'column', preferredSize: [350, 20],\
				  	whichInfo: DropDownList { preferredSize: [315, 20],  alignment:'left' }, \
                           info2: Group { orientation: 'column', alignment:'left' , \
                           }, \
					   grupoTamanhoPagina: Group { orientation:'column',  preferredSize: [315, 20],\
							labelLargura: StaticText { text:'Tamanho da página (em milímetros):' ,alignment:'left' }, \
							   info: Group { orientation: 'row', alignment:'left' ,  \
									largura: Group { orientation: 'row',  \
											labelLargura: StaticText { text:'Largura:' }, \
											inputLargura: EditText { preferredSize: [103, 20] } \
									   } \
									altura: Group { orientation: 'row',  alignment:'left' ,\
											labelAltura: StaticText { text:'Altura:' }, \
											inputAltura: EditText { preferredSize: [103, 20] } \
									   } \
							   }, \
					   }, \
					   grupoSangria: Group { orientation:'column',  preferredSize: [320, 20],\
							labelLargura: StaticText { text: 'Sangria da página (em milímetros):' ,alignment:'left' }, \
							   info: Group { orientation: 'row', alignment:'left' , \
									DirEsq: Group { orientation: 'row', \
											labelDirEsq: StaticText { text:'Direita/Esquerda:' }, \
											inputDirEsq: EditText { preferredSize: [49, 20] } \
									   } \
									InfSup: Group { orientation: 'row',  alignment:'left' ,\
											labelInfSup: StaticText { text:'Inferior/Superior:' }, \
											inputInfSup: EditText { preferredSize: [49, 20] } \
									   } \
							   }, \
						labelLargura: StaticText { text: 'Porcentagem do conteúdo' ,alignment:'left' }, \
					}, \
					grupoPorcentagem: Group { orientation:'column',  preferredSize: [315, 20],\
						grupoCheckBox: Group { orientation:'column', alignment:'left' }, \
						   info: Group { orientation: 'row', alignment:'left' , \
								porcentagemH: Group { orientation: 'row',  alignment:'left' ,\
										labelH: StaticText { text:'Horizontal' }, \
										inputH: EditText { preferredSize: [95, 20] } \
								   } \
								porcentagemV: Group { orientation: 'row',  alignment:'left' ,\
										labelV: StaticText { text:'Vertical' }, \
										inputV: EditText { preferredSize: [95, 20] } \
								   } \
						}, \
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
		   var win = new Window (res,"Fechar PDF - Lucas ®",);  
		   //var win2 = new Window (res2,"Executando - Lucas ®",); 
	
	//CRIA JANELA PARA CONFERIR CAMPOS
	// Create a palette-type window (a modeless or floating dialog),
	var win2 = new Window("palette", "Fechar PDF - Lucas ®", [150, 150, 350, 200]); 
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
		
		var mensagemErro = "Error: Cannot save to the file \""+f.displayName+"\".  You may not have permission or the file may be in use."

		if((e+"") == mensagemErro){
			
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


//******************** FUNCAO VALIDA CARACTERES ********************

///******************* COMECO MENU PREDEFINICOES ***********************

//Ajusta o tamanho do menu drop down
//win.grupoPredefinicao.whichInfo.preferredSize = [290, 15];


// Leitura do arquivo XML (TXT com split "|")
var listaTXT = 
//#includepath "/I/Objetos/Scripts/InDesign/CriarCapa/"
//#includepath "D/Lucas/Temp/Script Indesign/"
#include "PredefinicoesFecharPDF.xml"

// Cria Array
var arrayTXT = listaTXT.split("|");

//Preenche o menu Predefinição
for(i=0;arrayTXT[i] != "";i = i+8){
	
	win.grupoPredefinicao.whichInfo.add ('item', arrayTXT[i]);
	//alert(arrayTXT[i]);
	
	}


//Preenche o campo Adicionar Prova
for(i=1; i < 9;i++){
	
	win.grupoProva.whichInfo.add ('item', i+ "ª Prova");
	
	}
win.grupoProva.whichInfo.add ('item', "PDF Final");
win.grupoProva.whichInfo.add ('item', "PDF Final - Erratas");

//Desabilita o campo PDF Final
//win.grupoErratasPDF.visible = false;

//Habilita a janela PDF Final se a opção do campo Adicionar Prova for PDF Final
win.grupoProva.whichInfo.onChange = function () 
	{
	/*
		if(win.grupoProva.whichInfo.selection.text != "PDF Final - Erratas"){
			//alert("PDF Final");
			win.grupoErratasPDF.visible = false;
		}
		else{
			win.grupoErratasPDF.visible = true;
			}
			*/
	
		if(win.grupoProva.whichInfo.selection.text == "PDF Final - Erratas" || win.grupoProva.whichInfo.selection.text == "PDF Final"  ){
			win.grupoProva.info2.labelPDF.text = "PDF Preset: PROL";
			}
		else{
			win.grupoProva.info2.labelPDF.text = "PDF Preset: [PDF/X-1a:2001]";
			}

	}


// Add checkBox
win.grupoPredefinicao.grupoPorcentagem.grupoCheckBox.chkBox = win.grupoPredefinicao.grupoPorcentagem.grupoCheckBox.add("checkbox",  [30, 15,345, 30], "Distorcer conteúdo de acordo com a sangria da página");


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


//Preenche campos da janela ao se mudar as predefinições
win.grupoPredefinicao.whichInfo.onChange = function () 
	{
		var i = win.grupoPredefinicao.whichInfo.selection;

		win.grupoPredefinicao.grupoTamanhoPagina.info.largura.inputLargura.text = arrayTXT[(i*8)+1];
		win.grupoPredefinicao.grupoTamanhoPagina.info.altura.inputAltura.text = arrayTXT[(i*8)+2];
		win.grupoPredefinicao.grupoSangria.info.DirEsq.inputDirEsq.text = arrayTXT[(i*8)+3];
		win.grupoPredefinicao.grupoSangria.info.InfSup.inputInfSup.text = arrayTXT[(i*8)+4];
		
		//win.grupoPredefinicao.grupoSangria.info.DirEsq.inputInfSup.enabled = arrayTXT[(i*8)+5];
		//alert(arrayTXT[(i*8)+5]);
		booleanChkBox = arrayTXT[(i*8)+5];
		if(booleanChkBox == "true"){
			win.grupoPredefinicao.grupoPorcentagem.grupoCheckBox.chkBox.value = false;
		}
	else{
			win.grupoPredefinicao.grupoPorcentagem.grupoCheckBox.chkBox.value = true;
		}
		
		
		win.grupoPredefinicao.grupoPorcentagem.info.porcentagemH.inputH.text = arrayTXT[(i*8)+6];
		win.grupoPredefinicao.grupoPorcentagem.info.porcentagemV.inputV.text = arrayTXT[(i*8)+7];
		
		if(win.grupoPredefinicao.whichInfo.selection.text == "Configurações do documento atual"){
			
				win.grupoPredefinicao.grupoTamanhoPagina.enabled = false;
				win.grupoPredefinicao.grupoPorcentagem.enabled = false;
				win.grupoPredefinicao.grupoSangria.enabled = false;

				var arredondaLargura = Math.round(app.activeDocument.documentPreferences.pageWidth); 
				var arredondaAltura = Math.round(app.activeDocument.documentPreferences.pageHeight); 

				win.grupoPredefinicao.grupoTamanhoPagina.info.largura.inputLargura.text = arredondaLargura;
				win.grupoPredefinicao.grupoTamanhoPagina.info.altura.inputAltura.text = arredondaAltura;
				
				win.grupoPredefinicao.grupoSangria.info.DirEsq.inputDirEsq.text = (app.activeDocument.documentPreferences.documentBleedInsideOrLeftOffset + app.activeDocument.documentPreferences.documentBleedOutsideOrRightOffset)/2;
				win.grupoPredefinicao.grupoSangria.info.InfSup.inputInfSup.text = (app.activeDocument.documentPreferences.documentBleedTopOffset + app.activeDocument.documentPreferences.documentBleedBottomOffset)/2;
				
				win.grupoPredefinicao.grupoPorcentagem.info.porcentagemH.inputH.text = "100";
				win.grupoPredefinicao.grupoPorcentagem.info.porcentagemV.inputV.text = "100";
			}
		
		if(win.grupoPredefinicao.whichInfo.selection.text == "Personalizar"){
				win.grupoPredefinicao.grupoTamanhoPagina.enabled = true;
				win.grupoPredefinicao.grupoPorcentagem.enabled = true;
				win.grupoPredefinicao.grupoSangria.enabled = true;
				win.grupoPredefinicao.grupoPorcentagem.enabled = true;
				win.grupoPredefinicao.grupoPorcentagem.info.enabled = true;

				var arredondaLargura = Math.round(app.activeDocument.documentPreferences.pageWidth); 
				var arredondaAltura = Math.round(app.activeDocument.documentPreferences.pageHeight); 

				win.grupoPredefinicao.grupoTamanhoPagina.info.largura.inputLargura.text = arredondaLargura;
				win.grupoPredefinicao.grupoTamanhoPagina.info.altura.inputAltura.text = arredondaAltura;
				
				win.grupoPredefinicao.grupoSangria.info.DirEsq.inputDirEsq.text = (app.activeDocument.documentPreferences.documentBleedInsideOrLeftOffset + app.activeDocument.documentPreferences.documentBleedOutsideOrRightOffset)/2;
				win.grupoPredefinicao.grupoSangria.info.InfSup.inputInfSup.text = (app.activeDocument.documentPreferences.documentBleedTopOffset + app.activeDocument.documentPreferences.documentBleedBottomOffset)/2;
				
				win.grupoPredefinicao.grupoPorcentagem.grupoCheckBox.chkBox.value = false;
				win.grupoPredefinicao.grupoPorcentagem.info.porcentagemH.inputH.text = "100";
				win.grupoPredefinicao.grupoPorcentagem.info.porcentagemV.inputV.text = "100";
			}
		else{
				win.grupoPredefinicao.grupoTamanhoPagina.enabled = false;
				win.grupoPredefinicao.grupoPorcentagem.enabled = false;
				win.grupoPredefinicao.grupoSangria.enabled = false;
			}

	}

win.grupoPredefinicao.grupoPorcentagem.grupoCheckBox.chkBox.onClick = function(){
	
	var valorChkBox = win.grupoPredefinicao.grupoPorcentagem.grupoCheckBox.chkBox.value;
	
	//alert(valorChkBox);
	
	if(valorChkBox == true){
		win.grupoPredefinicao.grupoPorcentagem.info.enabled = false;
		}
	else{
		win.grupoPredefinicao.grupoPorcentagem.info.enabled = true;
		}
	
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
	win.grupoPredefinicao.whichInfo.selection = win.grupoPredefinicao.whichInfo.items[0];
	
	
	// Carregar arquivo da capa
	/*
	win.grupoErratasPDF.info.arquivo.loadBtn.onClick = function()
	{	
		funcaoCarregarArquivo();
	}
	*/

	//Ação do botao cancelar
	win.buttons.cnlBtn.onClick = function()
	{
			rodaPrograma = false;
			win.close();
	}
	


//********************* VERIFICA CAMPOS EM BRANCO ***********************

win.buttons.okBtn.onClick = function()
	{
		win2.show();
		//alert(win.grupoPaginas.paginas.intervalo.text.charAt.length);
		var todosOsCampos = ""+win.grupoPredefinicao.grupoTamanhoPagina.info.largura.inputLargura.text + win.grupoPredefinicao.grupoTamanhoPagina.info.largura.inputLargura.text + win.grupoPredefinicao.grupoTamanhoPagina.info.altura.inputAltura.text + win.grupoPredefinicao.grupoTamanhoPagina.info.altura.inputAltura.text + win.grupoPredefinicao.grupoSangria.info.DirEsq.inputDirEsq.text + win.grupoPredefinicao.grupoSangria.info.InfSup.inputInfSup.text +win.grupoPredefinicao.grupoPorcentagem.info.porcentagemH.inputH.text +win.grupoPredefinicao.grupoPorcentagem.info.porcentagemH.inputH.text +win.grupoPredefinicao.grupoPorcentagem.info.porcentagemV.inputV.text+win.grupoPredefinicao.grupoPorcentagem.info.porcentagemV.inputV.text;
		var todosOsCampos = todosOsCampos.split(",");
		//alert(todosOsCampos.length);
		
		//********* VERIFICA INTERVALO **********
				
		//Confere intervalo de páginas
		if(win.grupoPaginas.paginas.radIntervalo.value == true){
			splitIntervalo = win.grupoPaginas.paginas.intervalo.text;
			splitIntervalo = splitIntervalo.split(/,|-|;/);
			//alert(splitIntervalo);
		}

		if(win.grupoPaginas.paginas.radIntervalo.value == true){
			chkIntervalo = null;
			
			//Verifica se contém caracteres diferentes de números
			validaCaracteres(win.grupoPaginas.paginas.intervalo.text);		
		}
	
		//True para valor encontrado
		//False para valor não encontrado
		
		//alert(finalizaLooping);
		//alert(chkIntervalo);
	
		//Verifica se todas as paginas digitadas no intervalo, existem
		var contemIntervaloInvalido = null;
		if(win.grupoPaginas.paginas.radIntervalo.value == true && chkIntervalo == true){
			//alert("oi");
			 contemIntervaloInvalido = checkPaginasInexistentes(splitIntervalo);
			//alert(contemIntervaloInvalido);
		}
	
		var sequenciaInvalida;
		if(win.grupoPaginas.paginas.radIntervalo.value == true && chkIntervalo == true){
			//alert("oi");
			 sequenciaInvalida = checkSequenciaInvalida(splitIntervalo);
			//alert(contemIntervaloInvalido);
		}
	
		var ultimoCaracter = win.grupoPaginas.paginas.intervalo.text;
		ultimoCaracter = ultimoCaracter.charAt(ultimoCaracter.length-1);
		//alert(ultimoCaracter);
		//********* VERIFICA INTERVALO **********
		
		win2.close();
			
		if(win.grupoPredefinicao.grupoTamanhoPagina.info.largura.inputLargura.text == "" || win.grupoPredefinicao.grupoTamanhoPagina.info.largura.inputLargura.text == 0 ){			
			alert("Digite um valor válido para a largura da página","Lucas ®",true);
			}
		else if(win.grupoPredefinicao.grupoTamanhoPagina.info.altura.inputAltura.text == "" || win.grupoPredefinicao.grupoTamanhoPagina.info.altura.inputAltura.text == 0){
			alert("Digite um valor válido para a altura da página","Lucas ®",true);
			}		
		else if(win.grupoPredefinicao.grupoSangria.info.DirEsq.inputDirEsq.text == ""){
			alert("Digite um valor válido para a sangria Direita/Esquerda","Lucas ®",true);
			}	
		else if(win.grupoPredefinicao.grupoSangria.info.InfSup.inputInfSup.text == ""){
			alert("Digite um valor para a sangria Inferior/Superior","Lucas ®",true);
			}		
		else if(win.grupoPredefinicao.grupoPorcentagem.grupoCheckBox.chkBox.value == false && (win.grupoPredefinicao.grupoPorcentagem.info.porcentagemH.inputH.text == "" || win.grupoPredefinicao.grupoPorcentagem.info.porcentagemH.inputH.text == 0)){
			alert("Digite um valor válido para a porcentagem horizontal","Lucas ®",true);
			}
		else if(win.grupoPredefinicao.grupoPorcentagem.grupoCheckBox.chkBox.value == false && (win.grupoPredefinicao.grupoPorcentagem.info.porcentagemV.inputV.text == "" || win.grupoPredefinicao.grupoPorcentagem.info.porcentagemV.inputV.text == 0)){
			alert("Digite um valor válido para a porcentagem vertical","Lucas ®",true);
			}
		else if(chkIntervalo == false){ //Intervalo das páginas
			alert("Intervalo de páginas inválido","Lucas ®",true);
			}
		else if(contemIntervaloInvalido == true){ //Intervalo das páginas
			alert("Intervalo contém páginas inexistentes","Lucas ®",true);
			}
		else if(sequenciaInvalida == true){ //Intervalo das páginas
			alert("Sequencia inválida.\nInsira as páginas em ordem crescente","Lucas ®",true);
			}
		else if(ultimoCaracter == "," || ultimoCaracter == "-"){ //Verifica se último caractere é um número
			alert("Intervalo de páginas inválido.\nO último caractere deve ser uma página existente","Lucas ®",true);
			}		
		else if(todosOsCampos.length>1){
			alert("Utilize ponto (.) ao invés de vírgula (,)","Lucas ®",true);
			}
		else{
			//Se todos os campos forem válidos, executa o programa
			rodaPrograma = true;
			//rodaPrograma = false;
			win.close();

			//Se tudo correto, inicializa as variáveis
			carimbo = win.grupoProva.whichInfo.selection.text;
			//alert(carimbo);

			//Recebe valor dos campos
			distorcaoHorizontal = win.grupoPredefinicao.grupoPorcentagem.info.porcentagemH.inputH.text;
			distorcaoVertical = win.grupoPredefinicao.grupoPorcentagem.info.porcentagemV.inputV.text;

			//Executa o script Bordas Matemática
			sangriaInfSup = parseInt(win.grupoPredefinicao.grupoSangria.info.InfSup.inputInfSup.text);
			sangriaDirEsq =  parseInt(win.grupoPredefinicao.grupoSangria.info.DirEsq.inputDirEsq.text);
			distorcerDeAcordoComMargem = win.grupoPredefinicao.grupoPorcentagem.grupoCheckBox.chkBox.value;
	
		}
	}

//********************* FIM VERIFICA CAMPOS EM BRANCO ***********************

//*************FIM FUNCOES DA JANELA *****************


//rodaPrograma = true;
this.windowRef = win;
removerPresets();
win.show();

if(rodaPrograma){
	
//Recebe o PDF Range. Se chkbox selecionado for 'intervalo', recebe o intervalo.
if(win.grupoPaginas.paginas.radIntervalo.value == true){
	intervaloPDF = win.grupoPaginas.paginas.intervalo.text;
	//alert(intervaloPDF);
	with(app.pdfExportPreferences){
		//pageRange = "1, 3-6, 7, 9-11, 12";
		//alert(pageRange);
		pageRange = intervaloPDF;
	}
}
else{
	
	//Cria um array com todas as páginas configura o page Range
	var arrayPaginas = ""+app.activeDocument.pages[0].name;
	intervaloPDF = "";
	for(z=1;z<app.activeDocument.pages.length;z++){
		arrayPaginas += ","+app.activeDocument.pages[z].name;
	}
	intervaloPDF = arrayPaginas;
	with(app.pdfExportPreferences){
		//pageRange = "1, 3-6, 7, 9-11, 12";
		//alert(pageRange);
		pageRange = arrayPaginas;
	}
	
	}
	



	//Tenta rodar o programa
	try{	

				//Se a opção escolhida for a Configurações do documento atual, exporta o PDF
				if(win.grupoPredefinicao.whichInfo.selection.text == "Configurações do documento atual"){
					
					//Selecione o lugar para salvar o arquivo final
					f = File.saveDialog("Salvar PDF ", "*.pdf");
					f = verificaPDF(f);
					//alert(f);
					
					//Se o arquivo selecionado for válido, roda o programa
					if(f != null){
						
					//************* EXIBE PROGRESS BAR ******************
					#targetengine "session"
					var numeroDePaginas = capturaIntervalo(intervaloPDF);
					//Numero do intervalo de páginas vezes o número de processos pendentes (carimbo)
					var tamanhoDoProcesso = (numeroDePaginas.length)*1;
					myProgressPanel.pnl.myProgressBar.maxvalue = tamanhoDoProcesso;
					myProgressPanel.show();
					var contador = 1;
					//************* FIM EXIBE PROGRESS BAR ******************
					
					criaCarimbo(carimbo,app.activeDocument,intervaloPDF);
					
					

					//*************  ATUALIZA PROGRESS BAR ******************
					myProgressPanel.pnl.text = "EXPORTANDO PDF";
					myProgressPanel.pnl.myProgressBarLabel.text = "Fechando PDF, aguarde...";
					myProgressPanel.pnl.myProgressBar.value = tamanhoDoProcesso;
					//*************  FIM ATUALIZA PROGRESS BAR ******************
					
					//Funcao para exportar PDF
					exportaPDF(carimbo,f,app.activeDocument,intervaloPDF,false);
				
					//Remove carimbo anterior, se houver
					removeCarimbo();
					
					//*************  FECHA PROGRESS BAR ******************
					
					myProgressPanel.close();
				}
				
				}
				//Se a opção escolhida for a Configurações do documento atual, exporta o PDF
				else if(win.grupoPredefinicao.whichInfo.selection.text == "Humanas"){
					
					//************* EXIBE PROGRESS BAR ******************
					#targetengine "session"
					var numeroDePaginas = capturaIntervalo(intervaloPDF);
					//Numero do intervalo de páginas vezes o número de processos pendentes (carimbo)
					var tamanhoDoProcesso = (numeroDePaginas.length)*1;
					myProgressPanel.pnl.myProgressBar.maxvalue = tamanhoDoProcesso;
					myProgressPanel.show();
					var contador = 1;
					//************* FIM EXIBE PROGRESS BAR ******************
					
					//Cria carimbo
					criaCarimbo(carimbo,app.activeDocument,intervaloPDF);
					
					//*************  ATUALIZA PROGRESS BAR ******************
					myProgressPanel.pnl.text = "EXPORTANDO PDF";
					myProgressPanel.pnl.myProgressBarLabel.text = "Fechando PDF, aguarde...";
					myProgressPanel.pnl.myProgressBar.value = tamanhoDoProcesso;
					//*************  FIM ATUALIZA PROGRESS BAR ******************

					//Funcao para exportar PDF
					printPresets(carimbo,app.activeDocument,intervaloPDF);
					
					//Remove carimbo anterior, se houver
					removeCarimbo();
					
					//*************  FECHA PROGRESS BAR ******************
					myProgressPanel.close();
				
				}
			else{ 
				
					//FUNCAO PARA TODOS AS OUTRAS OPÇÕES DE PREDEFINIÇÃO, EXCETO 'CONFIGURAÇÃO DO DOCUMENTO' E 'HUMANAS'
					
					//Selecione o lugar para salvar o arquivo final
					f = File.saveDialog("Salvar PDF ", "*.pdf");
					f = verificaPDF(f);
					//alert(f);
					
					//Se o arquivo selecionado for válido, roda o programa
					if(f != null){
						
					//************* EXIBE PROGRESS BAR ******************
					#targetengine "session"
					var numeroDePaginas = capturaIntervalo(intervaloPDF);
					//alert(numeroDePaginas); 
					//Numero do intervalo de páginas vezes o número de processos pendentes (carimbo)
					var tamanhoDoProcesso = (numeroDePaginas.length)*2;
					myProgressPanel.pnl.myProgressBar.maxvalue = tamanhoDoProcesso;
					myProgressPanel.show();
					var contador = 1;
					//************* FIM EXIBE PROGRESS BAR ******************
					
					//*************  ATUALIZA PROGRESS BAR ******************
					myProgressPanel.pnl.text = "CONVERTENDO ARQUIVO PARA PDF";
					myProgressPanel.pnl.myProgressBarLabel.text = "Convertendo arquivo para PDF, aguarde...";
					//myProgressPanel.pnl.myProgressBar.value = tamanhoDoProcesso;
					//*************  FIM ATUALIZA PROGRESS BAR ******************
					

					//Exporta o arquivo atual como pdf x1a temporário
					var f2 = ($.getenv('TEMP'))+"/ScriptTemp.pdf";
					//exportaPDF("X1ATemp",f2);
					exportaPDF("X1ATemp",f2,app.activeDocument,intervaloPDF,false);
					
					//Cria arquivo Indesign temporário
					var myDocument = app.documents.add(true);
					novoDocumentoCriado = true;
										
					//To show the window:
					//var myWindow = myDocument.windows.add();
					
					//Adiciona as configurações da janela ao arquivo
					addConfigJanela (myDocument);
					
					//Importa o arquivo PDF temporário para o Indesign
					pdfPlacer(originalDocument,myDocument,f2,intervaloPDF);
					
					bordasExatas(myDocument,sangriaInfSup,sangriaDirEsq,distorcaoHorizontal,distorcaoVertical,distorcerDeAcordoComMargem);

					//Adiciona o carimbo
					criaCarimbo(carimbo,myDocument,intervaloPDF);
					
					//*************  ATUALIZA PROGRESS BAR ******************
					myProgressPanel.pnl.text = "EXPORTANDO PDF";
					myProgressPanel.pnl.myProgressBarLabel.text = "Fechando PDF, aguarde...";
					myProgressPanel.pnl.myProgressBar.value = tamanhoDoProcesso;
					//*************  FIM ATUALIZA PROGRESS BAR ******************
					
					//Exporta o Indesign temporário
					exportaPDF(carimbo,f,app.activeDocument,intervaloPDF,false);
					
					//Apaga o Indesign Temporário
					myDocument.close(SaveOptions.no);
					
					//Apaga o PDF Temporário
					//= ($.getenv('TEMP'))+"/ScriptTemp.pdf";
					
					//Remove carimbo anterior, se houver
					removeCarimbo();
					
					//*************  FECHA PROGRESS BAR ******************
					myProgressPanel.close();
					}
					
				}
				if(f != null){
					removerPresets();
					alert("Arquivo exportado com sucesso","Fechar PDF - Lucas ®");
				}
				}
			
			catch(e){					
					//Apaga o documento temporário se for criado
					try{
						if(novoDocumentoCriado == true){
							//Apaga o Indesign Temporário
							myDocument.close(SaveOptions.no);
							}
						}
					catch(e){
						
						}
					
					//Remove carimbo anterior, se houver
					removeCarimbo();
					removerPresets();
					
					//Fecha o progress bar se estiver aberto
					try{
						myProgressPanel.close();
						}
					catch(e){
						}
					
					alert("Não foi possível concluir a operação","Fechar PDF - Lucas ®");
				}
		}

}
else{
	alert("Nenhum arquivo aberto","Lucas ®",true);
}