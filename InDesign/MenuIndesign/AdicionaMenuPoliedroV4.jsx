#includepath "/I/Objetos/Scripts/InDesign/EquacaoMathType"
#include "placeAction.jsx"

#targetengine "session"

//************************* REMOVER MENU ANTERIOR  *****************
var menuPrincipal = app.menus.item("$ID/Main");
try{
var mySpecialFontMenu = menuPrincipal.submenus.item("Poliedro Scripts");
//var mySpecialFontMenu = menuPrincipal.submenus.item("Script Menu Action");
mySpecialFontMenu.remove();
}catch(myError){}

//************************* FIM REMOVER MENU ANTERIOR *****************

//following creates menu if it does not exist
try{
    var scriptMenu = app.menus.item("$ID/Main").submenus.item("Poliedro Scripts");
    scriptMenu.title;
}
catch (e){
    var scriptMenu = app.menus.item("$ID/Main").submenus.add("Poliedro Scripts");
}


//Fechar PDF
var arquivo = new File( "/I/Objetos/Scripts/InDesign/MenuIndesign/Links/FecharPDFLink.jsx");
var fecharPDFMenu = app.scriptMenuActions.add("Fechar PDF...");
fecharPDFMenu.eventListeners.add("onInvoke", arquivo);
//Adiciona ao menu
scriptMenu.menuItems.add(fecharPDFMenu);

//Criar Capa
var arquivo = new File( "/I/Objetos/Scripts/InDesign/MenuIndesign/Links/CriarCapaLink.jsx");
var criarCapaMenu = app.scriptMenuActions.add("Criar Capa...");
criarCapaMenu.eventListeners.add("onInvoke", arquivo);
//Adiciona ao menu
scriptMenu.menuItems.add(criarCapaMenu);

//Remover carimbo
var arquivo = new File( "/I/Objetos/Scripts/InDesign/FecharPDF/RemoverCarimbo.jsx");
var removerCarimboMenu = app.scriptMenuActions.add("Remover carimbo");
removerCarimboMenu.eventListeners.add("onInvoke", arquivo);
//Adiciona ao menu
scriptMenu.menuItems.add(removerCarimboMenu);

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
var framesMenu = scriptMenu.submenus.add("Ajustar PDF");

//PDF > Ajustar cabeçalho
var arquivo = new File( "/I/Objetos/Scripts/InDesign/MenuIndesign/Links/PDF/AjusteCabecalhoLink.jsx");
var myLabelGraphicMenuAction = app.scriptMenuActions.add("Ajustar cabeçalho");
myLabelGraphicMenuAction.eventListeners.add("onInvoke", arquivo);
framesMenu.menuItems.add(myLabelGraphicMenuAction);

//PDF > AplicarBordasSelecaoLink
var arquivo = new File( "/I/Objetos/Scripts/InDesign/MenuIndesign/Links/PDF/AplicarBordasSelecaoLink.jsx");
var myLabelGraphicMenuAction = app.scriptMenuActions.add("Aplicar bordas na seleção");
myLabelGraphicMenuAction.eventListeners.add("onInvoke", arquivo);
framesMenu.menuItems.add(myLabelGraphicMenuAction);

//PDF > BordasDaPaginaLink
var arquivo = new File( "/I/Objetos/Scripts/InDesign/MenuIndesign/Links/PDF/BordasDaPaginaLink.jsx");
var myLabelGraphicMenuAction = app.scriptMenuActions.add("Bordas da página");
myLabelGraphicMenuAction.eventListeners.add("onInvoke", arquivo);
framesMenu.menuItems.add(myLabelGraphicMenuAction);

//PDF > InserirErratasLink
var arquivo = new File( "/I/Objetos/Scripts/InDesign/MenuIndesign/Links/PDF/InserirErratasLink.jsx");
var myLabelGraphicMenuAction = app.scriptMenuActions.add("Inserir erratas");
myLabelGraphicMenuAction.eventListeners.add("onInvoke", arquivo);
framesMenu.menuItems.add(myLabelGraphicMenuAction);

//PDF > PDFbordasLink
var arquivo = new File( "/I/Objetos/Scripts/InDesign/MenuIndesign/Links/PDF/PDFbordasLink.jsx");
var myLabelGraphicMenuAction = app.scriptMenuActions.add("Sangria 5mm");
myLabelGraphicMenuAction.eventListeners.add("onInvoke", arquivo);
framesMenu.menuItems.add(myLabelGraphicMenuAction);

