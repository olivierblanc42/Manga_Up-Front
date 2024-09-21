import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {GenderService} from "../../../services/gender.service";
import {Gender, Genders} from "../../../types";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-genders',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  template: `

    <h2>Genre utilisateur</h2>

    <div class="flex flex-col gap-2 mt-4 admin-container">


      <div class="div-form">
        <form class="form-admin" (submit)="handleSubmit($event)">
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
              <p class="text-red-500">{{ error }}</p>
            }

          </div>
          <div class="">
            <button
                type="submit"
                class="bg-slate-600 text-white rounded px-4 py-2"
            >Submit
            </button>
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
          @for (gender of genders?.content; track gender.id) {
            <tr class="border">
              <td>{{ gender.label }}</td>
              <td>
                <a [routerLink]="'/admin/gender/' + gender.id">🔎</a>
                <button (click)="handleRemove(gender.id)">🗑️</button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>



    <div class="pagination">

      @for (page of pages; track page; let count = $index) {
        @if (count === 0) {
          <li>
            <button
                (click)="pagePrevious()"
                [ngClass]="currentPage <= 0 ? 'grey-desactive-btn': 'blue-active-btn'"
                class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >Previous
            </button>
          </li>
        }
        <li>

          <button (click)="pageMangas(page)"
                  class="flex items-center justify-center px-4 h-10 leading-tight text-black bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-yellow-100 dark:hover:text-gray-700"
                  [ngClass]="currentPage===page ? 'bg-yellow-100':'background-color-pagination-yellow'"
          >
            {{ count + 1 }}
          </button>
        </li>
        @if (count === lastPage - 1) {
          <li>
            <button
                (click)="pageNext()"
                [ngClass]="currentPage===lastPage-1 ? 'grey-desactive-btn': 'blue-active-btn'"
                class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Next
            </button>
          </li>
        }
      }

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
          }
        }
      }
    }
  `]
})



export class GendersAdminComponent implements  OnInit{
  genders!: Genders|null;
  label:string="";
  error:string=""
  pages!: number[]; // Nombre de pages
  lastPage!: number;
  currentPage!: number;
  constructor(
      private genderService: GenderService,
      private activatedRoute: ActivatedRoute,
  ){
    this.currentPage=0;

  }
  ngOnInit() {
    this.genderService.getAllGendersPagination()

    this.genderService.currentGendersPaginations.subscribe(genders =>{
      this.genders = genders;

      this.pages = this.convertNumberToArray(this.genders?.totalPages!)
      this.lastPage =this.genders?.totalPages!;


    })

  }

  /**
   * Crée un tableau de la taille spécifiér en paramètre, contenant des valeurs allant de 0 à n+1.
   * @param size La taille du tableau à créer.
   * @returns {Array} Tableau contenant une suite de 0 à n+1.
   */
  convertNumberToArray(size: number){
    const array=new Array<number>(size);
    for (let i = 0; i < array.length; i++) {
      array[i]=i;
    }
    return array;
  }

  /**
   * Récupère la page des commentaires souhaité.
   * @param {string} page
   */
  pageMangas(page: number){
    console.log("dans pageComments page : ", page);
    this.currentPage=page;
    console.log("dans pageComments currentPage : ", this.currentPage);
    this.genderService.getGenders()


  }


  pagePrevious(){
    console.log("dans pagePrevious currentPage : ", this.currentPage);
    if(this.currentPage > 0){
      this.pageMangas(this.currentPage-1);
    }
  }
  pageNext(){
    console.log("dans pageNext currentPage : ", this.currentPage);
    if(this.currentPage < this.lastPage-1){
      this.pageMangas(this.currentPage+1);
    }
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


  /**
   * handleRemove est utilisé ici supprimé des données en base
   *
   * */
  handleRemove(id: number){
    if(confirm("Are you sure to delete" )) {
      this.genderService.removeGenderUser(id)

    }
  }
}
