import { Component,OnInit } from '@angular/core';
import {CardComponent} from "../../components/card/card.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";
import {AuthorService} from "../../services/author.service";
import {Author, Genres} from "../../types";

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [ CardComponent,
    FaIconComponent,
    RouterLink,
    NgClass],
  template: `
    <section class="container mx-auto px-5 md:px-10	my-5	">

      <h2 class="my-5">Auteurs</h2>


      <div class="content-genre">
        @for (author of authors; track author.id) {
          <a [routerLink]="'/author/' + author.id">
            <ui-card class="card" size="card-genre">

              <p>{{ author.lastname }}</p>
            </ui-card>
          </a>
        }
      </div>
    </section>
  `,
  styles: ``
})
export class AuthorsComponent implements OnInit {
  constructor(
      private authorService :AuthorService,

){

}
  authors!: Author[]|null;
  base64G:string="data:image/webp;base64,";


  ngOnInit(): void {
    this.authorService.getAuthors()

    this.authorService.currentAuthors.subscribe(authors =>{
      this.authors = authors
    })
  }
}
