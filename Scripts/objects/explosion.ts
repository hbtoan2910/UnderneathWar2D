/*
* File name: explosion.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: game object of explosition
*/

module objects {
    export class Explosion extends objects.GameObject {
        //private instance variables

        //public properties

        //constructors
        constructor(spriteString:string) {
            super(spriteString);
            this.Start();
        }

        //private methods
        private _animationEnded(): void
        {
            this.alpha = 0;
            this.off("animationend", this._animationEnded.bind(this), false);
            managers.Game.currentSceneObject.removeChild(this);
        }


        //publlic methods
        public Start(): void {
            this.on("animationend", this._animationEnded.bind(this), false);
        }

        public Update(): void {

        }

    }
}