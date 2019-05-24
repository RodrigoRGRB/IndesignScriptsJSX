// Global script setting
var placement9pointAlignment = "mm";
var geraRelatorio = "";
var arquivosConvertidos = 0;
var arquivosNaoConvertidos = "";
var arquivosNaoConvertidosContador = 0;
var imageList;
var rodaPrograma = false;
var converterPretoRGB = false;
var converterSpotToCMYK = false;
var adicionaOverprintPreto = false;
var adicionaOverprintProfessor = false;
var folderSelecionado = "";


//***************** CRIAÇÃO DA JANELA **************************


	// Define components
	var res =
           "dialog { \
		          grupoConversao: Panel { text: 'Converter cores', orientation:'column', preferredSize: [350, 20],\
                        converterPretoRGB: Checkbox { alignment:'left', text:'Converter preto RGB em CMYK', value:true }, \
                        converterSpotToCMYK: Checkbox { alignment:'left', text:'Converter cores SPOT para CMYK (exceto cor \"Professor\")', value:false }, \
                   }, \
		          grupoOverprint: Panel { text: 'Overprint', orientation:'column', preferredSize: [350, 20],\
                        adicionaOverprintPreto: Checkbox { alignment:'left', text:'Adiciona overprint no preto', value:true }, \
                        adicionaOverprintProfessor: Checkbox { alignment:'left', text:'Adiciona overprint na cor \"Professor\"', value:false }, \
                   }, \
                   grupoArquivo: Panel { text: 'Pasta que contém os arquivos o Illustrator ', orientation:'column', preferredSize: [320, 20],\
                           info: Group { orientation: 'column',  alignment:'left' , \
								arquivo: Group { orientation: 'column', \
										inputCaminho: EditText { preferredSize: [300, 20] }, \
										loadBtn: Button {text: 'Carregar pasta', preferredSize: [108, 22]}, \
                                   } \
                           }, \
				}, \
                   buttons: Group { orientation: 'row', alignment: 'right', \
                           okBtn: Button { text:'OK', properties:{name:'ok'} } \
						cnlBtn: Button { text:'Cancelar', properties:{name:'cancelar'} } \
                   } \
           }";
		   
//Cria janela
var win = new Window (res,"Converter cores - Lucas ®",);  
//var win2 = new Window (res2,"Executando - Lucas ®",);

//***************** FIM DA CRIAÇÃO DA JANELA **************************
	
//********************* AÇÃO DOS BOTÕES ***********************

//Botão CANCELAR
win.buttons.cnlBtn.onClick = function()
{
        rodaPrograma = false;
        win.close();
}

//Botão OK
win.buttons.okBtn.onClick = function()
	{
        
        folderSelecionado = win.grupoArquivo.info.arquivo.inputCaminho.text;
			
		if(folderSelecionado == "" ){			
			alert("Escolha a pasta que deseja converter","Lucas ®",true);
			}
		else{
			//Se todos os campos forem válidos, executa o programa
			rodaPrograma = true;
			//rodaPrograma = false;
			win.close();

			//Recebe valor dos campos
            //alert(win.grupoConversao.converterPretoRGB.value)
            converterPretoRGB = win.grupoConversao.converterPretoRGB.value;
            converterSpotToCMYK = win.grupoConversao.converterSpotToCMYK.value;
            adicionaOverprintPreto = win.grupoOverprint.adicionaOverprintPreto.value;
            adicionaOverprintProfessor = win.grupoOverprint.adicionaOverprintProfessor.value;
            folderSelecionado = win.grupoArquivo.info.arquivo.inputCaminho.text;
            
            //alert(folderSelecionado);
	
		}
	}


