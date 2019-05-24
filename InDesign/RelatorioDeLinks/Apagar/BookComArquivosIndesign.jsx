var myFolder = Folder.selectDialog( "Select a folder with InDesign files" );
if ( myFolder != null ) {
     var myFiles = [];
     
     GetSubFolders(myFolder);
     
     if ( myFiles.length > 0 ) {
          var myBookFileName = myFolder + "/"+ myFolder.name + ".indb";
          myBookFile = new File( myBookFileName );
          if ( myBookFile.exists ) {
               if ( app.books.item(myFolder.displayName + ".indb") == null ) {
                    myBook = app.open( myBookFile );
               }
          }
          else {
                myBook = app.books.add( myBookFile );
                myBook.automaticPagination = false;
                for ( i=0; i < myFiles.length; i++ ) {
                    myBook.bookContents.add( myFiles[i] );
                }
                myBook.save();
           }
     }
}
 
//=================================== FUNCTIONS =========================================
function GetSubFolders(theFolder) {
     var myFileList = theFolder.getFiles();
     for (var i = 0; i < myFileList.length; i++) {
          var myFile = myFileList[i];
          if (myFile instanceof Folder){
               GetSubFolders(myFile);
          }
          else if (myFile instanceof File && myFile.name.match(/\.indd$/i)) {
               myFiles.push(myFile);
          }
     }
}