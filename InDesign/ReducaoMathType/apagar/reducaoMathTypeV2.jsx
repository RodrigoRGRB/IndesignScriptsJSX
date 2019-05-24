//************* FUNCAO AJUSTAR EQUACAO ************
function funcaoAjustaEquacao(graphics,paragrafo){
	
		//Se largura do objeto tiver sofrido o CROP, lança um erro para finalizar script
        //alert(graphics.parent.parent.parent);
		var myRectangle = graphics.parent;
		var myGraphics = graphics;

		//alert(myGraphics.itemLink.filePath);
		var caminhoArquivo = myGraphics.itemLink.filePath; 
        
        //alert(caminhoArquivo);

		var temp = caminhoArquivo.split(".eps").length;
		temp = parseInt(temp);

		//Se o objeto não for EPS não executa o script
		if(temp == 1){
			throw "Erro eps";
		}
		
		//alert(myGraphics.itemLink.filePath);
		var caminhoArquivo = myGraphics.itemLink.filePath; 

		var eqn = File(caminhoArquivo);
		//var eqn = File.openDialog("Salvar PDF ");

		eqn.open("r");

		//alert(eqn.read());
		var baseline = eqn.read(1000).split("%%Baseline: ");

		var baseline = baseline[1].split("%%");

		//alert(baseline[0]);
		baseline = baseline[0];
		eqn.close();

		baseline = parseInt(baseline);
		//alert(baseline);
        
        //Muda a porcentagem da equação
        myRectangle.graphics[0].horizontalScale = porcentagem;
        myRectangle.graphics[0].verticalScale = porcentagem;

		//Muda a unidade de medida atual para milimetros
		var guardaMedidaHorizontal = app.activeDocument.viewPreferences.horizontalMeasurementUnits;
		var guardaMedidaVertical = app.activeDocument.viewPreferences.verticalMeasurementUnits;

		var myDocument = documentoAtual;
        
		with(myDocument.viewPreferences){
			horizontalMeasurementUnits = MeasurementUnits.millimeters;
			verticalMeasurementUnits = MeasurementUnits.millimeters;
		}

		//seleciona o link atual e ajusta de acordo com o baseline
		var myRectangle = myGraphics.parent;
		var arrayMyRectangle = myRectangle.geometricBounds;

		//Crop na largura
		myRectangle = myGraphics.parent;
         myRectangle.geometricBounds =  myGraphics.geometricBounds;
		var arrayBounds = myRectangle.geometricBounds;
        
         //largura
		arrayBounds[1] = arrayBounds[1]+(0.65*porcentagem/100);
		arrayBounds[3] = arrayBounds[3]-(0.7*porcentagem/100);
        
        //altura
        myRectangle.geometricBounds = arrayBounds;
        
		//Devolve a unidade de medida original
		var myDocument = app.activeDocument;
		with(myDocument.viewPreferences){
			horizontalMeasurementUnits = guardaMedidaHorizontal;
			verticalMeasurementUnits = guardaMedidaVertical;
		}
        
        }
    
function leBaseline(myGraphics){
    
		var caminhoArquivo = myGraphics.itemLink.filePath; 
        
        //alert(caminhoArquivo);

		var temp = caminhoArquivo.split(".eps").length;
		temp = parseInt(temp);

		//Se o objeto não for EPS não executa o script
		if(temp == 1){
            //alert(caminhoArquivo);
            return 0;
			//throw "Erro eps";
		}
		
		//alert(myGraphics.itemLink.filePath);
		var caminhoArquivo = myGraphics.itemLink.filePath; 

		var eqn = File(caminhoArquivo);
		//var eqn = File.openDialog("Salvar PDF ");

		eqn.open("r");

		//alert(eqn.read());
		var baseline = eqn.read(1000).split("%%Baseline: ");

		var baseline = baseline[1].split("%%");

		//alert(baseline[0]);
		baseline = baseline[0];
		eqn.close();

		baseline = parseInt(baseline);
        
        return baseline;
    
    }
        
