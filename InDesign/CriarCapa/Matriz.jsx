//************* FUNCAO PARA CRIAR CÓDIGO DE BARRAS *************

function criaISBN(funcaoNumeroISBN,myDocument){

var arrayImpar = [];
arrayImpar[0] = "0001101";
arrayImpar[1] = "0011001";
arrayImpar[2] = "0010011";
arrayImpar[3] = "0111101";
arrayImpar[4] = "0100011";
arrayImpar[5] = "0110001";
arrayImpar[6] = "0101111";
arrayImpar[7] = "0111011";
arrayImpar[8] = "0110111";
arrayImpar[9] = "0001011";

var arrayPar = [];
arrayPar[0] = "0100111";
arrayPar[1] = "0110011";
arrayPar[2] = "0011011";
arrayPar[3] = "0100001";
arrayPar[4] = "0011101";
arrayPar[5] = "0111001";
arrayPar[6] = "0000101";
arrayPar[7] = "0010001";
arrayPar[8] = "0001001";
arrayPar[9] = "0010111";

var arrayR = [];
arrayR[0] = "1110010";
arrayR[1] = "1100110";
arrayR[2] = "1101100";
arrayR[3] = "1000010";
arrayR[4] = "1011100";
arrayR[5] = "1001110";
arrayR[6] = "1010000";
arrayR[7] = "1000100";
arrayR[8] = "1001000";
arrayR[9] = "1110100";

var arrayCodificacao = [];
arrayCodificacao[0] = "iiiiii";
arrayCodificacao[1] = "iipipp";
arrayCodificacao[2] = "iippip";
arrayCodificacao[3] = "iipppi";
arrayCodificacao[4] = "ipiipp";
arrayCodificacao[5] = "ippiip";
arrayCodificacao[6] = "ipppii";
arrayCodificacao[7] = "ipipip";
arrayCodificacao[8] = "ipippi";
arrayCodificacao[9] = "ippipi";


//var isbn = "4012345678901";
var isbn = funcaoNumeroISBN;
isbn = isbn.split("");

//alert(isbn[12]);

var isbnEsquerda = [isbn[1],isbn[2],isbn[3],isbn[4],isbn[5],isbn[6]];
//alert(isbnEsquerda);

var isbnDireita = [isbn[7],isbn[8],isbn[9],isbn[10],isbn[11],isbn[12]];
//alert(isbnDireita);

//************ CALCULA NUMEROS DA COLUNA DIREITA DO ISBN *****************

var numerosBinariosEsquerda = "";

var codificacao = arrayCodificacao[isbn[0]];
codificacao = codificacao.split("");
//alert(codificacao);
//alert(isbn[0] +" tem codificacao "+codificacao);

for(i=0;i<isbnEsquerda.length;i++){
    
    if(codificacao[i] == "i"){
        numerosBinariosEsquerda = numerosBinariosEsquerda+arrayImpar[isbnEsquerda[i]];
        }
    else{
        numerosBinariosEsquerda = numerosBinariosEsquerda+arrayPar[isbnEsquerda[i]];
        }    
    }
    
//alert(numerosBinariosEsquerda);

//************ FIM DA COLUNA ESQUERDA DO ISBN *****************

//************ CALCULA NUMEROS DA COLUNA DIREITA DO ISBN *****************
var numerosBinariosDireita = "";

for(i=0;i<isbnDireita.length;i++){
    numerosBinariosDireita = numerosBinariosDireita+arrayR[isbnDireita[i]];
    }

//alert(numerosBinariosDireita);

//************ FIM DA COLUNA DIREITA DO ISBN *****************

var numerosBinariosFinal = numerosBinariosEsquerda+numerosBinariosDireita;

//alert(numerosBinariosFinal);

constroiISBN(numerosBinariosFinal,myDocument);

//*********** ADICIONA OS NÚMEROS DO ISBN********************************

/*
myDocument = app.activeDocument;
var isbn = "9788598293295";
isbn = isbn.split("");
*/

myRectangle = myDocument.groups[12];

//Preenche o número acima do código
var numeroISBNSeparado = "ISBN "+isbn[0]+isbn[1]+isbn[2]+"-"+isbn[3]+isbn[4]+"-"+isbn[5]+isbn[6]+isbn[7]+isbn[8]+isbn[9]+"-"+isbn[10]+isbn[11]+"-"+isbn[12]
myRectangle.textFrames[0].contents = numeroISBNSeparado;
//myRectangle.textFrames[0].contents = numeroISBNSeparado;

//Ajusta largura do textFrame
myRectangle.textFrames[0].fit(FitOptions.FRAME_TO_CONTENT);

//alert(myRectangle.textFrames[0].geometricBounds);
var larguraDoFrame = myRectangle.textFrames[0].geometricBounds[3]-myRectangle.textFrames[0].geometricBounds[1];
//alert(larguraDoFrame);

var larguraDaBarra = 28.197;

var porcentagem = (larguraDoFrame*100)/larguraDaBarra;
while(porcentagem<101){
myRectangle.textFrames[0].horizontalScale = 101;
    larguraDoFrame = myRectangle.textFrames[0].geometricBounds[3]-myRectangle.textFrames[0].geometricBounds[1];
    porcentagem = (larguraDoFrame*100)/larguraDaBarra;
    //alert(porcentagem);
}

//Preenche os números abaixo do código
for(x=0; x < myRectangle.textFrames.length-1;x++){

    myRectangle.textFrames[x+1].contents = ""+isbn[x];

}

//*********** FIM ADICIONA OS NÚMEROS DO ISBN********************************

}


function constroiISBN(numerosBinariosFinalTemp,myDocumentTemp){

            //myDocument = app.activeDocument;
            var myDocument = myDocumentTemp;

            /*
            var numeroDeBarras = myDocument.rectangles;
            var numeroDeBarrasContador = numeroDeBarras.length;
            //alert(myDocument.rectangles.length);
            */
            
            var numeroDeBarras = myDocument.groups[12].rectangles;
            var numeroDeBarrasContador = numeroDeBarras.length;

            var numerosBinariosFinal =""+numerosBinariosFinalTemp;
            numerosBinariosFinal = numerosBinariosFinal.split("");
            //alert(numerosBinariosFinal);
            //alert(numeroDeBarras.length);

            // ********************* Exclui as barras do código de barras **************
            var y = 0;
            for(x = 2; x < numeroDeBarrasContador; x++){
                //alert(x);
                //alert(y);
                //Pula as 2 barras centrais
                if(y == 44){
                    x = x+2;
                    }
                
                if(numerosBinariosFinal[y] == "0"){
                    numeroDeBarras[x].remove();
                    x--
                    numeroDeBarrasContador--
                    }
                
                y++
                
                }
            // ********************* Fim exclui as barras do código de barras **************
    }

//************* FIM FUNCAO PARA CRIAR CÓDIGO DE BARRAS *************

//criaISBN("4012345678901",app.activeDocument);
//criaISBN("9788598293158",app.activeDocument);
criaISBN("9788598293295",app.activeDocument);












