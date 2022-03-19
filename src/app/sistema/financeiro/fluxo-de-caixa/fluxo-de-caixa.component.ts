import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import { ContasPagarService } from 'src/app/services/contas-pagar.service';
import { ContasReceberService } from 'src/app/services/contas-receber.service';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';

@Component({
  selector: 'app-fluxo-de-caixa',
  templateUrl: './fluxo-de-caixa.component.html',
  styleUrls: ['./fluxo-de-caixa.component.scss'],
})
export class FluxoDeCaixaComponent implements OnInit {
  recebimentos: any = [];
  contas: any = [];

  totalContas: number = 0;
  totalRecebimentos: number = 0;

  public valor: any;

  constructor(
    private contasPagarService: ContasPagarService,
    private contasReceberService: ContasReceberService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.financeiro_ver) == PermissionsUsers.financeiro_ver)){
      this.router.navigate(['sistema'])
    }
    this.totalFluxo();
  }

  async getContas() {
    const res = await this.contasPagarService.findPromise();
    this.contasPagarService.contas = res;
    this.contas = res;
    this.totalContas = res.reduce(
      (acc: any, curr: any) => acc + parseFloat(curr.valorTotal),
      0
    );
  }

  async getRecebimentos() {
    const res = await this.contasReceberService.findPromise();
    this.contasReceberService.contas = res;
    this.recebimentos = res;
    this.totalRecebimentos = res.reduce(
      (acc: any, curr: any) => acc + parseFloat(curr.valorTotal),
      0
    );
  }

  async totalFluxo() {
    await Promise.all([this.getContas(), this.getRecebimentos()]);
    this.valor = this.totalRecebimentos - this.totalContas;
  }
}
