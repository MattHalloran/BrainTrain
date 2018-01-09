import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TargetFindPage } from './target-find';

@NgModule({
  declarations: [
    TargetFindPage
  ],
  imports: [
    IonicPageModule.forChild(TargetFindPage),
  ],
  entryComponents: [
    TargetFindPage
  ],
})
export class TargetFindPageModule {}
