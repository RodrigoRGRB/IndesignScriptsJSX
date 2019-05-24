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
	
	import flash.display.Sprite;
	import flash.text.TextField;
	
	
	public class Barcode extends Sprite
	{
		
		private var _barcodeText:String;
		private var _type:String;
		private var _barcodeHeight:Number;
		private var _barcodeColor:uint;
		private var _barThickness:Number;
		private var _addQuietZone:Boolean;
		private var hri:String;
		
		/*
		 * Barcode generator constructor class
		 * barcodes can be generated directly by the given parameters
		 * bText: barcode string to be decoded
		 * bType: barcode type, types has been defined at constant variables in BarcodeTypes class 
		 * bHeight: barcodes bar height
		 * bColor: barcodes bar color
		 * bThickness: bar thickness of barcodes.
		*/
		public function Barcode(bText:String="1234567890", bType:String=BarcodeType.CODE39, bHeight:Number=50, bColor:uint=0x000000, bThickness:Number=1) 
		{
			_barcodeText = bText;
			_type = bType;
			_barcodeHeight = bHeight;
			_barcodeColor = bColor;
			_barThickness = bThickness;
			_barcodeColor = bColor;
			
			draw();
		}
		
		/*
		 * returns raw barcode text
		*/
		public function get barcodeText():String { return _barcodeText; }
		
		/*
		 * returns barcode text (hri)
		*/
		public function get barcodeTextHRI():String { return hri; }
		
		/*
		 * String - barcode text
		*/
		public function set barcodeText(value:String):void 
		{
			_barcodeText = value;
			draw();
		}
		
		/*
		 * barcode type
		 * types defined in BarcodeType as contant variables
		 * 
		*/
		public function get type():String { return _type; }
		
		/*
		 * returns barcode type
		 * types defined in BarcodeType as contant variables
		*/
		public function set type(value:String):void 
		{
			_type = value;
			draw();
		}
		
		/*
		 * bar color of barcode
		*/
		public function get barcodeColor():uint { return _barcodeColor; }
		
		/*
		 * returns bar color of barcode
		*/
		public function set barcodeColor(value:uint):void 
		{
			_barcodeColor = value;
			draw();
		}
		
		public function get addQuietZone():Boolean { return _addQuietZone; }
		
		public function set addQuietZone(value:Boolean):void 
		{
			_addQuietZone = value;
			draw();
		}
		
		/*
		 * return width of single barcode bar or dot
		*/
		public function get barThickness():Number { return _barThickness; }
		
		/*
		 * sets width of single barcode bar or dot
		*/
		public function set barThickness(value:Number):void 
		{
			_barThickness = value;
			draw();
		}
		
		/*
		 * draws barcode
		*/
		public function draw():void {
			graphics.clear();
			
			var digit:String = "";
			var digit2d:Array;
			hri = "";
			var code:String = barcodeText;
			var crc:Boolean = true;
			var rect:Boolean = false;
			var b2d:Boolean = false;
			
			switch( _type ) {
				case BarcodeType.STD25:
				case BarcodeType.INT25: 
					digit = BarcodeI25.getDigit(code, crc, type);
					hri = BarcodeI25.compute(code, crc, type);
					break;
					
				case BarcodeType.CODE11:
					digit = Code11.getDigit(code);
					hri = code;
					break;
					
				case BarcodeType.CODE39:
					digit = Code39.getDigit(code);
					hri = code;
					break;
					
				case BarcodeType.CODE93:
					digit = Code93.getDigit(code, crc);
					hri = code;
					break;
					
				case BarcodeType.CODE128:
					digit = Code128.getDigit(code);
					hri = code;
					break;
					
				case BarcodeType.CODABAR:
					digit = Codabar.getDigit(code);
					hri = code;
					break;
					
				case BarcodeType.DATAMATRIX:
					digit2d = Datamatrix.getDigit(code, rect);
					digit = digit2d.join("");
					b2d = true;
					hri = code;
					break;
					
				case BarcodeType.EAN8:
				case BarcodeType.EAN13:
					digit = EAN.getDigit(code, type);
					hri = EAN.compute(code, type);
					break;
					
				case BarcodeType.MSI:
					digit = MSI.getDigit(code, crc);
					hri = MSI.compute(code, crc);
					break;
			}
			
			//trace(digit);
			
			if (digit.length == 0) {
				trace("length is zero");
				return;
			}

			// Quiet Zone
			if ( !b2d && _addQuietZone) {
				digit = "0000000000" + digit + "0000000000";
			}
			
			var i:int;
			if(b2d){ //drawind 1d barcodes
				graphics.clear();
				for (i = 0; i < digit2d.length; i++) 
				{
					currentWidth = 0;
					for (var j:int = 0; j < digit2d[i].length; j++) 
					{
						if ( digit2d[i][j] == "1" ) {
							graphics.beginFill(_barcodeColor, 1);
							graphics.drawRect(currentWidth, _barThickness * i, _barThickness, _barThickness);
							graphics.endFill();
						}
						currentWidth += _barThickness;
					}
				}
			} else { //drawing 2d barcodes
				graphics.clear();
				var currentWidth:Number = 0;
				for (i = 0; i < digit.length; i++) {
					if ( digit.charAt(i) == "1" ) {
						graphics.beginFill(_barcodeColor, 1);
						graphics.drawRect(currentWidth, 0, _barThickness, _barcodeHeight);
						graphics.endFill();
					}
					currentWidth += _barThickness;
				}
			}
				
		}
	}

}