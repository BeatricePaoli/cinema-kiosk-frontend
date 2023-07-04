import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class MockInterceptor implements HttpInterceptor {

    constructor() { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let url = req.url.toLowerCase();
        let method = req.method.toLowerCase();

        if (environment.mock && method !== 'get') {
            req = req.clone({ method: 'GET' });
        }

        return next.handle(req);

    }
}
