import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';
import { CorreiosService } from 'src/app/services/correios.service';
import { FileService } from 'src/app/services/file.service';
import { RhService } from 'src/app/services/rh.service';
import { BrazilValidator } from 'src/app/_helpers/brasil';
import { environment } from 'src/environments/environment';
import { getDate } from '../../../../environments/global';

@Component({
  selector: 'app-editar-colaborador',
  templateUrl: './editar-colaborador.component.html',
  styleUrls: ['./editar-colaborador.component.scss']
})
export class EditarColaboradorComponent implements OnInit {

  public getDate: any = getDate;

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
    'paycheck' : new FormControl(''),
    'admission' : new FormControl(null),
    'experiencePeriod' : new FormControl(''),
    'fireDate' : new FormControl(null),
    'pis' : new FormControl(''),
    'mei' : new FormControl('', [BrazilValidator.isValidCpf]),
    'bank' : new FormControl(''),
    'bankAccountType' : new FormControl(''),
    'bankAgency' : new FormControl(''),
    'bankAccountNumber' : new FormControl(''),
  })

  user : any = {}
  rhId : number = 0;

  constructor(
    private readonly fileService : FileService,
    private readonly route : ActivatedRoute,
    private readonly rhService : RhService,
    private readonly authService : AuthenticationService,
    private readonly correiosService : CorreiosService,
    private readonly router : Router
  ) { }

  ngOnInit(): void {    
    this.user = this.authService.currentUserValue
    const routeParams = this.route.snapshot.paramMap;
    this.rhId = Number(routeParams.get('id'));
    this.rhService.findOne(this.rhId).subscribe((data : any) => {
      if(data.avatar) {
        this.avatarImg = environment.apiUrl + 'file/download/' + data.avatar.fileName
      }
      this.rhForm.get('name')?.setValue(data.name)
      this.rhForm.get('surname')?.setValue(data.surname)
      this.rhForm.get('birthDate')?.setValue(data.birthDate)
      this.rhForm.get('rg')?.setValue(data.rg)
      this.rhForm.get('rgExpedicao')?.setValue(data.rgExpedicao)
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
      this.rhForm.get('admission')?.setValue(data.admission)
      this.rhForm.get('experiencePeriod')?.setValue(data.experiencePeriod)
      this.rhForm.get('fireDate')?.setValue(data.fireDate)
      this.rhForm.get('pis')?.setValue(data.pis)
      this.rhForm.get('mei')?.setValue(data.mei)
      this.rhForm.get('bank')?.setValue(data.bank)
      this.rhForm.get('bankAccountType')?.setValue(data.bankAccountType)
      this.rhForm.get('bankAgency')?.setValue(data.bankAgency)
      this.rhForm.get('bankAccountNumber')?.setValue(data.bankAccountNumber)

    });
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

  public log(e: any):void {
    // console.log(e);    
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

  sendForm(data : any) {
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
      console.log(data)
      this.rhService.update(this.rhId, data).subscribe((res: any) => {
        if (res.id) {
          this.router.navigate(['sistema', 'rh', 'listar'])
        }
      })
    }
  }

}
