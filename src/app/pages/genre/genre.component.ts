import {Component, OnInit} from '@angular/core';
import {Comment, DataGenre, Picture, User} from '../../types';
import {MangaService} from "../../services/manga.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";
import {GenreService} from "../../services/genre.service";
import {CardComponent} from "../../components/card/card.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-genre',
  standalone: true,
  imports: [
    CardComponent,
    FaIconComponent,
    RouterLink
  ],
  template: `

    
    <section class="container mx-auto px-5 md:px-10  my-5\t">

      <h1>{{ dataGenre?.genre?.label }}</h1>
    
      <div class="content-manga ">
        @for (manga of dataGenre?.mangas?.content; track manga.id) {
          <a [routerLink]="'/manga/' + manga.id">
            <ui-card class="" size="card-manga">


         
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
      gap: 2rem 20rem;}

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
    } )

  }
}
