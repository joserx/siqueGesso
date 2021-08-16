import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { CorreiosService } from 'src/app/services/correios.service';
import { BrazilValidator } from 'src/app/_helpers/brasil';
import { getDate } from 'src/environments/global';

@Component({
  selector: 'app-editar-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.scss']
})
export class EditarCadastrarClienteComponent implements OnInit {

  public getDate: any = getDate;
  public desativadoCheckbox: boolean = false;
  public tipoPessoa: string = 'fisica';
  clienteForm : FormGroup = new FormGroup({
    'name' : new FormControl(null, [Validators.required]),
    'surname' : new FormControl(null, [Validators.required]),
    'cpf' : new FormControl(null, [Validators.required, BrazilValidator.isValidCpf]),
    'cnpj' : new FormControl(null, [BrazilValidator.isValidCpf]),
    'rg' : new FormControl(null, [Validators.required, BrazilValidator.isValidRG]),
    'cellphone' : new FormControl(null, [Validators.required]),
    'companyCellphone' : new FormControl(null),
    'telephone' : new FormControl(null, [Validators.required]),
    'companyTelephone' : new FormControl(null),
    'birthDate' : new FormControl(null, [Validators.required]),
    'birthDateCompany' : new FormControl(null),
    'subcription' : new FormControl(null),
    'socialReason' : new FormControl(null),
    'fantasyName' : new FormControl(null),
    'ramal' : new FormControl(null),
    'email' : new FormControl(null, [Validators.required, Validators.email]),
    'companyEmail' : new FormControl(null, [Validators.email]),
    'addresses' : new FormArray([])
  })
  client : any = {};
  clientId : number = 0;

  public enderecos: any = [{}];

  constructor(
    private readonly clientService : ClientService,
    private readonly correiosService : CorreiosService,
    private readonly router : Router,
    private readonly route : ActivatedRoute
  ) { 

  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.clientId = Number(routeParams.get('id'));
    console.log(this.clientId)
    this.clientService.findOne(this.clientId).subscribe((data : any) => {
      this.client = data
      console.log(this.client)
    }, (err) => {
      console.log(err)
    })
  }

  get addresses() {
    return this.clienteForm.get('addresses') as FormArray;
  }

  public adicionarEndereco(): void {
    this.addresses.push(
      new FormGroup({
        'cep' : new FormControl(null, [BrazilValidator.isValidCEP]),
        'address' : new FormControl(null),
        'number' : new FormControl(null),
        'complement' : new FormControl(null),
        'neighborhood' : new FormControl(null),
        'city' : new FormControl(null),
        'state' : new FormControl(null),
        'country' : new FormControl(null),
      })
    )
  }

  public removerEndereco(id: number): void {
    this.addresses.removeAt(id)
    console.log(this.addresses);
  }

  public toggleDesativadoCheckbox(): void {
    this.desativadoCheckbox === true ? this.desativadoCheckbox = false : this.desativadoCheckbox = true;
  }

