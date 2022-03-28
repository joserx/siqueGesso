import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-imprimir-pedido',
  templateUrl: './imprimir-pedido.component.html',
  styleUrls: ['./imprimir-pedido.component.scss'],
})
export class ImprimirPedidoComponent implements OnInit {
  @ViewChild('content', {static: false})el: ElementRef


  embarqueForm: FormGroup = new FormGroup({
    numero: new FormControl({ value: '', disabled: true }, Validators.required),
    sign: new FormControl({ value: '', disabled: true }, Validators.required),
    driver: new FormControl({ value: '', disabled: true }, Validators.required),
    solicitacao: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    data: new FormControl({ value: '', disabled: true }, Validators.required),
    rh: new FormControl({ value: '', disabled: true }, Validators.required),
  });

  constructor() {}

  ngOnInit(): void {}

  loadForm(embarqueInput: any) {
    console.log(embarqueInput);

    this.embarqueForm = new FormGroup({
      numero: new FormControl(
        { value: embarqueInput.numero, disabled: true },
        Validators.required
      ),
      sign: new FormControl(
        { value: embarqueInput.sign, disabled: true },
        Validators.required
      ),
      driver: new FormControl(
        { value: embarqueInput.driver, disabled: true },
        Validators.required
      ),
      solicitacao: new FormControl(
        { value: embarqueInput.solicitacao, disabled: true },
        Validators.required
      ),
      data: new FormControl(
        { value: embarqueInput.data, disabled: true },
        Validators.required
      ),
      rh: new FormControl(
        { value: embarqueInput.rh, disabled: true },
        Validators.required
      ),
    });
  }

  savePdf(){

    let pdf = new jsPDF("p", "pt", "a4")
    pdf.html(this.el.nativeElement, {
      callback: (pdf)=>{
        pdf.save("embarque.pdf")
      }
    })
  }
}
