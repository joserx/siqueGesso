import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.scss']
})
export class EstoqueComponent implements OnInit {

  public estoqueSection: string = 'fornecedores';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.estoque_ver) == PermissionsUsers.estoque_ver)){
      this.router.navigate(['sistema'])
    }
  }
  
  public toggleEstoqueSection(value: string): void {
    this.estoqueSection = value;
  }

}
