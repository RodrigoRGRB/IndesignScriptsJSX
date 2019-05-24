/*
try{
    executaEdros();
}
catch(e){
    //Erro da função
    alert("Ocorreu um erro:\n"+ e);
    }
    */


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
            xmlTemp = "<COLECAO>Pré-Vestibular</COLECAO>\n";
            break;
        case 'EM':
            xmlTemp = "<COLECAO>Ensino Médio</COLECAO>\n";
            break;
        case 'EF':
            xmlTemp = "<COLECAO>Ensino Fundamental</COLECAO>\n";
            break;
        case 'LPV':
            xmlTemp = "<CADERNO>Livro Pré-Vestibular</CADERNO>\n";
            break;
        case 'HEXA':
            xmlTemp = "<CADERNO>Hexa</CADERNO>\n";
            break;
        case 'HUMANAS':
            xmlTemp = "<CADERNO>Humanas</CADERNO>\n";
            break;
        case 'ITA':
            xmlTemp = "<CADERNO>ITA</CADERNO>\n";
            break;
        case 'MEDICINA':
            xmlTemp = "<CADERNO>Medicina</CADERNO>\n";
            break;
        case 'OCTA':
            xmlTemp = "<CADERNO>Octa</CADERNO>\n";
            break;
        case 'TETRA':
            xmlTemp = "<CADERNO>Tetra</CADERNO>\n";
            break;
        case 'CAD':
            xmlTemp = "<NUMEROCADERNO>"+stringTag.match(/[0-9]*\d/)+"</NUMEROCADERNO>\n";
            break;
        case 'CAP':
            xmlTemp = "<NUMEROCAPITULO>"+stringTag.match(/[0-9]*\d/)+"</NUMEROCAPITULO>\n";
            break;    
        case 'L':
            xmlTemp = "<LIVRO>"+stringTag.match(/[0-9]*\d/)+"</LIVRO>\n";
            break;
        case 'LU':
            xmlTemp = "<LIVRO>Único</LIVRO>\n";
            break;
        case 'F':
            xmlTemp = "<FRENTE>"+stringTag.match(/[0-9]*\d/)+"</FRENTE>\n";
            break;
        case 'BIOLOGIA':
            xmlTemp = "<MATERIA>Biologia</MATERIA>\n";
            break;
        case 'FISICA':
            xmlTemp = "<MATERIA>Física</MATERIA>\n";
            break;
        case 'GEOGRAFIA':
            xmlTemp = "<MATERIA>Geografia</MATERIA>\n";
            break;
        case 'HISTORIA':
            xmlTemp = "<MATERIA>História</MATERIA>\n";
            break;
        case 'MATEMATICA':
            xmlTemp = "<MATERIA>Matemática</MATERIA>\n";
            break;
        case 'PORTUGUES':
            xmlTemp = "<MATERIA>Português</MATERIA>\n";
            break;
        case 'QUIMICA':
            xmlTemp = "<MATERIA>Química</MATERIA>\n";
            break;
        case 'ARTES':
            xmlTemp = "<MATERIA>Artes</MATERIA>\n";
            break;
        case 'EDUCACAO FISICA':
            xmlTemp = "<MATERIA>Educação Física</MATERIA>\n";
            break;
        case 'ESPANHOL':
            xmlTemp = "<MATERIA>Espanhol</MATERIA>\n";
            break;
        case 'FILOSOFIA':
            xmlTemp = "<MATERIA>Filosofia</MATERIA>\n";
            break;
        case 'ESPANHOL':
            xmlTemp = "<MATERIA>Espanhol</MATERIA>\n";
            break;
        case 'FISICA MODERNA':
            xmlTemp = "<MATERIA>Física Moderna</MATERIA>\n";
            break;
        case 'INGLES':
            xmlTemp = "<MATERIA>Inglês</MATERIA>\n";
            break;
        case 'ESPANHOL':
            xmlTemp = "<MATERIA>Espanhol</MATERIA>\n";
            break;
        case 'INTERPRETACAO DE TEXTO':
            xmlTemp = "<MATERIA>Interpretação de Texto</MATERIA>\n";
            break;
        case 'MATEMATICA BASICA E VETORES':
            xmlTemp = "<MATERIA>Matemática Básica e Vetores</MATERIA>\n";
            break;
        case 'REDACAO':
            xmlTemp = "<MATERIA>Redação</MATERIA>\n";
            break;
        case 'SOCIOLOGIA':
            xmlTemp = "<MATERIA>Sociologia</MATERIA>\n";
            break;
        case 'ANO':
            xmlTemp = "<ANO>"+stringTag.match(/[0-9]*\d/)+"</ANO>\n";
            break;
        default:
            xmlTemp = "<DESCONHECIDO>"+stringTag+"</DESCONHECIDO>\n";
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
                    var paginaAnterior = myInsertionPoint.parentTextFrames[0].parentPage.name;
                    
                    //Se o insertPoint anterior for na página anterior, recebe a página de fim -1
                    if(parseInt(paginaFim, 10)  != parseInt(paginaAnterior, 10))
                    {
                        paginaFim = paginaAnterior;
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
        //Pega o primeiro resultado da busca e entende que é o título do documento
        nomeDoCapitulo = procuraAssuntos(documento, estiloDoCapítulo)[0].contents;
    }
    else
    {
        nomeDoCapitulo = "Nome do capitulo não encontrado";
    }

    //alert(nomeDoCapitulo);
    
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

    xml = "<LIVRO>\n";
    
    xml += "<INFORMACOES>";
    
    //Captura o nome completo do arquivo
    xml += "<ARQUIVO>";
    xml += new File(documento.fullName).fsName;
    xml += "</ARQUIVO>\n";
    
    //Captura o nome do usuário do windows
    var nomeUsuario = $.getenv('USERNAME');
    nomeUsuario = nomeUsuario.toUpperCase();

    xml += "<EXPORTADOPOR>";
    xml += nomeUsuario;
    xml += "</EXPORTADOPOR>\n";
    
    //Cria o xml para cada item do array
    for(i=0; i < arrayNome.length; i++){
        xml += buscaTag(arrayNome[i]);
    }
    
    xml += "<NOMECAPITULO>"+nomeDoCapitulo+"</NOMECAPITULO>";
    
    xml += "</INFORMACOES>";

    //Adiciona os assuntos ao XML
     xml += "\n<ASSUNTOS>";
     
    for(i=0; i < assuntosEncontrados.length; i++)
    {
        //alert(assuntosEncontrados[i][0]);
        xml += "\n<ITEM>\n<TITULO>";
        xml += assuntosEncontrados[i][0];
        xml += "</TITULO>\n<PAGINAINICIO>";
        xml += assuntosEncontrados[i][1];
        xml += "</PAGINAINICIO>\n<PAGINAFIM>";
        xml += assuntosEncontrados[i][2];
        xml += "</PAGINAFIM>\n</ITEM>";
    }

    xml += "\n</ASSUNTOS>";
    xml += "\n</LIVRO>";
    
    //****************************** FIM CRIA O XML DO LIVRO *****************
    
    //************** AÇÕES DO PROGRAMA ANTES DA EXIBIÇÃO DA JANELA **************
