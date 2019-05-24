if(app.documents.length > 0) {

#includepath "/I/Objetos/Scripts/InDesign/ImportarPDF"
#include "funcaoAlinhamento.jsx"

//Valor da sangria em milimetros
var sangria = 5;
myDocument = app.activeDocument;
var arrayBordasPagina = new Array;
var rodaPrograma = false;


//******************* CRIAR JANELA ******************
// Cria janela
var res =
	   "dialog { \
			   grupoCabeco: Panel { text: 'Espaço para o cabeço', orientation:'column',  preferredSize: [150, 20],\
					   info: Group { orientation: 'column', alignment:'left' , \
							cabecalho: Group { orientation: 'row', \
									inputEspaco: EditText { preferredSize: [40, 20] } \
									labelEspaco: StaticText { text:'milímetros' }, \
							   } \
					 }, \
				}, \
				grupoPorcentagem: Panel { text: 'Porcentagem do PDF', orientation:'column',  preferredSize: [150, 20],\
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
			   buttons: Group { orientation: 'row', alignment: 'right', \
					cnlBtn: Button { text:'Cancelar', properties:{name:'cancelar'} } \
					   okBtn: Button { text:'OK', properties:{name:'ok'} } \
			   } \
	   }";
		   
//Cria janela
var win = new Window (res,"Ajuste Cabeçalho - Lucas ®",); 

//Botão Cancelar
win.buttons.cnlBtn.onClick = function () 
{
	win.close();			
}

//Carrega dados iniciais
win.grupoCabeco.info.cabecalho.inputEspaco.text = 5;
win.grupoPorcentagem.info.porcentagemH.inputH.text = 100;
win.grupoPorcentagem.info.porcentagemV.inputV.text = 100;

//Botão OK
//Verifica campos em branco
win.buttons.okBtn.onClick = function()
{
	
	var todosOsCampos = ""+win.grupoCabeco.info.cabecalho.inputEspaco.text+win.grupoPorcentagem.info.porcentagemH.inputH.text+win.grupoPorcentagem.info.porcentagemV.inputV.text;
	var todosOsCampos = todosOsCampos.split(",");
		
	if(win.grupoCabeco.info.cabecalho.inputEspaco.text == ""){
		alert("Digite um espaço para o cabeçalho (pode ser um número negativo)");
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

//Captura os dados da janela para as variáveis
var espacoCabeco = 1*win.grupoCabeco.info.cabecalho.inputEspaco.text;
var setPorcentagemHorizontal = win.grupoPorcentagem.info.porcentagemH.inputH.text/100;
var setPorcentagemVertical = win.grupoPorcentagem.info.porcentagemV.inputV.text/100;

//******************* FIM DA CRIAÇÃO DA JANELA ******************

//Adicionar espaço no cabeço em milimetros
/*
var espacoCabeco = parseInt(prompt("Digite o valor do espaço para o cabeço (em milímetros)", "5","Lucas ®"));
*/

// Encontra a unidade de medida atual e muda para a unidade escolhida
	with (app.activeDocument.viewPreferences){
	var myOldXUnits = horizontalMeasurementUnits;
	var myOldYUnits = verticalMeasurementUnits;
	horizontalMeasurementUnits = MeasurementUnits.millimeters;
	verticalMeasurementUnits = MeasurementUnits.millimeters;
	}
//

// Valor da porcentagem a diminuir
/*
var setPorcentagemHorizontal = 0.98;
var setPorcentagemVertical = 0.98;
*/

/*
alert(setPorcentagemHorizontal);
alert(setPorcentagemVertical);
*/

if(rodaPrograma){
	
	try{	

		var myScaleMatrix = app.transformationMatrices.add({horizontalScaleFactor:setPorcentagemHorizontal,
		verticalScaleFactor:setPorcentagemVertical});


		for(i=0; i < myDocument.pages.length;i++) {

				myPage = myDocument.pages[i];
				myRectangle = myPage.rectangles.item(0);
				
				arrayBordasPagina = myPage.bounds;
				if(myPage.rectangles.length > 0){
					myRectangle.geometricBounds = [arrayBordasPagina[0], arrayBordasPagina[1],arrayBordasPagina[2], arrayBordasPagina[3]];
					myRectangle.graphics[0].horizontalScale = 100;
					myRectangle.graphics[0].verticalScale = 100;
					myRectangle.transform(CoordinateSpaces.pasteboardCoordinates, AnchorPoint.centerAnchor, myScaleMatrix, undefined, true);
					
					//Adiciona espaço no cabeço
					//myRectangle.graphics[0].geometricBounds = [arrayBordasPagina[0]+espacoCabeco, arrayBordasPagina[1],arrayBordasPagina[2]+espacoCabeco, arrayBordasPagina[3]];
					myRectangle. geometricBounds = [arrayBordasPagina[0]+espacoCabeco, arrayBordasPagina[1],arrayBordasPagina[2]+espacoCabeco, arrayBordasPagina[3]];
					centralizar();
					alinharTopo();
					
				}
		}

		// Retorna a unidade de medida antiga;
			with (app.activeDocument.viewPreferences){
				try{
				horizontalMeasurementUnits = myOldXUnits;
				verticalMeasurementUnits = myOldYUnits;
				}
				catch(myError){
				alert("Could not reset custom measurement units.");
				}
			}
			
		alert ("Concluído com sucesso","Lucas ®",false);

	
		}
	catch(e){
		
		alert("Não foi possível completar a operação. Verifique: \n > Se digitou valores válidos nos campos \n > Se existe um PDF em cada página do arquivo","Ajuste Cabeçalho - Lucas ®", true);
		}	
	
	
	
	}
	
}

else{
alert("É necessário criar um arquivo","Lucas ®",true);
}