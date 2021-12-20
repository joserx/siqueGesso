import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileService } from 'src/app/services/file.service';
import { FilialService } from 'src/app/services/filial.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-loja',
  templateUrl: './cadastrar-loja.component.html',
  styleUrls: ['./cadastrar-loja.component.scss']
})
export class CadastrarLojaComponent implements OnInit {
  url: any;
  text = 'Adicionar banner';
  status = 'Salvar'
  anexesRepo = environment.apiUrl + 'file/download/'
  public avatarImg: string = './assets/sem-foto.jpg';
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
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    for(let control in this.filialForm['controls']){
      document.getElementById(control)?.addEventListener('click', ()=>{
        if(document.getElementById(control)?.classList.contains('invalid')){
          document.getElementById(control)?.classList.remove('invalid')
        }
      })
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
        this.router.navigate(['sistema', 'configuracoes', 'lojas-cadastradas', 'lista'])
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
