#targetengine "session"

//============================================================================================================================
//Variáveis globais

var listaDeLinks;
var separador = ","
var log;
var relatorioFoiSalvo;
var myFolder = Folder.selectDialog( "Selecione a pasta que contém arquivos do Indesign." );

if(myFolder != null)
    var caminhoRelatorio = Folder.selectDialog( "Escolha a pasta para o relatório." );
    
var resultadoRelatorio;
var crashFilesOriginal;
var crashFilesArray;

//============================================================================================================================

function salvaRelatorio(relatorio, caminhoRelatorio){ 
    
    try
    {
        var arquivo = new File(caminhoRelatorio);
        arquivo.open( "r" );
        var texto = arquivo.read();

        arquivo.open("w");
        if(texto == "")
            arquivo.write("Nome do arquivo Indesign,Está corrompido?,Link\n" + relatorio); 
        else
            arquivo.write(texto + "\n" + relatorio); 

        arquivo.close(); 
        return true;
    }
    catch(e)
    {
        alert(e);
        return false;
    }

}


//============================================================================================================================

function salvaLog(pastaEscaneada, caminhoRelatorio, dataDeInicio, relatorioFoiSalvo){
    
    try
    {
        var caminho = "//rede-sj/Dados/banco de imagens/Objetos/Scripts/InDesign/RelatorioDeLinks/log.txt";
        var arquivo = new File(caminho);
        arquivo.open( "r" );
        
        var logString = arquivo.read();        
        var logString = logString + "\n";
        
        //Data do início
        var dataDeInicioString = dataDeInicio.getDate() + "/" + (dataDeInicio.getMonth() + 1) + "/" + dataDeInicio.getFullYear();
        
        //Tempo de Execução (hora:minutos:segundos)
        var umaHora = 1000*60*60;
        var umMinuto = 1000*60;
        var umSegundo = 1000;

        var dataDeTermino = new Date();
        var totalHoras = Math.ceil((dataDeTermino.getTime() - dataDeInicio.getTime())/umaHora)-1;
        var totalMinutos = (Math.ceil((dataDeTermino.getTime() - dataDeInicio.getTime())/umMinuto)%60);
        var totalSegundos = Math.ceil((dataDeTermino.getTime() - dataDeInicio.getTime())/umSegundo)%60;
        
        var tempoDeExecucao = totalHoras + ":" + totalMinutos + ":" + totalSegundos;
        
        //Usuário
        var usuario = $.getenv('USERNAME');
        
        //Cria linha do log
        logString = logString + pastaEscaneada + "," + dataDeInicioString + "," + tempoDeExecucao + "," + caminhoRelatorio + "," + relatorioFoiSalvo + "," + usuario; 
        
        arquivo.open( "w" ); 
        arquivo.write(logString); 
        arquivo.close(); 
    }
    catch(e)
    {
        alert(e);
    }

}


//============================================================================================================================

function GetSubFolders(theFolder) {
     var myFileList = theFolder.getFiles();
     for (var i = 0; i < myFileList.length; i++) {
          var myFile = myFileList[i];
          myProgressPanel.pnl.myProgressBarLabelInferior.text = myFile.fsName;
          
          if (myFile instanceof Folder){
               GetSubFolders(myFile);
          }
          else if (myFile instanceof File && myFile.name.match(/\.indd$/i)) {
               myFiles.push(myFile);
          }
     }
}

//============================================================================================================================

function estaCorrompido(arquivo)
{
    for(var i = 0; i < crashFilesArray.length; i++) {
        if(crashFilesArray[i] == arquivo) {
            return true;
        }
    }
    return false;
}

//============================================================================================================================

function replaceAll(string, token, newtoken) {
	while (string.indexOf(token) != -1) {
 		string = string.replace(token, newtoken);
	}
	return string;
}

//============================================================================================================================
//Progress Bar

var myProgressPanel = new Window("palette", "Relatório de links do Indesign", [150, 150, 900, 270]); 
this.windowRef = myProgressPanel;

myProgressPanel.pnl = myProgressPanel.add("panel", [10, 10, 740, 115], "");
myProgressPanel.pnl.myProgressBarLabel = myProgressPanel.pnl.add("statictext", [15, 13, 410, 35], "Iniciando script");
myProgressPanel.pnl.myProgressBar = myProgressPanel.pnl.add("progressbar", [15, 35, 710, 60], 0, 200);
myProgressPanel.pnl.myProgressBarLabelInferior = myProgressPanel.pnl.add("statictext", [15, 70, 710,400], "");
myProgressPanel.center();

//============================================================================================================================

app.linkingPreferences.checkLinksAtOpen = false;

