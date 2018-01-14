import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SplitFocusGamePage } from './split-focus-game';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    SplitFocusGamePage,
  ],
  imports: [
    IonicPageModule.forChild(SplitFocusGamePage),
    IonicStorageModule.forRoot(),
  ],
  entryComponents: [
    SplitFocusGamePage
  ],
})
export class SplitFocusGamePageModule {}
