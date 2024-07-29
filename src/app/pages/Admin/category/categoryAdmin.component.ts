import {Component, OnInit} from '@angular/core';
import {DataCategory} from "../../../types";
import {CategoryService} from "../../../services/category.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  template: `
    <section class="admin-container">
      <h1>Information sur le catégorie <span> {{ data?.category?.name}} </span> </h1>
    <div class="content-div">
      
     <p><span>Date de creation: </span>{{ data?.category?.description}}</p>
      <p><span>Description: </span>{{ data?.category?.description}}</p>

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
      span{
        font-weight: bolder;
        text-transform: uppercase;
    }
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
