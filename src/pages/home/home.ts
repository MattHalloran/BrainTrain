//Matt Halloran
//1-3-17

import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;

  games = ['Bird\'s Eye', 'List Recall', 'Split Focus', 'Target Find'];
  weeklyArrow = 'assets/imgs/downArrow.png';
  overallArrow = 'assets/imgs/downArrow.png';
  highArrow = 'assets/imgs/downArrow.png';

  chartData;
  chartDataArray = new Array(4);
  gameData;

  constructor(public navCtrl: NavController, public storage: Storage, public platform: Platform, public alertController: AlertController){
    storage.get('chartData').then((cData) => {
      if(cData == undefined) {
        this.chartData = {
          "Bird's Eye": {
            "data": [1, 2, 3, 4, 5, 6, 7]
          },
          "List Recall": {
            "data": [7, 6, 5, 4, 3, 2, 1]
          },
          "Split Focus": {
            "data": [3, 3, 3, 3, 3, 3, 3]
          },
          "Target Find": {
            "data": [0, 6, 1, 7, 3, 2, 8]
          }
        };
        storage.set('chartData', this.chartData);
      }
      else
        this.chartData = cData;
      this.setupChart();
    });

    storage.get('gameData').then((gData) => {
      if(gData == undefined) {
        this.gameData = {
          "Bird's Eye": {
            "highScore": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            "highestLevel": 1,
            "lastMilliPos": [8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
          },
          "List Recall": {
            "highScore": 0
          },
          "Split Focus": {
            "highScore": [0, 0, 0],
            "lastMilliPos":[8, 8, 8]
          },
          "Target Find": {
            "highScore": [0, 0, 0, 0],
            "lastTargetNum": [2, 2, 2, 2]
          }
        };
        storage.set('gameData', this.gameData);
      }
      else
        this.gameData = gData;
    });
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    //causes weird chart glitches
    // this.storage.get('chartData').then((cData) => {
    //   console.log(cData);
    //   console.log(this.chartData);
    //   if(this.chartData != cData) {
    //     this.chartData = cData;
    //     this.setupChart();
    //   }
    // });

    this.storage.get('gameData').then((gData) => {
      this.gameData = gData;
    });
  }

  setupChart() {
    for(let i = 0; i < this.games.length; i++) {
      try {
        this.chartDataArray[i] = this.chartData[this.games[i]].data;
      } catch(err) {
        this.chartDataArray[i] = [0, 0, 0, 0, 0, 0, 0];
      }
    }
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
            data: this.chartDataArray[0],
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
            data: this.chartDataArray[1],
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
            data: this.chartDataArray[2],
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
            data: this.chartDataArray[3],
            spanGaps: false
          }
        ]
      },
      options: {
          maintainAspectRatio: false,//was false
          animation:  false,
          scales: {
              yAxes: [{
                  ticks: {
                      min: 0,
                  }
              }]
          }
      }

    });
    document.getElementById('chartContainer').style.height = this.platform.height()*0.7 + 'px';
  }

  getHighScore(game: string) {
    try {
      return game + ': ' + this.gameData[game].highScore;
    } catch(err) {
      return game + ': ' + 0;
    }
  }

  toggleWeekly() { //no way to put these 2 into one function because dot notation doesn't accept variable evaluations
      if(this.weeklyArrow == 'assets/imgs/rightArrow.png') {
        this.weeklyArrow = 'assets/imgs/downArrow.png';
        document.getElementById('chartContainer').hidden = false;
      }
      else {
        this.weeklyArrow = 'assets/imgs/rightArrow.png';
        document.getElementById('chartContainer').hidden = true;
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
