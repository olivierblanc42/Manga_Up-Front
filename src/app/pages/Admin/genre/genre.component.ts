import {Component, OnInit} from '@angular/core';
import {DataGenre, GenreDto, UpdateGenreDto} from "../../../types";
import {GenreService} from "../../../services/genre.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePipe, NgClass} from "@angular/common";
import {catchError, finalize, tap} from "rxjs/operators";
import {throwError} from "rxjs";
import {MangaService} from "../../../services/manga.service";

@Component({
  selector: 'app-genre',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    DatePipe,
    RouterLink,
    NgClass
  ],
  template: `
    <section class="admin-container">


      <h1>Information sur le Genre {{ data?.genre?.label }}  </h1>
      <div  class="div-form" >
        <form class="form-admin"  (submit)="handleSubmit($event)" >
          <div class=" form-contain" >
            <input
                id="label"
                type="text"
                [(ngModel)]="label"
                name="label"
                placeholder="label"
            >
          </div>
          <div class="">
            <button
                type="submit"
                class="bg-slate-600 text-white rounded px-4 py-2"
            >Submit</button>
          </div>
        </form>

      </div>

      <p><span>date de creation: </span>{{data?.genre?.createdDate | date: 'dd-MM-yyyy'}}</p>

      <div>
        <h2> liste des mangas</h2>

        @if(data?.mangas?.content?.length ===0 ){
          <p>il n'y a pas encore de manga dans ce genre</p>
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

            <button (click)="pagesGenre(page)"
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
    td{
      text-align: center;
    }
  `]
})
export class GenreAdminComponent implements OnInit{
  idOfUrl!:number; // id du genre récupéré à partir de l'url.
  pages!: number[]; // Nombre de page
  lastPage!: number;
  currentPage!: number;
  data! : DataGenre | null;
  base64G:string="data:image/webp;base64,";
  label!:string| undefined;
  error:string="";

  constructor(
      private genreService: GenreService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private mangaService: MangaService,

  ){
    this.currentPage=0;

  }

  ngOnInit(): void {
    this.idOfUrl=parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);

    this.genreService.getMangaGenre(this.idOfUrl)

    this.genreService.currentDataGenre.subscribe( dataGenre =>{
      this.data = dataGenre;
      console.log(dataGenre);
      this.label = dataGenre?.genre.label;
      this.pages = this.convertNumberToArray(this.data?.mangas?.totalPages!)
      this.lastPage =this.data?.mangas?.totalPages!;
    } )

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
   * Récupère la page des genres souhaités.
   * @param {string} page
   */
  pagesGenre(page: number){
    console.log("dans pageComments page : ", page);
    this.currentPage=page;
    console.log("dans pageComments currentPage : ", this.currentPage);
    this.mangaService.getMangas(page);
  }


  pagePrevious(){
    console.log("dans pagePrevious currentPage : ", this.currentPage);
    if(this.currentPage > 0){
      this.pagesGenre(this.currentPage-1);
    }
  }
  pageNext(){
    console.log("dans pageNext currentPage : ", this.currentPage);
    if(this.currentPage < this.lastPage-1){
      this.pagesGenre(this.currentPage+1);
    }
  }



  /**
   * handleSubmit est utilisé ici pour envoyé de nouvel donné en base
   *
   * */
  handleSubmit(e: SubmitEvent) {
    const updateGenre: UpdateGenreDto ={
      id: this.idOfUrl,
      label:this.label
    }
    this.genreService.updateGenre(updateGenre)
        .pipe(
            tap(response =>{
              console.log('category update')
              this.router.navigate(['/admin/genres']);
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
