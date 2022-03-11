import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PermissionsService } from 'src/app/services/permissions.service';

@Component({
  selector: 'app-permissoes',
  templateUrl: './permissoes.component.html',
  styleUrls: ['./permissoes.component.scss']
})
export class PermissoesComponent implements OnInit, OnChanges {

  permissions: any = []
  constructor(
    private readonly permissionService: PermissionsService
  ) { }

  ngOnInit(): void {
    this.permissionService.find().subscribe((data:any)=>{
      this.permissions = data
    })
  }

  ngOnChanges(changes: SimpleChanges): void{
    this.permissions = changes.permissions.currentValue
    console.log(this.permissions)
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

  delete(id:number){
    this.permissionService.delete(id).subscribe(()=>{
      this.permissionService.find().subscribe((data:any)=>{
        this.permissions = data
      })
    })
  }

}
