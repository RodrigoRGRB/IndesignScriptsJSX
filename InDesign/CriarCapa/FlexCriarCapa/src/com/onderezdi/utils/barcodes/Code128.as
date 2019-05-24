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
	
	public class Code128
	{
		
		private static var encoding:Array = ["11011001100", "11001101100", "11001100110", "10010011000",
			"10010001100", "10001001100", "10011001000", "10011000100",
			"10001100100", "11001001000", "11001000100", "11000100100",
			"10110011100", "10011011100", "10011001110", "10111001100",
			"10011101100", "10011100110", "11001110010", "11001011100",
			"11001001110", "11011100100", "11001110100", "11101101110",
			"11101001100", "11100101100", "11100100110", "11101100100",
			"11100110100", "11100110010", "11011011000", "11011000110",
			"11000110110", "10100011000", "10001011000", "10001000110",
			"10110001000", "10001101000", "10001100010", "11010001000",
			"11000101000", "11000100010", "10110111000", "10110001110",
			"10001101110", "10111011000", "10111000110", "10001110110",
			"11101110110", "11010001110", "11000101110", "11011101000",
			"11011100010", "11011101110", "11101011000", "11101000110",
			"11100010110", "11101101000", "11101100010", "11100011010",
			"11101111010", "11001000010", "11110001010", "10100110000",
			"10100001100", "10010110000", "10010000110", "10000101100",
			"10000100110", "10110010000", "10110000100", "10011010000",
			"10011000010", "10000110100", "10000110010", "11000010010",
			"11001010000", "11110111010", "11000010100", "10001111010",
			"10100111100", "10010111100", "10010011110", "10111100100",
			"10011110100", "10011110010", "11110100100", "11110010100",
			"11110010010", "11011011110", "11011110110", "11110110110",
			"10101111000", "10100011110", "10001011110", "10111101000",
			"10111100010", "11110101000", "11110100010", "10111011110",
			"10111101110", "11101011110", "11110101110", "11010000100",
			"11010010000", "11010011100", "11000111010"];
		
		public function Code128() 
		{
			
		}
		
		public static function getDigit(code:String):String {
			var tableB:String = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
			var result:String = "";
			var sum:int = 0;
			var isum:int = 0;
			var i:int = 0;
			var j:int = 0;
			var value:int = 0;

			// check each characters
			for (i = 0; i < code.length; i++) {
				if (tableB.indexOf(code.charAt(i)) == -1) {
					return "";
				}
			}

			// check firsts characters : start with C table only if enought numeric
			var tableCActivated:Boolean = code.length > 1;
			var c:String = '';
			for (i = 0; i < 3 && i < code.length; i++) {
				c = code.charAt(i);
				tableCActivated = (c >= '0' && c <= '9');
			}

			sum = tableCActivated ? 105 : 104;

			// start : [105] : C table or [104] : B table 
			result = encoding[ sum ];

			i = 0;
			while( i < code.length ){
				if (! tableCActivated){
					j = 0;
					// check next character to activate C table if interresting
					while ( (i + j < code.length) && (code.charAt(i + j) >= '0') && (code.charAt(i + j) <= '9') ) {
						j++;
					}
			
					// 6 min everywhere or 4 mini at the end
					tableCActivated = (j > 5) || ((i + j - 1 == code.length) && (j > 3));

					if ( tableCActivated ){
						result += encoding[ 99 ]; // C table
						sum += ++isum * 99;
					}
					//         2 min for table C so need table B
				} else if ( (i == code.length) || (code.charAt(i) < '0') || (code.charAt(i) > '9') || (code.charAt(i+1) < '0') || (code.charAt(i+1) > '9') ) {
					tableCActivated = false;
					result += encoding[ 100 ]; // B table
					sum += ++isum * 100;
				}

				if ( tableCActivated ) {
					value = int(code.charAt(i) + code.charAt(i+1)); // Add two characters (numeric)
					i += 2;
				} else {
					value = tableB.indexOf( code.charAt(i) ); // Add one character
					i += 1;
				}
				result  += encoding[ value ];
				sum += ++isum * value;
			}

			// Add CRC
			result  += encoding[ sum % 103 ];

			// Stop
			result += encoding[106];

			// Termination bar
			result += "11";

			return(result);
		}
	}

}