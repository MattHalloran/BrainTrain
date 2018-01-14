import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BirdsEyeGamePage } from './birds-eye-game';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    BirdsEyeGamePage,
  ],
  imports: [
    IonicPageModule.forChild(BirdsEyeGamePage),
    IonicStorageModule.forRoot(),
  ],
  entryComponents: [
    BirdsEyeGamePage
  ],
})
export class BirdsEyeGamePageModule {}
