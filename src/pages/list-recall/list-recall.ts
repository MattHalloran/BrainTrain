import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'ListRecallPage',
})
@Component({
  selector: 'page-list-recall',
  templateUrl: 'list-recall.html',
})
export class ListRecallPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListRecallPage');
  }

  start() {
    this.navCtrl.push('ListRecallGamePage');
  }

}