function funcaoAjustaLeading(graphics,paragrafo){
    
		//Se largura do objeto tiver sofrido o CROP, lança um erro para finalizar script
        //alert(graphics.parent.parent.parent);
		var myRectangle = graphics.parent;
		var myGraphics = graphics;

		//alert(myGraphics.itemLink.filePath);
        
        var baseline = leBaseline(myGraphics);
		//alert(baseline);
        
        //Muda a porcentagem da equação
        myRectangle.graphics[0].horizontalScale = porcentagem;
        myRectangle.graphics[0].verticalScale = porcentagem;

		//Muda a unidade de medida atual para milimetros
		var guardaMedidaHorizontal = app.activeDocument.viewPreferences.horizontalMeasurementUnits;
		var guardaMedidaVertical = app.activeDocument.viewPreferences.verticalMeasurementUnits;

		var myDocument = documentoAtual;
        
		with(myDocument.viewPreferences){
			horizontalMeasurementUnits = MeasurementUnits.millimeters;
			verticalMeasurementUnits = MeasurementUnits.millimeters;
		}

		//seleciona o link atual e ajusta de acordo com o baseline
		var myRectangle = myGraphics.parent;
		var arrayMyRectangle = myRectangle.geometricBounds;

		//Converte baseline em milimetros
		var distanciaBaseline = baseline/2.8344671201814058956916099773243;
        
        //Movimenta a equação de acordo com a nova altura        
        var alturaRetangulo = arrayMyRectangle[2]-arrayMyRectangle[0];
        //myRectangle.anchoredObjectSettings.anchorYoffset = -(distanciaBaseline)+0.35;
        var constante = (100-porcentagem)/20;
        //var constante = (100-porcentagem)/20;
        //alert(constante);
        myRectangle.anchoredObjectSettings.anchorYoffset = -(distanciaBaseline)+(constante*porcentagem/100);

        //myRectangle.move(undefined, [0, distanciaBaseline]);

		//Crop na altura (porcentagem) e na largura
		myRectangle = myGraphics.parent;
         myRectangle.geometricBounds =  myGraphics.geometricBounds;
		var arrayBounds = myRectangle.geometricBounds;

        myRectangle.geometricBounds = arrayBounds;

		//Ajusta o leading da próxima linha		
		//var story = pontoDeInsercao.parent;
        var pegaEquação = 0;
        
        contaLinha = 0;
        
        //contadorEquacoes
        
        var linhaAtual;
        var maiorDistanciaBaseline;
        
        //alert(paragrafo.lines.length);
        
        
        for(contador = 0; contador<paragrafo.lines.length; contador++){
            
            //alert(paragrafo.lines[contador].allGraphics.length);
            
            if(paragrafo.lines[contador].allGraphics.length > 0){
                
                
                linhaAtual = paragrafo.lines[contador];
                //alert(linhaAtual);
                
                if(contaLinha != 0){
                    contaLinha = paragrafo.lines[contador].allGraphics.length;
                }
            else{
                contaLinha--;
                }
            
                //Se linha anterior tiver equacao, adiciona distancia baselina ao leading da linha anterior
                
                
                var linhaAnterior = linhaAtual.insertionPoints[0].paragraphs[0].lines.previousItem(linhaAtual);
                try{
                    if(linhaAnterior.allGraphics.length>0){
                        
                        
                        for(x=0; x < linhaAnterior.allGraphics.length;x++){
                            
                            var temp = leBaseline(linhaAnterior.allGraphics[x]);
                            temp = temp /2.8344671201814058956916099773243;
                            //alert(temp);
                            
                            if(temp > maiorDistanciaBaseline){
                                maiorDistanciaBaseline = temp;
                            }

                            }
                        
                        }
                    }
                    catch(e){
                    }
                }
            
            }
        

            
         
         var pontoDeInsercao = linhaAtual.insertionPoints[0];
		var story = pontoDeInsercao.paragraphs[0];        
		var proximaLinha = story.lines.nextItem(pontoDeInsercao.lines[0]);
		var fontSize = pontoDeInsercao.pointSize;
		var leadingAtual = fontSize*1.2;
     
         //Adiciona a altura do grafico à linha anterior
         //story.leading = leadingAtual;

		//Confere todos 
		var tamanhoEquacao = arrayMyRectangle[2]-arrayMyRectangle[0];
		var leadingMilimetros = tamanhoEquacao - (tamanhoEquacao - distanciaBaseline);
        
        //ajusta leading da linha atual, somando o tamanho da equacao anterior
        //alert(((tamanhoEquacao - distanciaBaseline)*2.83286118980169971671388101983)+(maiorDistanciaBaseline*2.83286118980169971671388101983));
        //alert(maiorDistanciaBaseline);
        if(maiorDistanciaBaseline != undefined){
            linhaAtual.characters[0].leading = ((tamanhoEquacao - distanciaBaseline)*2.83286118980169971671388101983)+(maiorDistanciaBaseline*2.83286118980169971671388101983);
          }

		//mm para pt
		var leading = leadingMilimetros*2.83286118980169971671388101983;
		leading = leading + ((leadingAtual/3)*1.85);
		
		//alert("02");
		
        if(proximaLinha.isValid){
            var charactersLength = 1*proximaLinha.characters.length;
           }
       else{
           return 0;
           throw "Problema com a equação: "+ graphics.itemLink.filePath;
           }
        
        

		if(proximaLinha.characters[charactersLength-1].leading == "1635019116"){
			var leadingUltimoCaracter = leadingAtual;
			}
		else{
			var leadingUltimoCaracter = proximaLinha.characters[charactersLength-1].leading;
			}
		
		//alert("03");

		if(leadingAtual < leading){
			//if(proximaLinha.leading == "1635019116" || proximaLinha.leading < leading){
			if(leadingUltimoCaracter < leading){
				proximaLinha.leading = leading;
				//proximaLinha.characters[0].leading = leading;
			}
		}
        

		//alert("04");

		/*
        //Arruma equações presentes nas últimas linhas
        if(proximaLinha.paragraphs[0].characters.length != linhaAtual.paragraphs[0].characters.length && proximaLinha.allGraphics.length == 0){
                //alert(distanciaBaseline);
                linhaAtual.spaceAfter = distanciaBaseline;
            }
            */
            
            
        //alert(proximaLinha.paragraphs[0].spaceAfter);
       
        
        try{

		//Pega o leading do último caractere da terceira linha e configura para toda a linha
		var terceiraLinha = story.lines.nextItem(proximaLinha);
		var leadingTerceiraLinha = terceiraLinha.characters[terceiraLinha.characters.length-1].leading;
		//alert(leadingTerceiraLinha);
		terceiraLinha.leading = leadingTerceiraLinha;
            }
        catch(e){
        
        }
		
		//alert("05");

		//Devolve a unidade de medida original
		var myDocument = app.activeDocument;
		with(myDocument.viewPreferences){
			horizontalMeasurementUnits = guardaMedidaHorizontal;
			verticalMeasurementUnits = guardaMedidaVertical;
		}
    
   
   	
}

