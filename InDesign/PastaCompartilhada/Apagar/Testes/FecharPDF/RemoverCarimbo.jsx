function removeCarimbo(){
	
	try{
		app.activeDocument.layers.item("ScriptLayer").remove();
	}
	catch(e){
			//alert(e);
		}

	}


 removeCarimbo();