//PDF > PDFBordasMatematicaLink
var arquivo = new File( "/I/Objetos/Scripts/InDesign/MenuIndesign/Links/PDF/PDFBordasMatematicaLink.jsx");
var myLabelGraphicMenuAction = app.scriptMenuActions.add("95% (Exatas)");
myLabelGraphicMenuAction.eventListeners.add("onInvoke", arquivo);
framesMenu.menuItems.add(myLabelGraphicMenuAction);

//PDF > PDFplacerLink
var arquivo = new File( "/I/Objetos/Scripts/InDesign/MenuIndesign/Links/PDF/PDFplacerLink.jsx");
var myLabelGraphicMenuAction = app.scriptMenuActions.add("PDF Placer");
myLabelGraphicMenuAction.eventListeners.add("onInvoke", arquivo);
framesMenu.menuItems.add(myLabelGraphicMenuAction);

//PDF > PDFplacerLink
var arquivo = new File( "/I/Objetos/Scripts/InDesign/MenuIndesign/Links/PDF/PDFAjustarSangriaLink.jsx");
var myLabelGraphicMenuAction = app.scriptMenuActions.add("Ajustar sangria");
myLabelGraphicMenuAction.eventListeners.add("onInvoke", arquivo);
framesMenu.menuItems.add(myLabelGraphicMenuAction);

//********** FIM SUBMENU PDF ***************

//********** SUBMENU PASSO A PASSO ***************
var passoApassoMenu = scriptMenu.submenus.add("Passo a Passo");

//********** SUBMENU EXATAS ***************
var exatasMenu = passoApassoMenu.submenus.add("Exatas");

//EXATAS > ETAPA 01
var arquivo = new File("/I/Objetos/Scripts/InDesign/MenuIndesign/Links/PassoAPasso/Exatas/01_ExportarPDFTemporario_Link.jsx");
var myLabelGraphicMenuAction = app.scriptMenuActions.add("01 - Exportar PDF temporário");
myLabelGraphicMenuAction.eventListeners.add("onInvoke", arquivo);
exatasMenu.menuItems.add(myLabelGraphicMenuAction);

//EXATAS > ETAPA 02
var arquivo = new File("/I/Objetos/Scripts/InDesign/MenuIndesign/Links/PassoAPasso/Exatas/02_ImportarPDFTemporario_Link.jsx");
var myLabelGraphicMenuAction = app.scriptMenuActions.add("02 - Importar PDF temporário");
myLabelGraphicMenuAction.eventListeners.add("onInvoke", arquivo);
exatasMenu.menuItems.add(myLabelGraphicMenuAction);

//EXATAS > ETAPA 03
var arquivo = new File("/I/Objetos/Scripts/InDesign/MenuIndesign/Links/PassoAPasso/Exatas/03_ExportarPDFFinal_Link.jsx");
var myLabelGraphicMenuAction = app.scriptMenuActions.add("03 - Exportar PDF final");
myLabelGraphicMenuAction.eventListeners.add("onInvoke", arquivo);
exatasMenu.menuItems.add(myLabelGraphicMenuAction);


//********** MATH TYPE MENU ***************
//Botar para ativar/Desavitar o placeMathType
var menuName = "Ajustar equacões do MathType";

var arquivo = new File("/I/Objetos/Scripts/InDesign/EquacaoMathType/removePlaceAction.jsx");
var myLabelGraphicMenuAction = app.scriptMenuActions.add(menuName);
myLabelGraphicMenuAction.eventListeners.add("onInvoke", arquivo);
scriptMenu.menuItems.add(myLabelGraphicMenuAction);
//Valor default para o botao
scriptMenu.menuItems.item(menuName).associatedMenuAction.checked = true;



/*

//Fechar PDF
var arquivo = new File( "/I/Objetos/Scripts/InDesign/MenuIndesign/Links/FecharPDFLink.jsx");
var fecharPDFMenu = app.scriptMenuActions.add("Fechar PDF");
fecharPDFMenu.eventListeners.add("onInvoke", arquivo);
//Adiciona ao menu
scriptMenu.menuItems.add(fecharPDFMenu);

//Desativa/Ativa o PDF Placer para equations
var framesMenu = scriptMenu.submenus.add("Ajustar PDF");
*/