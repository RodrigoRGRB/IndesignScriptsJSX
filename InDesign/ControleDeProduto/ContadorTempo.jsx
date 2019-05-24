#targetengine session

var documentoAtual = app.activeDocument;

var numeroDocumentos = app.documents.length;
for(i = 0; i < numeroDocumentos; i++)
{
        alert(app.documents[i].metadataPreferences.description);
}

//REMOVE EVENTOS ANTERIORES DA JANELA
for (i=0; i< app.windows.length;i++)
{
    var array = app.windows[i].eventListeners;
    $.writeln(array.everyItem().name +"\n");
    array.everyItem().remove();
}


for (i=0; i< app.windows.length;i++)
{
    app.windows[i].addEventListener("beforeDeactivate", desativando ,false);
    app.windows[i].addEventListener("afterActivate", ativando ,false);
}

function desativando(event)
{
    var documentoAtual = app.activeDocument;
    
    alert(documentoAtual.name);
    
    if(documentoAtual.metadataPreferences.description  != "")
    {
        var string = documentoAtual.metadataPreferences.description;
        var data = new Date(string.substring(string.indexOf("<DATA>")+6,string.indexOf("</DATA>")));
        var minutosAtivo = parseInt(string.substring(string.indexOf("<MINUTOS>")+9,string.indexOf("</MINUTOS>")));
        
        var umMinuto = 1000*60;
        var minutosDoPeriodo = Math.ceil((new Date().getTime() - data.getTime())/umMinuto);
        
        alert("Calculando tempo aberto desde:\n" + data);
        alert("Minutos com o arquivo ativado: " + minutosDoPeriodo);
    }
    else
    {
        documentoAtual.metadataPreferences.description = "<DATA>" + new Date().toString() + "</DATA><MINUTOS>0</MINUTOS>";
    }
}

function ativando(event)
{
    var documentoAtual = app.activeDocument;
    
    alert(documentoAtual.name);
    
    if(documentoAtual.metadataPreferences.description  != "")
    {
        var string = documentoAtual.metadataPreferences.description;
        var data = new Date(string.substring(string.indexOf("<DATA>")+6,string.indexOf("</DATA>")));
        var minutosAtivo = parseInt(string.substring(string.indexOf("<MINUTOS>")+9,string.indexOf("</MINUTOS>")));
        
        var umMinuto = 1000*60;
        var minutosDoPeriodo = Math.ceil((new Date().getTime() - data.getTime())/umMinuto);
        
        //alert("Calculando tempo aberto desde:\n" + data);
        //alert("Minutos com o arquivo ativado: " + minutosDoPeriodo);
    }
    else
    {
        documentoAtual.metadataPreferences.description = "<DATA>" + new Date().toString() + "</DATA><MINUTOS>0</MINUTOS>";
    }
}