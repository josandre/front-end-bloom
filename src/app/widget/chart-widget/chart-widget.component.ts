import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill,
  ApexStroke,
  ApexLegend,
  ApexPlotOptions,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexGrid,
  ApexMarkers,
} from 'ng-apexcharts';
export type circleChartOptions = {
  series?: ApexNonAxisChartSeries;
  chart?: ApexChart;
  labels?: string[];
  colors?: string[];
  legend?: ApexLegend;
  plotOptions?: ApexPlotOptions;
  responsive: ApexResponsive[];
};
export type radarChartOptions = {
  series?: ApexAxisChartSeries;
  chart?: ApexChart;
  title?: ApexTitleSubtitle;
  stroke?: ApexStroke;
  fill?: ApexFill;
  markers?: ApexMarkers;
  xaxis?: ApexXAxis;
};
export type areaChartOptions = {
  series?: ApexAxisChartSeries;
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  stroke?: ApexStroke;
  grid?: ApexGrid;
  tooltip?: ApexTooltip;
  legend?: ApexLegend;
  dataLabels?: ApexDataLabels;
};
export type pieChartOptions = {
  series?: ApexNonAxisChartSeries;
  chart?: ApexChart;
  legend?: ApexLegend;
  dataLabels?: ApexDataLabels;
  responsive?: ApexResponsive[];
  labels?: string[];
};
export type avgLecChartOptions = {
  series?: ApexAxisChartSeries;
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  stroke?: ApexStroke;
  dataLabels?: ApexDataLabels;
  markers?: ApexMarkers;
  colors?: string[];
  yaxis?: ApexYAxis;
  grid?: ApexGrid;
  tooltip?: ApexTooltip;
  legend?: ApexLegend;
  fill?: ApexFill;
  title?: ApexTitleSubtitle;
};
@Component({
  selector: 'app-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.scss'],
})
export class ChartWidgetComponent {
  public radarChartOptions: Partial<radarChartOptions>;
  public circleChartOptions: Partial<circleChartOptions>;
  public areaChartOptions: Partial<areaChartOptions>;
  public pieChartOptions: Partial<pieChartOptions>;
  public avgLecChartOptions: Partial<avgLecChartOptions>;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    //radar Chart
    this.radarChartOptions = {
      series: [
        {
          name: 'Blue',
          data: [80, 50, 30, 40, 100, 20],
        },
        {
          name: 'Green',
          data: [20, 30, 40, 80, 20, 80],
        },
        {
          name: 'Orange',
          data: [44, 76, 78, 13, 43, 10],
        },
      ],
      chart: {
        height: 240,
        type: 'radar',
        toolbar: {
          show: false,
        },
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1,
        },
      },
      stroke: {
        width: 0,
      },
      fill: {
        opacity: 0.4,
      },
      markers: {
        size: 0,
      },
      xaxis: {
        categories: ['2011', '2012', '2013', '2014', '2015', '2016'],
      },
    };

    // pie chart

    this.circleChartOptions = {
      series: [76, 67, 61, 90],
      chart: {
        height: 275,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: '30%',
            background: 'transparent',
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
        },
      },
      colors: ['#FF4560', '#775DD0', '#00E396', '#FEB019'],
      labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
      legend: {
        show: true,
        floating: true,
        fontSize: '12px',
        position: 'left',
        offsetX: 10,
        offsetY: 10,
        labels: {
          useSeriesColors: true,
        },
        itemMargin: {
          horizontal: 3,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false,
            },
          },
        },
      ],
    };

    // area chart

    this.areaChartOptions = {
      chart: {
        height: 240,
        type: 'area',
        toolbar: {
          show: false,
        },
        foreColor: '#9aa0ac',
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      series: [
        {
          name: 'series1',
          data: [31, 40, 28, 51, 42],
        },
        {
          name: 'series2',
          data: [11, 32, 45, 32, 34],
        },
      ],
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      xaxis: {
        type: 'datetime',
        categories: ['1990', '1991', '1992', '1993', '1994'],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    };

    // pie chart

    this.pieChartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: 'donut',
        width: 200,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      labels: ['Science', 'Mathes', 'Economics', 'History', 'Music'],
      responsive: [
        {
          breakpoint: 480,
          options: {},
        },
      ],
    };

    //avgLecChartOptions

    this.avgLecChartOptions = {
      series: [
        {
          name: 'Avg. Lecture',
          data: [65, 72, 62, 73, 66, 74, 63, 67],
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
        foreColor: '#9aa0ac',
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'July', 'Aug'],
        title: {
          text: 'Weekday',
        },
      },
      yaxis: {
        title: {
          text: 'Avg. Lecture',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#35fdd8'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      markers: {
        size: 4,
        colors: ['#FFA41B'],
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: {
          size: 7,
        },
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }
  @ViewChild('chart', { static: true }) chart!: ChartComponent;
}
