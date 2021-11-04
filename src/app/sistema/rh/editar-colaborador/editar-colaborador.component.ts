/* Ver o porque as filiais não estão vindo do banco e o porque não está abrindo o 
modal de filial */

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { on } from 'process';
import { AddTurnoService } from 'src/app/services/add-turno.service';
import { AuthenticationService } from 'src/app/services/auth.service';
import { CargoService } from 'src/app/services/cargo.service';
import { CorreiosService } from 'src/app/services/correios.service';
import { ExamesService } from 'src/app/services/exames.service';
import { FaltasService } from 'src/app/services/faltas.service';
import { FileService } from 'src/app/services/file.service';
import { FilialService } from 'src/app/services/filial.service';
import { RhService } from 'src/app/services/rh.service';
import { VtService } from 'src/app/services/vt.service';
import { BrazilValidator } from 'src/app/_helpers/brasil';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { getDate } from '../../../../environments/global';
import { StatusExame } from '../enum/status.exame.enum';
// import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editar-colaborador',
  templateUrl: './editar-colaborador.component.html',
  styleUrls: ['./editar-colaborador.component.scss']
})
export class EditarColaboradorComponent implements OnInit {

   /* 
  ...............................
  ::sistema de adicionar cargos::
  ::...........................::
  */
 
  public cargoForm: FormGroup = new FormGroup({
    'nome': new FormControl('', [Validators.required])
  })
  public cargos: any = []
  public selectCargos: any = []


  /* 
  ...............................
  ::sistema de adicionar turnos::
  ::...........................::
  */

  public turnoForm: FormGroup = new FormGroup({
    'nome': new FormControl('', [Validators.required])
  })
  public turnos: any = []
  public selectTurno: any = []

  public ida: number = 10
  public volta: number = 10
  public total: number = 10
  public dupla: number = 10
  public salario: number = 10
  public estoqueSection: string = 'dados-pessoais';
  public getDate: any = getDate;
  public openModal: boolean= false;
  filiais: any[] = []
  exames: any[] = []
  public vt: any = {
    'id': null,
    'name': null,
    'vt': null,
    'rh': null,
    'workDays': null,
    'total': null,
    'colabId': null,
    'originalTotal': null
  }
  allVt: any

