/*
* File name: play.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: scene object of play
*/

module scenes {
    export class PlayScene extends objects.Scene {
        //Private Instance Variables
        private _ocean: objects.Ocean;
        private _player: objects.Player;
        private _tie: objects.TIE[];
        private _tieNum: number;

        private _scoreBoard: managers.ScoreBoard;
        private _engineSound: createjs.AbstractSoundInstance;

        private _coin: objects.Coin; //activate missile and torpedo
        private _enemy: objects.Enemy;

        private _bulletManager: managers.Bullet = managers.Game.bulletManager;

        //Public Properties


        //Constructor
        constructor() {
            super();

            this.Start();
        }

        //Private Methods



        //Public Methods
        //Initialize Game Variables and objects
        public Start(): void {
            this._ocean = new objects.Ocean();
            this._player = new objects.Player();
            managers.Game.player = this._player;


            //create an enemy
            this._enemy = new objects.Enemy();

            this._coin = new objects.Coin();

            //inistantiate the TIE array
            this._tieNum = 2;
            this._tie = new Array<objects.TIE>();
            for (let count = 0; count < this._tieNum; count++) {
                this._tie[count] = new objects.TIE();
                
            }

            this._engineSound = createjs.Sound.play("stage1");
            this._engineSound.loop = -1;  //play forever
            this._engineSound.volume = 0.1;

            //create the scoreboard UI 
            this._scoreBoard = new managers.ScoreBoard();
            managers.Game.scoreBoard = this._scoreBoard;

            this.Main();
        }

        //triggered every frame
        public Update(): void {
            console.log("num objects: " + this.numChildren);
            this._ocean.Update();
            this._player.Update();
            this._enemy.Update();
            this._bulletManager.Update();
            //to be refine later
            this._coin.Update();

            //check collision between player and coin
            managers.Collision.Check(this._player, this._coin);

            this._tie.forEach(tie => {
                tie.Update();
                //check collision between player and current tie
                managers.Collision.Check(this._player, tie);
            });

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
                            managers.Collision.Check(bullet, this._enemy);  
                        }

                        if (bullet.alpha == 1)
                        {
                            //check collision player-bullet -- TIE
                            for (let count = 0; count < this._tieNum; count++) {
                                if (this._tie[count].alpha == 1){
                                    managers.Collision.Check(bullet, this._tie[count]);
                                }               
                            }
                        }

                    })
            }
            //check warship
            bulletIdxArray = managers.Game.bulletManager.GetTotalBulletTypes("warship");
            for (let idx: number = 0; idx < bulletIdxArray.length; idx++)
            {
                bullets = managers.Game.bulletManager.GetBullets("warship", bulletIdxArray[idx]);
                bullets.forEach(bullet =>{
                    if (bullet.alpha == 1)
                    {
                        //check collision player-bullet -- enemy
                        managers.Collision.Check(bullet, this._player);  
                    }
                });
            }
        }

        public Destroy():void {
            this._engineSound.stop();
            this.removeAllChildren();
        }

        public Main(): void {
            //pay attention the orders
            //add space to the scene
            this.addChild(this._ocean);
            //add coin to the scene
            this.addChild(this._coin);
            //add player to the scene
            this.addChild(this._player);
            this.addChild(this._player.planeFlash);    
            //add enemy to the scene
            this.addChild(this._enemy);

            //add bullets to the scene
            managers.Game.bulletManager.RegisterBullet(this, "playerlv1");
            managers.Game.bulletManager.RegisterBullet(this, "warship");
            //add ties to the scene
            this._tie.forEach(tie => {
                this.addChild(tie);
            });

            //add score board to the scene
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
        }
    }
}