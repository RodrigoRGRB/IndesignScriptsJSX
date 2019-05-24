 if(new Folder('/I/').exists) 
{ 
    $.evalFile('/I/Objetos/Scripts/InDesign/MenuIndesign/AdicionaMenuPoliedro.jsx'); 
} 
else 
{ 
   alert('Não foi possível adicionar o menu "Poliedro Scripts".\nÉ necessário mapear a pasta "Banco de Imagens" como "I:".','Poliedro script'); 
} 
