import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, finalize, map} from 'rxjs/operators';
import {environment} from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private httpHeaders: any;
  private isLoading = new Subject<object>();
  public loading = this.isLoading.asObservable();
  private reqCount: number = 0;
  public imgSite: string = environment.imagePrefix;

  public userName: any = localStorage.getItem('site_first_name');
  public userLastName: any =localStorage.getItem('site_last_name');
  public userEmail: any =localStorage.getItem('site_email');
  public userImage: any =localStorage.getItem('site_image');
  public adminImage: any =localStorage.getItem('image');

  constructor(private http: HttpClient) {}

  /*get request function*/
  getData(apiUrl:string, forSocket?: boolean) {
    this.isLoading.next({type: 'get', isLoading: true, reqCount: ++this.reqCount});
    this.httpHeaders = new HttpHeaders({
      Authorization: (localStorage.getItem('token_type') ? localStorage.getItem('token_type')  + ' ': '') + localStorage.getItem('access_token'),
      'Accept-Language': localStorage.getItem('Accept-Language') as string ? localStorage.getItem('Accept-Language') as string : 'en'
    })
    if (forSocket) {
      console.log('req service', localStorage.getItem('_'));
      this.httpHeaders = this.httpHeaders
        .set('ex-id', localStorage.getItem('_'))
        .set('ex-authorization', localStorage.getItem('site_access_token'))
        .set('Authorization', (localStorage.getItem('site_token_type') ? localStorage.getItem('site_token_type')  + ' ': '') + localStorage.getItem('site_access_token'))
        .set('ex-language', 'en');
    }
    return this.http.get(apiUrl, {headers: this.httpHeaders, observe: 'body'}).pipe(
      finalize(() => {
        this.isLoading.next({type: 'get', isLoading: false, reqCount: --this.reqCount})}),
      catchError(this.handleError)
    );
  }
  /*post request function*/
  createData(url: string, value?:any, forSocket?: boolean) {
    this.isLoading.next({type: 'create', isLoading: true, reqCount: ++this.reqCount});
    this.httpHeaders = new HttpHeaders({
      Authorization: (localStorage.getItem('token_type') ? localStorage.getItem('token_type')  + ' ': '') + localStorage.getItem('access_token'),
      'Accept-Language': 'en'
    });
    if (forSocket) {
      this.httpHeaders = this.httpHeaders
        .set('ex-id', localStorage.getItem('_'))
        .set('ex-authorization', localStorage.getItem('site_access_token'))
        .set('ex-language', 'en');
    }
    return this.http.post<any>(url, value, {headers: this.httpHeaders})
      .pipe(
        finalize(() => {
          this.isLoading.next({type: 'create', isLoading: false, reqCount: --this.reqCount});
        }),
        catchError(this.handleError)
      );
  }
  /*delete request function*/
  delete(url: string, id: any): Observable<{}> {
    this.isLoading.next({type: 'delete', isLoading: true, reqCount: ++this.reqCount});
    this.httpHeaders = new HttpHeaders({
      Authorization: localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
    });
    this.httpHeaders = this.httpHeaders.set(
      'Accept-Language',
      localStorage.getItem('Accept-Language') ? localStorage.getItem('Accept-Language') : 'en'
    );
    const urlApi = `${url}/${id}`;
    return this.http.delete(urlApi, {headers: this.httpHeaders})
      .pipe(
        finalize(() => {
          this.isLoading.next({type: 'delete', isLoading: false, reqCount: --this.reqCount});
        }),
        catchError(this.handleError)
      );
  }
  /*put request function*/
  updateData(url: string, value: any, id: any) {
    this.isLoading.next({type: 'update', isLoading: true, reqCount: ++this.reqCount});
    this.httpHeaders = new HttpHeaders({
      Authorization: localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
    });
    this.httpHeaders = this.httpHeaders.set(
      'Accept-Language',
      localStorage.getItem('Accept-Language') ? localStorage.getItem('Accept-Language') : 'en'
    );
    const urlApi = `${url}/${id}`;
    return this.http.put<any>(urlApi, value, {headers: this.httpHeaders})
      .pipe(
        finalize(() => {
          this.isLoading.next({type: 'update', isLoading: false, reqCount: --this.reqCount});
        }),
        catchError(this.handleError)
      );
  }
  /*send refresh token*/
  refreshToken() {
    const url = `${environment.admin.refresh}`;
    const header = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
      .set('Content-Type', 'application/json');
    const body = {
      'refresh_token': localStorage.getItem('refresh_token')
    };

    return this.http.post(url, body, {headers: header})
      .pipe(
        map((data: any) => {
          if (data && data['access_token']) {
            localStorage.setItem('access_token', data['access_token']);
            localStorage.setItem('refresh_token', data['refresh_token']);
            return data['access_token'];
          }
          return data;
        })
      );
  }


  refreshTokenSite() {
    const url = `${environment.webPages.refresh}`;
    const header = new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('site_access_token'))
      .set('Content-Type', 'application/json');
    const body = {
      'refresh_token': localStorage.getItem('site_refresh_token')
    };

    return this.http.post(url, body, {headers: header})
      .pipe(
        map((data: any) => {
          if (data && data['access_token']) {
            for (let key in data) {
              localStorage.setItem('site_' + key, data[key]);
            }
            return data['access_token'];
          }
          return data;
        })
      );
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage;
    if (error.error instanceof ErrorEvent) {
      errorMessage = 'An error occurred:', error.error.message;
    } else {
      errorMessage = `${error.error?.message}`;
    }
    return throwError(errorMessage);
  }
}
