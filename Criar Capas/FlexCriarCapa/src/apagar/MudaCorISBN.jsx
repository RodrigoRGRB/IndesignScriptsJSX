var isbnCorC = ""+100;
var isbnCorM = ""+0;
var isbnCorY = ""+0;
var isbnCorK = ""+0;
var isbnRotacao = "90";

var myDocument = app.activeDocument;

//Alinha o ISBN
//alert(myDocument.groups.length);

var myGroup = myDocument.groups[0];

//Se existir cor do ISBN, aplica
if(isbnCorC != "" && isbnCorM != "" && isbnCorY != "" && isbnCorK != ""){
    
    //Converte valores para inteiros
    isbnCorC = 1*isbnCorC;
    isbnCorM = 1*isbnCorM;
    isbnCorY = 1*isbnCorY;
    isbnCorK = 1*isbnCorK;
    var arrayCores = [isbnCorC,isbnCorM,isbnCorY,isbnCorK];
    
    //Aplica os valores para a swatch CorISBN
    myDocument.swatches.item("CorISBN").colorValue = arrayCores;
    
    //Aplica às barras
    for(x = 0;x<myGroup.rectangles.length;x++){
        
        //alert(myGroup.rectangles[x].fillColor.colorValue);
        myGroup.rectangles[x].fillColor = myDocument.swatches.item("CorISBN");

        }
    
    //Aplica ao texto
    for(x = 0; x<myGroup.textFrames.length; x++){
        
        var words = myGroup.textFrames[x].words;
        
        for(i = 0; i<words.length; i++){
            words[i].fillColor = myDocument.swatches.item("CorISBN");
            }
        }
    }

//Gira o ISBN
if(isbnRotacao != ""){
    isbnRotacao = isbnRotacao*1;
    myGroup.rotationAngle = isbnRotacao;
}