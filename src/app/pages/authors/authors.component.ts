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
    <p>
      authors works!
    </p>
  `,
  styles: ``
})
export class AuthorsComponent implements OnInit {
  constructor(
      private authorService :AuthorService,

){

}
  authors!: Author|null;


  ngOnInit(): void {
    this.authorService.getAuthors()
  }
}
