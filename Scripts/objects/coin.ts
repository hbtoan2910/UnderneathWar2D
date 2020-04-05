/*
* File name: coin.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: game object of coin
*/

module objects {
    export class Coin extends objects.GameObject {
        //Private instance variables

        //Public properties

        //Constructors
        constructor() {
            super("coin");
            this.Start();
        }


        //Private methods

        //Public methods
        public Reset(): void {
            this.x = this.width + 1 * config.Screen.WIDTH;
            this.y = Math.floor((Math.random() * (-180)) + 480 - this.halfHeight);
            this.alpha = 1;
        }

        public Move(): void {
            this.x -= this._dx;
        }

        public CheckBounds(): void {
            //check lower bounds
            if (this.x <= -this.width)
            {
                this.Reset();
            }
        }

        public Start(): void {
            this._dx = 8;
            this.Reset();
        }

        public Update(): void {
            this.Move();
            this.CheckBounds();
        }
    }
}