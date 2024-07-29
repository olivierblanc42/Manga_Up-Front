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
      <ul>
  
      </ul>

      <div>
   
        <div>
          
        </div>
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
  }
  
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
