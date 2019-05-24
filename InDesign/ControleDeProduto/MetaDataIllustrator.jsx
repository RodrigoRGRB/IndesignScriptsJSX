// load XMP Library
function loadXMPLibrary(){
    if ( !ExternalObject.AdobeXMPScript ){
        try{ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');}
        catch (e){alert('Unable to load the AdobeXMPScript library!'); return false;}
    }
    return true;
}

var myXmp = new XMPMeta(app.activeDocument.XMPString);

myXmp.
 
var xmpFile = new XMPFile( app.activeDocument.fsName, XMPConst.UNKNOWN, XMPConst.OPEN_FOR_UPDATE );
 
if(myXmp){
    var destNamespace = "http://purl.org/dc/elements/1.2/";
    // define new namespace
    XMPMeta.registerNamespace(destNamespace,"dc");
    // insert nodes
//~     myXmp.setProperty(destNamespace,"description","Hahaha");
    myXmp.setProperty(destNamespace,"e-mail","indisnip@gmail.com");
    myXmp.setProperty(destNamespace,"web_site","http://indisnip.wordpress.com");
    myXmp.setProperty(destNamespace,"Version","1.0b");
    xmpFile.putXMP(myXmp);
    // put XMP into file
//~     if (xmpFile.canPutXMP(myXmp)){xmpFile.putXMP(myXmp);}else{alert("Error storing XMP");}
    // close file
    xmpFile.closeFile(XMPConst.CLOSE_UPDATE_SAFELY);
}