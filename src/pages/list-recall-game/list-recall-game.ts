import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
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
  wordsUsed = [];
  totalWords = 3986;
  allWords: any[] = [];
  list = new Array(2);
  wordsShowing = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public statusBar: StatusBar, public http: Http) {
    platform.ready().then(() => {
      statusBar.hide();
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
  }

  ionViewDidLoad() {
    this.countdownStart();
  }

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
            document.getElementById('leftList').hidden = false;
            document.getElementById('rightList').hidden = false;
            this.start();
          });
        });
      });
    });
  }

  sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  start() {
    this.startTime();
  }

  startTime() {
    if(this.timer != 0) {
      this.sleep(1000).then(() => {
        this.timer--;
        this.startTime();
      });
    }
    else
      this.timerEnded();
  }

  timerEnded() {
    if(this.wordsShowing) {
      this.wordsShowing = false;
      document.getElementById('leftList').hidden = true;
      document.getElementById('rightList').hidden = true;
      this.timer = 120;
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

  ionViewWillUnload() {
    this.statusBar.show();
  }

  end() {
    this.navCtrl.pop();
  }
}
