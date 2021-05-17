import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from '@angular/common';
import locatePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './sistema/home/home.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { SidemenuComponent } from './views/sidemenu/sidemenu.component';
import { ListarUsuariosSistemaComponent } from './sistema/usuarios-sistema/listar-usuarios-sistema/listar-usuarios-sistema.component';
import { EditarUsuarioSistemaComponent } from './sistema/usuarios-sistema/editar-usuario-sistema/editar-usuario-sistema.component';
import { ListarColaboradoresComponent } from './sistema/rh/listar-colaboradores/listar-colaboradores.component';
import { CadastrarColaboradorComponent } from './sistema/rh/cadastrar-colaborador/cadastrar-colaborador.component';
import { ListarPedidosComponent } from './sistema/vendas/listar-pedidos/listar-pedidos.component';
import { CriarPedidoComponent } from './sistema/vendas/criar-pedido/criar-pedido.component';
import { CurrencyMaskModule, CurrencyMaskConfig, CURRENCY_MASK_CONFIG, } from 'ng2-currency-mask';
import { CadastrarClienteComponent } from './sistema/clientes/cadastrar-cliente/cadastrar-cliente.component';
import { ClientesComponent } from './sistema/clientes/clientes.component';
import { PessoaFisicaComponent } from './sistema/clientes/cadastrar-cliente/pessoa-fisica/pessoa-fisica.component';
import { PessoaJuridicaComponent } from './sistema/clientes/cadastrar-cliente/pessoa-juridica/pessoa-juridica.component';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SidemenuComponent,
    ListarUsuariosSistemaComponent,
    EditarUsuarioSistemaComponent,
    ListarColaboradoresComponent,
    ListarPedidosComponent,
    CadastrarColaboradorComponent,
    CriarPedidoComponent,
    CadastrarClienteComponent,
    ClientesComponent,
    PessoaFisicaComponent,
    PessoaJuridicaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbDropdownModule,
    CurrencyMaskModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

registerLocaleData(locatePt)
