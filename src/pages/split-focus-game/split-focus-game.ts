//Matt Halloran
//1-3-17

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { AdMobFree } from '@ionic-native/admob-free';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';

 @IonicPage({
   name: 'SplitFocusGamePage'
 })
@Component({
  selector: 'page-split-focus-game',
  templateUrl: 'split-focus-game.html',
})
export class SplitFocusGamePage {

  allMillis = [3000, 2750, 2500, 2250, 2000, 1750, 1500, 1250, 1000,
              750, 600, 500, 400, 310, 230, 180, 130, 100, 75, 50, 45, 40, 35, 30];
  currentMilliPos = 8;//change to get this value from last game played
  correctStreak = 0; //every 4 correct in a row moves player to next speed
  totalCorrect = 0;
  timesLeft = 60;//60
  levelType = '';
  levelTypeInt = 0;
  countdown = '3';

  canClick = false;

  //allow for game to be exited at any time without messing up upon return
  countdownTimeout;
  totalTimeout;
  sleepTimeout;

  chartData;
  gameData;

  leftSource = '';
  rightSource = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public platform: Platform, public statusBar: StatusBar, public alertController: AlertController, public adMob: AdMobFree){
    this.levelType = navParams.get('level');
    if(this.levelType == 'matchingColor')
      this.levelTypeInt = 0;
    else if(this.levelType == 'matchingShape')
      this.levelTypeInt = 1;
    else
      this.levelTypeInt = 2;

    platform.ready().then(() => {
      statusBar.hide();
      this.adMob.banner.hide();
    });

    storage.get('chartData').then((cData) => {
      this.chartData = cData;
    });

    storage.get('gameData').then((gData) => {
      this.gameData = gData;
      this.currentMilliPos = this.gameData['Split Focus'].lastMilliPos[this.levelTypeInt];
    });
   }

  ionViewDidLoad() {
    this.countdownStart();
  }

  ionViewWillUnload() {
    clearTimeout(this.countdownTimeout);
    clearTimeout(this.totalTimeout);
    clearTimeout(this.sleepTimeout);
    this.statusBar.show();
  }

  /**
  * Starts countdown before game begins
  */
  countdownStart() {
    let cd = document.getElementById('countdown');
    cd.hidden = false;
    this.countdownHelper('2');
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
    this.countdownTimeout = setTimeout(() => {
      document.getElementById('countdown').hidden = true;
      this.startTime();
    }, 200);
  }

  /**
  * Either ends game or starts another time
  */
  startTime() {
    if(this.timesLeft <= 0) {
      this.end();
    }
    else {
      this.loadShapes();
      this.canClick = true;
      this.totalTimeout = setTimeout(() => { this.incorrect(); }, this.allMillis[this.currentMilliPos]*2);
      this.sleepTimeout = setTimeout(() => { this.hideShapes(); }, this.allMillis[this.currentMilliPos]);
    }
  }

  /**
  * Decides which shapes to load and unhides them
  */
  loadShapes() {
    var typeNum;
    var shapeNum;
    var colorNum;
    for(let i = 1; i <= 2; i++) {
      typeNum = Math.floor(Math.random()*3);

      if((this.levelType == 'matchingShape' || this.levelType == 'matchingShapeAndColor') && i == 2)
        shapeNum = this.fiftyFifty(shapeNum); //allows Yes and No to have an equal change of occuring
      else
        shapeNum = Math.floor(Math.random()*3);

      if((this.levelType == 'matchingColor' || this.levelType == 'matchingShapeAndColor') && i == 2)
        colorNum = this.fiftyFifty(colorNum); //allows Yes and No to have an equal change of occuring
      else
        colorNum = Math.floor(Math.random()*3);

      let type;
      let shape;
      let color;

      if(typeNum == 0)
        type = 'Double';
      if(typeNum == 1)
        type = 'Hollow';
      if(typeNum == 2)
        type = 'Solid';

      if(shapeNum == 0)
        shape = 'Circle';
      if(shapeNum == 1)
        shape = 'Triangle';
      if(shapeNum == 2)
        shape = 'Square';

      if(colorNum == 0)
        color = 'Red';
      if(colorNum == 1)
        color = 'Green';
      if(colorNum == 2)
        color = 'Blue';

      if(i == 1)
        this.leftSource = 'assets/imgs/split-focus-game/' + type + shape + color + '.png';
      if(i == 2)
        this.rightSource = 'assets/imgs/split-focus-game/' + type + shape + color + '.png';
    }
    document.getElementById('shape1').hidden = false;
    document.getElementById('shape2').hidden = false;
  }

  /**
  * Allows 'Yes' to be the answer half of the time
  */
  fiftyFifty(i: any) {
    if(Math.random() > 0.5)
      return i;
    var newInt = i;
    while(newInt == i)
      newInt = Math.floor(Math.random()*3);
    return newInt;
  }

  hideShapes() {
    document.getElementById('shape1').hidden = true;
    document.getElementById('shape2').hidden = true;
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
  * @return The width/height of the shape
  */
  getShapeDimension() {
    return this.platform.width()/5*2;
  }

  /**
  * @return The amount of times left in the level
  */
  getTimesLeft() {
    return this.timesLeft;
  }

  /**
  * @return The current number of milliseconds the user has to decide
  */
  getMilli() {
    return this.allMillis[this.currentMilliPos]*2;
  }

  /**
  * @return Countdown from 3
  */
  getCountDown() {
    return this.countdown;
  }

  /**
  * Decides what will happen after a click event
  * @param {s} The button clicked
  */
  clicked(s: string) {
    if(this.canClick) {
      clearTimeout(this.totalTimeout);
      clearTimeout(this.sleepTimeout);
      this.canClick = false;
      this.hideShapes();

      var leftColor = this.getColor(this.leftSource);
      var rightColor = this.getColor(this.rightSource);
      var leftShape = this.getShape(this.leftSource);
      var rightShape = this.getShape(this.rightSource);

      if(this.levelType == 'matchingColor') {
        if(leftColor == rightColor) {
              if(s == 'yes')
                this.correct();
              else
                this.incorrect();
            }
        else {
          if(s == 'no')
            this.correct();
          else
            this.incorrect();
        }
      }
      if(this.levelType == 'matchingShape') {
        if(leftShape == rightShape) {
              if(s == 'yes')
                this.correct();
              else
                this.incorrect();
            }
        else {
          if(s == 'no')
            this.correct();
          else
            this.incorrect();
        }
      }
      if(this.levelType == 'matchingShapeAndColor') {
        if(leftShape == rightShape && leftColor == rightColor) {
              if(s == 'yes')
                this.correct();
              else
                this.incorrect();
            }
        else {
          if(s == 'no')
            this.correct();
          else
            this.incorrect();
        }
      }
    }
  }

  /**
  * @param  source Source of shape
  * @return Color of shape
  */
  getColor(source) {
    if(source.includes('Red'))
      return 'Red';
    else if(source.includes('Green'))
      return 'Green';
    else
      return 'Blue';
  }

  /**
  * @param  source Source of shape
  * @return Shape of shape
  */
  getShape(source) {
    if(source.includes('Circle'))
      return 'Circle';
    else if(source.includes('Square'))
      return 'Square';
    else
      return 'Triangle';
  }

  /**
  * Decides what to do after correct button was pressed
  */
  correct() {
    this.timesLeft--;
    this.totalCorrect++;
    this.correctStreak++;
    if(this.correctStreak == 4) {
      this.correctStreak = 0;
      if(this.currentMilliPos < this.allMillis.length-1)
        this.currentMilliPos++;
    }
    this.displayImage('check');
  }

  /**
  * Decides what to do after incorrect button was pressed
  */
  incorrect() {
    this.timesLeft--;
    this.canClick = false;
    this.correctStreak = 0;
    if(this.currentMilliPos > 0)
      this.currentMilliPos--;
    this.displayImage('x');
  }

  /**
  * Displays check mark if correct shape was clicked, or
  * an x otherwise
  * @param {s} The image to be displayed
  */
  displayImage(s : string) {
    document.getElementById(s).hidden = false;
    setTimeout(() => { document.getElementById(s).hidden = true; this.startTime(); }, 500);
  }

  /**
  * Ends game
  */
  end() {
    this.gameData['Split Focus'].lastMilliPos[this.levelTypeInt] = this.currentMilliPos;
    this.chartData['Split Focus'].data[6]++;
    if(this.gameData['Split Focus'].highScore[this.levelTypeInt] < this.totalCorrect)
      this.gameData['Split Focus'].highScore[this.levelTypeInt] = this.totalCorrect;

    let allCompleted = true;
    for(let i = 0; i < this.gameData['Split Focus'].highScore.length; i++) {
      if(this.gameData['Split Focus'].highScore[i] == 0)
        allCompleted = false;
    }
    if(allCompleted) {
      console.log('Achievement: finished all levels');
    }

    this.storage.set('gameData', this.gameData);
    this.storage.set('chartData', this.chartData);
    let alert = this.alertController.create({
      title: 'Finished!',
      message: 'Your score was ' + this.totalCorrect,
      buttons: ['Sweet!'],
      cssClass: 'alert',
    });
    alert.present();
    this.adMob.banner.show();
    this.navCtrl.pop();

  }

}
