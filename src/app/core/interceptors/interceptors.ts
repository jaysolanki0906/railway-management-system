import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { LoaderService } from '../services/loader.service'; 

@Injectable()
export class Interceptors implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private loaderService: LoaderService 
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.tokenService.getAccessToken();
    const clonedReq = accessToken
      ? req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
      : req;

    this.loaderService.show(); // <-- Show loader

    return next.handle(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap((res: any) => {
              this.tokenService.saveTokens(res.access_token, res.refresh_token);
              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${res.access_token}`
                }
              });
              return next.handle(retryReq);
            }),
            catchError((refreshError) => {
              this.tokenService.clearTokens();
              return throwError(() => refreshError);
            })
          );
        }
        return throwError(() => error);
      }),
      finalize(() => {
        this.loaderService.hide(); 
      })
    );
  }
}