//Botão CARREGAR ARQUIVO
win.grupoArquivo.info.arquivo.loadBtn.onClick = function()
{	
        //f = File.openDialog("Escolher pasta");
        f = Folder.selectDialog('Escolher pasta', Folder('~'));

        if(f != null)
        {
            //arquivoCapa = f.path + "/" + f.name;
            //arquivoCapa = f.path;
            //arquivoCapa = corrigeNomeArquivo(arquivoCapa);
            win.grupoArquivo.info.arquivo.inputCaminho.text = f.fsName;
            
        }
}
    
    
//********************* FIM AÇÃO DOS BOTÕES ***********************


//********************** FUNÇÃO CORRIGE NOME ******************************************

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

//********************** FUNÇÃO CORRIGE NOME ******************************************


//************ CRIA PROGRESS BAR ****************

//#targetengine "session"
//Because these terms are defined in the "session" engine,
//they will be available to any other JavaScript running
//in that instance of the engine.
//function myCreateProgressPanel(myMaximumValue, myProgressBarWidth){

// Create a palette-type window (a modeless or floating dialog),
var myProgressPanel = new Window("palette", "Converte Cores - Lucas ®", [150, 150, 600, 270]); 
this.windowRef = myProgressPanel;

// Add a panel to contain the components
myProgressPanel.pnl = myProgressPanel.add("panel", [10, 10, 440, 100], "Iniciando script");

// Add a progress bar with a label and initial value of 0, max value of 200.
myProgressPanel.pnl.myProgressBarLabel = myProgressPanel.pnl.add("statictext", [20, 20, 320, 35], "Iniciando script");
myProgressPanel.pnl.myProgressBar = myProgressPanel.pnl.add("progressbar", [20, 35, 410, 60], 0, 200);

myProgressPanel.center();

var incrementaProcesso = 0;

//************ FIM CRIA PROGRESS BAR ****************


function getFolder() {
	return Folder.selectDialog('Please select the folder to be imported:', Folder('~'));
}

