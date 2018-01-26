//Matt Halloran
//12-25-17

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage({
  name: 'BirdsEyePage',
})
@Component({
  selector: 'page-birds-eye',
  templateUrl: 'birds-eye.html',
})

export class BirdsEyePage {

  max = "1";

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  ionViewWillEnter() {
    this.storage.get('gameData').then((gData) => {
      let level = gData['Bird\'s Eye'].highestLevel;
      if(level >= 1 && level <= 10)
        this.max = level + '';
      else
        this.max = 1 + '';
      console.log(this.max + ' ' + level);
    });
    console.log(document.getElementById('range'));
  }

  ngOnInit(){
    (this as any).myRange = 1;
  }

  public start(){
    this.navCtrl.push('BirdsEyeGamePage', {range: (this as any).myRange});
  }

  getMax() {
    return this.max;
  }
}
