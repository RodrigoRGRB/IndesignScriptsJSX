#targetengine "session"

//============================================================================================================================
//VARIÁVEIS GLOBAIS

var listaDeLinks = null;
var separador = ",";
var log = null;
var relatorioFoiSalvo = null;
var caminhoRelatorio = null;
var myFolder = Folder.selectDialog( "Selecione a pasta que contém arquivos do Indesign.\nAs subpastas também serão analisadas",  Folder('//rede-sj/dados/atual'));
var dataDeInicio = new Date();
var relatorioContinuado = false;
var totalDeArquivosAbertos = null;
var arquivoAberto = null;
var arquivosDoRelatorioExistente = null;
var resultadoRelatorio = null;
var crashFilesOriginal = null;
var crashFilesArray = null;

if(myFolder != null)
{
    var nomeDoRelatorio = replaceAll (myFolder.fsName, "\\", "_")
    nomeDoRelatorio = nomeDoRelatorio.replace(":","");
    nomeDoRelatorio = nomeDoRelatorio.replace("__","") + ".csv";
    
//~     caminhoRelatorio = Folder.selectDialog( "Escolha a pasta para salvar o relatório '"+ nomeDoRelatorio + "'.\nSe houver um relatorio com esse mesmo nome na pasta escolhida, o relatório será continuado." );    
    caminhoRelatorio = Folder.selectDialog( "Escolha a pasta para salvar o relatório '"+ nomeDoRelatorio + "'.\nSe houver um relatorio com esse mesmo nome na pasta escolhida, o relatório será continuado.", Folder('/d/lucas/relatorios'));
    
    if(caminhoRelatorio != null)
    {
        caminhoRelatorio = new File(caminhoRelatorio + "/" + nomeDoRelatorio);
    }
    nomeDoRelatorio = null;
}

if(caminhoRelatorio != null)
{
    if(caminhoRelatorio.exists)
    {
        relatorioContinuado = true;
        caminhoRelatorio.open( "r" );
        arquivosDoRelatorioExistente = caminhoRelatorio.read().split("\n");
        
        arquivosDoRelatorioExistente[0] = "";
        
        for (i=1; i < arquivosDoRelatorioExistente.length; i++)
        {
            arquivosDoRelatorioExistente[i] = arquivosDoRelatorioExistente[i].split(",")[0];
        }

        arquivosDoRelatorioExistente = arrayRemoveValoresDuplicados(arquivosDoRelatorioExistente);

        caminhoRelatorio.close();
    }
    else
    {
        var arquivo = new File(caminhoRelatorio);
        arquivo.open( "w" );
        arquivo.write("");
        arquivo.close();
        arquivo = null;
    }


    caminhoRelatorio = caminhoRelatorio.fsName; 
}

//============================================================================================================================

function arrayRemoveValoresDuplicados(a)
{
    temp = new Array();
    for(i=0;i<a.length;i++)
    {
        if(!contains(temp, a[i]))
        {
            temp.length+=1;
            temp[temp.length-1]=a[i];
        }
 }
 return temp;
}

function contains(a, e)
{
    for(j=0;j<a.length;j++)
    {
        if(a[j]==e)return true;
    }

    return false;
}

//============================================================================================================================

function salvaRelatorio(relatorio, caminhoRelatorio){ 
    
    try
    {
        var arquivo = new File(caminhoRelatorio);
        arquivo.open( "r" );
        var texto = arquivo.read();

        arquivo.open("w");
        if(texto == "")
        {
            arquivo.write("Nome do arquivo Indesign,Está corrompido?,Existe links?,Link\n" + relatorio); 
        }
        else
        {
            arquivo.write(texto + "\n" + relatorio); 
        }

        arquivo.close(); 
        arquivo = null;
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
        logString = logString + pastaEscaneada + "," + dataDeInicioString + "," + tempoDeExecucao + "," + caminhoRelatorio + "," + relatorioFoiSalvo + "," + usuario + "," + totalDeArquivosAbertos; 
        
        arquivo.open( "w" ); 
        arquivo.write(logString); 
        arquivo.close();
        logString = null;
        arquivo = null;
    }
    catch(e)
    {
        alert(e);
    }

}

