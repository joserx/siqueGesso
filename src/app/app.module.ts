import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from '@angular/common';
import locatePt from '@angular/common/locales/pt';
import { CurrencyMaskModule, CurrencyMaskConfig, CURRENCY_MASK_CONFIG, } from 'ng2-currency-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './sistema/home/home.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { SidemenuComponent } from './views/sidemenu/sidemenu.component';
import { ListarUsuariosSistemaComponent } from './sistema/usuarios-sistema/listar-usuarios-sistema/listar-usuarios-sistema.component';
import { EditarUsuarioSistemaComponent } from './sistema/usuarios-sistema/editar-usuario-sistema/editar-usuario-sistema.component';
import { ListarColaboradoresComponent } from './sistema/rh/listar-colaboradores/listar-colaboradores.component';
import { CadastrarColaboradorComponent } from './sistema/rh/cadastrar-colaborador/cadastrar-colaborador.component';
import { ListarPedidosVendasComponent } from './sistema/vendas/pedidos-vendas/listar-pedidos-vendas/listar-pedidos-vendas.component';
import { CriarPedidoVendasComponent } from './sistema/vendas/pedidos-vendas/criar-pedido-vendas/criar-pedido-vendas.component';
import { CadastrarClienteComponent } from './sistema/vendas/clientes/cadastrar-cliente/cadastrar-cliente.component';
import { ClientesComponent } from './sistema/vendas/clientes/clientes.component';
import { PessoaFisicaComponent } from './sistema/vendas/clientes/cadastrar-cliente/pessoa-fisica/pessoa-fisica.component';
import { PessoaJuridicaComponent } from './sistema/vendas/clientes/cadastrar-cliente/pessoa-juridica/pessoa-juridica.component';
import { AvaliacaoCreditoComponent } from './sistema/vendas/clientes/avaliacao-credito/avaliacao-credito.component';
import { PedidosRealizadosComponent } from './sistema/vendas/clientes/pedidos-realizados/pedidos-realizados.component';
import { ResumoFinanceiroComponent } from './sistema/vendas/clientes/resumo-financeiro/resumo-financeiro.component';
import { NotificacoesComponent } from './sistema/notificacoes/notificacoes.component';
import { EstoqueComponent } from './sistema/estoque/estoque.component';
import { FornecedoresComponent } from './sistema/estoque/fornecedores/fornecedores.component';
import { ProdutosComponent } from './sistema/estoque/produtos/produtos.component';
import { SuprimentosComponent } from './sistema/estoque/suprimentos/suprimentos.component';
import { EstoqueProdutosComponent } from './sistema/estoque/estoque-produtos/estoque-produtos.component';
import { AdicionarFornecedoresComponent } from './sistema/estoque/fornecedores/adicionar-fornecedores/adicionar-fornecedores.component';
import { AdicionarProdutosComponent } from './sistema/estoque/produtos/adicionar-produtos/adicionar-produtos.component';
import { VendasComponent } from './sistema/vendas/vendas.component';
import { ListarClientesComponent } from './sistema/vendas/clientes/listar-clientes/listar-clientes.component';
import { DadosVendaComponent } from './sistema/vendas/clientes/dados-venda/dados-venda.component';
import { SelecionarProdutosModalComponent } from './sistema/estoque/produtos/selecionar-produtos-modal/selecionar-produtos-modal.component';

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
    ListarPedidosVendasComponent,
    CadastrarColaboradorComponent,
    CriarPedidoVendasComponent,
    CadastrarClienteComponent,
    ClientesComponent,
    PessoaFisicaComponent,
    PessoaJuridicaComponent,
    AvaliacaoCreditoComponent,
    PedidosRealizadosComponent,
    ResumoFinanceiroComponent,
    NotificacoesComponent,
    EstoqueComponent,
    FornecedoresComponent,
    ProdutosComponent,
    SuprimentosComponent,
    EstoqueProdutosComponent,
    AdicionarFornecedoresComponent,
    AdicionarProdutosComponent,
    VendasComponent,
    ListarClientesComponent,
    DadosVendaComponent,
    SelecionarProdutosModalComponent
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
