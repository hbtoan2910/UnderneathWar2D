/*
* File name: collision.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: manage collision
*/
var managers;
(function (managers) {
    var Collision = /** @class */ (function () {
        function Collision() {
        }
        Collision.Check = function (object1, object2) {
            var P1 = new math.Vec2(object1.x, object1.y);
            var P2 = new math.Vec2(object2.x, object2.y);
            if (math.Vec2.Distance(P1, P2) < (object1.halfHeight + object2.halfHeight)) {
                if (!object2.isColliding) {
                    object2.isColliding = true;
                    switch (object2.name) {
                        case "coin":
                            if (object2.alpha != 0) {
                                createjs.Sound.play("coin");
                                object2.alpha = 0;
                                managers.Game.scoreBoard.addScore(100);
                                managers.Game.bulletManager.RegisterBullet(managers.Game.currentSceneObject, "playerlv2");
                            }
                            break;
                        case "shark":
                            if (object1.name == "player") {
                                //downcast to player object
                                object1.GetHit();
                                object2.GetHit(object1.name);
                            }
                            else if (object1.name == "torpedo") {
                                //update TIE lifes and explosions
                                object2.GetHit(object1.name);
                                //make bullet disappear
                                object1.DisappearBullet();
                            }
                            break;
                        case "warship":
                            //downcast to player enemy
                            object2.GetHit();
                            if (object1.name == "blt_playerlv1" || object1.name == "blt_playerlv2") {
                                //make bullet disappear
                                object1.DisappearBullet();
                            }
                            break;
                        case "boss":
                            //downcast to boss
                            object2.GetHit(object1.name);
                            if (object1.name == "blt_playerlv1" || object1.name == "blt_playerlv2") {
                                //make bullet disappear
                                object1.DisappearBullet();
                            }
                            break;
                        case "player":
                            //downcast to player get hit
                            object2.GetHit();
                            //can refine to contain bullet
                            if (object1.name == "blt_playerlv1" || object1.name == "blt_playerlv2" || object1.name == "bomb") {
                                //make bullet disappear
                                object1.DisappearBullet();
                            }
                            break;
                    }
                }
            }
            else {
                object2.isColliding = false;
            }
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map