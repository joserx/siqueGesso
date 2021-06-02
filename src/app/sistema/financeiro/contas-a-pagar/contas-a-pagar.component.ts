import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contas-a-pagar',
  templateUrl: './contas-a-pagar.component.html',
  styleUrls: ['./contas-a-pagar.component.scss']
})
export class ContasAPagarComponent implements OnInit {

  public contas: any = [
    { codigo: 1, descricao: "Aqui será uma breve descrição", fornecedor: "Fornecedor 1", pagamento: "???", data: "02/06/2021", total: 1000, situacao: "Em aberto", unidade: "Matriz" },
    { codigo: 2, descricao: "Aqui será uma breve descrição", fornecedor: "Fornecedor 1", pagamento: "???", data: "02/06/2021", total: 1000, situacao: "Em aberto", unidade: "Matriz" },
    { codigo: 3, descricao: "Aqui será uma breve descrição", fornecedor: "Fornecedor 1", pagamento: "???", data: "02/06/2021", total: 1000, situacao: "Em aberto", unidade: "Matriz" },
    { codigo: 4, descricao: "Aqui será uma breve descrição", fornecedor: "Fornecedor 1", pagamento: "???", data: "02/06/2021", total: 1000, situacao: "Em aberto", unidade: "Matriz" },
    { codigo: 5, descricao: "Aqui será uma breve descrição", fornecedor: "Fornecedor 1", pagamento: "???", data: "02/06/2021", total: 1000, situacao: "Em aberto", unidade: "Matriz" },
    { codigo: 6, descricao: "Aqui será uma breve descrição", fornecedor: "Fornecedor 1", pagamento: "???", data: "02/06/2021", total: 1000, situacao: "Em aberto", unidade: "Matriz" },
    { codigo: 7, descricao: "Aqui será uma breve descrição", fornecedor: "Fornecedor 1", pagamento: "???", data: "02/06/2021", total: 1000, situacao: "Em aberto", unidade: "Matriz" },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
