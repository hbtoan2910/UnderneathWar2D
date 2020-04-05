/*
* File name: ocean.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: game object of ocean
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var Ocean = /** @class */ (function (_super) {
        __extends(Ocean, _super);
        //Public Properties
        //Constructor
        function Ocean() {
            var _this = _super.call(this, managers.Game.assetManager.getResult("ocean")) || this;
            _this.Start();
            return _this;
        }
        //Private Methods
        Ocean.prototype._reset = function () {
            this.x = 0;
        };
        Ocean.prototype._move = function () {
            this.x -= this._dx;
        };
        Ocean.prototype._checkBounds = function () {
            if (this.x <= -1000) {
                this._reset();
            }
        };
        //Public Methods
        Ocean.prototype.Start = function () {
            this._dx = 1;
            this._reset();
        };
        Ocean.prototype.Update = function () {
            this._move();
            this._checkBounds();
        };
        return Ocean;
    }(createjs.Bitmap));
    objects.Ocean = Ocean;
})(objects || (objects = {}));
//# sourceMappingURL=ocean.js.map