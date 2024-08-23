import {Component, OnInit} from '@angular/core';
import {Categories} from "../../../types";
import {CategoryService} from "../../../services/category.service";
import {RouterLink} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    
    <h2>Catégories</h2>

   
    
    
    <div class="flex flex-col gap-2 mt-4 admin-container">



      <div class="div-form">
        <form class="form-admin"     (submit)="handleSubmit($event)" >
          <h2>Ajout d'une catégorie</h2>
          <div class="form-contain">
            <input
                id="name"
                type="text"
                [(ngModel)]="name"
                name="name"
                placeholder="nom de la catégorie"
            >
          </div>
          <div class="form-contain text_area">
             <textarea
                 id="description"
                 type="text"
                 [(ngModel)]="description"
                 name="description"
                 placeholder="Description "

             >
          </textarea>
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
          <th>Nom</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
          @for (category of categories?.content; track category.id) {
            <tr class="border">
              <td>{{ category.name  }}</td>
              <td>{{ category.description }}</td>
              <td>
                <a [routerLink]="'/admin/category/' + category.id">🔎</a>
                <button (click)="handleRemove(category.id)">🗑️</button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>





  `,
  styles:  [`
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
    textarea{
      color:black;
    }

    input{
      color:black;
      width: 100%;
    }
    
`]
})
export class CategoriesAdminComponent implements OnInit {
  categories!: Categories|null;
  pages!: number[]; // Nombre de pages
  lastPage!: number;
  currentPage!: number;
  base64G:string="data:image/webp;base64,";
  name:string="";
  description:string="";
  error:string="";
  currentTime = new Date();

  constructor(
      private categoryService : CategoryService
  ) {
    this.currentPage=0;
  }

  ngOnInit() {
    this.categoryService.getCategories()
    this.categoryService.currentCategoryPagination.subscribe(categories =>{
      this.categories =categories;
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
   * Récupère la page des commentaires souhaités.
   * @param {string} page
   */
  pageCategory(page: number){
    console.log("dans pageCategory page : ", page);
    this.currentPage=page;
    console.log("dans pageCategory currentPage : ", this.currentPage);
    this.categoryService.getCategories(page);
  }


  pagePrevious(){
    console.log("dans pagePrevious currentPage : ", this.currentPage);
    if(this.currentPage > 0){
      this.pageCategory(this.currentPage-1);
    }
  }
  pageNext(){
    console.log("dans pageNext currentPage : ", this.currentPage);
    if(this.currentPage < this.lastPage-1){
      this.pageCategory(this.currentPage+1);
    }
  }

  /**
   * handleSubmit est utilisé ici pour envoyé de nouvel donné en base
   *
   * */
  handleSubmit(e: SubmitEvent) {
    // Vérifie si le champ 'firstname' est vide
    if (!this.name) {
      // Définit un message d'erreur si 'firstname' est vide
      this.error = "Firstname is required";
      return;
    }
    // Vérifie si le champ 'description' est vide
    if (!this.description) {
      // Définit un message d'erreur si 'description' est vide
      this.error = "description is required";
      return;
    }
    // Appelle le service pour ajouter un nouvel auteur avec les données fournies

    this.categoryService.addCategoryTest({
      name: this.name,
      description: this.description,
      createdAt : this.currentTime

    });

    this.reloadPage()

    this.name ="";
    this.description="";
    this.error="";

  }

  /**
   * handleRemove est utilisé ici supprimé des données en base
   *
   * */
  handleRemove(id: number){
    if(confirm("Are you sure to delete" )) {
     this.categoryService.removeCategory(id)
      this.reloadPage()

    }
  }


  // Recharge la page pour refléter les nouvelles données
  reloadPage() {
    window.location.reload()
  }



}