//************* FIM FUNCAO AJUSTAR EQUACAO ************

//************ CRIA PROGRESS BAR ****************

#targetengine "session"
//Because these terms are defined in the "session" engine,
//they will be available to any other JavaScript running
//in that instance of the engine.
//function myCreateProgressPanel(myMaximumValue, myProgressBarWidth){

// Create a palette-type window (a modeless or floating dialog),
var myProgressPanel = new Window("palette", "Redimensionando equações - Lucas ®", [150, 150, 600, 270]); 
this.windowRef = myProgressPanel;

// Add a panel to contain the components
myProgressPanel.pnl = myProgressPanel.add("panel", [10, 10, 440, 100], "Iniciando script");

// Add a progress bar with a label and initial value of 0, max value of 200.
myProgressPanel.pnl.myProgressBarLabel = myProgressPanel.pnl.add("statictext", [20, 20, 320, 35], "Iniciando script");
myProgressPanel.pnl.myProgressBar = myProgressPanel.pnl.add("progressbar", [20, 35, 410, 60], 0, 200);

// Add buttons
//myProgressPanel.goButton = myProgressPanel.add("button", [25, 110, 125, 140], "Start");
//myProgressPanel.resetButton = myProgressPanel.add("button", [150, 110, 250, 140], "Reset");
//myProgressPanel.doneButton = myProgressPanel.add("button", [310, 110, 410, 140], "Done");
/*
myProgressPanel.cnlButton = myProgressPanel.add("button", [25, 110, 125, 140], "Cancelar");

myProgressPanel.cnlButton.onClick = function () {
	//alert("oi");
	myProgressPanel.close();
	}
	*/

