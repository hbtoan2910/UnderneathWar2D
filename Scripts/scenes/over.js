/*
* File name: over.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: scene object of over
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
    var OverScene = /** @class */ (function (_super) {
        __extends(OverScene, _super);
        //Public Properties
        function OverScene() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        //Private Methods
        OverScene.prototype._restartButtonClick = function () {
            managers.Game.currentScene = config.Scene.PLAY;
        };
        //Public Methods
        //Initialize Game Variables and objects
        OverScene.prototype.Start = function () {
            this._space = new objects.Ocean();
            this._overLabel = new objects.Label("Game over", "80px", "Starjedi", "#FFFF00", 310, 140, true);
            this._backButtton = new objects.Button("btn_restart", 320, 340);
            this._scoreboard = new managers.ScoreBoard();
            this.Main();
        };
        OverScene.prototype.Update = function () {
            this._space.Update();
        };
        OverScene.prototype.Destroy = function () {
            this.removeAllChildren();
        };
        OverScene.prototype.Main = function () {
            //add the space to the scene
            this.addChild(this._space);
            //add the welcome label to the scene
            this.addChild(this._overLabel);
            //add the back btn to the scene
            this.addChild(this._backButtton);
            //add scoreboard to the scene
            this._scoreboard.HighScore = managers.Game.HighScore;
            this.addChild(this._scoreboard.HighScoreLabel);
            //event listeners
            this._backButtton.on("click", this._restartButtonClick);
        };
        return OverScene;
    }(objects.Scene));
    scenes.OverScene = OverScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=over.js.map