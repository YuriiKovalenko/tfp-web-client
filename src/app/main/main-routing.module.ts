import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { UserResolver } from '../core/resolvers/user.resolver';
import { ProfileComponent } from './profile/profile.component';
import { MeetsComponent } from './meets/meets.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    resolve: { user: UserResolver },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'profile' },
      {
        path: 'profile',
        component: ProfileComponent
      },
      { path: 'meets', component: MeetsComponent },
      { path: 'search', component: SearchComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
