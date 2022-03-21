
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { CorreiosService } from 'src/app/services/correios.service';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';
import { RhService } from 'src/app/services/rh.service';
import { BrazilValidator } from 'src/app/_helpers/brasil';
import { getDate } from 'src/environments/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  public solicitado: boolean = false

  public clienteSection: string = 'cadastro';
  public condicoes: any = [
    { id: 1, value: "debito", nome: "Débito", status: "none" },
    { id: 2, value: "credito-vista", nome: "Crédito à vista", status: "none" },
    { id: 3, value: "credito-prazo", nome: "Crédito a prazo", status: "none" },
    { id: 4, value: "boleto-vista", nome: "Boleto à vista", status: "none" },
    { id: 5, value: "boleto-ddl", nome: "Boleto DDL", status: "readonly" },
  ]
  public tipoUsuario = 1;
  public vendedores: any[] = [];
  public getDate: any = getDate;
  public desativadoCheckbox: boolean = false;
  public tipoPessoa: string = 'fisica';
  clienteForm : FormGroup = new FormGroup({
    'disabled': new FormControl(''),
    'name' : new FormControl(null, [Validators.required]),
    'surname' : new FormControl(null, [Validators.required]),
    'cpf' : new FormControl(null, [Validators.required, BrazilValidator.isValidCpf()]),
    'cnpj' : new FormControl(null, [BrazilValidator.isValidCpf()]),
    'rg' : new FormControl(null, [Validators.required]),
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
    'addresses' : new FormArray([]),
    'codigo': new FormControl(''),
    'nomeVendedor': new FormControl(''),
    'tabela': new FormArray([]), // ver de onde eu tirei essa tabela
    'debito': new FormControl(''),
    'creditoAvista': new FormControl(''),
    'creditoAprazo': new FormControl(''),
    'boletoAvista': new FormControl(''),
    'boletoDdl': new FormControl('Não Solicitado'),
    "obs": new FormControl(''),
    "restricao": new FormControl(''),
    "validade": new FormControl(''),
    "limiteCompra": new FormControl(null),
    "descontoMax": new FormControl(null),
    "obsCredito": new FormControl(''),
    "codigoVendedor": new FormControl(''),
    "vendedor": new FormControl('')
  })

  public enderecos: any = [{}];

  constructor(
    private readonly clientService : ClientService,
    private readonly correiosService : CorreiosService,
    private readonly router : Router,
    private readonly rhService: RhService
  ) { }

  ngOnInit(): void {
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.vendas_ver) == PermissionsUsers.vendas_ver)){
      this.router.navigate(['sistema'])
    }
    this.rhService.find().subscribe((data: any) => {
      for (let oneData of data) {
        if (oneData.role.toLowerCase().substring(0, 8) == 'vendedor') {
          this.vendedores.push(oneData)
        }
      }
    })
  }

  public toggleClienteSection(value: string): void {
    this.clienteSection = value;
  }

  get addresses() {
    return this.clienteForm.get('addresses') as FormArray;
  }

  get tabela(){
    return this.clienteForm.get('tabela') as FormArray;
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
      this.clienteForm.controls.subscription.setValidators([Validators.required])      
      this.clienteForm.controls.cnpj.setValidators([Validators.required, BrazilValidator.isValidCpf()])      
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
        (this.clienteForm.controls.addresses as FormArray).at(i).get('street')?.setValue(data.logradouro);
        (this.clienteForm.controls.addresses as FormArray).at(i).get('neighborhood')?.setValue(data.bairro);
        (this.clienteForm.controls.addresses as FormArray).at(i).get('city')?.setValue(data.localidade);
        (this.clienteForm.controls.addresses as FormArray).at(i).get('state')?.setValue(data.uf);
      }
    })
  }

  submitClient(data : any) {
    if(this.clienteForm.valid) {
      this.clientService.create(data).subscribe((dataReturn) => {
        Swal.fire({ 
          title: '<h4>Cliente adicionado !</h4>', 
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
    }
  }

  solicitar(){
    if(this.solicitado==false){
      this.solicitado=true
      this.clienteForm.get('boletoDdl')?.setValue('Solicitado')
    }else{
      this.solicitado=false
      this.clienteForm.get('boletoDdl')?.setValue('Não Solicitado')
    }
  }

  check(event: any){
    let button = event.target 
    if(button.checked){
      this.tabela.push(new FormGroup({
        'nome': new FormControl(button.value)
      }))
    }else{
      for(let control of this.tabela.value){
        if(control.nome == button.value){
          this.tabela.controls.splice(this.tabela.controls.map(
            function(e: any){
              return e.nome
            }
          ).indexOf(button.value), 1)
          this.tabela.value.splice(this.tabela.value.map(
            function(e: any){
              return e.nome
            }
          ).indexOf(button.value), 1)
        }
      }
    }
  }

  loadCep(cep: any, form: AbstractControl) {
    cep = cep.value;
    if (cep.length == 9) {
      this.clientService
        .updateCep(cep.replace(/-/g, ''))
        .subscribe((data: any) => {
          form.get('street')!.setValue(data.logradouro);
          form.get('state')!.setValue(data.uf);
          form.get('city')!.setValue(data.localidade);
          form.get('neighborhood')!.setValue(data.bairro);
        });
    }
  }

}
