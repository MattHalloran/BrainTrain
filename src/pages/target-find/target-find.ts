import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-target-find',
  templateUrl: 'target-find.html',
})
export class TargetFindPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {

  }

  start(levelType: string)
  {
    this.navCtrl.push('TargetFindGamePage', {level: levelType});
  }
}
