import { Component } from '@angular/core';
import {DataGenre} from "../../../types";
import {GenreService} from "../../../services/genre.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-genre',
  standalone: true,
  imports: [],
  template: `
    <section class="admin-container">
      <h1>Information sur le Genre {{ data?.genre?.label }}  </h1>
      <p><span>date de creation: </span>{{data?.genre?.createdDate}}</p>
     
      <div>
       <h2> liste des mangas</h2>
      <ul>
        @for (manga of data?.mangas?.content  ; track manga.id) {
          <li>{{manga.title}}</li>
        }
      </ul>
      </div>
    </section>
  `,
  styles:  [`
  
  `]
})
export class GenreAdminComponent {
  idOfUrl!:number; // id du genre récupéré à partir de l'url.
  pages!: number[]; // Nombre de page
  lastPage!: number;
  currentPage!: number;
  data! : DataGenre | null;
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
      this.data = dataGenre;
    } )

  }
}
