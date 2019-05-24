if(app.documents.length > 0) {
	
myDocument = app.activeDocument;
var arrayBordasPagina = new Array;
var rodaPrograma = false;
alinharPelasBordas = false;
	
#includepath "/I/Objetos/Scripts/InDesign/ImportarPDF"
#include "funcaoAlinhamento.jsx"


//****************FUNCAO AJUSTA SANGRIA

function aplicaPorcentagem(){
			myRectangle.graphics[0].horizontalScale = 100;
			myRectangle.graphics[0].verticalScale = 100;
			myRectangle.graphics[0].transform(CoordinateSpaces.pasteboardCoordinates, AnchorPoint.centerAnchor, myScaleMatrix, undefined, true);
	}

function ajustaSangria(arrayBordasPagina,myPage){
	
	var numPagina = parseInt(myPage.name);
	
		//myRectangle.graphics[0].geometricBounds = [arrayBordasPagina[0]-sangriaVertical, arrayBordasPagina[1]-sangriaHorizontal,arrayBordasPagina[2]+sangriaVertical, arrayBordasPagina[3]+sangriaHorizontal];
		
		//sangriaHorizontalPagina
		//sangriaVerticalPagina
		
		myRectangle.geometricBounds = [arrayBordasPagina[0]-sangriaVertical, arrayBordasPagina[1]-sangriaHorizontal,arrayBordasPagina[2]+sangriaVertical, arrayBordasPagina[3]+sangriaHorizontal];
		
		aplicaPorcentagem();
		centralizar();
		
		//alert("aqui"); 
		
		if(numPagina%2 == 0){
			/*
			aplicaPorcentagem();
			centralizar();
			alinharDireita();
			*/
		
			if(alinharPelasBordas){
				//alert("aqui"); 
				alinharEsquerda();
				//alinharDireita();
			}
			
			myRectangle.geometricBounds = [arrayBordasPagina[0]-sangriaVertical, arrayBordasPagina[1]-sangriaHorizontal,arrayBordasPagina[2]+sangriaVertical, arrayBordasPagina[3]];
			
			arrayBordasPagina = myRectangle.graphics[0].geometricBounds;			
			//myRectangle.graphics[0].geometricBounds = [arrayBordasPagina[0], arrayBordasPagina[1]+sangriaHorizontal,arrayBordasPagina[2], arrayBordasPagina[3]+sangriaHorizontal];
			
			}
		else{
			/*
			aplicaPorcentagem();
			centralizar();
			alinharEsquerda();
			*/
		
			if(alinharPelasBordas){
				//alinharEsquerda();
				alinharDireita();
			}
			
			myRectangle.geometricBounds = [arrayBordasPagina[0]-sangriaVertical, arrayBordasPagina[1],arrayBordasPagina[2]+sangriaVertical, arrayBordasPagina[3]+sangriaHorizontal];
			
			arrayBordasPagina = myRectangle.graphics[0].geometricBounds;			
			//myRectangle.graphics[0].geometricBounds = [arrayBordasPagina[0], arrayBordasPagina[1]-sangriaHorizontal,arrayBordasPagina[2], arrayBordasPagina[3]-sangriaHorizontal];
			}
		

			//Centralizar conteúdo
	
	}

//****************FUM FUNCAO AJUSTA SANGRIA


//******************* CRIAR JANELA ******************
// Cria janela
var res =
	   "dialog { \
			   grupoSangria: Panel { text: 'Margens do documento', orientation:'column',  preferredSize: [260, 20],\
					   info: Group { orientation: 'column', alignment:'left' , \
							sangriaVertical: Group { orientation: 'row',alignment:'left', \
									labelSangriaVertical: StaticText { text:'Sangria superior/inferior' }, \
									inputSangriaVertical: EditText { preferredSize: [40, 20] } \
							   } \
							sangriaHorizontal: Group { orientation: 'row', alignment:'left',\
									labelSangriaLateral: StaticText { text:'Sangria direita/esquerda' }, \
									inputSangriaLateral: EditText { preferredSize: [40, 20] } \
							   } \
					 }, \
				}, \
				grupoPorcentagem: Panel { text: 'Porcentagem do PDF', orientation:'column',  preferredSize: [260, 20],\
					   info: Group { orientation: 'column', alignment:'left' , \
							porcentagemH: Group { orientation: 'row',  alignment:'left' ,\
									labelH: StaticText { text:'Horizontal' }, \
									inputH: EditText { preferredSize: [40, 20] } \
							   } \
							porcentagemV: Group { orientation: 'row',  alignment:'left' ,\
									labelV: StaticText { text:'Vertical' }, \
									inputV: EditText { preferredSize: [40, 20] } \
							   } \
					}, \
				}, \
				radio: Panel { orientation: 'column', alignment:'left' , text:'Alinhamento do PDF', preferredSize: [260, 20],\
					}, \
			   buttons: Group { orientation: 'row', alignment: 'right', \
					cnlBtn: Button { text:'Cancelar', properties:{name:'cancelar'} } \
					   okBtn: Button { text:'OK', properties:{name:'ok'} } \
			   } \
	   }";
		   
//Cria janela
var win = new Window (res,"Ajustar Sangria - Lucas ®",); 

//CRIA OS RADIO BUTTONS

	// Add a panel to determine alignment of buttons on the alert box
	//win.radio = win.add('panel', undefined, 'Alinhamento do PDF:');
	win.radio.orientation = "row";
	win.radio.alignLeftRb =
	win.radio.add('radiobutton', undefined, 'Centralizar');
	win.radio.alignCenterRb =
	win.radio.add('radiobutton', undefined, 'Alinhar pelas margens');

	//Marcar a primeira opção
	win.radio.alignLeftRb.value = true;

//FIM DA CRIAÇÃO DOS RADIO BUTTONS

//Botão Cancelar
win.buttons.cnlBtn.onClick = function () 
{
	win.close();			
}




//Carrega dados iniciais
/*
win.grupoSangria.info.sangriaHorizontal.inputSangriaLateral.text = 5;
win.grupoSangria.info.sangriaVertical.inputSangriaVertical.text = 5;
*/

//Carrega as sangrias do documento
/*
alert(myDocument.documentPreferences.documentBleedTopOffset);
alert(myDocument.documentPreferences.documentBleedBottomOffset);

alert(myDocument.documentPreferences.documentBleedOutsideOrRightOffset);
alert(myDocument.documentPreferences.documentBleedInsideOrLeftOffset);
*/


var sangriaHorizontalPagina = (myDocument.documentPreferences.documentBleedOutsideOrRightOffset + myDocument.documentPreferences.documentBleedInsideOrLeftOffset)/2;
win.grupoSangria.info.sangriaHorizontal.inputSangriaLateral.text = sangriaHorizontalPagina;

var sangriaVerticalPagina = (myDocument.documentPreferences.documentBleedTopOffset + myDocument.documentPreferences.documentBleedBottomOffset)/2;
win.grupoSangria.info.sangriaVertical.inputSangriaVertical.text = sangriaVerticalPagina;

//Define os valores para a porcentagem de distorção do PDF
/*
win.grupoPorcentagem.info.porcentagemH.inputH.text = 100;
win.grupoPorcentagem.info.porcentagemV.inputV.text = 100;
*/
win.grupoPorcentagem.info.porcentagemH.inputH.text = 100;
win.grupoPorcentagem.info.porcentagemV.inputV.text = 94.3;


//Botão OK
//Verifica campos em branco
win.buttons.okBtn.onClick = function()
{
	
	var todosOsCampos = ""+win.grupoSangria.info.sangriaHorizontal.inputSangriaLateral.text+win.grupoSangria.info.sangriaVertical.inputSangriaVertical.text+win.grupoPorcentagem.info.porcentagemH.inputH.text+win.grupoPorcentagem.info.porcentagemV.inputV.text;
	var todosOsCampos = todosOsCampos.split(",");
		
	if(win.grupoSangria.info.sangriaHorizontal.inputSangriaLateral.text == ""){
		alert("Digite um valor para a sangria lateral");
		}
	else if(win.grupoSangria.info.sangriaVertical.inputSangriaVertical.text == ""){
		alert("Digite um valor para a sangria superior/inferior");
		}
	else if(win.grupoPorcentagem.info.porcentagemH.inputH.text == "" || win.grupoPorcentagem.info.porcentagemH.inputH.text <= 0){
		alert("Digite uma porcentagem válida para distorção horizontal");
		}
	else if(win.grupoPorcentagem.info.porcentagemV.inputV.text == "" || win.grupoPorcentagem.info.porcentagemV.inputV.text <= 0){
		alert("Digite uma porcentagem válida para distorção vertical");
		}
	else if(todosOsCampos.length>1){
		alert("Utilize ponto (.) ao invés de vírgula (,)");
	}
	else{
		rodaPrograma = true;
		win.close();	
	}
}

win.show();

alinharPelasBordas = win.radio.alignCenterRb.value;

//alert(alinharPelasBordas);

//Captura os dados da janela para as variáveis
//var espacoCabeco = 1*win.grupoCabeco.info.cabecalho.inputEspaco.text;

//Desmarca o "link" para as margens do documento
//app.activeDocument.documentPreferences.documentBleedUniformSize = false;
myDocument.documentPreferences.documentBleedUniformSize = false;

//Define a sangria da janela para o documento atual
myDocument.documentPreferences.documentBleedOutsideOrRightOffset = win.grupoSangria.info.sangriaHorizontal.inputSangriaLateral.text;
myDocument.documentPreferences.documentBleedInsideOrLeftOffset = win.grupoSangria.info.sangriaHorizontal.inputSangriaLateral.text ;
myDocument.documentPreferences.documentBleedTopOffset = win.grupoSangria.info.sangriaVertical.inputSangriaVertical.text;
myDocument.documentPreferences.documentBleedBottomOffset = win.grupoSangria.info.sangriaVertical.inputSangriaVertical.text;

//var sangria = 7.5;
var sangriaHorizontal = 1*win.grupoSangria.info.sangriaHorizontal.inputSangriaLateral.text;
var sangriaVertical = 1*win.grupoSangria.info.sangriaVertical.inputSangriaVertical.text ;

var setPorcentagemHorizontal = win.grupoPorcentagem.info.porcentagemH.inputH.text/100;
var setPorcentagemVertical = win.grupoPorcentagem.info.porcentagemV.inputV.text/100;

/*
alert(sangriaHorizontal);
alert(sangriaVertical);
alert(setPorcentagemHorizontal);
alert(setPorcentagemVertical);
*/

var myScaleMatrix = app.transformationMatrices.add({horizontalScaleFactor:setPorcentagemHorizontal,
verticalScaleFactor:setPorcentagemVertical});


if(rodaPrograma){
	
	//try{	

		for(i=0; i < myDocument.pages.length;i++) {

				myPage = myDocument.pages[i];
				myRectangle = myPage.rectangles.item(0);
				
				//alert(myPage.rectangles.length);
				
				if(myPage.rectangles.length > 0){
					
					//alert(myPage.name);
				
					//alert(myPage.name);
					arrayBordasPagina = myPage.bounds;
					ajustaSangria(arrayBordasPagina,myPage);		
				
				}
		}			

		alert ("Concluído com sucesso","Lucas ®",false);

		/*}
	catch(e){
		alert("Não foi possível completar a operação. Verifique: \n > Se digitou valores válidos nos campos \n > Se existe um PDF em cada página do arquivo","Ajuste Cabeçalho - Lucas ®", true);
		}	
		*/
	
}
}

else{
alert("É necessário criar um arquivo","Lucas ®",true);
}