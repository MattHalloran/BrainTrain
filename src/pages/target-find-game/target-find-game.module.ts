import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TargetFindGamePage } from './target-find-game';

@NgModule({
  declarations: [
    TargetFindGamePage,
  ],
  imports: [
    IonicPageModule.forChild(TargetFindGamePage),
  ],
  entryComponents: [
    TargetFindGamePage
  ],
})
export class TargetFindGamePageModule {}
