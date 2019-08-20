import { AbstractControl } from '@angular/forms';

export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

export function matchPassword(AC: AbstractControl): { [key: string]: boolean } {
  const password = AC.get('password');
  const confirmPassword = AC.get('confirmPassword');
  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ invalid: true });
  }
  return;
}
