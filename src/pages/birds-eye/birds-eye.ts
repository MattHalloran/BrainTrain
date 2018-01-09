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



  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

  }

  ngOnInit(){
    (this as any).myRange = 1;
  }

  public start(){

    //this.storage.set('birdLevel', (this as any).myRange);
    //this.navCtrl.push('BirdsEyeGamePage');
    this.navCtrl.push('BirdsEyeGamePage', {range: (this as any).myRange});
  }
}
