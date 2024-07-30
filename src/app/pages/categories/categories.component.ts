import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CategoryService} from "../../services/category.service";
import {Categories} from "../../types";
import {CardComponent} from "../../components/card/card.component";
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-categories',
  standalone: true,
    imports: [
        CardComponent ,RouterLink,NgClass
    ],
  template: `
      <section class="container mx-auto px-5 md:px-10	my-5	">

          <h2 class="my-5">Catégories</h2>


          <div class="content-genre">
              @for (category of categories?.content; track category.id) {
                  <a [routerLink]="'/category/' + category.id">
                      <ui-card class="card" size="card-genre">
                        

                          <p>{{ category.name }}</p>
                      </ui-card>
                  </a>
              }
          </div>
      </section>

          <div class="pagination">
             
                  @for(page of pages; track page; let count=$index){
                      @if(count===0){
                          <li>
                              <button
                                      (click)="pagePrevious()"
                                      [ngClass]="currentPage <= 0 ? 'grey-desactive-btn': 'blue-active-btn'"
                                      class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                              >Previous</button>
                          </li>
                      }
                      <li>

                          <button (click)="pageCategory(page)"
                                  class="flex items-center justify-center px-4 h-10 leading-tight text-black bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-yellow-100 dark:hover:text-gray-700"
                                  [ngClass]="currentPage===page ? 'bg-yellow-100':'background-color-pagination-yellow'"
                          >
                              {{count+1}}
                          </button>
                      </li>
                      @if(count===lastPage-1){
                          <li>
                              <button
                                      (click)="pageNext()"
                                      [ngClass]="currentPage===lastPage-1 ? 'grey-desactive-btn': 'blue-active-btn'"
                                      class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
                          </li>
                      }
                  }
              
          </div>
      


  `,
  styles: [`
    
    .content-genre{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      flex-wrap: wrap;
      gap: 2rem 20rem;}

    .card {
      img {
        border-radius: 10px;
        height: 100%;
        width: 100%;
      }
    }

    .pagination{
      display: flex;
      flex-direction: row;
      justify-content: left;
      gap: 1rem;
      padding: 1rem;
      li{
        list-style: none;
      }
    }
    
  `]
})
export class CategoriesComponent implements OnInit {
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
        this.pages = this.convertNumberToArray(this.categories?.totalPages!)
        this.lastPage =this.categories?.totalPages!;
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
