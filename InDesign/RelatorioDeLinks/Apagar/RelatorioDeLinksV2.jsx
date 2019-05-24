#targetengine "session"

//============================================================================================================================
//Variáveis globais

var relatorio = "Nome do arquivo Indesign,Link"
var listaDeLinks;
var separador = ","
var log;
var relatorioFoiSalvo;
var myFolder = Folder.selectDialog( "Selecione a pasta que contém arquivos do Indesign." );
var caminhoRelatorio = File.saveDialog ('Escolha o arquivo para salvar o relatório', 'Arquivo separado por vírgula:*.csv');
caminhoRelatorio = caminhoRelatorio.fsName;

//============================================================================================================================

function salvaRelatorio(relatorio, caminhoRelatorio){ 
    
    try
    {
        var arquivo = new File(caminhoRelatorio);
        arquivo.open( "r" );
        var texto = arquivo.read();

        arquivo.open("w"); 
        arquivo.write(relatorio); 

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
        //var logString = "Pasta Escaneada,Data do início,Tempo de Execução (minutos),Relatório,Concluído com Sucesso?,Usuário";
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

var dataDeInicio = new Date();
var dataString = dataDeInicio.getFullYear() + "" + (dataDeInicio.getMonth() + 1) + "" + dataDeInicio.getDate();
caminhoRelatorio = caminhoRelatorio.split(".csv")[0] + "_" + dataString + ".csv";

if ( myFolder != null && caminhoRelatorio != null) {
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
            myProgressPanel.pnl.myProgressBar.value = (i + 2)*100/(myFiles.length * 1) ;
            myProgressPanel.pnl.myProgressBarLabel.text = myFiles[i].displayName;
            myProgressPanel.pnl.myProgressBarLabelInferior.text = "Abrindo arquivo " + (i+1) + " de " +  myFiles.length + ".";
                
            try
            {
                var arquivoAberto = app.open(myFiles[i], false, OpenOptions.OPEN_COPY);

                if (arquivoAberto.links.length > 0)
                {
                    var dadosDaLinha = myFiles[i].fsName + separador;
                    listaDeLinks =  dadosDaLinha + arquivoAberto.links.everyItem().filePath.join("\n" + dadosDaLinha);
                }
            }
            catch (e)
            {
                relatorio = relatorio + "\n" + myFiles[i].fsName + separador;
            }
        
            try
            {
                arquivoAberto.close(SaveOptions.NO);
            }
            catch (e) {}
            
            relatorio = relatorio + "\n" + listaDeLinks ;
        }

        var resultado = salvaRelatorio(relatorio, caminhoRelatorio);
        
        relatorioFoiSalvo = resultado;
        
        if(resultado)
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
 