  avatarImg = 'assets/sem-foto.jpg';
  avatarFile : any = null;
  public desativadoCheckbox: boolean = false;
  public rhForm: FormGroup = new FormGroup({
    'disabled': new FormControl(''),
    'name': new FormControl('', [Validators.required]),
    'surname': new FormControl('', [Validators.required]),
    'birthDate': new FormControl(null, [Validators.required]),
    'rg': new FormControl('', [BrazilValidator.isValidRG()]),
    'rgExpedicao': new FormControl(null, [Validators.required]),
    'rgOrgaoEmissor': new FormControl('', [Validators.required]),
    'cpfcnpj': new FormControl('', [BrazilValidator.isValidCpf()]),
    'cnh': new FormControl(''),
    'gender': new FormControl(''),
    'civilState': new FormControl('', [Validators.required]),
    'deficiency': new FormControl(''),
    'scholarship': new FormControl(''),
    'nacionality': new FormControl(''),
    'naturality': new FormControl(''),
    'motherName': new FormControl(''),
    'fatherName': new FormControl(''),
    'cep': new FormControl('', [BrazilValidator.isValidCEP()]),
    'street': new FormControl(''),
    'addressNumber': new FormControl(''),
    'addressComplement': new FormControl(''),
    'neighborhood': new FormControl(''),
    'city': new FormControl(''),
    'state': new FormControl(''),
    'telephone': new FormControl(''),
    'whatsapp': new FormControl(''),
    'emergencyTelephone': new FormControl(''),
    'personalEmail': new FormControl(''),
    'corporativeEmail': new FormControl(''),
    'department': new FormControl(''),
    'role': new FormControl(''),
    'contractType': new FormControl(''),
    'shift': new FormControl(''),
    'paycheck': new FormControl(null),
    'admission': new FormControl(null),
    'experiencePeriod': new FormControl(''),
    'fireDate': new FormControl(null),
    'pis': new FormControl(''),
    'mei': new FormControl('', [BrazilValidator.isValidCpf()]),
    'bank': new FormControl('', [Validators.required]),
    'bankAccountType': new FormControl('', [Validators.required]),
    'bankAgency': new FormControl('', [Validators.required]),
    'bankAccountNumber': new FormControl('', [Validators.required]),
    'filial': new FormControl(''),
    'vacationDueDate': new FormControl(null),
    'conducaoIda': new FormControl(null),
    'conducaoVolta': new FormControl(null),
    'linesNames': new FormControl(''), 
    'totalValue': new FormControl(null), 
    'tshirtSize': new FormControl(''),
    'lastDeliveryTshirt': new FormControl(null),
    'pantsSize': new FormControl(''),
    'lastDeliveryPants' : new FormControl(null),
    'shoesSize': new FormControl(''),
    'lastDeliveryShoes': new FormControl(null),
    'beltSize': new FormControl(''),
    'lastDeliveryBelt': new FormControl(null),
    'glovesSize': new FormControl(''),
    'lastDeliveryGloves': new FormControl(null),
    'jacketSize': new FormControl(''),
    'lastDeliveryJacket': new FormControl(null),
    'duplaFuncao': new FormControl(null),
    'vale': new FormControl('', [Validators.required]),
    'pix': new FormControl(''),
    'pcd': new FormControl('', [Validators.required]),
    'abafador': new FormControl(''),
    'lastDelveryAbafador': new FormControl(''),
    'exame': new FormArray([]),
    'categoriaCnh': new FormControl('')
  })
  user : any = {}
  rhId : number = 0;
  anexesRepo = environment.apiUrl + 'file/download/'

  constructor(
    private readonly fileService : FileService,
    private readonly route : ActivatedRoute,
    private readonly rhService : RhService,
    private readonly authService : AuthenticationService,
    private readonly correiosService : CorreiosService,
    private readonly router : Router,
    private readonly filialService: FilialService,
    private readonly exameService: ExamesService,
    private readonly vtService: VtService,
    private readonly cargoService: CargoService,
    private readonly turnoService: AddTurnoService
  ) { }

