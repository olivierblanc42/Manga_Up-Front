/*
*Les intercepteurs HTTP sont des outils très utiles dans les applications Angular qui permettent de traiter les requêtes et les réponses HTTP avant qu'elles ne soient envoyées ou reçues par le serveur.
* Ils peuvent être utilisés pour ajouter, modifier ou supprimer des données dans les entêtes de la requête ou de la réponse, pour ajouter un message de chargement ou pour effectuer une action spécifique en cas d'erreur.

Voici quelques exemples d'utilisation des intercepteurs HTTP :

Ajout d'un token d'authentification dans les entêtes de la requête, comme dans l'exemple précédent.
Ajout d'un message de chargement lors de l'envoi d'une requête et de son masquage lors de la réception de la réponse.
Gestion des erreurs en cas d'échec de la requête, par exemple en affichant un message d'erreur ou en redirigeant l'utilisateur vers une page d'erreur.
Modification des données de la requête avant qu'elles ne soient envoyées, par exemple en ajoutant un préfixe à l'URL ou en convertissant les données en format JSON.
* */


import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    // Si non authorisé, redirection vers login
                    this.router.navigate(['/login']);
                }
                return throwError(error);
            })
        );
    }
}
