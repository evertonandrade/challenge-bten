import { Component, OnInit } from '@angular/core';
import { Color, Label } from 'ng2-charts';
import { Chart, ChartDataSets, ChartType } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  lineChartData: ChartDataSets[] = [
    {
      data: Array.from({ length: 22 }, (_, i) => i * Math.random() * 5),
      label: 'XPTO',
    },
  ];

  lineChartLabels: Label[] = Array.from({ length: 22 }, (_, i) => `${i + 1}`);

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'gray',
      backgroundColor: 'rgba(0, 121, 137, 0.3)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
}
