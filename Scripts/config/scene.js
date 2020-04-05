/*
* File name: scene.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: contains all the scene types
*/
var config;
(function (config) {
    var Scene;
    (function (Scene) {
        Scene[Scene["START"] = 0] = "START";
        Scene[Scene["INSTRUCTION"] = 1] = "INSTRUCTION";
        Scene[Scene["PLAY"] = 2] = "PLAY";
        Scene[Scene["BOSS1"] = 3] = "BOSS1";
        Scene[Scene["OVER"] = 4] = "OVER";
    })(Scene = config.Scene || (config.Scene = {}));
})(config || (config = {}));
//# sourceMappingURL=scene.js.map