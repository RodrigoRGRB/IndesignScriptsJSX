//Adiciona o script  "equationAjustaBaseline" após o place
var placeMenuAction = app.menus.item("$ID/Main").submenus.item("$ID/File").menuItems.item("$ID/Place...").associatedMenuAction;

//var arquivo = new File( "/I/Objetos/Scripts/InDesign/MenuIndesign/Links/FecharPDFLink.jsx");
//var arquivo = new File("/D/Lucas/Temp/ScriptTemp/EquacaoMathType/equationAjustaBaseline.jsx");
var arquivo = new File("/I/Objetos/Scripts/InDesign/EquacaoMathType/equationAjustaBaseline.jsx");

placeMenuAction.addEventListener("afterInvoke", arquivo);