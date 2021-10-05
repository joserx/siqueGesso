import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import jsPDF from 'jspdf';
import { AusenciaService } from 'src/app/services/ausencia.service';
import { FaltasService } from 'src/app/services/faltas.service';
import { RhService } from 'src/app/services/rh.service';
import { Workbook, TableStyleProperties } from 'exceljs';
import * as fs from 'file-saver';
import { stringify } from 'querystring';

@Component({
  selector: 'app-relatorio-ausencia',
  templateUrl: './relatorio-ausencia.component.html',
  styleUrls: ['./relatorio-ausencia.component.scss']
})
export class RelatorioAusenciaComponent implements OnInit {

  @ViewChild('generatePdf', {static: true, read: ViewContainerRef}) generatePdf: ViewContainerRef
  @ViewChild('content', {static: false})el: ElementRef
  colabOriginal: any
  ausencia: any = []
  ausenciaOriginal: any = []
  public colabAtivado: any[] = []
  public rh: any[] = []
  public colab: any[] = []
  public faltaForm: FormGroup = new FormGroup({
    'data': new FormControl(null),
    'colaborador': new FormControl(''),
    'tipo': new FormControl('')
  })
  constructor(
    private ausenciaService: AusenciaService,
    private rhService: RhService
  ) { }

  // Excel

  ausencias: any=[]
  workbook = new Workbook();
  worksheet = this.workbook.addWorksheet("Employee Data");
  header=["Colaborador","Cargo","Data","Tipo","De","Até"]
  headerRow = this.worksheet.addRow(this.header);
  fname="relatorio-ausencias"

  ngOnInit(): void {
    this.ausenciaService.find().subscribe((data:any)=>{
      this.ausencia = data
      this.ausenciaOriginal = data
    }, (err)=>{
      console.log(err)
    }, ()=>{
      for(let value of this.ausencia){
        this.ausencias.push(
          {
            "colaborador": value.colaborador,
            "cargo": value.cargo,
            "data": value.data.substring(10, 0),
            "tipo": value.tipo,
            "periodo": value.de.substring(10, 0),
            "ate": value.ate.substring(10, 0)
          }
        )
      }
      console.log(this.ausencias)
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
        this.ausencia = this.ausenciaOriginal.filter((user : any) => `${user.colaborador} ${user.data.substring(10, 0)} ${user.tipo}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      } else {
        this.ausencia = this.ausenciaOriginal;
        this.ausencia = this.ausenciaOriginal.filter((user : any) => `${user.colaborador} ${user.data.substring(10, 0)} ${user.tipo}`.toUpperCase().includes(str.toUpperCase()))
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
    this.worksheet.getColumn("C").width = 15
    this.worksheet.getColumn("D").width = 15
    this.worksheet.getColumn("E").width = 15
    this.worksheet.getColumn("F").width = 15
    let temp=[]
    for (let x1 of this.ausencias){
      let x2: any=Object.keys(x1);
      for(let y of x2){
        temp.push(x1[y])
      }
    }
    this.ausencias = []
    this.worksheet.addRow(temp)
    this.workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, this.fname+'-'+new Date().valueOf()+'.xlsx');
    });
  }
}