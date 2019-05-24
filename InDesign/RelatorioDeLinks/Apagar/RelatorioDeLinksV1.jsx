#targetengine "session"

//============================================================================================================================

function salvaRelatorio(relatorio, caminhoRelatorio){ 
    
    try
    {
        var d = new Date();
        var dia = d.getDate();
        var mes = d.getMonth() + 1;
        var data= d.getFullYear() + "" + d.getMonth() + "" + d.getDate();

        caminhoRelatorio = caminhoRelatorio.split(".csv")[0] + data + ".csv";

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

var myProgressPanel = new Window("palette", "Relatório de arquivos links", [150, 150, 900, 270]); 
this.windowRef = myProgressPanel;

myProgressPanel.pnl = myProgressPanel.add("panel", [10, 10, 740, 115], "");
myProgressPanel.pnl.myProgressBarLabel = myProgressPanel.pnl.add("statictext", [15, 13, 410, 35], "Iniciando script");
myProgressPanel.pnl.myProgressBar = myProgressPanel.pnl.add("progressbar", [15, 35, 710, 60], 0, 200);
myProgressPanel.pnl.myProgressBarLabelInferior = myProgressPanel.pnl.add("statictext", [15, 70, 710,400], "");
myProgressPanel.center();

//============================================================================================================================

app.linkingPreferences.checkLinksAtOpen = false;

var relatorio = "Nome do arquivo Indesign,Link"
var listaDeLinks;
var separador = ","
var caminhoRelatorio;

var myFolder = Folder.selectDialog( "Selecione a pasta que contém arquivos do Indesign." );

caminhoRelatorio = File.saveDialog ('Escolha o arquivo para salvar o relatório', 'Arquivo separado por vírgula:*.csv');

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

        for ( i=0; i < myFiles.length; i++ )
        {
            //Atualiza Progress Bar
            myProgressPanel.pnl.text = "Relatório de links do Indesign";
            myProgressPanel.pnl.myProgressBarLabel.text = myFiles[i].displayName;
            myProgressPanel.pnl.myProgressBarLabelInferior.text = "Abrindo arquivo " + (i+1) + " de " +  myFiles.length + ".";
            myProgressPanel.pnl.myProgressBar.value = (i + 1)*100/(myFiles.length * 1) ;
            
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

        var resultado = salvaRelatorio(relatorio, caminhoRelatorio.fullName);
        
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
}

app.linkingPreferences.checkLinksAtOpen = true;
 














