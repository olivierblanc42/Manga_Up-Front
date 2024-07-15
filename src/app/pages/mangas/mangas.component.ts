import {Component, OnDestroy, OnInit} from '@angular/core';
import {Manga, Mangas, Picture} from "../../types";
import {MangaService} from "../../services/manga.service";
import {PictureService} from "../../services/picture.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {GenreService} from "../../services/genre.service";
import {CardComponent} from "../../components/card/card.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-mangas',
  standalone: true,
  imports: [
    CardComponent,
    FaIconComponent,
    RouterLink
  ],
  template: `




    <section class="container mx-auto px-5 md:px-10  my-5\t">

        <h2 class="my-5">Manga</h2>
    
      <div class="content-manga ">
        @for (manga of mangas?.content; track manga.id) {
          <a [routerLink]="'/manga/' + manga.id">
            <ui-card class="" size="card-manga">


              @for (picture of manga.pictures; track picture.id) {
                <img alt="{{picture.title}}" src="{{base64+picture.img}}">
              }
              <p>{{ manga.title }}</p>
            </ui-card>
          </a>
        }

      </div>
    </section>
  `,
  styles: [`

    .content-manga{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      flex-wrap: wrap;
      gap: 2rem 20rem;
    }
  
  
  `]
})
export class MangasComponent implements OnInit{

  mangas!: Mangas |null ;
  pictures!: Picture[];
  picture!:Picture;
  base64:string="data:image/webp;base64,";
  pages!: number[]; // Nombre de page
  lastPage!: number;
  currentPage!: number;

  constructor(
      private mangaService: MangaService,
      private pictureService: PictureService,

  ){}


  ngOnInit(): void {
    this.mangaService.getMangas()
    this.mangaService.currentMangaPagination.subscribe(mangas =>{
      this.mangas = mangas
      console.log(this.mangas)
    })

    this.pictureService.currentPictures.subscribe(pictures =>this.pictures = pictures)

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
    this.mangaService.getManga(page);
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

  /**
   * Pour afficher un objet dans le html.
   * @param val l'objet à afficher
   * @param msg le message à afficher avec l'objet
   */
  log(val: Object, msg: string=""){
    console.log(msg, val);
  }

}
