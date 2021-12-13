import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BrazilValidator } from 'src/app/_helpers/brasil';

@Component({
  selector: 'app-view-pedido',
  templateUrl: './view-pedido.component.html',
  styleUrls: ['./view-pedido.component.scss'],
})
export class ViewPedidoComponent implements OnInit {
  pedidoCompraForm: FormGroup = new FormGroup({
    data: new FormControl({ value: '', disabled: true }, Validators.required),
    fornecedor: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    razaoSocial: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    cnpj: new FormControl({ value: '', disabled: true }, Validators.required),
    cep: new FormControl({ value: '', disabled: true }, Validators.required),
    endereco: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    complemento: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    subtotal: new FormControl(
      { value: false, disabled: true },
      Validators.required
    ),
    desconto: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    frete: new FormControl({ value: '', disabled: true }, Validators.required),
    encargos: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    valorTotal: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    condPagamento: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    dataVenc: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    meioPag: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    obs: new FormControl({ value: '', disabled: true }, Validators.required),
  });

  constructor() {}

  ngOnInit(): void {}
}

// loadPedido(pedidoInput:any){
//   this.pedidoForm = new FormGroup({
//     data: new FormControl({ value: pedidoInput.data, disabled: true }, Validators.required),

//   })
// }
