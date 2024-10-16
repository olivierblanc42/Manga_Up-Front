import {Component, OnDestroy, OnInit} from '@angular/core';
import {Address, Gender, Genre, User} from "../../../types";
import {UserService} from "../../../services/user.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {GenreService} from '../../../services/genre.service';
import {GenderService} from '../../../services/gender.service';
import { map } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
    template: `

    <h1>Compte utilisateur</h1>

    <div class="flex flex-col gap-2 mt-4 admin-container">
        <div class="bg-gray-100 dark:bg-gray-800 transition-colors duration-300 mb-8">
            <div class="container mx-auto p-4">
                <div class="bg-white dark:bg-gray-700 shadow rounded-lg p-6">
                    <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Ajout d'un utilisateur</h2>
                    <form class="form-admin" #authorForm="ngForm"  (submit)="handleSubmit($event)">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input 
                                id="lastname"
                                type="text" 
                                placeholder="Nom *" 
                                [(ngModel)]="lastname"
                                name="lastname"
                                class="border p-2 rounded w-full ">
                            <input 
                                id="firstname"
                                type="text" 
                                placeholder="Prénom *" 
                                [(ngModel)]="firstname"
                                name="firstname"
                                class="border p-2 rounded w-full">
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input 
                                id="username"
                                type="text" 
                                placeholder="Nom d'utilisateur *" 
                                [(ngModel)]="username"
                                name="username"
                                class="border p-2 rounded w-full">
                            <input 
                                id="Email"
                                type="email" 
                                placeholder="E-mail *" 
                                [(ngModel)]="email"
                                name="Email"
                                class="border p-2 rounded w-full">
                        </div> 	
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input 
                                id="password"
                                type="password" 
                                placeholder="Mot de passe *" 
                                [(ngModel)]="password"
                                name="password"
                                class="border p-2 rounded w-full"
                                autocomplete="on">
                            <select
                                id="genderId"
                                [(ngModel)]="gender" 
                                name="gender"
                                class="border p-2 rounded w-full font-normal dark:placeholder-gray-400 dark:text-gray-500">
                                <option class="dark:placeholder-gray-400 dark:text-gray-500" [value]="gender" selected disabled>Choisir un genre *</option>
                                <option class="dark:placeholder-gray-400 dark:text-gray-500" *ngFor="let gender of genders" [ngValue]="gender">{{ gender.label }}</option>
                            </select>   
                        </div> 	
                        <div class="mb-4">
                            <input 
                                type="text" 
                                placeholder="Pays" 
                                [(ngModel)]="country"
                                name="country"                        
                                class="border p-2 rounded w-full">
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <input 
                                type="text" 
                                placeholder="Rue"
                                [(ngModel)]="line1"
                                name="line1"
                                class="border p-2 rounded w-full">
                            <input 
                                type="text" 
                                placeholder="Complément"
                                [(ngModel)]="line2"
                                name="line2"
                                class="border p-2 rounded w-full">
                            <input 
                                type="text" 
                                placeholder="Complément"
                                [(ngModel)]="line3"
                                name="line3"
                                class="border p-2 rounded w-full">
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <input 
                                type="text" 
                                placeholder="Ville"
                                [(ngModel)]="city"
                                name="city"
                                class="border p-2 rounded w-full">
                            <input 
                                type="text" 
                                placeholder="Département"
                                [(ngModel)]="department"
                                name="department"
                                class="border p-2 rounded w-full">
                            <input 
                                type="text" 
                                placeholder="Code postal"
                                [(ngModel)]="postalCode"
                                name="postalCode" 
                                class="border p-2 rounded w-full">
                        </div>
                        <div class="flex flex-col gap-1">
                            @if (error) {
                                <p class="text-red-500">{{error}}</p>
                            }
                            <div class="flex justify-center mt-4">
                                <button  id="theme-toggle" class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors">
                                    Valider
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
        <table class="table table-hover ">
            <thead>
                <tr class="default">
                    <th scope="col">ID</th>
                    <th scope="col">Utilisateur</th>
                    <th scope="col">Email</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                @for (user of users; track user.id; let i=$index) {
                    <tr class="border" [ngClass]="{ 'default': i % 2 !== 0, 'table-dark': $index % 2 === 0 }">
                        <td>{{user.id}}</td>
                        <td>{{user.lastname + " " +" "+ user.firstname}}</td>
                        <td>{{user.email}}</td>
                        <td>
                            <a [routerLink]="'/admin/users/' + user.id">🔎</a>
                            <a [routerLink]="'/admin/users/edit/' + user.id">📝</a>
                            <button >🗑️</button>
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    </div>

  `,
  styles: [`
    .default{
        background-color:rgb(44, 52, 65);
    }
    .table-dark{
        background-color:rgb(25, 33, 44);
    }
    .admin-container{
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        background-color: rgb(37,37,37,50%) ;
        border-radius: 10px;
        table{
            tbody{
            tr{
                border: none;
            }
            }
        }
    }
`]
})

