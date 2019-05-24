//var eqn = File( "/D/Lucas/TempScriptTemp/equacao.eps");

//var eqn = File( "/D/Lucas/TempScriptTemp/equacao.eps");

var eqn = File.openDialog("Salvar PDF ");

eqn.open("r");

//alert(eqn.read(2));
var baseline = eqn.read(1000).split("%%Baseline: ");

//alert(baseline[1]);
var baseline = baseline[1].split("%%");

//alert(baseline[0]);	
baseline = baseline[0];
eqn.close();

alert(baseline);


/*Lista os submenus do menu "File"
var action= app.menus.item("$ID/Main");

alert(app.menus.item("$ID/Main").submenus.item("$ID/File").menuItems.length);

var array = app.menus.item("$ID/Main").submenus.item("$ID/File").menuItems;

for(i=0;i<array.length;i++){
	
	alert(array[i].name);
	
	}
	*/