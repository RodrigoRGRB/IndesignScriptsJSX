//Adiciona os números do ISBN

myDocument = app.activeDocument;

var isbn = "9788598293295";
isbn = isbn.split("");

//Preenche o número acima do código
var numeroISBNSeparado = "ISBN "+isbn[0]+isbn[1]+isbn[2]+"-"+isbn[3]+isbn[4]+"-"+isbn[5]+isbn[6]+isbn[7]+isbn[8]+isbn[9]+"-"+isbn[10]+isbn[11]+"-"+isbn[12]
myDocument.textFrames[0].contents = numeroISBNSeparado;

//Ajusta largura do textFrame
myDocument.textFrames[0].fit(FitOptions.FRAME_TO_CONTENT);

//alert(myDocument.textFrames[0].geometricBounds);
var larguraDoFrame = myDocument.textFrames[0].geometricBounds[3]-myDocument.textFrames[0].geometricBounds[1];
//alert(larguraDoFrame);

var larguraDaBarra = 28.197;

var porcentagem = (larguraDoFrame*100)/larguraDaBarra;
while(porcentagem<101){
myDocument.textFrames[0].horizontalScale = 101;
    larguraDoFrame = myDocument.textFrames[0].geometricBounds[3]-myDocument.textFrames[0].geometricBounds[1];
    porcentagem = (larguraDoFrame*100)/larguraDaBarra;
    //alert(porcentagem);
}

//Preenche os números abaixo do código
for(x=0; x < myDocument.textFrames.length-1;x++){

    myDocument.textFrames[x+1].contents = ""+isbn[x];

}

//Fim adiciona os números do ISBN