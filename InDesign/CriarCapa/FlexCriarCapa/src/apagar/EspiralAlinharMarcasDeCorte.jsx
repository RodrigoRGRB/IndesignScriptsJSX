var myDocument = app.activeDocument;
var capaAltura = 280;
var capaLargura = 210;



         //PÁGINA 01
         //Alinha a primeira marca de corte - OK
		var bordaAtual = myDocument.groups[0].geometricBounds;
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[0].geometricBounds = [-10,-10,0,0];

		//Alinha a segunda marca de corte (registro)
		var bordaAtual = myDocument.groups[1].geometricBounds;
		var altura = bordaAtual[2]-bordaAtual[0];
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[1].geometricBounds = [(capaAltura/2)-(altura/2),0-largura-1,(capaAltura/2)+(altura/2),-1];
		
		//Alinha a terceira marca de corte 
		var bordaAtual = myDocument.groups[2].geometricBounds;
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[2].geometricBounds = [capaAltura,-10,capaAltura+10,0];
        
		//Alinha a sexta marca de corte  (registro)
		var bordaAtual = myDocument.groups[3].geometricBounds;
		var altura = bordaAtual[2]-bordaAtual[0];
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[3].geometricBounds = [0-1-altura,(capaLargura/2)-(largura/2),-1,(capaLargura/2)+(largura/2)];	

		//Alinha a sétima marca de corte  (registro)
		var bordaAtual = myDocument.groups[4].geometricBounds;
		var altura = bordaAtual[2]-bordaAtual[0];
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[4].geometricBounds = [capaAltura+1,(capaLargura/2)-(largura/2),capaAltura+altura+1,(capaLargura/2)+(largura/2)];
		
		//Alinha a décima marca de corte - OK
		var bordaAtual = myDocument.groups[5].geometricBounds;
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[5].geometricBounds = [-10,capaLargura,0,capaLargura+10];

		//Alinha a décima primeira marca de corte (registro)
		var bordaAtual = myDocument.groups[6].geometricBounds;
		var altura = bordaAtual[2]-bordaAtual[0];
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[6].geometricBounds = [(capaAltura/2)-(altura/2),capaLargura+1,(capaAltura/2)+(altura/2),capaLargura+1+largura];

		//Alinha a décima segunda marca de corte - OK
		var bordaAtual = myDocument.groups[7].geometricBounds;
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[7].geometricBounds = [capaAltura,capaLargura,capaAltura+10,capaLargura+10];
        
         //PÁGINA 02
         //Alinha a primeira marca de corte - OK
		var bordaAtual = myDocument.groups[8].geometricBounds;
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[8].geometricBounds = [-10,-10,0,0];

		//Alinha a segunda marca de corte (registro)
		var bordaAtual = myDocument.groups[9].geometricBounds;
		var altura = bordaAtual[2]-bordaAtual[0];
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[9].geometricBounds = [(capaAltura/2)-(altura/2),0-largura-1,(capaAltura/2)+(altura/2),-1];
		
		//Alinha a terceira marca de corte 
		var bordaAtual = myDocument.groups[10].geometricBounds;
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[10].geometricBounds = [capaAltura,-10,capaAltura+10,0];
        
		//Alinha a sexta marca de corte  (registro)
		var bordaAtual = myDocument.groups[11].geometricBounds;
		var altura = bordaAtual[2]-bordaAtual[0];
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[11].geometricBounds = [0-1-altura,(capaLargura/2)-(largura/2),-1,(capaLargura/2)+(largura/2)];

		//Alinha a sétima marca de corte  (registro)
		var bordaAtual = myDocument.groups[12].geometricBounds;
		var altura = bordaAtual[2]-bordaAtual[0];
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[12].geometricBounds = [capaAltura+1,(capaLargura/2)-(largura/2),capaAltura+altura+1,(capaLargura/2)+(largura/2)];
		
		//Alinha a décima marca de corte - OK
		var bordaAtual = myDocument.groups[13].geometricBounds;
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[13].geometricBounds = [-10,capaLargura,0,capaLargura+10];

		//Alinha a décima primeira marca de corte (registro)
		var bordaAtual = myDocument.groups[14].geometricBounds;
		var altura = bordaAtual[2]-bordaAtual[0];
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[14].geometricBounds = [(capaAltura/2)-(altura/2),capaLargura+1,(capaAltura/2)+(altura/2),capaLargura+1+largura];

		//Alinha a décima segunda marca de corte - OK
		var bordaAtual = myDocument.groups[15].geometricBounds;
		var largura = bordaAtual[3]-bordaAtual[1];
		myDocument.groups[15].geometricBounds = [capaAltura,capaLargura,capaAltura+10,capaLargura+10];