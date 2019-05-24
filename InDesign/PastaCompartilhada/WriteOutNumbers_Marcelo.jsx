//DESCRIPTION:Convert Page Number Placeholder '#' into Text  
// A Jongware Script 11-Dec-2011  
// http://indesignsecrets.com/making-page-numbers-words-numbers.php
  
var allPages = app.activeDocument.pages;  
for (iterate=0; iterate<allPages.length; iterate++)  
{  
          customPageNumber (allPages[iterate]);  
}  
  
  
function customPageNumber (aPage)  
{  
          if (aPage.appliedMaster == null)  
                    return;  
  
  
          pageSide = (aPage.side == PageSideOptions.RIGHT_HAND) ? 1 : 0;  
          masterFrame = findFrameContaining (aPage.appliedMaster, pageSide, '#');  
          if (masterFrame != null)  
          {  
                    frame = findByLabel (aPage.pageItems, "page number");  
                    if (frame != null)  
                    {  
                              frame.removeOverride();  
                    }  
                    frame = masterFrame.override (aPage);  
                    frame.label = "page number";  
  
                    placeholder = frame.contents.indexOf ('#');  
                    if (placeholder != -1)  
                    {  
                              pageString = numberToText(Number(aPage.name));  
                              pageString = pageString.substr(0,1).toUpperCase()+pageString.substr(1);  
                              frame.characters[placeholder].contents = pageString;  
                    }  
          }  
}  
  
  
function findFrameContaining (master, side, text)  
{  
          var masterPage;  
          var i;  
  
          if (master.pages.length > 1)  
                    masterPage = master.pages[side];  
          else  
                    masterPage = master.pages[0];  
          for (i=0; i<masterPage.textFrames.length; i++)  
          {  
                    if (masterPage.textFrames[i].contents.indexOf(text) > -1)  
                              return masterPage.textFrames[i];  
          }  
          // Not found? Perhaps on this Master's Master?  
          if (master.appliedMaster != null)  
                    return findFrameContaining (master.appliedMaster, side, text);  
          return null;  
}  
  
  
// Needed because the very useful label lookup was  
// -- totally unnecessarily! -- removed in CS5+ ...  
function findByLabel (items, label)  
{  
          var i;  
          for (i=0; i<items.length; i++)  
                    if (items[i].label == label)  
                              return items[i];  
          return null;  
}  
  
  
function numberToText(number) {
    var ones = ["zero", "um", "dois", "três", "quatro", "cinco",
        "seis", "sete", "oito", "nove", "dez",
        "onze", "doze", "treze", "quatorze", "quinze",
        "dezesseis", "dezessete", "dezoito", "dezenove"];
    var tens = ["zero", "dez", "vinte", "trinta", "quarenta", "cinquenta",
        "sessenta", "setenta", "oitenta", "noventa"];
        var centenas = ["cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seissentos",
        "setecentos", "oitocentos", "novecentos"];
    var result = '';


    if (number < 0) return "ha ha";
    if (number == 0) return ones[0];


    if (number >= 1000) {
        thousand = Math.floor(number / 1000);
        if (thousand > 1) {
            result = numberToText(thousand) + " mil";
        } else {
            result = "mil";
        }
        number = number - 1000 * thousand;
        if (number > 0) result = result + " ";
    }


    if (number >= 101) {
        hundred = Math.floor(number / 100);
     
        if (hundred > 1) {
            result = result + centenas[hundred-1] ;
        } else {
            result = result + "cento";
        }
        number = number - 100 * hundred;
        if (number != 0) result = result + " e ";
    }



    if (number >= 20 && number < 100) {
        ten = Math.floor(number / 10);
        result = result + tens[ten];
        number = number - 10 * ten;
        if (number == 1) {
            result = result + " e ";
        }
        if (number != 0 && number != 1) result = result + " e ";
    }
    if (number != 0 && (number < 60 || number > 99)) result = result + ones[number];

if (number == 100) result = "cem";
    return result;
}