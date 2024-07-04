import { Injectable } from '@angular/core';
import { User } from '../types';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

    constructor() { }

    /**
     * Sauvegarde les info utilisateur dans le localStorage.
     * @param {user} user
     */
    setUser(user: User): void{
        localStorage.setItem("user", JSON.stringify(user));
    }

    /**
     * Retourne les info de l'utilisateur.
     * @returns {string | null} 
     */
    getUser(): User | null{
        return JSON.parse(localStorage.getItem("user") ?? "{}" ) 
    }

    isLogged(){
        return this.getUser() ? true : false;
    }

    logout(){
        localStorage.removeItem("user");
    }
}
