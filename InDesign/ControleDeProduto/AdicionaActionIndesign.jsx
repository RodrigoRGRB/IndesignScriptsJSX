//Adiciona o programa do Edros para cada documento aberto
#targetengine session

//REMOVE EVENTOS ANTERIORES DO APPLICATION
var array = app.eventListeners;
$.writeln(array.everyItem().name +"\n");
array.everyItem().remove();

//REMOVE EVENTOS ANTERIORES DA JANELA
for (i=0; i< app.windows.length;i++)
{
    var array = app.windows[i].eventListeners;
    $.writeln(array.everyItem().name +"\n");
    array.everyItem().remove();
}

//ADICIONA EVENTOS
app.addEventListener("afterOpen", Open, false);
app.addEventListener("beforeClose", Close, false);

//AÇÃO AO ABRIR O ARQUIVO
function Open(event)
{
    if(app.layoutWindows.length == app.documents.length) 
    {
        documentoAtual = event.parent.parent;
        
        if(documentoAtual.saved)
        {
            var arquivo = documentoAtual.fullName;
            var navegador_url = "http://localhost:5731/WebSite/ControleDeProduto.aspx?abrindoArquivo=true&tipoAtividade=diagramacao&arquivo=" + arquivo;
            
            #include "/I/Objetos/Scripts/NavegadorAir/bin-debug/Navegador_AdobeScript.jsx"
        }
        else
        {
            app.activeDocument.metadataPreferences.description = "<task><activityid></activityid><actualdurationminutes>0</actualdurationminutes></task>"; 
        }
    }
}

//AÇÃO AO FECHAR O ARQUIVO
function Close(event)
{
    if(app.layoutWindows.length == app.documents.length) 
    {
        documentoAtual = event.parent.parent;
        
        if(documentoAtual.saved)
        {
            var arquivo = documentoAtual.fullName;
            //var navegador_url = "http://localhost:5731/WebSite/ControleDeProduto.aspx?abrindoArquivo=false&tipoAtividade=diagramacao&arquivo=" + arquivo;
            var navegador_url = "http://localhost:5731/WebSite/ControleDeProduto.aspx?abrindoArquivo=false&activityid=99999&actualdurationminutes=0"
            #include "/I/Objetos/Scripts/NavegadorAir/bin-debug/Navegador_AdobeScript.jsx"
        }
    }
}

