import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainGuard } from './main/main.guard';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  {
    path: 'main',
    canActivate: [MainGuard],
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then(m => m.AccountModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
