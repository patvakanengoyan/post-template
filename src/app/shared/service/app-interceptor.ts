import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import {Router} from "@angular/router";

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    return next.handle(req).pipe(map((event: HttpEvent<any>) => {
        let url = req.url;
        if (url.search('admin/login') != -1 || url.search('logout') != -1 || url.search('assets/map') != -1 || url.search('help/message/view') != -1) {
        } else {
          if (event instanceof HttpResponse) {
            let url = new URL(req.url)
            if (req.method === 'POST' || req.method === 'DELETE' || req.method === 'PUT') {
              if (!req.url.includes('refresh') && !url.pathname.includes('api/rooms')) {
                let messages = event.body.messages ? event.body.messages : event.body.message;
                this.toastr.success(messages);
              }
            }
          }
        }

        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        const started = Date.now();
        const elapsed = Date.now() - started;
        if (error.status == 400) {
          if (typeof error.error['message'] == 'string') {
            this.toastr.error(error.error['message']);
          } else {
            for(let err in error.error['message']) {
              this.toastr.error(error.error['message'][err]);
            }
          }
        } else if (error.status == 500) {
        } else if (error.status == 404) {

        } else if (error.status == 403) {
          this.router.navigate([`admin/dashboard`]);
          this.toastr.error(error.error['message']);
        } else if (error.status == 422) {
          let showError = '';
          for(let err in error.error['message']) {
            showError += `${error.error['message'][err]}`;
          }
          this.toastr.error(showError);
        }
        return throwError(error);
      })
    );

  }
}
