import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpedicaoService } from 'src/app/services/expedicao.service';
import { Workbook, TableStyleProperties } from 'exceljs';
import * as fs from 'file-saver';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-expedicao',
  templateUrl: './editar-expedicao.component.html',
  styleUrls: ['./editar-expedicao.component.scss']
})
export class EditarExpedicaoComponent implements OnInit {

  /* 
  ::::::::::::::::::::::::::::::
  ::-------form control-------::
  ::::::::::::::::::::::::::::::
  */

  public expedicaoForm: FormGroup = new FormGroup({
    "codigo": new FormControl('', [Validators.required]),
    "unidade": new FormControl('', [Validators.required]),
    "status": new FormControl('', [Validators.required]),
    "respSeparacao": new FormControl('', [Validators.required]),
    "respDespacho": new FormControl('', [Validators.required]),
    "emissao": new FormControl(null, [Validators.required]),
    "despacho": new FormControl(null),
    "cliente": new FormControl(''),
    "vendedor": new FormControl(''),
    "loja": new FormControl(''),
    "transportadora": new FormControl('', [Validators.required]),
    "motorista": new FormControl('', [Validators.required]),
    "placa": new FormControl('', [Validators.required]),
    "peso": new FormControl('', [Validators.required]),
    "observacoes": new FormControl('', [Validators.required]),
    "pedido": new FormControl(''),
    "nPedido": new FormControl(null)
  })



  /* 
  ::::::::::::::::::::::::::::::
  ::-----------vars-----------::
  ::::::::::::::::::::::::::::::
  */

  public pedidos: any = [
    { codigo: "001", produto: "PLACA DE GESSO 10X10", qtd: "500", valor: "???", tipo: "Entrega", data: "09/06/2021", endereco: "SALGADO FILHO 2844"},
    { codigo: "002", produto: "PLACA DE GESSO 10X10", qtd: "100", valor: "???", tipo: "Entrega", data: "15/06/2021", endereco: "SALGADO FILHO 2844"},
    { codigo: "003", produto: "PLACA DE GESSO 10X10", qtd: "100", valor: "???", tipo: "Entrega", data: "09/06/2021", endereco: "SALGADO FILHO 2844"},
    { codigo: "004", produto: "PLACA DE GESSO 10X10", qtd: "250", valor: "???", tipo: "Retirada", data: "15/06/2021", endereco: "SALGADO FILHO 2844"},
  ];
  public ordens: any = []
  public exId: number

  /* --excel-- */

  orden: any=[]
  workbook = new Workbook();
  worksheet = this.workbook.addWorksheet("Employee Data");
  header=["Código","Unidade","Status","Resp. Separação","Resp. Despacho","Emissão", "Pedido", "Cliente", "Vendedor", "Loja", "Transportadora", "Motorista", "Placa", "Peso", "Observações"]
  headerRow = this.worksheet.addRow(this.header);
  fname=""



  /* 
  :::::::::::::::::::::::::::::
  ::-------constructor-------::
  :::::::::::::::::::::::::::::
  */

  constructor(
    private readonly expedicaoService: ExpedicaoService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }



