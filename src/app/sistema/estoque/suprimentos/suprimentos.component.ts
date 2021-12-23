import { Component, OnInit, ViewChild } from '@angular/core';
import { SuprimentoService } from 'src/app/services/suprimentos.service';
import { EditSuprimentoComponent } from './edit-suprimento/edit-suprimento.component';
import { ViewSuprimentoComponent } from './view-suprimento/view-suprimento.component';

@Component({
  selector: 'app-suprimentos',
  templateUrl: './suprimentos.component.html',
  styleUrls: ['./suprimentos.component.scss'],
})
export class SuprimentosComponent implements OnInit {
  // public suprimentos: any = [];

  @ViewChild(ViewSuprimentoComponent)
  viewSuprimentoComponent: any;

  @ViewChild(EditSuprimentoComponent)
  editSuprimentoComponent: any;

  public suprimentos: any;
  public suprimentosFiltrados: any;
  public search: string = '';

  constructor(private suprimentoService: SuprimentoService) {}

  ngOnInit(): void {
    this.getSuprimentos();
  }

  pesquisaProdutos() {
    if (this.search.length > 0)
      this.suprimentosFiltrados = this.suprimentos.filter((suprimentoF: any) =>
        suprimentoF.nome.includes(this.search)
      );
    else this.suprimentosFiltrados = this.suprimentos;
  }

  getSuprimentos() {
    this.suprimentoService.find().subscribe((res) => {
      this.suprimentoService.suprimentos = res;
      this.suprimentos = res;
      this.suprimentosFiltrados = this.suprimentos;
    });
  }

  loadSuprimentoView(suprimento: any) {
    this.viewSuprimentoComponent.loadForm(suprimento);
  }
  loadSuprimentoEdit(suprimento: any) {
    this.editSuprimentoComponent.loadForm(suprimento);
  }
}
