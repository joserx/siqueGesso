import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { CorreiosService } from 'src/app/services/correios.service';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';
import { BrazilValidator } from 'src/app/_helpers/brasil';
import { getDate } from 'src/environments/global';

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.scss']
})
export class CadastrarClienteComponent implements OnInit {

  constructor (
    private router: Router
  ) {}

  ngOnInit(): void{
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.vendas_editar) == PermissionsUsers.vendas_editar)){
      this.router.navigate(['sistema'])
    }
  }

}
