 if(new Folder('/I/').exists) 
{ 
    $.evalFile('/I/Objetos/Scripts/InDesign/MenuIndesign/AdicionaMenuPoliedro.jsx'); 
} 
else 
{ 
   alert('N�o foi poss�vel adicionar o menu "Poliedro Scripts".\n� necess�rio mapear a pasta "Banco de Imagens" como "I:".','Poliedro script'); 
} 
