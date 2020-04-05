/*
* File name: instruction.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: scene object of instruction
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
    var InstructionScene = /** @class */ (function (_super) {
        __extends(InstructionScene, _super);
        //public properties
        //constructor
        function InstructionScene() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        //private methods
        InstructionScene.prototype._positionKbBtn = function (spriteName, x, y) {
            var btnObj = new createjs.Sprite(managers.Game.textureAtlas, spriteName);
            btnObj.x = x;
            btnObj.y = y;
            return btnObj;
        };
        InstructionScene.prototype._positionLbl = function (spriteName, x, y) {
            var lblObj = new objects.Label(spriteName, "20px", "Starjedi", "#FFFF00", x, y, false);
            return lblObj;
        };
        InstructionScene.prototype._playButtonClick = function () {
            managers.Game.currentScene = config.Scene.PLAY;
        };
        InstructionScene.prototype._backButtonClick = function () {
            managers.Game.currentScene = config.Scene.START;
        };
        //public methods
        InstructionScene.prototype.Start = function () {
            this._space = new objects.Ocean();
            //keyboard and label
            var xoffset = 50;
            var yoffset = 50;
            var lblxoffset = 100;
            var cur_x = 100;
            var cur_y = 100;
            this._kb_w = this._positionKbBtn("kb_w", cur_x, cur_y);
            cur_y += yoffset;
            this._kb_a = this._positionKbBtn("kb_a", cur_x, cur_y);
            cur_y += yoffset;
            this._kb_s = this._positionKbBtn("kb_s", cur_x, cur_y);
            cur_y += yoffset;
            this._kb_d = this._positionKbBtn("kb_d", cur_x, cur_y);
            cur_y += yoffset;
            this._kb_space = this._positionKbBtn("kb_blankspace", cur_x, cur_y);
            this._fireLabel = this._positionLbl("Fire Missile and Torpedo", cur_x + lblxoffset + xoffset, cur_y + 10);
            cur_y = 100;
            cur_x += xoffset;
            this._kb_up = this._positionKbBtn("kb_up", cur_x, cur_y);
            this._riseLabel = this._positionLbl("Rising up", cur_x + lblxoffset, cur_y + 10);
            cur_y += yoffset;
            this._kb_left = this._positionKbBtn("kb_left", cur_x, cur_y);
            this._forwardLabel = this._positionLbl("Move backward", cur_x + lblxoffset, cur_y + 10);
            cur_y += yoffset;
            this._kb_down = this._positionKbBtn("kb_down", cur_x, cur_y);
            this._backwardLabel = this._positionLbl("Diving down", cur_x + lblxoffset, cur_y + 10);
            cur_y += yoffset;
            this._kb_right = this._positionKbBtn("kb_right", cur_x, cur_y);
            this._diveLabel = this._positionLbl("Move forward", cur_x + lblxoffset, cur_y + 10);
            //btns
            this._backButtton = new objects.Button("btn_back", 180, 400);
            this._playButtton = new objects.Button("btn_start", 460, 400);
            this.Main();
        };
        InstructionScene.prototype.Update = function () {
            this._space.Update();
        };
        InstructionScene.prototype.Destroy = function () {
            this.removeAllChildren();
        };
        InstructionScene.prototype.Main = function () {
            //add the space to the scene
            this.addChild(this._space);
            //add the keyboards to the scene
            this.addChild(this._kb_w);
            this.addChild(this._kb_up);
            this.addChild(this._kb_a);
            this.addChild(this._kb_left);
            this.addChild(this._kb_s);
            this.addChild(this._kb_down);
            this.addChild(this._kb_d);
            this.addChild(this._kb_right);
            this.addChild(this._kb_space);
            //add the labels to the scene
            this.addChild(this._riseLabel);
            this.addChild(this._forwardLabel);
            this.addChild(this._backwardLabel);
            this.addChild(this._diveLabel);
            this.addChild(this._fireLabel);
            //add the btns to the scene
            this.addChild(this._backButtton);
            this.addChild(this._playButtton);
            this._playButtton.on("click", this._playButtonClick);
            this._backButtton.on("click", this._backButtonClick);
        };
        return InstructionScene;
    }(objects.Scene));
    scenes.InstructionScene = InstructionScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=instruction.js.map