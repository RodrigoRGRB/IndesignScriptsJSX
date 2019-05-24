#targetengine "session"


//************************* REMOVER MENU ANTERIOR  *****************
var menuPrincipal = app.menus.item("$ID/Main");
try{
var mySpecialFontMenu = menuPrincipal.submenus.item("Poliedro Scripts");
	//var mySpecialFontMenu = menuPrincipal.submenus.item("Script Menu Action");
	mySpecialFontMenu.remove();
}catch(myError){}

//************************* FIM REMOVER MENU ANTERIOR *****************



//Cria menu principal se não houver um
try{
    var scriptMenu = app.menus.item("$ID/Main").submenus.item("Poliedro Scripts");
    scriptMenu.title;
}
catch (e){
    var scriptMenu = app.menus.item("$ID/Main").submenus.add("Poliedro Scripts");
}

//Fechar PDF
try{
	var verificaSeExiste = app.menus.item("$ID/Main").submenus.item("Poliedro Scripts").menuItems.item("Fechar PDF");
	verificaSeExiste = verificaSeExiste.title;
}
//Se não existir, adiciona o menu
catch(e){
	var arquivo = new File( "/I/Objetos/Scripts/InDesign/MenuIndesign/Links/FecharPDFLink.jsx");
	var fecharPDFMenu = app.scriptMenuActions.add("Fechar PDF");
	fecharPDFMenu.eventListeners.add("onInvoke", arquivo);
	//Adiciona ao menu
	scriptMenu.menuItems.add(fecharPDFMenu);
	}



//Criar Capa
try{
	var verificaSeExiste = app.menus.item("$ID/Main").submenus.item("Poliedro Scripts").menuItems.item("Criar Capa");
	verificaSeExiste = verificaSeExiste.title;
}
//Se não existir, adiciona o menu
catch(e){
	var arquivo = new File( "/I/Objetos/Scripts/InDesign/MenuIndesign/Links/CriarCapaLink.jsx");
	var criarCapaMenu = app.scriptMenuActions.add("Criar Capa");
	criarCapaMenu.eventListeners.add("onInvoke", arquivo);
	//Adiciona ao menu
	scriptMenu.menuItems.add(criarCapaMenu);
}

/*
//********** SUBMENU FRAMES ***************
var framesMenu = scriptMenu.submenus.add("Frames");

//Frames > Juntar frames
var arquivo = new File( "/I/Objetos/Scripts/InDesign/MenuIndesign/Links/Frames/JuntarFramesSelecionados.jsx");
var myLabelGraphicMenuAction = app.scriptMenuActions.add("Juntar frames selecionados");
myLabelGraphicMenuAction.eventListeners.add("onInvoke", arquivo);
framesMenu.menuItems.add(myLabelGraphicMenuAction);

//Frames > Quebrar frames
var arquivo = new File( "/I/Objetos/Scripts/InDesign/MenuIndesign/Links/Frames/QuebrarFrameSelecionado.jsx");
var myLabelGraphicMenuAction = app.scriptMenuActions.add("Quebrar frames selecionados");
myLabelGraphicMenuAction.eventListeners.add("onInvoke", arquivo);
framesMenu.menuItems.add(myLabelGraphicMenuAction);

//********** FIM SUBMENU FRAMES ***************
*/


//********** SUBMENU PDF ***************
try{
	var verificaSeExiste = app.menus.item("$ID/Main").submenus.item("Poliedro Scripts").submenus.item("Ajustar PDF");
	verificaSeExiste = verificaSeExiste.title;
	var framesMenu = app.menus.item("$ID/Main").submenus.item("Poliedro Scripts").submenus.item("Ajustar PDF");
}
//Se não existir, adiciona o menu
catch(e){
	var framesMenu = scriptMenu.submenus.add("Ajustar PDF");
	}

//PDF > Ajustar cabeçalho
try{
	var verificaSeExiste = app.menus.item("$ID/Main").submenus.item("Poliedro Scripts").submenus.item("Ajustar PDF").menuItems.item("Ajustar cabeçalho");
	verificaSeExiste = verificaSeExiste.title;
}
//Se não existir, adiciona o menu
catch(e){
	var arquivo = new File( "/I/Objetos/Scripts/InDesign/MenuIndesign/Links/PDF/AjusteCabecalhoLink.jsx");
	var myLabelGraphicMenuAction = app.scriptMenuActions.add("Ajustar cabeçalho");
	myLabelGraphicMenuAction.eventListeners.add("onInvoke", arquivo);
	framesMenu.menuItems.add(myLabelGraphicMenuAction);
}

