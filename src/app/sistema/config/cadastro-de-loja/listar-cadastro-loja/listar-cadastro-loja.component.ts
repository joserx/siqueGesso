
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilialService } from 'src/app/services/filial.service';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-cadastro-loja',
  templateUrl: './listar-cadastro-loja.component.html',
  styleUrls: ['./listar-cadastro-loja.component.scss']
})
export class ListarCadastroLojaComponent implements OnInit {

  lojas: any[] = []
  lojasOriginais: any[] = []

  constructor(
    private readonly filialService: FilialService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.config_ver) == PermissionsUsers.config_ver)){
      this.router.navigate(['sistema'])
    }
    this.filialService.find().subscribe((data: any)=>{
      this.lojas = data
      this.lojasOriginais = data
    })
  }

  delete(id: number){
    Swal.fire({
      title: 'Você gostaria esta filial ?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Deletar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.filialService.delete(id).subscribe((data: any)=>{   
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: '<h4>Filial deletada !</h4>',
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            width: '500px'
          })
          this.filialService.find().subscribe((data: any)=>{
            this.lojas = data
          })
        })
      } else if (result.isDenied) {
        Swal.fire({
          position: 'top',
          icon: 'info',
          title: '<h4>Turno não deletada !</h4>',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          width: '500px'
        })
      }
    })
  }

  filterBefore = "";
  filtrar(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBefore.length) {
        this.lojas = this.lojasOriginais.filter((user : any) => `${user.id} ${user.nome} ${user.logradouro} ${user.numero} ${user.cidade}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      } else {
        this.lojas = this.lojasOriginais;
        this.lojas = this.lojasOriginais.filter((user : any) =>  `${user.id} ${user.nome} ${user.logradouro} ${user.numero} ${user.cidade}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      }
    } else {
      this.lojas = this.lojasOriginais;
    }
  }

  filterBeforeNome = "";
  filtrarNome(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBeforeNome.length) {
        this.lojas = this.lojasOriginais.filter((user : any) => `${user.nome}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforeNome = str
      } else {
        this.lojas = this.lojasOriginais;
        this.lojas = this.lojasOriginais.filter((user : any) =>  `${user.nome}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforeNome = str
      }
    } else {
      this.lojas = this.lojasOriginais;
    }
  }

  filterBeforeRua = "";
  filtrarRua(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBeforeRua.length) {
        this.lojas = this.lojasOriginais.filter((user : any) => `${user.logradouro}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforeRua = str
      } else {
        this.lojas = this.lojasOriginais;
        this.lojas = this.lojasOriginais.filter((user : any) =>  `${user.logradouro}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforeRua = str
      }
    } else {
      this.lojas = this.lojasOriginais;
    }
  }

  filterBeforeNumero = "";
  filtrarNumero(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBeforeNumero.length) {
        this.lojas = this.lojasOriginais.filter((user : any) => `${user.logradouro}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforeNumero= str
      } else {
        this.lojas = this.lojasOriginais;
        this.lojas = this.lojasOriginais.filter((user : any) =>  `${user.logradouro}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforeNumero= str
      }
    } else {
      this.lojas = this.lojasOriginais;
    }
  }

  filterBeforeCidade = "";
  filtrarCidade(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBeforeCidade.length) {
        this.lojas = this.lojasOriginais.filter((user : any) => `${user.logradouro}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforeCidade= str
      } else {
        this.lojas = this.lojasOriginais;
        this.lojas = this.lojasOriginais.filter((user : any) =>  `${user.logradouro}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforeCidade= str
      }
    } else {
      this.lojas = this.lojasOriginais;
    }
  }

}
