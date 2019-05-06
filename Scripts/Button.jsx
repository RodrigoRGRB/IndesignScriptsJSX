var myWindow = new Window ("dialog","Criação de capa");
    myWindow.orientation = "row";
    myWindow.add("statictext", undefined, "Nome:");
        var myText = myWindow.add("edittext",undefined, "Rodrigo");
           myText.characters = 20;
           myText.active = true;
           
    myWindow.add("button",undefined, "OK");
    myWindow.add("button",undefined,"Cancel");
           
     myWindow.show();