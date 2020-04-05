/*
* File name: ocean.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: game object of ocean
*/

module objects {
    export class Ocean extends createjs.Bitmap {
        //Private Instance Variables
        //moving speed
        private _dx: number;

        //Public Properties

        //Constructor
        constructor() {
            super(managers.Game.assetManager.getResult("ocean"));
            this.Start();
        }
        //Private Methods
        private _reset(): void {
            this.x = 0;
        }

        private _move(): void {
            this.x -= this._dx;
        }

        private _checkBounds(): void {
            if (this.x <= -1000)
            {
                this._reset();
            }
        }

        //Public Methods
        public Start(): void {
            this._dx = 1;
            this._reset();
        }

        public Update(): void {
            this._move();
            this._checkBounds();
        }
    }
}