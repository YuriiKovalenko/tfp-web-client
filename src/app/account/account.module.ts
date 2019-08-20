import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../core/services/auth.service';
import { RegionService } from '../core/services/region.service';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';

@NgModule({
  declarations: [SignInComponent, SignUpComponent, ConfirmEmailComponent],
  exports: [],
  imports: [CommonModule, AccountRoutingModule, SharedModule],
  providers: [AuthService, RegionService],
  entryComponents: [ConfirmEmailComponent]
})
export class AccountModule {}
