/*
* File name: game.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: contains all the game logic
*/
/// <reference path="_references.ts"/>
//IIFE -- Immediately Invoked Function Expression
//self executing anonymous function
(function () {
    //Game Variables
    var canvas = document.getElementById("canvas");
    var stage;
    var assetManager;
    var assetManifest;
    var currentScene;
    var currentState;
    var keyboardManager;
    var textureAtlasData; //json file
    var textureAtlas; //container for data
    // let stats: Stats;
    textureAtlasData = {
        "images": [
            "./Assets/sprites/textureAtlas.png"
        ],
        "frames": [
            [1, 1, 149, 54, 0, -1, -1],
            [152, 1, 96, 66, 0, -20, -13],
            [1, 57, 140, 66, 0, 0, -13],
            [143, 69, 100, 41, 0, -5, -4],
            [143, 112, 100, 41, 0, -5, -4],
            [1, 125, 127, 73, 0, -6, -6],
            [130, 155, 117, 79, 0, -11, 0],
            [1, 200, 117, 79, 0, -11, 0],
            [120, 236, 114, 66, 0, -4, -13],
            [1, 281, 110, 35, 0, 0, 0],
            [113, 304, 100, 41, 0, -5, -4],
            [215, 304, 31, 35, 0, -2, 0],
            [215, 341, 29, 35, 0, -3, 0],
            [1, 318, 100, 41, 0, -5, -4],
            [103, 347, 100, 41, 0, -5, -4],
            [205, 378, 39, 37, 0, 0, -2],
            [1, 361, 88, 67, 0, -18, -13],
            [91, 390, 87, 34, 0, -7, -2],
            [180, 390, 20, 26, 0, 0, -1],
            [202, 417, 45, 23, 0, 0, -1],
            [180, 418, 18, 60, 0, 0, 0],
            [200, 442, 48, 46, 0, -4, -5],
            [91, 426, 85, 31, 0, 0, -1],
            [1, 430, 80, 31, 0, 0, -1],
            [1, 430, 80, 31, 0, 0, -1],
            [83, 459, 75, 67, 0, -24, -13],
            [160, 459, 18, 59, 0, 0, 0],
            [180, 480, 18, 56, 0, 0, 0],
            [160, 520, 18, 54, 0, 0, 0],
            [200, 490, 45, 23, 0, 0, -1],
            [200, 515, 45, 23, 0, 0, -1],
            [180, 538, 18, 48, 0, 0, 0],
            [200, 540, 45, 23, 0, 0, -1],
            [200, 565, 45, 23, 0, 0, -1],
            [1, 463, 58, 30, 0, 0, -2],
            [61, 463, 15, 15, 0, 0, 0],
            [61, 480, 15, 15, 0, 0, 0],
            [1, 495, 55, 53, 0, 0, -2],
            [58, 497, 15, 15, 0, 0, 0],
            [58, 528, 55, 47, 0, 0, -4],
            [1, 550, 55, 47, 0, 0, -4],
            [115, 528, 39, 37, 0, 0, -2],
            [115, 567, 39, 37, 0, 0, -2],
            [58, 577, 55, 45, 0, 0, -3],
            [1, 599, 55, 44, 0, 0, -4],
            [156, 588, 39, 37, 0, 0, -2],
            [115, 606, 39, 37, 0, 0, -2],
            [58, 624, 55, 36, 0, 0, -4],
            [197, 590, 45, 23, 0, 0, -1],
            [197, 615, 45, 23, 0, 0, -1],
            [156, 627, 38, 35, 0, -1, -2],
            [115, 645, 38, 35, 0, -1, -2],
            [196, 640, 38, 35, 0, -1, -2],
            [155, 664, 38, 35, 0, -1, -2],
            [195, 677, 37, 37, 0, -1, -2],
            [1, 645, 36, 34, 0, -2, -2],
            [1, 681, 36, 34, 0, -2, -2],
            [39, 662, 36, 34, 0, -2, -2],
            [77, 662, 36, 34, 0, -2, -2]
        ],
        "animations": {
            "warship": { "frames": [0] },
            "boss": { "frames": [6, 5, 1, 25, 16, 8, 2, 7] },
            "btn_back": { "frames": [3] },
            "btn_exit": { "frames": [4] },
            "player": { "frames": [9] },
            "btn_instruct": { "frames": [10] },
            "coin": { "frames": [11, 12] },
            "btn_restart": { "frames": [13] },
            "btn_start": { "frames": [14] },
            "smallexplosion": { "frames": [15, 41, 42, 45, 54, 46] },
            "kb_blankspace": { "frames": [17] },
            "blt_playerlv1": { "frames": [18] },
            "torpedo": { "frames": [19, 29, 30, 32, 33, 48, 49] },
            "blt_playerlv2": { "frames": [31, 28, 27, 26, 20] },
            "explosion": { "frames": [21, 39, 40, 44, 37, 43, 47] },
            "shark": { "frames": [34, 23, 22, 24] },
            "bomb": { "frames": [35, 36, 38] },
            "kb_down": { "frames": [50] },
            "kb_left": { "frames": [51] },
            "kb_right": { "frames": [52] },
            "kb_up": { "frames": [53] },
            "kb_a": { "frames": [55] },
            "kb_d": { "frames": [56] },
            "kb_s": { "frames": [57] },
            "kb_w": { "frames": [58] }
        }
    };
    assetManifest = [
        { id: "textureAtlas", src: "./Assets/sprites/textureAtlas.png" },
        { id: "ocean", src: "./Assets/images/ocean.png" },
        { id: "coin", src: "./Assets/audio/coin.wav" },
        { id: "life", src: "./Assets/audio/lives.wav" },
        { id: "explosion", src: "./Assets/audio/explosion.mp3" },
        { id: "bulletSound", src: "./Assets/audio/bullet.wav" },
        { id: "stage1", src: "./Assets/audio/stage1.ogg" }
    ];
    function Init() {
        console.log("Init Function...");
        //load assets
        textureAtlas = new createjs.SpriteSheet(textureAtlasData);
        assetManager = new createjs.LoadQueue();
        assetManager.installPlugin(createjs.Sound);
        assetManager.loadManifest(assetManifest);
        assetManager.on("complete", Start);
    }
    function InitStats() {
        // stats = new Stats();
        // stats.showPanel(0);  // 0 fps 1 ms 2 mb  3+ custom
        // document.body.appendChild(stats.dom);
    }
    function Start() {
        console.log("%c Start Function...", "font-weight:bold; font-size:20px; color:red");
        InitStats();
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; //60 frames per second
        createjs.Ticker.addEventListener("tick", Update);
        managers.Game.stage = stage;
        managers.Game.currentScene = config.Scene.START;
        currentState = config.Scene.START;
        keyboardManager = new managers.Keyboard();
        managers.Game.keyboardManager = keyboardManager;
        managers.Game.assetManager = assetManager;
        managers.Game.textureAtlas = textureAtlas;
        Main();
    }
    function Update() {
        // stats.begin();
        //if the scene that is playing returns another current scene
        //then call main again and switch scene
        if (currentState != managers.Game.currentScene) {
            Main();
        }
        currentScene.Update();
        stage.update();
        // stats.end();
    }
    function Main() {
        //remove all current objects from the stage
        if (currentScene) {
            currentScene.Destroy();
            stage.removeChild(currentScene);
        }
        switch (managers.Game.currentScene) {
            case config.Scene.START:
                currentScene = new scenes.StartScene();
                break;
            case config.Scene.INSTRUCTION:
                currentScene = new scenes.InstructionScene();
                break;
            case config.Scene.PLAY:
                currentScene = new scenes.PlayScene();
                break;
            case config.Scene.BOSS1:
                currentScene = new scenes.BOSS1Scene();
                break;
            case config.Scene.OVER:
                currentScene = new scenes.OverScene();
                break;
        }
        currentState = managers.Game.currentScene;
        managers.Game.currentSceneObject = currentScene;
        //add new scene object to stage
        stage.addChild(currentScene);
    }
    window.addEventListener("load", Init);
})();
//# sourceMappingURL=game.js.map