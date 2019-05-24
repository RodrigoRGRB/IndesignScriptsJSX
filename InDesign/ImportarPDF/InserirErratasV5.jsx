if (app.documents.length != 0){
	
// Global script setting
var placement9pointAlignment = "mm";
var geraRelatorio = "";
var arquivosConvertidos = 0;
var arquivosNaoConvertidos = "";
var arquivosNaoConvertidosContador = 0;
var imageList;
var primeiroNumero;
var ultimoNumero;
var numeroAnterior;
var ultimoNumeroAnterior;
var jaAdicionouPagina = false;
var bugPagImpar = false;
//var converteArrayNumero = new Array;

////////////////////************************** FUNÇÕES*****************************
function getFolder() {
	
	try{
	var pastaInicial = app.activeDocument.filePath;
	}
	catch(e){
	var pastaInicial =  '~';
	}
		
	return Folder.selectDialog('Selecione a pasta que contém os PDFs que deseja importar:', Folder(pastaInicial));
}

function myPlacePDF(myDocument, myPage, myPDFFile,primeiroNumero){
	var verificaSecao = true;
	var myPDFPage;
	app.pdfPlacePreferences.pdfCrop = PDFCrop.cropMedia;
	var myCounter = 1;
	var myBreak = false;
	while(myBreak == false){
		if(myCounter > 1){
			myPage = myDocument.pages.add(LocationOptions.after, myPage);
		}
		app.pdfPlacePreferences.pageNumber = myCounter;
		
		if(verificaSecao){
			//alert("verifica secao "+primeiroNumero);
			criaSecao(primeiroNumero);
			verificaSecao = false;
			}
		myPDFPage = myPage.place(File(myPDFFile), [0,0])[0];
		if(myCounter == 1){
			var myFirstPage = myPDFPage.pdfAttributes.pageNumber;
		}
		else{
			if(myPDFPage.pdfAttributes.pageNumber == myFirstPage){
				myPage.remove();
				myBreak = true;
			}
		}
		myCounter = myCounter + 1;
	}
}
//*******************************
function criaSecao(primeiroNumero) {
	
	var meuDocumento = app.activeDocument; 
	//var mySection = myDocument.sections.item(0);
	var mySection = meuDocumento.sections.add();
	
	//pega a ultima secao criada
	mySection = meuDocumento.sections.item(meuDocumento.sections.length-1);
	mySection.continueNumbering = false;
	
	//Converte String para Integer, selecionando a base 10
	var temp = parseInt(primeiroNumero, 10);
	//alert("Cria Secao = "+primeiroNumero);
	//alert("Temp = "+temp); 
	mySection.pageNumberStart = temp;
	
	}
//*******************************
function deletaPgBranco() {
	
			if(app.activeDocument.pages.length > 1){
				
					var myDocument = app.activeDocument;
					var myPage;
					
					myPage = myDocument.pages.length-1;
					var i = myDocument.pages.length-1;
						while(i != 0){
										if(myDocument.pages[i].rectangles.length == 0){ 
											myDocument.pages[i].remove();
										}
								i--;
					}
					
					//Deleta primeira página se estiver em branco					
					if(myDocument.pages[0].rectangles.length == 0){ 
						myDocument.pages[0].remove();
					}
		}
	
	}

	
//*******************************
function remove2PaginasEmBranco() {
	
	if(app.activeDocument.pages.length > 1){
		
			var myDocument = app.activeDocument;
			var myPage;
			
			if(myDocument.pages.length > 2){
				if((myDocument.pages.length%2) == 0){
					myPage = myDocument.pages.length-2;
					var i = myDocument.pages.length-2;
					}
				else{
					myPage = myDocument.pages.length-1;
					var i = myDocument.pages.length-1;
					}
				}
			
			
			while(i != 0){
				/*
						alert(myDocument.pages[i].name);
						alert(myDocument.pages[i].rectangles.length);
						alert(myDocument.pages[i-1].name);
						alert(myDocument.pages[i-1].rectangles.length);
						*/
							if(myDocument.pages[i].rectangles.length == 0 && myDocument.pages[i-1].rectangles.length == 0){ 
								//alert("removendo");
								myDocument.pages[i].remove();
								myDocument.pages[i-1].remove();
							}
					i--;
					i--;
		}
}
}

////////////////////************************** FUNÇÕES*****************************
function pegaPrimeiroNumero(imageList){
	var fName = imageList.name;
	var contadorCaracteres = 0;
	primeiroNumero = "";
	
	while(fName.charAt(contadorCaracteres) != "-" && fName.charAt(contadorCaracteres) != "." && fName.charAt(contadorCaracteres) != ""){
	primeiroNumero = primeiroNumero + fName.charAt(contadorCaracteres);
	contadorCaracteres++;
	}
	
	//primeiroNumero = parseInt(primeiroNumero);
	return primeiroNumero;
	}

//Organiza array em ordem numérica;
function ordemAlfabetica(imageList) {
	
	var arrayNumerico = new Array;
	var arrayCorrigido = new Array;
	
	//alert(imageList.length);
	//Cria um array com o numero do arquivos	
		for (var i = 0; i < imageList.length; i++) {
				arrayNumerico[i] =pegaPrimeiroNumero(imageList[i]);
		}
	
	//Ordena esse array por ordem numerica
	//alert(arrayNumerico);
	arrayNumerico.sort(sortNumber);
	//alert(arrayNumerico);
	
		//Compara o conteudo desse array e reordena o array imageList
		for (var i = 0; i < arrayNumerico.length; i++) {
			
			for(var j = 0; j < arrayNumerico.length;j++){
					if(pegaPrimeiroNumero(imageList[j]) == arrayNumerico[i]){
							arrayCorrigido[i] = imageList[j];
						}		
			}		
		}
	
	/*
	//teste array
	for (var i = 0; i < arrayCorrigido.length; i++) {
		alert(arrayCorrigido[i]);
		};	
	alert("fim");
	*/
	
	return arrayCorrigido;
	
}
function sortNumber(a, b) {
	return a - b;
	}

//*******************************

	
function importFolderFiles(selectedFolder) {	
	
	if (selectedFolder) {

		
		var firstImageLayer = true;
		var newLayer ;
		var thisPlacedItem;
		var abreArquivo;
		
		//conferePrimeiraPagina();
					  
		// create document list from files in selected folder
		imageList = selectedFolder.getFiles();
		
		imageList = ordemAlfabetica(imageList);

		for (var i = 0; i < imageList.length; i++) {
			
			// VERIFICA SE O ARQUIVO É AI OU EPS PARA PODER ABRIR
			if (imageList[i] instanceof File) {
				
				abreArquivo = false;

				// get the file name
				//var fName = imageList[i].name.toLowerCase();
				//alert(fName.length); 
				
				var fName = imageList[i].name;
				
				//alert(fName); 
				
				var extensaoArquivo = "";
				var contadorCaracteres = fName.length;
				//alert(fName.length);
				
				while(fName.charAt(contadorCaracteres) != "."){
					extensaoArquivo = fName.charAt(contadorCaracteres) + extensaoArquivo;
					contadorCaracteres--;
					}
				//alert(extensaoArquivo);
				
				//Pega o primeiro numero do pdf
				var contadorCaracteres = 0;
				primeiroNumero = "";
				while(fName.charAt(contadorCaracteres) != "-" && fName.charAt(contadorCaracteres) != "." ){
					//alert(fName.charAt(contadorCaracteres));
					primeiroNumero = primeiroNumero + fName.charAt(contadorCaracteres);
					contadorCaracteres++;
					}
				//alert(primeiroNumero);
				
				//Pega o ultimo numero do pdf
				var contadorCaracteres = fName.length;
				contadorCaracteres = contadorCaracteres -5;
				ultimoNumero = "";
				while(fName.charAt(contadorCaracteres) != "-" && fName.charAt(contadorCaracteres) != "" ){
					ultimoNumero = fName.charAt(contadorCaracteres) + ultimoNumero;
					contadorCaracteres--;
					}
				//alert(ultimoNumero); 
				/*
				//Funcao para verificar nomes inválidos
				var letrasTemp = "abcdefghyjklmnopqrstuvwxyzçáéíúóâêîôûãõ+";

				function tem_letras(textoFunction){
				   textoFunction = textoFunction.toLowerCase();
				   for(k=0; k<textoFunction.length; k++){
					  if (letrasTemp.indexOf(textoFunction.charAt(k),0)!=-1){
						 return 1;
					  }
				   }
				   return 0;
				} 
			
			//Verifica se tem nomes invalidos
				var validacao = tem_letras(fName);
				alert(validacao);
				*/

				//if(extensaoArquivo != "pdf" && extensaoArquivo != "pdf"  ) {
				if(extensaoArquivo != "pdf") {
					//alert(extensaoArquivo);
					arquivosNaoConvertidos = arquivosNaoConvertidos + "\n" + imageList[i];
					arquivosNaoConvertidosContador++;
					abreArquivo = false;
					}
							
				
				if(extensaoArquivo == "pdf") {
					//alert("Arquivo AI");
					abreArquivo = true;
					}		
			}
		
			if(abreArquivo){

			//ABRE (INSERE OS ARQUIVOS
			var myDocument = app.activeDocument;
			var myPage = myDocument.pages[0];
			//var myPDFFile = File.openDialog("Choose a PDF File");
			var myPDFFile = (File(imageList[i]));

			var paginaAtual = myDocument.pages.length;
			myPage = myDocument.pages[paginaAtual-1];
			
			//Se a ultima pagina estiver ocupada, insere mais uma pagina
			if(myPage.rectangles.length > 0){
				myPage = myDocument.pages.add(LocationOptions.after, myPage);
			}
			
			//verifica primeira página do PDF é par
			if((primeiroNumero%2) == 0){
				//alert(primeiroNumero+" é par");
					//Se última página for ímpar, adiciona mais uma página
					if((myDocument.pages.length%2) != 0){
					myPage = myDocument.pages.add(LocationOptions.after, myPage);
					
					jaAdicionouPagina = true;
					//alert(myDocument.pages.length); 
					}				
			}
		else{
					//alert(primeiroNumero+" é ímpar");
					//Se última página for par, adiciona mais uma página
					if((myDocument.pages.length%2) == 0){
					myPage = myDocument.pages.add(LocationOptions.after, myPage);
					
					jaAdicionouPagina = true;
					//alert(myDocument.pages.length); 
					}					

			}

	
	//alert(ultimoNumeroAnterior);
	//Se for a primeira página, não executa os outros ifs
	if(myDocument.pages.length > 1){
	//Se pagina atual for ímpar e o primeiroNumero for ímpar && o primeiroNumero-1 for diferente do ultimoNumero, adiciona duas paginas	
			if((myDocument.pages.length%2) != 0 &&  primeiroNumero-1 != numeroAnterior &&  primeiroNumero-1 != ultimoNumeroAnterior && ((primeiroNumero%2) !=0)){
				if(jaAdicionouPagina == false){
						//alert(primeiroNumero+" não é sequencia de "+numeroAnterior);
						
						myPage = myDocument.pages.add(LocationOptions.after, myPage);
						myPage = myDocument.pages.add(LocationOptions.after, myPage);
						}
				}
			}
			
					jaAdicionouPagina = false;
			
			numeroAnterior = primeiroNumero;
			
			//alert("ultimo "+ ultimoNumero + "primeiro" + primeiroNumero);
			if(ultimoNumero != primeiroNumero){ 
				//alert("guardando ultimo numero");
				ultimoNumeroAnterior = ultimoNumero;
				}
			
			paginaAtual = myDocument.pages.length;
			myPage = myDocument.pages[myDocument.pages.length-1];
			/*
			if(myDocument.pages.length == 2 && numeroAnterior == 2){
				alert("vai travar");
				}
				*/
			
			if(myDocument.pages.length == 4 && bugPagImpar == false && (primeiroNumero%2) != 0){
				//myPage.remove();
				//myPage = myDocument.pages[myDocument.pages.length-1];
				myPage.remove();
				myPage = myDocument.pages[myDocument.pages.length-1];
				
				//alert("vai travar");			
				bugPagImpar == true;
				
					//Se a ultima pagina estiver ocupada, insere mais uma pagina
					if(myPage.rectangles.length > 0){
						myPage = myDocument.pages.add(LocationOptions.after, myPage);
					}				
			}
			
			
			
		try{
			//myPlacePDF (myDocument, myPage, myPDFFile);
			myPlacePDF (myDocument, myPage, myPDFFile,primeiroNumero);
			
			//adicionar primeiroNumero no inicio da secao
			//alert(primeiroNumero);
			//criaSecao(primeiroNumero);
			
			arquivosConvertidos++;
			geraRelatorio = geraRelatorio + "\n" + imageList[i];
			}
		catch(e){
			//geraRelatorio = "Nenhum";
			arquivosNaoConvertidos = arquivosNaoConvertidos + "\n" + imageList[i];
			arquivosNaoConvertidosContador++;
			//alert("Erro ao converter "+imageList[i]);
			}		
		
		}
		}
		
		//remove2PaginasEmBranco();		
		deletaPgBranco();
		
		//alert(arquivosConvertidos+" arquivos convertidos","Lucas ®",true);	
		#includepath "/I/Objetos/Scripts/InDesign/ImportarPDF"
		#include "PDFBordasErrataV2.jsx"
	}

}

importFolderFiles( getFolder() );


//*************************************************Construção da Janela de Relatório*************************************************
res = 
	"dialog { properties:{ resizeable:true }, \
		text: 'Alert Box Builder', frameLocation:[100,100], \
		msgPnl: Panel { orientation:'row', alignChildren:['left', 'top'],\
			text: 'Relatório de arquivos importados', \
			title: Group { \
			}, \
			} \
	}";
win = new Window (res,"Lucas ®",); 
win.msgPnl.preferredSize = [470, 200];
//Fim Janela

if(geraRelatorio != ""){
//alert(arquivosConvertidos + " arquivo(s) convertido(s): \n" + geraRelatorio + "\n \n" + arquivosNaoConvertidosContador + " arquivo(s) não convertidos: \n" + arquivosNaoConvertidos,"Lucas ®",false); 
var relatorio = arquivosConvertidos + " arquivo(s) importado(s): \n" + geraRelatorio + "\n \n" + arquivosNaoConvertidosContador + " arquivo(s) não importado(s): \n" + arquivosNaoConvertidos;

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
var relatorio = arquivosNaoConvertidosContador + " arquivo(s) não importado(s): \n" + arquivosNaoConvertidos;

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

}
else{
alert("É necessário criar um arquivo","Lucas ®",true);
}