  ngOnInit(): void {  
    this.turnoService.find().subscribe((data:any)=>{
      this.selectTurno = data
    })
    this.cargoService.find().subscribe((data:any)=>{
      this.selectCargos = data
    })
    this.user = this.authService.currentUserValue
    const routeParams = this.route.snapshot.paramMap;
    this.rhId = Number(routeParams.get('id'));  
    this.rhService.findOne(this.rhId).subscribe((data : any) => {
      if(data.anexes && data.anexes.length > 0) {
        this.anexes = data.anexes
      }
      if(data.avatar) {
        this.avatarImg = environment.apiUrl + 'file/download/' + data.avatar.fileName
      }
      this.rhForm.get('name')?.setValue(data.name)
      this.rhForm.get('surname')?.setValue(data.surname)
      this.rhForm.get('birthDate')?.setValue(data.birthDate.substring(10, 0))
      this.rhForm.get('rg')?.setValue(data.rg)
      this.rhForm.get('rgExpedicao')?.setValue(data.rgExpedicao.substring(10, 0))
      this.rhForm.get('rgOrgaoEmissor')?.setValue(data.rgOrgaoEmissor)
      this.rhForm.get('cpfcnpj')?.setValue(data.cpfcnpj)
      this.rhForm.get('cnh')?.setValue(data.cnh)
      this.rhForm.get('gender')?.setValue(data.gender)
      this.rhForm.get('civilState')?.setValue(data.civilState)
      this.rhForm.get('deficiency')?.setValue(data.deficiency)
      this.rhForm.get('scholarship')?.setValue(data.scholarship)
      this.rhForm.get('nacionality')?.setValue(data.nacionality)
      this.rhForm.get('naturality')?.setValue(data.naturality)
      this.rhForm.get('motherName')?.setValue(data.motherName)
      this.rhForm.get('fatherName')?.setValue(data.fatherName)
      this.rhForm.get('cep')?.setValue(data.cep)
      this.rhForm.get('street')?.setValue(data.street)
      this.rhForm.get('addressNumber')?.setValue(data.addressNumber)
      this.rhForm.get('addressComplement')?.setValue(data.addressComplement)
      this.rhForm.get('neighborhood')?.setValue(data.neighborhood)
      this.rhForm.get('city')?.setValue(data.city)
      this.rhForm.get('state')?.setValue(data.state)
      this.rhForm.get('telephone')?.setValue(data.telephone)
      this.rhForm.get('whatsapp')?.setValue(data.whatsapp)
      this.rhForm.get('emergencyTelephone')?.setValue(data.emergencyTelephone)
      this.rhForm.get('personalEmail')?.setValue(data.personalEmail)
      this.rhForm.get('corporativeEmail')?.setValue(data.corporativeEmail)
      this.rhForm.get('department')?.setValue(data.department)
      this.rhForm.get('role')?.setValue(data.role)
      this.rhForm.get('contractType')?.setValue(data.contractType)
      this.rhForm.get('shift')?.setValue(data.shift)
      this.rhForm.get('paycheck')?.setValue(data.paycheck)
      if(data.admission!=null){
        this.rhForm.get('admission')?.setValue(data.admission.substring(10, 0))
      }
      this.rhForm.get('experiencePeriod')?.setValue(data.experiencePeriod)
      if(data.fireDate!=null){ 
        this.rhForm.get('fireDate')?.setValue(data.fireDate.substring(10, 0))
      }
      this.rhForm.get('pis')?.setValue(data.pis)
      this.rhForm.get('bank')?.setValue(data.bank)
      this.rhForm.get('bankAccountType')?.setValue(data.bankAccountType)
      this.rhForm.get('bankAgency')?.setValue(data.bankAgency)
      this.rhForm.get('bankAccountNumber')?.setValue(data.bankAccountNumber)
      this.rhForm.get('filial')?.setValue(data.filial)
      if(data.lastExam!=null){
        this.rhForm.get('lastExam')?.setValue(data.lastExam.substring(10, 0))
      }
      
      if(data.nextExam!=null){
        this.rhForm.get('nextExam')?.setValue(data.nextExam.substring(10, 0))
      }
      if(data.vacationDueDate!=null){
        this.rhForm.get('vacationDueDate')?.setValue(data.vacationDueDate.substring(10, 0))
      }
      this.rhForm.get('workDays')?.setValue(data.workDays)
      this.rhForm.get('conducaoIda')?.setValue(data.conducaoIda)
      this.rhForm.get('conducaoVolta')?.setValue(data.conducaoVolta)
      this.rhForm.get('linesNames')?.setValue(data.linesNames)
      this.rhForm.get('totalValue')?.setValue(data.totalValue)
      this.rhForm.get('duplaFuncao')?.setValue(data.duplaFuncao)
      this.rhForm.get('tshirtSize')?.setValue(data.tshirtSize)
      if(data.lastDeliveryTshirt!=null){
        this.rhForm.get('lastDeliveryTshirt')?.setValue(data.lastDeliveryTshirt.substring(10, 0))
      }
      this.rhForm.get('pantsSize')?.setValue(data.pantsSize)
      if(data.lastDeliveryPants!=null){
        this.rhForm.get('lastDeliveryPants')?.setValue(data.lastDeliveryPants.substring(10, 0))
      }
      this.rhForm.get('shoesSize')?.setValue(data.shoesSize)
      if(data.lastDeliveryShoes!=null){
        this.rhForm.get('lastDeliveryShoes')?.setValue(data.lastDeliveryShoes.substring(10, 0))
      }
      this.rhForm.get('beltSize')?.setValue(data.beltSize)
      if(data.lastDeliveryBelt!=null){
        this.rhForm.get('lastDeliveryBelt')?.setValue(data.lastDeliveryBelt.substring(10, 0))
      }
      this.rhForm.get('glovesSize')?.setValue(data.glovesSize)
      if(data.lastDeliveryGloves!=null){
        this.rhForm.get('lastDeliveryGloves')?.setValue(data.lastDeliveryGloves.substring(10, 0))
      }
      this.rhForm.get('jacketSize')?.setValue(data.jacketSize)
      if(data.lastDeliveryJacket!=null){
        this.rhForm.get('lastDeliveryJacket')?.setValue(data.lastDeliveryJacket.substring(10, 0))
      }
      this.rhForm.get('vale')?.setValue(data.vale)
      if(data.vale=="nao"){
        this.rhForm.get('conducaoIda')?.setValue(null)
        this.rhForm.get('conducaoVolta')?.setValue(null)
        this.rhForm.get('linesNames')?.setValue('')
        this.rhForm.get('totalValue')?.setValue(null)
      }
      this.rhForm.get('pix')?.setValue(data.pix)
      this.rhForm.get('pcd')?.setValue(data.pcd)
      this.rhForm.get('abafador')?.setValue(data.abafador)
      this.rhForm.get('lastDeliveryAbafador')?.setValue(data.lastDeliveryAbafador)
      this.rhForm.get('categoriaCnh')?.setValue(data.categoriaCnh)
      for(let exame in data.exame){
        this.exames.push(data[exame])
        this.exame.push(
          new FormGroup({
            'data' : new FormControl(data.exame[exame].data.substring(10,0)),
            'tipo' : new FormControl(data.exame[exame].tipo),
            'vencimento': new FormControl(data.exame[exame].vencimento.substring(10,0)),
            'status': new FormControl(StatusExame.ULTIMO), 
            'rh': new FormControl(this.rhId),
            'id': new FormControl(data.exame[exame].id)
          }) 
        )
      }
    });
    this.updateFilial()
    this.filialService.find().subscribe((res: any)=>{
      this.filiais = res
      console.log(this.filiais)
    })
    this.vtService.find().subscribe((data:any)=>{
      this.allVt = data
      console.log('----')
      console.log(this.allVt)
    })
    
  }

