import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {GenderService} from "../../../services/gender.service";
import {Gender} from "../../../types";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-genders',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    
    <h2>Genre utilisateur</h2>
    
    <div class="flex flex-col gap-2 mt-4 admin-container">
      
    

      <div class="div-form">
        <form class="form-admin"   (submit)="handleSubmit($event)" >
          <h2>Ajout d'un genre d'utilisateur</h2>
          <div class="form-contain">
            <input
                id="Label"
                type="text"
                [(ngModel)]="label"
                name="Label"
                placeholder="label"
            >
          </div>
          <div class="form-contain">

            @if (error) {
              <p class="text-red-500">{{error}}</p>
            }

          </div>
          <div class="">
            <button
                type="submit"
                class="bg-slate-600 text-white rounded px-4 py-2"
            >Submit</button>
          </div>
        </form>
      </div>


      <table>
        <thead>
        <tr>
          <th>Label</th>

        </tr>
        </thead>
        <tbody>
          @for (gender of genders; track gender.id) {
            <tr class="border">
              <td>{{ gender.label  }}</td>
              <td>
                <a [routerLink]="'/admin/gender/' + gender.id">🔎</a>
                <button>🗑️</button>
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
      // border: none;
          }
        }
      }
    }
`]
})



export class GendersAdminComponent implements  OnInit{
  genders!: Gender[];
  label:string="";
  error:string=""
  constructor(
      private genderService: GenderService,
      private activatedRoute: ActivatedRoute,
  ){

  }
  ngOnInit() {
    this.genderService.getGenders()

    this.genderService.currentGender.subscribe(genders =>{
      this.genders = genders;
    })

  }
  handleSubmit(e: SubmitEvent) {
    // Vérifie si le champ 'label' est vide
    if (!this.label) {
      // Définit un message d'erreur si 'label' est vide
      this.error = "Firstname is required";
      return;
    }

    // Appelle le service pour ajouter un nouvel genre avec les données fournies
    this.genderService.addGender({
      label: this.label,
    });

    this.reloadPage()

    this.label ="";
    this.error="";
  }
  // Recharge la page pour refléter les nouvelles données
  reloadPage() {
    window.location.reload()
  }


}
