import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill,
  ApexGrid,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";

// export type ChartOptions = {
//   series: ApexAxisChartSeries;
//   chart: ApexChart;
//   xaxis: ApexXAxis;
//   stroke: ApexStroke;
//   tooltip: ApexTooltip;
//   dataLabels: ApexDataLabels;
// };



@Component({
  selector: 'app-sp-ad-analysis-one',
  templateUrl: './sp-add-analysis-one.component.html',
  styleUrls: ['./sp-add-analysis-one.component.scss']
})
export class SpAdAnalysisOneComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  series: ApexAxisChartSeries = [
    {
      name: "Inflation",
      data: [0, 5, 8, 8, 8, 8, 8, 8, 7, 1, 4, 10, 10, 6, 2, 1, 1, 1, 1, 3, 3, 2, 1.2, 1, 1, 1, 2.2, 2, 2.1, 2.12, 2.4, 2]
    }
  ]
  chart: ApexChart = {
    height: 250,
    type: "bar",
    zoom: {
      enabled: false
    }
  }

  plotOptions: ApexPlotOptions = {
    bar: {
      dataLabels: {
        position: "top" // top, center, bottom
      }
    }
  }

  dataLabels: ApexDataLabels = {
    enabled: false,
    offsetY: -20,
    style: {
      fontSize: "12px",
      colors: ["#304758"]
    }
  }

  xaxis: ApexXAxis = {
    categories: [
      "Feb 11",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "Feb 16",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "Feb 25",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "Mar 04",
    ],
    position: "bottom",
    tickPlacement: 'between',
    labels: {
      show: true,
      rotate: 0,
      rotateAlways: false,
      hideOverlappingLabels: true,
      showDuplicates: false,
      trim: false,
      minHeight: undefined,
      maxHeight: 120,
      style: {
        colors: ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"],
        cssClass: 'apexcharts-xaxis-label'
        // fontSize: '12px',
        // fontFamily: 'Helvetica, Arial, sans-serif',
        // fontWeight: 400,
        // cssClass: 'apexcharts-xaxis-label',
      },
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    crosshairs: {
      fill: {
        type: "gradient",
        gradient: {
          colorFrom: "#D8E3F0",
          colorTo: "#BED1E6",
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5
        }
      }
    },
    tooltip: {
      enabled: true,
      offsetY: -35
    }
  }

  fill: ApexFill = {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "horizontal",
      shadeIntensity: 0.25,
      gradientToColors: undefined,
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      // stops: [50, 0, 100, 100]
    }
  }

  yaxis: ApexYAxis = {
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    labels: {
      show: false,
      // formatter: function(val) {
      //   return val + "%";
      // }
    }
  }

  title: ApexTitleSubtitle = {
    text: "",
    // floating: 0,
    offsetY: 320,
    align: "left",
    style: {
      color: "#444"
    }
  }
  grid: ApexGrid = {
    row: {
      colors: ["transparent", "transparent"],
      opacity: 0.5
    }
  }



  seriesTwo: ApexAxisChartSeries = [
    {
      name: "series1",
      data: [0, 40, 50, 0, 45, 60, 0, 0, 30, 55, 0]


    },
    {
      name: "series2",
      data: [100, 0, 0, 70, 50, 0, 0, 15, 10, 25, 5]

    }
  ]
  chartTwo: ApexChart = {
    height: 250,
    type: "area",
    zoom: {
      enabled: false
    }
  }
  dataLabelsTwo: ApexDataLabels = {
    enabled: false
  }
  strokeTwo: ApexStroke = {
    curve: "smooth",
    width: [3, 0],
    colors: ["#0591FB", "transparent"]
  }
  xaxisTwo: ApexXAxis = {
    
    categories: [
      "Feb 11",
      "",
      "Feb 16",
      " ",
      "Feb 25",
      "",
      "Mar 04",
      "",
      "",
      "",
      "",
    ],
    position: "bottom",
    labels: {
      show: true,
      rotate: 0,
      rotateAlways: false,
      hideOverlappingLabels: true,
      showDuplicates: false,
      trim: false,
      minHeight: undefined,
      maxHeight: 120,
      style: {
        colors: ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"],
        cssClass: 'apexcharts-xaxis-label'
      },
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    crosshairs: {
      fill: {
        type: "gradient",
        gradient: {
          colorFrom: "#D8E3F0",
          colorTo: "#BED1E6",
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5
        }
      }
    },
    tooltip: {
      enabled: true,
      offsetY: -35
    }
  }
  tooltipTwo: ApexTooltip = {
    x: {
      format: "dd/MM/yy HH:mm"
    }
  }



}
