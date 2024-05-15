import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class CustomInterceptor implements HttpInterceptor{

    constructor(){}
    private apiEndpointsRequiringToken: string[] = [
        // 'http://127.0.0.1:8000/login-user',
        'http://127.0.0.1:8000/location/' ,
        'http://127.0.0.1:8000/devices/',
        'http://127.0.0.1:8000/user-profile',
        'http://127.0.0.1:8000/token/refresh',
        'http://127.0.0.1:8000/send-sms/'
    ];

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const shouldAddToken = this.apiEndpointsRequiringToken.some(endpoint => req.url.includes(endpoint));

        if (shouldAddToken) {
            const localToken = localStorage.getItem('accToken');
            req = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localToken)
            });
        }

        return next.handle(req);
    }
}