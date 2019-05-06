var box = new Window('dialog', "Propriedades da capa ");  
  box.alignChildren = "left";

box.panel = box.add('panel', undefined, "Tamanho da capa (em milímetros)"); 
box.panel.orientation = "row";
var espiral = box.panel.add ("checkbox", undefined, "Espiral");
espiral.window.margins = [20,20,20,20];
box.panel.add("statictext", undefined, "Largura:");
var largura = box.panel.add("edittext",undefined, "205");
           largura.characters = 15;
box.panel.add("statictext", undefined, "Altura:");     
var altura = box.panel.add("edittext",undefined, "275");
           altura.characters = 15;
box.panel.add("statictext", undefined, "Página:");
var paginas = box.panel.add("edittext",undefined, "300");
           paginas.characters = 15;

           
var groupLombada = box.add("group");
groupLombada.add("statictext", undefined, "Lombada:");
var lombada = groupLombada.add("edittext",undefined, "16");
           lombada.characters = 30;
var buttonLombada = groupLombada.add("button", undefined, "Calcular Lombada", {name: 'calcularLombada'});

box.sangria = box.add('panel', undefined, "Tamanho da sangria (em milímetros)"); 
box.sangria.orientation = "row";
box.sangria.add("statictext", undefined, "Direita/Esquerda:");
var direita_esquerda = box.sangria.add("edittext",undefined, "5");
           direita_esquerda.characters = 15;
box.sangria.add("statictext", undefined, "Inferior/Superior:");     
var inferior_superior = box.sangria.add("edittext",undefined, "5");
           inferior_superior.characters = 15;


  
box.panel2 = box.add('panel', undefined, "Title (not displayed)");  
box.panel2.group = box.panel2.add('group', undefined );  
box.panel2.group.orientation='row';  
  
box.panel2.group.text1 = box.panel2.group.add('statictext', undefined, "Press Button to close");  
box.panel2.group.closeBtn = box.panel2.group.add('button',undefined, "Close", {name:'close'});  


  
box.panel2.group.closeBtn.onClick = function(){  
  box.close();  
} 


buttonLombada.onClick = function(){
    teste.show();
}
  
var teste = new Window('dialog', "Calcular Lombada "); 
teste.panel = teste.add('panel', undefined, "Abriu caralho"); 

teste.text1 = teste.add('statictext', undefined, "Press Button to close");  
teste.closeBtn = teste.add('button',undefined, "Close", {name:'fechar'});  

teste.closeBtn.onClick = function(){
   lombada.text = "Pokemon";
   teste.close();
}


 
  
  
box.show() 

