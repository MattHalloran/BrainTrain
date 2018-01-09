import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisionSweepGamePage } from './vision-sweep-game';

@NgModule({
  declarations: [
    VisionSweepGamePage,
  ],
  imports: [
    IonicPageModule.forChild(VisionSweepGamePage),
  ],
  entryComponents: [
    VisionSweepGamePage
  ],
})
export class VisionSweepGamePageModule {}
