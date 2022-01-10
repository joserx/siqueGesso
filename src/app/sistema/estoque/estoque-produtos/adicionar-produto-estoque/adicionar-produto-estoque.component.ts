import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../../../../services/produto.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { FornecedorService } from 'src/app/services/fornecedores.service';

@Component({
  selector: 'app-adicionar-produto-estoque',
  templateUrl: './adicionar-produto-estoque.component.html',
  styleUrls: ['./adicionar-produto-estoque.component.scss'],
})
export class AdicionarProdutoEstoqueComponent implements OnInit {
  fornecedores: any[] = [];
  public produtos: any = [];

  public produtosFiltrados: any = [];
  produtoId: number;

  produtoAddForm = new FormGroup({
    atual: new FormControl(''),
  });
  @ViewChild('close') closeBtn: any;
  @Output() reload = new EventEmitter();

  constructor(
    private produtoService: ProdutoService,
    private fornecedorService: FornecedorService
  ) {}

  ngOnInit(): void {
    this.getProdutos();
    this.fornecedorService.find().subscribe((data: any) => {
      this.fornecedores = data;
    });
  }
  getProdutos() {
    this.produtoService.find().subscribe((res) => {
      this.produtoService.produtos = res;
      this.produtos = res;
      this.produtosFiltrados = this.produtos;
    });
  }

  save(): void | Promise<SweetAlertResult<any>> {
    console.log(this.produtoAddForm.value);

    if (this.produtoAddForm.invalid)
      return Swal.fire({
        title: 'Preencha todos os campos obrigatórios!',
        icon: 'error',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

    const produtos = this.produtos.map(({ id, novoEstoque, atual }: any) => {
      return { id, atual: Number(novoEstoque) + Number(atual) };
    });

    this.produtoService
      .addEstoque(produtos)

      .subscribe(() => {
        return Swal.fire({
          title: 'Estoque Atualizado',
          icon: 'success',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        }).finally(() => {
          this.reload.emit();
          this.closeBtn.nativeElement.click();
        });
      });
  }
}
