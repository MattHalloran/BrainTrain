import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListRecallGamePage } from './list-recall-game';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    ListRecallGamePage,
  ],
  imports: [
    IonicPageModule.forChild(ListRecallGamePage),
    HttpModule,
  ],
})
export class ListRecallGamePageModule {}