export class UsersComponent  implements OnInit {
    users! : User[];
    genders!: Gender[];

    firstname: string ="";
    lastname: string ="";
    password: string="";
    username: string="";
    email: string="";
    gender!: Gender;
    country: string="";
    line1: string="";
    line2: string="";
    line3: string="";
    city: string="";
    department: string="";
    postalCode: string="";
    address!: Address;

    currentTime = new Date();
    error: string="";
    
    constructor(
        private userService: UserService,
        private genderService: GenderService,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.userService.getUsers()
        this.userService.currentUsers.subscribe( users => {
            this.users = users
        });
        this.genderService.getGenders();
        this.genderService.currentGender.subscribe( genders => {
            this.genders = genders
        });
    }

    handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        // Vérifie si le champ 'description' est vide
        if (!this.lastname) {
            // Définit un message d'erreur si 'lastname' est vide
            this.error = "Le nom de famille est obligatoire";
            return;
        }
        // Vérifie si le champ 'firstname' est vide
        if (!this.firstname) {
            // Définit un message d'erreur si 'firstname' est vide
            this.error = "Le prénom est requis";
            return;
        }
        // Vérifie si le champ 'password' est vide
        if (!this.password) {
            // Définit un message d'erreur si 'password' est vide
            this.error = "Le mot de passe est requis";
            return;
        }
        if (!this.gender) {
            // Définit un message d'erreur si 'gender' est vide
            this.error = "Le genre est requis";
            return;
        }
        // Appelle le service pour ajouter un nouvel auteur avec les données fournies

        this.address={
            country: this.country,
            line1: this.line1,
            line2: this.line2,
            line3: this.line3,
            city: this.city,
            department: this.department,
            postal_code: this.postalCode,
        }

        let registerUser = {
            firstname: this.firstname,
            lastname: this.lastname,
            username: this.username,
            password: this.password,
            email: this.email,
            gender: this.gender,
            address: this.address,
            createdAt: this.currentTime
        }

        this.authService.register(registerUser).subscribe({
            next: (user: User) => {
                //Mettre flashmessage.
            },
           // error: (err) => console.error('Authentication failed', err)
        });

        //this.userService.addUser({
        //    firstname: this.firstname,
        //    lastname: this.lastname,
        //    userName:this.username,
        //    password : this.password,
        //    email:this.email,
        //    genderId: this.genderId,
        //    address: this.address,
        //    createdAt:this.currentTime
        //});

        //this.reloadPage()

        this.firstname ="";
        this.lastname ="";
        this.username ="";
        this.password ="";
        this.email ="";
        this.gender;
        this.country="";
        this.line1="";
        this.line2="";
        this.line3="";
        this.city="";
        this.department="";
        this.postalCode="";
        }

    // Recharge la page pour refléter les nouvelles données
    reloadPage() {
        window.location.reload()
    }
}
