import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';

@IonicPage({
  name: 'TargetFindGamePage'
})
@Component({
  selector: 'page-target-find-game',
  templateUrl: 'target-find-game.html',
})
export class TargetFindGamePage {

  background = 'targetBackground1';
  objects = [0, 1, 2, 3, 4, 5, 6 ,7, 8, 9, 10, 11];//Yes, this is the only way to do this
  objectPositions = new Array(12);
  objectDirections = new Array(12);
  allTargetNums = [1, 2, 3, 4, 5, 6];
  currentTargetNum = 2;//default target num
  currentMovingObjects = 2; //used to reduce redundancy
  targetsLeftToClick = 2;

  targetSpeed = 1;//changes based on level
  speed = 18 //36 = slow, 18 = fast

  level = '11'; //default level
  levelInt = 0;//default level index in game data
  objectWidth = 50; //default object width
  objectHeight = 50; //default object height
  maxX;
  maxY;
  minY;

  objectsMoving = false;

  canClick = false;

  countdown = '3';
  //allow for game to be exited at any time without messing up upon return
  countdownTimeout;
  objectTimeout;
  moveTimeout;
  displayTimeout;

  chartData;
  gameData;

  correctStreak = 0; //every 3 correct in a row moves player to next speed
  totalCorrect = 0;
  timesLeft = 10;

  constructor(public navCtrl: NavController, public storage: Storage, public navParams: NavParams, public platform: Platform, public statusBar: StatusBar, public alertController: AlertController) {
    let endFor = this.objectPositions.length
    for (var i = 0; i < endFor; i++) {
      this.objectPositions[i] = new Array(2);
    }

    this.level = navParams.get('level');
    this.background = 'targetBackground' + this.level.charAt(0);
    if(this.level = '12')
      this.levelInt = 0;
    else if(this.level = '11')
      this.levelInt = 1;
    else if(this.level = '21')
      this.levelInt = 2;
    else
      this.levelInt = 3;

    this.targetSpeed = parseInt(this.level.charAt(1));
    this.speed*=this.targetSpeed;
    platform.ready().then(() => {
      statusBar.hide();
    });

    storage.get('chartData').then((cData) => {
      this.chartData = cData;
    });

    storage.get('gameData').then((gData) => {
      this.gameData = gData;
      this.currentTargetNum = this.gameData['Target Find'].lastTargetNum[this.levelInt];
    });

    this.maxX = this.platform.width()-this.objectWidth;
    this.maxY = this.platform.height()-this.objectHeight;
    this.minY = this.platform.height()/10;
  }

  ionViewDidLoad() {
    this.countdownStart();
  }

  /**
  * Starts countdown before game begins
  */
  countdownStart() {
    let cd = document.getElementById('countdown');
    cd.hidden = false;
    this.countdownHelper('2')
  }

  /**
  * Helper method for countdownStart()
  */
  countdownHelper(text: string) {
    this.countdownTimeout = setTimeout(() => {
      this.countdown = text;
      if(text == '2')
        this.countdownHelper('1');
      else if(text == '1')
        this.countdownHelper('GO');
      else
        this.goHelper();
    }, 1000);
  }

  /**
  * Helper method for countdownStart()
  */
  goHelper() {
    this.countdownTimeout = setTimeout(() => { document.getElementById('countdown').hidden = true; this.startTime()}, 200);
  }

  /**
  * Ends game or begins next bird spawn
  */
  startTime() {
    if(this.timesLeft <= 0) {
      this.end();
    }
    else {
      this.targetsLeftToClick = this.currentTargetNum;
      this.currentMovingObjects = this.currentTargetNum;
      this.loadObjects(0, this.currentTargetNum);
      this.objectTimeout = setTimeout(() => {
        this.objectsMoving = true;
        this.moveObjects();
        this.objectTimeout = setTimeout(() => {
          this.loadObjects(this.currentTargetNum, this.objects.length);
          this.currentMovingObjects = this.objects.length;
          this.objectTimeout = setTimeout(() => {
            this.objectsMoving = false;
            this.canClick = true;
          }, 6000);
        }, 1500);
      }, 2000);
    }
  }

  loadObjects(start, end) {
    var maxWidth = this.platform.width()-this.objectWidth;
    var maxHeight = this.platform.height()-this.objectHeight;
    var minHeight = 90;
    var x;
    var y;

    for(let i = start; i < end; i++) {
      var object = document.getElementById(i + '');
      var invalidSpot;
      do {
        invalidSpot = false;
        x = Math.floor(Math.random()*maxWidth);
        y = Math.floor(Math.random()*(maxHeight-minHeight)+minHeight);
        for(let j = 0; j < i; j++) {
          let otherObjectX = this.objectPositions[j][0];
          let otherObjectY = this.objectPositions[j][1];
          if((Math.abs(x-otherObjectX) <= this.objectWidth) && (Math.abs(y-otherObjectY) <= this.objectHeight))
            invalidSpot = true;
        }
      } while(invalidSpot)

      this.objectPositions[i][0] = x;
      this.objectPositions[i][1] = y;
      this.objectDirections[i] = Math.random()*6.2832;//0 to 2pi
      object.hidden = false;
    }

    console.log(Date.now());
  }

