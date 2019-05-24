/*
	actionscript barcode generator
	ported from jQuery barcode plug-in (http://barcode-coder.com/en/barcode-jquery-plugin-201.html)

    Copyright (C) <2011>  <Önder Ezdi>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

package com.onderezdi.utils.barcodes 
{
	
	public class BarcodeType
	{
		
		static public const STD25:String = "std25"; //standard 2 of 5 (std25)
		static public const INT25:String = "int25"; //interleaved 2 of 5 (int25)
		static public const EAN8:String = "ean8"; //ean 8 (ean8)
		static public const EAN13:String = "ean13"; //ean 13 (ean13)   
		static public const CODE11:String = "code11"; //code 11(code11)
		static public const CODE39:String = "code39"; //core 39 (code39)
		static public const CODE93:String = "code93"; //code 93 (code93)
		static public const CODE128:String = "code128"; //code 128(code128)  
		static public const CODABAR:String = "codabar"; //codabar (codabar)
		static public const MSI:String = "msi"; //msi (msi)
		static public const DATAMATRIX:String = "datamatrix"; //datamatrix (datamatrix)
		
		
		public function BarcodeType() 
		{
			
		}
		
	}

}