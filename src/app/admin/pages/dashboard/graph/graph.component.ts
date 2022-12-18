import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import * as ApexCharts from 'apexcharts';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  isBrowser: boolean;


  constructor(
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    const options  = {
      series: [
        {
          name: 'Daily Sale',
          type: 'column',
          data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
        },
        {
          name: 'Daily Profit',
          type: 'line',
          data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
        }
      ],
      chart: {
        height: 380,
        width: '100%',
        type: 'line'
      },
      stroke: {
        width: [0, 3]
      },
      title: {
        text: 'Daily Sale and Profit'
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      labels: [
        '01 Jan 2021',
        '02 Jan 2021',
        '03 Jan 2021',
        '04 Jan 2021',
        '05 Jan 2021',
        '06 Jan 2021',
        '07 Jan 2021',
        '08 Jan 2021',
        '09 Jan 2021',
        '10 Jan 2021',
        '11 Jan 2021',
        '13 Jan 2021',
        '14 Jan 2021',
        '15 Jan 2021',
        '17 Jan 2021',
        '18 Jan 2021',
        '19 Jan 2021',
        '20 Jan 2021',
        '21 Jan 2021',
        '22 Jan 2021',
        '23 Jan 2021',
        '24 Jan 2021',
        '25 Jan 2021',
        '26 Jan 2021',
        '27 Jan 2021',
        '28 Jan 2021',
        '29 Jan 2021',
        '30 Jan 2021',
      ],
      xaxis: {
        type: 'datetime'
      },
      yaxis: [
        {
          title: {
            text: 'Sale'
          }
        },
        {
          opposite: true,
          title: {
            text: 'Profit'
          }
        }
      ]
    };

    // const options = {
    //   series: [{
    //     name: 'Inflation',
    //     data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
    //   }],
    //   chart: {
    //     height: 350,
    //     type: 'bar',
    //   },
    //   plotOptions: {
    //     bar: {
    //       borderRadius: 10,
    //       dataLabels: {
    //         position: 'top', // top, center, bottom
    //       },
    //     }
    //   },
    //   dataLabels: {
    //     enabled: true,
    //     formatter: val => val + '%',
    //     offsetY: -20,
    //     style: {
    //       fontSize: '12px',
    //       colors: ['#304758']
    //     }
    //   },
    //
    //   xaxis: {
    //     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    //     position: 'top',
    //     axisBorder: {
    //       show: false
    //     },
    //     axisTicks: {
    //       show: false
    //     },
    //     crosshairs: {
    //       fill: {
    //         type: 'gradient',
    //         gradient: {
    //           colorFrom: '#D8E3F0',
    //           colorTo: '#BED1E6',
    //           stops: [0, 100],
    //           opacityFrom: 0.4,
    //           opacityTo: 0.5,
    //         }
    //       }
    //     },
    //     tooltip: {
    //       enabled: true,
    //     }
    //   },
    //   yaxis: {
    //     axisBorder: {
    //       show: false
    //     },
    //     axisTicks: {
    //       show: false,
    //     },
    //     labels: {
    //       show: false,
    //       formatter: val => val + '%'
    //     }
    //
    //   },
    //   title: {
    //     text: 'Monthly Inflation in Argentina, 2002',
    //     floating: true,
    //     offsetY: 330,
    //     align: 'center',
    //     style: {
    //       color: '#444'
    //     }
    //   }
    // };


    if (this.isBrowser) {
      const chart = new ApexCharts(document.querySelector('#chart'), options);
      chart.render();
    }
  }

}
