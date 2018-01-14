import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TargetFindGamePage } from './target-find-game';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    TargetFindGamePage,
  ],
  imports: [
    IonicPageModule.forChild(TargetFindGamePage),
    IonicStorageModule.forRoot(),
  ],
  entryComponents: [
    TargetFindGamePage
  ],
})
export class TargetFindGamePageModule {}
