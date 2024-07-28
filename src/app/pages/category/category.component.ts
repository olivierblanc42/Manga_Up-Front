import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../components/card/card.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CategoryService} from "../../services/category.service";
import {DataCategory} from "../../types";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
      CardComponent,
    FaIconComponent,
    RouterLink],
  template: `
    <section class="container mx-auto px-5 md:px-10  my-5\t">
      <div>
        <h1>{{ data?.category?.name }}</h1>
      </div>
      <div class="content-category ">
        @for (manga of data?.mangas?.content; track manga.id) {
          <a [routerLink]="'/manga/' + manga.id">
            <ui-card class="" size="card-manga">


              @for (picture of manga.pictures; track picture.id) {
                <img src="{{base64G+picture.img}}">

              }


              <p>{{ manga.title }}</p>
            </ui-card>
          </a>
        }

      </div>
    </section>
  `,
  styles:  [`
    .content-category{
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
export class CategoryComponent implements OnInit{
  idOfUrl!:number; // id du genre récupéré à partir de l'url.
  pages!: number[]; // Nombre de page
  lastPage!: number;
  currentPage!: number;
  data! : DataCategory | null;
  base64G:string="data:image/webp;base64,";


  constructor(
      private categoryService: CategoryService,
      private activatedRoute: ActivatedRoute,
  ){
   // this.currentPage=0;
  }

  ngOnInit(): void {
    this.idOfUrl=parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);

this.categoryService.getMangaCategory(this.idOfUrl);
    this.categoryService.currentDataCategory.subscribe( data =>{
      this.data = data;
    } )

  }


}
