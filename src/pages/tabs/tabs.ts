import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ExercisesPage } from '../exercises/exercises';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ExercisesPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
