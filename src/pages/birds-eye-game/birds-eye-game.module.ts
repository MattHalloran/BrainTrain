import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BirdsEyeGamePage } from './birds-eye-game';

@NgModule({
  declarations: [
    BirdsEyeGamePage,
  ],
  imports: [
    IonicPageModule.forChild(BirdsEyeGamePage),
  ],
  entryComponents: [
    BirdsEyeGamePage
  ],
})
export class BirdsEyeGamePageModule {}
