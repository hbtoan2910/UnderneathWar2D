/*
* File name: scoreboard.ts
* Author: Bao Toan Huynh (301092875)
* Date last modified: Apr 03 2020
* Description: manage scores and lives for player
*/
var managers;
(function (managers) {
    var ScoreBoard = /** @class */ (function () {
        //Constructor
        function ScoreBoard() {
            this._initialize();
        }
        Object.defineProperty(ScoreBoard.prototype, "Lives", {
            //Public Properties
            get: function () {
                return this._lives;
            },
            set: function (newLives) {
                this._lives = newLives;
                this.LivesLabel.text = "Lives: " + this._lives;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "Score", {
            get: function () {
                return this._score;
            },
            set: function (newScore) {
                this._score = newScore;
                this.ScoreLabel.text = "Score: " + this._score;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "HighScore", {
            get: function () {
                return this._highScore;
            },
            set: function (newHighScore) {
                this._highScore = newHighScore;
                this.HighScoreLabel.text = "High Score: " + this._highScore;
            },
            enumerable: true,
            configurable: true
        });
        //Private Methods
        ScoreBoard.prototype._initialize = function () {
            this.LivesLabel = new objects.Label("Lives: 0", "20px", "Starjedi", "#FFFF00", 30, 10, false);
            this.ScoreLabel = new objects.Label("Score: 99999", "20px", "Starjedi", "#FFFF00", 460, 10, false);
            this.HighScoreLabel = new objects.Label("High Score: 99999", "40px", "Starjedi", "#FFFF00", 330, 200, true);
            this.Lives = 5;
            this.Score = 0;
            this.HighScore = 0;
        };
        //Public Methods
        ScoreBoard.prototype.addScore = function (score) {
            this.Score += score;
            var roundScore = Math.floor(this.Score / ScoreBoard._lifeupscore);
            //live +1
            if (roundScore != ScoreBoard._quotient) {
                console.log(roundScore + " " + ScoreBoard._quotient);
                ScoreBoard._quotient = roundScore;
                this.updateLifes(1);
                createjs.Sound.play("life");
            }
            if (managers.Game.HighScore < this.Score) {
                this.HighScore = this.Score;
                managers.Game.HighScore = this.HighScore;
            }
            if (this.Score >= 2500) //score higher than 2500 meets boss :)
             {
                managers.Game.currentScene = config.Scene.BOSS1;
            }
        };
        ScoreBoard.prototype.updateLifes = function (life) {
            this.Lives += life;
            if (this.Lives <= 0) {
                managers.Game.currentScene = config.Scene.OVER;
            }
        };
        ScoreBoard._quotient = 0;
        ScoreBoard._lifeupscore = 10000;
        return ScoreBoard;
    }());
    managers.ScoreBoard = ScoreBoard;
})(managers || (managers = {}));
//# sourceMappingURL=scoreboard.js.map