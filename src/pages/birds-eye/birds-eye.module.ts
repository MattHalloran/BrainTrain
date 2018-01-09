import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicPageModule } from 'ionic-angular';
import { BirdsEyePage } from './birds-eye';

@NgModule({
  declarations: [
    BirdsEyePage
  ],
  imports: [
    IonicPageModule.forChild(BirdsEyePage),
    FormsModule
  ],
  entryComponents: [
    BirdsEyePage
  ],
})
export class BirdsEyePageModule {}
