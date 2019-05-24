	win.buttons.okBtn.onClick = function()
	{
		//var todosOsCampos = ""+win.grupoPredefinicao.grupoTamanhoPagina.info.largura.inputLargura.text + win.grupoPredefinicao.grupoTamanhoPagina.info.altura.inputAltura.text + win.grupoPredefinicao.grupoTamanhoPagina.info.lombada.inputLombada.text + win.grupoSangria.info.DirEsq.inputDirEsq.text + win.grupoSangria.info.InfSup.inputInfSup.text;
		//var todosOsCampos = todosOsCampos.split(",");
		//alert(todosOsCampos.length);
			
		if(win.grupoTamanhoPagina.info.largura.inputLargura == ""){
			alert("Digite um valor para a largura");
			}
		else if(win.grupoTamanhoPagina.info.altura.inputAltura == ""){
			alert("Digite um valor para a altura");
			}		
		else if(win.grupoSangria.info.DirEsq.inputDirEsq == ""){
			alert("Digite um valor para a sangria Direita/Esquerda");
			}	
		else if(win.grupoSangria.info.InfSup.inputInfSup == ""){
			alert("Digite um valor para a sangria Inferior/Superior");
			}		
		else if(win.grupoPredefinicao.grupoPorcentagem.grupoCheckBox.chkBox.value == false && win.grupoPorcentagem.info.porcentagemH.inputH == ""){
			alert("Digite um valor para a porcentagem horizontal");
			}
		else if(win.grupoPredefinicao.grupoPorcentagem.grupoCheckBox.chkBox.value == false && win.grupoPorcentagem.info.porcentagemV.inputV == "" ){
			alert("Digite um valor para a porcentagem vertical");
			}
		else if(todosOsCampos.length>1){
			alert("Utilize ponto (.) ao invés de vírgula (,)");
			}
	
		else{
			rodaPrograma = true;
			win.close();

			//Se tudo correto, inicializa as variáveis
			var carimbo = win.grupoProva.whichInfo.selection.text;

			//Recebe valor dos campos
			var distorcaoHorizontal = win.grupoPredefinicao.grupoPorcentagem.info.porcentagemH.inputH.text;
			var distorcaoVertical = win.grupoPredefinicao.grupoPorcentagem.info.porcentagemV.inputV.text;

			//Recebe o PDF Range. Se chkbox selecionado for 'intervalo', recebe o intervalo.
			if(win.grupoPaginas.paginas.radIntervalo.value == true){
				intervaloPDF = win.grupoPaginas.paginas.intervalo.text;
				with(app.pdfExportPreferences){
					//pageRange = "1, 3-6, 7, 9-11, 12";
					pageRange = intervaloPDF;
				}
			}

			//Executa o script Bordas Matemática
			var sangriaInfSup = parseInt(win.grupoPredefinicao.grupoSangria.info.InfSup.inputInfSup.text);
			var sangriaDirEsq =  parseInt(win.grupoPredefinicao.grupoSangria.info.DirEsq.inputDirEsq.text);
			var distorcerDeAcordoComMargem = win.grupoPredefinicao.grupoPorcentagem.grupoCheckBox.chkBox.value;
	
		}
	}	win.buttons.okBtn.onClick = function()
	{
		//var todosOsCampos = ""+win.grupoPredefinicao.grupoTamanhoPagina.info.largura.inputLargura.text + win.grupoPredefinicao.grupoTamanhoPagina.info.altura.inputAltura.text + win.grupoPredefinicao.grupoTamanhoPagina.info.lombada.inputLombada.text + win.grupoSangria.info.DirEsq.inputDirEsq.text + win.grupoSangria.info.InfSup.inputInfSup.text;
		//var todosOsCampos = todosOsCampos.split(",");
		//alert(todosOsCampos.length);
			
		if(win.grupoTamanhoPagina.info.largura.inputLargura == ""){
			alert("Digite um valor para a largura");
			}
		else if(win.grupoTamanhoPagina.info.altura.inputAltura == ""){
			alert("Digite um valor para a altura");
			}		
		else if(win.grupoSangria.info.DirEsq.inputDirEsq == ""){
			alert("Digite um valor para a sangria Direita/Esquerda");
			}	
		else if(win.grupoSangria.info.InfSup.inputInfSup == ""){
			alert("Digite um valor para a sangria Inferior/Superior");
			}		
		else if(win.grupoPredefinicao.grupoPorcentagem.grupoCheckBox.chkBox.value == false && win.grupoPorcentagem.info.porcentagemH.inputH == ""){
			alert("Digite um valor para a porcentagem horizontal");
			}
		else if(win.grupoPredefinicao.grupoPorcentagem.grupoCheckBox.chkBox.value == false && win.grupoPorcentagem.info.porcentagemV.inputV == "" ){
			alert("Digite um valor para a porcentagem vertical");
			}
		else if(todosOsCampos.length>1){
			alert("Utilize ponto (.) ao invés de vírgula (,)");
			}
	
		else{
			rodaPrograma = true;
			win.close();

			//Se tudo correto, inicializa as variáveis
			var carimbo = win.grupoProva.whichInfo.selection.text;

			//Recebe valor dos campos
			var distorcaoHorizontal = win.grupoPredefinicao.grupoPorcentagem.info.porcentagemH.inputH.text;
			var distorcaoVertical = win.grupoPredefinicao.grupoPorcentagem.info.porcentagemV.inputV.text;

			//Recebe o PDF Range. Se chkbox selecionado for 'intervalo', recebe o intervalo.
			if(win.grupoPaginas.paginas.radIntervalo.value == true){
				intervaloPDF = win.grupoPaginas.paginas.intervalo.text;
				with(app.pdfExportPreferences){
					//pageRange = "1, 3-6, 7, 9-11, 12";
					pageRange = intervaloPDF;
				}
			}

			//Executa o script Bordas Matemática
			var sangriaInfSup = parseInt(win.grupoPredefinicao.grupoSangria.info.InfSup.inputInfSup.text);
			var sangriaDirEsq =  parseInt(win.grupoPredefinicao.grupoSangria.info.DirEsq.inputDirEsq.text);
			var distorcerDeAcordoComMargem = win.grupoPredefinicao.grupoPorcentagem.grupoCheckBox.chkBox.value;
	
		}
	}