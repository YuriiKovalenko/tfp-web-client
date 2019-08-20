import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserResolver } from './resolvers/user.resolver';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule],
  providers: [UserResolver]
})
export class CoreModule {}
