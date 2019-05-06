var myWindow = new Window ("dialog","Criação de capa");
    myWindow.orientation = "row";
    myWindow.add("statictext", undefined, "Nome:");
        var myText = myWindow.add("edittext",undefined, "Rodrigo");
           myText.characters = 30;
     myWindow.onShow = function(){
            myText.active = true;
         }
           
     myWindow.show();