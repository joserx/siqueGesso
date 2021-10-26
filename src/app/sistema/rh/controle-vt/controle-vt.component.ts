import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { RhService } from 'src/app/services/rh.service';
import { VtService } from 'src/app/services/vt.service';
import Swal from 'sweetalert2';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Component({
  selector: 'app-controle-vt',
  templateUrl: './controle-vt.component.html',
  styleUrls: ['./controle-vt.component.scss']
})
export class ControleVtComponent implements OnInit {

  // Excel
  vts: any=[]
  workbook = new Workbook();
  worksheet = this.workbook.addWorksheet("Employee Data");
  header=["Colaborador","VT","Dias","Total"]
  headerRow = this.worksheet.addRow(this.header);
  fname="controle-vt"
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
        if(thisvt[value]['disabled']==false && thisvt[value]['vt']=="Sim"){
          this.colabVt.push(thisvt[value])
        }
      }
      console.log(this.colabVt, this.colab)
    }, (err)=>{
      console.log(err)
    }, ()=>{
        for(let value of this.colabVt){
          this.vts.push(
            {
              "colaborador": value.name,
              "vt": value.vt,
              "dias": value.workDays,
              "total": value.total,
            }
          )
        }
        console.log(this.vt)
      for(let value in this.colabVt){
        if(this.colabVt[value].vt=="Sim"){
            this.vt.push(new FormGroup({
              'id': new FormControl(this.colabVt[value].id),
              'rh': new FormControl(this.colabVt[value].colabId),
              'valorTotal': new FormControl(this.colabVt[value].originalTotal),
              'name': new FormControl(this.colabVt[value].name),
              'workDays': new FormControl(this.colabVt[value].workDays),
              'total': new FormControl(`R$ ${this.colabVt[value].total}`)
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

      this.vt['controls'][value].get('total')?.setValue(`R$ ${this.vt['value'][value].total}`)
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

  // Excel
  exportexcel(): void{
    this.worksheet.getRow(1).font={
      size: 20,
      bold: true,
      color: {argb: 'FFFFFF'}
    }
    this.worksheet.getCell('A1').fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'FF6060'},
    };
    this.worksheet.getCell('B1').fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'FF6060'},

    };
    this.worksheet.getCell('C1').fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'FF6060'},

    };
    this.worksheet.getCell('D1').fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'FF6060'},

    };
    this.worksheet.getColumn("A").width = 50
    for (let x1 of this.vts){
      let x2: any=Object.keys(x1);
      var temp: any=[]
      console.log(temp)
      for(let y of x2){
        temp.push(x1[y])
      }
      this.worksheet.addRow(temp)
    }
    this.vts = []
    this.workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, this.fname+'-'+new Date().valueOf()+'.xlsx');
    });
  }
}
