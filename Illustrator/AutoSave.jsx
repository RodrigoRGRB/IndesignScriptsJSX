//Função para salvar documento
function SalvaDocumento(){
	
			//app.documents.getByName(arrayNomeDocumentos[i]).name
			
			var argumento = SalvaDocumento.arguments;
			//alert(argumento[0]);
			aiDocument = app.documents.getByName(argumento[0]);
			//aiDocument = app.documents[argumento[0]];
			
			try{
			aiDocument.save( SaveOptions.SAVECHANGES ); 
			
			setUltimoFolder ();
			
			}
		    catch(e){
				
			//alert ("Nenhum arquivo aberto","Lucas ®",true);	
			
			//alert("Você deve salvar este arquivo");
			
			try{
				
			app.activeDocument =  aiDocument	
			var ultimoFolderSalvo = new Folder (getUltimoFolder());
			
			//app.activeDocument = app.documents[argumento[0]];
			
			var myFiles = ultimoFolderSalvo.openDlg("AutoSave - " + app.activeDocument.name);
						
			aiDocument.saveAs(myFiles); 
			
			setUltimoFolder ();
			}
		     
			 catch(e){
				 //alert("Cancelado");
			}
			
			}
			
			//alert("Documento salvo");
			aiDocument = null;
}
//Fim da função salva documento

//Função para ler o último folder salvo
function getUltimoFolder(){
	var folder
	
	try {
		
	folder = 
#includepath "/D/AutoSaveIllustrator/"
#include "AutoSave.xml"  

//LINHA TEMPORÁRIA
//folder = "/D/";

}
catch(e){
	folder = "/D/";
	}

return folder;
	
	}

function setUltimoFolder(){
	
folder = String(app.activeDocument.path).split('%20').join(' ')
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

var xmlFile = new File("/D/AutoSaveIllustrator/AutoSave.xml"); 
xmlFile.open( "w"); 
xmlFile.write("'"+folder+"/'"); 
xmlFile.close(); 
	
	}



//Conta o número de documento aberto
var documentosAbertos = app.documents.length;
var i;
var j = 0;
var ordemSalva;
var janelaAtiva;
var precisaSalvar = false;

//verifica se existe algum documento aberto
if (documentosAbertos > 0)
{
	//alert(app.documents.length);
	
	//Confere se precisa salvar
	var contador = app.documents.length;
	
	while(contador > 0){
		//alert(contador);
		if(app.documents[contador-1].saved == false){
			//alert("Precisa salvar");
			precisaSalvar = true;
			}
		contador = contador -1;
		}
	//**********************************************
	
	
	if(precisaSalvar){
		
		//Cria Array de documentos
		var arrayNomeDocumentos = new Array(app.documents.length)


		for(i=0;i < app.documents.length; i++){
			//alert(app.documents[i].name);
			arrayNomeDocumentos[i] = app.documents[i].name; 
			
			}

		//Fim da criação de arrays


	//app.activeDocument = app.documents[app.documents.length-1];
	
		// Cria janela
	var res =
           "dialog { \
		          msg: Group { orientation: 'row', alignment: 'center', \
				         mensagem: StaticText { text:'Como deseja salvar os arquivos do Illustrator?' }, \
						 }\
                   buttons: Group { orientation: 'row', alignment: 'right', \
						umBtn: Button { text:'Salvar individualmente', properties:{name:'um'} } \
						todosBtn: Button { text:'Salvar todos os arquivos', properties:{name:'todos'} }, \
                           cancelarBtn: Button { text:'Cancelar', properties:{name:'cancelar'} } \
                   } \
           }";
	// Create the dialog with the components
	var win = new Window (res,"AutoSave - Lucas ®",); 	
	this.windowRef = win;
	
	// Se false salva um por um, se true salva todos os arquivos;
	win.buttons.cancelar.onClick = function () {  ordemSalva = "cancelar";  win.close(); };
	win.buttons.todos.onClick = function () {  ordemSalva = "todos";  win.close(); };
	win.buttons.um.onClick = function () {  ordemSalva = "um"; win.close(); };
	
	
	win.show(); 
	//Fim cria janela

for(i = documentosAbertos-1; i >= 0; i--){
	
	if(ordemSalva == "todos"){
	
	//Verifica se o documento está salvo
	//alert(app.documents.getByName(arrayNomeDocumentos[i]).name);
	if(app.documents.getByName(arrayNomeDocumentos[i]).saved == false) {
		//alert(app.documents.getByName(arrayNomeDocumentos[i]).name);
		SalvaDocumento (app.documents.getByName(arrayNomeDocumentos[i]).name);
	}
}

					if(ordemSalva == "um"){
						
						//alert("Salva um a um");
						
						//app.activeDocument = app.documents[app.documents.length-1];
						app.activeDocument = app.documents.getByName(arrayNomeDocumentos[i]);
						//alert(app.documents.getByName(arrayNomeDocumentos[i]).name);
						
						//app.activeDocument = app.documents[i-1];
						
						var textoJanela = "Deseja salvar "+ app.activeDocument.name+ "?";
						
						var desejaSalvar = false;
						if(app.activeDocument.saved == false) {
							var desejaSalvar = confirm(textoJanela,"","Lucas ®");
						}
						
						//alert(desejaSalvar);
						
						if(desejaSalvar){
							
								//Verifica se o documento está salvo
									//alert("Salvando");
									//SalvaDocumento (app.documents.length-1);
									SalvaDocumento (app.documents.getByName(arrayNomeDocumentos[i]).name);
							}

						
						}

					}

if(ordemSalva == "cancelar"){
	//alert("cancelado");
	}

}
}
else 
{
//alert ("Nenhum arquivo aberto","Lucas ®",true);
}