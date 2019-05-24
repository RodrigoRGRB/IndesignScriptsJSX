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
	
	public class Codabar
	{
		
		private static var encoding:Array = ["101010011", "101011001", "101001011", "110010101",
			"101101001", "110101001", "100101011", "100101101",
			"100110101", "110100101", "101001101", "101100101",
			"1101011011", "1101101011", "1101101101", "1011011011",
			"1011001001", "1010010011", "1001001011", "1010011001"];
			
			
		public function Codabar() 
		{
			
		}
		
		public static function getDigit(code:String):String {
			var table:String = "0123456789-$:/.+";
			var i:int;
			var index:int;
			var result:String = "";
			var intercharacter:String = '0';
			
			// add start : A->D : arbitrary choose A
			result += encoding[16] + intercharacter;
			
			for (i = 0; i < code.length; i++) {
				index = table.indexOf( code.charAt(i) );
				if (index < 0) {
					return "";
				}
				result += encoding[index] + intercharacter;
			}
			
			// add stop : A->D : arbitrary choose A
			result += encoding[16];
			return(result);
		}
	}

}