	  function PermiteNumerico(event)
	  {
	    var code = event.keyCode || event.which;
	  	if( !((code >= 48 && code <= 57) || (code == 8 || code == 9 || code == 39 || code == 37)) )
		    event.returnValue=false;
		    
		  return event.returnValue;
	  }
  
	  function RealizaCalculo()
	  {
	  
	  	//Verifica campos
		if((document.getElementById('txtPaginas').value == "") || (document.getElementById('txtGramatura').value == "")){
			alert("Todos os campos devem ser preenchidos");
			return false;
		}
	  
	    //Basico divs
	    document.getElementById('divFormulario').style.display = "none";
	    document.getElementById('divResultado').style.display = "";
	    
	    //Calculo
	    var dr1 = document.getElementById('dropTipoPapel');
	    
	    var strTipoPapelSelecionado;
	    var erro = false;
	    var larg, alt, lamina, aproveit, formatoSelecionado;
	    var gramat = document.getElementById('txtGramatura').value;
	    var pags = document.getElementById('txtPaginas').value;
      document.getElementById('spnGramatura').innerHTML = gramat;
      document.getElementById('spnPaginas').innerHTML = pags;
	    
	    for (var i=0; i<dr1.options.length; i++) if (dr1.options[i].selected) strTipoPapelSelecionado = dr1.options[i].value;
      document.getElementById('spnTipoPapel').innerHTML = strTipoPapelSelecionado;
      
      var espess = 0;
      switch (strTipoPapelSelecionado)
      {
	  	case "Alta Alvura":
          switch (gramat)
          {
            case "63": espess = 74; break;
            case "70": espess = 83; break;
            case "75": espess = 99; break;
            case "90": espess = 104; break;
            case "120": espess = 143; break;
            case "150": espess = 180; break;
            case "180": espess = 221; break;
            case "240": espess = 295; break;
            default: erro = true;
          }
          break;
        case "Paperfect Offset":
          switch (gramat)
          {
            case "56": espess = 76; break;
            case "60": espess = 81; break;
            case "63": espess = 85; break;
            case "70": espess = 90; break;
            case "75": espess = 101; break;
            case "80": espess = 108; break;
            case "90": espess = 122; break;
            case "104": espess = 135; break;
            default: erro = true;
          }
          break;
        case "Soft":
          switch (gramat)
          {
            case "70": espess = 95; break;
            case "80": espess = 108; break;
            default: erro = true;
          }
          break;
        case "Bold":
          switch (gramat)
          {
            case "70": espess = 112; break;
            case "90": espess = 144; break;
            default: erro = true;
          }
          break;
        case "Reciclato":
          switch (gramat)
          {
            case "75": espess = 95; break;
            case "90": espess = 117; break;
            case "120": espess = 156; break;
            case "150": espess = 195; break;
            case "180": espess = 234; break;
            case "240": espess = 312; break;
            default: erro = true;
          }
          break;
        default: erro = true; break;
      }
      var result = ((espess/1000)*pags)/2;
      result = Math.floor(result+0.5);

      document.getElementById('spnLombada').innerHTML = result;

      if (erro)
      {
        document.getElementById('trErro').style.display = "";
        document.getElementById('divFormulario').style.display = "";
	      document.getElementById('divResultado').style.display = "none";
	      return;
      }
      document.getElementById('trErro').style.display = "none";
	  }
	  function ReiniciaFormulario()
	  {
	    //Basico divs
	    document.getElementById('divResultado').style.display = "none";
	    document.getElementById('divFormulario').style.display = "";
	  }
	  function LimpaForm()
	  {
  	    document.getElementById('txtGramatura').value = '';
	    document.getElementById('txtPaginas').value = '';
      document.getElementById('trErro').style.display = "none";
	  }
	  function NotIn()
	  {
	    if (arguments.length < 2) return false;
	    for (var i=1; i<arguments.length; i++) if (arguments[0] == arguments[i]) return false;
	    return true;
	    //javascript:alert(NotIn(1,2,3))
	  }