//============================================================================================================================

function GetSubFolders(theFolder) {
    
     caminhoRelatorio = new File(caminhoRelatorio);
     
     var myFileList = theFolder.getFiles();
     for (var i = 0; i < myFileList.length; i++) {
          var myFile = myFileList[i];
          myProgressPanel.pnl.myProgressBarLabelInferior.text = myFile.fsName;
          
          if (myFile instanceof Folder)
          {
               GetSubFolders(myFile);
          }
          else if (myFile instanceof File && myFile.name.match(/\.indd$/i))
          {

                if (caminhoRelatorio.exists && relatorioContinuado && arquivosDoRelatorioExistente.length > 0 && arquivoEstaNoRelatorioAtual(myFileList[i].fsName))
                {
                    continue;
                }
            
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

function arquivoEstaNoRelatorioAtual(arquivo)
{
    for(var i = 0; i < arquivosDoRelatorioExistente.length; i++) {
        if(arquivosDoRelatorioExistente[i] == arquivo) {
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

if ( myFolder != null && caminhoRelatorio != null && caminhoRelatorio != "undefined")
{
     var myFiles = [];
     
     //Exibe Progress Bar 
    //myProgressPanel.pnl.text = "Relatório de links do Indesign";
    myProgressPanel.pnl.text = myFolder.fsName;
    myProgressPanel.pnl.myProgressBarLabel.text = "Aguarde... Procurando arquivos do Indesign nas subpastas...";
    myProgressPanel.pnl.myProgressBarLabelInferior.text = "Procurando arquivos nas subpastas...";
    myProgressPanel.pnl.myProgressBar.maxvalue = 100;
    myProgressPanel.pnl.myProgressBar.value = 0;
    myProgressPanel.show();
     
     GetSubFolders(myFolder);
     
//~      alert(myFiles);
     
     if ( myFiles.length > 0 )
     {
         
        for ( i=0; i < myFiles.length; i++ )
        {
            //Atualiza Progress Bar
            myProgressPanel.pnl.myProgressBar.value = (i + 1)*100/(myFiles.length * 1) ;
            myProgressPanel.pnl.myProgressBarLabel.text = myFiles[i].displayName;
            myProgressPanel.pnl.myProgressBarLabelInferior.text = "Abrindo arquivo " + (i+1) + " de " +  myFiles.length + ". Abrindo as " + new Date().getHours() + ":" + new Date().getMinutes();
                
            try
            {
                //reseta variaveis
                arquivoAberto = null;
                dadosDaLinha = null;
                listaDeLinks = null;
                
                if (estaCorrompido(myFiles[i].fsName))
                {
                    salvaRelatorio(myFiles[i].fsName + separador + "Sim" + separador, caminhoRelatorio);
                    continue;
                }
            
                //Adiciona arquivo atual ao crashfiles
                crashFile.open( "w" ); 
                crashFile.write(crashFilesOriginal + "\n" + myFiles[i].fsName); 
                crashFile.close(); 
                
                arquivoAberto = app.open(myFiles[i], false, OpenOptions.OPEN_COPY);

                if (arquivoAberto.links.length > 0)
                {
                    var dadosDaLinha = myFiles[i].fsName + separador + "Não" + separador + "Sim" + separador;
                    listaDeLinks =  dadosDaLinha + arquivoAberto.links.everyItem().filePath.join("\n" + dadosDaLinha);
                }
                else
                {
                    var dadosDaLinha = myFiles[i].fsName + separador + "Não" + separador + "Não" + separador;
                    listaDeLinks =  dadosDaLinha;
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
                try { arquivoAberto.close(SaveOptions.NO); } catch (e) {}
                continue;
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
         if(relatorioContinuado)
         {
             alert("Todos os arquivos já estão no relatório atual.","Finalizado");
         }
        else
        {
            alert("Nenhum arquivo do Indesign encontrado nas pastas e subpastas.","Finalizado");
        }
	 }
 
     //Fecha Progress Bar
    myProgressPanel.close();
    
    //Salva Log
    salvaLog(myFolder.fsName, caminhoRelatorio, dataDeInicio, relatorioFoiSalvo);
}

app.linkingPreferences.checkLinksAtOpen = true;
 














