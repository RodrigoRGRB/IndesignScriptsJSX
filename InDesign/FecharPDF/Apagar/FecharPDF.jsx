
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
	
	// Define components
	var res =
           "dialog { \
		          grupoProva: Panel { text: 'Adicionar Prova', orientation:'column', preferredSize: [350, 20],\
				  	whichInfo: DropDownList { preferredSize: [315, 20],  alignment:'left' }, \
                           info2: Group { orientation: 'column', alignment:'left' , \
						labelPDF: StaticText { text:'PDF x1a' }, \
                           }, \
                   }, \
		          grupoPredefinicao: Panel { text: 'Predefinições ', orientation:'column', preferredSize: [350, 20],\
				  	whichInfo: DropDownList { preferredSize: [315, 20],  alignment:'left' }, \
                           info2: Group { orientation: 'column', alignment:'left' , \
                           }, \
                   }, \
                   grupoTamanhoPagina: Panel { text: 'Tamanho da página (em milímetros)', orientation:'column',  preferredSize: [350, 20],\
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
				grupoPorcentagem: Panel { text: 'Porcentagem da página', orientation:'column',  preferredSize: [350, 20],\
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
		          grupoPDFPresets: Panel { text: 'Configuração PDF (Adobe PDF Presets)', orientation:'column', preferredSize: [350, 20],\
				  	whichInfo: DropDownList { preferredSize: [315, 20],  alignment:'left' }, \
                   }, \
		          grupoPaginas: Panel { text: 'Páginas a serem Impressas', orientation:'column', preferredSize: [350, 20],\
							todas: Group { orientation: 'row',  alignment:'left' ,\
							   } \
							paginas: Group { orientation: 'row',  alignment:'left' ,\
							   } \
                   }, \
                   grupoErratasPDF: Panel { text: 'Erratas do PDF', orientation:'column', preferredSize: [350, 20],\
                           info: Group { orientation: 'column',  alignment:'left' , \
								arquivo: Group { orientation: 'column', \
										labelCaminho: StaticText { text:'Se houver páginas a substiuir, indique o arquivo PDF Original:' }, \
										inputCaminho: EditText { preferredSize: [315, 20] }, \
										loadBtn: Button {text: 'Carregar arquivo', preferredSize: [108, 22]}, \
										labelObservacao1: StaticText { text:'OBS: As páginas do arquivo original serão substituídas ' }, \
										labelObservacao2: StaticText { text:'pelas páginas indicadas no campo páginas' }, \
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

//******************** FUNCAO SALVAR ARRAY ********************

function salvaArray(arrayTXT){
		
	//alert("salvando");
	//Gera variavel o txt com split
	var contador = 0;
	var arquivoTXT = "";
	//var contador = arrayTXT.length;
	
	for(i=0;i<arrayTXT.length-1;i = i+6){
		
			arquivoTXT = arquivoTXT + "'";
			arquivoTXT = arquivoTXT+ arrayTXT[i] + "|";
			arquivoTXT = arquivoTXT+ arrayTXT[i+1] + "|";
			arquivoTXT = arquivoTXT+ arrayTXT[i+2] + "|";
			arquivoTXT = arquivoTXT+ arrayTXT[i+3] + "|";
			arquivoTXT = arquivoTXT+ arrayTXT[i+4] + "|";
			arquivoTXT = arquivoTXT+ arrayTXT[i+5] + "|";
			arquivoTXT = arquivoTXT+ arrayTXT[i+6] + "|'";
			
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
for(i=0;arrayTXT[i] != "";i = i+6){
	
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

	}


//Cria a janela Adicionar Páginas

// Add checkboxes

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
	

//Preenche o campo PDF Presets
	//Adiciona o primeiro preset manualmente
	win.grupoPDFPresets.whichInfo.add ('item', app.pdfExportPresets.firstItem().name);
	var presetAtual = app.pdfExportPresets.firstItem();

	//Adiciona os outros Presets automaticamente
	for(i=1; i < app.pdfExportPresets.length;i++){
		
		presetAtual = app.pdfExportPresets.nextItem(presetAtual);
		var presetAtualNome = presetAtual.name;
		
		//alert(presetAtualNome);	
		win.grupoPDFPresets.whichInfo.add ('item', presetAtualNome);
		}

//Preenche campos da janela ao se mudar as predefinições
win.grupoPredefinicao.whichInfo.onChange = function () 
	{
		
		var i = win.grupoPredefinicao.whichInfo.selection;

		win.grupoTamanhoPagina.info.largura.inputLargura.text = arrayTXT[(i*6)+1];
		win.grupoTamanhoPagina.info.altura.inputAltura.text = arrayTXT[(i*6)+2];
		win.grupoPorcentagem.info.porcentagemH.inputH.text = arrayTXT[(i*6)+3];
		win.grupoPorcentagem.info.porcentagemV.inputV.text = arrayTXT[(i*6)+4];
		//win.grupoPDFPresets.whichInfo.selection = arrayTXT[(i*6)+5];
		//alert(arrayTXT[(i*6)+5]);
		//alert(app.pdfExportPresets.itemByName(arrayTXT[(i*6)+5]));
		
		var nomeSelecionado = arrayTXT[(i*6)+5];
		
		for(i=0; i<win.grupoPDFPresets.whichInfo.items.length; i++){
			if(win.grupoPDFPresets.whichInfo.items[i].toString() == nomeSelecionado){
				win.grupoPDFPresets.whichInfo.selection = win.grupoPDFPresets.whichInfo.items[i];
				}
			
			else{
				win.grupoPDFPresets.whichInfo.selection = null;
				}
			}
		
		//win.grupoProva.whichInfo.items[0];
		//alert(win.grupoPDFPresets.whichInfo.itemByName("Prol"));
		//win.grupoPDFPresets.whichInfo.selection = app.pdfExportPresets.itemByName(arrayTXT[(i*6)+5]);

	}

///******************* FIM MENU PREDEFINICOES ***********************

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
		//precisa?
		
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

	//Valores default para os campos
	win.grupoErratasPDF.info.arquivo.inputCaminho.enabled = true;
	
	//Adicionar paginas
	win.grupoPaginas.todas.radTodas.value = true;
	win.grupoPaginas.paginas.intervalo.enabled = false;
	
	//Seleciona primeiro item da prova
	win.grupoProva.whichInfo.selection = win.grupoProva.whichInfo.items[0];
	
	//win.grupoErratasPDF.info.arquivo.inputCaminho.multiline = true;
	/*
	win.grupoTamanhoPagina.info.largura.inputLargura.text = 210;
	win.grupoTamanhoPagina.info.altura.inputAltura.text = 280;
	win.grupoTamanhoPagina.info.lombada.inputLombada.text = 19;
	win.grupoSangria.info.DirEsq.inputDirEsq.text = 10;
	win.grupoSangria.info.InfSup.inputInfSup.text = 5;
	*/

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


	//Verifica campos em branco
	win.buttons.okBtn.onClick = function()
	{
		var todosOsCampos = ""+win.grupoTamanhoPagina.info.largura.inputLargura.text + win.grupoTamanhoPagina.info.altura.inputAltura.text + win.grupoTamanhoPagina.info.lombada.inputLombada.text + win.grupoSangria.info.DirEsq.inputDirEsq.text + win.grupoSangria.info.InfSup.inputInfSup.text;
		var todosOsCampos = todosOsCampos.split(",");
		//alert(todosOsCampos.length);
			
		if(win.grupoTamanhoPagina.info.largura.inputLargura.text == ""){
			alert("Digite um valor para a largura");
			}
		else if(win.grupoTamanhoPagina.info.altura.inputAltura.text == ""){
			alert("Digite um valor para a altura");
			}
		else if(win.grupoTamanhoPagina.info.lombada.inputLombada.text == ""){
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
			
			capaLargura = 1*win.grupoTamanhoPagina.info.largura.inputLargura.text;
			capaAltura = 1*win.grupoTamanhoPagina.info.altura.inputAltura.text;
			capaLombada = 1*win.grupoTamanhoPagina.info.lombada.inputLombada.text;
			sangriaDirEsq = 1*win.grupoSangria.info.DirEsq.inputDirEsq.text;
			sangriaInfSup = 1*win.grupoSangria.info.InfSup.inputInfSup.text;
			
			if(capaLombada  == 0){
				//alert("é zero");
				capaLombada = capaLombada+0.01;
			}
		
		}
	}

//*************FIM FUNCOES DA JANELA *****************

this.windowRef = win;
win.show();

if(rodaPrograma){
	
	try{
				//win2.show();
				myDocument = app.open(File(template));

				//Importar arquivo
				myRectangle = myDocument.pages[0].rectangles;
				
				//alert(arquivoCapa);
				arquivoCapa = win.grupoErratasPDF.info.arquivo.inputCaminho.text;

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

				//Alinhar marca de corte
				alinharMarcasDeCorte();
				
				//win2.close();
				alert("Arquivo exportado com sucesso","Fechar PDF - Lucas ®");
				}
			
			catch(e){
				
				//myDocument.close();
				myDocument.close(SaveOptions.no);
				//app.activeDocument.close(SaveOptions.yes);
				alert("Não foi possível concluir a operação","Fechar PDF - Lucas ®");
				}
				
		}