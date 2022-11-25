import { Injectable } from '@angular/core';
import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { SessionStorageService } from '../services/front/session-storage.service';
import { environment } from 'src/environments/environment';
const TOKEN_HEADER_KEY = 'Authorization'; 
@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  _authToken: string;
  constructor(private sessionStorageService: SessionStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = req.clone({
      url: environment.apiUrl + req.url,
      headers: req.headers.set('Content-Type', 'application/json')
    });
    this._authToken = this.sessionStorageService.getKey('AUTH_TOKEN');
    if (this._authToken) {
      const tokenizedReq = apiReq.clone({ 
        headers: apiReq.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this._authToken)
      });
      return next.handle(tokenizedReq);
    }
    return next.handle(apiReq);
  }
}

export const InterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
];