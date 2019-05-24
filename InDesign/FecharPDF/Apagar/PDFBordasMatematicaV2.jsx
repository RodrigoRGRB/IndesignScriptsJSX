//Valor da sangria em milimetros
var sangria = 5;
//myDocument = app.activeDocument;
var arrayBordasPagina = new Array;

// Valor da porcentagem a diminuir
var setPorcentagemHorizontal = distorcaoHorizontal/100;
var setPorcentagemVertical = distorcaoVertical/100;

var myScaleMatrix = app.transformationMatrices.add({horizontalScaleFactor:setPorcentagemHorizontal,
verticalScaleFactor:setPorcentagemVertical});

//Ajustar sangria
var bleedAjust = true;

//************FUNCAO AJUSTA PAGINAS ***************

function ajustaPaginaPar(){
	
	if(bleedAjust == true){
				myRectangle.graphics[0].horizontalScale = 100;
				myRectangle.graphics[0].verticalScale = 100;
				myRectangle.transform(CoordinateSpaces.pasteboardCoordinates, AnchorPoint.centerAnchor, myScaleMatrix, undefined, true);
		}

			
	myRectangle.geometricBounds = [-5, -5, 285, 210];
	alinharDireita();
	centralizarV();
	
	}

function ajustaPaginaImpar(){
	
	//Ajusta sangria
	if(bleedAjust == true){
		myRectangle.graphics[0].horizontalScale = 100;
		myRectangle.graphics[0].verticalScale = 100;
		myRectangle.transform(CoordinateSpaces.pasteboardCoordinates, AnchorPoint.centerAnchor, myScaleMatrix, undefined, true);
		}
	//Fim ajusta sangria
			
	myRectangle.geometricBounds = [-5, 210, 285, 425];
	alinharEsquerda();
	centralizarV();
	
	}

function ajustaPaginaImparAlt(){
	
	//Ajusta sangria
	if(bleedAjust == true){
		myRectangle.graphics[0].horizontalScale = 100;
		myRectangle.graphics[0].verticalScale = 100;
		myRectangle.transform(CoordinateSpaces.pasteboardCoordinates, AnchorPoint.centerAnchor, myScaleMatrix, undefined, true);
		}
	//Fim ajusta sangria
			
	myRectangle.geometricBounds = [-5, 0, 285, 210];
	alinharEsquerda();
	centralizarV();
	
	}



//***************************


//****************FUNCAO AJUSTA SANGRIA

function ajustaSangria(arrayBordasPagina,i){
	var numPagina;
	var numProxPagina;
	var numAntPagina;
	var contador = i;

	
	//página atual
	numPagina = parseInt(myDocument.pages[i].name);
	
	//Se Proxima pagina maior que a pagina atual, recebe valor
	if(myDocument.pages[contador+1] != null){
		if(parseInt(myDocument.pages[contador+1].name) > numPagina){
			numProxPagina = parseInt(myDocument.pages[contador+1].name);
			}
			else{
				numProxPagina = null;
				}
	}
	
	//Se página anterior menor que a página atual, recebe valor
	if(parseInt(myDocument.pages[contador-1].name) < numPagina){
		numAntPagina = parseInt(myDocument.pages[contador-1].name);
		}
	else{
		numAntPagina = null;
		}
	
		myRectangle.graphics[0].geometricBounds = [arrayBordasPagina[0]-sangria, arrayBordasPagina[1]-sangria,arrayBordasPagina[2]+sangria, arrayBordasPagina[3]+sangria];
		
		//Par
		if(numPagina%2 == 0){
			
			//Roda a função para setar a porcentagem
			ajustaPaginaPar();
			
			//Se proxima pagina for impar
				if(numProxPagina%2 != 0 && numProxPagina != null){
					myRectangle.geometricBounds = [arrayBordasPagina[0]-sangria, arrayBordasPagina[1]-sangria,arrayBordasPagina[2]+sangria, arrayBordasPagina[3]];
					}
				else{
						if(numProxPagina == null){
							myRectangle.geometricBounds = [arrayBordasPagina[0]-sangria, arrayBordasPagina[1]-sangria,arrayBordasPagina[2]+sangria, arrayBordasPagina[3]+sangria];
						}
					else{
						myRectangle.geometricBounds = [arrayBordasPagina[0]-sangria, arrayBordasPagina[1]-sangria,arrayBordasPagina[2]+sangria, arrayBordasPagina[3]+sangria];
						}
				}			
			}
		
		//Impar
		else{
			
			//Se pagina anterior for par
			if(numAntPagina%2 == 0){
				//Roda a função para setar a porcentagem
				ajustaPaginaImpar();
			
				myRectangle.geometricBounds = [arrayBordasPagina[0]-sangria, arrayBordasPagina[1],arrayBordasPagina[2]+sangria, arrayBordasPagina[3]+sangria];
				}
			//Se pagina anterior for null
			if(numAntPagina == null || numAntPagina%2 != 0){
				//Roda a função para setar a porcentagem
				ajustaPaginaImparAlt();

				myRectangle.geometricBounds = [arrayBordasPagina[0]-sangria, arrayBordasPagina[1]-sangria,arrayBordasPagina[2]+sangria, arrayBordasPagina[3]+sangria];
				}			
			else{
				//Roda a função para setar a porcentagem
				ajustaPaginaImpar();
				
				myRectangle.geometricBounds = [arrayBordasPagina[0]-sangria, arrayBordasPagina[1],arrayBordasPagina[2]+sangria, arrayBordasPagina[3]+sangria];
			}
			}
	
	}

//****************FUM FUNCAO AJUSTA SANGRIA

for(i=0; i < myDocument.pages.length;i++) {

		myPage = myDocument.pages[i];
		myRectangle = myPage.rectangles.item(0);
		
		//alert(myPage.name);
		arrayBordasPagina = myPage.bounds;
		if(myPage.rectangles.length > 0){
			ajustaSangria(arrayBordasPagina,i);
		}
}