function iniciaConversao() {
    
    //alert(folderSelecionado);
    
    var selectedFolder = folderSelecionado;
	
	if (selectedFolder) {

		
		var firstImageLayer = true;
		var newLayer ;
		var thisPlacedItem;
		var abreArquivo;
					  
		// create document list from files in selected folder
		imageList = new Folder(selectedFolder).getFiles();
    
        //************* EXIBE PROGRESS BAR ******************
        //#targetengine "session"
        //Numero do intervalo de páginas vezes o número de processos pendentes (carimbo)
        var tamanhoDoProcesso = (imageList.length)*1;
        myProgressPanel.pnl.myProgressBar.maxvalue = tamanhoDoProcesso;
        myProgressPanel.pnl.myProgressBar.value = incrementaProcesso;
        myProgressPanel.show();
        var contador = 1;
        //************* FIM EXIBE PROGRESS BAR ******************

		for (var i = 0; i < imageList.length; i++) {
            
            //*************  ATUALIZA PROGRESS BAR ******************
            myProgressPanel.pnl.text = "CONVERTENDO ARQUIVOS, AGUARDE...";
            myProgressPanel.pnl.myProgressBarLabel.text = corrigeNomeArquivo(imageList[i].name);
            myProgressPanel.pnl.myProgressBar.value = incrementaProcesso++;
            //*************  FIM ATUALIZA PROGRESS BAR ******************
            
            //alert("aqui01");
            
            //alert(imageList[i].name);
            //alert(imageList[i].name.split(".").length);
			
			// VERIFICA SE O ARQUIVO É AI OU EPS PARA PODER ABRIR
            if(imageList[i].name.split(".").length > 1){
            
            
			if (imageList[i] instanceof File) {
                
                //alert("aqui02");
				
				abreArquivo = false;

				// get the file name
				//var fName = imageList[i].name.toLowerCase();
				//alert(fName.length); 
				
				var fName = imageList[i].name;
				
				var extensaoArquivo = "";
				var contadorCaracteres = fName.length;
				//alert(fName.length);
				
				while(fName.charAt(contadorCaracteres) != "."){
					extensaoArquivo = fName.charAt(contadorCaracteres) + extensaoArquivo;
					contadorCaracteres--;
					}
				
				//alert(extensaoArquivo);
				
				if(extensaoArquivo != "ai" && extensaoArquivo != "eps" && extensaoArquivo != "" ) {
					//alert(extensaoArquivo);
					//arquivosNaoConvertidos = arquivosNaoConvertidos + "\n" + imageList[i];
                       arquivosNaoConvertidos = arquivosNaoConvertidos + "\n" + corrigeNomeArquivo(imageList[i].name);
					arquivosNaoConvertidosContador++;
					abreArquivo = false;
					}
				
				if(extensaoArquivo == "ai") {
					//alert("Arquivo AI");
					abreArquivo = true;
					}		
							
				if(extensaoArquivo == "eps") {
					//alert("Arquivo EPS");
					abreArquivo = true;
					}
			}
		
			
            }
        else{
                abreArquivo = false;
            }
		
			if(abreArquivo){
			
			//alert(abreArquivo);
			//alert(imageList[i]);
			//ABRE OS ARQUIVOS 
			app.open(File(imageList[i])); 
			
		
			//#includepath "/I/Objetos/Overprint&CoresSpot/"
			//#includepath "/D/Lucas/Illustrator/JavaScript/Overprint&CoresSpot/"
			
		try{
			//#include "Overprint&CoresSpot_vShort.jsx"
            
            //************** INICIALIZAÇÃO DE OUTROS SCRIPTS ***********************
            
            if(converterPretoRGB){
                //alert("converterPretoRGB");
                #include "ConverterPreto.jsx"
                }
            if(converterSpotToCMYK){
                //alert("converterSpotToCMYK");
                #include "ConverteCores.jsx"
                #include "ConvertePathCMYK.jsx"
                }
            if(adicionaOverprintPreto){
                //alert("adicionaOverprintPreto");
                #include "OverPrintBlack.jsx"
                }
            if(adicionaOverprintProfessor){
                //alert("adicionaOverprintProfessor");
                #include "OverPrintProfessor.jsx"
                }
            
            //************** FIM DA INICIALIZAÇÃO DE OUTROS SCRIPTS ***********************
			arquivosConvertidos++;
            
			geraRelatorio = geraRelatorio + "\n" + corrigeNomeArquivo(imageList[i].name);
			}
		catch(e){
			//geraRelatorio = "Nenhum";
			arquivosNaoConvertidos = arquivosNaoConvertidos + "\n" + corrigeNomeArquivo(imageList[i].name);
			arquivosNaoConvertidosContador++;
			//alert("Erro ao converter "+imageList[i]);
			}

					
			//SALVA O ARQUIVO AI
			if(extensaoArquivo == "ai") {
				
			/*
			alert(fName);
			var saveOptions = new IllustratorSaveOptions();
			var saveName = new File(fName);
			saveOptions.compatibility = Compatibility.ILLUSTRATOR14;
			saveOptions.flattenOutput = OutputFlattening.PRESERVEAPPEARANCE;
			app.activeDocument.saveAs( saveName, saveOptions );
			//aiDocument.close();
			app.activeDocument.close(SaveOptions.SAVECHANGES);
			*/
		
			aiDocument = app.activeDocument;
			//aiDocument.close( SaveOptions.DONOTSAVECHANGES );
			//aiDocument.close();
			aiDocument.close( SaveOptions.SAVECHANGES );  
			aiDocument = null;
			
			if ( app.documents.length > 0 ) {
				
				app.activeDocument.close();
			
			}
		
			}
		
			//SALVA O ARQUIVO EPS

			if(extensaoArquivo == "eps") {
			
			//alert(fName);
			var saveOptions = new EPSSaveOptions();
			//var saveName = new File(fName);
			//saveName = saveName+"OK";
			saveOptions.compatibility = Compatibility.ILLUSTRATOR14;
			saveOptions.flattenOutput = OutputFlattening.PRESERVEAPPEARANCE;
			saveOptions.overprint = PDFOverprint.PRESERVEPDFOVERPRINT;
			app.activeDocument.saveAs(new File(selectedFolder+ "/" + fName), saveOptions);
			app.activeDocument.close();
			
			if ( app.documents.length > 0 ) {
				
				app.activeDocument.close();
			
			}
						
			/*
			aiDocument = app.activeDocument;
			aiDocument.close( SaveOptions.SAVECHANGES);  
			aiDocument = null;			
			*/
		
			}
			

		}
		}
		
		//alert(arquivosConvertidos+" arquivos convertidos","Lucas ®",true);	
	}
}

