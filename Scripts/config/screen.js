/*
* File name: screen.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: contains all the screen size
*/
var config;
(function (config) {
    var Screen = /** @class */ (function () {
        function Screen() {
        }
        Screen.WIDTH = 640;
        Screen.HEIGHT = 480;
        Screen.HALF_WIDTH = 320;
        Screen.HALF_HEIGHT = 240;
        return Screen;
    }());
    config.Screen = Screen;
})(config || (config = {}));
//# sourceMappingURL=screen.js.map