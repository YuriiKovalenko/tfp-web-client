import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NewUser } from '../../shared/models/new-user.model';

interface AuthResponse {
  userId?: string;
  token?: string;
}

interface Auth {
  email: string;
  password: string;
}

interface NewPasswordForm {
  newPassword: string;
  oldPassword: string;
}

interface ConfirmEmailResponse {
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/Account`;
  }

  public login(auth: Auth) {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/Login`, auth)
      .pipe(tap(({ token }) => localStorage.setItem('authToken', token)));
  }

  public logoff() {
    return this.http.get(`${this.apiUrl}/LogOff`);
  }

  public changePassword(passForm: NewPasswordForm) {
    return this.http.post(`${this.apiUrl}/ChangePassword`, passForm);
  }

  public signUp(newUser: NewUser) {
    return this.http.post<ConfirmEmailResponse>(
      `${this.apiUrl}/Register`,
      newUser
    );
  }

  public sendConfirmation(userId: string) {
    return this.http.get(`${this.apiUrl}/SendConfirm?userId=${userId}`);
  }

  public confirmEmail(userId: string, code: string) {
    return this.http.get(
      `${this.apiUrl}/ConfirmEmail?userId=${userId}&code=${code}`
    );
  }
}
