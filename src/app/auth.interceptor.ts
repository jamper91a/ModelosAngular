import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {from, Observable, throwError} from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import {UsersService} from './api/service/users.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    public usersService: UsersService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const self = this;
    return next.handle(request).pipe(catchError(error => {
        if (error.status === 401) {
            return this.reAuthenticate(error.error)
              .pipe(
                switchMap(() => next.handle(request))
              );
        }
        return throwError(error);
      })
    )
  }
  reAuthenticate(error): Observable<any> {
    if(error.message === 'TokenExpiredError') {
      //Refresh token
      return from(this.usersService.refreshToken())
        .pipe(catchError(async err => {
          await this.usersService.logOut();
          throw 'Token could not be refresh'
        }));
    } else{
      throw 'Token could not be refresh'
    }
  }



  //Error handling function
  // private handleError(error: HttpErrorResponse, request: HttpRequest<unknown>, next: HttpHandler) {
  //   const self = this;
  //   console.log('New error', error);
  //   if (error.status == 401) {
  //     if(error.error.message === 'TokenExpiredError') {
  //       //Refresh token
  //       from(this.reAuthenticate(error))
  //       self.usersService.refreshToken().then(function(){
  //         console.log('Token refreshed');
  //         return next.handle(request);
  //       }).catch(function(){
  //
  //       });
  //     } else{
  //       //Log out
  //       self.usersService.logOut().then(function(){
  //
  //       }).catch(function(){
  //
  //       });
  //
  //     }
  //
  //   } else {
  //     return throwError(error);
  //   }
  // }
}
