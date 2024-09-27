import { AccountService } from './../../services/account.service';
import { UserService } from './../../services/user.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterModule, FormsModule, CommonModule],
    template: `

    <!-- Modal toggle -->
<!--    <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
    Toggle modal
    </button>-->

    <!-- Main modal -->
    <div id="authentication-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Sign in to our platform
                    </h3>
                    <button type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-4 md:p-5">
                    <form class="space-y-4" action="#">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                        <div class="flex justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                </div>
                                <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                            </div>
                            <a href="#" class="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                        </div>
                        <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered? <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div> 


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

    constructor(
      private authService: AuthService, 
      private router: Router,
    ) {}

    login(event: Event) {
        event.preventDefault();
        this.authService.login(this.username, this.password).subscribe({
            next: (user: User) => {
                this.isAuthenticated = true;
                this.router.navigate(['/']);
            },
        // error: (err) => console.error('Authentication failed', err)
        });
    }
}
