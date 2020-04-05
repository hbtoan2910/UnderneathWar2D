/*
* File name: button.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: game object of button
*/

module objects {
    export class Button extends objects.GameObject {
        //Private Instance Variables

        //Public Properties

        //Constructor
        constructor(imageString: string, x: number = 0, y: number = 0) {
            super(imageString);

            this.x = x;
            this.y = y;

        }
        //Private Methods

        //Public Methods
    }
}