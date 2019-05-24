var  WJ_ImportFileAttachment = app.trustedFunction(function()
{
   app.beginPriv();

//***************************************
//		if(app.activeDocs.length>0){
//			app.alert("� necessario fechar todos os arquivos abertos para continuar");
//			}
//		else{
				//app.alert("Selecione o arquivo de destino (arquivo a ser corrigido)",true);
				//abre o arquivo para inserir a corre��o
				
				var docCorrigidoTEMP = app.browseForDoc({
					cFilenameInit: "Selecione o PDF para inserir erratas",
					cFSInit: "CHTTP",
				});
				//console.println(docCorrigidoTEMP.cPath);				
				if(docCorrigidoTEMP){
				var docCorrigido = app.openDoc(docCorrigidoTEMP.cPath);
				}
				
				//pega o nome do ultimo arquivo aberto
				//var docCorrigido = app.activeDocs[app.activeDocs.length-1];
				if(docCorrigidoTEMP){
					var docErratasTEMP = app.browseForDoc({
						cFilenameInit: "Selecione o PDF que cont�m as erratas",
						cFSInit: "CHTTP",
					});
					//console.println(docCorrigidoTEMP.cPath);
					if(docErratasTEMP){
					var docErratas = app.openDoc(docErratasTEMP.cPath);				
					}
				}
				//console.println(docErratas.numPages);
				//console.println(docCorrigido.numPages);

				//Comparo todas os labels (paginas) do arquivo docCorrigido com o docErratas e faco o replace caso os labels sejam iguais
				var pgErratas;
				var pgDocCorrigido;
				var arrayPagErratas = new Array;
				var relatorio = "";
				
				if(docCorrigido != null && docErratas != null){

				for(i=0; i<docCorrigido.numPages;i++){

					for(j=0; j<docErratas.numPages;j++){
						if(docCorrigido.getPageLabel(i)==docErratas.getPageLabel(j)){
							
							arrayPagErratas[arrayPagErratas.length] = docErratas.getPageLabel(j);
							
							//console.println(arrayPagErratas[0]);
							relatorio = relatorio+docErratas.getPageLabel(j)+",";
							
							docCorrigido.replacePages({cPath:docErratas.path, nPage:i, nStart:j, nEnd:j});		
						}
					}
				}
			
			//Deixa ativo o documento das erratas
			//console.println(app.activeDocs);
			
			//*************************EXTRAI PAGINAS
			function extraiPaginas(arrayPagErratas,docCorrigido){
				
				var booleanExtractPage = true;
				
				//var arquivoTemporario = app.newDoc();
				var arquivoTemporario;
				
				//console.println("array pagina erratas "+arrayPagErratas[0]);

				for (var i = 0; i < docCorrigido.numPages; i++){

									for(j=0; j<arrayPagErratas.length;j++){
										
										if(docCorrigido.getPageLabel(i)==arrayPagErratas[j]){
											
											//console.println("array pagina erratas "+arrayPagErratas[j]);

											if(booleanExtractPage){
												docCorrigido.extractPages({
													/*
												nStart: arrayPagErratas[j],
												nEnd: arrayPagErratas[j],
												*/
												nStart: i,
												nEnd: i,
												//cPath: "/F/temp/"+filename+"_" + i +".pdf"
												});
											
											booleanExtractPage = false;
											arquivoTemporario = app.activeDocs[app.activeDocs.length-1];
											//arquivoTemporario = arquivoTemporario.path;
											console.println(arquivoTemporario);
											/*
											console.println(app.activeDocs[0]);
											console.println(app.activeDocs[1]);
											console.println(app.activeDocs[2]);
											*/
											
											}
										else{			
												//console.println(docCorrigido.path);
												//console.println(i);
												
												arquivoTemporario.insertPages({cPath:docCorrigido.path, nStart:i, nEnd:i});
												
												}	
										}
									
									}
				}
			}
			//*************************EXTRAI PAGINAS
			
			docErratas.closeDoc();
			app.alert("Executado com sucesso",true);
			
			
			//deseja criar um arquivo temporario
			var inserePg = true;
			if(inserePg){
				//extraiPaginas(arrayPagErratas,docCorrigido);
			}
		relatorio = "Relatorio de paginas alteradas: " + relatorio;
		console.show()
		console.clear();
		console.println(relatorio);
		//console.show();
		
			//app.execMenuItem("SaveAs");
			}
//		}
//********************************************
 
   app.endPriv();
});
//</CodeAbove>

