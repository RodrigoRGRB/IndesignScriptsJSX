/*
try{
    executaEdros();
}
catch(e){
    //Erro da função
    alert("Ocorreu um erro:\n"+ e);
    }
    */

//******************************** CRIA A JANELA ******************************

// Tells us where this script is running from
var scriptsFile = new File($.fileName);

//var flashPalette = new Window('palette', 'Escala - Lucas ®',);
var flashPalette = new Window('dialog', 'Sincroniza EDROS - Lucas ®',);

// Set the player bounds to match the palette
var cBounds = flashPalette.frameBounds;
flashPalette.margins = [0,0,0,0];
//alert(flashPalette.margins);
// add the Flash Player control to the palette.	

//alert(flashPalette.opacity = 0.5);

var flashPlayer = flashPalette.add("flashplayer", cBounds);
flashPlayer.preferredSize = [1000, 800];

var scriptsFile = new File($.fileName);
//this.flashFile = new File(scriptsFile.parent.fsName + "/FlexEdros/FlexEdros.swf");
this.flashFile = new File(scriptsFile.parent.fsName + "/FlexEdros/bin-debug/FlexEdros.swf");
flashPlayer.loadMovie(this.flashFile); 

//******************************** FIM CRIA A JANELA ******************************

//******************************** FUNÇÃO PARA PASSAR O XML PARA O FLASH ******************************

flashPlayer.capturaXML = function()
{
     return xml;
}

//******************************** FIM FUNÇÃO PARA PASSAR O XML PARA O FLASH ******************************

//******************************** FUNÇÃO PARA CORRIGIR ESPAÇOS EM BRANCO E QUEBRAS DE LINHA ******************************

function consertaNome(strinTemp)
{
    try{
        strinTemp = strinTemp.replace(/\s+/g," ");
            if(strinTemp[strinTemp.length-1] == " ")
            {
                strinTemp = strinTemp.substring (0, strinTemp.length-1);
            }
        }
    finally{
            return strinTemp;
        }
 }

//******************************** FIM FUNÇÃO PARA CORRIGIR ESPAÇOS EM BRANCO E QUEBRAS DE LINHA ******************************

//******************************** FUNÇÃO PARA CORRIGIR AS TAGS DO NOME DO ARQUIVO ******************************

