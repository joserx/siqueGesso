import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpedicaoService } from 'src/app/services/expedicao.service';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-criar-ordem-expedicao',
  templateUrl: './criar-ordem-expedicao.component.html',
  styleUrls: ['./criar-ordem-expedicao.component.scss']
})
export class CriarOrdemExpedicaoComponent implements OnInit {

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
    "pedido": new FormControl(''),
    "nPedido": new FormControl(null)
  })



  /* 
  ::::::::::::::::::::::::::::::
  ::-----------vars-----------::
  ::::::::::::::::::::::::::::::
  */

  public pedidosAntes: any = [
    { codigo: "001", produto: "PLACA DE GESSO 10X10", qtd: "500", valor: "???", tipo: "Entrega", data: "09/06/2021", endereco: "SALGADO FILHO 2844"},
    { codigo: "002", produto: "PLACA DE GESSO 10X10", qtd: "100", valor: "???", tipo: "Entrega", data: "15/06/2021", endereco: "SALGADO FILHO 2844"},
    { codigo: "003", produto: "PLACA DE GESSO 10X10", qtd: "100", valor: "???", tipo: "Entrega", data: "09/06/2021", endereco: "SALGADO FILHO 2844"},
    { codigo: "004", produto: "PLACA DE GESSO 10X10", qtd: "250", valor: "???", tipo: "Retirada", data: "15/06/2021", endereco: "SALGADO FILHO 2844"},
  ];



  /* 
  :::::::::::::::::::::::::::::
  ::-------constructor-------::
  :::::::::::::::::::::::::::::
  */

  constructor(
    private readonly expedicaoService: ExpedicaoService,
    private readonly router: Router
  ) { }



  /* 
  :::::::::::::::::::::::::::::
  ::---------methods---------::
  :::::::::::::::::::::::::::::
  */

  ngOnInit(): void {
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.expedicao_editar) == PermissionsUsers.expedicao_editar)){
      this.router.navigate(['sistema'])
    }
  }

  submitForm(data: any){
    if(data.valid){
      this.expedicaoService.create(data.value).subscribe((data: any)=>{
        this.router.navigate(['sistema', 'expedicao'])
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: '<h4>Ordem de expedição adicionado !</h4>',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          width: '500px',
        })
      })
    }else{
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: '<h4>Preecha todo o formulário !</h4>',
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        width: '500px',
      })
      console.log(data)
    }
  }

  selecionar(event: any){
    this.expedicaoForm.get('pedido')?.setValue(`PEDIDO ${event.numero} | ${event.data} | VENDEDOR ${event.vendedor}`)
    this.expedicaoForm.get('cliente')?.setValue(event.cliente)
    this.expedicaoForm.get('vendedor')?.setValue(event.vendedor)
    this.expedicaoForm.get('loja')?.setValue(event.loja)
    this.expedicaoForm.get('nPedido')?.setValue(event.numero)
  }

}
