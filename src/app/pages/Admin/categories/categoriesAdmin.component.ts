import {Component, OnInit} from '@angular/core';
import {Categories} from "../../../types";
import {CategoryService} from "../../../services/category.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
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
          @for (category of categories?.content; track category.id) {
            <tr class="border">
              <td>{{ category.name  }}</td>
              <td>{{ category.description }}</td>
              <td>
                <a [routerLink]="'/admin/category/' + category.id">🔎</a>
                <button>🗑️</button>
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
`]
})
export class CategoriesAdminComponent implements OnInit {
  categories!: Categories|null;
  pages!: number[]; // Nombre de page
  lastPage!: number;
  currentPage!: number;
  base64G:string="data:image/webp;base64,";

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
   * Récupère la page des commentaires souhaité.
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
}
