/*
* File name: over.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: scene object of over
*/

module scenes {
    export class OverScene extends objects.Scene {
        //Private Instance Variables
        private  _overLabel: objects.Label;
        private  _backButtton: objects.Button; 
        private _space: objects.Ocean;

        private _scoreboard: managers.ScoreBoard;

        //Public Properties
        constructor() {
            super();

            this.Start();
        }

        //Private Methods
        private _restartButtonClick(): void{
            managers.Game.currentScene = config.Scene.PLAY;
        }



        //Public Methods
        //Initialize Game Variables and objects
        public Start(): void {
            this._space = new objects.Ocean();
            this._overLabel = new objects.Label("Game over", "80px", "Starjedi", "#FFFF00", 310, 140, true);
            this._backButtton = new objects.Button("btn_restart", 320, 340);

            this._scoreboard = new managers.ScoreBoard();
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
            this.addChild(this._overLabel);

            //add the back btn to the scene
            this.addChild(this._backButtton);

            //add scoreboard to the scene
            this._scoreboard.HighScore = managers.Game.HighScore;
            this.addChild(this._scoreboard.HighScoreLabel);

            //event listeners
            this._backButtton.on("click", this._restartButtonClick);
        }
    }
}