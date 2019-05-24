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
	
	public class MSI
	{
		
		private static var encoding:Array = ["100100100100", "100100100110", "100100110100", "100100110110", "100110100100", "100110100110", "100110110100", "100110110110", "110100100100", "110100100110"];
		
		
		public function MSI() 
		{
			
		}
	
		public static function compute(code:String, crc:Object):String{
			if (typeof(crc) == "object"){
				if (crc.crc1 == "mod10"){
					code = computeMod10(code);
				} else if (crc.crc1 == "mod11"){
					code = computeMod11(code);
				}
				if (crc.crc2 == "mod10"){
					code = computeMod10(code);
				} else if (crc.crc2 == "mod11"){
					code = computeMod11(code);
				}
			} else if (typeof(crc) == "boolean"){
				if (crc) {
					code = computeMod10(code);
				}
			}
			return(code);
		}
		
		private static function computeMod10(code:String):String {
			var i:int;
			var toPart1:Boolean = (code.length % 2 == 0 ? true : false);
			var n1:int = 0;
			var sum:int = 0;
			for (i = 0; i < code.length; i++) {
				if (toPart1) {
					n1 = 10 * n1 + int(code.charAt(i));
				} else {
					sum += int(code.charAt(i));
				}
				toPart1 = ! toPart1;
			}
			var s1:String = (2 * n1).toString();
			for (i = 0; i < s1.length; i++) {
				sum += int(s1.charAt(i));
			}
			return (code + ((10 - sum % 10) % 10).toString());
		}
	  
		private static function computeMod11(code:String):String {
			var sum:int = 0;
			var weight:int = 2;
			for (var i:int = code.length - 1; i >= 0; i--) {
				sum += weight * int(code.charAt(i));
				weight = weight == 7 ? 2 : weight + 1;
			}
			return (code + ((11 - sum % 11) % 11).toString());
		}
      
		public static function getDigit(code:String, crc:Object):String {
			var table:String = "0123456789";
			var index:int = 0;
			var result:String = "";
			code = compute(code, false);
			// start
			result = "110";
			// digits
			for (var i:int = 0; i < code.length; i++) {
				index = table.indexOf( code.charAt(i) );
				if (index < 0) {
					return "";
				}
				result += encoding[ index ];
			}
			// stop
			result += "1001";
			return(result);
		}
    }

}