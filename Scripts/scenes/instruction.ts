/*
* File name: instruction.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: scene object of instruction
*/

module scenes {
    export class InstructionScene extends objects.Scene {
        //private instance variables
        private _space: objects.Ocean;

        //keyboard
        private _kb_w: createjs.Sprite;
        private _kb_a: createjs.Sprite;
        private _kb_s: createjs.Sprite;
        private _kb_d: createjs.Sprite;
        private _kb_up: createjs.Sprite;
        private _kb_down: createjs.Sprite;
        private _kb_left: createjs.Sprite;
        private _kb_right: createjs.Sprite;
        private _kb_space: createjs.Sprite;

        //label
        private _riseLabel: objects.Label;
        private _forwardLabel: objects.Label;
        private _diveLabel: objects.Label;
        private _backwardLabel: objects.Label;
        private _fireLabel: objects.Label;

        //btns
        private  _playButtton: objects.Button; 
        private  _backButtton: objects.Button; 

        //public properties

        //constructor
        constructor() {
            super();

            this.Start();
        }

        //private methods
        private _positionKbBtn(spriteName: string, x: number, y: number): createjs.Sprite {
            let btnObj: createjs.Sprite = new createjs.Sprite(managers.Game.textureAtlas, spriteName);
            btnObj.x = x;
            btnObj.y = y;
            return btnObj;
        }

        private _positionLbl(spriteName: string, x: number, y: number): objects.Label {
            let lblObj: objects.Label = new objects.Label(spriteName, "20px", "Starjedi", "#FFFF00", x, y, false);
            return lblObj;
        }


        private _playButtonClick(): void{
            managers.Game.currentScene = config.Scene.PLAY;
        }

        private _backButtonClick(): void{
            managers.Game.currentScene = config.Scene.START;
        }

        //public methods
        public Start(): void {
            this._space = new objects.Ocean();

            //keyboard and label
            let xoffset: number = 50;
            let yoffset: number = 50;
            let lblxoffset: number = 100;
            let cur_x: number = 100;
            let cur_y: number = 100;

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
        }

        public Update(): void {
            this._space.Update();
        }

        public Destroy(): void {
            this.removeAllChildren();
        }

        public Main(): void {
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

        }
    }
}