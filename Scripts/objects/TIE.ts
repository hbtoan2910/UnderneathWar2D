/*
* File name: TIE.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: game object of TIE
*/

module objects {
    export class TIE extends objects.GameObject {
        //Private Instance Variables
        private _hp: number;

        //Public Properties

        //Constructor
        constructor() {
            super("shark");
            this.Start();
        }
        //Private Methods
        public Reset(): void {
            this.x = this.width + config.Screen.WIDTH;
            this.y = Math.floor((Math.random() * (-150)) + 430);
            //drift randomly
            this._dx = Math.floor((Math.random() * 3) - 6);
            this._dy = Math.floor((Math.random() * 4) - 2);
            //reset enemy
            this._hp = 3;
            //reset alpha
            this.alpha = 0;
        }

        public Move(): void {
            this.y += this._dy;
            this.x += this._dx;
        }

        public CheckBounds(): void {
            if ((this.y >= 250 && this.y <= 480) && (this.x >= 0 && this.x <= this.width + config.Screen.WIDTH) )
            {
                if (this.alpha == 0)
                {
                    this.alpha = 1;
                }
            }
            else
            {
                this.Reset();
            }
        
        }

        //Public Methods
        public Start(): void {
            this._hp = 3; 
            this.Reset();
        }

        public Update(): void {
            this.Move();
            this.CheckBounds();
        }

        public GetHit(hitType: string): void {
            if (this.alpha != 0) {
                //add explosion
                createjs.Sound.play("explosion");
                let explosion = new objects.Explosion("explosion");
                explosion.x = this.x;
                explosion.y = this.y;
                managers.Game.currentSceneObject.addChild(explosion);
                //points for destroy enemy
                managers.Game.scoreBoard.addScore(200);

                let hitHP: number = 1;
                switch(hitType)
                {
                    case "player":
                    hitHP = 3;
                    break;
                    case "torpedo":
                    hitHP = 3;
                    break;
                    default:
                    break;
                }
                this._hp -= hitHP;
                if (this._hp <= 0)
                {
                    //reset enemy
                    this.Reset();
                }                
            }
        }
    }
}