/*
* File name: boss1.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: game object of boss1
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
    var BOSS1 = /** @class */ (function (_super) {
        __extends(BOSS1, _super);
        //public properties
        //constructor
        function BOSS1() {
            var _this = _super.call(this, "boss") || this;
            _this.Start();
            return _this;
        }
        //private methods
        //public methods
        BOSS1.prototype.Reset = function () {
            this.x = config.Screen.WIDTH - this.width;
            this.y = config.Screen.HEIGHT / 2;
            //drift randomly
            this._dx = Math.floor((Math.random() * 3) - 6);
            this._dy = Math.floor((Math.random() * 4) - 2);
            //reset alpha
            this.alpha = 0;
        };
        BOSS1.prototype.Move = function () {
            this.y += this._dy;
            this.x += this._dx;
        };
        BOSS1.prototype.CheckBounds = function () {
            if ((this.y >= 0 && this.y <= 480) && (this.x >= 0 && this.x <= this.width + config.Screen.WIDTH)) {
                if (this.alpha == 0 && this._isEnable) {
                    this.alpha = 1;
                }
            }
            else {
                this.Reset();
            }
        };
        BOSS1.prototype.Start = function () {
            this._hp = 100; //initialize boss HP
            this._isEnable = false;
        };
        BOSS1.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
            this.BulletFire();
        };
        BOSS1.prototype.BulletFire = function () {
            if (this.alpha == 1) {
                managers.Game.bulletManager.BulletFire("boss1", this.x, this.y, this.halfHeight);
            }
        };
        BOSS1.prototype.SetEnable = function (isEnable) {
            this._isEnable = isEnable;
        };
        BOSS1.prototype.GetHit = function (hitType) {
            if (this.alpha != 0) {
                //add explosion
                createjs.Sound.play("explosion");
                var explosion = new objects.Explosion("explosion");
                explosion.x = this.x;
                explosion.y = this.y;
                managers.Game.currentSceneObject.addChild(explosion);
                //points for hitting boss
                managers.Game.scoreBoard.addScore(300);
                var hitHP = 1;
                switch (hitType) {
                    case "player":
                        hitHP = 3;
                        break;
                    case "torpedo":
                        hitHP = 3;
                        break;
                    case "blt_playerlv2":
                        hitHP = 3;
                        break;
                    case "blt_playerlv1":
                        hitHP = 1;
                        break;
                    default:
                        break;
                }
                this._hp -= hitHP;
                if (this._hp <= 0) {
                    managers.Game.currentScene = config.Scene.OVER;
                }
            }
        };
        BOSS1.prototype.getHP = function () {
            return this._hp;
        };
        return BOSS1;
    }(objects.GameObject));
    objects.BOSS1 = BOSS1;
})(objects || (objects = {}));
//# sourceMappingURL=boss1.js.map