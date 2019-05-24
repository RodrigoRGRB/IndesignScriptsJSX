if (app.documents.length > 0)
{

//************************************
			//Torna visíveis todos os layers do arquivo
			//alert(app.activeDocument.layers.length);
			var numeroDeLayers = app.activeDocument.layers.length;
			//alert(numeroDeLayers);
			//alert(app.activeDocument.layers[0].layer.length);
			numeroDeLayers = numeroDeLayers -1;
			
			var layersVisiveis = new Array(numeroDeLayers);
			var layersTravados = new Array(numeroDeLayers);
			
			while(numeroDeLayers != -1) {
			
			layersVisiveis[numeroDeLayers] = app.activeDocument.layers[numeroDeLayers].visible;
			
			layersTravados[numeroDeLayers] = app.activeDocument.layers[numeroDeLayers].locked;
			
			app.activeDocument.layers[numeroDeLayers].visible = true;
			
			app.activeDocument.layers[numeroDeLayers].locked = false;
			
			numeroDeLayers--;
				
				}
			//************************************
			
//#includepath "/D/Lucas/Illustrator/JavaScript/Overprint&CoresSpot/"
#includepath "/I/Objetos/Scripts/Overprint&CoresSpot/"
#include "ConvertePathCMYK.jsx"
#include "ConverteCores.jsx"
#include "OverPrintBlack.jsx"


			//************************************
			//Torna invisíveis os layers que estavam neste estado			
			var numeroDeLayers = app.activeDocument.layers.length;
			numeroDeLayers = numeroDeLayers -1;
			
			while(numeroDeLayers != -1){

				//alert(app.activeDocument.layers[numeroDeLayers].visible);
				
				app.activeDocument.layers[numeroDeLayers].locked = layersTravados[numeroDeLayers];
				
				app.activeDocument.layers[numeroDeLayers].visible = layersVisiveis[numeroDeLayers]
				
				numeroDeLayers--;
				
				}
			//************************************

}
else 
{
alert ("Nenhum arquivo aberto","Lucas ®",true);
}