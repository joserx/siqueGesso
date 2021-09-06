import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FilialService } from 'src/app/services/filial.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-filial',
  templateUrl: './add-filial.component.html',
  styleUrls: ['./add-filial.component.scss']
})
export class AddFilialComponent implements OnInit {
  @Output()
  closeModal= new EventEmitter();
  filiais: any[] = []

  public filialForm: FormGroup = new FormGroup({
    'nome': new FormControl('', [Validators.required])
  })

  constructor(
    private readonly filialService: FilialService,
    private readonly route : ActivatedRoute,
    private readonly router : Router,
  ) { }

  ngOnInit(): void {
    this.filialService.find().subscribe((res: any)=>{
      this.filiais = res
      console.log(this.filiais)
    })
  }

  addFilial(data: any){
    if(this.filialForm.invalid){
      alert('Preencha algum campo')
    }else{
      console.log(data)
      this.filialService.create(data).subscribe((res: any)=>{
        alert('Filial salva com sucesso')
        this.closeModal.emit()
        
      }, (err) => {
        console.log(err)
      })
    }
  }

}