//<JSCodeSnippet name="ImageData7">
var strData7ImportNamedAttach = 
"001BE539001AE438FFA6CCF1FF738FD8FF1E368CFF1B3290FF173A96FF4773CCFF4E82BCFF6AB4B3" +
"0021E6510019F91C0000E600000EFF000004FF0B0000F800000BFF0C0001FC000003F702000FFF0E" +
"002BF549001AE438FF21476CFF4763ACFF829AF0FF91A8FFFF8DB0FFFF618DE6FF77ABE5FF68B2B1" +
"FF01C631000EEE11001CFF1C0010FF020005FF0C0000F8000000F2000001FC000005F9040002F201" +
"0005FC000016FF0C0000F1010000F5050000FF000005FF00001EF7240053E67BFF769BEBFFA5CAFF" +
"FF7AA6EDFF4884BA0033D25B0011E312000EF0000010FF060000FF020000FF040003FF000000FF00" +
"0000F4000000E0000019FF1A0017FF1C0000FB000013FF0E000BE4110036C95EFF456ABAFF90B5EA" +
"FFA2CEFFFF518DC3003DDC650024F625000AEC00000BFA010005FF070000F8000000F8000000FD00" +
"0002FF00000FFF0C000FFF040021FF12000CE000002EE5290040DD48FF5FCA86FFA5D3EBFF6883CA" +
"FFB1C4FFFF778AE8FF288C820039D5840035E75D0009DD170007FF100000FD03000BFF060004FA00" +
"0004FF020002F2000000EF00000DEB000035FF290073FF6E0039D641FF61CC88FF7BA9C1FF122D74" +
"FFA8BBF6FF90A3FFFF00544A003BD7860078FFA0002EFF3C0000F0010000FA000013FF0E0009FF05" +
"0000FF100000FF0FFFA7B627FFB19226FFC59237FFE3A87CFF59264FFF4D3998FF0341A4FF004AA0" +
"FF52CEFFFF3AB6F6FF002490FF033FADFF0949A1FF003B6E0041E34F000BE1070000FD000000FC00" +
"0005FF150000FD0DFF505F00FF725300FF6E3B00FF84491DFF633059FF2C1877FF4C8AEDFF7BC5FF" +
"FF32AEDFFF1B97D7FF5F83EFFF2561CFFF00358DFF6EA9DC008FFF9D0025FB210000FA000007FF07" +
"0007FA00000EFF00FFB5120BFFEB0917FFFF070DFFFC0003FFF30008FFF70F29FF571843FF4375B2" +
"FF329CE6FF228CD6FF1F5EABFF0D3371FFEDFEEBFFF5FFF3009AACA0FFF3FFF90002F7020009FE09" +
"000DFF060006F700FFA90600FFDB0007FFF20000FFFB0002FFF30008FFE70019FF5C1D48FF0E407D" +
"FF0C76C0FF0062ACFF084794FF214785FF6F806DFF586256FF7D8F83FFD7E3DD000CFF0C0007FC07" +
"0000FF0E0000EF00FF006900FF004400FF002F00FF012000FF2B0C00FF190000FF21182BFF040019" +
"FF440B3EFF541B4EFFF5FDFFFFF9FFFFFFFFF7FFFFDAC6CFFF857381FFB7A9B60000FF000000FF00" +
"0002FF10001EFF1E0058C1580073B773008AB98AFFB9D8B8FFFFF8ECFFFFFEFEFFF9F0FFFFFFFFFF" +
"FFA36A9DFFFFD9FFFFF6FEFFFFF9FFFFFFF0E8F0FFFFF8FFFFE9D7E5FFBEB0BD0007FF070004FF04" +
"0000F600000CFF120003FF00000BFF000034D8430087EBA3FFF8FFFFFFF8FFFFFFF7FFF3FFF1FFED" +
"FFC34B66FFFFC2E1FFEAEEFAFFF4F8FFFFFFFBFFFFFFF7FCFFFFFEFFFFA7ACA60003FE010000F900" +
"0001F7010008FB0E0004FF010008FC000034D8430084E8A0FFF7FEFEFFF3FAFAFFF1F9EDFFF7FFF3" +
"FFF37B96FFD497B6FFFBFFFFFFFBFFFFFFFFFBFFFFFFFCFFFFFBFAFB00999E980009FF070009FF09" +
"0000F3000002FD000000FF000000FB09003CE2260092EF87FFFFFCFFFFFFFAFFFFFFFDFFFFF5EFDF" +
"FFFF393CFFE51316FFFFD4ECFFFFE5E8FFFFF9EFFFFFFCECFFFFFBFFFF9AA2A50005FE040001FA00" +
"0009FC09000AFF080007FF070002FD0B003CE226008CE981FFFBF8FBFFFFFAFFFFF8F6F8FFFFFFEF" +
"FFCF090CFFFF9396FF4F243CFFE0C6C9FFC0BAB0FFEFECDCFFFFFBFFFF9AA2A50001FA000009FF08" +
"0000FF000000FF020000FA000013FC03003FDD40008CE68CFFF1FFE6FFFFF5E9FFFFDCE6FFD16574" +
"FFFFDDE0FFE9BCBFFFD6ACADFFC89F9BFFC96F71FFC3696BFFFFEFFF0080AF9F0001FF000000FF00" +
"0000FC00000AFF0C0004FE040008F1000036D437008AE48AFFF0FEE5FFF6ECE0FF98757FFFFF96A5" +
"FFFFF1F4FFFFE5E8FFFFF2F3FFFFF1EDFFFFE4E6FFFFE0E2FFFFEFFF0080AF9F0001FF000000FF00" +
"0006FF040000F6000003FF030005FF050026CE30FFB4FCAAFFFFE1DFFF79383EFFC1A39BFFFFF5EF" +
"FFFEFFFFFFFAFBFDFFFCFFFFFFF8FCFBFFFFFEF8FFFEF7F1FFFFFEFFFF9CA09F0001FF000000FF00" +
"0000F400000DFF0D0000F6000002FC020037DF410093DB89FFFFEBE9FFFFEBF1FFFFF7EFFFFFFCF6" +
"FFFEFFFFFFF8F9FBFFFAFDFDFFFCFFFFFFF9F8F2FFFFFEF8FFFFFEFFFF9CA09F0001FF000000FF00";
//</JSCodeSnippet>


