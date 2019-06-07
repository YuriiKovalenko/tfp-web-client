import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AccountComponent } from './account.component';

@NgModule({
  declarations: [AccountComponent, SignInComponent, SignUpComponent],
  exports: [AccountComponent],
  imports: [CommonModule, AccountRoutingModule]
})
export class AccountModule {}