myProgressPanel.center();
	
//}

//************ FIM CRIA PROGRESS BAR ****************

//*********** CRIA JANELA **************************

	// Define components
	var res =
           "dialog { \
					   grupoPrincipal: Group { orientation:'column',  preferredSize: [230, 20],\
							   porcentagem: Group { orientation: 'row', alignment:'left' , \
											label: StaticText { text:'Reduzir equação para:', preferredSize: [140, 20] }, \
											input: EditText { preferredSize: [49, 20] } \
											label2: StaticText { text:'%' }, \
							   }, \
							   inicio: Group { orientation: 'row', alignment:'left' , \
											label: StaticText { text:'Aplicar da página:', preferredSize: [140, 20] }, \
                                                  lista: DropDownList { preferredSize: [90, 20],  alignment:'left' }, \
							   }, \
                                  fim: Group { orientation: 'row', alignment:'left' , \
											label: StaticText { text:'Até a página:', preferredSize: [140, 20] }, \
                                                  lista: DropDownList { preferredSize: [90, 20],  alignment:'left' }, \
							   }, \
					}, \
                   buttons: Group { orientation: 'row', alignment: 'right', \
                           okBtn: Button { text:'OK', properties:{name:'ok'} } \
						cnlBtn: Button { text:'Cancelar', properties:{name:'cancelar'} } \
                   } \
           }";
		   
   //Cria janela
   var win = new Window (res,"Redimensionar equações - Lucas ®",);  
           
//******** FIM DA CRIAÇÃO DA JANELA *********************

//*********** INICIO DO PROGRAMA *************

var rodaPrograma = true;
var graficoNaPagina;

//Ação do botao cancelar
win.buttons.cnlBtn.onClick = function()
{
        rodaPrograma = false;
        win.close();
}

