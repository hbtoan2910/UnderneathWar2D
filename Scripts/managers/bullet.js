/*
* File name: bullet.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: manages the bullet types
*/
var managers;
(function (managers) {
    var Bullet = /** @class */ (function () {
        //constructors
        function Bullet() {
            this.Start(); //to be refined
        }
        //private methods
        Bullet.prototype._buildBulletPool = function (bulletname, totalCnt, dx, dy) {
            var bullets = [];
            for (var count = 0; count < totalCnt; count++) {
                bullets[count] = new objects.Bullet(bulletname, dx, dy);
            }
            return bullets;
        };
        //public methods
        Bullet.prototype.Start = function () {
            this._objBulletMap = new Map();
            //playerlv1
            //add blt_playerlv1
            var blt_playerlv1Array = [];
            blt_playerlv1Array.push({
                name: "blt_playerlv1", isenabled: false, totalcnt: 20, curcnt: 0, tickerPeriod: 40, dx: 0, dy: -10,
                offset_x: 0, offset_y: 0, ref: this._buildBulletPool("blt_playerlv1", 20, 0, -10)
            });
            this._objBulletMap.set("playerlv1", blt_playerlv1Array);
            //playerlv2
            //add blt_playerlv2
            var blt_playerlv2Array = [];
            blt_playerlv2Array.push({
                name: "blt_playerlv2", isenabled: false, totalcnt: 20, curcnt: 0, tickerPeriod: 30, dx: 0, dy: -10,
                offset_x: 0, offset_y: 0, ref: this._buildBulletPool("blt_playerlv2", 20, 0, -10)
            });
            blt_playerlv2Array.push({
                name: "torpedo", isenabled: false, totalcnt: 20, curcnt: 0, tickerPeriod: 30, dx: 10, dy: 0,
                offset_x: 60, offset_y: 20, ref: this._buildBulletPool("torpedo", 20, 10, 0)
            });
            this._objBulletMap.set("playerlv2", blt_playerlv2Array);
            //warship
            //add bomb
            var blt_playerlv3Array = [];
            blt_playerlv3Array.push({
                name: "bomb", isenabled: false, totalcnt: 20, curcnt: 0, tickerPeriod: 30, dx: 0, dy: 2,
                offset_x: 0, offset_y: 30, ref: this._buildBulletPool("bomb", 20, 0, 2)
            });
            this._objBulletMap.set("warship", blt_playerlv3Array);
            //boss1
            //add bomb
            var blt_boss1Array = [];
            blt_boss1Array.push({
                name: "bomb", isenabled: false, totalcnt: 20, curcnt: 0, tickerPeriod: 30, dx: 0, dy: 2,
                offset_x: 0, offset_y: 30, ref: this._buildBulletPool("bomb", 20, 0, 2)
            });
            this._objBulletMap.set("boss1", blt_boss1Array);
        };
        Bullet.prototype.Update = function () {
            //only update the bullet that has been enabled
            this._objBulletMap.forEach(function (bulletInfo) {
                for (var bulletidx = 0; bulletidx < bulletInfo.length; bulletidx++) {
                    if (bulletInfo[bulletidx].isenabled) {
                        bulletInfo[bulletidx].ref.forEach(function (bullet) { bullet.Update(); });
                    }
                }
            });
        };
        Bullet.prototype.BulletFire = function (bulletCarrier, x, y, halfHeight) {
            var ticker = createjs.Ticker.getTicks();
            var tickerPeriod;
            var bulletInfo;
            switch (bulletCarrier) {
                case "player":
                    bulletInfo = this._objBulletMap.get(this._lastPlayerRegisterLevel);
                    break;
                case "warship":
                    bulletInfo = this._objBulletMap.get("warship");
                    break;
                case "boss1":
                    bulletInfo = this._objBulletMap.get("boss1");
                    break;
            }
            for (var idx = 0; idx < bulletInfo.length; idx++) {
                tickerPeriod = bulletInfo[idx].tickerPeriod;
                if (ticker % tickerPeriod == 0) {
                    var bulletSpawn = new math.Vec2(x, y - halfHeight);
                    var currentBullet = bulletInfo[idx].curcnt;
                    var bullet = bulletInfo[idx].ref[currentBullet];
                    var bulletTotalCnt = bulletInfo[idx].totalcnt;
                    //bullet firing position offset to the player reg x y
                    var offset_x = bulletInfo[idx].offset_x;
                    var offset_y = bulletInfo[idx].offset_y;
                    bullet.alpha = 1;
                    bullet.x = bulletSpawn.x + offset_x;
                    bullet.y = bulletSpawn.y + offset_y;
                    currentBullet = (currentBullet + 1) % bulletTotalCnt;
                    bulletInfo[idx].curcnt = currentBullet;
                    //createjs.Sound.play("bulletSound");   //### hard code to turn this off
                }
            }
        };
        Bullet.prototype.RegisterBullet = function (tarScene, objectname) {
            var bulletInfo = this._objBulletMap.get(objectname);
            for (var idx = 0; idx < bulletInfo.length; idx++) {
                bulletInfo[idx].isenabled = true;
                var bullets = bulletInfo[idx].ref;
                bullets.forEach(function (bullet) { tarScene.addChild(bullet); });
            }
            //if player has multi level bullet, need disable other bullet types
            if (objectname.search("player") != -1) {
                var playerLevelString = objectname.substring(8, 9);
                var playerLevel = parseInt(playerLevelString);
                this._lastPlayerRegisterLevel = objectname; //store the latest playerlvl
                //go through all the player bullet types
                //### 2 is player level hard code, should be 3
                for (var lvlidx = 1; lvlidx <= 2; lvlidx++) {
                    if (lvlidx != playerLevel) {
                        bulletInfo = this._objBulletMap.get("playerlv" + lvlidx);
                        for (var idx = 0; idx < bulletInfo.length; idx++) {
                            bulletInfo[idx].isenabled = false;
                            var bullets = bulletInfo[idx].ref;
                            bullets.forEach(function (bullet) { tarScene.removeChild(bullet); });
                        }
                    }
                }
            }
        };
        Bullet.prototype.RegisterPlayerPreviousBullet = function (tarScene) {
            var bulletInfo = this._objBulletMap.get(this._lastPlayerRegisterLevel);
            for (var idx = 0; idx < bulletInfo.length; idx++) {
                bulletInfo[idx].isenabled = true;
                var bullets = bulletInfo[idx].ref;
                bullets.forEach(function (bullet) { tarScene.addChild(bullet); });
            }
        };
        Bullet.prototype.GetTotalBulletTypes = function (objectname) {
            if (objectname.search("player") != -1) //player
             {
                objectname = this._lastPlayerRegisterLevel;
            }
            var totBulletTypes = [];
            var bulletInfo = this._objBulletMap.get(objectname);
            for (var idx = 0; idx < bulletInfo.length; idx++) {
                if (bulletInfo[idx].isenabled) //only return currently enabled bullet
                 {
                    totBulletTypes.push(idx);
                }
            }
            return totBulletTypes;
        };
        Bullet.prototype.GetBullets = function (objectname, bulletIdx) {
            if (objectname.search("player") != -1) //player
             {
                objectname = this._lastPlayerRegisterLevel;
            }
            var bulletInfo = this._objBulletMap.get(objectname);
            return bulletInfo[bulletIdx].ref;
        };
        return Bullet;
    }());
    managers.Bullet = Bullet;
})(managers || (managers = {}));
//# sourceMappingURL=bullet.js.map