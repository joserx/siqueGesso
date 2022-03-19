import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timingSafeEqual } from 'crypto';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';
import { SolicitacaoService } from 'src/app/services/solicitacao.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitacao-pedido',
  templateUrl: './solicitacao-pedido.component.html',
  styleUrls: ['./solicitacao-pedido.component.scss']
})
export class SolicitacaoPedidoComponent implements OnInit {

  public pedidos = [
    {cliente: "Guilherme", data: "2021-10-10", numero: 1, status: "Separado", loja: "loja 2", valor: "2,00", vendedor: "Rodrigo"},
    {cliente: "Felipe", data: "2021-6-11", numero: 2, status: "Entrega Parcial", loja: "loja 2", valor: "12,00", vendedor: "Anderson"},
    {cliente: "Henrique", data: "2021-2-15", numero: 3, status: "Pendente de envio", loja: "loja 2", valor: "56,00", vendedor: "Ricardo"},
    {cliente: "Thais", data: "2021-6-16", numero: 4, status: "Pendente de envio", loja: "loja 2", valor: "79,00", vendedor: "Felipe"}
  ]
  public solicitacoes: any = []
  public solId: number 
  public atualSol: any = []
  create: boolean = false

  solicitacaoForm: FormGroup = new FormGroup({
    'numero': new FormControl('', [Validators.required]),
    'data': new FormControl(null, [Validators.required]),
    'cliente': new FormControl('', [Validators.required]),
    'valor': new FormControl('', [Validators.required]),
    'status': new FormControl('', [Validators.required]),
    'vendedor': new FormControl('', [Validators.required])
  })

  constructor(
    private readonly solicitacaoService: SolicitacaoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.expedicao_ver) == PermissionsUsers.expedicao_ver)){
      this.router.navigate(['sistema'])
    }
    if((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.expedicao_editar) == PermissionsUsers.expedicao_editar){
      this.create = true
    }
    this.solicitacaoService.find().subscribe((data:any)=>{
      this.solicitacoes = data
      console.log(this.solicitacoes)
    })
  }

  prencherInput(data: any){
    console.log(data)
    for(let umDado of this.pedidos){
      if(umDado['numero'] == data.numero){
       this.solicitacaoForm.get('cliente')?.setValue(umDado['cliente'])
       this.solicitacaoForm.get('valor')?.setValue(umDado['valor'])
       this.solicitacaoForm.get('status')?.setValue(umDado['status'])
       this.solicitacaoForm.get('vendedor')?.setValue(umDado['vendedor'])
      }
    }
  }
  
  submitForm(data:any){
    if(data.valid){
      this.solicitacaoService.create(data.value).subscribe((data:any)=>{
        this.solId = data.id
        this.solicitacaoService.findOne(this.solId).subscribe((data:any)=>{
          Swal.fire({ 
            title: '<h4>Solicitação salva!</h4>', 
            icon: 'success', 
            toast: true, 
            position: 'top', 
            showConfirmButton: false, 
            timer: 2000, 
            timerProgressBar: true,
            width: '500px',
          })
          this.atualSol.push(data)
        })
      })
    }else{
      Swal.fire({ 
        title: '<h4>Preencha todos os campos</h4>', 
        icon: 'error', 
        toast: true, 
        position: 'top', 
        showConfirmButton: false, 
        timer: 2000, 
        timerProgressBar: true,
        width: '500px',
      })
    }
  }
}
