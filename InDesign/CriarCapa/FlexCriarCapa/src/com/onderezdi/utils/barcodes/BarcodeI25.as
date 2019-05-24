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

	public class BarcodeI25
	{
		
		public static var encoding:Array = ["NNWWN", "WNNNW", "NWNNW", "WWNNN", "NNWNW", "WNWNN", "NWWNN", "NNNWW", "WNNWN", "NWNWN"];
		
		
		public function BarcodeI25() 
		{
			
		}
		
		public static function getDigit(code:String, crc:Boolean=false, type:String=null):String {
			var code:String = compute(code, crc, type);
			if (code == "") {
				return("");
			}
			var result:String = "";

			var i:int;
			var j:int;
			if (type == BarcodeType.INT25) {
				// Interleaved 2 of 5

				// start
				result += "1010";

				// digits + CRC
				var c1:String, c2:String;
				for(i=0; i<code.length / 2; i++){
					c1 = code.charAt(2*i);
					c2 = code.charAt(2*i+1);
					for (j = 0; j < 5; j++) {
						result += "1";
						if (encoding[c1].charAt(j) == "W") {
							result += "1";
						}
						result += "0";
						if (encoding[c2].charAt(j) == "W") {
							result += "0";
						}
					}
				}
				// stop
				result += "1101";
			} else if (type == BarcodeType.STD25) {
				// Standard 2 of 5 is a numeric-only barcode that has been in use a long time. 
				// Unlike Interleaved 2 of 5, all of the information is encoded in the bars; the spaces are fixed width and are used only to separate the bars.
				// The code is self-checking and does not include a checksum.
				// start
				result += "11011010";
				// digits + CRC
				var c:String;
				for(i=0; i<code.length; i++){
					c = code.charAt(i);
					for(j=0; j<5; j++){
						result += '1';
						if (encoding[c].charAt(j) == 'W') {
							result += "11";
						}
						result += '0';
					}
				}
				// stop
				result += "11010110";
			}
			return(result);
		}
		
		public static function compute(code:String, crc:Boolean=false, type:String=null):String {
			if (!crc) {
				if (code.length % 2 != 0) {
					code = "0" + code;
				}
			} else {
				if ( (type == BarcodeType.INT25) && (code.length % 2 == 0) ) {
					code = "0" + code;
				}
				var odd:Boolean = true, v:int, sum:int = 0;
				for(var i:int=code.length-1; i>-1; i--){
					v = int(code.charAt(i));
					if (isNaN(v)) {
						return("");
					}
					sum += odd ? 3 * v : v;
					odd = ! odd;
				}
				code += ((10 - sum % 10) % 10).toString();
			}
			return(code);
		}
	}

}