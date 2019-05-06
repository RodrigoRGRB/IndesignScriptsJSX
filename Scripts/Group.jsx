var myWindow = new Window ("dialog","Criação de capa");
    var myInputGroup = myWindow.add("group");
        myInputGroup.add("statictext", undefined, "Nome:");
        var myText = myInputGroup.add ("edittext", undefined, "Rodrigo");
            myText.characters = 20;
            myText.active = true;
        
    var myButtonGroup = myWindow.add("group");
        myButtonGroup.alignment = "right";
        myButtonGroup.add("button", undefined, "OK");
        myButtonGroup.add("button",undefined,"Cancel");
        
 myWindow.show();