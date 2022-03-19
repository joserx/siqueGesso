import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FaltasService } from 'src/app/services/faltas.service';
import { RhService } from 'src/app/services/rh.service';
import { jsPDF } from 'jspdf'
import { Workbook, TableStyleProperties } from 'exceljs';
import * as fs from 'file-saver';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})
export class RelatorioComponent implements OnInit {
  @ViewChild('generatePdf', {static: true, read: ViewContainerRef}) generatePdf: ViewContainerRef
  @ViewChild('content', {static: false})el: ElementRef
  colabOriginal: any
  public colabAtivado: any[] = []
  public rh: any[] = []
  public colab: any[] = []
  public faltaForm: FormGroup = new FormGroup({
    'data': new FormControl(null),
    'colaborador': new FormControl(''),
    'tipo': new FormControl('')
  })

    // Excel

    faltas: any=[]
    workbook = new Workbook();
    worksheet = this.workbook.addWorksheet("Employee Data");
    header=["Colaborador","Cargo","Data","Tipo","De","Até"]
    headerRow = this.worksheet.addRow(this.header);
    fname="relatorio-ausencias"

  constructor(
    private faltaService: FaltasService,
    private rhService: RhService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.rh_ver) == PermissionsUsers.rh_ver)){
      this.router.navigate(['sistema', 'rh'])
    }
    this.faltaService.find().subscribe((data: any)=>{
      this.colab = data
      this.colabOriginal = data
    }, (err)=>{
      console.log(err)
    }, ()=>{
      for(let value of this.colab){
        this.faltas.push(
          {
            "colaborador": value.colaborador,
            "cargo": value.cargo,
            "data": value.data,
            "tipo": value.tipo,
            "periodo": value.periodo,
            "tempo": value.tempo
          }
        )
      }
      console.log(this.faltas)
    })
    this.rhService.find().subscribe((data: any)=>{
      for(let value in data){
        if(data[value]['disabled']==false){
          this.colabAtivado.push(data[value])
        }
      }
    })
  }
  
  savePdf(){
    // const doc = new jsPDF();
    // doc.text("Hello world!", 10, 10);
    // doc.save("relatorio-faltas.pdf");

    let pdf = new jsPDF("p", "pt", "a4")
    pdf.html(this.el.nativeElement, {
      callback: (pdf)=>{
        pdf.save("relatorio-faltas.pdf")
      }
    })
  }

  filterBefore= "";
  filter(event: any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBefore.length) {
        this.colab = this.colabOriginal.filter((user : any) => `${user.colaborador} ${user.data.substring(10, 0)} ${user.tipo}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      } else {
        this.colab = this.colabOriginal;
        this.colab = this.colabOriginal.filter((user : any) => `${user.colaborador} ${user.data.substring(10, 0)} ${user.tipo}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      }
    } else {
      this.colab = this.colabOriginal;
    }
  }
  booleanValue(): boolean{
    return this.colab.length <=10
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
    this.worksheet.getColumn('B').width = 10
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
    this.worksheet.getCell('E1').fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'FF6060'},

    };
    this.worksheet.getCell('F1').fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'FF6060'},

    };
    this.worksheet.getColumn("A").width = 50
    for(let i of this.faltas){
      // this.worksheet.getColumn(i).
    }
    for (let x1 of this.faltas){
      let x2: any=Object.keys(x1);
      let temp=[]
      for(let y of x2){
        temp.push(x1[y])
      }
      this.worksheet.addRow(temp)
    }
    this.faltas = []
    this.workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, this.fname+'-'+new Date().valueOf()+'.xlsx');
    });
  }

}
