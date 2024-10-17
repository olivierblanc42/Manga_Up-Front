import { Component } from '@angular/core';
import { Address, Gender, User } from '../../../types';
import { UserService } from '../../../services/user.service';
import { GenderService } from '../../../services/gender.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  template: `
    <h1>Compte utilisateur</h1>

    <div class="flex flex-col gap-2 mt-4 admin-container">
        <div class="bg-gray-100 dark:bg-gray-800 transition-colors duration-300 mb-8">
            <div class="container mx-auto p-4">
                <div class="bg-white dark:bg-gray-700 shadow rounded-lg p-6">
                    <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Modifier un utilisateur</h2>
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
                                [(ngModel)]='gender.label' 
                                name="gender"
                                class="border p-2 rounded w-full font-normal dark:placeholder-gray-400 dark:text-gray-500">
                                <option class="dark:placeholder-gray-400 dark:text-gray-500" value="gender" selected disabled>Choisir un genre *</option>
                                <option class="dark:placeholder-gray-400 dark:text-gray-500" *ngFor="let gender_ of genders" [value]="gender_.label">{{ gender_.label }}</option>
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

export class UserEditComponent {
    user! : User;
    genders!: Gender[];

    id: number=-1;
    firstname: string|null ="";
    lastname: string ="";
    password: string="";
    username: string="";
    email: string="";
    gender!: Gender;

    idAddress: number=-1;
    country: string="";
    line1: string="";
    line2: string="";
    line3: string="";
    city: string="";
    department: string="";
    postalCode: string="";

    address!: Address;
    userIdUrl: string|null="";

    currentTime = new Date();
    error: string="";
    
    constructor(
        private userService: UserService,
        private genderService: GenderService,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
    ) {
        
    }

    ngOnInit(): void {
        this.userIdUrl = this.activatedRoute.snapshot.paramMap.get('id');
        this.userService.getUser(this.userIdUrl);
        this.userService.currentDataUser.subscribe( dataUser => {
            this.user = dataUser?.user!
            
            this.id=this.user?.id!;
            this.firstname=this.user?.firstname!;
            this.lastname=this.user?.lastname!;
            this.password=this.user?.password!;
            this.username=this.user?.username!;
            this.email=this.user?.email!;
            this.gender=this.user?.gender!;
            console.log("genderUser : ", this.gender);
            
            this.idAddress=this.user?.address.id!;
            this.country=this.user?.address.country!;
            this.line1=this.user?.address.line1!;
            this.line2=this.user?.address.line2!;
            this.line3=this.user?.address.line3!;
            this.city=this.user?.address.city!;
            this.department=this.user?.address.department!;
            this.postalCode=this.user?.address.postalCode!;
        });

        this.genderService.getGenders();
        this.genderService.currentGender.subscribe( genders => {
            this.genders = genders
            console.log(genders);
            
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
            id:this.idAddress,
            country:this.country,
            line1:this.line1,
            line2:this.line2,
            line3:this.line3,
            city:this.city,
            department:this.department,
            postalCode:this.postalCode,
        }

        let editUser = {
            id: this.id,
            firstname: this.firstname,
            lastname: this.lastname,
            userName:this.username,
            password : this.password,
            email:this.email,
            address: this.address,
            gender: this.gender,
            createdAt:this.currentTime
        }

        this.userService.editUser(editUser).subscribe({
            next: (user: User) => {
                //Mettre flashmessage.
            },
           // error: (err) => console.error('Authentication failed', err)
        });

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
