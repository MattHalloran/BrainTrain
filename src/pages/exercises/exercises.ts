//Matt Halloran
//12-25-17

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'exercises.html',
  //name: 'ExercisesPage'
})
export class ExercisesPage
{

  exercises = ['Birds Eye', 'Split Focus', 'Target Find', 'Vision Sweep'];

  constructor(public navCtrl: NavController)
  {

  }

  itemTapped(exercise: string)
  {
    if(exercise == 'Birds Eye')
    {
      this.navCtrl.push('BirdsEyePage');
    }
    if(exercise == 'Split Focus'){
      this.navCtrl.push('SplitFocusPage');
    }
    if(exercise == 'Target Find'){
      this.navCtrl.push('TargetFindPage');
    }
    if(exercise == 'Vision Sweep'){
      this.navCtrl.push('VisionSweepPage');
    }

  }

  getImage(name: String)
  {
    return 'assets/imgs/' + name.replace(' ', '').replace('\'', '').toLowerCase() + '.jpg';
  }

}
