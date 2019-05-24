////************************* INCLUIR FUNÇÕES ************************* 

//#includepath "/I/Objetos/Scripts/InDesign/ImportarPDF"
//#includepath "/D/Lucas/Temp/Script Indesign/"
#include "FuncaoCriaCarimbo.jsx"
#include "FuncaoExportarPDF.jsx"
#include "FuncaoPDFPlacer.jsx"
//#include "PDFBordas.jsx"
#include "funcaoBordasExatas.jsx"
#include "funcaoAlinhamento.jsx"

////************************* FIM DA INCLUSÃO DE FUNÇÕES ************************* 


var template = "/I/Objetos/Scripts/InDesign/CriarCapa/Template/CapaTemplate.indt";
var arquivoCapa;
var rodaPrograma = false;
var capaLargura;
var capaAltura;
var capaLombada;
var sangriaDirEsq;
var sangriaInfSup;
var arquivoCapa;
var f; //funcao carregar arquivo
var erroArquivoPDF = false;
var intervaloPDF = null;
	
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
                   grupoErratasPDF: Panel { text: 'Indique o arquivo PDF Original:', orientation:'column', preferredSize: [350, 20],\
                           info: Group { orientation: 'column',  alignment:'left' , \
								arquivo: Group { orientation: 'column', \
										inputCaminho: EditText { preferredSize: [315, 20] }, \
										loadBtn: Button {text: 'Carregar arquivo', preferredSize: [108, 22]}, \
										labelObservacao1: StaticText { text:'OBS: As páginas do arquivo original serão substituídas ' }, \
										labelObservacao2: StaticText { text:'pelas páginas indicadas no campo INTERVALO' }, \
                                   } \
                           }, \
				}, \
                   buttons: Group { orientation: 'row', alignment: 'right', \
						cnlBtn: Button { text:'Cancelar', properties:{name:'cancelar'} } \
                           okBtn: Button { text:'OK', properties:{name:'ok'} } \
                   } \
           }";

	// Define components
	var res2 =
           "dialog { \
					labelLargura: StaticText { text:'Executando... aguarda' }, \
           }";
		   
		   //Cria janela
		   var win = new Window (res,"Fechar PDF - Lucas ®",);  
		   var win2 = new Window (res2,"Executando - Lucas ®",); 
		   
//Adiciona campo para o Caminho
//win.grupoErratasPDF.info.arquivo.add('edittext', [0,0,300,50],"", {multiline:true});
//alert(win.grupoPredefinicao.whichInfo.preferredSize);
//alert(win.grupoErratasPDF.info.arquivo.inputCaminho.properties)
		   
		   
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

//************ FUNCAO CARREGAR ARQUIVO

function funcaoCarregarArquivo(){
				//var f = File.openDialog("Carregar capa", "*.jpg , *.tif ,*.tiff, *.psd, *.pdf");
				f = File.openDialog("Carregar capa", "*.pdf");
				//f = File.openDialog("Carregar capa");

				if(f != null)
				{
					//alert(f.path + "/" + f.name);
					//win.grupoErratasPDF.info.arquivo.inputCaminho.text = f.path + "/" + f.name;
					//win.grupoErratasPDF.info.arquivo.inputCaminho.text = f.name;
					arquivoCapa = f.path + "/" + f.name;
					arquivoCapa = corrigeNomeArquivo(arquivoCapa);
					win.grupoErratasPDF.info.arquivo.inputCaminho.text = arquivoCapa;
					
				}
		};
			
//************* FIM FUNCAO CARREGAR ARQUIVO****************

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


//******************** FUNCAO SALVAR ARRAY ********************

function salvaArray(arrayTXT){
		
	//alert("salvando");
	//Gera variavel o txt com split
	var contador = 0;
	var arquivoTXT = "";
	//var contador = arrayTXT.length;
	
	for(i=0;i<arrayTXT.length-1;i = i+8){
		
			arquivoTXT = arquivoTXT + "'";
			arquivoTXT = arquivoTXT+ arrayTXT[i] + "|";
			arquivoTXT = arquivoTXT+ arrayTXT[i+1] + "|";
			arquivoTXT = arquivoTXT+ arrayTXT[i+2] + "|";
			arquivoTXT = arquivoTXT+ arrayTXT[i+3] + "|";
			arquivoTXT = arquivoTXT+ arrayTXT[i+4] + "|";
			arquivoTXT = arquivoTXT+ arrayTXT[i+5] + "|";
			arquivoTXT = arquivoTXT+ arrayTXT[i+6] + "|'";
			arquivoTXT = arquivoTXT+ arrayTXT[i+7] + "|'";
			
			// O arquivo TXT não pode acabar com sinal de +
			if ( i+8 < arrayTXT.length){ 
					arquivoTXT = arquivoTXT+  "+\n";
				}
			
			//alert(arquivoTXT);
	 }
	
	//var xmlFile = new File("/I/Objetos/Scripts/InDesign/FecharPDF/PredefinicoesFecharPDF.xml");
	var xmlFile = new File("D/Lucas/Temp/Script Indesign/PredefinicoesFecharPDF.xml");
	xmlFile.open( "w" ); 
	xmlFile.write(arquivoTXT); 
	xmlFile.close(); 

	alert("Predefinição salva","XML - Lucas ®")

	};	
	
