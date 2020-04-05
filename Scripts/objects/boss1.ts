/*
* File name: boss1.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: game object of boss1
*/

module objects {
    export class BOSS1 extends objects.GameObject {
        //private instance variables
        private _hp: number;
        private _isEnable: boolean;

        //public properties

        //constructor
        constructor() {
            super("boss");
            this.Start();   
        } 

        //private methods

        //public methods
        public Reset(): void {
            this.x = config.Screen.WIDTH - this.width;
            this.y = config.Screen.HEIGHT / 2;
            //drift randomly
            this._dx = Math.floor((Math.random() * 3) - 6);
            this._dy = Math.floor((Math.random() * 4) - 2);
            //reset alpha
            this.alpha = 0;
        }

        public Move(): void {
            this.y += this._dy;
            this.x += this._dx;
        }

        public CheckBounds(): void {
            if ((this.y >= 0 && this.y <= 480) && (this.x >= 0 && this.x <= this.width + config.Screen.WIDTH) )
            {
                if (this.alpha == 0 && this._isEnable)
                {
                    this.alpha = 1;
                }
            }
            else
            {
                this.Reset();
            }
        }

        public Start(): void {
            this._hp = 100; //initialize boss HP
            this._isEnable = false;
        }

        public Update(): void {
            this.Move();
            this.CheckBounds();
            this.BulletFire();
        }

        public BulletFire(): void {
            if (this.alpha == 1)
            {
                managers.Game.bulletManager.BulletFire("boss1", this.x, this.y, this.halfHeight);
            }
        }

        public SetEnable(isEnable: boolean): void {
            this._isEnable = isEnable;
        }

        public GetHit(hitType: string): void {
            if (this.alpha != 0) {
                //add explosion
                createjs.Sound.play("explosion");
                let explosion = new objects.Explosion("explosion");
                explosion.x = this.x;
                explosion.y = this.y;
                managers.Game.currentSceneObject.addChild(explosion);
                //points for hitting boss
                managers.Game.scoreBoard.addScore(300);

                let hitHP: number = 1;
                switch(hitType)
                {
                    case "player":
                    hitHP = 3;
                    break;
                    case "torpedo":
                    hitHP = 3;
                    break;
                    case "blt_playerlv2":
                    hitHP = 3;
                    break;
                    case "blt_playerlv1":
                    hitHP = 1;
                    break;
                    default:
                    break;
                }
                this._hp -= hitHP;
                if (this._hp <= 0)
                {
                    managers.Game.currentScene = config.Scene.OVER; 
                }                
            }
        }

        public getHP(): number {
            return this._hp;
        }
    }
}