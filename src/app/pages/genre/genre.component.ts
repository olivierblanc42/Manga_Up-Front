gitimport {Component, OnInit} from '@angular/core';
import {Comment, DataGenre, Picture, User} from '../../types';
import {MangaService} from "../../services/manga.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";
import {GenreService} from "../../services/genre.service";
import {CardComponent} from "../../components/card/card.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgClass} from "@angular/common";
import {faHouse} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-genre',
  standalone: true,
  imports: [
    CardComponent,
    FaIconComponent,
    RouterLink,
    NgClass
  ],
  template: `

    
    <section class="container mx-auto px-5 md:px-10  my-5\t">

      <div class="path block -ml-20 mb-20 text-sx"><a href="/"><span><fa-icon [icon]="faHouse" size="1x"></fa-icon></span></a ><span><a [routerLink]="'/genres/'"  >/Genre</a></span><span>/{{dataGenre?.genre?.label}}</span></div>


      <div class="card_single">
      <h1  >{{ dataGenre?.genre?.label }}</h1>
      <img src="{{base64G+dataGenre?.genre?.img}}">
  </div>

      
      <div class="div-content">
        
          <h2 class="title">Mangas du genre</h2>
       
        @if(dataGenre?.mangas?.content?.length === 0 )  {
          <p class="not-content">pas de mangas dans ce genre pour le moment</p>
        } @else {
          <div class="content-manga ">
            @for (manga of dataGenre?.mangas?.content; track manga.id) {
              <a [routerLink]="'/manga/' + manga.id">
                <ui-card class="" size="card-manga">


                  @for (picture of manga.pictures ; track picture.id) {
                    <img src="{{base64G+picture.img}}">

                  }


                  <p>{{ manga.title }}</p>
                </ui-card>
              </a>
            }

          </div>
        }


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

              <button (click)="pageGenreManga
              (page)"
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
      </div>
      
  
      
   
    </section>

  `,
  styles: [`
    .content-manga{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      flex-wrap: wrap;
      gap: 2rem 10rem;
      padding: 0.8rem;
    }

    .card {
      img {
        border-radius: 10px;
        height: 100%;
        width: 100%;
      }

 
      
      
    }`]
})
export class GenreComponent implements OnInit {
  idOfUrl!:number; // id du genre récupéré à partir de l'url.
  pages!: number[]; // Nombre de page
  lastPage!: number;
  currentPage!: number;
  dataGenre! : DataGenre | null;
  base64G:string="data:image/webp;base64,";


  constructor(
      private genreService: GenreService,
      private activatedRoute: ActivatedRoute,
  ){
    this.currentPage=0;
  }
  ngOnInit(): void {
    this.idOfUrl=parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);

    this.genreService.getMangaGenre(this.idOfUrl)

    this.genreService.currentDataGenre.subscribe( dataGenre =>{
      this.dataGenre = dataGenre;
      this.pages = this.convertNumberToArray(this.dataGenre?.mangas?.totalPages!);
      this.lastPage =this.dataGenre?.mangas?.totalPages!;


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
   * Récupère la page des commentaires souhaité.
   * @param {string} page
   */
  pageGenreManga
  (page: number){
    console.log("dans pageGenreManga" +
        " page : ", page);
    this.currentPage=page;
    console.log("dans pageGenreManga" +
        " currentPage : ", this.currentPage);
    this.genreService.getMangaGenre(this.idOfUrl,page);
  }


  pagePrevious(){
    console.log("dans pagePrevious currentPage : ", this.currentPage);
    if(this.currentPage > 0){
      this.pageGenreManga
      (this.currentPage-1);
    }
  }
  pageNext(){
    console.log("dans pageNext currentPage : ", this.currentPage);
    if(this.currentPage < this.lastPage-1){
      this.pageGenreManga
      (this.currentPage+1);
    }
  }


  protected readonly faHouse = faHouse;
}
