//Matt Halloran
//12-25-17

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'BirdsEyePage',
})
@Component({
  selector: 'page-birds-eye',
  templateUrl: 'birds-eye.html',
})

export class BirdsEyePage {



  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ngOnInit(){
    (this as any).myRange = 1;
  }

  public start(){
    this.navCtrl.push('BirdsEyeGamePage', {range: (this as any).myRange});
  }
}
