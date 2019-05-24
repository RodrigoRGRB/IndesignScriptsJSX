//Adiciona o script  "equationAjustaBaselineV2" após o place
var placeMenuAction = app.menus.item("$ID/Main").submenus.item("$ID/File").menuItems.item("$ID/Place...").associatedMenuAction;

//var arquivo = new File( "/I/Objetos/Scripts/InDesign/MenuIndesign/Links/Fechar_PDF_link2.jsx");
//var arquivo = new File("/D/Lucas/Temp/ScriptTemp/EquacaoMathType/equationAjustaBaseline.jsx");
var arquivo = new File("/I/Objetos/Scripts/InDesign/EquacaoMathType/equationAjustaBaselineV2.jsx");
 
placeMenuAction.addEventListener("afterInvoke", arquivo);