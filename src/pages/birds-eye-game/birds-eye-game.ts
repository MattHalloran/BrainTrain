//Matt Halloran
//1-2-17

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';

@IonicPage({
  name: 'BirdsEyeGamePage'
})
@Component({
  selector: 'page-birds-eye-game',
  templateUrl: 'birds-eye-game.html',
})

export class BirdsEyeGamePage {

  background = 'birdBackground1';
  birds = [0, 1, 2, 3, 4, 5, 6 ,7];//Yes, this is the only way to do this
  allMillis = [2000, 2750, 2500, 2250, 2000, 1750, 1500, 1250, 1000,
              750, 600, 500, 400, 310, 230, 180, 130, 100, 75, 50, 45, 40, 35, 30];
  targetBirdNum = 0;

  level = '1';
  birdBaseFile = 'assets/imgs/birds-eye-game/BirdsEyeLevel'
  birdWidth = 90; //default bird width
  birdHeight = 90; //default bird height

  canClick = false;

  countdown = '3';
  currentMilliPos = 8;//change to get this value from last game played
  lastCorrect = false; //used so currentMilli is upped every time the user gets it right twice in a row
  totalCorrect = 0;
  timesLeft = 40;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public platform: Platform, public statusBar: StatusBar)
  {
    let level = navParams.get('range') + '';
    this.background = 'birdBackground' + level;
    platform.ready().then(() => {
      statusBar.hide();
    });
  }

  ionViewDidLoad() {
      this.level = this.navParams.get('range') + '';
      this.countdownStart();
  }

  ionViewWillUnload() {
    this.statusBar.show();
  }

  /**
  * Starts countdown before game begins
  */
  countdownStart() {
    let cd = document.getElementById('countdown');
    this.countdown = '3';
    cd.hidden = false;
    this.sleep(1000).then(() => {
      this.countdown = '2';
      this.sleep(1000).then(() => {
        this.countdown = '1';
        this.sleep(1000).then(() => {
          this.countdown = 'GO';
          this.sleep(200).then(() => {
            cd.hidden = true;
            this.startTime();
          });
        });
      });
    });
  }

  /**
  * Ends game or begins next bird spawn
  */
  startTime() {
    if(this.timesLeft <= 0) {
      this.end();
    }
    else {
      this.loadBirds();
      this.sleep(this.allMillis[this.currentMilliPos]).then(() => {
        this.hideBirds();
        this.canClick = true;
      });
    }
  }

  /**
  * Spawns birds
  */
  loadBirds() {
    this.canClick = false;
    this.targetBirdNum = Math.floor(Math.random()*8);
    var maxWidth = this.platform.width()-this.birdWidth;
    var minHeight = 90;
    var maxHeight = this.platform.height()-this.birdHeight;
    var x;
    var y;

    for(let i = 0; i <= this.birds.length-1; i++) {
      var bird = document.getElementById(i + '');
      var invalidSpot;
      do {
        invalidSpot = false;
        x = Math.floor(Math.random()*maxWidth);
        y = Math.floor(Math.random()*(maxHeight-minHeight)+minHeight);
        for(let j = 0; j < i; j++) {
          let otherBird = document.getElementById(j + '');
          let otherBirdX = parseInt(otherBird.style.left.replace('px', ''));
          let otherBirdY = parseInt(otherBird.style.top.replace('px', ''));
          if((Math.abs(x-otherBirdX) <= this.birdWidth) && (Math.abs(y-otherBirdY) <= this.birdHeight))
            invalidSpot = true;
        }
      } while(invalidSpot)

      bird.setAttribute('style','top: ' + y + 'px; left: ' + x + 'px;');
      bird.hidden = false;
    }
  }

  sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  /**
  * Hides birds
  */
  hideBirds () {
    for(let i = 0; i <= this.birds.length-1; i++) {
        var bird = document.getElementById(i + '');
        bird.hidden = true;
    }
  }

  /**
  * Checks if place tapped contains the target bird
  * @param {ev} The tap event
  */
  handleTap(ev) {
    if(this.canClick) {
      this.canClick = false;
      this.timesLeft--;
      var xClick = ev.changedPointers[0].x;
      var yClick = ev.changedPointers[0].y;
      var clickedBird = false;
      var i = 0;
      while(i <= this.birds.length-1 && !clickedBird) {
        var bird = document.getElementById(i + '');
        var birdX = parseInt(bird.style.left.replace('px', ''));
        var birdY = parseInt(bird.style.top.replace('px', ''));

        if(xClick >= birdX && xClick <= birdX+this.birdWidth && yClick >= birdY && yClick <= birdY+this.birdHeight && i == this.targetBirdNum) { //clicked correct bird
          bird.hidden = true;
          clickedBird = true;

          if(this.lastCorrect) {
            if(this.currentMilliPos < this.allMillis.length-1)
              this.currentMilliPos++;
          }

          if(this.lastCorrect)
            this.lastCorrect = false;
          else
            this.lastCorrect = true;
          this.totalCorrect++;
        }

        i++;
      }
      //clicked incorrect bird
      if(!clickedBird) {
        this.lastCorrect = false;
        if(this.currentMilliPos > 0)
          this.currentMilliPos--;
        this.displayImage('x');
     }
     else
        this.displayImage('check');
    }
  }

  /**
  * Displays check mark if correct bird was clicked, or
  * an x otherwise
  * @param {s} The image to be displayed
  */
  displayImage(s : string) {
    document.getElementById(s).hidden = false;
    this.sleep(500).then(() => {
      document.getElementById(s).hidden = true;
      this.startTime();
    });
  }

  /**
  * Decides whether a bird will be common or target
  * @param {s} The bird img that needs an image
  * @return The common bird or target bird url
  */
  getSource(s: string) {
    return s == (this.targetBirdNum + '') ? this.birdBaseFile + this.level + 'BirdTarget.png' : this.birdBaseFile + this.level + 'BirdCommon.png';
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
  * @return The current number of milliseconds the birds are visible for
  */
  getMilli() {
    return this.allMillis[this.currentMilliPos];
  }

  /**
  * @return Countdown from 3
  */
  getCountDown() {
    return this.countdown;
  }

  /**
  * Ends level, shows stats in popup, and updates user data
  */
  end() { //show score in popup, save score with sqlite or data file
    alert('Finished! Your score was ' + this.totalCorrect);
    this.statusBar.show();
    this.navCtrl.pop();
  }
}
