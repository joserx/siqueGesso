import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from '@angular/common';
import locatePt from '@angular/common/locales/pt';
import {
  CurrencyMaskModule,
  CurrencyMaskConfig,
  CURRENCY_MASK_CONFIG,
} from 'ng2-currency-mask';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './sistema/login/login.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { EditarColaboradorComponent } from './sistema/rh/editar-colaborador/editar-colaborador.component';
import { LogoutComponent } from './sistema/login/logout/logout.component';
import { NgxMaskModule } from 'ngx-mask';
import { EditarClientesComponent } from './sistema/vendas/editar-clientes/editar-clientes.component';
import { EditarAvaliacaoCreditoComponent } from './sistema/vendas/editar-clientes/avaliacao-credito/avaliacao-credito.component';
import { EditarCadastrarClienteComponent } from './sistema/vendas/editar-clientes/cadastrar-cliente/cadastrar-cliente.component';
import { EditarDadosVendaComponent } from './sistema/vendas/editar-clientes/dados-venda/dados-venda.component';
import { EditarListarClientesComponent } from './sistema/vendas/editar-clientes/listar-clientes/listar-clientes.component';
import { EditarPedidosRealizadosComponent } from './sistema/vendas/editar-clientes/pedidos-realizados/pedidos-realizados.component';
import { EditarResumoFinanceiroComponent } from './sistema/vendas/editar-clientes/resumo-financeiro/resumo-financeiro.component';
import { PesquisarClienteComponent } from './sistema/vendas/clientes/listar-clientes/pesquisar-cliente/pesquisar-cliente.component';
import { AddFilialComponent } from './sistema/rh/cadastrar-colaborador/add-filial/add-filial.component';
import { RhMenuComponent } from './sistema/rh/rh-menu/rh-menu.component';
import { ApontFaltasComponent } from './sistema/rh/apont-faltas/apont-faltas.component';
import { ControleVtComponent } from './sistema/rh/controle-vt/controle-vt.component';
import { RelatorioComponent } from './sistema/rh/relatorio/relatorio.component';
import { PesquisarColabComponent } from './sistema/rh/apont-faltas/pesquisar-colab/pesquisar-colab.component';
import { ViewFornecedorComponent } from './sistema/estoque/fornecedores/view-fornecedor/view-fornecedor.component';
import { EditFornecedorComponent } from './sistema/estoque/fornecedores/edit-fornecedor/edit-fornecedor.component';
import { ApontamentosComponent } from './sistema/rh/apontamentos/apontamentos.component';
import { AusenciaComponent } from './sistema/rh/ausencia/ausencia.component';
import { VtService } from './services/vt.service';
import { RelatorioModalComponent } from './sistema/rh/relatorio/relatorio-modal/relatorio-modal.component';
import { RelatorioAusenciaComponent } from './sistema/rh/relatorio-ausencia/relatorio-ausencia.component';
import { RelatorioModalAusenciaComponent } from './sistema/rh/relatorio-ausencia/relatorio-modal-ausencia/relatorio-modal-ausencia.component';
import { RelatorioVtComponent } from './sistema/rh/controle-vt/relatorio-vt/relatorio-vt.component';
import { EditarExpedicaoComponent } from './sistema/expedicao/editar-expedicao/editar-expedicao.component';
import { VisualizarExpedicaoComponent } from './sistema/expedicao/visualizar-expedicao/visualizar-expedicao.component';
import { AddPedidoComponent } from './sistema/expedicao/add-pedido/add-pedido.component';
import { PesquisarExpComponent } from './sistema/expedicao/pesquisar-exp/pesquisar-exp.component';
import { ViewProdutoComponent } from './sistema/estoque/produtos/view-produto/view-produto.component';
import { ExpedicaoHomeComponent } from './sistema/expedicao/expedicao-home/expedicao-home.component';
import { SolicitacaoPedidoComponent } from './sistema/expedicao/solicitacao-pedido/solicitacao-pedido.component';
import { ListaPedidosComponent } from './sistema/expedicao/lista-pedidos/lista-pedidos.component';
import { StatusPedidoComponent } from './sistema/expedicao/lista-pedidos/status-pedido/status-pedido.component';
import { ConsultaStatusComponent } from './sistema/expedicao/consulta-status/consulta-status.component';
import { CadastroComponent } from './sistema/expedicao/cadastro/cadastro.component';
import { CadastroMotoristaComponent } from './sistema/expedicao/cadastro/cadastro-motorista/cadastro-motorista.component';
import { CadastroVeiculoComponent } from './sistema/expedicao/cadastro/cadastro-veiculo/cadastro-veiculo.component';
import { CadastrarVeiculoComponent } from './sistema/expedicao/cadastro/cadastro-veiculo/cadastrar-veiculo/cadastrar-veiculo.component';
import { EditarVeiculoComponent } from './sistema/expedicao/cadastro/cadastro-veiculo/editar-veiculo/editar-veiculo.component';
import { StatusNconformComponent } from './sistema/expedicao/status-nconform/status-nconform.component';
import { BaixaEntregaComponent } from './sistema/expedicao/baixa-entrega/baixa-entrega.component';
import { EditarPedidoComponent } from './sistema/vendas/pedidos-vendas/editar-pedido/editar-pedido.component';
import { VisualizarPedidoComponent } from './sistema/vendas/pedidos-vendas/visualizar-pedido/visualizar-pedido.component';
import { ListarVendasDiretasComponent } from './sistema/vendas/vendas-diretas/listar-vendas-diretas/listar-vendas-diretas.component';
import { CriarPedidoVendasDiretasComponent } from './sistema/vendas/vendas-diretas/criar-pedido-vendas-diretas/criar-pedido-vendas-diretas.component';
import { PerquisarVendaComponent } from './sistema/vendas/perquisar-venda/perquisar-venda.component';
import { FiltrarVendasComponent } from './sistema/vendas/filtrar-vendas/filtrar-vendas.component';
import { FiltrarClientesComponent } from './sistema/vendas/clientes/filtrar-clientes/filtrar-clientes.component';
import { ViewSuprimentoComponent } from './sistema/estoque/suprimentos/view-suprimento/view-suprimento.component';
import { EditSuprimentoComponent } from './sistema/estoque/suprimentos/edit-suprimento/edit-suprimento.component';
import { ConfiguracoesComponent } from './sistema/config/configuracoes/configuracoes.component';
import { ListarCadastroLojaComponent } from './sistema/config/cadastro-de-loja/listar-cadastro-loja/listar-cadastro-loja.component';
import { CadastrarLojaComponent } from './sistema/config/cadastro-de-loja/cadastrar-loja/cadastrar-loja.component';
import { CadastroDeCategoriaComponent } from './sistema/config/cadastro-de-categoria/cadastro-de-categoria/cadastro-de-categoria.component';
import { CadastroDeProdutoListaComponent } from './sistema/config/cadastro-de-categoria/cadastro-de-produto-lista/cadastro-de-produto-lista.component';
import { CadastroDeProdutoComponent } from './sistema/config/cadastro-de-categoria/cadastro-de-produto/cadastro-de-produto.component';
import { DestinacaoDaVendaListaComponent } from './sistema/config/cadastro-de-categoria/destinacao-da-venda-lista/destinacao-da-venda-lista.component';
import { DestinacaoDaVendaCadastroComponent } from './sistema/config/cadastro-de-categoria/destinacao-da-venda-cadastro/destinacao-da-venda-cadastro.component';
import { NgChartjsModule } from 'ng-chartjs';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: '',
  allowNegative: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
};

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
    LogoutComponent,
    EditarClientesComponent,
    EditarAvaliacaoCreditoComponent,
    EditarCadastrarClienteComponent,
    EditarDadosVendaComponent,
    EditarListarClientesComponent,
    EditarPedidosRealizadosComponent,
    EditarResumoFinanceiroComponent,
    PesquisarClienteComponent,
    AddFilialComponent,
    RhMenuComponent,
    ApontFaltasComponent,
    ControleVtComponent,
    RelatorioComponent,
    PesquisarColabComponent,
    ViewFornecedorComponent,
    EditFornecedorComponent,
    ApontamentosComponent,
    AusenciaComponent,
    RelatorioModalComponent,
    RelatorioAusenciaComponent,
    RelatorioModalAusenciaComponent,
    RelatorioVtComponent,
    EditarExpedicaoComponent,
    VisualizarExpedicaoComponent,
    AddPedidoComponent,
    PesquisarExpComponent,
    ViewProdutoComponent,
    ExpedicaoHomeComponent,
    SolicitacaoPedidoComponent,
    ListaPedidosComponent,
    StatusPedidoComponent,
    ConsultaStatusComponent,
    CadastroComponent,
    CadastroMotoristaComponent,
    CadastroVeiculoComponent,
    CadastrarVeiculoComponent,
    EditarVeiculoComponent,
    StatusNconformComponent,
    BaixaEntregaComponent,
    EditarPedidoComponent,
    VisualizarPedidoComponent,
    ListarVendasDiretasComponent,
    CriarPedidoVendasDiretasComponent,
    PerquisarVendaComponent,
    FiltrarVendasComponent,
    FiltrarClientesComponent,
    ViewSuprimentoComponent,
    EditSuprimentoComponent,
    ConfiguracoesComponent,
    ListarCadastroLojaComponent,
    CadastrarLojaComponent,
    CadastroDeCategoriaComponent,
    CadastroDeProdutoListaComponent,
    CadastroDeProdutoComponent,
    DestinacaoDaVendaListaComponent,
    DestinacaoDaVendaCadastroComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbDropdownModule,
    CurrencyMaskModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false,
    }),
    NgChartjsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

registerLocaleData(locatePt);
