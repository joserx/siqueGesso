import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './sistema/home/home.component';
import { ListarColaboradoresComponent } from './sistema/rh/listar-colaboradores/listar-colaboradores.component';
import { EditarUsuarioSistemaComponent } from './sistema/usuarios-sistema/editar-usuario-sistema/editar-usuario-sistema.component';
import { ListarUsuariosSistemaComponent } from './sistema/usuarios-sistema/listar-usuarios-sistema/listar-usuarios-sistema.component';

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
          }
        ]
      },
      {
        path: 'usuarios-sistema',
        children: [
          {
            path: '',
            redirectTo: 'lista',
            pathMatch: 'full'
          },
          {
            path: 'lista',
            component: ListarUsuariosSistemaComponent
          },
          {
            path: 'editar/:id',
            component: EditarUsuarioSistemaComponent
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
