/*
* Un Guard sur Angular est une fonctionnalité qui vous permet de contrôler l'accès à des routes spécifiques dans votre application.
* Vous pouvez utiliser des guards pour exécuter certaines vérifications ou actions avant de permettre l'accès à une route,
* par exemple pour vérifier si l'utilisateur est authentifié ou a les droits d'accès appropriés.
* */

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean {
        if (this.authService.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
