
/*
* Un Guard sur Angular est une fonctionnalité qui vous permet de contrôler l'accès à des routes spécifiques dans votre application.
* Vous pouvez utiliser des guards pour exécuter certaines vérifications ou actions avant de permettre l'accès à une route,
* par exemple pour vérifier si l'utilisateur est authentifié ou a les droits d'accès appropriés.
* */

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import {User} from "../types";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean {

        const userData = localStorage.getItem("user");

        if(userData){
            const user  = JSON.parse(userData) as User;
            const isAdmin = user.roles.find((role) => role.role === "ADMIN");
            console.log("isAdmin", isAdmin);
            console.log("this.authService.isAuthenticated()", this.authService.isAuthenticated());

            if(isAdmin && this.authService.isAuthenticated()){
                console.log("this.authService.isAuthenticated()", this.authService.isAuthenticated());
                return true;
            } else {
                this.router.navigate(['/']);
                return false;
            }

        }else {
            this.router.navigate(['/login']);
            return false;
        }

    }
}