  get exame(){
    return this.rhForm.get('exame') as FormArray;
  }

  get faltas(){
    return this.rhForm.get('falta') as FormArray;
  }

  get cpf() {
    return this.rhForm.get('cnpj');
  }

  get rg() {
    return this.rhForm.get('rg');
  }
  
  get cep() {
    return this.rhForm.get('cep');
  }

  get mei() {
    return this.rhForm.get('mei');
  }
  
  public exameAdd(): void {
    this.exame.push(
      new FormGroup({
        'data' : new FormControl(null),
        'tipo' : new FormControl(''),
        'vencimento': new FormControl(null),
        'status': new FormControl(StatusExame.ULTIMO), 
        'rh': new FormControl(this.rhId)
      })
    )
  }

  public toggleDesativadoCheckbox(data: any): void {
    this.desativadoCheckbox === true ? this.desativadoCheckbox = false : this.desativadoCheckbox = true;
  }

  public log(e: any):void {
    
  }

  anexes : any[]= [];

   //  this.fileAnex = files[0].name
   addFile(event : any) {
    let files: File[] = event.target.files;

    if (files[0] && files[0].size !== 0) {
      this.fileService.create(files[0]).subscribe((file: any) => {
        this.anexes.push(file);
      })

    }
  }

  deleteAnex(event : any, anex : any) {
    event.preventDefault();
    this.anexes = this.anexes.filter((anexFil : any) => { return anex.id !== anexFil.id})
  }

  uploadImage(event: any) {

    let files: File[] = event.target.files;
    var reader : any = new FileReader();

    reader.onloadend = async () => {
      this.avatarImg = reader.result;
    }

    if (files[0]) {
      reader.readAsDataURL(files[0]);

      this.fileService.create(files[0]).subscribe((file : any) => {
        this.avatarFile = file;
      })

    } else {
      this.avatarImg = "assets/sem-foto.jpg";
      this.avatarFile = null;
    }

  }

