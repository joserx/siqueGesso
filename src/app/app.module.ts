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
import { CriarPedidoComprasComponent } from './sistema/compras/pedidos-compras/criar-pedido-compras/criar-pedido-compras.component';
import { AdicionarSuprimentosComponent } from './sistema/estoque/suprimentos/adicionar-suprimentos/adicionar-suprimentos.component';
import { DetalhesProdutoComponent } from './sistema/estoque/estoque-produtos/detalhes-produto/detalhes-produto.component';
import { FinanceiroComponent } from './sistema/financeiro/financeiro.component';
import { ContasAPagarComponent } from './sistema/financeiro/contas-a-pagar/contas-a-pagar.component';
import { AdicionarPagamentoComponent } from './sistema/financeiro/contas-a-pagar/adicionar-pagamento/adicionar-pagamento.component';
import { ContasAReceberComponent } from './sistema/financeiro/contas-a-receber/contas-a-receber.component';
import { AdicionarRecebimentoComponent } from './sistema/financeiro/contas-a-receber/adicionar-recebimento/adicionar-recebimento.component';
import { FluxoDeCaixaComponent } from './sistema/financeiro/fluxo-de-caixa/fluxo-de-caixa.component';
import { ListarPedidosComprasComponent } from './sistema/compras/pedidos-compras/listar-pedidos-compras/listar-pedidos-compras.component';
import { ExpedicaoComponent } from './sistema/expedicao/expedicao.component';
import { CriarOrdemExpedicaoComponent } from './sistema/expedicao/criar-ordem-expedicao/criar-ordem-expedicao.component';
import { CriarUsuarioSistemaComponent } from './sistema/usuarios-sistema/criar-usuario-sistema/criar-usuario-sistema.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './sistema/login/login.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { EditarColaboradorComponent } from './sistema/rh/editar-colaborador/editar-colaborador.component';
import { LogoutComponent } from './sistema/login/logout/logout.component';
import { NgxMaskModule } from 'ngx-mask';

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
    SelecionarProdutosModalComponent,
    CriarPedidoComprasComponent,
    AdicionarSuprimentosComponent,
    DetalhesProdutoComponent,
    FinanceiroComponent,
    ContasAPagarComponent,
    AdicionarPagamentoComponent,
    ContasAReceberComponent,
    AdicionarRecebimentoComponent,
    FluxoDeCaixaComponent,
    ListarPedidosComprasComponent,
    ExpedicaoComponent,
    CriarOrdemExpedicaoComponent,
    CriarUsuarioSistemaComponent,
    LoginComponent,
    EditarColaboradorComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbDropdownModule,
    CurrencyMaskModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

registerLocaleData(locatePt)
