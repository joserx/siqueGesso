import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmbarqueService } from 'src/app/services/embarque.service';
import { SolicitacaoService } from 'src/app/services/solicitacao.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.scss']
})
export class ListaPedidosComponent implements OnInit {

  public produtos: any = [
    {'nome': 'produto 1', 'quantidade': 10},
    {'nome': 'produto 2', 'quantidade': 15},
    {'nome': 'produto 3', 'quantidade': 20},
    {'nome': 'produto 4', 'quantidade': 25},
    {'nome': 'produto 5', 'quantidade': 30}
  ]

  public umPedido: any = {}
  public estoqueSection: string = 'pedidos';
  public peidos: any[] = []
  public embarquePedidos: any[] = []
  public embarques: any[] = []
  public status: boolean = false
  public solicitacoes: any = []
  public solicitacoesOriginal: any = []
  public filter: any = []
  public filterOriginal: any = []
  public embarqueSol: any = []
  public solCodes: any = []
  public emabrqueForm: FormGroup = new FormGroup({
    'numero': new FormControl(null),
    'sign': new FormControl('', [Validators.required]),
    'driver': new FormControl('', [Validators.required]),
    'solicitacao': new FormArray([], [Validators.required])
  })

  constructor(
    private readonly solicitacaoService: SolicitacaoService,
    private readonly embarqueService: EmbarqueService,
  ) { }

  
  get solicitacaoArray(){
    return this.emabrqueForm.get('solicitacao') as FormArray
  }

  ngOnInit(): void {
    this.solicitacaoService.find().subscribe((data:any)=>{
      this.solicitacoes = data
      this.solicitacoesOriginal = data
      this.filter = data
      this.filterOriginal = data
    })
    this.embarqueService.find().subscribe((data:any)=>{
      this.embarques = data
    })
    this.solicitacaoService.find().subscribe((data:any)=>{
      this.solicitacoes = data
      for(let sol of this.solicitacoes){
        this.solCodes.push(sol.numero)
      }
      console.log(this.solCodes)
    })
  }

  public toggleEstoqueSection(value: string): void {
    this.estoqueSection = value;
  }

  filterBefore = "";
  filtrar(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBefore.length) {
        this.solicitacoes = this.solicitacoesOriginal.filter((user : any) => `${user.numero} ${user.cliente} ${user.vendedor} ${new Date(user.data)} ${user.valor} ${user.status}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      } else {
        this.solicitacoes = this.solicitacoesOriginal;
        this.solicitacoes = this.solicitacoesOriginal.filter((user : any) => `${user.numero} ${user.cliente} ${user.vendedor} ${new Date(user.data)} ${user.valor} ${user.status}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      }
    } else {
      this.solicitacoes = this.solicitacoesOriginal;
    }
  }

  filterBeforeDate = "";
  filtrarDate(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBeforeDate.length) {
        this.filter = this.filterOriginal.filter((user : any) => {
          user.data = new Date(user.data)
          let timezone = user.data.getTimezoneOffset() * 60000
          user.data = new Date(user.data - timezone).toISOString()
          let userDate = user.data.split("T")[0]
          return userDate == str
        })
        this.filterBeforeDate = str
      } else {
        this.filter = this.filterOriginal;
        this.filter = this.filterOriginal.filter((user : any) => {
          user.data = new Date(user.data)
          let timezone = user.data.getTimezoneOffset() * 60000
          user.data = new Date(user.data - timezone).toISOString()
          let userDate = user.data.split("T")[0]
          return userDate == str
        })
        this.filterBeforeDate = str
      }
    } else {
      this.filter = this.filterOriginal;
    }
  }

  filterBeforeStatus = "";
  filtrarStatus(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBefore.length) {
        this.filter = this.filterOriginal.filter((user : any) => `${user.status}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      } else {
        this.filter = this.filterOriginal;
        this.filter = this.filterOriginal.filter((user : any) => `${user.status}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      }
    } else {
      this.filter = this.filterOriginal;
    }
  }
  
  filterBeforeVendedor = "";
  filtrarVendedor(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBefore.length) {
        this.filter = this.filterOriginal.filter((user : any) => `${user.vendedor}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      } else {
        this.filter = this.filterOriginal;
        this.filter = this.filterOriginal.filter((user : any) => `${user.vendedor}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      }
    } else {
      this.filter = this.filterOriginal;
    }
  }

  turnToTrue(){
    this.status = true
  }

  turnToFalse(){
    this.status = false
  }

  delete(id: number){
    
  }

  findThis(data: any){
    if(this.solCodes.indexOf(Number(data.numero))!=-1){
      for(let sol of this.solicitacoes){
        if(data.numero == sol['numero']){
          this.embarqueSol.push(sol)
          this.emabrqueForm.get('numero')?.setValue('')
          this.solicitacaoArray.push(new FormGroup({
            'id': new FormControl(sol.id),  
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

  addEmbarque(data:any){
    if(data.valid){
      this.embarqueService.create(data.value).subscribe((dt: any)=>{
        console.log(dt.solicitacao)
        Swal.fire({ 
          title: 'Embarque criado!', 
          icon: 'success', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true
        })
        this.emabrqueForm.get('sign')?.setValue('')
        this.emabrqueForm.get('driver')?.setValue('')
        this.initializer()
      })
    }else{
      Swal.fire({ 
        title: 'Preencha todos os campos!', 
        icon: 'error', 
        toast: true, 
        position: 'top', 
        showConfirmButton: false, 
        timer: 2000, 
        timerProgressBar: true 
      })
    }
  }

  initializer(){
    this.embarqueService.find().subscribe((data:any)=>{
      this.embarques = data
    })
  }

  deleteEmbarque(id: number){
    Swal.fire({
      title: 'Você gostaria de deletar o embarque ?',
      text: '(As solicitações de pedidos que estão dentro do embarque serão excluídas também)',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Deletar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({ 
          title: 'Embarque deletado !', 
          icon: 'success', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true 
        })
        if(id && Number(id)){
          this.embarqueService.delete(id).subscribe(()=>{
            this.initializer()
          })
        }
      } else if (result.isDenied) {
        Swal.fire({ 
          title: 'Embarque não deletado !', 
          icon: 'info', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true 
        })
      }
    })
    
  }

  findPedidos(id: number){
    this.embarqueService.findOne(id).subscribe((data:any)=>{
      this.embarquePedidos = data.solicitacao
    })
  }

  findSolicitation(id: number){
    this.solicitacaoService.findOne(id).subscribe((data: any)=>{
      this.umPedido = data
    })
  }

}
