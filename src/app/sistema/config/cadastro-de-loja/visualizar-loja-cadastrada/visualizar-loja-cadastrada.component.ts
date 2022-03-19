import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FileService } from 'src/app/services/file.service';
import { FilialService } from 'src/app/services/filial.service';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-visualizar-loja-cadastrada',
  templateUrl: './visualizar-loja-cadastrada.component.html',
  styleUrls: ['./visualizar-loja-cadastrada.component.scss']
})
export class VisualizarLojaCadastradaComponent implements OnInit {
  url: any;
  text = 'Adicionar banner';
  status = 'Salvar'
  anexesRepo = environment.apiUrl + 'file/download/'
  public avatarImg: string = './assets/sem-foto.jpg';
  public id: number
  avatarFile: any = {};
  public filialForm: FormGroup = new FormGroup({
    'nome': new FormControl('', [Validators.required]),
    'cnpj': new FormControl(''),
    'logradouro': new FormControl('', [Validators.required]),
    'cep': new FormControl('', [Validators.required]),
    'numero': new FormControl(null, [Validators.required]),
    'cidade': new FormControl('', [Validators.required]),
    'pais': new FormControl('', [Validators.required]),
    'capacidade': new FormControl(null, [Validators.required])
  })

  constructor(
    private readonly filialService: FilialService,
    private readonly fileService: FileService,
    private readonly router : Router,
    private readonly route : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('id'));  
    this.filialService.findOne(this.id).subscribe((data: any)=>{
      let imgDefault = document.querySelector('.upload__image--img') as HTMLImageElement;
      if(data.banner){
        imgDefault.src = environment.apiUrl + 'file/download/' + data.banner.fileName
      }
      this.filialForm.get('nome')?.setValue(data.nome)
      this.filialForm.get('cnpj')?.setValue(data.cnpj)
      this.filialForm.get('logradouro')?.setValue(data.logradouro)
      this.filialForm.get('cep')?.setValue(data.cep)
      this.filialForm.get('numero')?.setValue(data.numero)
      this.filialForm.get('cidade')?.setValue(data.cidade)
      this.filialForm.get('pais')?.setValue(data.pais)
      this.filialForm.get('capacidade')?.setValue(data.capacidade)
    })
    for(let control in this.filialForm['controls']){
      document.getElementById(control)?.addEventListener('click', ()=>{
        if(document.getElementById(control)?.classList.contains('invalid')){
          document.getElementById(control)?.classList.remove('invalid')
        }
      })
    }
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.config_ver) == PermissionsUsers.config_ver)){
      this.router.navigate(['sistema'])
    }
  }

  uploadImage(event: any) {
    let label = event.target.closest('.upload__image');
    let imgDefault = label.querySelector('.upload__image--img') as HTMLImageElement;
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.url = reader.result; 
        imgDefault.src = this.url;
        this.text = 'Alterar imagem'
      };
      this.fileService.create(file).subscribe((data: any)=>{
        this.avatarFile = data
      })
    }
  }

  submitForm(data: any){
    if(data.valid){
      data.value.banner = this.avatarFile.id
      this.filialService.create(data.value).subscribe((data: any)=>{
        console.log(data)
        Swal.fire({ 
          title: '<h4>Filial cadastrada com sucesso!</h4>', 
          icon: 'success', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true,
          width: '500px'
        })
      })
    }else{
      for(let control in this.filialForm['controls']){
        if(this.filialForm['controls'][control].status === "INVALID"){
          document.getElementById(control)?.classList.add("invalid")
        }
      }
      Swal.fire({ 
        title: '<h4>Preencha os campos necessários!</h4>', 
        icon: 'error', 
        toast: true, 
        position: 'top', 
        showConfirmButton: false, 
        timer: 2000, 
        timerProgressBar: true,
        width: '500px'
      })
    }
  }
}
