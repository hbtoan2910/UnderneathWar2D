/*
* File name: boss1.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: scene object of boss1
*/

module scenes {
    export class BOSS1Scene extends objects.Scene {
        //private instance variables
        private  _warnLabel: objects.Label;
        private _bossHPLabel: objects.Label;  //display BOSS HP

        private _ocean: objects.Ocean;
        private _boss1: objects.BOSS1;
        private _player: objects.Player = managers.Game.player;

        private _scoreBoard: managers.ScoreBoard;
    
        private _bulletManager: managers.Bullet = managers.Game.bulletManager;

        //public properties


        //constructors
        constructor() {
            super();

            this.Start();
        }


        //private methods
        private afterTimeout() {
            this.removeChild(this._warnLabel); 
            this._boss1.SetEnable(true);
        }
        private async delay(){
            await new Promise(resolve => setTimeout(()=>resolve(), 4000)).then(()=>
            this.afterTimeout());
        }

        //public methods
        public Start(): void {
            this._ocean = new objects.Ocean();
            this._boss1 = new objects.BOSS1();
            this._boss1.alpha = 0;
            this._warnLabel = new objects.Label("be aware", "50px", "Starjedi", "#FFFF00", 300, 150, true);
            this._bossHPLabel = new objects.Label("boss hp ", "20px", "Starjedi", "#FFFF00", 260, 10, false);
            this._scoreBoard = managers.Game.scoreBoard;
            this.Main();
        }

        public Update(): void {
            console.log("num objects: " + this.numChildren);

            this._ocean.Update();
            this._boss1.Update();
            this._player.Update();

            this._bulletManager.Update();

            let bulletIdxArray : number[] = [];
            let bullets: objects.Bullet[] = [];
            //check player
            bulletIdxArray = managers.Game.bulletManager.GetTotalBulletTypes("player");
            for (let idx: number = 0; idx < bulletIdxArray.length; idx++)
            {
                bullets = managers.Game.bulletManager.GetBullets("player", bulletIdxArray[idx]);
                bullets.forEach(bullet =>
                    {
                        if (bullet.alpha == 1)
                        {
                            //check collision player-bullet -- enemy
                            managers.Collision.Check(bullet, this._boss1);  
                        }
                    })
            }

            //check boss
            bulletIdxArray = managers.Game.bulletManager.GetTotalBulletTypes("boss1");
            for (let idx: number = 0; idx < bulletIdxArray.length; idx++)
            {
                bullets = managers.Game.bulletManager.GetBullets("boss1", bulletIdxArray[idx]);
                bullets.forEach(bullet =>{
                    if (bullet.alpha == 1)
                    {
                        //check collision player-bullet -- enemy
                        managers.Collision.Check(bullet, this._player);  
                    }
                });
            }

            //update HP;
            this._bossHPLabel.text = "boss hp " + this._boss1.getHP();
        }

        public Destroy():void {
            //###
            //this._engineSound.stop();
            this.removeAllChildren();
        }

        public Main(): void {
            //add ocean to the scene
            this.addChild(this._ocean);
            //add label for 10s
            this.addChild(this._warnLabel);
            //add player to the scene
            this.addChild(this._player);
            this.addChild(this._player.planeFlash);    
            //add boss1 to the scene
            this.addChild(this._boss1);
            //add bullets to the scene
            managers.Game.bulletManager.RegisterBullet(this, "boss1");
            managers.Game.bulletManager.RegisterPlayerPreviousBullet(this);

            //add score board to the scene
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
            this.addChild(this._bossHPLabel);

            this.delay();
        }
    } 
}