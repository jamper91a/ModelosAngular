/* tslint:disable:forin */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Util} from './util';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {

    constructor(
        private http: HttpClient,
        public util: Util,

    ) {


    }

    post( endpoint: string, body: any): any {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            }),
            withCredentials: true
        };
        // const token = this.util.getPreference('access_token');
        // if (token) {
        //     httpOptions.headers =
        //         httpOptions.headers.set('Authorization', 'Bearer ' + token);
        // }
      return this.http.post(this.util.url + this.util.apiPrefix + endpoint, body, httpOptions).pipe();
    }
    postWithFiles( endpoint: string, body: FormData): any {

        const httpOptions = {
            headers: new HttpHeaders({
                // 'Content-Type':  'multipart/form-data'
            }),
          withCredentials: true
        };
        const token = this.util.getPreference('access_token');
        // if (token) {
        //     httpOptions.headers =
        //         httpOptions.headers.set('Authorization', 'Bearer ' + token);
        // }
        return this.http.post(this.util.url +  this.util.apiPrefix + endpoint, body, httpOptions);
    }

    get(endpoint: string, params: any): any {
        let fields = '';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            }),
          withCredentials: true
        };
        const token = this.util.getPreference('access_token');
        // if (token) {
        //     httpOptions.headers =
        //         httpOptions.headers.set('Authorization', 'Bearer ' + token);
        // }

        //
        // // Support easy query params for GET requests
        if (params) {
            const p = new URLSearchParams();
            for (const k in params) {
                // noinspection JSUnfilteredForInLoop
                p.set(k, params[k]);
            }
            fields = '?' + p.toString();
            if (fields === '?') {
                fields = '';
            }
        }
        return this.http.get(this.util.url +  this.util.apiPrefix + endpoint + fields, httpOptions);
    }

    patch(endpoint: string, body: any): any {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            }),
          withCredentials: true
        };
        // const token = this.util.getPreference('access_token');
        // if (token) {
        //     httpOptions.headers =
        //         httpOptions.headers.set('Authorization', 'Bearer ' + token);
        // }
        return this.http.patch(this.util.url +  this.util.apiPrefix + endpoint, body, httpOptions);
    }

    put( endpoint: string, body: any): any {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        }),
        withCredentials: true
      };
      // const token = this.util.getPreference('access_token');
      // if (token) {
      //   httpOptions.headers =
      //     httpOptions.headers.set('Authorization', 'Bearer ' + token);
      // }
      return this.http.put(this.util.url + this.util.apiPrefix + endpoint, body, httpOptions);
    }
    delete( endpoint: string, body: any): any {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        }),
        withCredentials: true
      };
      // const token = this.util.getPreference('access_token');
      // if (token) {
      //   httpOptions.headers =
      //     httpOptions.headers.set('Authorization', 'Bearer ' + token);
      // }
      return this.http.delete(this.util.url + this.util.apiPrefix + endpoint, httpOptions);
    }

}
