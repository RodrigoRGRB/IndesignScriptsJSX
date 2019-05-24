myDocument = app.activeDocument;

var numeroDeBarras = myDocument.rectangles;
var numeroDeBarrasContador = numeroDeBarras.length;
//alert(myDocument.rectangles.length);

var numerosBinariosFinal = "000111000111000111000111000111000111";
numerosBinariosFinal = numerosBinariosFinal.split("");
//alert(numerosBinariosFinal);
//alert(numeroDeBarras.length);

var y = 0;

for(x = 2; x < numeroDeBarrasContador; x++){
    //alert(x);
    //alert(y);
    
    if(numerosBinariosFinal[y] == "0"){
        numeroDeBarras[x].remove();
        x--
        numeroDeBarrasContador--
        }
    
    y++
    
    }
    