/*
* File name: enemy.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: game object of enemy
*/

module objects {
    export class Enemy extends objects.GameObject {
        //Private Instance Variables


        //Public Properties

        //Constructor
        constructor() {
            super("warship");
            this.Start();
        }
        //Private Methods
        public Reset(): void {
            this.x = this.width + config.Screen.WIDTH;
            this.y = Math.floor((Math.random() * (-20)) + 250);
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

        //Public Methods
        public Start(): void {
            this._dx = 3;
            this.Reset();
        }

        public Update(): void {
            this.Move();
            this.CheckBounds();
            this.BulletFire();
        }

        public GetHit(): void {
            if (this.alpha != 0) {
                //add explosion
                createjs.Sound.play("explosion");
                let explosion = new objects.Explosion("smallexplosion");
                explosion.x = this.x;
                explosion.y = this.y;
                managers.Game.currentSceneObject.addChild(explosion);
                //points for destroy enemy
                managers.Game.scoreBoard.addScore(200);
                //reset enemy
                this.Reset();
            }
        }

        public BulletFire(): void {
            if (this.alpha == 1)
            {
                managers.Game.bulletManager.BulletFire("warship", this.x, this.y, this.halfHeight);
            }
        }
    }
}