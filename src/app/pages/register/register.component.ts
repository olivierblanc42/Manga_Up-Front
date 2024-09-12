import { GenderService } from './../../services/gender.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Gender, User } from '../../types';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  template: `
        <div class="boxform" *ngIf="!isAuthenticated">
            <form class="boxform__form" [formGroup]="registerForm" (ngSubmit)="onSubmit($event)">
                <div>
                    <label for="username">Username</label>
                    <input id="username" type="text" formControlName="username" required>
                </div>
                <div>
                    <label for="email">Email</label>
                    <input id="email" type="email" formControlName="email" required>
                </div>
                <div>
                    <label for="firstname">Firstname</label>
                    <input id="firstname" type="text" formControlName="firstname" required>
                </div>
                <div>
                    <label for="lastname">Lastname</label>
                    <input id="lastname" type="text" formControlName="lastname" required>
                </div>
                <div>
                    <label for="password">Password</label>
                    <input id="password" type="password" formControlName="password" autocomplete="on" required>
                </div>
                <div>
                    <label for="line1">Line1</label>
                    <input id="line1" type="text" formControlName="line1" required>
                </div>
                <div>
                    <label for="line2">Line2</label>
                    <input id="line2" type="text" formControlName="line2" required>
                </div>
                <div>
                    <label for="line3">Line3</label>
                    <input id="line3" type="text" formControlName="line3" required>
                </div>
                <div>
                    <label for="city">City</label>
                    <input id="city" type="text" formControlName="city" required>
                </div>
                <div>
                    <label for="postalCode">PostalCode</label>
                    <input id="postalCode" type="text" formControlName="postalCode" required>
                </div>
                <div class="boxform__form--genders">
                    <label for="gender">Choose a gender :</label>
                    <select id="gender" formControlName="gender">
                        <option value="" disabled>Choose a gender</option>
                        <option class="boxform__form--genders-option" *ngFor="let genre of genders" [ngValue]="genre" required>
                            {{genre.label}}
                        </option>
                    </select>
                </div>
                <button type="submit" [disabled]="!registerForm.valid">Register</button>
            </form>
            <br>
            <hr>
            <br>
            <div class="boxform__login">Vous avez un compte ? <a class="boxform__login--link" routerLink="/login" >Connectez-vous !</a></div>
        </div>
        <div *ngIf="isAuthenticated">
            <p>Vous êtes enregistré maintenant!</p>
        </div>
  `,
  styles: [`

    select{
        width: 100%;
        padding: 0.5rem;
        margin-bottom: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        color: black;
        font-size: 1rem;
    }

    #gender{
        width: -webkit-fill-available;
    }

    .boxform__login--link{
        color: blue;
        margin-top: 1rem;   
    }

    .boxform{
        margin: 0 auto;
        margin-bottom: 2rem;
        width: 25%
    }

    .register-container {
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
export class RegisterComponent {
    
    registerForm: FormGroup = this._formBuilder.group({
        username: ["", Validators.compose([Validators.required])],
        email: ["", Validators.compose([Validators.required])],
        firstname: ["", Validators.compose([Validators.required])],
        lastname: ["", Validators.compose([Validators.required])],
        password: ["", Validators.compose([Validators.required])],
        line1: ["", Validators.compose([Validators.required])],
        line2: ["", Validators.compose([Validators.required])],
        line3: ["", Validators.compose([Validators.required])],
        city: ["", Validators.compose([Validators.required])],
        postalCode: ["", Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('^[0-9]*$')])],
        gender: ["", Validators.compose([Validators.required])],
    });

    genders!: Gender[];
    isAuthenticated: boolean=false;

    constructor(private genderService: GenderService, private authService: AuthService, private router: Router, private _formBuilder: FormBuilder) {}

    ngOnInit(){
        this.genderService.getGenders();

        this.genderService.currentGender.subscribe(genders =>{
            this.genders = genders;
          })
    }


    onSubmit(event: Event){
        event.preventDefault();
        let address = {
            line1: this.registerForm.value.line1,
            line2: this.registerForm.value.line2,
            line3: this.registerForm.value.line3,
            city: this.registerForm.value.city,
            postalCode: this.registerForm.value.postalCode,
        };

        let registerUser = {
            username: this.registerForm.value.username,
            email: this.registerForm.value.email,
            firstname: this.registerForm.value.firstname,
            lastname: this.registerForm.value.lastname,
            password: this.registerForm.value.password,
            address: address,
            gender: this.registerForm.value.gender,
        }
        
        this.authService.register(registerUser).subscribe({
            next: (user: User) => {
                console.log('User authenticated', user);
                this.isAuthenticated = true;
                this.router.navigate(['/']);
            },
           // error: (err) => console.error('Authentication failed', err)
        });
        //console.log("slaut");
        
    }
}
