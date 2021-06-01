import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.scss']
})
export class FinanceiroComponent implements OnInit {

  public activeSection: string = 'pagar';

  constructor() { }

  ngOnInit(): void {
  }
  
  public toggleActiveSection(value: string): void {
    this.activeSection = value;
  }
}
