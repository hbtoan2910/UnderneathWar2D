/*
* File name: enemy.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: game object of enemy
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
    var Enemy = /** @class */ (function (_super) {
        __extends(Enemy, _super);
        //Private Instance Variables
        //Public Properties
        //Constructor
        function Enemy() {
            var _this = _super.call(this, "warship") || this;
            _this.Start();
            return _this;
        }
        //Private Methods
        Enemy.prototype.Reset = function () {
            this.x = this.width + config.Screen.WIDTH;
            this.y = Math.floor((Math.random() * (-20)) + 250);
            this.alpha = 1;
        };
        Enemy.prototype.Move = function () {
            this.x -= this._dx;
        };
        Enemy.prototype.CheckBounds = function () {
            //check lower bounds
            if (this.x <= -this.width) {
                this.Reset();
            }
        };
        //Public Methods
        Enemy.prototype.Start = function () {
            this._dx = 3;
            this.Reset();
        };
        Enemy.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
            this.BulletFire();
        };
        Enemy.prototype.GetHit = function () {
            if (this.alpha != 0) {
                //add explosion
                createjs.Sound.play("explosion");
                var explosion = new objects.Explosion("smallexplosion");
                explosion.x = this.x;
                explosion.y = this.y;
                managers.Game.currentSceneObject.addChild(explosion);
                //points for destroy enemy
                managers.Game.scoreBoard.addScore(200);
                //reset enemy
                this.Reset();
            }
        };
        Enemy.prototype.BulletFire = function () {
            if (this.alpha == 1) {
                managers.Game.bulletManager.BulletFire("warship", this.x, this.y, this.halfHeight);
            }
        };
        return Enemy;
    }(objects.GameObject));
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=enemy.js.map