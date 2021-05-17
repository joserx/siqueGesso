import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarClienteComponent } from './sistema/clientes/cadastrar-cliente/cadastrar-cliente.component';
import { ClientesComponent } from './sistema/clientes/clientes.component';
import { HomeComponent } from './sistema/home/home.component';
import { CadastrarColaboradorComponent } from './sistema/rh/cadastrar-colaborador/cadastrar-colaborador.component';
import { ListarColaboradoresComponent } from './sistema/rh/listar-colaboradores/listar-colaboradores.component';
import { EditarUsuarioSistemaComponent } from './sistema/usuarios-sistema/editar-usuario-sistema/editar-usuario-sistema.component';
import { ListarUsuariosSistemaComponent } from './sistema/usuarios-sistema/listar-usuarios-sistema/listar-usuarios-sistema.component';
import { CriarPedidoComponent } from './sistema/vendas/criar-pedido/criar-pedido.component';
import { ListarPedidosComponent } from './sistema/vendas/listar-pedidos/listar-pedidos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sistema',
    pathMatch: 'full'
  },
  {
    path: 'sistema',
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'home',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: 'rh',
        children: [
          {
            path: '',
            redirectTo: 'listar',
            pathMatch: 'full'
          },
          {
            path: 'listar',
            component: ListarColaboradoresComponent
          },
          {
            path: 'cadastrar',
            component: CadastrarColaboradorComponent
          }
        ]
      },
      {
        path: 'vendas',
        children: [
          {
            path: '',
            redirectTo: 'listar',
            pathMatch: 'full'
          },
          {
            path: 'listar',
            component: ListarPedidosComponent
          },
          {
            path: 'criar',
            component: CriarPedidoComponent
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
        path: 'clientes',
        children: [
          {
            path: '',
            component: ClientesComponent
          },
          {
            path: 'cadastrar',
            component: ClientesComponent
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
