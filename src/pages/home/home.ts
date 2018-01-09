//Matt Halloran
//1-3-17

import { Component, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;

  games = ['Bird\'s Eye', 'Split Focus', 'Target Find', 'Vision Sweep'];
  weeklyArrow = 'assets/imgs/downArrow.png';
  overallArrow = 'assets/imgs/downArrow.png';
  highArrow = 'assets/imgs/downArrow.png';

  //stats;

  constructor(public navCtrl: NavController, public storage: Storage, public platform: Platform){
    //storage.set('first', true); //for testing purposes
    //this.stats = storage.get('stats');
  }

  ionViewDidLoad() {
    var test = [12, 12 ,12 ,12 ,12 ,12, 45];
    console.log(test);
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [
          {
            label: " Bird's Eye ",
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0, 153, 51, 0.4)",
            borderColor: "rgba(0, 153, 51, 1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75, 192, 192, 1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
            pointHoverBorderColor: "rgba(220, 220, 220, 1)",
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: test,
            spanGaps: false
          },
          {
            label: "  Split Focus  ",
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(204, 0, 0, 0.4)",
            borderColor: "rgba(204, 0, 0, 1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75, 192, 192, 1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
            pointHoverBorderColor: "rgba(220, 220, 220, 1)",
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: [10, 20, 30, 40, 50, 60, 70],
            spanGaps: false
          },
          {
            label: "Target Find",
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0, 51, 204, 0.4)",
            borderColor: "rgba(0, 51, 204, 1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75, 192, 192, 1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
            pointHoverBorderColor: "rgba(220, 220, 220, 1)",
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: [70, 60, 50, 40, 30, 20, 10],
            spanGaps: false
          },
          {
            label: "Vision Sweep",
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(255, 153, 0, 0.4)",
            borderColor: "rgba(255, 153, 0, 1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75, 192, 192, 1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
            pointHoverBorderColor: "rgba(220, 220, 220, 1)",
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: [13, 72, 81, 1, 23, 45, 29],
            spanGaps: false
          }
        ]
      },
      options: {
            maintainAspectRatio: false
                }
    });
    document.getElementById('myChart').style.height = this.getHeight() + 'px';
  }

  getHeight() {
    return this.platform.height()/5*3;
  }

  getLevel(game: string) {
  //  var levelGet = this.storage.get(game.replace('\'', '') + 'MaxLevel');
    return 0;//temp
  }

  getSecondItem(game: string) {
    return 'hello';//temp
  }

  toggleWeekly() { //no way to put these 3 into one function because dot notation doesn't accept variable evaluations
      if(this.weeklyArrow == 'assets/imgs/rightArrow.png') {
        this.weeklyArrow = 'assets/imgs/downArrow.png';
        document.getElementById('weekly').hidden = false;
      }
      else {
        this.weeklyArrow = 'assets/imgs/rightArrow.png';
        document.getElementById('weekly').hidden = true;
      }
  }

  toggleOverall() {
      if(this.overallArrow == 'assets/imgs/rightArrow.png') {
        this.overallArrow = 'assets/imgs/downArrow.png';
        document.getElementById('overall').hidden = false;
      }
      else {
        this.overallArrow = 'assets/imgs/rightArrow.png';
        document.getElementById('overall').hidden = true;
      }
  }

  toggleHigh() {
      if(this.highArrow == 'assets/imgs/rightArrow.png') {
        this.highArrow = 'assets/imgs/downArrow.png';
        document.getElementById('high').hidden = false;
      }
      else {
        this.highArrow = 'assets/imgs/rightArrow.png';
        document.getElementById('high').hidden = true;
      }
  }

}
