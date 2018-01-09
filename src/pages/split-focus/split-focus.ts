import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-split-focus',
  templateUrl: 'split-focus.html',
})
export class SplitFocusPage
 {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage)
  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplitFocusPage');
  }

  start(levelType: String)
  {
    this.navCtrl.push('SplitFocusGamePage', {level: levelType});
  }

}