  public toggleTipoPessoa(value: string): void {
    this.tipoPessoa = value;
    if(value == 'fisica') {
      // Person validators
      this.clienteForm.controls.name.setValidators([Validators.required])      
      this.clienteForm.controls.surname.setValidators([Validators.required])      
      this.clienteForm.controls.cpf.setValidators([Validators.required, BrazilValidator.isValidCpf])      
      this.clienteForm.controls.rg.setValidators([Validators.required, BrazilValidator.isValidRG])      
      this.clienteForm.controls.cellphone.setValidators([Validators.required])      
      this.clienteForm.controls.telephone.setValidators([Validators.required])      
      this.clienteForm.controls.birthDate.setValidators([Validators.required])      
      this.clienteForm.controls.email.setValidators([Validators.required, Validators.email])      
      // Clear company validators
      this.clienteForm.controls.fantasyName.clearValidators()
      this.clienteForm.controls.fantasyName.updateValueAndValidity()
      this.clienteForm.controls.socialReason.clearValidators()
      this.clienteForm.controls.socialReason.updateValueAndValidity()
      this.clienteForm.controls.subcription.clearValidators()
      this.clienteForm.controls.subcription.updateValueAndValidity()
      this.clienteForm.controls.cnpj.clearValidators()
      this.clienteForm.controls.cnpj.updateValueAndValidity()
      this.clienteForm.controls.companyCellphone.clearValidators()
      this.clienteForm.controls.companyCellphone.updateValueAndValidity()
      this.clienteForm.controls.companyTelephone.clearValidators()
      this.clienteForm.controls.companyTelephone.updateValueAndValidity()
      this.clienteForm.controls.birthDateCompany.clearValidators()
      this.clienteForm.controls.birthDateCompany.updateValueAndValidity()
      this.clienteForm.controls.ramal.clearValidators()
      this.clienteForm.controls.ramal.updateValueAndValidity()
      this.clienteForm.controls.companyEmail.clearValidators()
      this.clienteForm.controls.companyEmail.updateValueAndValidity()
    } else if(value == 'juridica') {
      // Company validators
      this.clienteForm.controls.fantasyName.setValidators([Validators.required])      
      this.clienteForm.controls.socialReason.setValidators([Validators.required])      
      this.clienteForm.controls.subcription.setValidators([Validators.required])      
      this.clienteForm.controls.cnpj.setValidators([Validators.required, BrazilValidator.isValidCpf])      
      this.clienteForm.controls.companyCellphone.setValidators([Validators.required])      
      this.clienteForm.controls.companyTelephone.setValidators([Validators.required])      
      this.clienteForm.controls.birthDateCompany.setValidators([Validators.required])      
      this.clienteForm.controls.ramal.setValidators([Validators.required])      
      this.clienteForm.controls.companyEmail.setValidators([Validators.required, Validators.email])
      //Clear client validators
      this.clienteForm.controls.name.clearValidators()      
      this.clienteForm.controls.name.updateValueAndValidity()      
      this.clienteForm.controls.surname.clearValidators()
      this.clienteForm.controls.surname.updateValueAndValidity()
      this.clienteForm.controls.cpf.clearValidators()
      this.clienteForm.controls.cpf.updateValueAndValidity()
      this.clienteForm.controls.rg.clearValidators()
      this.clienteForm.controls.rg.updateValueAndValidity()
      this.clienteForm.controls.cellphone.clearValidators()
      this.clienteForm.controls.cellphone.updateValueAndValidity()
      this.clienteForm.controls.telephone.clearValidators()
      this.clienteForm.controls.telephone.updateValueAndValidity()
      this.clienteForm.controls.birthDate.clearValidators()
      this.clienteForm.controls.birthDate.updateValueAndValidity()
      this.clienteForm.controls.email.clearValidators()
      this.clienteForm.controls.email.updateValueAndValidity()
    }
  }

  changeAddress(event : any, i : number) {
    let cep: string = event.target.value;
    cep = cep.replace('-', '');

    this.correiosService.consultaCep(cep).subscribe((data: any) => {
      if (data.cep) {
        (this.clienteForm.controls.addresses as FormArray).at(i).get('address')?.setValue(data.logradouro);
        (this.clienteForm.controls.addresses as FormArray).at(i).get('neighborhood')?.setValue(data.bairro);
        (this.clienteForm.controls.addresses as FormArray).at(i).get('city')?.setValue(data.localidade);
        (this.clienteForm.controls.addresses as FormArray).at(i).get('state')?.setValue(data.uf);
      }
    })
  }

  submitClient(data : any) {
    if(this.clienteForm.valid) {
      if (!this.desativadoCheckbox) {
        data.disabled = true
      } else {
        data.disabled = false
      }
      this.clientService.create(data).subscribe((dataReturn) => {
        this.router.navigate(['sistema', 'vendas', 'clientes', 'listar'])
      }, (err) => {
        console.log(err)
      })
    }
  }

}
