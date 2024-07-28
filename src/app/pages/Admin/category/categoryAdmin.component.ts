import {Component, OnInit} from '@angular/core';
import {DataCategory} from "../../../types";
import {CategoryService} from "../../../services/category.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  template: `
    <section class="user">
      <h1>Information sur le catégorie {{ data?.category?.name}}  </h1>
      <ul>
 
      </ul>

      <div>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <div>
          <p>   </p>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>

          </ul>

        </div>
      </div>
    </section>
  `,
  styles:  [`
  .user{
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
export class CategoryAdminComponent implements OnInit{
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