try{

var documentoAtual = app.activeDocument;

//Conta o número de páginas existentes e adiciona à lista
for(z=0;z<documentoAtual.pages.length;z++){
    //arrayPaginas[z] = documentoAtual.pages[z].name;
    win.grupoPrincipal.inicio.lista.add ('item',  documentoAtual.pages[z].name);
    win.grupoPrincipal.fim.lista.add ('item',  documentoAtual.pages[z].name);
}

//Pre-seleciona os campos
win.grupoPrincipal.inicio.lista.selection = win.grupoPrincipal.inicio.lista.items[0];
win.grupoPrincipal.fim.lista.selection = win.grupoPrincipal.fim.lista.items[win.grupoPrincipal.fim.lista.items.length-1];

//Porcentagem a ser diminuída da equação
var porcentagem = 90.9;
//var porcentagem = 100;
//var porcentagem = 50;
win.grupoPrincipal.porcentagem.input.text = porcentagem;



//Exibe a janela
win.show();

if(rodaPrograma){

//Lê todas as equações do documento

//Looping para todas as equações


//alert(documentoAtual.allGraphics[0].parent);
//alert(documentoAtual.stories.length);

var executaLeadingFinal = false;

//************* EXIBE PROGRESS BAR ******************
#targetengine "session"
//Numero do intervalo de páginas vezes o número de processos pendentes (carimbo)
//alert(documentoAtual.allGraphics);
var tamanhoDoProcesso = (documentoAtual.allGraphics.length)*1;
myProgressPanel.pnl.myProgressBar.maxvalue = tamanhoDoProcesso;
myProgressPanel.pnl.myProgressBar.value = 0;
myProgressPanel.show();
var contadorBarra = 1;
//************* FIM EXIBE PROGRESS BAR ******************

//Looping para todos os stories
for(s=0; s<documentoAtual.stories.length; s++){
    
    var atualStory = documentoAtual.stories[s];
    
    //Looping para todas as linhas do story
    for(p=0; p < atualStory.paragraphs.length; p++){
        
        var paragrafoAtual = atualStory.paragraphs[p];

        //Looping para todos os gráficos dentro do story
        for(g=0; g < paragrafoAtual.allGraphics.length; g++){
            
            //alert(paragrafoAtual.allGraphics[g].parentPage.name);
            graficoNaPagina = ""+paragrafoAtual.allGraphics[g].parentPage.name;
            app.selection = paragrafoAtual.allGraphics[g].parentPage;
            //alert(graficoNaPagina);
            
            //graficoNaPagina = paragrafoAtual.allGraphics[g].parentPage.name;
            
            //************* ATUALIZA PROGRESS BAR ******************
            myProgressPanel.pnl.text = "EQUAÇÕES";
            myProgressPanel.pnl.myProgressBarLabel.text = "Convertendo equações, aguarde...";
            contadorBarra += 1;
            //alert(contadorBarra);
            myProgressPanel.pnl.myProgressBar.value = contadorBarra;
            //*************  ATUALIZA PROGRESS BAR ******************
            
            //Se não for eps, passa para próximo gráfico
            if(paragrafoAtual.allGraphics[g] != "[object EPS]"){
                //alert("continuando");
                continue;
                }
                
            funcaoAjustaEquacao(paragrafoAtual.allGraphics[g],paragrafoAtual);
            
            //Redefine o leading do parágrafo para automático
            //alert(paragrafoAtual.leading);
            //paragrafoAtual.leading = 1635019116;
            
            } //fim do looping gráficos
        
        //alert("temp");
        
        var contadorEquacoes = paragrafoAtual.allGraphics.length;
        var contaLinha = 0;

        //Looping para todos os leadings dos gráficos
        for(g=0; g < paragrafoAtual.allGraphics.length; g++){
            
            graficoNaPagina = ""+paragrafoAtual.allGraphics[g].parentPage.name;
            app.selection = paragrafoAtual.allGraphics[g].parentPage;
            
            //Se não for eps, passa para próximo gráfico
            if(paragrafoAtual.allGraphics[g] != "[object EPS]"){
                //alert("continuando");
                continue;
                }
                
            funcaoAjustaLeading(paragrafoAtual.allGraphics[g],paragrafoAtual);
            
            } //fim do looping graficos leadings
        
        } //fim do looping paragrafo
        
} //fim do looping stories

//*************  FECHA PROGRESS BAR ******************
myProgressPanel.close();


alert("Concluido com sucesso");

}

}
catch(e){

        //Fecha o progress bar se estiver aberto
        try{
            myProgressPanel.close();
            }
        catch(e){
            }
	//Erro do programa
    if(e == "Error: Invalid object for this request." || e == "TypeError: null is not an object"){
        e = "Página "+graficoNaPagina+": Alça com texto com texto oculto.";
        }
	alert("Ocorreu um erro: \n"+ e);
	}
    