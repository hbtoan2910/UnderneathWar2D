/*
* File name: vec.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: calculate the distance between two game objects
*/

module math {
    export class Vec2 extends createjs.Point {

        //Private Instance Variables

        //Public Properties

        //Constructor
        constructor(x: number = 0, y: number = 0) {
            super(x, y);
        }
        //Private Methods

        //Public Methods
        public static Distance(P1: Vec2, P2: Vec2): number
        {
            return Math.floor(Math.sqrt(Math.pow(P2.x - P1.x, 2) + Math.pow(P2.y - P1.y, 2)));
        }
    }
}