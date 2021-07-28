import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';
import { CorreiosService } from 'src/app/services/correios.service';
import { FileService } from 'src/app/services/file.service';
import { RhService } from 'src/app/services/rh.service';
import { BrazilValidator } from 'src/app/_helpers/brasil';
import { getDate } from '../../../../environments/global';

@Component({
  selector: 'app-cadastrar-colaborador',
  templateUrl: './cadastrar-colaborador.component.html',
  styleUrls: ['./cadastrar-colaborador.component.scss']
})
export class CadastrarColaboradorComponent implements OnInit {

  public getDate: any = getDate;

  public avatarImg: string = './assets/sem-foto.jpg';
  avatarFile: any = {};
  public desativadoCheckbox: boolean = false;
  public rhForm: FormGroup = new FormGroup({
    'disabled': new FormControl(''),
    'name': new FormControl(''),
    'surname': new FormControl(''),
    'birthDate': new FormControl(null),
    'rg': new FormControl('', [BrazilValidator.isValidRG]),
    'rgExpedicao': new FormControl(''),
    'rgOrgaoEmissor': new FormControl(''),
    'cnpj': new FormControl('', [BrazilValidator.isValidCpf]),
    'cnh': new FormControl(''),
    'gender': new FormControl(''),
    'civilState': new FormControl(''),
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
    'emergencyTelephone': new FormControl(''),
    'personalEmail': new FormControl(''),
    'corporativeEmail': new FormControl(''),
    'department': new FormControl(''),
    'role': new FormControl(''),
    'contractType': new FormControl(''),
    'shift': new FormControl(''),
    'paycheck': new FormControl(''),
    'admission': new FormControl(null),
    'experiencePeriod': new FormControl(''),
    'fireDate': new FormControl(null),
    'pis': new FormControl(''),
    'mei': new FormControl('', [BrazilValidator.isValidCpf]),
    'bank': new FormControl(''),
    'bankAccountType': new FormControl(''),
    'bankAgency': new FormControl(''),
    'bankAccountNumber': new FormControl(''),
  })

  user: any = {}

  constructor(
    private readonly fileService: FileService,
    private readonly rhService: RhService,
    private readonly authService: AuthenticationService,
    private readonly correiosService: CorreiosService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.authService.currentUserValue
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

  sendForm(data: any) {
    if (this.rhForm.valid) {
      data.createdBy = this.user.result.id;
      if (this.avatarFile) {
        data.avatar = this.avatarFile.id;
      }
      data.disabled = !this.desativadoCheckbox;
      if (!this.desativadoCheckbox) {
        data.status = 0
      } else {
        data.status = 1
      }
      this.rhService.create(data).subscribe((res: any) => {
        if (res.id) {
          this.router.navigate(['sistema', 'rh', 'listar'])
        }
      })
    }
  }

}
