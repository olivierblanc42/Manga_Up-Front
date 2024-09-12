import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterModule, FormsModule, CommonModule],
    template: `
        <div class="boxform" *ngIf="!isAuthenticated">
            <form (submit)="login($event)">
                <div>
                    <label for="username">Username</label>
                    <input id="username" [(ngModel)]="username" name="username" required>
                </div>
                <div>
                    <label for="password">Password</label>
                    <input id="password" type="password" [(ngModel)]="password" name="password" autocomplete="on" required>
                </div>
                <button type="submit">Login</button>
            </form>
            <br>
            <hr>
            <div class="boxform__register">Vous n'avez pas de compte ? <a class="boxform__register--link" routerLink="/register" >Enregistrez-vous !</a></div>
        </div>
        <div *ngIf="isAuthenticated">
            <p>Vous êtes connecté maintenant!</p>
        </div>
  `,
    styles: [`

    .boxform__register{
        margin-top: 1rem;   
    }

    .boxform__register--link{
        color: blue;
        margin-top: 1rem;   
    }

    .boxform{
        margin: 0 auto;
        margin-bottom: 2rem;
        width: 25%
    }

    .login-container {
      max-width: 400px;
      margin: 0 auto;
      padding: 1rem;
      background: #f7f7f7;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    
    h2 {
      text-align: center;
      margin-bottom: 1rem;
      color: #333;
    }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: bold;
    }
    
    input {
      width: 100%;
      padding: 0.5rem;
      margin-bottom: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      color: black;
      font-size: 1rem;
    }
    
    button {
      width: 100%;
      padding: 0.75rem;
      border: none;
      border-radius: 4px;
      background: #007bff;
      color: white;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    
    button:hover {
      background: #0056b3;
    }
  `]

})
export class LoginComponent {
    username: string = '';
    password: string = '';
    isAuthenticated: boolean = false;

    constructor(private authService: AuthService, private router: Router) {}

    login(event: Event) {
        event.preventDefault();
        this.authService.login(this.username, this.password).subscribe({
            next: (user: User) => {
                console.log('User authenticated', user);
                this.isAuthenticated = true;
                this.router.navigate(['/']);
            },
           // error: (err) => console.error('Authentication failed', err)
        });
    }
}
