class Toad {
  constructor (x = 475, y = 662.5, status = 'safe', homes, score, timer, level) {
    this.xCoordinate = x;
    this.yCoordinate = y;
    this.width = 50;
    this.height = 50;
    this.status = status;
    this.counter = 50;
    this.homes = homes;
    this.margin = 7;
    this.velocity = 0;
    this.score = score;
    this.timer = timer;
    this.level = level;
    this.toadMaxRow = 750;
    // this.turtles = turtles;
    // this.logs = logs;
    // this.autos = autos;
    // this.river = river;
  }
  drawToad (context) {
    if (this.timer.timeRemaining <= 0 && this.status == 'safe') {
      this.status = 'dead';
      this.level.death();
    }
    if (this.status === 'safe') {
      this.xCoordinate += this.velocity;
      context.fillStyle = 'lightgreen';
      context.fillRect(this.xCoordinate, this.yCoordinate, this.width, this.height);
    }
    if (this.status === 'dead') {
      this.timer.timerRunning = false;
      this.counter--;
      if (this.counter > 0) {
        context.fillStyle = 'lightgreen';
        context.fillRect(this.xCoordinate, this.yCoordinate, this.width, this.counter);
      }
      if (this.counter < -30) {
        this.respawnToad();
      }
    }
  }
  moveToad (direction, canvas) {
    if (this.status === 'safe') {
      if (direction === 'left' && this.xCoordinate > 67) {
        this.xCoordinate = this.xCoordinate - 67;
      }
      if (direction === 'right' && this.xCoordinate < canvas.width - 67) {
        this.xCoordinate = this.xCoordinate + 67;
      }
      if (direction === 'up') {
        if (this.yCoordinate > 187.5) {
          this.yCoordinate = this.yCoordinate - 50;
          this.toadMove();
        } else {
          let inHome = this.level.homes.filter(function(home) {
            return (this.xCoordinate > home.xCoordinate - this.margin && this.xCoordinate + this.width  < home.xCoordinate + home.width + this.margin)
          }, this)

          if (inHome.length && !inHome[0].hasToad) {
            // debugger; //use this debugger to test margin
            inHome[0].safe();
            this.respawnToad();
          }
        }
      }
      if (direction === 'down' && this.yCoordinate < 662.5) {
        this.yCoordinate = this.yCoordinate + 50;
      }
    }
  }
  respawnToad() {
    if (!this.level.gameOver) {
      this.xCoordinate = 475;
      this.yCoordinate = 662.5;
      this.counter = 50;
      this.velocity = 0;
      this.status = 'safe'
      this.toadMaxRow = 750;
      this.timer.timeRemaining = 60;
      this.timer.timerRunning = true;
    }
  }
  toadMove() {
    // console.log(`yCoord: ${this.yCoordinate}, ToadMax: ${this.toadMaxRow}`);
    if (this.yCoordinate < this.toadMaxRow) {
      this.toadMaxRow = this.yCoordinate;
      this.score.addScore(10);
    }
  }



  collisionDetection(turtles, logs, autos, river) {
    if (this.status == 'safe') {
      autos.forEach(function(car) {
        if ((this.yCoordinate + 2 == car.yCoordinate) &&
      ((this.xCoordinate < car.xCoordinate + car.width && this.xCoordinate > car.xCoordinate) ||
      (this.xCoordinate + this.width > car.xCoordinate && this.xCoordinate + this.width < car.xCoordinate + car.width))) {
          this.status = 'dead';
          this.level.death();
        }
      }, this);
      let onRiverPlatform = river.filter(function(platform) {
        if (platform.constructor.name == 'Turtle') {
          return !platform.submerged &&
          this.yCoordinate + 2 == platform.yCoordinate &&
          this.xCoordinate > platform.xCoordinate - this.margin &&
          this.xCoordinate + this.width < platform.xCoordinate + platform.width + this.margin
        } else if (platform.constructor.name == 'Platform') {
          return (this.yCoordinate + 2 == platform.yCoordinate) &&
            this.xCoordinate > platform.xCoordinate - this.margin &&
            this.xCoordinate + this.width < platform.xCoordinate + platform.width + this.margin
        }
      }, this)

      if (onRiverPlatform.length > 0) {
        this.velocity = onRiverPlatform[0].velocity;
      }
      if (!onRiverPlatform.length) {
        this.velocity = 0;
      }
      if (onRiverPlatform.length == 0 && this.yCoordinate < 412.5) {
        this.status = 'dead';
        this.level.death();
      }
    }
  }
}

module.exports = Toad;
