var menuName = "Ajustar equacões do MathType";

var scriptMenu = app.menus.item("$ID/Main").submenus.item("Poliedro Scripts");

var menuChecked = scriptMenu.menuItems.item(menuName).associatedMenuAction.checked;

if(menuChecked){
	menuChecked = false;
	}
else{
	menuChecked = true;
	}

scriptMenu.menuItems.item(menuName).associatedMenuAction.checked = menuChecked;