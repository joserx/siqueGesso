import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import jsPDF from 'jspdf';
import { AusenciaService } from 'src/app/services/ausencia.service';
import { FaltasService } from 'src/app/services/faltas.service';
import { RhService } from 'src/app/services/rh.service';

@Component({
  selector: 'app-relatorio-ausencia',
  templateUrl: './relatorio-ausencia.component.html',
  styleUrls: ['./relatorio-ausencia.component.scss']
})
export class RelatorioAusenciaComponent implements OnInit {

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
  constructor(
    private ausenciaService: AusenciaService,
    private rhService: RhService
  ) { }

  // Excel
  data: any[]
  columns: any[]
  footerData: any[][] = []
  totalSalesAmount = 0

  ngOnInit(): void {

     // Excel
     this.columns = ['Invoice ID', 'Invoice Date', 'Device Name', 'Amount']
     this.data = [
       {
         InvoiceId: 1,
         Date: '00-00-0000',
         DeviceName: 'Redmi note 9 s',
         Amount: 1500
       }
     ]
     this.totalSalesAmount = this.data.reduce((sum, item)=> sum + item.Amonut, 0)
     this.footerData.push(['Total', '', '', this.totalSalesAmount])

    this.ausenciaService.find().subscribe((data: any)=>{
      this.colab = data
      this.colabOriginal = data
    })
    this.rhService.find().subscribe((data: any)=>{
      for(let value in data){
        if(data[value]['disabled']==false){
          this.colabAtivado.push(data[value])
        }
      }
    })
  }

  // Excel
  exportExcel(){
    
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


}
