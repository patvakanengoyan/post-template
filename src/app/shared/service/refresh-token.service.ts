import {throwError as observableThrowError, Observable, BehaviorSubject, throwError} from 'rxjs';

import {take, filter, catchError, switchMap, finalize} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse
} from '@angular/common/http';
import {RequestService} from "./request.service";
import {Router} from '@angular/router';
import { SocketConnectionService } from './socket-connection.service';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {

  private isRefreshingToken = false;
  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null!);

  constructor(public requestService: RequestService, public router: Router, public socket: SocketConnectionService) {}

  /*check refresh token request status code*/
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse |
    HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {

        if (error instanceof HttpErrorResponse) {
          if (request.url.includes('refresh') ||
            request.url.includes('login')) {
            if (request.url.includes('refresh')) {
              return this.logoutUser();
            }
            return throwError(() => error);
          }
          switch ((<HttpErrorResponse>error).status) {
            case 400:
              return this.handle400Error(error);
            case 401:
              return this.handle401Error(request, next);
            default:
              return throwError(() => error);
          }
        } else {
          return observableThrowError(() => error);
        }
      }));
  }
  /*check refresh token request status code*/
  handle400Error(error: any) {
    if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
      return this.logoutUser();
    }
    return observableThrowError(() => error);
  }
  /*check refresh token request status code*/
  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null!);

      if (this.requestService.userName) {
        return this.requestService.refreshTokenSite().pipe(
          switchMap((newToken: any) => {
            if (newToken && newToken !== 'error') {
              this.tokenSubject.next(newToken);
              return next.handle(this.getNewRequest(request, newToken));
            }
            return this.logoutUser();
          }),
          finalize(() => {
            this.isRefreshingToken = false;
            this.socket.refreshTokenWork.next(true);
          }), );
      } else {
        return this.requestService.refreshToken().pipe(
          switchMap((newToken: any) => {
            if (newToken && newToken !== 'error') {
              this.tokenSubject.next(newToken);
              return next.handle(this.getNewRequest(request, newToken));
            }
            return this.logoutUser();
          }),
          finalize(() => {
            this.isRefreshingToken = false;
            this.socket.refreshTokenWork.next(true);
          }), );
      }
    } else {
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(this.getNewRequest(request, token));
        }), );
    }
  }

  /*set new access token*/
  getNewRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    const newAccessToken = token;
    if (!newAccessToken) {
      return request;
    }
    return request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + newAccessToken,
        'ex-authorization': newAccessToken
      }
    });
  }

  /*logout function*/
  logoutUser() {
    if (!this.requestService.userName) {
      this.router.navigate(['/admin/login']);
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('first_name');
      localStorage.removeItem('role');
      localStorage.removeItem('expires_in');
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('token_type');
      localStorage.removeItem('birthday');
      localStorage.removeItem('last_name');
      localStorage.removeItem('role_name');
      localStorage.removeItem('email');
      localStorage.removeItem('image');
      localStorage.removeItem('status');
    } else {
      this.router.navigate(['/']);
      localStorage.removeItem('site_refresh_token');
      localStorage.removeItem('site_first_name');
      localStorage.removeItem('site_role');
      localStorage.removeItem('site_expires_in');
      localStorage.removeItem('site_access_token');
      localStorage.removeItem('site_id');
      localStorage.removeItem('site_token_type');
      localStorage.removeItem('site_birthday');
      localStorage.removeItem('site_last_name');
      localStorage.removeItem('site_role_name');
      localStorage.removeItem('site_email');
      localStorage.removeItem('site_image');
    }
    return throwError(() => new Error(`Invalid`));
  }
}
