/* @license
 * This file is part of the Game Closure SDK.
 *
 * The Game Closure SDK is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * The Game Closure SDK is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with the Game Closure SDK.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * TextBins are used in the FragmentBuffer caching of TextViews.
 **/
var FragmentBin = exports = Class('TextBin', function(logger, supr) {
	this.init = function(opts) {
		this.width = opts.width;
		this.height = opts.height;
		this.x = opts.x;
		this.y = opts.y;
	};

	this.size = function() {
		return this.width * this.height;
	};

	this.split = function(x, y) {
		var newBins = [this];
		if (this.width > 10 && this.height > 10) {
			if (this.height - y > 10) {
				var bin1 = new FragmentBin({
					x: this.x,
					y: this.y + y,
					width: this.width,
					height: this.height - y
				});
				newBins.push(bin1);
			}
			if (this.width -x > 10) {
				var bin2 = new FragmentBin({
					x: this.x + x,
					y: this.y,
					width: this.width - x,
					height: y
				});
				newBins.push(bin2);
			}
		}
		this.width = x;
		this.height = y;
		this.filled = true;

		return newBins;
	};
});