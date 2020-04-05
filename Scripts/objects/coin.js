/*
* File name: coin.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: game object of coin
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
    var Coin = /** @class */ (function (_super) {
        __extends(Coin, _super);
        //Private instance variables
        //Public properties
        //Constructors
        function Coin() {
            var _this = _super.call(this, "coin") || this;
            _this.Start();
            return _this;
        }
        //Private methods
        //Public methods
        Coin.prototype.Reset = function () {
            this.x = this.width + 1 * config.Screen.WIDTH;
            this.y = Math.floor((Math.random() * (-180)) + 480 - this.halfHeight);
            this.alpha = 1;
        };
        Coin.prototype.Move = function () {
            this.x -= this._dx;
        };
        Coin.prototype.CheckBounds = function () {
            //check lower bounds
            if (this.x <= -this.width) {
                this.Reset();
            }
        };
        Coin.prototype.Start = function () {
            this._dx = 8;
            this.Reset();
        };
        Coin.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        return Coin;
    }(objects.GameObject));
    objects.Coin = Coin;
})(objects || (objects = {}));
//# sourceMappingURL=coin.js.map