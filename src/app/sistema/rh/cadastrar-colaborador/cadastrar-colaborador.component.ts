import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { time } from 'console';
import { AddTurnoService } from 'src/app/services/add-turno.service';
import { AuthenticationService } from 'src/app/services/auth.service';
import { CargoService } from 'src/app/services/cargo.service';
import { CorreiosService } from 'src/app/services/correios.service';
import { FileService } from 'src/app/services/file.service';
import { FilialService } from 'src/app/services/filial.service';
import { RhService } from 'src/app/services/rh.service';
import { VtService } from 'src/app/services/vt.service';
import { BrazilValidator } from 'src/app/_helpers/brasil';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { getDate } from '../../../../environments/global';
import { StatusExame } from '../enum/status.exame.enum';

@Component({
  selector: 'app-cadastrar-colaborador',
  templateUrl: './cadastrar-colaborador.component.html',
  styleUrls: ['./cadastrar-colaborador.component.scss']
})
export class CadastrarColaboradorComponent implements OnInit{

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
  

  public estoqueSection: string = 'dados-pessoais';
  public getDate: any = getDate;
  public openModal: boolean= false;
  public openCargoModal: boolean = true
  public vt: any = {
    'name': null,
    'vt': null,
    'rh': null,
    'workDays': null,
    'total': null,
    'disabled': null,
    'colabId': null,
    'originalTotal': null
  }
  filiais: any[] = []

  public avatarImg: string = './assets/sem-foto.jpg';
  avatarFile: any = {};
  public dupla: number = 10
  public salario: number = 10
  public desativadoCheckbox: boolean = false;
  public rhForm: FormGroup = new FormGroup({
    'disabled': new FormControl(''),
    'name': new FormControl('', [Validators.required]),
    'surname': new FormControl('', [Validators.required]),
    'birthDate': new FormControl(null, [Validators.required]),
    'rg': new FormControl('', [BrazilValidator.isValidRG]),
    'rgExpedicao': new FormControl(null, [Validators.required]),
    'rgOrgaoEmissor': new FormControl('', [Validators.required]),
    'cpfcnpj': new FormControl('', [BrazilValidator.isValidCpf]),
    'cnh': new FormControl(''),
    'gender': new FormControl(''),
    'civilState': new FormControl('', [Validators.required]),
    'deficiency': new FormControl(''),
    'scholarship': new FormControl(''),
    'nacionality': new FormControl(''),
    'naturality': new FormControl(''),
    'motherName': new FormControl(''),
    'fatherName': new FormControl(''),
    'cep': new FormControl('', [BrazilValidator.isValidCEP]),
    'street': new FormControl(''),
    'addressNumber': new FormControl(''),
    'addressComplement': new FormControl(''),
    'neighborhood': new FormControl(''),
    'city': new FormControl(''),
    'state': new FormControl(''),
    'telephone': new FormControl(''),
    'whatsapp': new FormControl(''),
    'emergencyTelephone': new FormControl('', [Validators.required]),
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
    'mei': new FormControl('', [BrazilValidator.isValidCpf]),
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
    'duplaFuncao': new FormControl(''),
    'vale': new FormControl('', [Validators.required]),
    'pix': new FormControl(''),
    'pcd': new FormControl('', [Validators.required]),
    'abafador': new FormControl(''),
    'lastDelveryAbafador': new FormControl(''),
    'exame': new FormArray([])
  })

  user: any = {}
  data = new Date()
  anexesRepo = environment.apiUrl + 'file/download/'

  constructor(
    protected readonly fileService: FileService,
    protected readonly rhService: RhService,
    protected readonly authService: AuthenticationService,
    protected readonly correiosService: CorreiosService,
    protected readonly router: Router,
    protected readonly filialService: FilialService,
    protected readonly vtService: VtService,
    protected readonly cargoService: CargoService,
    protected readonly turnoService:  AddTurnoService
  ) { }

  ngOnInit(): void {
    this.turnoService.find().subscribe((data:any)=>{
      this.selectTurno = data
    })
    this.cargoService.find().subscribe((data:any)=>{
      this.selectCargos = data
    })
    this.user = this.authService.currentUserValue
    this.updateFilial()
  }

