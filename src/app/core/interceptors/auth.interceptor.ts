import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth')) {
      return next.handle(req);
    }
    const token = localStorage.getItem('authToken');
    if (token) {
      return next.handle(
        req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      );
    }
    return next.handle(req);
  }
}
