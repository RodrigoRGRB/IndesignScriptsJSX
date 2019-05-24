function imprimirPaginas(){

var cResponse = app.response({
cQuestion: "Insira as páginas que deseja imprimir. Ex: 1,5,10-19,25",
cTitle: "Imprimir",
cDefault: "",
cLabel: "Pages:"
});

if ( cResponse == null) {
    app.alert("Nenhuma página adicionada");
} else {
   var strInput = cResponse;
   var strChar;
   var arPrint = new Array(10);
   var arCount = 0;
   arPrint[arCount] = "";

  for (var i = 0; i < strInput.length; i++){

  strChar = strInput.substr(i,1);

    //Check character and form page group
    if (IsInteger(strChar) == 0){
        arPrint[arCount] = arPrint[arCount] + strChar;
    }

    if (IsDash(strChar) == 0){
        arPrint[arCount] = arPrint[arCount] + strChar;
    }

    if (IsComma(strChar) == 0){
        arCount++;
        arPrint[arCount] = "";
    }

}

 for (i=0;i<(arCount+1);i++){

     if (arPrint[i].indexOf("-") > 0){
            var dashPos;
            dashPos = (arPrint[i].indexOf("-"));

            var pageStart = arPrint[i].substr(0,dashPos);
            var pageEnd = arPrint[i].substr(arPrint[i].indexOf("-")+1,
                          (arPrint[i].length - dashPos+1));

            this.print({
                bUI: false,
                nStart: pageStart - 1,
                nEnd: pageEnd - 1,
                bSilent: true
                });

     } else {
            this.print({
                bUI: false,
                nStart: arPrint[i] - 1,
                nEnd: arPrint[i] - 1,
                bSilent: true
                });
     }
 }
}

function IsComma(strChar){

    if (strChar == ",") {
        return 0;
    } else {
        return -1;
    }
}

function IsSpace(strChar){
    if (strChar == " ") {
        return 0;
    } else {
        return -1;
    }
}

function IsDash(strChar){
    if (strChar == "-") {
        return 0;
    } else {
        return -1;
    }
}

function IsInteger(strChar){
    if (strChar >=0 || strChar <= 9) {
        return 0;
    } else {
        return -1;
    }
}



}

// add a toolbutton
app.addToolButton({
cName: "imprimirPaginas",
cExec: "imprimirPaginas()",
cTooltext: "Imprimir Paginas",
cEnable: true,
nPos: 0
});

//app.removeToolButton("botaoBookmarks");
