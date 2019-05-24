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
	
	public class Code39
	{
		
		private static var encoding:Array = ["101001101101", "110100101011", "101100101011", "110110010101",
			"101001101011", "110100110101", "101100110101", "101001011011",
			"110100101101", "101100101101", "110101001011", "101101001011",
			"110110100101", "101011001011", "110101100101", "101101100101",
			"101010011011", "110101001101", "101101001101", "101011001101",
			"110101010011", "101101010011", "110110101001", "101011010011",
			"110101101001", "101101101001", "101010110011", "110101011001",
			"101101011001", "101011011001", "110010101011", "100110101011",
			"110011010101", "100101101011", "110010110101", "100110110101",
			"100101011011", "110010101101", "100110101101", "100100100101",
			"100100101001", "100101001001", "101001001001", "100101101101"];
		
		public function Code39() 
		{
			
		}
		
		public static function getDigit(code:String):String {
			var table:String = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%*";
			var i:int;
			var index:int;
			var result:String = "";
			var intercharacter:String = '0';
			if (code.indexOf('*') >= 0) {
				return "";
			}
			code = ("*" + code + "*").toUpperCase(); // Add Start and Stop charactere : *
			for (i = 0; i < code.length; i++) {
				index = table.indexOf( code.charAt(i) );
				if (index < 0) {
					return "";
				}
				if (i > 0) {
					result += intercharacter;
				}
				result += encoding[ index ];
			}
			return(result);
		}
	}

}