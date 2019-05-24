
var template = "/I/Objetos/Scripts/InDesign/CriarCapa/Template/CapaTemplate.indt";
var arquivoCapa;
var rodaPrograma = false;
var capaLargura;
var capaAltura;
var capaLombada;
var sangriaDirEsq;
var sangriaInfSup;
var arquivoCapa;
	
	// Define components
	var res =
           "dialog { \
		          grupoPredefinicao: Panel { text: 'Predefinições ', orientation:'column', preferredSize: [320, 20],\
				  	whichInfo: DropDownList { preferredSize: [100, 20],  alignment:'left' }, \
                           info2: Group { orientation: 'column', alignment:'left' , \
							buttons: Group { orientation: 'row', \
								salvarComoBtn: Button { text:'Salvar Como', properties:{name:'salvarcomo'},} \
								salvarBtn: Button { text:'Salvar alterações', properties:{name:'salvar'} }, \
                   } \
                           }, \
                   }, \
                   grupoTamanhoCapa: Panel { text: 'Tamanho da capa (em milímetros)', orientation:'column',  preferredSize: [320, 20],\
                           info: Group { orientation: 'column', alignment:'left' ,  \
								largura: Group { orientation: 'row',  \
										labelLargura: StaticText { text:'Largura:' }, \
										inputLargura: EditText { preferredSize: [100, 20] } \
                                   } \
								altura: Group { orientation: 'row',  alignment:'left' ,\
										labelAltura: StaticText { text:'Altura:' }, \
										inputAltura: EditText { preferredSize: [100, 20] } \
                                   } \
								lombada: Group { orientation: 'row', alignment:'left' , \
										labelLombada: StaticText { text:'Lombada:' }, \
										inputLombada: EditText { preferredSize: [100, 20] } \
                                   } \
                           }, \
                   }, \
                   grupoSangria: Panel { text: 'Sangria do documento (em milímetros)', orientation:'column',  preferredSize: [320, 20],\
                           info: Group { orientation: 'column', alignment:'left' , \
								DirEsq: Group { orientation: 'row', \
										labelDirEsq: StaticText { text:'Direita/Esquerda:' }, \
										inputDirEsq: EditText { preferredSize: [100, 20] } \
                                   } \
								InfSup: Group { orientation: 'row',  alignment:'left' ,\
										labelInfSup: StaticText { text:'Inferior/Superior:' }, \
										inputInfSup: EditText { preferredSize: [100, 20] } \
                                   } \
                           }, \
				}, \
                   grupoArquivo: Panel { text: 'Arquivo da capa (JPG, TIF, PSD, etc)', orientation:'column', preferredSize: [320, 20],\
                           info: Group { orientation: 'column',  alignment:'left' , \
								arquivo: Group { orientation: 'column', \
										labelCaminho: StaticText { text:'Caminho para o arquivo:' }, \
										inputCaminho: EditText { preferredSize: [300, 20] }, \
										loadBtn: Button {text: 'Carregar arquivo', preferredSize: [108, 22]}, \
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
		   var win = new Window (res,"Criar capas - Lucas ®",); 
		   var win2 = new Window (res2,"Executando - Lucas ®",); 
		   
		   
//********************FUNCOES DA JANELA****************************

//******************** FUNCAO SALVAR ARRAY ********************

function salvaArray(arrayTXT){
		
	//alert("salvando");
	//Gera variavel o txt com split
	var contador = 0;
	var arquivoTXT = "";
	//var contador = arrayTXT.length;
	
	for(i=0;i<arrayTXT.length-1;i = i+5){
		
			arquivoTXT = arquivoTXT + "'";
			arquivoTXT = arquivoTXT+ arrayTXT[i] + "|";
			arquivoTXT = arquivoTXT+ arrayTXT[i+1] + "|";
			arquivoTXT = arquivoTXT+ arrayTXT[i+2] + "|";
			arquivoTXT = arquivoTXT+ arrayTXT[i+3] + "|";
			arquivoTXT = arquivoTXT+ arrayTXT[i+4] + "|'";
			
			// O arquivo TXT não pode acabar com sinal de +
			if ( i+6 < arrayTXT.length){ 
					arquivoTXT = arquivoTXT+  "+\n";
				}
			
			//alert(arquivoTXT);
	 }
	
	var xmlFile = new File("/I/Objetos/Scripts/InDesign/CriarCapa/Predefinicoes.xml"); 
	xmlFile.open( "w" ); 
	xmlFile.write(arquivoTXT); 
	xmlFile.close(); 

	alert("Predefinição salva","XML - Lucas ®")

	};	
	
//******************** FIM FUNCAO SALVAR ARRAY ********************	

///******************* COMECO MENU PREDEFINICOES ***********************

//Ajusta o tamanho do menu drop down
win.grupoPredefinicao.whichInfo.preferredSize = [290, 15];