//PDF > AplicarBordasSelecaoLink
try{
	var verificaSeExiste = app.menus.item("$ID/Main").submenus.item("Poliedro Scripts").submenus.item("Ajustar PDF").menuItems.item("Aplicar bordas na seleção");
	verificaSeExiste = verificaSeExiste.title;
}
//Se não existir, adiciona o menu
catch(e){
	var arquivo = new File( "/I/Objetos/Scripts/InDesign/MenuIndesign/Links/PDF/AplicarBordasSelecaoLink.jsx");
	var myLabelGraphicMenuAction = app.scriptMenuActions.add("Aplicar bordas na seleção");
	myLabelGraphicMenuAction.eventListeners.add("onInvoke", arquivo);
	framesMenu.menuItems.add(myLabelGraphicMenuAction);
}

//PDF > BordasDaPaginaLink
try{
	var verificaSeExiste = app.menus.item("$ID/Main").submenus.item("Poliedro Scripts").submenus.item("Ajustar PDF").menuItems.item("Bordas da página");
	verificaSeExiste = verificaSeExiste.title;
}
//Se não existir, adiciona o menu
catch(e){
	var arquivo = new File( "/I/Objetos/Scripts/InDesign/MenuIndesign/Links/PDF/BordasDaPaginaLink.jsx");
	var myLabelGraphicMenuAction = app.scriptMenuActions.add("Bordas da página");
	myLabelGraphicMenuAction.eventListeners.add("onInvoke", arquivo);
	framesMenu.menuItems.add(myLabelGraphicMenuAction);
}

//PDF > InserirErratasLink
try{
	var verificaSeExiste = app.menus.item("$ID/Main").submenus.item("Poliedro Scripts").submenus.item("Ajustar PDF").menuItems.item("Inserir erratas");
	verificaSeExiste = verificaSeExiste.title;
}
//Se não existir, adiciona o menu
catch(e){
	var arquivo = new File( "/I/Objetos/Scripts/InDesign/MenuIndesign/Links/PDF/InserirErratasLink.jsx");
	var myLabelGraphicMenuAction = app.scriptMenuActions.add("Inserir erratas");
	myLabelGraphicMenuAction.eventListeners.add("onInvoke", arquivo);
	framesMenu.menuItems.add(myLabelGraphicMenuAction);
}

//PDF > PDFbordasLink
try{
	var verificaSeExiste = app.menus.item("$ID/Main").submenus.item("Poliedro Scripts").submenus.item("Ajustar PDF").menuItems.item("Sangria 5mm");
	verificaSeExiste = verificaSeExiste.title;
}
//Se não existir, adiciona o menu
catch(e){
	var arquivo = new File( "/I/Objetos/Scripts/InDesign/MenuIndesign/Links/PDF/PDFbordasLink.jsx");
	var myLabelGraphicMenuAction = app.scriptMenuActions.add("Sangria 5mm");
	myLabelGraphicMenuAction.eventListeners.add("onInvoke", arquivo);
	framesMenu.menuItems.add(myLabelGraphicMenuAction);
}

//PDF > PDFBordasMatematicaLink
try{
	var verificaSeExiste = app.menus.item("$ID/Main").submenus.item("Poliedro Scripts").submenus.item("Ajustar PDF").menuItems.item("95% (Exatas)");
	verificaSeExiste = verificaSeExiste.title;
}
//Se não existir, adiciona o menu
catch(e){
	var arquivo = new File( "/I/Objetos/Scripts/InDesign/MenuIndesign/Links/PDF/PDFBordasMatematicaLink.jsx");
	var myLabelGraphicMenuAction = app.scriptMenuActions.add("95% (Exatas)");
	myLabelGraphicMenuAction.eventListeners.add("onInvoke", arquivo);
	framesMenu.menuItems.add(myLabelGraphicMenuAction);
}

//PDF > PDFplacerLink
try{
	var verificaSeExiste = app.menus.item("$ID/Main").submenus.item("Poliedro Scripts").submenus.item("Ajustar PDF").menuItems.item("PDF Placer");
	verificaSeExiste = verificaSeExiste.title;
}
//Se não existir, adiciona o menu
catch(e){
	var arquivo = new File( "/I/Objetos/Scripts/InDesign/MenuIndesign/Links/PDF/PDFplacerLink.jsx");
	var myLabelGraphicMenuAction = app.scriptMenuActions.add("PDF Placer");
	myLabelGraphicMenuAction.eventListeners.add("onInvoke", arquivo);
	framesMenu.menuItems.add(myLabelGraphicMenuAction);
}

//PDF > PDFplacerLink
try{
	var verificaSeExiste = app.menus.item("$ID/Main").submenus.item("Poliedro Scripts").submenus.item("Ajustar PDF").menuItems.item("Ajustar sangria");
	verificaSeExiste = verificaSeExiste.title;
}
//Se não existir, adiciona o menu
catch(e){
	var arquivo = new File( "/I/Objetos/Scripts/InDesign/MenuIndesign/Links/PDF/PDFAjustarSangriaLink.jsx");
	var myLabelGraphicMenuAction = app.scriptMenuActions.add("Ajustar sangria");
	myLabelGraphicMenuAction.eventListeners.add("onInvoke", arquivo);
	framesMenu.menuItems.add(myLabelGraphicMenuAction);
}

//********** FIM SUBMENU PDF ***************
