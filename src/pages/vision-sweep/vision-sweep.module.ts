import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisionSweepPage } from './vision-sweep';

@NgModule({
  declarations: [
    VisionSweepPage
  ],
  imports: [
    IonicPageModule.forChild(VisionSweepPage),
  ],
  entryComponents: [
    VisionSweepPage
  ],
})
export class VisionSweepPageModule {}
