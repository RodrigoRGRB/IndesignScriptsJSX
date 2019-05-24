try{
    
//Muda a unidade de medida atual para milimetros
var guardaMedidaHorizontal = app.activeDocument.viewPreferences.horizontalMeasurementUnits;
var guardaMedidaVertical = app.activeDocument.viewPreferences.verticalMeasurementUnits;

with(app.activeDocument.viewPreferences){
    horizontalMeasurementUnits = MeasurementUnits.millimeters;
    verticalMeasurementUnits = MeasurementUnits.millimeters;
}


//************ INICIO PROGRAMA *************

//alert(app.selection);

var objetosSelecionados = app.selection;

//alert(objetosSelecionados.length);

if(objetosSelecionados.length != 2){
    throw "Selecione 2 objetos";
    }

//Confere qual retangulo está acima
if(objetosSelecionados[0].geometricBounds[0] < objetosSelecionados[1].geometricBounds[0]){
    var primeiroRetangulo = objetosSelecionados[0];
    var segundoRetangulo = objetosSelecionados[1];
}
else{
    var primeiroRetangulo = objetosSelecionados[1];
    var segundoRetangulo = objetosSelecionados[0];
    }

//alert(primeiroRetangulo.geometricBounds);
//alert(segundoRetangulo.geometricBounds);

var arrayPrimeiro = primeiroRetangulo.geometricBounds;
var arraySegundo = segundoRetangulo.geometricBounds;

arraySegundo[1] = arrayPrimeiro[1];
arraySegundo[3] = arrayPrimeiro[3];

var altura = arraySegundo[2] - arraySegundo[0];

var espessuraDaLinha = primeiroRetangulo.strokeWeight;

//converte pt para mm
espessuraDaLinha = espessuraDaLinha / 2.83286118980169971671388101983;

//alert(primeiroRetangulo.strokeAlignment);


if(primeiroRetangulo.strokeAlignment == "1936998729"){ //INSIDE_ALIGNMENT
    
    //alert("inside");
    
    espessuraDaLinha = 0;
    
    }
else if(primeiroRetangulo.strokeAlignment == "1936998723"){ //CENTER_ALIGNMENT
    
    //alert("center");
    
    espessuraDaLinha = espessuraDaLinha / 2;
    
    }

//if(primeiroRetangulo.strokeAlignment == 

arraySegundo[0] = arrayPrimeiro[2] + 1 + espessuraDaLinha; //mm
arraySegundo[2] = arrayPrimeiro[2] + 1 + espessuraDaLinha+ altura; //mm

segundoRetangulo.geometricBounds = arraySegundo;

//Tenta ajustar o tamanho da legenda
//alert(segundoRetangulo);
if(segundoRetangulo == "[object TextFrame]"){
    
    segundoRetangulo.fit(FitOptions.frameToContent);
    
    }

//Devolve a largura ao objeto depois do fit

//segundoRetangulo.geometricBounds = arraySegundo;


//alert("Objetos alinhados","Lucas ®",false);

//Devolve a unidade de medida original
//var myDocument = app.activeDocument;
with(app.activeDocument.viewPreferences){
    horizontalMeasurementUnits = guardaMedidaHorizontal;
    verticalMeasurementUnits = guardaMedidaVertical;
}

}
catch(e){
    
    alert(e,"Lucas ®",true);
    
    }

//************ FIM PROGRAMA *************