import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { AusenciaService } from 'src/app/services/ausencia.service';
import { RhService } from 'src/app/services/rh.service';

@Component({
  selector: 'app-relatorio-modal-ausencia',
  templateUrl: './relatorio-modal-ausencia.component.html',
  styleUrls: ['./relatorio-modal-ausencia.component.scss']
})
export class RelatorioModalAusenciaComponent implements OnInit {

  

  @ViewChild('content', {static: false})el: ElementRef
  colabOriginal: any
  public colabAtivado: any[] = []
  public colab: any[] = []
  constructor(
    private ausenciaService: AusenciaService,
    private rhService: RhService
  ) { }

  ngOnInit(): void {

    

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

}
