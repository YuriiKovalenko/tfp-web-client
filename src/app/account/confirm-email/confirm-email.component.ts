import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { AuthService } from '../../core/services/auth.service';

interface Errors {
  wrong?: boolean;
  tooMuch?: boolean;
}

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {
  public code: string;
  public errors: Errors;

  @Input() userId: string;

  constructor(
    private dialogRef: NbDialogRef<ConfirmEmailComponent>,
    private auth: AuthService
  ) {}

  ngOnInit() {}

  public submit() {
    this.auth
      .confirmEmail(this.userId, this.code)
      .subscribe(
        () => this.dialogRef.close(),
        err => (this.errors = { wrong: true })
      );
  }

  public sendCode() {
    this.auth
      .sendConfirmation(this.userId)
      .subscribe(() => {}, () => (this.errors = { tooMuch: true }));
  }
}
