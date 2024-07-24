import {Component, OnInit} from '@angular/core';
import { Comment, Picture, User } from '../../types';
import {MangaService} from "../../services/manga.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {AuthorService} from "../../services/author.service";

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [],
  template: `
    <p>
      author works!
    </p>
  `,
  styles: ``
})
export class AuthorComponent implements OnInit {
  idOfUrl!:number; // id du genre récupéré à partir de l'url.
  constructor(
      private authorService: AuthorService,
      private activatedRoute: ActivatedRoute,
  ){
  //  this.currentPage=0;
  }

  ngOnInit(): void {
    this.idOfUrl=parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);

    this.authorService.getMangaAuthor(this.idOfUrl)

  }
}
