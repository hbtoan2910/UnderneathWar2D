/*
* File name: start.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: scene object of start
*/

module scenes {
    export class StartScene extends objects.Scene {
        //Private Instance Variables
        private  _welcomeLabel: objects.Label;

        private  _startButtton: objects.Button; 
        private  _instructionButtton: objects.Button; 
        private  _exitButtton: objects.Button; 

        private _space: objects.Ocean;

        private _bulletManager: managers.Bullet;

        //Public Properties

        //Constructor
        constructor() {
            super();

            this.Start();
        }

        //Private Methods
        private _startButtonClick(): void{
            managers.Game.currentScene = config.Scene.PLAY;
        }

        private _instructionButtonClick(): void{            
            managers.Game.currentScene = config.Scene.INSTRUCTION;
        }

        private _exitButtonClick(): void{
            managers.Game.currentScene = config.Scene.OVER;
        }



        //Public Methods
        //Initialize Game Variables and objects
        public Start(): void {
            this._space = new objects.Ocean();
            this._welcomeLabel = new objects.Label("underneath war", "40px", "Starjedi", "#FFFF00", 320, 150, true);
            this._startButtton = new objects.Button("btn_start", 320, 300);
            this._instructionButtton = new objects.Button("btn_instruct", 320, 350);
            this._exitButtton = new objects.Button("btn_exit", 320, 400);

            //make a ref to the bullet manager in the game manager
            this._bulletManager = new managers.Bullet();
            managers.Game.bulletManager =  this._bulletManager;
            this.Main();
        }

        public Update(): void {
            this._space.Update();
        }

        public Destroy():void {
            this.removeAllChildren();
        }

        public Main(): void {
            //add the space to the scene
            this.addChild(this._space);

            //add the welcome label to the scene
            this.addChild(this._welcomeLabel);
            //add the start btn to the scene
            this.addChild(this._startButtton);
            this.addChild(this._instructionButtton);
            this.addChild(this._exitButtton);

            this._startButtton.on("click", this._startButtonClick);
            this._instructionButtton.on("click", this._instructionButtonClick);
            this._exitButtton.on("click", this._exitButtonClick);
        }
    }
}