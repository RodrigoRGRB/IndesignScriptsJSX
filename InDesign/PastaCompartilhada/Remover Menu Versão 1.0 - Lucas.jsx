//************************* REMOVER MENU ANTERIOR - Versão 1.0 - Lucas  *****************
var menuPrincipal = app.menus.item("$ID/Main");
try{
var mySpecialFontMenu = menuPrincipal.submenus.item("Poliedro Scripts");
//var mySpecialFontMenu = menuPrincipal.submenus.item("Script Menu Action");
mySpecialFontMenu.remove();
}catch(myError){}

//************************* FIM REMOVER MENU ANTERIOR *****************