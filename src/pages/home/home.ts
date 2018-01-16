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

  d = new Date();
  day;
  lastMilli;
  week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  chartData;
  chartDataArray = new Array(4);
  gameData;

  constructor(public navCtrl: NavController, public storage: Storage, public platform: Platform, public alertController: AlertController){
    storage.get('chartData').then((cData) => {
      if(cData == undefined) {
        this.chartData = {
          "Bird's Eye": {
            "data": [0, 0, 0, 0, 0, 0, 0]
          },
          "List Recall": {
            "data": [0, 0, 0, 0, 0, 0, 0]
          },
          "Split Focus": {
            "data": [0, 0, 0, 0, 0, 0, 0]
          },
          "Target Find": {
            "data": [0, 0, 0, 0, 0, 0, 0]
          },
          "Day": 0,
          "Day Label": ["Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday", "Sunday"]
        };
        //storage.set('chartData', this.chartData);
        this.lastMilli = this.d.getTime();
      }
      console.log('constructor chartData day label' + this.chartData['Day Label']);
      storage.set('chartData', this.chartData).then(() => {
        this.updateChart();
      });
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
    this.updateChart();

    this.storage.get('gameData').then((gData) => {
      this.gameData = gData;
    });
  }

  setupChart() {
    console.log('started setup');
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
        labels: this.week,
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
                      stepSize: 1,
                  }
              }]
          }
      }

    });
    document.getElementById('chartContainer').style.height = this.platform.height()*0.7 + 'px';
  }

  updateChart() {
    this.day = this.d.getDay();
    this.storage.get('chartData').then((cData) => {
      console.log('cData' + cData);
      let end = this.games.length;
      this.chartData = cData;
      for(let i = 0; i < 7; i++) {
        this.week[i] = cData['Day Label'][(i+this.day)%7];
      }
      if(this.d.getTime() - this.lastMilli >= 604800000){ //over one week has elapsed since last time opened
        console.log('over a week passed');
        for(let i = 0; i < end; i++) {
          this.chartData[this.games[i]] = [0, 0, 0, 0, 0, 0, 0];
        }
      }
      else {
        if(this.day != cData['Day']) {
          console.log('not the same day')
          let dayDifference = this.day - cData['Day']; //days since last opened
          console.log(dayDifference);
          if(dayDifference < 0)
            dayDifference+=7;
          this.chartData['Day'] = this.day;
          for(let i = 0; i < end; i++) {
              for(let j = 0; j < 7-dayDifference; j++) {
                console.log('goes through loop' + this.chartData[this.games[i]].data[j] + ' ' + this.chartData[this.games[i]].data[j]);
                  this.chartData[this.games[i]].data[j] = cData[this.games[i]].data[j+dayDifference];
              }
              for(let j = 7-dayDifference; j < 7; j++) {
                this.chartData[this.games[i]].data[j] = 0;
              }
          }
        }
      }
      this.lastMilli = this.d.getTime();
      console.log('got here' + this.chartData[this.games[2]]);
      this.storage.set('chartData', this.chartData);
      this.setupChart();
    });
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