// Leitura do arquivo XML (TXT com split "|")
var listaTXT = 
#includepath "/I/Objetos/Scripts/InDesign/CriarCapa/"
#include "Predefinicoes.xml" 

// Cria Array
var arrayTXT = listaTXT.split("|");

//alert(arrayTXT.length);

for(i=0;arrayTXT[i] != "";i = i+5){
	
	win.grupoPredefinicao.whichInfo.add ('item', arrayTXT[i]);
	//alert(arrayTXT[i]);
	
	}

//Preenche campos da janela
win.grupoPredefinicao.whichInfo.onChange = function () 
{
	var i = win.grupoPredefinicao.whichInfo.selection;
					
	win.grupoTamanhoCapa.info.largura.inputLargura.text = arrayTXT[(i*5)+1];
	win.grupoTamanhoCapa.info.altura.inputAltura.text = arrayTXT[(i*5)+2];
	win.grupoTamanhoCapa.info.lombada.inputLombada.text = "";
	win.grupoSangria.info.DirEsq.inputDirEsq.text = arrayTXT[(i*5)+3];
	win.grupoSangria.info.InfSup.inputInfSup.text = arrayTXT[(i*5)+4];

}


//Salvar predefinicoes
win.grupoPredefinicao.info2.buttons.salvarBtn.onClick = function () 
{
	var i = win.grupoPredefinicao.whichInfo.selection;
	//alert(win.grupoPredefinicao.whichInfo.selection);
	if(i ==null){	
		alert("Nenhuma predefinição foi selecionada");
	}
	else{
		//alert(i+0);
		arrayTXT[(i*5)+1] = win.grupoTamanhoCapa.info.largura.inputLargura.text ;
		arrayTXT[(i*5)+2] = win.grupoTamanhoCapa.info.altura.inputAltura.text;
		arrayTXT[(i*5)+3] = win.grupoSangria.info.DirEsq.inputDirEsq.text ;
		arrayTXT[(i*5)+4] = win.grupoSangria.info.InfSup.inputInfSup.text ;
		/*
		alert(arrayTXT[(i*5)+4]);
		alert(arrayTXT[(i*5)+5]);
		alert(arrayTXT[(i*5)+6]);
		*/
		salvaArray(arrayTXT);
		
		}
	}

