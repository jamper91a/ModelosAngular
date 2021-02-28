import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'hosts',
    loadChildren: () => import('./pages/anfitriones/hosts.module').then(m => m.HostsModule)
  },
  {
    path: 'spectators',
    loadChildren: () => import('./pages/espectadores/spectators.module').then(m => m.SpectatorsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
