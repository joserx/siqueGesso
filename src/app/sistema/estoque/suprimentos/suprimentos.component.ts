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

  public suprimentos: any = [
    { codigo: 1, name: 'Papel higiênico', custo: 10, quantidade: 200 },
    { codigo: 2, name: 'Papel higiênico', custo: 10, quantidade: 200 },
    { codigo: 3, name: 'Papel higiênico', custo: 10, quantidade: 200 },
    { codigo: 4, name: 'Papel higiênico', custo: 10, quantidade: 200 },
    { codigo: 5, name: 'Papel higiênico', custo: 10, quantidade: 200 },
  ];

  constructor(private suprimentoService: SuprimentoService) {}

  ngOnInit(): void {
    // this.getSuprimentos();
  }

  // getSuprimentos() {
  //   this.suprimentoService.find().subscribe((res) => {
  //     this.suprimentoService.suprimentos = res;
  //     this.suprimentos = res;
  //   });
  // }

  loadSuprimentoView(suprimento: any) {
    this.viewSuprimentoComponent.loadForm(suprimento);
  }
  loadSuprimentoEdit(suprimento: any) {
    this.editSuprimentoComponent.loadForm(suprimento);
  }
}
