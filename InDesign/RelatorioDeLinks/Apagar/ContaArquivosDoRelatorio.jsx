function arrayRemoveValoresDuplicados(a, inicio)
{
    temp = new Array();
    for(i=inicio;i<a.length;i++)
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

//====================================================================================================================================================================================

var caminhoRelatorio = File.openDialog("Escolha o relatório que deseja analisar", "*.csv", false);

var arquivosDoRelatorioExistente;

if(caminhoRelatorio != null && caminhoRelatorio.exists)
{
    caminhoRelatorio.open( "r" );
    arquivosDoRelatorioExistente = caminhoRelatorio.read().split("\n");
    
    arquivosDoRelatorioExistente[0] = "";
    
    for (i=1; i < arquivosDoRelatorioExistente.length; i++)
    {
        arquivosDoRelatorioExistente[i] = arquivosDoRelatorioExistente[i].split(",")[0];
    }

    arquivosDoRelatorioExistente = arrayRemoveValoresDuplicados(arquivosDoRelatorioExistente, 1);

    caminhoRelatorio.close();

    alert("Quantidade de Arquivos: " + arquivosDoRelatorioExistente.length,"Quantidade de arquivos");
//~     alert("Arquivos:\n" + arquivosDoRelatorioExistente);
}