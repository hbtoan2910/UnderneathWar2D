/*
* File name: player.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: game object of player
*/

module objects {
    export class Player extends objects.GameObject {
        //Private Instance Variables

        //Public Properties
        public planeFlash: objects.PlaneFlash;

        //Constructor
        constructor() {
            super("player");
            this.Start();
        }
        //Private Methods
        private _animatonEnded(): void
        {
            if (this.alpha == 0)
            {
                this.alpha = 1;
                this.planeFlash.alpha = 0;
            }

        }


        public Reset(): void {

        }

        public Move(): void {
            //mouse controls
            //this.x = objects.Game.stage.mouseX;

            //keyboard controls
            if (managers.Game.keyboardManager.moveLeft)
            {
                this.x -= 3;
            }

            if (managers.Game.keyboardManager.moveRight)
            {
                this.x += 3;
            }

            if (managers.Game.keyboardManager.moveForward)
            {
                this.y -= 3;
            }

            if (managers.Game.keyboardManager.moveBackward)
            {
                this.y += 3;
            }

            this.planeFlash.x = this.x;
            this.planeFlash.y = this.y;
        }

        public CheckBounds(): void {
            //right boundary
            if (this.x >= config.Screen.WIDTH - this.halfWidth)
            {
                this.x = config.Screen.WIDTH  - this.halfWidth;
            }
            //left boundary
            if (this.x <= this.halfWidth)
            {
                this.x = this.halfWidth;
            }
            //bottom boundary
            if (this.y >= config.Screen.HEIGHT - this.halfHeight)
            {
                this.y = config.Screen.HEIGHT  - this.halfHeight;
            }
            //upper boundary
            if (this.y <= 280)
            {
                this.y = 280;
            }
        }

        //Public Methods
        public Start(): void {
            this.planeFlash = new objects.PlaneFlash();
            this.planeFlash.alpha = 0;
            this.planeFlash.on("animationend", this._animatonEnded.bind(this), false);

            this.x = config.Screen.HALF_WIDTH;
            this.y = 430;
        }

        public Update(): void {
            this.Move();
            this.CheckBounds();
            this.BulletFire();
        }

        public BulletFire(): void {
            if (this.alpha == 1 && managers.Game.keyboardManager.fire)
            {
                managers.Game.bulletManager.BulletFire("player", this.x, this.y, this.halfHeight);
            }
        }

        //this method provides get hit update for the player object
        public GetHit(): void {
            if (this.alpha != 0) {
                createjs.Sound.play("explosion");
                managers.Game.scoreBoard.updateLifes(-1);

                managers.Game.bulletManager.RegisterBullet(managers.Game.currentSceneObject, "playerlv1");                

                let explosion = new objects.Explosion("explosion");
                explosion.x = this.x;
                explosion.y = this.y;
                managers.Game.currentSceneObject.addChild(explosion);
                this.alpha = 0;
                managers.Game.player.planeFlash.alpha = 1;
                managers.Game.player.planeFlash.gotoAndPlay("planeflash");
            }
        }
    }
}