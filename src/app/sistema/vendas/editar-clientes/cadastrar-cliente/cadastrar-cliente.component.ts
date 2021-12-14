import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { CorreiosService } from 'src/app/services/correios.service';
import { BrazilValidator } from 'src/app/_helpers/brasil';
import { getDate } from 'src/environments/global';
import Swal from 'sweetalert2';

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
    'disabled': new FormControl(''),
    'name' : new FormControl(null, [Validators.required]),
    'surname' : new FormControl(null, [Validators.required]),
    'cpf' : new FormControl('', [Validators.required, ]),
    'cnpj' : new FormControl('', [BrazilValidator.isValidCpf()]),
    'rg' : new FormControl('', [Validators.required]),
    'cellphone' : new FormControl(null, [Validators.required]),
    'companyCellPhone' : new FormControl(null),
    'telephone' : new FormControl(null, [Validators.required]),
    'companyTelephone' : new FormControl(null),
    'birthDate' : new FormControl(null, [Validators.required]),
    'birthDateCompany' : new FormControl(null),
    'subscription' : new FormControl(null),
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
      if(this.client.cnpj!=null){
        this.tipoPessoa = 'juridica'
      }
      this.clienteForm.get('disabled')?.setValue(this.client.disabled)
      this.desativadoCheckbox = this.clienteForm.get('disabled')?.value
      /* CPF */
      this.clienteForm.get('name')?.setValue(this.client.name)
      this.clienteForm.get('surname')?.setValue(this.client.surname)
      this.clienteForm.get('cpf')?.setValue(this.client.cpf)
      this.clienteForm.get('rg')?.setValue(this.client.rg)
      this.clienteForm.get('cellphone')?.setValue(this.client.cellphone)
      this.clienteForm.get('telephone')?.setValue(this.client.telephone)
      this.clienteForm.get('birthDate')?.setValue(this.client.birthDate!=null? this.client.birthDate.substring(10, 0) : null)
      this.clienteForm.get('email')?.setValue(this.client.email)
      /* CNPJ */
      this.clienteForm.get("cnpj")?.setValue(this.client.cnpj)
      this.clienteForm.get("subscription")?.setValue(this.client.subscription)
      this.clienteForm.get("socialReason")?.setValue(this.client.socialReason)
      this.clienteForm.get("fantasyName")?.setValue(this.client.fantasyName)
      this.clienteForm.get("birthDateCompany")?.setValue(this.client.birthDateCompany!= null? this.client.birthDateCompany.substring(10, 0) : null)
      this.clienteForm.get("companyEmail")?.setValue(this.client.companyEmail)
      this.clienteForm.get("companyCellPhone")?.setValue(this.client.companyCellPhone)
      this.clienteForm.get("companyTelephone")?.setValue(this.client.companyTelephone)
      this.clienteForm.get("ramal")?.setValue(this.client.ramal)
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
        'cep' : new FormControl(null, [BrazilValidator.isValidCEP()]),
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
    if(this.desativadoCheckbox === true){
      this.desativadoCheckbox = false
      this.clienteForm.get('disabled')?.setValue(false)
    }else{
      this.desativadoCheckbox = true
      this.clienteForm.get('disabled')?.setValue(true)
    }
  }

  public toggleTipoPessoa(value: string): void {
    this.tipoPessoa = value;
    if(value == 'fisica') {
      // Person validators
      this.clienteForm.controls.name.setValidators([Validators.required])     
      this.clienteForm.controls.surname.setValidators([Validators.required])      
      this.clienteForm.controls.cpf.setValidators([Validators.required, BrazilValidator.isValidCpf()])      
      this.clienteForm.controls.rg.setValidators([Validators.required, BrazilValidator.isValidRG()])      
      this.clienteForm.controls.cellphone.setValidators([Validators.required])      
      this.clienteForm.controls.telephone.setValidators([Validators.required])      
      this.clienteForm.controls.birthDate.setValidators([Validators.required])      
      this.clienteForm.controls.email.setValidators([Validators.required, Validators.email])      
      // Clear company validators
      this.clienteForm.controls.fantasyName.clearValidators()
      this.clienteForm.controls.fantasyName.updateValueAndValidity()
      this.clienteForm.controls.socialReason.clearValidators()
      this.clienteForm.controls.socialReason.updateValueAndValidity()
      this.clienteForm.controls.subscription.clearValidators()
      this.clienteForm.controls.subscription.updateValueAndValidity()
      this.clienteForm.controls.cnpj.clearValidators()
      this.clienteForm.controls.cnpj.updateValueAndValidity()
      this.clienteForm.controls.companyCellPhone.clearValidators()
      this.clienteForm.controls.companyCellPhone.updateValueAndValidity()
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
      this.clienteForm.controls.subscription.setValidators([Validators.required])      
      this.clienteForm.controls.cnpj.setValidators([Validators.required, BrazilValidator.isValidCpf()])      
      this.clienteForm.controls.companyCellPhone.setValidators([Validators.required])      
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
  typeUser(data: any): string{
    if(data.cpf==null){
      return 'juridica'
    }else{
      return 'fisica'
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
      this.clientService.update(this.clientId, data).subscribe((dataReturn) => {
        Swal.fire({ 
          title: '<h4>Cliente atualizado!</h4>', 
          icon: 'success', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true ,
          width: '500px'
        })
        this.router.navigate(['sistema', 'vendas', 'clientes', 'listar'])
      }, (err) => {
        console.log(err)
      })
    }else{
      for(let item in this.clienteForm['controls']){
        if(this.clienteForm['controls'][item].status=="INVALID"){
          console.log(item)
        }
      }
      Swal.fire({ 
        title: '<h4>Complete os campos necessários!</h4>', 
        icon: 'error', 
        toast: true, 
        position: 'top', 
        showConfirmButton: false, 
        timer: 2000, 
        timerProgressBar: true ,
        width: '500px'
      })
    }
  }
}
