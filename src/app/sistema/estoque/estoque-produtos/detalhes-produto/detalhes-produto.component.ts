import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.scss'],
})
export class DetalhesProdutoComponent implements OnInit {
  public produtos: any = [];
  produtoEditForm = new FormGroup({
    data: new FormControl('', Validators.required),
    fornecedor: new FormControl('', Validators.required),
    precoMedio: new FormControl('', Validators.required),
    atual: new FormControl('', Validators.required),
    custoMedio: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
  });

  constructor() {}

  ngOnInit(): void {}
}