//******************** FIM FUNCAO SALVAR ARRAY ********************	

///******************* COMECO MENU PREDEFINICOES ***********************

//Ajusta o tamanho do menu drop down
//win.grupoPredefinicao.whichInfo.preferredSize = [290, 15];


// Leitura do arquivo XML (TXT com split "|")
var listaTXT = 
//#includepath "/I/Objetos/Scripts/InDesign/CriarCapa/"
#includepath "D/Lucas/Temp/Script Indesign/"
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
win.grupoErratasPDF.visible = false;

//Habilita a janela PDF Final se a opção do campo Adicionar Prova for PDF Final
win.grupoProva.whichInfo.onChange = function () 
	{
	
		if(win.grupoProva.whichInfo.selection.text != "PDF Final - Erratas"){
			//alert("PDF Final");
			win.grupoErratasPDF.visible = false;
		}
		else{
			win.grupoErratasPDF.visible = true;
			}
	
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
	win.grupoErratasPDF.info.arquivo.inputCaminho.enabled = true;
	
	//Adicionar paginas
	win.grupoPaginas.todas.radTodas.value = true;
	win.grupoPaginas.paginas.intervalo.enabled = false;
	
	//Seleciona primeiro item da prova
	win.grupoProva.whichInfo.selection = win.grupoProva.whichInfo.items[0];
	
	//Seleciona primeiro item das predefinições
	win.grupoPredefinicao.whichInfo.selection = win.grupoPredefinicao.whichInfo.items[0];
	
	
	// Carregar arquivo da capa
	win.grupoErratasPDF.info.arquivo.loadBtn.onClick = function()
	{	
		funcaoCarregarArquivo();
	}

	//Ação do botao cancelar
	win.buttons.cnlBtn.onClick = function()
	{
			rodaPrograma = false;
			win.close();
	}


//********************* VERIFICA CAMPOS EM BRANCO ***********************
/*
	win.buttons.okBtn.onClick = function()
	{
		var todosOsCampos = ""+win.grupoPredefinicao.grupoTamanhoPagina.info.largura.inputLargura.text + win.grupoPredefinicao.grupoTamanhoPagina.info.altura.inputAltura.text + win.grupoPredefinicao.grupoTamanhoPagina.info.lombada.inputLombada.text + win.grupoSangria.info.DirEsq.inputDirEsq.text + win.grupoSangria.info.InfSup.inputInfSup.text;
		var todosOsCampos = todosOsCampos.split(",");
		//alert(todosOsCampos.length);
			
		if(win.grupoPredefinicao.grupoTamanhoPagina.info.largura.inputLargura.text == ""){
			alert("Digite um valor para a largura");
			}
		else if(win.grupoPredefinicao.grupoTamanhoPagina.info.altura.inputAltura.text == ""){
			alert("Digite um valor para a altura");
			}
		else if(win.grupoPredefinicao.grupoTamanhoPagina.info.lombada.inputLombada.text == ""){
			alert("Digite um valor para a lombada");
			}		
		else if(win.grupoSangria.info.DirEsq.inputDirEsq.text == ""){
			alert("Digite um valor para a sangria Direita/Esquerda");
			}	
		else if(win.grupoSangria.info.InfSup.inputInfSup.text == ""){
			alert("Digite um valor para a sangria Inferior/Superior");
			}		
		else if(win.grupoErratasPDF.info.arquivo.inputCaminho.text == ""){
			alert("Carregue o arquivo da capa");
			}
		else if(todosOsCampos.length>1){
			alert("Utilize ponto (.) ao invés de vírgula (,)");
			}
	
		else{
			rodaPrograma = true;
			win.close();
			
			capaLargura = 1*win.grupoPredefinicao.grupoTamanhoPagina.info.largura.inputLargura.text;
			capaAltura = 1*win.grupoPredefinicao.grupoTamanhoPagina.info.altura.inputAltura.text;
			capaLombada = 1*win.grupoPredefinicao.grupoTamanhoPagina.info.lombada.inputLombada.text;
			sangriaDirEsq = 1*win.grupoSangria.info.DirEsq.inputDirEsq.text;
			sangriaInfSup = 1*win.grupoSangria.info.InfSup.inputInfSup.text;
			
			if(capaLombada  == 0){
				//alert("é zero");
				capaLombada = capaLombada+0.01;
			}
		
		}
	}
*/
rodaPrograma = true;
//win.close();
//********************* FIM VERIFICA CAMPOS EM BRANCO ***********************

//*************FIM FUNCOES DA JANELA *****************

this.windowRef = win;
win.show();

if(rodaPrograma){
	
//Selecione o lugar para salvar o arquivo final
f = File.saveDialog("Salvar PDF ", "*.pdf");
f = verificaPDF(f);
//alert(f);

//Se o arquivo selecionado for válido, roda o programa
if(f != null){
	
//Recebe valor dos campos
var distorcaoHorizontal = win.grupoPredefinicao.grupoPorcentagem.info.porcentagemH.inputH.text;
var distorcaoVertical = win.grupoPredefinicao.grupoPorcentagem.info.porcentagemV.inputV.text;

//Recebe o PDF Range. Se chkbox selecionado for 'intervalo', recebe o intervalo.
if(win.grupoPaginas.paginas.radIntervalo.value == true){
	intervaloPDF = win.grupoPaginas.paginas.intervalo.text;
	with(app.pdfExportPreferences){
		//pageRange = "1, 3-6, 7, 9-11, 12";
		pageRange = intervaloPDF;
	}
}


	//Tenta rodar o programa
	//try{	

				
								
				//Se a opção escolhida for a Configurações do documento atual, exporta o PDF
				if(win.grupoPredefinicao.whichInfo.selection.text == "Configurações do documento atual"){
					
					var carimbo = win.grupoProva.whichInfo.selection.text;
					criaCarimbo(carimbo,app.activeDocument);

					//Funcao para exportar PDF
					exportaPDF(carimbo,f,app.activeDocument,intervaloPDF);
					
					/*
					if( carimbo == "PDF Final" || carimbo == "PDF Final - Erratas" ){
						exportaPDF("PROL",f);
					}
				else{
						exportaPDF("X1A",f);
					}
					*/
				
				//Remove carimbo anterior, se houver
				removeCarimbo();
				
				}
			else{
				
					//FUNCAO PARA TODOS AS OUTRAS OPÇÕES DE PREDEFINIÇÃO

					//Exporta o arquivo atual como pdf x1a temporário
					var f2 = ($.getenv('TEMP'))+"/ScriptTemp.pdf";
					//exportaPDF("X1ATemp",f2);
					exportaPDF("X1ATemp",f2,app.activeDocument,intervaloPDF);
					
					//Cria arquivo Indesign temporário
					var myDocument = app.documents.add(true);
					//To show the window:
					//var myWindow = myDocument.windows.add();
					
					//Adiciona as configurações da janela ao arquivo
					addConfigJanela (myDocument);
					
					//Importa o arquivo PDF temporário para o Indesign
					pdfPlacer(myDocument,f2);
					
					//Executa o script Bordas Matemática
					var sangriaInfSup = parseInt(win.grupoPredefinicao.grupoSangria.info.InfSup.inputInfSup.text);
					var sangriaDirEsq =  parseInt(win.grupoPredefinicao.grupoSangria.info.DirEsq.inputDirEsq.text);
					var distorcerDeAcordoComMargem = win.grupoPredefinicao.grupoPorcentagem.grupoCheckBox.chkBox.value;
					
					bordasExatas(myDocument,sangriaInfSup,sangriaDirEsq,distorcaoHorizontal,distorcaoVertical,distorcerDeAcordoComMargem);
					
					//Adiciona o carimbo
					var carimbo = win.grupoProva.whichInfo.selection.text;
					criaCarimbo(carimbo,myDocument);
					
					//Exporta o Indesign temporário
					exportaPDF(carimbo,f,app.activeDocument,intervaloPDF);
					
					//Apaga o Indesign Temporário
					myDocument.close(SaveOptions.no);
					
					//Apaga o PDF Temporário
					f2.remove();
					//= ($.getenv('TEMP'))+"/ScriptTemp.pdf";
					
					//Remove carimbo anterior, se houver
					removeCarimbo();
					
				}

				alert("Arquivo exportado com sucesso","Fechar PDF - Lucas ®");
			/*	}
			
			catch(e){
				
				//myDocument.close();
				//myDocument.close(SaveOptions.no);
				//app.activeDocument.close(SaveOptions.yes);
				
				//Remove carimbo anterior, se houver
				removeCarimbo();
				alert("Não foi possível concluir a operação","Fechar PDF - Lucas ®");
				}
				*/
				
		}
	}