import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AdMobFree } from '@ionic-native/admob-free';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage({
  name: 'ListRecallGamePage',
})
@Component({
  selector: 'page-list-recall-game',
  templateUrl: 'list-recall-game.html',
})
export class ListRecallGamePage {

  timer = 120; //seconds left to memeorize or recall
  countdown = '3';
  inCountdown = true;

  //allow for game to be exited at any time without messing up upon return
  countdownTimeout;
  startTimeTimeout;
  hexTimeout;

  buttonText = 'Ready';

  chartData;
  gameData;

  wordsUsed = [];
  wordsGotten = [];
  totalWords = 3891;
  allWords: any[] = [];
  list = new Array(2);

  wordsShowing = true;

  constructor(public navCtrl: NavController, public storage: Storage, public navParams: NavParams, public platform: Platform, public statusBar: StatusBar, public http: Http, public alertController: AlertController, public adMob: AdMobFree) {
    platform.ready().then(() => {
      statusBar.hide();
      this.adMob.banner.hide();
    });

    for(let i = 0; i < 2; i++) {
      this.list[i] = new Array(25);
    }

    http.get('assets/txts/words.txt').map(res => res.text()).subscribe(data => {
      this.allWords = data.split('\n');
      for(let i = 0; i < 25; i++) {
        for(let j = 0; j < 2; j++) {
          let used = true;
          do{
            let nextWord = this.allWords[Math.floor(Math.random()*(this.totalWords-1))];
            if(this.wordsUsed.indexOf(nextWord) == -1) {
              used = false;
              this.wordsUsed.push(nextWord);
              this.list[j][i] = nextWord;
            }
          } while(used);
        }
      }
      console.log(this.wordsUsed);
    });

    storage.get('chartData').then((cData) => {
      this.chartData = cData;
    });

    storage.get('gameData').then((gData) => {
      this.gameData = gData;
    });
  }

  ionViewDidLoad() {
    this.countdownStart();
  }

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
      this.inCountdown = false;
      document.getElementById('countdown').hidden = true;
      document.getElementById('leftList').hidden = false;
      document.getElementById('rightList').hidden = false;
      this.startTime()
    }, 200);
  }

  startTime() {
    if(this.timer != 0) {
      this.startTimeTimeout = setTimeout(() => {
         this.timer--;
         this.startTime();
       },1000);
    }
    else
      this.timerEnded();
  }

  timerEnded() {
    if(this.wordsShowing) {
      this.wordsShowing = false;
      this.buttonText = 'Finish';
      document.getElementById('leftList').hidden = true;
      document.getElementById('rightList').hidden = true;
      document.getElementById('wordInput').hidden = false;
      document.getElementById('score').hidden = false;
      this.timer = 180;
      this.startTime();
    }
    else {
      this.end();
    }
  }

  /**
  * @return Countdown from 3
  */
  getCountDown() {
    return this.countdown;
  }

  /**
  * @return The amount of time left in the level
  */
  getTimer() {
    let time = this.timer;
    let minutes = Math.floor(time/60);
    let seconds = time%60;
    let secondsString = seconds + '';
    if(seconds < 10)
      secondsString = '0' + seconds;
    return minutes == 0 ? secondsString : minutes + ':' + secondsString;
  }

  onInputTime(text: string) {
    text = text.replace(/ /g, '').toLowerCase();
    let endUsed = this.wordsUsed.length;
    let endGotten = this.wordsGotten.length;
    for(let i = 0; i < endUsed; i++) {
      if(this.wordsUsed[i] == text + '\u000d') {
        console.log('yes' + i);
        this.wordsGotten.push(this.wordsUsed[i]);
        this.wordsUsed.splice(i, 1);
        let input = <HTMLInputElement>document.getElementById('wordInput');
        input.value = '';
        input.setAttribute('style', 'border-color: #44ff44;');
        this.hexTimeout = setTimeout(() => { input.setAttribute('style', 'border-color: #fcff54;'); }, 300);
      }
      if(i < endGotten) {
        if(this.wordsGotten[i] == text + '\u000d') {
          let input = <HTMLInputElement>document.getElementById('wordInput');
          input.setAttribute('style', 'border-color: #ff0000;');
          this.hexTimeout = setTimeout(() => { input.setAttribute('style', 'border-color: #fcff54;'); }, 300);
        }
      }
    }
  }

  readyFinish() {
    clearTimeout(this.countdownTimeout);
    if(this.inCountdown)
      this.goHelper();
    else {
      clearTimeout(this.startTimeTimeout);
      clearTimeout(this.hexTimeout);
      document.getElementById('countdown').hidden = true;
      this.timerEnded();
    }
  }

  getScore() {
    return this.wordsGotten.length;
  }

  ionViewWillUnload() {
    clearTimeout(this.countdownTimeout);
    clearTimeout(this.startTimeTimeout);
    clearTimeout(this.hexTimeout);
    this.statusBar.show();
  }

  end() {
    if(this.gameData['List Recall'].highScore[0] < this.wordsGotten.length){
      this.gameData['List Recall'].highScore[0] = this.wordsGotten.length;
      this.storage.set('gameData', this.gameData);
    }
    this.chartData['List Recall'].data[6]++;
    this.storage.set('chartData', this.chartData);
    let alert = this.alertController.create({
      title: 'Finished!',
      message: 'Your score was ' + this.wordsGotten.length,
      buttons: ['Sweet!'],
      cssClass: 'alert',
    });
    alert.present();
    this.adMob.banner.show();
    this.navCtrl.pop();
  }
}