  //0=left, 1=top
  //1.4142 is used instead of sqrt(2) for efficiency
  //50 is used instead of object width and height for efficiency
  moveObjects() {
    if(this.objectsMoving) {
      this.moveTimeout = setTimeout(() => {
        for(let i = 0; i < this.currentMovingObjects; i++) {
          let direction = this.objectDirections[i];
          this.objectPositions[i][0]+=2*Math.cos(direction);
          this.objectPositions[i][1]+=2*Math.sin(direction);

          let iX = this.objectPositions[i][0];
          let iY = this.objectPositions[i][1];
          if(iX >= this.maxX || iX <= 0)
            this.objectDirections[i] = direction+2*(1.5708-direction);
          else if(iY >= this.maxY || iY <= this.minY)
            this.objectDirections[i] = direction+2*(6.2832-direction);

          for(let j = 0; j < this.currentMovingObjects; j++) {
            if(j != i && (Math.abs(iX-this.objectPositions[j][0]) <= 50 && Math.abs(iY-this.objectPositions[j][1]) <= 50)) {
              let tempDirection =  this.objectDirections[i];
              this.objectDirections[i] = this.objectDirections[j];
              this.objectDirections[j] = tempDirection;
            }
          }
        }
        this.moveObjects();
      },this.speed);
    }
  }

  /**
  * Checks if place tapped contains one of the target objects
  * @param {ev} The tap event
  */
  handleTap(ev) {
    if(this.canClick) {
      var xClick = ev.changedPointers[0].x;
      var yClick = ev.changedPointers[0].y;
      var clickedCorrect = true;
      for(let i = 0; i < this.objects.length; i++) {
        var target = document.getElementById(i + '');
        var targetX = this.objectPositions[i][0];
        var targetY = this.objectPositions[i][1];
        if(xClick-targetX <= this.objectWidth && xClick-targetX >= 0 && yClick-targetY <= this.objectHeight && yClick-targetY >= 0) {
          if(i < this.currentTargetNum && !target.hidden) {
            target.hidden = true;
            this.targetsLeftToClick--;
            if(this.targetsLeftToClick == 0)
              this.correct();
          }
          else {
            clickedCorrect = false;
            this.incorrect();
          }
        }
      }
    }
  }

  /**
  * Decides what to do after correct button was pressed
  */
  correct() {
    this.canClick = false;
    this.timesLeft--;
    this.hideObjects();
    this.totalCorrect++;
    this.correctStreak++;
    if(this.correctStreak == 3) {
      this.correctStreak = 0;
      if(this.currentTargetNum < this.allTargetNums.length-1)
        this.currentTargetNum++;
    }
    this.displayImage('check');
  }

  /**
  * Decides what to do after incorrect button was pressed
  */
  incorrect() {
    this.canClick = false;
    this.timesLeft--;
    this.hideObjects();
    this.correctStreak = 0;
    if(this.currentTargetNum > 1)
      this.currentTargetNum--;
    this.displayImage('x');
  }

  /**
  * Displays check mark if correct object was clicked, or
  * an x otherwise
  * @param {s} The image to be displayed
  */
  displayImage(s : string) {
    document.getElementById(s).hidden = false;
    this.displayTimeout = setTimeout(() => {
      document.getElementById(s).hidden = true;
      this.startTime();
    }, 500);
  }

  hideObjects() {
    for(let i = 0; i < this.objects.length; i++) {
      document.getElementById(i + '').hidden = true;
    }
  }

  getPosition(o: any) {
    return {'left': this.objectPositions[parseInt(o)][0] + 'px',
            'top': this.objectPositions[parseInt(o)][1] + 'px'}
  }

  /**
  * Decides which type of object will appear
  * @return The object type url
  */
  getSource() {
    return this.level.charAt(0) == '1' ? 'assets/imgs/target-find-game/frog.svg' : 'assets/imgs/target-find-game/camel.svg';
  }

  /**
  * @return The width of the x and check mark
  */
  getXCheckWidth() {
    return this.platform.width()/2;
  }

  /**
  * @return The height of the x and check mark
  */
  getXCheckHeight() {
    return this.platform.height()/2;
  }

  /**
  * @return The width of the x and check mark
  */
  getWidth() {
    return this.platform.width()/2;
  }

  /**
  * @return The height of the x and check mark
  */
  getHeight() {
    return this.platform.height()/2;
  }

  /**
  * @return The amount of times left in the level
  */
  getTimesLeft() {
    return this.timesLeft;
  }

  /**
  * @return The number of objects being tracked
  */
  getObjectNum() {
    return this.currentTargetNum;
  }

  /**
  * @return Countdown from 3
  */
  getCountDown() {
    return this.countdown;
  }

  ionViewWillUnload() {
    clearTimeout(this.countdownTimeout);
    clearTimeout(this.objectTimeout);
    clearTimeout(this.moveTimeout);
    clearTimeout(this.displayTimeout);
    this.statusBar.show();
    this.objectsMoving = false;
  }

  /**
  * Ends game
  */
  end() {
    if(this.gameData['Target Find'].highScore[this.levelInt] < this.totalCorrect)
      this.gameData['Target Find'].highScore[this.levelInt] = this.totalCorrect;
    this.gameData['Target Find'].lastTargetNum[this.levelInt] = this.currentTargetNum;
    this.storage.set('gameData', this.gameData);

    let alert = this.alertController.create({
      title: 'Finished!',
      message: 'Your score was ' + this.totalCorrect,
      buttons: ['Sweet!'],
      cssClass: 'alert',
    });
    alert.present();

    this.navCtrl.pop();
  }

}
