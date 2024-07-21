import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { AuthInterceptor } from './app/services/auth-interceptor.service';
import { AuthService } from './app/services/auth.service';
import { routes} from "./app/app.routes";

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(),
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        AuthService,
        provideRouter(routes)
    ]
}).catch((err) => console.error(err));
