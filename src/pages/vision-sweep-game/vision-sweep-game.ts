import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage({
  name: 'VisionSweepGamePage'
})
@Component({
  selector: 'page-vision-sweep-game',
  templateUrl: 'vision-sweep-game.html',
})
export class VisionSweepGamePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage)
  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisionSweepGamePage');
  }

}
