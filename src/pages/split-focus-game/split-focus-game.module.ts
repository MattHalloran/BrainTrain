import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SplitFocusGamePage } from './split-focus-game';

@NgModule({
  declarations: [
    SplitFocusGamePage,
  ],
  imports: [
    IonicPageModule.forChild(SplitFocusGamePage),
  ],
  entryComponents: [
    SplitFocusGamePage
  ],
})
export class SplitFocusGamePageModule {}
