import { Component, OnInit } from '@angular/core';
import { FornecedorService } from 'src/app/services/fornecedores.service';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.scss']
})
export class FornecedoresComponent implements OnInit {

  public fornecedores: any = []

  constructor(
    private fornecedorService: FornecedorService
  ) { }

  ngOnInit(): void {
    this.fornecedorService.find().subscribe(res => {
      this.fornecedores = res
    })
  }

}