//Cria o crashfiles - arquivos que o Indesign não está conseguindo abrir
var crashFile = new File("//rede-sj/Dados/banco de imagens/Objetos/Scripts/InDesign/RelatorioDeLinks/crashfiles.crash");
crashFile.open( "r" );
var crashFilesOriginal = crashFile.read();
var crashFilesArray = crashFilesOriginal.split("\n");

if ( myFolder != null && caminhoRelatorio != null) {
    
    var dataDeInicio = new Date();
    var dataString = dataDeInicio.getDate() + "" + (dataDeInicio.getMonth() + 1) + "" + dataDeInicio.getFullYear() + "_" + dataDeInicio.getHours() + "h" + dataDeInicio.getMinutes();
    var nomeDoRelatorio = replaceAll (myFolder.fsName, "\\", "_")
    nomeDoRelatorio = nomeDoRelatorio.replace(":","");
    nomeDoRelatorio = nomeDoRelatorio.replace("__","");
    caminhoRelatorio = caminhoRelatorio + "/" + nomeDoRelatorio + "_" + dataString + ".csv";
    

    
    //Cria arquivo do relatório
    var arquivo = new File(caminhoRelatorio);
    arquivo.open( "w" ); 
    arquivo.write(""); 
    arquivo.close(); 

     var myFiles = [];
     
     //Exibe Progress Bar 
    myProgressPanel.pnl.text = "Relatório de links do Indesign";
    myProgressPanel.pnl.myProgressBarLabel.text = "Aguarde... Procurando arquivos do Indesign nas subpastas...";
    myProgressPanel.pnl.myProgressBarLabelInferior.text = "Procurando arquivos nas subpastas...";
    myProgressPanel.pnl.myProgressBar.maxvalue = 100;
    myProgressPanel.pnl.myProgressBar.value = 0;
    myProgressPanel.show();
     
     GetSubFolders(myFolder);
     
     if ( myFiles.length > 0 )
     {
         //Atualiza Progress Bar
         myProgressPanel.pnl.text = "Relatório de links do Indesign"; 

        for ( i=0; i < myFiles.length; i++ )
        {
            //Atualiza Progress Bar
            myProgressPanel.pnl.myProgressBar.value = (i + 1)*100/(myFiles.length * 1) ;
            myProgressPanel.pnl.myProgressBarLabel.text = myFiles[i].displayName;
            myProgressPanel.pnl.myProgressBarLabelInferior.text = "Abrindo arquivo " + (i+1) + " de " +  myFiles.length + ". Abrindo as " + new Date().getHours() + ":" + new Date().getMinutes();
                
            try
            {
                if (estaCorrompido(myFiles[i].fsName))
                {
                    salvaRelatorio(myFiles[i].fsName + separador + "Sim" + separador, caminhoRelatorio);
                    continue;
                }
            
                //Adiciona arquivo atual ao crashfiles
                crashFile.open( "w" ); 
                crashFile.write(crashFilesOriginal + "\n" + myFiles[i].fsName); 
                crashFile.close(); 
                
                var arquivoAberto = app.open(myFiles[i], false, OpenOptions.OPEN_COPY);

                if (arquivoAberto.links.length > 0)
                {
                    var dadosDaLinha = myFiles[i].fsName + separador + "Não" + separador;
                    listaDeLinks =  dadosDaLinha + arquivoAberto.links.everyItem().filePath.join("\n" + dadosDaLinha);
                }
            
                //Exclui arquivo atual do crashfiles
                crashFile.open( "w" ); 
                crashFile.write(crashFilesOriginal); 
                crashFile.close(); 
            }
            catch (e)
            {
                crashFilesOriginal = crashFilesOriginal + "\n" + myFiles[i].fsName
                salvaRelatorio(myFiles[i].fsName + separador + "Sim" + separador, caminhoRelatorio);
                //relatorio = relatorio + "\n" + myFiles[i].fsName + separador;
            }
        
            try
            {
                arquivoAberto.close(SaveOptions.NO);
            }
            catch (e) {}
            
            resultadoRelatorio = salvaRelatorio(listaDeLinks, caminhoRelatorio);
        }
        
        relatorioFoiSalvo = resultadoRelatorio;
        
        if(resultadoRelatorio) 
            alert("Relatório concluído","Relatório finalizado.");
        else
            alert("Erro ao salvar relatório","Não foi possível savar o relatório.");
     }
	 else
	 {
		alert("Nenhum arquivo do Indesign encontrado nas pastas e subpastas.","Erro");
	 }
 
     //Fecha Progress Bar
    myProgressPanel.close();
    
    //Salva Log
    salvaLog(myFolder.fsName, caminhoRelatorio, dataDeInicio, relatorioFoiSalvo);
}

app.linkingPreferences.checkLinksAtOpen = true;
 














