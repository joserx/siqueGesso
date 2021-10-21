import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { EmbarqueService } from 'src/app/services/embarque.service';
import { SolicitacaoService } from 'src/app/services/solicitacao.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-criar-embarque',
  templateUrl: './criar-embarque.component.html',
  styleUrls: ['./criar-embarque.component.scss']
})
export class CriarEmbarqueComponent implements OnInit {

  public solicitacoes: any = []
  public embarqueSol: any = []
  public solCodes: any = []
  public emabrqueForm: FormGroup = new FormGroup({
    'numero': new FormControl(null),
    'sign': new FormControl(''),
    'driver': new FormControl(''),
    'solicitacao': new FormArray([])
  })
  constructor(
    private readonly solicitacaoService: SolicitacaoService,
    private readonly embarqueService: EmbarqueService
  ) { }

  get solicitacaoArray(){
    return this.emabrqueForm.get('solicitacao') as FormArray
  }

  ngOnInit(): void {
    this.solicitacaoService.find().subscribe((data:any)=>{
      this.solicitacoes = data
      for(let sol of this.solicitacoes){
        this.solCodes.push(sol.numero)
      }
      console.log(this.solCodes)
    })
  }

  findThis(data: any){
    if(this.solCodes.indexOf(Number(data.numero))!=-1){
      for(let sol of this.solicitacoes){
        if(data.numero == sol['numero']){
          this.embarqueSol.push(sol)
          this.emabrqueForm.get('numero')?.setValue('')
          this.solicitacaoArray.push(new FormGroup({
            'numero': new FormControl(sol.numero),
            'data': new FormControl(sol.data),
            'cliente': new FormControl(sol.cliente),
            'valor': new FormControl(sol.valor),
            'status': new FormControl(sol.status),
            'vendedor': new FormControl(sol.vendedor)
          }))
        }
      }
      Swal.fire({ 
        title: 'Pedido encontrado!', 
        icon: 'success', 
        toast: true, 
        position: 'top', 
        showConfirmButton: false, 
        timer: 2000, 
        timerProgressBar: true 
      })
    }else{
      Swal.fire({ 
        title: 'Pedido não encontrado!', 
        icon: 'error', 
        toast: true, 
        position: 'top', 
        showConfirmButton: false, 
        timer: 2000, 
        timerProgressBar: true 
      })
    }
  }

}