/*
    // Tells us where this script is running from
    var scriptsFile = new File($.fileName);

    //var flashPalette = new Window('palette', 'Escala - Lucas ®',);
    var flashPalette = new Window('dialog', 'Capa Generator Plus - Lucas ®',);

    // Set the player bounds to match the palette
    var cBounds = flashPalette.frameBounds;
    flashPalette.margins = [0,0,0,0];
    //alert(flashPalette.margins);
    // add the Flash Player control to the palette.	

    //alert(flashPalette.opacity = 0.5);

    var flashPlayer = flashPalette.add("flashplayer", cBounds);
    flashPlayer.preferredSize = [1000, 800];

    var scriptsFile = new File($.fileName);
    //this.flashFile = new File(scriptsFile.parent.parent.fsName + "/resources/ScriptEscala.swf");
    //this.flashFile = new File("/I/Objetos/Scripts/InDesign/CriarCapa/FlexCriarCapa/FlexCriarCapa.swf");
    this.flashFile = new File(scriptsFile.parent.fsName + "/FlexCriarCapa.swf");
    flashPlayer.loadMovie(this.flashFile);
    
    flashPlayer.show();
    */


    //************** FIM DAS AÇÕES DO PROGRAMA ANTES DA EXIBIÇÃO DA JANELA **************
    
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