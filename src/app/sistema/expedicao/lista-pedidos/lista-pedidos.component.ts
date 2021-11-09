import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmbarqueService } from 'src/app/services/embarque.service';
import { RhService } from 'src/app/services/rh.service';
import { SolicitacaoService } from 'src/app/services/solicitacao.service';
import { VeiculosService } from 'src/app/services/veiculos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.scss']
})
export class ListaPedidosComponent implements OnInit {

  public show: boolean 
  public showSign: boolean
  public allVeiculos: any = []
  public veiculos: any[] = []
  public veiculosOriginal: any[] = []
  public allMotoristas: any[] = []
  public motoristas: any[] = []
  public motoristasOriginal: any[] = []
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
    'solicitacao': new FormArray([], [Validators.required]),
    'data': new FormControl(null),
    'rh': new FormControl(null)
  })

  constructor(
    private readonly solicitacaoService: SolicitacaoService,
    private readonly embarqueService: EmbarqueService,
    private readonly rhService: RhService,
    private readonly veiculosService: VeiculosService
  ) { }

  
  get solicitacaoArray(){
    return this.emabrqueForm.get('solicitacao') as FormArray
  }

  ngOnInit(): void {
    this.veiculosService.find().subscribe((data:any)=>{
      this.veiculos = data
      this.veiculosOriginal = data
      for(let oneData of data){
        this.allVeiculos.push(oneData.placa)
      }
    })
    this.rhService.find().subscribe((data:any)=>{
      for(let oneData of data){
        if(oneData.role.toLowerCase()==="motorista"){
          this.motoristas.push(oneData)
          this.motoristasOriginal.push(oneData)
          this.allMotoristas.push({'nome': `${oneData.name} ${oneData.surname}`, 'id': oneData.id})
        }
      }
    })
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

  delete(data: any){
    this.embarqueSol.splice(this.embarqueSol.indexOf(data), 1)
  }

  findThis(data: any){
      if(this.solCodes.indexOf(Number(data.numero))!=-1){
        for(let sol of this.solicitacoes){
          if(data.numero == sol['numero'] && sol['embarque']==null){
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
            Swal.fire({ 
              title: '<h4>Pedido encontrado!</h4>', 
              icon: 'success', 
              toast: true, 
              position: 'top', 
              showConfirmButton: false, 
              timer: 2000, 
              timerProgressBar: true,
              width: '500px',
            })
          }
          if(this.embarqueSol.length == 0){
            Swal.fire({ 
              title: '<h4>Esse pedido já está em um embarque!</h4>', 
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
      }else{
        Swal.fire({ 
          title: '<h4>Pedido não encontrado!</h4>', 
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

  addEmbarque(data:any){
    if(data.valid){
      let foundDriver: any[] = []
      data.value.data = new Date()
      console.log(this.allMotoristas, this.allVeiculos)
      if(this.allVeiculos.indexOf(data.value.sign)!= -1){
        for(let one of this.allMotoristas){
          if(one.nome == data.value.driver){
            foundDriver.push(one)
            data.value.rh = one.id
            this.embarqueService.create(data.value).subscribe((dt: any)=>{
              this.rhService.update(dt.rh, {'ultimoEmbarque': dt.data}).subscribe((data: any)=>{
                
              })
              console.log(dt.solicitacao)
              Swal.fire({ 
                title: '<h4>Embarque criado!</h4>', 
                icon: 'success', 
                toast: true, 
                position: 'top', 
                showConfirmButton: false, 
                timer: 2000, 
                timerProgressBar: true,
                width: '500px',
              })
              this.emabrqueForm.get('sign')?.setValue('')
              this.emabrqueForm.get('driver')?.setValue('')
              this.embarqueSol = []
              this.initializer()
            })
          }
          if(foundDriver.length == 0){
            Swal.fire({ 
              title: '<h4>Motorista não existe!</h4>', 
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
      }else{
        Swal.fire({ 
          title: '<h4>Veículo não existe!</h4>', 
          icon: 'error', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true,
          width: '500px', 
        })
      }
    }else{
      Swal.fire({ 
        title: '<h4>Preencha todos os campos!</h4>', 
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
          title: '<h4>Embarque deletado !</h4>', 
          icon: 'success', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true,
          width: '500px',
        })
        if(id && Number(id)){
          this.embarqueService.delete(id).subscribe(()=>{
            this.initializer()
          })
        }
      } else if (result.isDenied) {
        Swal.fire({ 
          title: '<h4>Embarque não deletado !</h4>', 
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

  filterBeforeMotorista = "";
  filtrarMotorista(event: any){
    this.show = true
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBeforeMotorista.length) {
        this.motoristas = this.motoristasOriginal.filter((user : any) => `${user.name} ${user.surname}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforeMotorista = str
      } else {
        this.motoristas = this.motoristasOriginal;
        this.motoristas = this.motoristasOriginal.filter((user : any) => `${user.name} ${user.surname}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforeMotorista = str
      }
      if(this.motoristas.length == 0){
        this.show = false
      }
    } else {
      this.motoristas = this.motoristasOriginal;
      this.show = false
    }
  }

  filterBeforeVeiculo = "";
  filtrarVeiculo(event: any){
    this.showSign = true
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBeforeVeiculo.length) {
        this.veiculos = this.veiculosOriginal.filter((user : any) => `${user.placa}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforeVeiculo = str
      } else {
        this.veiculos = this.veiculosOriginal;
        this.veiculos = this.veiculosOriginal.filter((user : any) => `${user.placa}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforeVeiculo = str
      }
      if(this.veiculos.length == 0){
        this.showSign = false
      }
    } else {
      this.veiculos = this.veiculosOriginal;
      this.showSign = false
    }
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

  selectThis(name: string, surname: string){
    this.emabrqueForm.get('driver')?.setValue(`${name} ${surname}`)
    this.show = false
  }

  selectThisVeiculo(sign: string){
    this.emabrqueForm.get('sign')?.setValue(sign)
    this.showSign = false
  }

}