function buscaTag(stringTag){
    
    var xmlTemp;
    
    //alert(stringTag +"\n"+stringTag.match(/[0-9]*\d/));
    
    //Exclui a numeração da tag (permite acentos
    var stringTagTemp = stringTag.match(/[a-zA-ZÀ-ÿ]*/) + "";

    stringTagTemp = removeAcentos(stringTagTemp);
    stringTagTemp = stringTagTemp.toUpperCase();
    
    switch(stringTagTemp)
    {
        case 'PV':
            xmlTemp = "<item label='COLECAO' value='Pré-Vestibular'/>\n";
            break;
        case 'EM':
            xmlTemp = "<item label='COLECAO' value='Ensino Médio'/>\n";
            break;
        case 'EF':
            xmlTemp = "<item label='COLECAO' value='Ensino Fundamental'/>\n";
            break;
        case 'LPV':
            xmlTemp = "<item label='CADERNO' value='Livro Pré-Vestibular'/>\n";
            break;
        case 'HEXA':
            xmlTemp = "<item label='CADERNO' value='Hexa'/>\n";
            break;
        case 'HUMANAS':
            xmlTemp = "<item label='CADERNO' value='Humanas'/>\n";
            break;
        case 'ITA':
            xmlTemp = "<item label='CADERNO' value='ITA'/>\n";
            break;
        case 'MEDICINA':
            xmlTemp = "<item label='CADERNO' value='Medicina'/>\n";
            break;
        case 'OCTA':
            xmlTemp = "<item label='CADERNO' value='Octa'/>\n";
            break;
        case 'TETRA':
            xmlTemp = "<item label='CADERNO' value='Tetra'/>\n";
            break;
        case 'CAD':
            xmlTemp = "<item label='NUMEROCADERNO' value='"+stringTag.match(/[0-9]*\d/)+"'/>\n";
            break;
        case 'CAP':
            xmlTemp = "<item label='NUMEROCAPITULO' value='"+stringTag.match(/[0-9]*\d/)+"'/>\n";
            break;    
        case 'L':
            xmlTemp = "<item label='LIVRO' value='"+stringTag.match(/[0-9]*\d/)+"'/>\n";
            break;
        case 'LU':
            xmlTemp = "<item label='LIVRO' value='Único'/>\n";
            break;
        case 'F':
            xmlTemp = "<item label='FRENTE' value='"+stringTag.match(/[0-9]*\d/)+"'/>\n";
            break;
        case 'FA':
            xmlTemp = "<item label='FRENTE' value='A'/>\n";
            break;
        case 'FB':
            xmlTemp = "<item label='FRENTE' value='B'/>\n";
            break;
        case 'BIO':
            xmlTemp = "<item label='MATERIA' value='Biologia'/>\n";
            break;
        case 'FIS':
            xmlTemp = "<item label='MATERIA' value='Física'/>\n";
            break;
        case 'GEO':
            xmlTemp = "<item label='MATERIA' value='Geografia'/>\n";
            break;
        case 'HIS':
            xmlTemp = "<item label='MATERIA' value='História'/>\n";
            break;
        case 'MAT':
            xmlTemp = "<item label='MATERIA' value='Matemática'/>\n";
            break;
        case 'PORT':
            xmlTemp = "<item label='MATERIA' value='Português'/>\n";
            break;
        case 'QUI':
            xmlTemp = "<item label='MATERIA' value='Química'/>\n";
            break;
        case 'ARTES':
            xmlTemp = "<item label='MATERIA' value='Artes'/>\n";
            break;
        case 'EDFIS':
            xmlTemp = "<item label='MATERIA' value='Educação Física'/>\n";
            break;
        case 'ESP':
            xmlTemp = "<item label='MATERIA' value='Espanhol'/>\n";
            break;
        case 'FIL':
            xmlTemp = "<item label='MATERIA' value='Filosofia'/>\n";
            break;
        case 'FISMOD':
            xmlTemp = "<item label='MATERIA' value='Física Moderna'/>\n";
            break;
        case 'ING':
            xmlTemp = "<item label='MATERIA' value='Inglês'/>\n";
            break;
        case 'INTERPTEXT':
            xmlTemp = "<item label='MATERIA' value='Interpretação de Texto'/>\n";
            break;
        case 'MATBASVET':
            xmlTemp = "<item label='MATERIA' value='Matemática Básica e Vetores'/>\n";
            break;
        case 'RED':
            xmlTemp = "<item label='MATERIA' value='Redação'/>\n";
            break;
        case 'SOC':
            xmlTemp = "<item label='MATERIA' value='Sociologia'/>\n";
            break;
        case 'ANO':
            xmlTemp = "<item label='ANO' value='"+stringTag.match(/[0-9]*\d/)+"'/>\n";
            break;
        default:
            xmlTemp = "<item label='DESCONHECIDO' value='"+stringTag+"'/>\n";
            break;
    }
    
    return xmlTemp;

}

//******************************** FIM FUNÇÃO PARA CORRIGIR AS TAGS DO NOME DO ARQUIVO ******************************


//******************************** FUNÇÃO PARA RETIRAR OS ACENTOS ******************************

function removeAcentos(palavra)
{
        var r=palavra.toLowerCase();
        r = r.replace(new RegExp("\\s", 'g'),"");
        r = r.replace(new RegExp("[àáâãäå]", 'g'),"a");
        r = r.replace(new RegExp("æ", 'g'),"ae");
        r = r.replace(new RegExp("ç", 'g'),"c");
        r = r.replace(new RegExp("[èéêë]", 'g'),"e");
        r = r.replace(new RegExp("[ìíîï]", 'g'),"i");
        r = r.replace(new RegExp("ñ", 'g'),"n");                            
        r = r.replace(new RegExp("[òóôõö]", 'g'),"o");
        r = r.replace(new RegExp("œ", 'g'),"oe");
        r = r.replace(new RegExp("[ùúûü]", 'g'),"u");
        r = r.replace(new RegExp("[ýÿ]", 'g'),"y");
        r = r.replace(new RegExp("\\W", 'g'),"");
        return r;
}

//******************************** FIM FUNÇÃO PARA RETIRAR OS ACENTOS ******************************

//******************************** FUNÇÃO PARA PROCURAR OS ASSUNTOS ******************************

function procuraAssuntos(documento, estiloProcurado)
{
        //Apaga as consultas anteriores
        app.findTextPreferences = NothingEnum.nothing;
        app.changeTextPreferences = NothingEnum.nothing;

        //Procura o estilo selecionado
        app.findTextPreferences.appliedParagraphStyle = estiloProcurado;
        var resultados = documento.findText();
        //var resultados = myFoundStyles[0]; 
        
        return resultados;
}

