if(new Folder('/I/').exists)
{
    
    var conteudo = " \if(new Folder('/I/').exists) \
{ \
    $.evalFile('/I/Objetos/Scripts/InDesign/MenuIndesign/AdicionaMenu2Poliedro.jsx'); \
} \
else \
{ \
   alert('Não foi possível adicionar o menu \"PDF Final - Erratas\".\\nÉ necessário mapear a pasta \"Banco de Imagens\" como \"I:\".','Scripts Poliedro'); \
} \
";
    new Folder($.getenv('USERPROFILE')+"/Dados de aplicativos/Adobe/InDesign/Version 6.0/en_GB/Scripts/Startup Scripts").create();
    var file = new File($.getenv('USERPROFILE')+"/Dados de aplicativos/Adobe/InDesign/Version 6.0/en_GB/Scripts/Startup Scripts/AddMenuPoliedroLink2.jsx");
    file.open( "w" ); 
    file.write(conteudo);
    file.close(); 

    new Folder($.getenv('USERPROFILE')+"/Dados de aplicativos/Adobe/InDesign/Version 7.0/en_GB/Scripts/Startup Scripts").create();
    var file = new File($.getenv('USERPROFILE')+"/Dados de aplicativos/Adobe/InDesign/Version 7.0/en_GB/Scripts/Startup Scripts/AddMenuPoliedroLink2.jsx");
    file.open( "w" ); 
    file.write(conteudo);
    file.close(); 
    
    $.evalFile("/I/Objetos/Scripts/InDesign/MenuIndesign/AdicionaMenu2Poliedro.jsx");

    alert("Agora os scripts serão acessados na barra superior do Indesign, ao lado do menu 'Help'","Menu 'PDF Final - Erratas'");

}
else
{
   alert('Não foi possível adicionar o menu "PDF Final - Erratas".\nÉ necessário mapear a pasta "Banco de Imagens" como "I:".','Scripts Poliedro'); 
}