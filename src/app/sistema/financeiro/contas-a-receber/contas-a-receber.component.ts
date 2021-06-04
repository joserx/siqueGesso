import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contas-a-receber',
  templateUrl: './contas-a-receber.component.html',
  styleUrls: ['./contas-a-receber.component.scss']
})
export class ContasAReceberComponent implements OnInit {

  public contas: any = [
    { codigo: 1, descricao: "Aqui será uma breve descrição", cliente: "cliente 1", pagamento: "???", data: "02/06/2021", total: 1000, situacao: "Em aberto", unidade: "Matriz" },
    { codigo: 2, descricao: "Aqui será uma breve descrição", cliente: "cliente 2", pagamento: "???", data: "02/06/2021", total: 1000, situacao: "Em aberto", unidade: "Matriz" },
    { codigo: 3, descricao: "Aqui será uma breve descrição", cliente: "cliente 3", pagamento: "???", data: "02/06/2021", total: 1000, situacao: "Em aberto", unidade: "Matriz" },
    { codigo: 4, descricao: "Aqui será uma breve descrição", cliente: "cliente 4", pagamento: "???", data: "02/06/2021", total: 1000, situacao: "Em aberto", unidade: "Matriz" },
    { codigo: 5, descricao: "Aqui será uma breve descrição", cliente: "cliente 5", pagamento: "???", data: "02/06/2021", total: 1000, situacao: "Em aberto", unidade: "Matriz" },
    { codigo: 6, descricao: "Aqui será uma breve descrição", cliente: "cliente 6", pagamento: "???", data: "02/06/2021", total: 1000, situacao: "Em aberto", unidade: "Matriz" },
    { codigo: 7, descricao: "Aqui será uma breve descrição", cliente: "cliente 7", pagamento: "???", data: "02/06/2021", total: 1000, situacao: "Em aberto", unidade: "Matriz" },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