//******************************** FIM FUNÇÃO PARA PROCURAR OS ASSUNTOS ******************************

//******************************** FUNÇÃO PARA PROCURAR OS ASSUNTOS ******************************
/*
flashPlayer.exibeXML = function()
{
	return(xml);
}
*/

//******************************** FIM FUNÇÃO PARA PROCURAR OS ASSUNTOS ******************************

//******************************** PROGRAMA PRINCIPAL ******************************

//VARIÁVEIS GLOBAIS
var xml;

function executaEdros()
{
    //Filtro para não executar 2 vezes a função
    if(app.layoutWindows.length != app.documents.length)
            //throw "Este documento não é válido";
    
    //VARIÁVEIS USADAS
    var nomeDoCapitulo;
    var estiloDoCapítulo;
    var documento = app.activeDocument; 
    var estiloDosAssuntos;
    var assuntosEncontrados = new Array();
    
    //****************************** CAPTURA OS ASSUNTOS *****************
    
    for(i=0; i<documento.allParagraphStyles.length; i++)
    {
        
        var nomeDoParagrafo = documento.allParagraphStyles[i].name;
        
        //if(nomeDoParagrafo.match(/t[íi]tulo n[íi]vel 1\b/i))
        if(nomeDoParagrafo.match(/(EDROS ASSUNTO)\b/i))
        {
            estiloDosAssuntos = documento.allParagraphStyles[i];
            //alert(estiloDosAssuntos.name);
            break;
        }
    }

    //Se não existir nenhum resultado, lança um erro
    if(estiloDosAssuntos == null)
        throw "Nenhum resultado encontrado";
        
    //Procura o estilo selecionado
    var myFoundStyles = procuraAssuntos(documento, estiloDosAssuntos);   
   
    //Pega todos os textos encontrados com o estilo procurado
   for(i=0; i < myFoundStyles.length; i++)
   {
       var paginaInicio;
       var paginaFim;
       
       //Verifica se o parágrafo está dentro da página
       if(myFoundStyles[i].parentTextFrames[0].parentPage != null)
       {
           //Captura a página de início
           paginaInicio = myFoundStyles[i].parentTextFrames[0].parentPage.name;  
    
            //Verifica se ainda não é o último estilo
            if(i+1 != myFoundStyles.length)
            {
                if(myFoundStyles[i+1].parentTextFrames[0].parentPage != null) 
                {
                    paginaFim = myFoundStyles[i+1].parentTextFrames[0].parentPage.name;
                    
                    //Captura a página do insertPoint anterior
                    var myStory = myFoundStyles[i+1].insertionPoints[0].parentStory;
                    var myInsertionPoint = myStory.insertionPoints.item(myFoundStyles[i+1].insertionPoints[0].index-3);
                    
                    //Se existir algum text frame anterior
                    if(myInsertionPoint.parentTextFrames.length > 0){
                        var paginaAnterior = myInsertionPoint.parentTextFrames[0].parentPage.name;
                        
                        //Se o insertPoint anterior for na página anterior, recebe a página de fim -1
                        if(parseInt(paginaFim, 10)  != parseInt(paginaAnterior, 10))
                        {
                            paginaFim = paginaAnterior;
                        }
                    }
                    
                }
                else
                    paginaFim = documento.pages[documento.pages.length-1].name;
            }
            else
            {
                paginaFim = documento.pages[documento.pages.length-1].name;
            }
        
            //Verifica se paginaFim é menor que página inicio
            //alert("Numero original: "+paginaFim+"\nNumero alterado: "+parseInt(paginaFim, 10));
            if(parseInt(paginaFim, 10)  < parseInt(paginaInicio, 10))
            {
                paginaFim = paginaInicio;
            }
            
        
           //Cria o texto da seção com os números das páginas
           assuntosEncontrados.push([myFoundStyles[i].contents, paginaInicio, paginaFim]);
        }
       
   }

    //alert(assuntosEncontrados);

    //****************************** FIM CAPTURA OS ASSUNTOS *****************
    
    
    //****************************** CAPTURA O TÍTULO *****************
    
    for(i=0; i<documento.allParagraphStyles.length; i++)
    {
        
        var nomeDoParagrafo = documento.allParagraphStyles[i].name;
        
        //if(nomeDoParagrafo.match(/t[íi]tulo do cap[íi]tulo\b/i))
        if(nomeDoParagrafo.match(/(EDROS CAP[íi]TULO)\b/i))
        {
            estiloDoCapítulo = documento.allParagraphStyles[i];
            break;
        }
    }

    //alert(estiloDoCapítulo);

    //Se não existir nenhum resultado, lança um erro
    if(estiloDoCapítulo != null)
    {
        nomeDoCapitulo = null;
        
        //Pega o primeiro resultado da busca e entende que é o título do documento
        if(procuraAssuntos(documento, estiloDoCapítulo).length > 0)
            nomeDoCapitulo = procuraAssuntos(documento, estiloDoCapítulo)[0].contents;
    }
    else
    {
        nomeDoCapitulo = null;
    }

    //Retira quebras de linha e espaço em branco no nome do capítulo
    nomeDoCapitulo = consertaNome(nomeDoCapitulo);
    
    //****************************** FIM CAPTURA O TÍTULO *****************
    
    //****************************** CRIA O XML DO LIVRO *****************
    
    if(documento.saved)
    {
        //var arrayNome = documento.name.split("_");
        var arrayNome = documento.metadataPreferences.documentTitle.split("_");
        
        //retira a extensão do último array
        arrayNome[arrayNome.length-1] = arrayNome[arrayNome.length-1].split(".indd")[0];
        //alert(arrayNome);
    }

    xml = "<item label='LIVRO'>\n";
    
    xml += "<item label='INFORMACOES'>\n";
    
    //Captura o nome completo do arquivo
    xml += "<item label='ARQUIVO' value='";
    xml += new File(documento.fullName).fsName;
    xml += "'/>\n";
    
    //Captura o nome do usuário do windows
    var nomeUsuario = $.getenv('USERNAME');
    nomeUsuario = nomeUsuario.toUpperCase();

    xml += "<item label='EXPORTADOPOR' value='";
    xml += nomeUsuario;
    xml += "'/>\n";
    
    //Cria o xml para cada item do array
    for(i=0; i < arrayNome.length; i++){
        xml += buscaTag(arrayNome[i]);
    }
    
    xml += "<item label='NOMECAPITULO' value='"+nomeDoCapitulo+"'/>\n";
    
    xml += "</item>\n";

    //Adiciona os assuntos ao XML
     xml += "\n<item label='ASSUNTOS'>";
     
    for(i=0; i < assuntosEncontrados.length; i++)
    {
        xml += "\n<item label='TITULO' value='";
        xml += consertaNome(assuntosEncontrados[i][0]); 
        xml += "'>\n<item label='PAGINAINICIO' value='";
        xml += consertaNome(assuntosEncontrados[i][1]); 
        xml += "'/>\n<item label='PAGINAFIM' value='";
        xml += consertaNome(assuntosEncontrados[i][2]); 
        xml += "'/>\n</item>";
    }

    xml += "\n</item>\n";
    xml += "\n</item>\n";
    
    //****************************** FIM CRIA O XML DO LIVRO *****************
    
    //************** EXIBE A JANELA **************

    //flashPalette.show();
    
    //************** FIM EXIBE A JANELA **************
    
    //****************************** EXIBE A JANELA *****************
    
    res = 
    "dialog { properties:{ resizeable:true }, \
        text: 'Alert Box Builder', frameLocation:[300,300], \
        msgPnl: Panel { orientation:'row', alignChildren:['left', 'top'],\
            text: 'Dados do arquivo', \
            title: Group { \
            }, \
            } \
    }";
        
    win = new Window (res,"Lucas ®",); 
    win.msgPnl.preferredSize = [600, 300];
    
    //var relatorio = nomeDoCapitulo + "\n" + assuntosEncontrados;
    var relatorio = xml;

    win.msgPnl.title.add('edittext', [0,0,570,280],relatorio, {multiline:true});

    win.center();
    win.show();
    
    
    //****************************** FIM EXIBE A JANELA *****************
    
    //****************************** SALVA O XML *****************
    /*
    //Salva os dados do arquivo
    var xmlFile = new File("//rede-sj/Dados/banco de imagens/Objetos/Scripts/InDesign/Edros/"+ documento.name+".xml");
	xmlFile.open( "w" ); 
	xmlFile.write(xml); 
	xmlFile.close(); 
    
     alert("Arquivo foi salvo","XML - Lucas ®"); 
     */
    
    //****************************** FIM SALVA O XML *****************
    
}

//******************************** FIM PROGRAMA PRINCIPAL ******************************

executaEdros();