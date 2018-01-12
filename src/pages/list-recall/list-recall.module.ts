import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListRecallPage } from './list-recall';

@NgModule({
  declarations: [
    ListRecallPage,
  ],
  imports: [
    IonicPageModule.forChild(ListRecallPage),
  ],
  entryComponents: [
    ListRecallPage,
  ],
})
export class ListRecallPageModule {}
