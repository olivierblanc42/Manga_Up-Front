import {Component, OnInit} from '@angular/core';
import {GenreService} from "../../../services/genre.service";
import {Genres} from "../../../types";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
    <h2>Genre des mangas</h2>
    <div class="flex flex-col gap-2 mt-4 admin-container">
      <table>
        <thead>
        <tr>
          <th>Label</th>
  
        </tr>
        </thead>
        <tbody>
          @for (genre of genres?.content; track genre.id) {
            <tr class="border">
              <td>{{ genre.label  }}</td>
             
              <td>
                <a [routerLink]="'/admin/genre/' + genre.id">🔎</a>
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
export class GenresAdminComponent implements OnInit{

  constructor(
      private genreService: GenreService,

  ){
    this.currentPage=0;
  }

  genres!:Genres|null;
  pages!: number[]; // Nombre de page
  lastPage!: number;
  currentPage!: number;
  base64G:string="data:image/webp;base64,";


  ngOnInit(): void {
    this.genreService.getGenres()
    this.genreService.currentGenrePagination.subscribe(genres =>{
      this.genres = genres;
      this.pages = this.convertNumberToArray(this.genres?.totalPages!)
      this.lastPage =this.genres?.totalPages!;
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
  pageGenres(page: number){
    console.log("dans pageGenres page : ", page);
    this.currentPage=page;
    console.log("dans pageGenres currentPage : ", this.currentPage);
    this.genreService.getGenres(page);
  }


  pagePrevious(){
    console.log("dans pagePrevious currentPage : ", this.currentPage);
    if(this.currentPage > 0){
      this.pageGenres(this.currentPage-1);
    }
  }
  pageNext(){
    console.log("dans pageNext currentPage : ", this.currentPage);
    if(this.currentPage < this.lastPage-1){
      this.pageGenres(this.currentPage+1);
    }
  }
}
