import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import locatePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './sistema/home/home.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { SidemenuComponent } from './views/sidemenu/sidemenu.component';
import { ListarUsuariosSistemaComponent } from './sistema/usuarios-sistema/listar-usuarios-sistema/listar-usuarios-sistema.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditarUsuarioSistemaComponent } from './sistema/usuarios-sistema/editar-usuario-sistema/editar-usuario-sistema.component';
import { ListarColaboradoresComponent } from './sistema/rh/listar-colaboradores/listar-colaboradores.component';
import { ListarVendasComponent } from './sistema/vendas/listar-vendas/listar-vendas.component';
import { registerLocaleData } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SidemenuComponent,
    ListarUsuariosSistemaComponent,
    EditarUsuarioSistemaComponent,
    ListarColaboradoresComponent,
    ListarVendasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent]
})
export class AppModule { }

registerLocaleData(locatePt)
