import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-loja',
  templateUrl: './cadastrar-loja.component.html',
  styleUrls: ['./cadastrar-loja.component.scss']
})
export class CadastrarLojaComponent implements OnInit {
  url: any;
  text = 'Adicionar banner';
  status = 'Salvar'

  constructor() { }

  ngOnInit(): void {
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
    }
  }

}
