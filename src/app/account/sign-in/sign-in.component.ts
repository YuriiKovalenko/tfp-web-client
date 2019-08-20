import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';

import { ConfirmEmailComponent } from '../confirm-email/confirm-email.component';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public authForm: FormGroup;
  public loading: boolean;

  constructor(
    private auth: AuthService,
    private dialog: NbDialogService,
    private router: Router
  ) {
    this.loading = false;
  }

  ngOnInit() {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  public signIn() {
    this.loading = true;
    const auth = this.authForm.value;
    this.auth.login(auth).subscribe(
      () => this.router.navigate(['/']),
      ({ error }) => {
        if (error.userId) {
          this.handleNoToken(error.userId);
        }
        this.loading = false;
      }
    );
  }

  private handleNoToken(userId: string) {
    this.dialog.open(ConfirmEmailComponent, {
      context: { userId },
      closeOnEsc: false,
      closeOnBackdropClick: false
    });
  }
}
