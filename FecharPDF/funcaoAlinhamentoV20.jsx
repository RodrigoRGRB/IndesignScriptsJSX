//FUNÇÕES DE ALINHAMENTO
		function alinharDireita(){
			var distancia;
			//var bordasRetangulo = myRectangle.geometricBounds;
			var bordasRetangulo = myRectangle.geometricBounds;
			var bordasLink = myRectangle.graphics[0].geometricBounds;
			
			//Distancia da borda direita do retangulo até o link
			distancia = bordasRetangulo[3]-bordasLink[3];
			
			//Ajusta borda direita
			myRectangle.graphics[0].geometricBounds = [bordasLink[0], bordasLink[1]+distancia, bordasLink[2], bordasRetangulo[3]];
			
			//alert("executando");
			
			}

		function alinharEsquerda(){
			var distancia;
            //alert(myRectangle.geometricBounds);
			var bordasRetangulo = myRectangle.geometricBounds;  
			var bordasLink = myRectangle.graphics[0].geometricBounds;
			
			//Distancia da borda esquerda do retangulo até o link
			distancia = bordasRetangulo[1]-bordasLink[1];
			
			//Ajusta borda direita
			myRectangle.graphics[0].geometricBounds = [bordasLink[0], bordasRetangulo[1], bordasLink[2], bordasLink[3]+distancia];
			
			}
		
		function alinharTopo(){
			var distancia;
			var bordasRetangulo = myRectangle.geometricBounds;
			var bordasLink = myRectangle.graphics[0].geometricBounds;
			
			//Distancia do topo até o link
			distancia = bordasRetangulo[0]-bordasLink[0];
			
			//Ajusta borda direita
			myRectangle.graphics[0].geometricBounds = [bordasRetangulo[0], bordasLink[1], bordasLink[2]+distancia, bordasLink[3]];
			}		
		
		function alinharBaixo(){ //***************************
			var distancia;
			var bordasRetangulo = myRectangle.geometricBounds;
			var bordasLink = myRectangle.graphics[0].geometricBounds;
			
			//Distancia do topo até o link
			distancia = bordasRetangulo[0]-bordasLink[0];
			
			//Ajusta borda direita
			myRectangle.graphics[0].geometricBounds = [bordasRetangulo[0], bordasLink[1], bordasLink[2]+distancia, bordasLink[3]];
			}

		function centralizarH(){
			var distancia;
			var bordasRetangulo = myRectangle.geometricBounds;
			var bordasLink = myRectangle.graphics[0].geometricBounds;
			
			distancia = (bordasRetangulo[3]-bordasLink[3])+(bordasRetangulo[1]-bordasLink[1]);
			
			//Ajusta borda direita
			myRectangle.graphics[0].geometricBounds = [bordasLink[0], bordasLink[1]+(distancia/2), bordasLink[2], bordasLink[3]+(distancia/2)];
			
			}

		function centralizarV(){
			var distancia;
			var bordasRetangulo = myRectangle.geometricBounds;
			var bordasLink = myRectangle.graphics[0].geometricBounds;
			
			//Distancia da borda até o link
			distancia = (bordasRetangulo[0]-bordasLink[0])+(bordasRetangulo[2]-bordasLink[2]);
			
			//Ajusta borda direita
			myRectangle.graphics[0].geometricBounds = [bordasLink[0]+(distancia/2), bordasLink[1], bordasLink[2]+(distancia/2), bordasLink[3]];
			
			}
		
		function centralizar(){
			centralizarH ();
			centralizarV ();
			}
		
//FIM DAS FUNÇÕES DE ALINHAMENTO

