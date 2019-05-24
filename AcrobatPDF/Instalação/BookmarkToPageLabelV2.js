//******************************FUNCOES
function pegaPrimeiroNumero(imageList){
	//var fName = imageList.name;
	
	//APAGAR ESTA LINHA
	var fName = imageList;
	
	var contadorCaracteres = 0;
	var primeiroNumero = "";
	
	while(fName.charAt(contadorCaracteres) != "-" && fName.charAt(contadorCaracteres) != "." && fName.charAt(contadorCaracteres) != ""){
	primeiroNumero = primeiroNumero + fName.charAt(contadorCaracteres);
	contadorCaracteres++;
	}
	
	return primeiroNumero;
	}

//******************************
function pegaUltimoNumero(imageList){
	//var fName = imageList.name;
	
	//APAGAR ESTA LINHA
	var fName = imageList;
	
	var contadorCaracteres = 0;
	var ultimoNumero = "";
	
		//Pega o ultimo numero do pdf
		var contadorCaracteres = fName.length;
		contadorCaracteres = contadorCaracteres -1;
		
		while(fName.charAt(contadorCaracteres) != "-" && fName.charAt(contadorCaracteres) != "" ){
			ultimoNumero = fName.charAt(contadorCaracteres) + ultimoNumero;
			contadorCaracteres--;
			}
		//alert(ultimoNumero); 
		return ultimoNumero;
}
//******************************

function roda(){
	
		//Cria o arrayBookmark que recebera a sequencia de toda a numeracao
		var arrayBookmark = new Array;

		//console.println(this.bookmarkRoot.children[0].name);

		//For para o bookmark
		for(i=0;i<this.bookmarkRoot.children.length;i++){
			
			//pega o primeiro numero do bookmark atual

			 var primeiroNumero = pegaPrimeiroNumero(this.bookmarkRoot.children[i].name);
			 //console.println("primeiro numero " + primeiroNumero);
			
			//pega o ultimo numero do bookmark (se existir)
			 var ultimoNumero = pegaUltimoNumero(this.bookmarkRoot.children[i].name);
			 //console.println("ultimo numero " + ultimoNumero);

				//Se ultimo numero igual ao primeiro numero, cria os numeros que foram ocultos
				if(primeiroNumero  != ultimoNumero){
					var preencheNum = parseInt(primeiroNumero,10);
					arrayBookmark[arrayBookmark.length] = preencheNum;
					
						while(preencheNum != ultimoNumero){
							arrayBookmark[arrayBookmark.length] = preencheNum+1;
							preencheNum++;
							
							}
					}
				else{
					var preencheNum = parseInt(primeiroNumero,10);
					arrayBookmark[arrayBookmark.length] = preencheNum;
					}
			}

		//console.println(arrayBookmark);

		//Adiciona todo o array Bookmark para as paginas do PDF
		for(i=0; i<this.numPages;i++){
				this.setPageLabels(i, [ "D", "", arrayBookmark[i]]);
			}

}

// add a toolbutton
app.addToolButton({
cName: "botaoBookmarks",
//cExec: "app.alert('Someone pressed me!')",
cExec: "roda()",
cTooltext: "Gerar 'page labels'",
cEnable: true,
nPos: 0
});

//app.removeToolButton("botaoBookmarks");
