

flashPlayer.adicionarArquivo = function()
{
//function adicionarArquivo(teste){
    
    //alert("teste");
    
    //alert("aqui");
    //var caminho = File.saveDialog("Salvar aqruivo", "*.pdf");
    /*
    var caminho = File.saveDialog("Salvar arquivo");    
    return caminho;
    */
    
    return "teste";
    
    }


//************** AÇÕES DO PROGRAMA ANTES DA EXIBIÇÃO DA JANELA **************

// Tells us where this script is running from
var scriptsFile = new File($.fileName);

//var flashPalette = new Window('palette', 'Escala - Lucas ®',);
var flashPalette = new Window('dialog', 'Capa Generator Plus - Lucas ®',);

// Set the player bounds to match the palette
var cBounds = flashPalette.frameBounds;
flashPalette.margins = [0,0,0,0];
//alert(flashPalette.margins);
// add the Flash Player control to the palette.	

//alert(flashPalette.opacity = 0.5);

var flashPlayer = flashPalette.add("flashplayer", cBounds);
flashPlayer.preferredSize = [1000, 800];

var scriptsFile = new File($.fileName);
//this.flashFile = new File(scriptsFile.parent.parent.fsName + "/resources/ScriptEscala.swf");
this.flashFile = new File(scriptsFile.parent.fsName + "/teste.swf");
flashPlayer.loadMovie(this.flashFile);  


//************** FIM DAS AÇÕES DO PROGRAMA ANTES DA EXIBIÇÃO DA JANELA **************

//adicionarArquivo();

flashPalette.show();