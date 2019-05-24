if(new Folder('/I/').exists)
{
    
    var conteudo = " \if(new Folder('/I/').exists) \
{ \
    $.evalFile('/I/Objetos/Scripts/InDesign/MenuIndesign/AdicionaMenuPoliedro.jsx'); \
} \
else \
{ \
   alert('Não foi possível adicionar o menu \"Poliedro Scripts\".\\nÉ necessário mapear a pasta \"Banco de Imagens\" como \"I:\".','Poliedro script'); \
} \
";
    new Folder($.getenv('USERPROFILE')+"/Dados de aplicativos/Adobe/InDesign/Version 8.0/en_GB/Scripts/Startup Scripts").create();
    var file = new File($.getenv('USERPROFILE')+"/Dados de aplicativos/Adobe/InDesign/Version 8.0/en_GB/Scripts/Startup Scripts/AdicionaMenuPoliedroLink.jsx");
    file.open( "w" ); 
    file.write(conteudo);
    file.close(); 
    
    $.evalFile("/I/Objetos/Scripts/InDesign/MenuIndesign/AdicionaMenuPoliedro.jsx");

    alert("Agora os scripts serão acessados na barra superior do Indesign, ao lado do menu 'Help'","Menu 'Poliedro Scripts' - Lucas ®");

}
else
{
   alert('Não foi possível adicionar o menu "Poliedro Scripts".\nÉ necessário mapear a pasta "Banco de Imagens" como "I:".','Poliedro script'); 
}