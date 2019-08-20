import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SharedModule } from '../shared/shared.module';
import { UserCardComponent } from './user-card/user-card.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ProfileComponent } from './profile/profile.component';
import { MeetsComponent } from './meets/meets.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    MainComponent,
    UserCardComponent,
    NavMenuComponent,
    ProfileComponent,
    MeetsComponent,
    SearchComponent,
    SettingsComponent
  ],
  imports: [CommonModule, MainRoutingModule, SharedModule]
})
export class MainModule {}