// Icon Generic Stream Object
//<JSCodeSnippet name="ButtonIconDef">
var oIconImportNamedAttach = null;
//if(app.viewerVersion < 7){
//}else{
oIconImportNamedAttach = {count: 0, width: 20, height: 20,
read: function(nBytes){return strData7ImportNamedAttach.slice(this.count, this.count += nBytes);}};
//}
//</JSCodeSnippet>

//<JSCodeSnippet name="EventCode">
var DoCmdImportNamedAttach = 
"// Enter your JavaScript code here\n" +
"// Or select one or more JavaScrippets\n" +
"WJ_ImportFileAttachment();"
//</JSCodeSnippet>

//<JSCodeSnippet name="ButtonObjDef">
var oButObjImportNamedAttach = 
{cName: "ImportNamedAttach",
cExec: DoCmdImportNamedAttach,
//cEnable: "event.rc = (app.doc == null)",
cMarked: "event.rc = false",
cTooltext: "Import a Named File Attachment",
nPos: -1};
//</JSCodeSnippet>
if(oIconImportNamedAttach != null)
    oButObjImportNamedAttach.oIcon = oIconImportNamedAttach;

try{app.removeToolButton("ImportNamedAttach");}catch(e){}

//<JSCodeSnippet name="TryAddBut">
try
{
//</JSCodeSnippet>
//<JSCodeSnippet name="AddButtonfn">
    app.addToolButton(oButObjImportNamedAttach);
//</JSCodeSnippet>
if((event.type == "Doc") && (app.viewerVersion >= 7))
    global["ImportNamedAttach_InDoc"] = "3:28:2009:9:48:55";
else
    global["ImportNamedAttach"] = "3:28:2009:9:48:55";
//<JSCodeSnippet name="CatchAddBut">
}catch(e)
{
   if((global.bReportNameCollision != null) && (global.bReportNameCollision == true))
   {
    var strError = 'Cannot Install AcroButton "oButObjImportNamedAttach"\n';
    strError += ':' + e.fileName + '\n';
    strError += 'Error: ' + e.name + '\n';
    strError += e.message + '\n';
    strError += 'Possible Name conflict';
    app.alert(strError,0,0,'AcroButton Error');
   }
}
//</JSCodeSnippet>
 
//</AcroButtons>