//"Salvar como" predefinicoes 
win.grupoPredefinicao.info2.buttons.salvarComoBtn.onClick = function () 
{
	//Cria janela para salvar	
	var res3 =
           "dialog { \
		          grupoPredefinicao: Panel { text: 'Predefinições ', orientation:'column', preferredSize: [320, 20],\
                           info2: Group { orientation: 'column', alignment:'left' , \
								nome: Group { orientation: 'row',  \
										labelNome: StaticText { text:'Nome da nova predefinição:' }, \
										inputNome: EditText { preferredSize: [140, 20] } \
                                   } \
                           }, \
                   }, \
                   grupoTamanhoCapa: Panel { text: 'Tamanho da capa (em milímetros)', orientation:'column',  preferredSize: [320, 20],\
                           info: Group { orientation: 'column', alignment:'left' ,  \
								largura: Group { orientation: 'row',  \
										labelLargura: StaticText { text:'Largura:' }, \
										inputLargura: EditText { preferredSize: [100, 20] } \
                                   } \
								altura: Group { orientation: 'row',  alignment:'left' ,\
										labelAltura: StaticText { text:'Altura:' }, \
										inputAltura: EditText { preferredSize: [100, 20] } \
                                   } \
                           }, \
                   }, \
                   grupoSangria: Panel { text: 'Sangria do documento (em milímetros)', orientation:'column',  preferredSize: [320, 20],\
                           info: Group { orientation: 'column', alignment:'left' , \
								DirEsq: Group { orientation: 'row', \
										labelDirEsq: StaticText { text:'Direita/Esquerda:' }, \
										inputDirEsq: EditText { preferredSize: [100, 20] } \
                                   } \
								InfSup: Group { orientation: 'row',  alignment:'left' ,\
										labelInfSup: StaticText { text:'Inferior/Superior:' }, \
										inputInfSup: EditText { preferredSize: [100, 20] } \
                                   } \
                           }, \
				}, \
                   buttons: Group { orientation: 'row', alignment: 'right', \
						cnlBtn: Button { text:'Cancelar', properties:{name:'cancelar'} } \
                           salvarBtn: Button { text:'Salvar', properties:{name:'salvar'} } \
                   } \
           }";
		   
		//Cria janela
		var win3 = new Window (res3,"Salvar predefinição - Lucas ®",); 
		
		win3.grupoPredefinicao.info2.nome.inputNome.text = win.grupoPredefinicao.whichInfo.selection;
		win3.grupoTamanhoCapa.info.largura.inputLargura.text = win.grupoTamanhoCapa.info.largura.inputLargura.text;
		win3.grupoTamanhoCapa.info.altura.inputAltura.text = win.grupoTamanhoCapa.info.altura.inputAltura.text ;
		win3.grupoSangria.info.DirEsq.inputDirEsq.text = win.grupoSangria.info.DirEsq.inputDirEsq.text;
		win3.grupoSangria.info.InfSup.inputInfSup.text = win.grupoSangria.info.InfSup.inputInfSup.text;
		
		
		//Botão Salvar
		win3.buttons.salvarBtn.onClick = function () 
		{
			var naoExiste = true;
			
			//Verifica se o nome já existe
			for(i=0;i<arrayTXT.length;i = i+5){
					if(win3.grupoPredefinicao.info2.nome.inputNome.text != arrayTXT[i]){
						//naoExiste = true;
						}
					else{
						alert("Esse nome já existe, digite outro nome");
						naoExiste = false;						
						}
				}
			
			if(naoExiste == true){				
					//Adiciona novos valores ao array
					arrayTXT[arrayTXT.length-1] = win3.grupoPredefinicao.info2.nome.inputNome.text;					
					arrayTXT[arrayTXT.length] = win3.grupoTamanhoCapa.info.largura.inputLargura.text;
					arrayTXT[arrayTXT.length] = win3.grupoTamanhoCapa.info.altura.inputAltura.text;
					arrayTXT[arrayTXT.length] = win3.grupoSangria.info.DirEsq.inputDirEsq.text ;
					arrayTXT[arrayTXT.length] = win3.grupoSangria.info.InfSup.inputInfSup.text ;
					
					salvaArray(arrayTXT);
					
					win.grupoPredefinicao.whichInfo.add ('item', win3.grupoPredefinicao.info2.nome.inputNome.text);
					
					win3.close();
				}		
			}

		//Botão Cancelar
		win3.buttons.cnlBtn.onClick = function () 
		{
			win3.close();			
			}
		
		win3.show();
		
	};

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
	win.grupoArquivo.info.arquivo.inputCaminho.enabled = false;
	/*
	win.grupoTamanhoCapa.info.largura.inputLargura.text = 210;
	win.grupoTamanhoCapa.info.altura.inputAltura.text = 280;
	win.grupoTamanhoCapa.info.lombada.inputLombada.text = 19;
	win.grupoSangria.info.DirEsq.inputDirEsq.text = 10;
	win.grupoSangria.info.InfSup.inputInfSup.text = 5;
	*/

	// Carregar arquivo da capa
	win.grupoArquivo.info.arquivo.loadBtn.onClick = function()
	{	
			//var f = File.openDialog("Carregar capa", "*.jpg , *.tif ,*.tiff, *.psd, *.pdf");
			var f = File.openDialog("Carregar capa");

			if(f != null)
			{
				//alert(f.path + "/" + f.name);
				//win.grupoArquivo.info.arquivo.inputCaminho.text = f.path + "/" + f.name;
				win.grupoArquivo.info.arquivo.inputCaminho.text = f.name;
				arquivoCapa = f.path + "/" + f.name;
				
			}
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
		if(win.grupoTamanhoCapa.info.largura.inputLargura.text == ""){
			alert("Digite um valor para a largura");
			}
		else if(win.grupoTamanhoCapa.info.altura.inputAltura.text == ""){
			alert("Digite um valor para a altura");
			}
		else if(win.grupoTamanhoCapa.info.lombada.inputLombada.text == ""){
			alert("Digite um valor para a lombada");
			}		
		else if(win.grupoSangria.info.DirEsq.inputDirEsq.text == ""){
			alert("Digite um valor para a sangria Direita/Esquerda");
			}	
		else if(win.grupoSangria.info.InfSup.inputInfSup.text == ""){
			alert("Digite um valor para a sangria Inferior/Superior");
			}		
		else if(win.grupoArquivo.info.arquivo.inputCaminho.text == ""){
			alert("Carregue o arquivo da capa");
			}
		else{
			rodaPrograma = true;
			win.close();
			
			capaLargura = parseInt(win.grupoTamanhoCapa.info.largura.inputLargura.text);
			capaAltura = parseInt(win.grupoTamanhoCapa.info.altura.inputAltura.text);
			capaLombada = parseInt(win.grupoTamanhoCapa.info.lombada.inputLombada.text);
			sangriaDirEsq = parseInt(win.grupoSangria.info.DirEsq.inputDirEsq.text);
			sangriaInfSup = parseInt(win.grupoSangria.info.InfSup.inputInfSup.text);
			
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
				alert("Capa criada com sucesso","Criar capas - Lucas ®");
				}
			
			catch(e){
				
				//myDocument.close();
				myDocument.close(SaveOptions.no);
				//app.activeDocument.close(SaveOptions.yes);
				alert("Não foi possível criar a capa","Criar capas - Lucas ®");
				}
				
		}