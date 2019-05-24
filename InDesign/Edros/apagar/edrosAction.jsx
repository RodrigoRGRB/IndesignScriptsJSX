//Adiciona o programa do Edros para cada documento aberto
#targetengine session

var eventListener1 = app.addEventListener("afterOpen", openEvent, false);

function openEvent()
{
    var arquivo = new File("//rede-sj/Dados/banco de imagens/Objetos/Scripts/InDesign/Edros/EdrosLink.jsx");

    try{
        //Se não existir nenhum evento, adiciona um novo
        if(app.activeDocument.eventListeners.length == 0){
                app.activeDocument.eventListeners.add("beforeClose", arquivo);
            }
        }
    catch(e){
        }
    
}