//*********** INICIO DO PROGRAMA PRINCIPAL **************

this.windowRef = win;
win.show();

//alert(rodaPrograma);

if(rodaPrograma){
    
    //alert("aqui");
    iniciaConversao();
    
    //*************  FECHA PROGRESS BAR ******************
    myProgressPanel.close();

}


//*********** FIM DO PROGRAMA PRINCIPAL **************


//Construção da Janela de Relatório
res = 
	"dialog { properties:{ resizeable:true }, \
		text: 'Alert Box Builder', frameLocation:[100,100], \
		msgPnl: Panel { orientation:'row', alignChildren:['left', 'top'],\
			text: 'Relatório de conversão', \
			title: Group { \
			}, \
			} \
	}";
win = new Window (res,"Lucas ®",); 
win.msgPnl.preferredSize = [470, 200];
//Fim Janela

if(geraRelatorio != ""){
//alert(arquivosConvertidos + " arquivo(s) convertido(s): \n" + geraRelatorio + "\n \n" + arquivosNaoConvertidosContador + " arquivo(s) não convertidos: \n" + arquivosNaoConvertidos,"Lucas ®",false); 
//var relatorio = arquivosConvertidos + " arquivo(s) convertido(s): \n" + geraRelatorio + "\n \n" + arquivosNaoConvertidosContador + " arquivo(s) não convertido(s): \n" + arquivosNaoConvertidos;
var relatorio = "Pasta selecionada:\n" + folderSelecionado + "\n\n" + arquivosConvertidos + " arquivo(s) convertido(s): \n" + geraRelatorio + "\n \n" + arquivosNaoConvertidosContador + " arquivo(s) não convertido(s): \n" + arquivosNaoConvertidos;

/*Salva relatório
	var txtRelatorio = new File("/D/Relatorio.txt"); 
	txtRelatorio.open( "w" ); 
	txtRelatorio.write(relatorio); 
	txtRelatorio.close(); 

	alert("Relatorio salvo em D:Relatorio.txt","Relatorio - Lucas ®")
//Fim Salva Relatório
*/

win.msgPnl.title.add('edittext', [0,0,440,165],relatorio, {multiline:true});

win.center();
win.show();

}

if(arquivosNaoConvertidos != "" && geraRelatorio == ""){
//alert(arquivosNaoConvertidosContador + " arquivo(s) não convertido(s): \n" + arquivosNaoConvertidos,"Lucas ®",false); 
//var relatorio = arquivosNaoConvertidosContador + " arquivo(s) não convertido(s): \n" + arquivosNaoConvertidos;
var relatorio = "Pasta selecionada:\n" + folderSelecionado + "\n\n" + arquivosNaoConvertidosContador + " arquivo(s) não convertido(s): \n" + arquivosNaoConvertidos;

/*Salva relatório
	var txtRelatorio = new File("/D/Relatorio.txt"); 
	txtRelatorio.open( "w" ); 
	txtRelatorio.write(relatorio); 
	txtRelatorio.close(); 

	alert("Relatorio salvo em D:Relatorio.txt","Relatorio - Lucas ®")
//Fim Salva Relatório
*/

win.msgPnl.title.add('edittext', [0,0,440,165],relatorio, {multiline:true});

win.center();
win.show();
}