  /* 
  :::::::::::::::::::::::::::::
  ::---------methods---------::
  :::::::::::::::::::::::::::::
  */

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap
    this.exId = Number(routeParams.get('id'))
    this.expedicaoService.findOne(this.exId).subscribe((data:any)=>{
      this.ordens = data

      /* Setting values */
      this.expedicaoForm.get('codigo')?.setValue(data.codigo)
      this.expedicaoForm.get('unidade')?.setValue(data.unidade)
      this.expedicaoForm.get('status')?.setValue(data.status)
      this.expedicaoForm.get('respSeparacao')?.setValue(data.respSeparacao)
      this.expedicaoForm.get('respDespacho')?.setValue(data.respDespacho)
      this.expedicaoForm.get('emissao')?.setValue(data.emissao.substring(10,0))
      this.expedicaoForm.get('despacho')?.setValue(data.despacho)
      this.expedicaoForm.get('transportadora')?.setValue(data.transportadora)
      this.expedicaoForm.get('motorista')?.setValue(data.motorista)
      this.expedicaoForm.get('placa')?.setValue(data.placa)
      this.expedicaoForm.get('peso')?.setValue(data.peso)
      this.expedicaoForm.get('observacoes')?.setValue(data.observacoes)
      this.expedicaoForm.get('pedido')?.setValue(data.pedido)
      this.expedicaoForm.get('cliente')?.setValue(data.cliente)
      this.expedicaoForm.get('vendedor')?.setValue(data.vendedor)
      this.expedicaoForm.get('loja')?.setValue(data.loja)
      this.expedicaoForm.get('nPedido')?.setValue(data.nPedido)
    }, (err)=>{
      console.log(err)
    }, ()=>{
        this.orden.push(
          {
            "codigo": this.ordens.codigo,
            "unidade": this.ordens.unidade,
            "status": this.ordens.status,
            "respSeparacao": this.ordens.respSeparacao,
            "respDespacho": this.ordens.respDespacho,
            "emissao": this.ordens.emissao.substring(10, 0),
            "pedido": this.ordens.pedido,
            "cliente": this.ordens.cliente,
            "vendedor": this.ordens.vendedor,
            "loja": this.ordens.loja,
            "transportadora": this.ordens.transportadora,
            "motorista": this.ordens.motorista,
            "placa": this.ordens.placa,
            "peso": this.ordens.peso,
            "observacoes": this.ordens.observacoes
          }
        )
      console.log(this.orden)
    })
  }

  selecionar(event: any){
    this.expedicaoForm.get('pedido')?.setValue(`PEDIDO ${event.numero} | ${event.data} | VENDEDOR ${event.vendedor}`)
    this.expedicaoForm.get('cliente')?.setValue(event.cliente)
    this.expedicaoForm.get('vendedor')?.setValue(event.vendedor)
    this.expedicaoForm.get('loja')?.setValue(event.loja)
    this.expedicaoForm.get('nPedido')?.setValue(event.numero)
    
  }

  submitForm(data: any){
    if(data.valid){
      this.expedicaoService.update(this.exId, data.value).subscribe((data: any)=>{
        this.router.navigate(['sistema', 'expedicao'])
        Swal.fire({ 
          title: '<h4>Ordem de expedição adicionada !</h4>', 
          icon: 'success', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true,
          width: '500px', 
        })
      })
    }else{
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: '<h4>preecha todo o formulário !</h4>',
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        width: '500px',
      })
      console.log(data)
    }
  }

    // Excel
    exportexcel(): void{
      this.fname = `expedicao-${this.expedicaoForm.value.codigo}`
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
      this.worksheet.getCell('G1').fill = {
        type: 'pattern',
        pattern:'solid',
        fgColor:{argb:'FF6060'},
        
      };
      this.worksheet.getCell('H1').fill = {
        type: 'pattern',
        pattern:'solid',
        fgColor:{argb:'FF6060'},
        
      };
      this.worksheet.getCell('I1').fill = {
        type: 'pattern',
        pattern:'solid',
        fgColor:{argb:'FF6060'},
        
      };
      this.worksheet.getCell('J1').fill = {
        type: 'pattern',
        pattern:'solid',
        fgColor:{argb:'FF6060'},
        
      };
      this.worksheet.getCell('K1').fill = {
        type: 'pattern',
        pattern:'solid',
        fgColor:{argb:'FF6060'},
        
      };
      this.worksheet.getCell('L1').fill = {
        type: 'pattern',
        pattern:'solid',
        fgColor:{argb:'FF6060'},
        
      };
      this.worksheet.getCell('M1').fill = {
        type: 'pattern',
        pattern:'solid',
        fgColor:{argb:'FF6060'},
        
      };
      this.worksheet.getCell('N1').fill = {
        type: 'pattern',
        pattern:'solid',
        fgColor:{argb:'FF6060'},
        
      };
      this.worksheet.getCell('O1').fill = {
        type: 'pattern',
        pattern:'solid',
        fgColor:{argb:'FF6060'},
        
      };
      this.worksheet.getColumn("A").width = 15
      this.worksheet.getColumn('B').width = 15
      this.worksheet.getColumn("C").width = 15
      this.worksheet.getColumn("D").width = 30
      this.worksheet.getColumn("E").width = 30
      this.worksheet.getColumn("F").width = 15
      this.worksheet.getColumn("G").width = 15
      this.worksheet.getColumn("H").width = 15
      this.worksheet.getColumn("I").width = 30
      this.worksheet.getColumn("J").width = 15
      this.worksheet.getColumn("K").width = 30
      this.worksheet.getColumn("L").width = 30
      this.worksheet.getColumn("M").width = 15
      this.worksheet.getColumn("N").width = 15
      this.worksheet.getColumn("O").width = 30
      let temp=[]
      for (let x1 of this.orden){
        let x2: any=Object.keys(x1);
        for(let y of x2){
          temp.push(x1[y])
        }
      }
      console.log(this.orden)
      this.orden = []
      this.worksheet.addRow(temp)
      this.workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, this.fname+'-'+new Date().valueOf()+'.xlsx');
      });
    }

    cancelar(id: number){
      Swal.fire({
        title: 'Você gostaria de cancelar esta ordem ?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Deletar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire({ 
            title: '<h4>Ordem deletada !</h4>', 
            icon: 'success', 
            toast: true, 
            position: 'top', 
            showConfirmButton: false, 
            timer: 2000, 
            timerProgressBar: true,
            width: '500px', 
          })
          this.expedicaoService.delete(id).subscribe((data:any)=>{
            this.router.navigate(['sistema', 'expedicao'])
          })
        } else if (result.isDenied) {
          Swal.fire({ 
            title: '<h4>Ordem não deletada !</h4>', 
            icon: 'info', 
            toast: true, 
            position: 'top', 
            showConfirmButton: false, 
            timer: 2000, 
            timerProgressBar: true,
            width: '500px', 
          })
        }
      })
      
    }

}
