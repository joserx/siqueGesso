import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-permissoes',
  templateUrl: './permissoes.component.html',
  styleUrls: ['./permissoes.component.scss']
})
export class PermissoesComponent implements OnInit {

  permissions: any =[ 
    {
      id: 1,
      name: 'Permissão 1'
    },
    {
      id: 2,
      name: 'Permissão 2'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

  filterBefore = "";

  filtrar(event : any) {
    let str = event.target.value;
    // if(str != '') {
    //   if(str.length > this.filterBefore.length) {
    //     this.usuarios = this.usuariosOriginal.filter((user : any) => `${user.name} ${user.surname}`.toUpperCase().includes(str.toUpperCase()))
    //     this.filterBefore = str
    //   } else {
    //     this.usuarios = this.usuariosOriginal;
    //     this.usuarios = this.usuariosOriginal.filter((user : any) => `${user.name} ${user.surname}`.toUpperCase().includes(str.toUpperCase()))
    //     this.filterBefore = str
    //   }
    // } else {
    //   this.usuarios = this.usuariosOriginal;
    // }
  }

  deleteUser(id : number) {
    alert(id)
  }

}
