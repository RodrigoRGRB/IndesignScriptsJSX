//Salva relatório
function salvaRelatorio(relatorio){
    
    try{
    //****************Local para criar o arquivo*******************
    var caminho = "/I/Objetos/Scripts/InDesign/CriarCapa/FlexCriarCapa/src/arquivos/log.txt";

    //****************Cria o arquivo *******************
    var arquivo = new File(caminho);

    arquivo.open( "r" );
    var texto = arquivo.read();

    //alert(texto);

    //var teste = "Teste de escrita";

    arquivo.open( "w" ); 
    arquivo.write(texto+"\n"+relatorio); 
    arquivo.close(); 

    //alert("Flash configurado!","Flash - Lucas ®");

    }
    catch(e){
        
        //alert(e);
        
        }

}

salvaRelatorio("relatiorioOK");