import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-vision-sweep',
  templateUrl: 'vision-sweep.html',
})
export class VisionSweepPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisionSweepPage');
  }

  start(levelType: String)
  {
    this.storage.set('splitLevel', levelType);
    this.navCtrl.push('VisionSweepGamePage');
  }
}
