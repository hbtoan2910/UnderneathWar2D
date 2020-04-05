/*
* File name: TIE.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: game object of TIE
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
    var TIE = /** @class */ (function (_super) {
        __extends(TIE, _super);
        //Public Properties
        //Constructor
        function TIE() {
            var _this = _super.call(this, "shark") || this;
            _this.Start();
            return _this;
        }
        //Private Methods
        TIE.prototype.Reset = function () {
            this.x = this.width + config.Screen.WIDTH;
            this.y = Math.floor((Math.random() * (-150)) + 430);
            //drift randomly
            this._dx = Math.floor((Math.random() * 3) - 6);
            this._dy = Math.floor((Math.random() * 4) - 2);
            //reset enemy
            this._hp = 3;
            //reset alpha
            this.alpha = 0;
        };
        TIE.prototype.Move = function () {
            this.y += this._dy;
            this.x += this._dx;
        };
        TIE.prototype.CheckBounds = function () {
            if ((this.y >= 250 && this.y <= 480) && (this.x >= 0 && this.x <= this.width + config.Screen.WIDTH)) {
                if (this.alpha == 0) {
                    this.alpha = 1;
                }
            }
            else {
                this.Reset();
            }
        };
        //Public Methods
        TIE.prototype.Start = function () {
            this._hp = 3;
            this.Reset();
        };
        TIE.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        TIE.prototype.GetHit = function (hitType) {
            if (this.alpha != 0) {
                //add explosion
                createjs.Sound.play("explosion");
                var explosion = new objects.Explosion("explosion");
                explosion.x = this.x;
                explosion.y = this.y;
                managers.Game.currentSceneObject.addChild(explosion);
                //points for destroy enemy
                managers.Game.scoreBoard.addScore(200);
                var hitHP = 1;
                switch (hitType) {
                    case "player":
                        hitHP = 3;
                        break;
                    case "torpedo":
                        hitHP = 3;
                        break;
                    default:
                        break;
                }
                this._hp -= hitHP;
                if (this._hp <= 0) {
                    //reset enemy
                    this.Reset();
                }
            }
        };
        return TIE;
    }(objects.GameObject));
    objects.TIE = TIE;
})(objects || (objects = {}));
//# sourceMappingURL=TIE.js.map