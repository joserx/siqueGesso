import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { FaltasService } from 'src/app/services/faltas.service';
import { RhService } from 'src/app/services/rh.service';

@Component({
  selector: 'app-relatorio-modal',
  templateUrl: './relatorio-modal.component.html',
  styleUrls: ['./relatorio-modal.component.scss']
})
export class RelatorioModalComponent implements OnInit {

  @ViewChild('content', {static: false})el: ElementRef
  colabOriginal: any
  public colabAtivado: any[] = []
  public colab: any[] = []
  constructor(
    private faltaService: FaltasService,
    private rhService: RhService
  ) { }

  ngOnInit(): void {
    this.faltaService.find().subscribe((data: any)=>{
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
