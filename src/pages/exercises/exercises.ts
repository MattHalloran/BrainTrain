//Matt Halloran
//12-25-17

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'exercises.html',
})
export class ExercisesPage {

  exercises = ['Bird\'s Eye', 'List Recall', 'Split Focus', 'Target Find'];

  constructor(public navCtrl: NavController) {

  }

  itemTapped(exercise: string)
  {
    if(exercise == 'Bird\'s Eye')
      this.navCtrl.push('BirdsEyePage');
    else if(exercise == 'List Recall')
      this.navCtrl.push('ListRecallPage');
    else if(exercise == 'Split Focus')
      this.navCtrl.push('SplitFocusPage');
    else if(exercise == 'Target Find')
      this.navCtrl.push('TargetFindPage');

  }

  getImage(name: String)
  {
    return 'assets/imgs/' + name.replace(' ', '').replace('\'', '').replace('\'', '').toLowerCase() + '.jpg';
  }

}
