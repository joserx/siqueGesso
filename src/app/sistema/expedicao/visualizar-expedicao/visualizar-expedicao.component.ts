import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpedicaoService } from 'src/app/services/expedicao.service';

@Component({
  selector: 'app-visualizar-expedicao',
  templateUrl: './visualizar-expedicao.component.html',
  styleUrls: ['./visualizar-expedicao.component.scss']
})
export class VisualizarExpedicaoComponent implements OnInit {

  /* 
  ::::::::::::::::::::::::::::::
  ::-------form control-------::
  ::::::::::::::::::::::::::::::
  */

  public expedicaoForm: FormGroup = new FormGroup({
    "codigo": new FormControl('', [Validators.required]),
    "unidade": new FormControl('', [Validators.required]),
    "status": new FormControl('', [Validators.required]),
    "respSeparacao": new FormControl('', [Validators.required]),
    "respDespacho": new FormControl('', [Validators.required]),
    "emissao": new FormControl(null, [Validators.required]),
    "despacho": new FormControl(null),
    "cliente": new FormControl(''),
    "vendedor": new FormControl(''),
    "loja": new FormControl(''),
    "transportadora": new FormControl('teste teste', [Validators.required]),
    "motorista": new FormControl('', [Validators.required]),
    "placa": new FormControl('', [Validators.required]),
    "peso": new FormControl('', [Validators.required]),
    "observacoes": new FormControl('', [Validators.required]),
    "pedido": new FormControl('')
  })




  /* 
  ::::::::::::::::::::::::::::::
  ::-----------vars-----------::
  ::::::::::::::::::::::::::::::
  */

  public pedidos: any = [
    { codigo: "001", produto: "PLACA DE GESSO 10X10", qtd: "500", valor: "???", tipo: "Entrega", data: "09/06/2021", endereco: "SALGADO FILHO 2844"},
    { codigo: "002", produto: "PLACA DE GESSO 10X10", qtd: "100", valor: "???", tipo: "Entrega", data: "15/06/2021", endereco: "SALGADO FILHO 2844"},
    { codigo: "003", produto: "PLACA DE GESSO 10X10", qtd: "100", valor: "???", tipo: "Entrega", data: "09/06/2021", endereco: "SALGADO FILHO 2844"},
    { codigo: "004", produto: "PLACA DE GESSO 10X10", qtd: "250", valor: "???", tipo: "Retirada", data: "15/06/2021", endereco: "SALGADO FILHO 2844"},
  ];
  public ordens: any = []
  public exId: number



  /* 
  :::::::::::::::::::::::::::::
  ::-------constructor-------::
  :::::::::::::::::::::::::::::
  */


  constructor(
    private readonly expedicaoService: ExpedicaoService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap
    this.exId = Number(routeParams.get('id'))
    this.expedicaoService.findOne(this.exId).subscribe((data:any)=>{
      this.ordens = data

      /* Setting values */
      this.expedicaoForm.get('codigo')?.setValue(data.codigo)
      this.expedicaoForm.get('unidade')?.setValue(data.unidade)
      this.expedicaoForm.get('status')?.setValue(data.status)
      this.expedicaoForm.get('respSeparacao')?.setValue(data.respSeparacao)
      this.expedicaoForm.get('respDespacho')?.setValue(data.respDespacho)
      this.expedicaoForm.get('emissao')?.setValue(data.emissao.substring(10,0))
      this.expedicaoForm.get('despacho')?.setValue(data.despacho)
      this.expedicaoForm.get('transportadora')?.setValue(data.transportadora)
      this.expedicaoForm.get('motorista')?.setValue(data.motorista)
      this.expedicaoForm.get('placa')?.setValue(data.placa)
      this.expedicaoForm.get('peso')?.setValue(data.peso)
      this.expedicaoForm.get('observacoes')?.setValue(data.observacoes)
      this.expedicaoForm.get('pedido')?.setValue(data.pedido)
      this.expedicaoForm.get('cliente')?.setValue(data.cliente)
      this.expedicaoForm.get('vendedor')?.setValue(data.vendedor)
      this.expedicaoForm.get('loja')?.setValue(data.loja)
    })

  }

}
