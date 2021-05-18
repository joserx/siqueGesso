import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.scss']
})
export class EstoqueComponent implements OnInit {

  public estoqueSection: string = 'fornecedores';

  constructor() { }

  ngOnInit(): void {
  }
  
  public toggleEstoqueSection(value: string): void {
    this.estoqueSection = value;
  }

}
