/*
* File name: bullet.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: game object of bullet
*/

module objects {
    export class Bullet extends objects.GameObject {
        //private instance variables
        //public properties


        //constructors
        constructor(bulletType: string, dx: number, dy: number) {
            super(bulletType);
            this._dx = dx;
            this._dy = dy;
            this.Start();
        }

        //private methods


        //public methods
        public Start(): void {
            this.Reset();            
        }

        public Update(): void {
            this.Move();
            this.CheckBounds();
        }

        public Reset(): void {
            this.x = -5000;
            this.y = -5000;

            this.alpha = 0;
        }

        public CheckBounds(): void {
            if (this.alpha == 0)
            {
                if (this.y >= 0 && this.x >=0)
                {
                    this.alpha = 1;
                }
            }

            if (this.y <= -this.height || this.x >= (config.Screen.WIDTH - this.width) )
            {
                this.Reset();
            }
        }

        public Move(): void {
            this.x += this._dx;
            this.y += this._dy;
        }

        public DisappearBullet(): void {
            this.Reset();
        }

    }
}