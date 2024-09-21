import {Component, OnInit} from '@angular/core';
import {Category, CategoryDto, DataCategory, GenderDto} from "../../../types";
import {CategoryService} from "../../../services/category.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {catchError, finalize, tap} from "rxjs/operators";
import {throwError} from "rxjs";
import {NgClass} from "@angular/common";
import {MangaService} from "../../../services/manga.service";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgClass
  ],
  template: `
    <section class="admin-container">

      <div class="div-form">
        <form class="form-admin"   (submit)="handleSubmit($event)"    >
          <h2>Information sur le catégorie <span> {{ data?.category?.name}}</span></h2>
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
      <div>
        <h2> liste des mangas</h2>

        @if(data?.mangas?.content?.length ===0 ){
          <p>il n'y a pas encore de manga dans cette category</p>
        }@else{
          <div class="flex flex-col gap-2 mt-4 admin-container">
            <table>
              <thead>
              <th>Title</th>
              <th>Résumé</th>
              <th>voir en détail</th>
              </thead>
              <tbody >
                @for (manga of data?.mangas?.content  ; track manga.id) {
                  <tr class="border">

                    <td>{{ manga.title}}</td>
                    <td>{{manga.summary}}</td>
                    <td> <a [routerLink]="'/admin/manga/' + manga.id">🔎</a></td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

        }
      </div>
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

            <button (click)="pageMangas(page)"
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

    </section>
  `,
  styles:  [`
    .admin-container{
      width: 80%;
      margin-right: auto;
      margin-left: auto;
      border-radius: 10px;
      background-color: rgb(37,37,37,50%) ;
      padding: 1rem;
      margin-bottom: 1rem;
      margin-top: 1rem;
      span{
        font-weight: bolder;
        text-transform: uppercase;
      }
    }
    td{
      text-align: center;
    }
  `]
})
export class CategoryAdminComponent implements OnInit{
  idOfUrl!:number; // id du genre récupéré à partir de l'url.
  pages!: number[]; // Nombre de page
  lastPage!: number;
  currentPage!: number;
  data! : DataCategory | null;
  base64G:string="data:image/webp;base64,";
  name:string | undefined="";
  description:string | undefined="";
  error:string="";
  date!: Date;

  constructor(
      private categoryService: CategoryService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private mangaService: MangaService,


  ){
    // this.currentPage=0;
  }

  ngOnInit(): void {
    this.idOfUrl=parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);

    this.categoryService.getMangaCategory(this.idOfUrl);
    this.categoryService.currentDataCategory.subscribe( data =>{
      this.data = data;
      this.description =data?.category?.description;
      this.name = data?.category?.name;
      this.pages = this.convertNumberToArray(this.data?.mangas?.totalPages!)
      this.lastPage =this.data?.mangas?.totalPages!;
    } )


    this.categoryService.currentCategoryDto.subscribe(dto =>{

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
    this.mangaService.getMangas(page);
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

    const updatedCategory: CategoryDto = {
      id: this.idOfUrl,
      name: this.name,
      description: this.description,
      createdAt: this.date
    };
    this.categoryService.updateCategory(updatedCategory)
        .pipe(
            tap(response =>{
              console.log('category update')
              this.router.navigate(['/admin/categories']);
            }),
            catchError(error => {
              // Gérez l'erreur ici (par exemple, afficher un message d'erreur)
              console.error('Error updating category', error);
              this.error = 'Erreur lors de la mise à jour de la category';
              return throwError(error); // Relancez l'erreur pour un traitement supplémentaire si nécessaire
            }),
            finalize(() => {
              // Actions finales à réaliser, qu'il y ait une erreur ou non
            })
        )
        .subscribe(); // Nécessaire pour déclencher l'exécution du pipeline

  }

}
