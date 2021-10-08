import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './sistema/vendas/clientes/clientes.component';
import { EstoqueComponent } from './sistema/estoque/estoque.component';
import { HomeComponent } from './sistema/home/home.component';
import { NotificacoesComponent } from './sistema/notificacoes/notificacoes.component';
import { CadastrarColaboradorComponent } from './sistema/rh/cadastrar-colaborador/cadastrar-colaborador.component';
import { ListarColaboradoresComponent } from './sistema/rh/listar-colaboradores/listar-colaboradores.component';
import { EditarUsuarioSistemaComponent } from './sistema/usuarios-sistema/editar-usuario-sistema/editar-usuario-sistema.component';
import { ListarUsuariosSistemaComponent } from './sistema/usuarios-sistema/listar-usuarios-sistema/listar-usuarios-sistema.component';
import { CriarPedidoVendasComponent } from './sistema/vendas/pedidos-vendas/criar-pedido-vendas/criar-pedido-vendas.component';
import { ListarPedidosVendasComponent } from './sistema/vendas/pedidos-vendas/listar-pedidos-vendas/listar-pedidos-vendas.component';
import { VendasComponent } from './sistema/vendas/vendas.component';
import { ListarClientesComponent } from './sistema/vendas/clientes/listar-clientes/listar-clientes.component';
import { CriarPedidoComprasComponent } from './sistema/compras/pedidos-compras/criar-pedido-compras/criar-pedido-compras.component';
import { DetalhesProdutoComponent } from './sistema/estoque/estoque-produtos/detalhes-produto/detalhes-produto.component';
import { FinanceiroComponent } from './sistema/financeiro/financeiro.component';
import { ListarPedidosComprasComponent } from './sistema/compras/pedidos-compras/listar-pedidos-compras/listar-pedidos-compras.component';
import { ExpedicaoComponent } from './sistema/expedicao/expedicao.component';
import { CriarOrdemExpedicaoComponent } from './sistema/expedicao/criar-ordem-expedicao/criar-ordem-expedicao.component';
import { CriarUsuarioSistemaComponent } from './sistema/usuarios-sistema/criar-usuario-sistema/criar-usuario-sistema.component';
import { LoginComponent } from './sistema/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { EditarColaboradorComponent } from './sistema/rh/editar-colaborador/editar-colaborador.component';
import { LogoutComponent } from './sistema/login/logout/logout.component';
import { EditarClientesComponent } from './sistema/vendas/editar-clientes/editar-clientes.component';
import { AddFilialComponent } from './sistema/rh/cadastrar-colaborador/add-filial/add-filial.component';
import { RhMenuComponent } from './sistema/rh/rh-menu/rh-menu.component';
import { ApontFaltasComponent } from './sistema/rh/apont-faltas/apont-faltas.component';
import { ControleVtComponent } from './sistema/rh/controle-vt/controle-vt.component';
import { RelatorioComponent } from './sistema/rh/relatorio/relatorio.component';
import { ApontamentosComponent } from './sistema/rh/apontamentos/apontamentos.component';
import { AusenciaComponent } from './sistema/rh/ausencia/ausencia.component';
import { RelatorioAusenciaComponent } from './sistema/rh/relatorio-ausencia/relatorio-ausencia.component';
import { VisualizarExpedicaoComponent } from './sistema/expedicao/visualizar-expedicao/visualizar-expedicao.component';
import { EditarExpedicaoComponent } from './sistema/expedicao/editar-expedicao/editar-expedicao.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sistema',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'sistema',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'home',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: 'notificacoes',
        component: NotificacoesComponent
      },
      {
        path: 'rh',
        children: [
          {
            path: '',
            redirectTo: 'menu-rh',
            pathMatch: 'full'
          },
          {
            path:'menu-rh',
            component: RhMenuComponent
          },
          {
            path: 'listar',
            component: ListarColaboradoresComponent
          },
          {
            path: 'ausencia',
            component: AusenciaComponent
          },
          {
            path: 'ausencia-rel',
            component: RelatorioAusenciaComponent
          },
          {
            path: 'cadastrar',
            component: CadastrarColaboradorComponent
          },
          {
            path: 'editar/:id',
            component: EditarColaboradorComponent
          },
          {
            path: 'apontamentos',
            component: ApontamentosComponent
          },
          {
            path: 'faltas',
            component: ApontFaltasComponent
          },
          {
            path: 'controle',
            component: ControleVtComponent
          },
          {
            path: 'faltas-rel',
            component: RelatorioComponent
          }
        ]
      },
      {
        path: 'vendas',
        children: [
          {
            path: '',
            component: VendasComponent
          },
          {
            path: 'clientes',
            children: [
              {
                path: '',
                redirectTo: 'listar',
                pathMatch: 'full'
              },
              {
                path: 'listar',
                component: ListarClientesComponent
              },
              {
                path: 'cadastro',
                component: ClientesComponent
              },
              {
                path: 'editar/:id',
                redirectTo: 'editar/:id/cadastro',
                pathMatch: 'full'
              },
              {
                path: 'editar/:id/cadastro',
                component: EditarClientesComponent
              }
            ]
          },
          {
            path: 'pedidos',
            children: [
              {
                path: '',
                redirectTo: 'listar',
                pathMatch: 'full'
              },
              {
                path: 'listar',
                component: ListarPedidosVendasComponent
              },
              {
                path: 'criar',
                component: CriarPedidoVendasComponent
              }
            ]
          }
        ]
      },
      {
        path: 'compras',
        children: [
          {
            path: '',
            redirectTo: 'pedidos',
            pathMatch: 'full'
          },
          {
            path: 'pedidos',
            children: [
              {
                path: '',
                redirectTo: 'listar',
                pathMatch: 'full'
              },
              {
                path: 'listar',
                component: ListarPedidosComprasComponent
              },
              {
                path: 'criar',
                component: CriarPedidoComprasComponent
              },
            ]
          }
        ]
      },
      {
        path: 'usuarios-sistema',
        children: [
          {
            path: '',
            redirectTo: 'listar',
            pathMatch: 'full'
          },
          {
            path: 'criar',
            component: CriarUsuarioSistemaComponent
          },
          {
            path: 'listar',
            component: ListarUsuariosSistemaComponent
          },
          {
            path: 'editar/:id',
            component: EditarUsuarioSistemaComponent
          }
        ]
      },
      {
        path: 'estoque',
        children: [
          {
            path: '',
            component: EstoqueComponent
          },
          {
            path: 'detalhe/:id',
            component: DetalhesProdutoComponent
          }
        ]
      },
      {
        path: 'financeiro',
        children: [
          {
            path: '',
            component: FinanceiroComponent
          }
        ]
      },
      {
        path: 'expedicao',
        children: [
          {
            path: '',
            component: ExpedicaoComponent
          },
          {
            path: 'criar',
            component: CriarOrdemExpedicaoComponent
          },
          {
            path: 'visualizar/:id',
            component: VisualizarExpedicaoComponent
          },
          {
            path: 'editar/:id',
            component: EditarExpedicaoComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
