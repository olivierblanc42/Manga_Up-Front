import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, CommonModule],
    template: `
    <div>
      <h2>Login</h2>
      <form (submit)="login($event)">
        <label for="username">Username</label>
        <input type="text" [(ngModel)]="username" name="username" required>
        
        <label for="password">Password</label>
        <input type="password" [(ngModel)]="password" name="password" required>
        
        <button type="submit">Login</button>
      </form>
    </div>
  `,
    styles: [`
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

    constructor(private authService: AuthService, private router: Router) {}

    login(event: Event) {
        event.preventDefault();
        this.authService.login(this.username, this.password).subscribe({
            next: (user: User) => {
                console.log('User authenticated', user);
                this.router.navigate(['/']);
            },
           // error: (err) => console.error('Authentication failed', err)
        });
    }
}
