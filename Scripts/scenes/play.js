/*
* File name: play.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: scene object of play
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
var scenes;
(function (scenes) {
    var PlayScene = /** @class */ (function (_super) {
        __extends(PlayScene, _super);
        //Public Properties
        //Constructor
        function PlayScene() {
            var _this = _super.call(this) || this;
            _this._bulletManager = managers.Game.bulletManager;
            _this.Start();
            return _this;
        }
        //Private Methods
        //Public Methods
        //Initialize Game Variables and objects
        PlayScene.prototype.Start = function () {
            this._ocean = new objects.Ocean();
            this._player = new objects.Player();
            managers.Game.player = this._player;
            //create an enemy
            this._enemy = new objects.Enemy();
            this._coin = new objects.Coin();
            //inistantiate the TIE array
            this._tieNum = 2;
            this._tie = new Array();
            for (var count = 0; count < this._tieNum; count++) {
                this._tie[count] = new objects.TIE();
            }
            this._engineSound = createjs.Sound.play("stage1");
            this._engineSound.loop = -1; //play forever
            this._engineSound.volume = 0.1;
            //create the scoreboard UI 
            this._scoreBoard = new managers.ScoreBoard();
            managers.Game.scoreBoard = this._scoreBoard;
            this.Main();
        };
        //triggered every frame
        PlayScene.prototype.Update = function () {
            var _this = this;
            console.log("num objects: " + this.numChildren);
            this._ocean.Update();
            this._player.Update();
            this._enemy.Update();
            this._bulletManager.Update();
            //to be refine later
            this._coin.Update();
            //check collision between player and coin
            managers.Collision.Check(this._player, this._coin);
            this._tie.forEach(function (tie) {
                tie.Update();
                //check collision between player and current tie
                managers.Collision.Check(_this._player, tie);
            });
            var bulletIdxArray = [];
            var bullets = [];
            //check player
            bulletIdxArray = managers.Game.bulletManager.GetTotalBulletTypes("player");
            for (var idx = 0; idx < bulletIdxArray.length; idx++) {
                bullets = managers.Game.bulletManager.GetBullets("player", bulletIdxArray[idx]);
                bullets.forEach(function (bullet) {
                    if (bullet.alpha == 1) {
                        //check collision player-bullet -- enemy
                        managers.Collision.Check(bullet, _this._enemy);
                    }
                    if (bullet.alpha == 1) {
                        //check collision player-bullet -- TIE
                        for (var count = 0; count < _this._tieNum; count++) {
                            if (_this._tie[count].alpha == 1) {
                                managers.Collision.Check(bullet, _this._tie[count]);
                            }
                        }
                    }
                });
            }
            //check warship
            bulletIdxArray = managers.Game.bulletManager.GetTotalBulletTypes("warship");
            for (var idx = 0; idx < bulletIdxArray.length; idx++) {
                bullets = managers.Game.bulletManager.GetBullets("warship", bulletIdxArray[idx]);
                bullets.forEach(function (bullet) {
                    if (bullet.alpha == 1) {
                        //check collision player-bullet -- enemy
                        managers.Collision.Check(bullet, _this._player);
                    }
                });
            }
        };
        PlayScene.prototype.Destroy = function () {
            this._engineSound.stop();
            this.removeAllChildren();
        };
        PlayScene.prototype.Main = function () {
            var _this = this;
            //pay attention the orders
            //add space to the scene
            this.addChild(this._ocean);
            //add coin to the scene
            this.addChild(this._coin);
            //add player to the scene
            this.addChild(this._player);
            this.addChild(this._player.planeFlash);
            //add enemy to the scene
            this.addChild(this._enemy);
            //add bullets to the scene
            managers.Game.bulletManager.RegisterBullet(this, "playerlv1");
            managers.Game.bulletManager.RegisterBullet(this, "warship");
            //add ties to the scene
            this._tie.forEach(function (tie) {
                _this.addChild(tie);
            });
            //add score board to the scene
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map