  changeAddress(event : any) {
    let cep : string = event.target.value;
    cep = cep.replace('-', '');

    this.correiosService.consultaCep(cep).subscribe((data : any) => {
      if(data.cep) {
        this.rhForm.get('street')?.setValue(data.logradouro)
        this.rhForm.get('neighborhood')?.setValue(data.bairro)
        this.rhForm.get('city')?.setValue(data.localidade)
        this.rhForm.get('state')?.setValue(data.uf)
      }
    })
  }

  // add turno
  addTurno(data: any){
    if(data.valid){
      this.turnoService.create(data.value).subscribe((data:any)=>{
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Novo turno adicionado',
          showConfirmButton: false,
          timer: 1500,
          toast: true
        })
        this.turnoForm.get('nome')?.setValue('')
        this.turnoInitializer()
      })
    }else{
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Preencha o campo primeiro',
        showConfirmButton: false,
        timer: 1500,
        toast: true
      })
    }
  }

  // delete turno
  deleteTurno(id: number){
    Swal.fire({
      title: 'Você gostaria de deletar esse turno ?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Deletar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Turno deletado',
          showConfirmButton: false,
          timer: 1500,
          toast: true
        })
        if(id && Number(id)){
          this.turnoService.delete(id).subscribe((data:any)=>{
            this.turnoInitializer()
          })
        }
      } else if (result.isDenied) {
        Swal.fire({
          position: 'top',
          icon: 'info',
          title: 'Turno não deletado',
          showConfirmButton: false,
          timer: 1500,
          toast: true
        })
      }
    })
  }

  // o status mostra se o usuário está ativo ou desativo
  sendForm(data: any) {
    for(let form in this.rhForm['controls']){
      if(this.rhForm['controls'][form].status=="INVALID"){
        console.log(form ,this.rhForm['controls'][form])
      }
      
    }
    if(data.vale=="Não"){
      data.conducaoIda = null
      data.conducaoVolta = null
      data.totalValue = null
      data.linesNames = ''
    }
    if(data.conducaoIda>0 && data.conducaoVolta>0){
      data.totalValue = data.conducaoIda + data.conducaoVolta
      this.rhForm.get('totalValue')?.setValue(data.totalValue)
    }
    if (this.rhForm.valid) {
      data.createdBy = this.user.result.id;
      if (this.avatarFile) {
        data.avatar = this.avatarFile.id;
      }
      data.disabled = !this.desativadoCheckbox;
      if(this.anexes.length > 0) {
        data.anexes = this.anexes
      }
      if (!this.desativadoCheckbox) {
        data.status = 0
      } else {
        data.status = 1
      }
      this.rhService.update(this.rhId, data).subscribe((res: any) => {
        this.vt.name = `${res.name} ${res.surname}`
        this.vt.colabId = res.id
        this.vt.vt = res.vale
        this.vt.rh = res.id
        this.vt.disabled = res.disabled
        this.vt.originalTotal = res.totalValue
        for(let value in this.allVt){
          if(this.allVt[value].colabId == this.vt.colabId){
            this.vt.id = this.allVt[value].id
          }
        }
        console.log(this.vt)
          this.vtService.update(this.vt).subscribe((data:any)=>{
            console.log(data)
          })
        // this.vtService.create(this.vt).subscribe((data:any)=>{})
        if (res.id) {
          this.router.navigate(['sistema', 'rh', 'listar'])
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Colaborador atualizado!',
            showConfirmButton: false,
            timer: 1500,
            toast: true
          })
        }
      }, (err) => {
        console.log(err)
      })
    }else{
      console.log('teste swal')
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Preencha os campos necessários!',
        showConfirmButton: false,
        timer: 1500,
        toast: true
      })
    }
  }

  duplaFuncao(data: any){
    this.rhForm.get('duplaFuncao')?.setValue(Number(data.paycheck)*(20/100))
    data.duplaFuncao=data.paycheck*(20/100)
    console.log(data.duplaFuncao)
  }

  updateFilial(){
    this.filialService.find().subscribe((res: any)=>{
      this.filiais = res
      this.openModal = false
    })
  }

  deleteExame(i: any){
    if(this.exame['controls'][i].get('id')?.value){
      Swal.fire({
        title: 'Você gostaria de deletar esse colaborador ?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Deletar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.exameService.delete(this.exame['controls'][i].get('id')?.value).subscribe((event:any)=>{
            Swal.fire({
              position: 'top',
              icon: 'success',
              title: 'Exame deletado!',
              showConfirmButton: false,
              timer: 1500,
              toast: true
            })
          })
          this.exame.removeAt(i)
        } else if (result.isDenied) {
          Swal.fire({
            position: 'top',
            icon: 'info',
            title: 'O exame não foi deletado!',
            showConfirmButton: false,
            timer: 1500,
            toast: true
          })
        }
      })
    }else{
      this.exame.removeAt(i)
    }
    
  }

  calculoFerias(){
    alert('teste')
  }

  /* 
  ...............................
  ::sistema de adicionar cargos::
  ::...........................::
  */

  addCargo(data: any){
    if(data.valid){
      this.cargoService.create(data.value).subscribe((data: any)=>{
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Cargo adicionado',
          showConfirmButton: false,
          timer: 1500,
          toast: true
        })
        this.cargoForm.get('nome')?.setValue('')
        this.initializer()
      })
    }else{
      Swal.fire('Erro', 'Preencha os campos necessários', 'error')
    }
  }

  delete(id:number){
    Swal.fire({
      title: 'Você gostaria de deletar esse cargo ?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Deletar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Cargo deletado!',
          showConfirmButton: false,
          timer: 1500,
          toast: true
        })
        if(id && Number(id)){
          this.cargoService.delete(id).subscribe((data:any)=>{
            this.initializer()
          })
        }
      } else if (result.isDenied) {
        Swal.fire({
          position: 'top',
          icon: 'info',
          title: 'O cargo não foi deletado!',
          showConfirmButton: false,
          timer: 1500,
          toast: true
        })
      }
    })
  }

  initializer(){
    this.cargoService.find().subscribe((data:any)=>{
      this.selectCargos = data
      console.log(this.selectCargos)
    })
  }

  turnoInitializer(){
    this.turnoService.find().subscribe((data:any)=>{
      this.selectTurno = data
    })
  }

  /* ::::::::::::::::::::::::::::: */


  /* 
  ................................
  ::sistema de trocar de página ::
  ::............................::
  */

  public toggleEstoqueSection(value: string): void {
    this.estoqueSection = value;
  }

  // Data cadastrada
  // data de hj
  // data daqui 45 dias

  // a data atual n pode ser maior que a daqui 45 dias
  // precisamos saber quantos dias se passaram da data cadastrada até a data atual
  // let data = new Date()
  // data.setDate(data.getDate()+45)
  // console.log(data)

  getExpDate(setDate: any){
    // Data atual
    let atual: any = new Date()
    // Data setada
    let setted: any = new Date(setDate)
    setted.setDate(setted.getDate() + 1)
    // Data máxima
    let max: any = new Date()
    max.setDate(setted.getDate() + 45)
    let vacation = new Date()
    vacation.setDate(setted.getDate() + 365)
    this.rhForm.get('vacationDueDate')?.setValue(vacation.toISOString().substring(10,0))
    // if((45-Math.round(Math.abs(atual-max)/(1000 * 3600 * 24)))<=45){
      this.rhForm.get('experiencePeriod')?.setValue((Math.abs(atual-max)/(1000 * 3600 * 24)))
      console.log(Math.ceil(Math.abs(atual.getDate()-max.getDate())/(1000 * 3600 * 24)))
    // }else{
    //   this.rhForm.get('experiencePeriod')?.setValue(45)
    // }
  }

}
