/*
* File name: game.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: container for all the static refs
*/
var managers;
(function (managers) {
    var Game = /** @class */ (function () {
        function Game() {
        }
        Game.HighScore = 0;
        return Game;
    }());
    managers.Game = Game;
})(managers || (managers = {}));
//# sourceMappingURL=game.js.map