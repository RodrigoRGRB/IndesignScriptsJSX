var conteudo = "#includepath '/I/Objetos/Scripts/InDesign/MenuIndesign'\n#include 'AdicionaMenuPoliedro.jsx'";

//Cria o folder 'Startup Scripts'
//new Folder($.getenv('USERPROFILE')+"/Dados de aplicativos/Adobe/InDesign/Version 6.0/en_GB/Scripts/Startup Scripts").create();
new Folder($.getenv('PROGRAMFILES(X86)')+"/Adobe/Adobe InDesign CS6/Scripts/startup scripts").create();

//Cria o arquivo menu poliedro
var file = new File($.getenv('PROGRAMFILES(X86)')+"/Adobe/Adobe InDesign CS6/Scripts/startup scripts/AdicionaMenuPoliedroLink.jsx");
file.open( "w" ); 
file.write(conteudo);
file.close(); 

//Cria o folder 'Startup Scripts'
//new Folder("/C/Documents and Settings/Lucas.ribeiro/Dados de aplicativos/Adobe/InDesign/Version 6.0/en_GB/Scripts/Startup Scripts").create();
//new Folder($.getenv('USERPROFILE')+"/Dados de aplicativos/Adobe/InDesign/Version 7.0/en_GB/Scripts/Startup Scripts").create();

//Cria o arquivo menu poliedro
var file = new File($.getenv('PROGRAMFILES(X86)')+"/Adobe/Adobe InDesign CS6/Scripts/startup scripts/AdicionaMenuPoliedroLink.jsx");
file.open( "w" ); 
file.write(conteudo);
file.close(); 

//#includepath "/I/Objetos/Scripts/InDesign/MenuIndesign/Startup Scripts"
//#include "AdicionaMenuPoliedroLink.jsx"

//alert("Agora os scripts serão acessados na barra superior do Indesign, ao lado do menu 'Help'","Menu 'Poliedro Scripts' - Lucas ®");