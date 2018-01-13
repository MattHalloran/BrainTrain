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

  countdownTimeout;
  startTimeTimeout;
  hexTimeout;

  wordsUsed = [];
  wordsGotten = [];
  totalWords = 3891;
  allWords: any[] = [];
  list = new Array(2);

  lastWord = 'empty'; //used instead of keyCode because keyCode is always 0 or 229 on android devices

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
    cd.hidden = false;
    this.countdownHelper('2');
    // this.sleep(1000).then(() => {
    //   this.countdown = '2';
    //   this.sleep(1000).then(() => {
    //     this.countdown = '1';
    //     this.sleep(1000).then(() => {
    //       this.countdown = 'GO';
    //       this.sleep(200).then(() => {
    //         cd.hidden = true;
    //         document.getElementById('leftList').hidden = false;
    //         document.getElementById('rightList').hidden = false;
    //         this.start();
    //       });
    //     });
    //   });
    // });
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
      // this.sleep(1000).then(() => {
      //   this.timer--;
      //   this.startTime();
      // });
    }
    else
      this.timerEnded();
  }

  timerEnded() {
    if(this.wordsShowing) {
      this.wordsShowing = false;
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
    console.log(this.lastWord);
    if(text == this.lastWord.substring(0, this.lastWord.length-1)) {
      (<HTMLInputElement>document.getElementById('wordInput')).value = '';
      this.lastWord = 'empty';
    }
    else {
      this.lastWord = text;
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
          // this.sleep(300).then(() => {
          //   input.setAttribute('style', 'border-color: #fcff54;');
          // });
        }
        if(i < endGotten) {
          if(this.wordsGotten[i] == text + '\u000d') {
            let input = <HTMLInputElement>document.getElementById('wordInput');
            input.setAttribute('style', 'border-color: #ff0000;');
            this.hexTimeout = setTimeout(() => { input.setAttribute('style', 'border-color: #fcff54;'); }, 300);
            // this.sleep(300).then(() => {
            //   input.setAttribute('style', 'border-color: #fcff54;');
            // })
          }
        }
      }
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
    this.navCtrl.pop();
  }
}