  get exame(){
    return this.rhForm.get('exame') as FormArray;
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
        'status': new FormControl(StatusExame.PROXIMO) 
      })
    )
  }

  public toggleDesativadoCheckbox(): void {
    this.desativadoCheckbox === true ? this.desativadoCheckbox = false : this.desativadoCheckbox = true;
  }

  public log(e: any): void {
    // console.log(e);    
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
    var reader: any = new FileReader();

    reader.onloadend = async () => {
      this.avatarImg = reader.result;
    }

    if (files[0]) {
      reader.readAsDataURL(files[0]);

      this.fileService.create(files[0]).subscribe((file: any) => {
        this.avatarFile = file;
      })

    } else {
      this.avatarImg = "assets/sem-foto.jpg";
      this.avatarFile = null;
    }

  }

  changeAddress(event: any) {
    let cep: string = event.target.value;
    cep = cep.replace('-', '');

    this.correiosService.consultaCep(cep).subscribe((data: any) => {
      if (data.cep) {
        this.rhForm.get('street')?.setValue(data.logradouro)
        this.rhForm.get('neighborhood')?.setValue(data.bairro)
        this.rhForm.get('city')?.setValue(data.localidade)
        this.rhForm.get('state')?.setValue(data.uf)
      }
    })
  }
  
  // duplaFuncao(data: any){
  //   this.rhForm.get('duplaFuncao')?.setValue(Number(data.paycheck)*(20/100))
  //   data.duplaFuncao=Number(data.paycheck)*(20/100)
  //   console.log(data.duplaFuncao)
  // }
  
  sendForm(data: any) {
    for(let control in this.rhForm['controls']){
      if(this.rhForm['controls'][control].valid==false){
        console.log(this.rhForm['controls'][control])
      }
    }
    console.log(this.rhForm)
    if(data.workDays>0 && data.conducaoIda>0 && data.conducaoVolta>0){
      data.totalValue = data.conducaoIda + data.conducaoVolta * data.workDays
    }
    if (this.rhForm.valid){
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
      data.exame = [...data.exame]
      this.rhService.create(data).subscribe((res: any) => {
        this.vt.name = `${res.name} ${res.surname}`
        this.vt.colabId = res.id
        this.vt.vt = res.vale
        this.vt.rh = res.id
        this.vt.originalTotal = res.totalValue
        this.vt.disabled = res.disabled
        this.vtService.create(this.vt).subscribe((data:any)=>{})
        if (res.id) {
          this.router.navigate(['sistema', 'rh', 'listar'])
          Swal.fire({
            position: 'top-right',
            icon: 'success',
            title: 'Colaborador adicionado',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }, (err) => {
        console.log(err)
      })
    }else{
      console.log('teste swal')
      Swal.fire('Erro', 'Preencha os campos necessários', 'error')
    }
  }

  updateFilial(){
    this.filialService.find().subscribe((res: any)=>{
      this.filiais = res
      this.openModal = false
    })
  }

  deleteExame(exame: any){
    this.exame.removeAt(exame)
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
          position: 'top-right',
          icon: 'success',
          title: 'Cargo adicionado',
          showConfirmButton: false,
          timer: 1500
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
        Swal.fire('Cargo Deletado', '', 'success')
        if(id && Number(id)){
          this.cargoService.delete(id).subscribe((data:any)=>{
            this.initializer()
          })
        }
      } else if (result.isDenied) {
        Swal.fire('O cargo não foi deletado', '', 'info')
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

  
  turnoInitializer(){
    this.turnoService.find().subscribe((data:any)=>{
      this.selectTurno = data
    })
  }

  initializer(){
    this.cargoService.find().subscribe((data:any)=>{
      this.selectCargos = data
      console.log(this.selectCargos)
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

  /* ::::::::::::::::::::::::::::: */


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
    console.log()
    // vacation.setDate(setted.getDate() + 365)
    // this.rhForm.get('vacationDueDate')?.setValue(vacation.toISOString().substring(10,0))
    // if((45-Math.ceil(Math.abs(atual-max)/(1000 * 3600 * 24)))<=45){
    //   this.rhForm.get('experiencePeriod')?.setValue(45-Math.ceil(Math.abs(atual-max)/(1000 * 3600 * 24)))
    //   console.log(Math.ceil(Math.abs(atual.getDate()-max.getDate())/(1000 * 3600 * 24)))
    // }else{
    //   this.rhForm.get('experiencePeriod')?.setValue(45)
    // }
  }
}
