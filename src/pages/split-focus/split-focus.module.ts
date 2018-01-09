import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SplitFocusPage } from './split-focus';

@NgModule({
  declarations: [
    SplitFocusPage
  ],
  imports: [
    IonicPageModule.forChild(SplitFocusPage)
  ],
  entryComponents: [
    SplitFocusPage
  ],
})
export class SplitFocusPageModule {}
