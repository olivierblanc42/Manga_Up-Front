import {Component, OnInit} from '@angular/core';
import { Comment, Picture, User } from '../../types';
import {MangaService} from "../../services/manga.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {GenreService} from "../../services/genre.service";

@Component({
  selector: 'app-genre',
  standalone: true,
  imports: [],
  template: `
    <p>
      genre works!
    </p>
  `,
  styles: ``
})
export class GenreComponent implements OnInit {
  idOfUrl!:number; // id du genre récupéré à partir de l'url.
  pages!: number[]; // Nombre de page
  lastPage!: number;
  currentPage!: number;
  constructor(
      private genreService: GenreService,
      private activatedRoute: ActivatedRoute,
      private userService: UserService
  ){
    this.currentPage=0;
  }
  ngOnInit(): void {
    this.idOfUrl=parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);

    this.genreService.getMangaGenre(this.idOfUrl)
  }
}
