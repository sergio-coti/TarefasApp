import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  //atributos / variáveis
  graficoColunas : Chart = new Chart();
  graficoLinhas : Chart = new Chart();
  graficoDonut : Chart = new Chart();
  graficoBarras : Chart = new Chart();

  ngOnInit(): void {
    
    //dados dos gráficos
    const dados = [
      ['Exemplo 1', 100],
      ['Exemplo 2', 150],
      ['Exemplo 3', 50],
      ['Exemplo 4', 250],
    ];

    //nomes usados nos gráficos
    const nomes = ['Exemplo 1', 'Exemplo 2', 'Exemplo 3', 'Exemplo 4'];

    //executar as funções para criação dos gráficos
    this.criarGraficoColunas(dados, nomes);
    this.criarGraficoLinhas(dados, nomes);
    this.criarGraficoDonut(dados, nomes);
    this.criarGraficoBarras(dados, nomes);
  }

  //função para desenhar o gráfico de colunas
  criarGraficoColunas(dados: any[], nomes: any[]): void {
    this.graficoColunas = new Chart({
      chart: { type : 'column' },
      title: { text : 'Resumo de tarefas por tipo.' },
      subtitle: { text : 'Quantidade de tarefas por tipo selecionado.' },
      series: [ { data: dados, type: undefined as any } ],
      xAxis: { categories : nomes },
      legend: { enabled : false },
      credits: { enabled : false }
    });
  }

  //função para desenhar o gráfico de colunas
  criarGraficoLinhas(dados: any[], nomes: any[]): void {
    this.graficoLinhas = new Chart({
      chart: { type : 'line' },
      title: { text : 'Resumo de tarefas por período.' },
      subtitle: { text : 'Quantidade de tarefas cadastradas por período.' },
      series: [ { data: dados, type: undefined as any } ],
      xAxis: { categories : nomes },
      legend: { enabled : false },
      credits: { enabled : false }
    });
  }

  //função para desenhar o gráfico de colunas
  criarGraficoDonut(dados: any[], nomes: any[]): void {
    this.graficoDonut = new Chart({
      chart: { type : 'pie' },
      title: { text : 'Resumo de tarefas por prioridade.' },
      subtitle: { text : 'Quantidade de tarefas cadastradas por prioridade.' },
      plotOptions: {
        pie: {
          innerSize: '50%',
          allowPointSelect: true,
          cursor: 'pointer',
        }
      },
      series: [ { data: dados, type: undefined as any } ],
      legend: { enabled : false },
      credits: { enabled : false }
    });
  }

  //função para desenhar o gráfico de colunas
  criarGraficoBarras(dados: any[], nomes: any[]): void {
    this.graficoBarras = new Chart({
      chart: { type : 'bar' },
      title: { text : 'Resumo de tarefas por categoria.' },
      subtitle: { text : 'Quantidade de tarefas cadastradas por categoria.' },
      series: [ { data: dados, type: undefined as any } ],
      xAxis: { categories : nomes },
      legend: { enabled : false },
      credits: { enabled : false }
    });
  }  
}
