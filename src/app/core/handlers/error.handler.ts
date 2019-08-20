import { ErrorHandler, Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private toastrService: NbToastrService, private router: Router) {}

  public handleError(error: any): void {
    if (error.status === 401) {
      localStorage.removeItem('authToken');
      this.router.navigate(['/']);
    }
    this.toastrService.show(error.error.error[0], 'Ошибка', { status: 'danger' });
  }
}
