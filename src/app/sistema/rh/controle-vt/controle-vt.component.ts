import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { $ } from 'protractor';
import { Subscriber } from 'rxjs';
import { RhService } from 'src/app/services/rh.service';
import { VtService } from 'src/app/services/vt.service';
import Swal from 'sweetalert2';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-controle-vt',
  templateUrl: './controle-vt.component.html',
  styleUrls: ['./controle-vt.component.scss']
})
export class ControleVtComponent implements OnInit {
  calc: any
  colabOriginal: any
  public colabVt: any[] = []
  public colab: any[] = []
  public vtForm: FormGroup = new FormGroup({
    'vt': new FormArray([])
  })
  constructor(
    private rhService: RhService,
    private vtService: VtService
  ) { }

  get vt(){
    return this.vtForm.get('vt') as FormArray
  }

  ngOnInit(): void {
    this.vtService.find().subscribe((thisvt: any)=>{
      for(let value in thisvt){
        if(thisvt[value]['disabled']==false){
          this.colabVt.push(thisvt[value])
        }
      }
      console.log(this.colabVt, this.colab)
    }, (err)=>{
      console.log(err)
    }, ()=>{
      for(let value in this.colabVt){
        if(this.colabVt[value].vt=="Sim"){
            this.vt.push(new FormGroup({
              'id': new FormControl(this.colabVt[value].id),
              'rh': new FormControl(this.colabVt[value].colabId),
              'name': new FormControl(this.colabVt[value].name),
              'workDays': new FormControl(this.colabVt[value].workDays),
              'vt': new FormControl(this.colabVt[value].vt),
              'total': new FormControl(this.colabVt[value].total)
            }))
        }else{
          this.vt.push(new FormGroup({
            'id': new FormControl(this.colabVt[value].id),
            'rh': new FormControl(this.colabVt[value].colabId),
            'name': new FormControl(this.colabVt[value].name),
            'workDays': new FormControl(0),
            'vt': new FormControl(this.colabVt[value].vt),
            'total': new FormControl(0)
          }))
        }
      }
    })
    console.log(this.colabVt)
  }

  salvar(data: any){
    for(let value in this.colabVt){
      this.vt['value'][value].total=((Number(this.colabVt[value].originalTotal) * Number(this.vt['controls'][value].get('workDays')?.value)))

      this.vt['controls'][value].get('total')?.setValue(this.vt['value'][value].total)
    }
    
    for(let value in data.vt){
      if(data.vt[value]){
        if(data.vt[value].name!=null){
          this.vtService.update(data.vt[value]).subscribe((data:any)=>{
          })
        }
      }
    }
    Swal.fire({
      position: 'top-right',
      icon: 'success',
      title: 'Vale Transporte atualizado',
      showConfirmButton: false, 
      timer: 1500
    })
  }
}
