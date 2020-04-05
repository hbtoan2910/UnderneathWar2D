/*
* File name: scene.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: game object of scene
*/

module objects {
    export abstract class Scene extends createjs.Container {
        //Instance Variables

        //Public properties
        public assetManager;

        //Constructors
        constructor() {
            super();
            this.assetManager = managers.Game.assetManager;
        }
        //Private Methods

        //Public Methods
        public Start(): void {

        }

        public Update(): void {
        }

        public Destroy():void {

        }

        public Main(): void {
            
        }
    }
}