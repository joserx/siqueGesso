/* Ver o porque as filiais não estão vindo do banco e o porque não está abrindo o 
modal de filial */

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { on } from 'process';
import { AuthenticationService } from 'src/app/services/auth.service';
import { CorreiosService } from 'src/app/services/correios.service';
import { FileService } from 'src/app/services/file.service';
import { FilialService } from 'src/app/services/filial.service';
import { RhService } from 'src/app/services/rh.service';
import { BrazilValidator } from 'src/app/_helpers/brasil';
import { environment } from 'src/environments/environment';
import { getDate } from '../../../../environments/global';
// import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editar-colaborador',
  templateUrl: './editar-colaborador.component.html',
  styleUrls: ['./editar-colaborador.component.scss']
})
export class EditarColaboradorComponent implements OnInit {

  public getDate: any = getDate;
  public openModal: boolean= false;
  filiais: any[] = []
  colabFaltas: any[] = [];

  avatarImg = 'assets/sem-foto.jpg';
  avatarFile : any = null;
  public desativadoCheckbox: boolean = false;
  public rhForm : FormGroup = new FormGroup({
    'disabled' : new FormControl(''),
    'name' : new FormControl(''),
    'surname' : new FormControl(''),
    'birthDate' : new FormControl(null),
    'rg' : new FormControl('', [BrazilValidator.isValidRG]),
    'rgExpedicao' : new FormControl(''),
    'rgOrgaoEmissor' : new FormControl(''),
    'cnpj' : new FormControl('', [BrazilValidator.isValidCpf]),
    'cnh' : new FormControl(''),
    'gender' : new FormControl(''),
    'civilState' : new FormControl(''),
    'deficiency' : new FormControl(''),
    'scholarship' : new FormControl(''),
    'nacionality' : new FormControl(''),
    'naturality' : new FormControl(''),
    'motherName' : new FormControl(''),
    'fatherName' : new FormControl(''),
    'cep' : new FormControl('', [BrazilValidator.isValidCEP]),
    'street' : new FormControl(''),
    'addressNumber' : new FormControl(''),
    'addressComplement' : new FormControl(''),
    'neighborhood' : new FormControl(''),
    'city' : new FormControl(''),
    'state' : new FormControl(''),
    'telephone' : new FormControl(''),
    'whatsapp' : new FormControl(''),
    'emergencyTelephone' : new FormControl(''),
    'personalEmail' : new FormControl(''),
    'corporativeEmail' : new FormControl(''),
    'department' : new FormControl(''),
    'role' : new FormControl(''),
    'contractType' : new FormControl(''),
    'shift' : new FormControl(''),
    'paycheck' : new FormControl(null),
    'admission' : new FormControl(null),
    'experiencePeriod' : new FormControl(''),
    'fireDate' : new FormControl(null),
    'pis' : new FormControl(''),
    'mei' : new FormControl('', [BrazilValidator.isValidCpf]),
    'bank' : new FormControl(''),
    'bankAccountType' : new FormControl(''),
    'bankAgency' : new FormControl(''),
    'bankAccountNumber' : new FormControl(''),
    'filial': new FormControl(''),
    'lastExam': new FormControl(''),
    'nextExam': new FormControl(''), 
    'vacationDueDate': new FormControl(''),
    'workDays': new FormControl(null),
    'conducaoIda': new FormControl(null),
    'conducaoVolta': new FormControl(null),
    'linesNames': new FormControl(''), 
    'totalValue': new FormControl(null),
    'tshirtSize': new FormControl(''),
    'lastDeliveryTshirt': new FormControl(''),
    'pantsSize': new FormControl(''),
    'lastDeliveryPants' : new FormControl(''),
    'shoesSize': new FormControl(''),
    'lastDeliveryShoes': new FormControl(''),
    'beltSize': new FormControl(''),
    'lastDeliveryBelt': new FormControl(''),
    'glovesSize': new FormControl(''),
    'lastDeliveryGloves': new FormControl(''),
    'jacketSize': new FormControl(''),
    'lastDeliveryJacket': new FormControl(''),
    'duplaFuncao': new FormControl(null),
    'falta': new FormArray([]),
    'editarFalta': new FormArray([])
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
    private readonly filialService: FilialService
  ) { }

  ngOnInit(): void {  
    this.user = this.authService.currentUserValue
    const routeParams = this.route.snapshot.paramMap;
    this.rhId = Number(routeParams.get('id'));
    this.rhService.findOne(this.rhId).subscribe((data: any)=>{
      this.colabFaltas = data.falta;
      console.log(this.colabFaltas)
      if(this.colabFaltas.length>0){
        console.log('teste')
        this.editarFalta.push(
          new FormControl({
            'data' : new FormControl(''),
            'tipo': new FormControl('')
          })
        )
      }
    })
    this.rhService.findOne(this.rhId).subscribe((data : any) => {
      if(data.anexes && data.anexes.length > 0) {
        this.anexes = data.anexes
      }
      if(data.avatar) {
        this.avatarImg = environment.apiUrl + 'file/download/' + data.avatar.fileName
      }
      this.rhForm.get('name')?.setValue(data.name)
      this.rhForm.get('surname')?.setValue(data.surname)
      this.rhForm.get('birthDate')?.setValue(String(data.birthDate.substring(10, 0)))
      this.rhForm.get('rg')?.setValue(data.rg)
      this.rhForm.get('rgExpedicao')?.setValue(String(data.rgExpedicao.substring(10, 0)))
      this.rhForm.get('rgOrgaoEmissor')?.setValue(data.rgOrgaoEmissor)
      this.rhForm.get('cnpj')?.setValue(data.cnpj)
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
      this.rhForm.get('admission')?.setValue(String(data.admission.substring(10, 0)))
      this.rhForm.get('experiencePeriod')?.setValue(data.experiencePeriod)
      this.rhForm.get('fireDate')?.setValue(String(data.fireDate.substring(10, 0)))
      this.rhForm.get('pis')?.setValue(data.pis)
      this.rhForm.get('mei')?.setValue(data.mei)
      this.rhForm.get('bank')?.setValue(data.bank)
      this.rhForm.get('bankAccountType')?.setValue(data.bankAccountType)
      this.rhForm.get('bankAgency')?.setValue(data.bankAgency)
      this.rhForm.get('bankAccountNumber')?.setValue(data.bankAccountNumber)
      this.rhForm.get('filial')?.setValue(data.filial)
      this.rhForm.get('lastExam')?.setValue(String(data.lastExam.substring(10, 0))),
      this.rhForm.get('nextExam')?.setValue(String(data.nextExam.substring(10, 0))),
      this.rhForm.get('vacationDueDate')?.setValue(String(data.vacationDueDate.substring(10, 0)))
      this.rhForm.get('workDays')?.setValue(data.workDays)
      this.rhForm.get('conducaoIda')?.setValue(data.conducaoIda)
      this.rhForm.get('conducaoVolta')?.setValue(data.conducaoVolta)
      this.rhForm.get('linesNames')?.setValue(data.linesNames)
      this.rhForm.get('totalValue')?.setValue(data.totalValue)
      this.rhForm.get('duplaFuncao')?.setValue(data.duplaFuncao)
      this.rhForm.get('tshirtSize')?.setValue(data.tshirtSize)
      this.rhForm.get('lastDeliveryTshirt')?.setValue(String(data.lastDeliveryTshirt.substring(10, 0)))
      this.rhForm.get('pantsSize')?.setValue(data.pantsSize)
      this.rhForm.get('lastDeliveryPants')?.setValue(String(data.lastDeliveryPants.substring(10, 0)))
      this.rhForm.get('shoesSize')?.setValue(data.shoesSize)
      this.rhForm.get('lastDeliveryShoes')?.setValue(String(data.lastDeliveryShoes.substring(10, 0)))
      this.rhForm.get('beltSize')?.setValue(data.beltSize)
      this.rhForm.get('lastDeliveryBelt')?.setValue(String(data.lastDeliveryBelt.substring(10, 0)))
      this.rhForm.get('glovesSize')?.setValue(data.glovesSize)
      this.rhForm.get('lastDeliveryGloves')?.setValue(String(data.lastDeliveryGloves.substring(10, 0)))
      this.rhForm.get('jacketSize')?.setValue(data.jacketSize)
      this.rhForm.get('lastDeliveryJacket')?.setValue(String(data.lastDeliveryJacket.substring(10, 0)))
    });
    this.updateFilial()
    this.filialService.find().subscribe((res: any)=>{
      this.filiais = res
      console.log(this.filiais)
    })
  }

  get faltas(){
    return this.rhForm.get('falta') as FormArray;
  }

  get editarFalta(){
    return this.rhForm.get('editarFalta') as FormArray;
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

  public toggleDesativadoCheckbox(data: any): void {
    this.desativadoCheckbox === true ? this.desativadoCheckbox = false : this.desativadoCheckbox = true;
  }

  public log(e: any):void {
    
  }

  anexes : any[]= [];

  addFile(event : any) {
    let files: File[] = event.target.files;

    if (files[0]) {
      this.fileService.create(files[0]).subscribe((file: any) => {
        this.anexes.push(file);
      })
    } else {
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
  // o status mostra se o usuário está ativo ou desativo
  sendForm(data : any) {
    if(data.workDays>0 && data.conducaoIda>0 && data.conducaoVolta>0){
      data.totalValue = data.conducaoIda + data.conducaoVolta * data.workDays
      console.log(data)
    }
    if (this.rhForm.valid) {
      data.createdBy = this.user.result.id;
      if(this.avatarFile) {
        data.avatar = this.avatarFile.id;
      }
      data.disabled = !this.desativadoCheckbox;
      if(!this.desativadoCheckbox) {
        data.status = 0
      } else {
        data.status = 1
      }
      if(this.anexes.length > 0) {
        data.anexes = this.anexes
      }
      console.log(data)
      this.rhService.update(this.rhId, data).subscribe((res: any) => {
        if (res.id) {
          this.router.navigate(['sistema', 'rh', 'listar'])
        }
      })
    }
    console.log(data);
  }

  duplaFuncao(data: any){
    data.duplaFuncao=data.paycheck*(20/100)
    console.log(data.duplaFuncao)
  }

  updateFilial(){
    this.filialService.find().subscribe((res: any)=>{
      this.filiais = res
      this.openModal = false
    })
  }

  adicionarFalta(){
    this.faltas.push(
      new FormGroup({
        'dataFalta': new FormControl(''),
        'tipoFalta': new FormControl('')
      })
    )
  }

}
