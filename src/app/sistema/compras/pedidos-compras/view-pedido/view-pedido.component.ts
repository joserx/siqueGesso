import { Component, OnInit, Input } from '@angular/core';
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
      { value: '', disabled: true },
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
    status: new FormControl({ value: '', disabled: true }, Validators.required),
    obs: new FormControl({ value: '', disabled: true }, Validators.required),
  });

  @Input() pedido: any;

  constructor() {}

  ngOnInit(): void {
  }

  loadForm(pedidoInput: any) {
    this.pedidoCompraForm = new FormGroup({
      data: new FormControl(
        { value: pedidoInput.data, disabled: true },
        Validators.required
      ),
      fornecedor: new FormControl(
        { value: pedidoInput.fornecedor, disabled: true },
        Validators.required
      ),
      razaoSocial: new FormControl(
        { value: pedidoInput.razaoSocial, disabled: true },
        Validators.required
      ),
      cnpj: new FormControl(
        { value: pedidoInput.cnpj, disabled: true },
        Validators.required
      ),
      cep: new FormControl(
        { value: pedidoInput.cep, disabled: true },
        Validators.required
      ),
      endereco: new FormControl(
        { value: pedidoInput.endereco, disabled: true },
        Validators.required
      ),
      complemento: new FormControl(
        { value: pedidoInput.complemento, disabled: true },
        Validators.required
      ),
      subtotal: new FormControl(
        { value: pedidoInput.subtotal, disabled: true },
        Validators.required
      ),
      desconto: new FormControl(
        { value: pedidoInput.desconto, disabled: true },
        Validators.required
      ),
      frete: new FormControl(
        { value: pedidoInput.frete, disabled: true },
        Validators.required
      ),
      encargos: new FormControl(
        { value: pedidoInput.encargos, disabled: true },
        Validators.required
      ),
      valorTotal: new FormControl(
        { value: pedidoInput.valorTotal, disabled: true },
        Validators.required
      ),
      condPagamento: new FormControl(
        { value: pedidoInput.condPagamento, disabled: true },
        Validators.required
      ),
      dataVenc: new FormControl(
        { value: pedidoInput.dataVenc, disabled: true },
        Validators.required
      ),
      meioPag: new FormControl(
        { value: pedidoInput.meioPag, disabled: true },
        Validators.required
      ),
      status: new FormControl(
        { value: pedidoInput.meioPag, disabled: true },
        Validators.required
      ),
      obs: new FormControl(
        { value: pedidoInput.obs, disabled: true },
        Validators.required
      ),
    });
  }
}
