import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';
import { CorreiosService } from 'src/app/services/correios.service';
import { FileService } from 'src/app/services/file.service';
import { FilialService } from 'src/app/services/filial.service';
import { RhService } from 'src/app/services/rh.service';
import { BrazilValidator } from 'src/app/_helpers/brasil';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { getDate } from '../../../../environments/global';

@Component({
  selector: 'app-cadastrar-colaborador',
  templateUrl: './cadastrar-colaborador.component.html',
  styleUrls: ['./cadastrar-colaborador.component.scss']
})
export class CadastrarColaboradorComponent implements OnInit {

  public estoqueSection: string = 'dados-pessoais';
  public getDate: any = getDate;
  public openModal: boolean= false;
  filiais: any[] = []

  public avatarImg: string = './assets/sem-foto.jpg';
  avatarFile: any = {};
  public desativadoCheckbox: boolean = false;
  public rhForm: FormGroup = new FormGroup({
    'disabled': new FormControl(''),
    'name': new FormControl('', [Validators.required]),
    'surname': new FormControl('', [Validators.required]),
    'birthDate': new FormControl(null, [Validators.required]),
    'rg': new FormControl('', [BrazilValidator.isValidRG]),
    'rgExpedicao': new FormControl('', [Validators.required]),
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
    'telephone': new FormControl('', [Validators.required]),
    'whatsapp': new FormControl('', [Validators.required]),
    'emergencyTelephone': new FormControl('', [Validators.required]),
    'personalEmail': new FormControl('', [Validators.required]),
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
    'lastExam': new FormControl(null),
    'nextExam': new FormControl(null), 
    'vacationDueDate': new FormControl(null),
    'workDays': new FormControl(null),
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
    'falta': new FormArray([])
  })

  user: any = {}
  data = new Date()
  anexesRepo = environment.apiUrl + 'file/download/'

  constructor(
    private readonly fileService: FileService,
    private readonly rhService: RhService,
    private readonly authService: AuthenticationService,
    private readonly correiosService: CorreiosService,
    private readonly router: Router,
    private readonly filialService: FilialService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.currentUserValue
    this.updateFilial()
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

  public toggleDesativadoCheckbox(): void {
    this.desativadoCheckbox === true ? this.desativadoCheckbox = false : this.desativadoCheckbox = true;
  }

  public log(e: any): void {
    // console.log(e);    
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
  
  duplaFuncao(data: any){
    data.duplaFuncao=Number(data.paycheck)*(20/100)
    console.log(data.duplaFuncao)
  }
  
  sendForm(data: any) {
    // console.log(data)
    this.duplaFuncao(data)
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
      this.rhService.create(data).subscribe((res: any) => {
        if (res.id) {
          this.router.navigate(['sistema', 'rh', 'listar'])
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

  adicionarFalta(){
    this.faltas.push(
      new FormGroup({
        'data': new FormControl(null),
        'tipo': new FormControl(''),
        'id': new FormControl(null)
      })
    )
  }

   /* 
  ................................
  ::sistema de trocar de página ::
  ::............................::
  */

  public toggleEstoqueSection(value: string): void {
    this.estoqueSection = value;
  }

}
