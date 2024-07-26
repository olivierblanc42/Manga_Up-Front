import {Component, OnInit} from '@angular/core';
import {Comment, DataAuthor, Picture, User} from '../../types';
import {MangaService} from "../../services/manga.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";
import {AuthorService} from "../../services/author.service";
import {CardComponent} from "../../components/card/card.component";

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [
    CardComponent,RouterLink
  ],
  template: `

    <section class="container mx-auto px-5 md:px-10  my-5\t">

      <h1>{{ dataAuthor?.author?.firstname }}</h1>

      <div class="content-manga ">
        @for (manga of dataAuthor?.mangas?.content; track manga.id) {
          <a [routerLink]="'/manga/' + manga.id">
            <ui-card class="" size="card-manga">


              <p>{{ manga.title }}</p>
            </ui-card>
          </a>
        }

      </div>
    </section>
      
   
  `,
  styles: ``
})
export class AuthorComponent implements OnInit {
  idOfUrl!:number; // id du genre récupéré à partir de l'url.
  dataAuthor! : DataAuthor | null;

  constructor(
      private authorService: AuthorService,
      private activatedRoute: ActivatedRoute,
  ){
  //  this.currentPage=0;
  }

  ngOnInit(): void {
    this.idOfUrl=parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);

    this.authorService.getMangaAuthor(this.idOfUrl)

    this.authorService.currentDataAuthor.subscribe( dataAuthor =>{
        this.dataAuthor = dataAuthor
    } )

  }
}
