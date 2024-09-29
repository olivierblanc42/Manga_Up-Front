import {Component, OnDestroy, OnInit} from '@angular/core';
import {AddressDto, GenderDto, User} from "../../../types";
import {UserService} from "../../../services/user.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {GenderService} from "../../../services/gender.service";
import {AddressService} from "../../../services/address.service";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `

      <h2>Compte utilisateur</h2>

      <div class="div-form admin-container">

          <form class="form-admin"   #authorForm="ngForm"  (submit)="handleSubmit($event)" >
              <h2>Ajout d'un auteur</h2>
              <div class="form-contain">
                  <label class="text-sm" for="firstname">firstname </label>

                  <input
                          id="firstname"
                          type="text"
                          [(ngModel)]="firstname"
                          name="firstname"
                  >
              </div>
              <div class="form-contain">
                  <label class="text-sm" for="lastname">lastname </label>
                  <input
                          id="lastname"
                          type="text"
                          [(ngModel)]="lastname"
                          name="lastname"
                  >
              </div>
              <div class="form-contain">
                  <label class="text-sm" for="username">username </label>
                  <input
                          id="username"
                          type="text"
                          [(ngModel)]="username"
                          name="username"
                  >
              </div>
              <div class="form-contain">
                  <label class="text-sm" for="Email">Email </label>
                  <input
                          id="Email"
                          type="email"
                          [(ngModel)]="email"
                          name="Email"
                  >
              </div>
              <div class="form-contain">
                  <label class="text-sm" for="password">Mot de passe </label>
                  <input
                          id="password"
                          type="password"
                          [(ngModel)]="password"
                          name="password"
                  >
              </div>

              <div class="form-contain" >
                  <select id="gender-select" name="gender"  [(ngModel)]="selectedGender"  >
                      <option value="" disabled selected>choisir une catégorie</option>
                      @for(gender of genderDto ;track gender.id){
                          <option [value]="gender.id"  >{{gender.label}}</option>
                      }
                  </select>
                  
              </div>

              <div class="form-contain" >
                  <select id="address-select" name="address"  [(ngModel)]="selectedAddress"  >
                      <option value="" disabled selected>choisir une adresse</option>
                      @for(address of addressDto ;track address.id){
                          <option [value]="address.id"  >{{address.line1}}, {{address.line2}}, {{address.line3}},{{address.city}},{{address.postalCode}}</option>
                      }
                  </select>

              </div>
              
              <div class="flex flex-col gap-1">
                  @if (error) {
                      <p class="text-red-500">{{error}}</p>
                  }
                  <div class="flex justify-center">
                      <button
                              type="submit"
                              class="bg-slate-600 text-white rounded px-4 py-2"
                      >Submit</button>
                  </div>
              </div>
          </form>
         
      </div>
      <div class="flex flex-col gap-2 mt-4 admin-container">

      <table>
          <thead>
          <tr>
              <th>Utilisateur</th>
              <th>Email</th>
              <th>Action</th>
          </tr>
          </thead>
          <tbody>
              @for (user of users; track user.id) {
                  <tr class="border">
                      <td>{{"lastname: " +user.lastname + " " +" "+ user.firstname}}</td>
                      <td>{{user.email}}</td>
                      <td>
                          <a [routerLink]="'/admin/users/' + user.id">🔎</a>
                          <button >🗑️</button>
                      </td>
                  </tr>
              }
          </tbody>
      </table>
      </div>
  `,
  styles: [`
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
    genderDto!: GenderDto[];
    addressDto!: AddressDto[];
    firstname: string ="";
    lastname: string ="";
    password: string="";
    username:string="";
    currentTime = new Date();
    email:string="";
    error: string="";
    selectedGender!:number;
    selectedAddress!:number;

    constructor(
      private userService: UserService,
      private genderService: GenderService,
      private addressService: AddressService
  ) {}


  ngOnInit(): void {
     this.userService.getUsers()
     this.userService.currentUsers.subscribe( users => {
       this.users = users
     })

      this.genderService.getGenderDto();
     this.genderService.currentGenderDto.subscribe(gender =>{
        this.genderDto = gender;
     })

      this.addressService.getAddressesDto()
      this.addressService.currentAddressesDto.subscribe(address =>{
          this.addressDto =address;
      })
  }

    handleSubmit(e: SubmitEvent) {
        // Vérifie si le champ 'firstname' est vide
        if (!this.firstname) {
            // Définit un message d'erreur si 'firstname' est vide
            this.error = "Firstname is required";
            return;
        }
        // Vérifie si le champ 'description' est vide
        if (!this.lastname) {
            // Définit un message d'erreur si 'description' est vide
            this.error = "lastname is required";
            return;
        }
        // Vérifie si le champ 'password' est vide
        if (!this.password) {
            // Définit un message d'erreur si 'description' est vide
            this.error = "password is required";
            return;
        }
        // Appelle le service pour ajouter un nouvel auteur avec les données fournies

        this.userService.addUserDto({
            fisrtname : this.firstname,
            lastname: this.lastname,
            userName:this.username,
            password : this.password,
            email:this.email,
            createdAt:this.currentTime,
            addressId:this.selectedAddress,
            genderId:this.selectedGender
        });



            this.firstname ="";
            this.lastname ="";
            this.username ="";
            this.password ="";
            this.email ="";


    }

}
