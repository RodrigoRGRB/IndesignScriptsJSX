var myDocument = app.activeDocument;

var seloPath = "/d/temp.ai";
var seloX = 150;
var seloY = 200;

//Verifica se existe selo
if(seloPath != "" && seloX != "" && seloY != ""){
    
    seloX = seloX*1;
    seloY  = seloY *1;
/*
     //*************  ATUALIZA PROGRESS BAR ******************
    myProgressPanel.pnl.text = "INSERINDO SELO";
    myProgressPanel.pnl.myProgressBarLabel.text = "Inserindo selo...";
    myProgressPanel.pnl.myProgressBar.value = 4;
    //*************  FIM ATUALIZA PROGRESS BAR ******************
    */

    //Insere arquivo ISBN
    var retangulo = myDocument.pages[0].place(File(seloPath), [0,0])[0];
    var larguraRetangulo = (retangulo.geometricBounds[3]-retangulo.geometricBounds[1])/2;
    var alturaRetangulo = (retangulo.geometricBounds[2]-retangulo.geometricBounds[0])/2;

    //Alinha o conteúdo
    retangulo.geometricBounds = [seloY-alturaRetangulo,seloX-larguraRetangulo ,seloY+alturaRetangulo,seloX+larguraRetangulo ];
    
    //Alinha o retangulo externo
    retangulo.parent.geometricBounds = retangulo.geometricBounds;

}