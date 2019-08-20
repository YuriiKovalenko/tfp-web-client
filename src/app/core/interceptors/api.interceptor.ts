import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GlobalErrorHandler } from '../handlers/error.handler';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiInterceptor implements HttpInterceptor {
  constructor(private errorHandler: GlobalErrorHandler) {}
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req.clone()).pipe(
      tap(
        () => {},
        error => {
          if (error instanceof HttpErrorResponse) {
            this.errorHandler.handleError(error);
          }
        }
      )
    );
  }
}
