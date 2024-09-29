import {Component, OnInit} from '@angular/core';
import {Address, Category, CategoryDto, DataCategory, GenderDto} from "../../../types";
import {CategoryService} from "../../../services/category.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {catchError, finalize, tap} from "rxjs/operators";
import {throwError} from "rxjs";
import {NgClass} from "@angular/common";
import {MangaService} from "../../../services/manga.service";
import {AddressService} from "../../../services/address.service";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgClass
  ],
  template: `
    <section class="admin-container">

      <div class="div-form">
        <form class="form-admin" #addressForm="ngForm"    (submit)="handleSubmit($event)"    >
          <h2>Information sur l'adresse'<span> {{ data?.postalCode}}</span></h2>
          <div class="form-contain">
            <input
                id="line1"
                type="text"
                [(ngModel)]="line1"
                name="line1"
                placeholder="line1"
            >
            
            
            
          </div>
          <div class="form-contain">
            <input
                id="line2"
                type="text"
                [(ngModel)]="line2"
                name="line2"
                placeholder="line2"
            >
          </div>
          <div class="form-contain">
            <input
                id="line3"
                type="text"
                [(ngModel)]="line3"
                name="line3"
                placeholder="line3"
            >
          </div>
          <div class="form-contain">
            <input
                id="postalCode"
                type="text"
                [(ngModel)]="postalCode"
                name="postalCode"
                placeholder="postalCode"
            >
          </div>
          <div class="form-contain">
            <input
                id="city"
                type="text"
                [(ngModel)]="city"
                name="city"
                placeholder="city"
            >
          </div>
          <div class="form-contain">

            @if (error) {
              <p class="text-red-500">{{error}}</p>
            }

          </div>
          <div class="">
            <button
                type="submit"
                class="bg-slate-600 text-white rounded px-4 py-2"
            >Submit</button>
          </div>
        </form>
      </div>
   
      <div class="pagination">

        @for(page of pages; track page; let count=$index){
          @if(count===0){
            <li>
              <button
                  (click)="pagePrevious()"
                  [ngClass]="currentPage <= 0 ? 'grey-desactive-btn': 'blue-active-btn'"
                  class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >Previous</button>
            </li>
          }
          <li>

            <button (click)="pageMangas(page)"
                    class="flex items-center justify-center px-4 h-10 leading-tight text-black bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-yellow-100 dark:hover:text-gray-700"
                    [ngClass]="currentPage===page ? 'bg-yellow-100':'background-color-pagination-yellow'"
            >
              {{count+1}}
            </button>
          </li>
          @if(count===lastPage-1){
            <li>
              <button
                  (click)="pageNext()"
                  [ngClass]="currentPage===lastPage-1 ? 'grey-desactive-btn': 'blue-active-btn'"
                  class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
            </li>
          }
        }

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
    td{
      text-align: center;
    }
  `]
})
export class AddressComponent implements OnInit{
  idOfUrl!:number; // id du genre récupéré à partir de l'url.
  pages!: number[]; // Nombre de page
  lastPage!: number;
  currentPage!: number;
  data! : Address | null;
  base64G:string="data:image/webp;base64,";
  line1:string | undefined="";
  line2:string | undefined="";
  line3:string | undefined="";
  postalCode:string | undefined="";
  city:string | undefined="";
  error:string="";
  date!: Date;

  constructor(
      private categoryService: CategoryService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private mangaService: MangaService,
      private addressService :AddressService,


  ){
    // this.currentPage=0;
  }

  ngOnInit(): void {
    this.idOfUrl=parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);

    this.addressService.getAddress(this.idOfUrl);
    this.addressService.currentAddress.subscribe( data =>{
      this.data = data;
      this.line1 = data?.line1
      this.line2 = data?.line2
      this.line3 = data?.line3;
      this.city = data?.city;
      this.postalCode = data?.postalCode;

    } )





  }
  /**
   * Crée un tableau de la taille spécifiér en paramètre, contenant des valeurs allant de 0 à n+1.
   * @param size La taille du tableau à créer.
   * @returns {Array} Tableau contenant une suite de 0 à n+1.
   */
  convertNumberToArray(size: number){
    const array=new Array<number>(size);
    for (let i = 0; i < array.length; i++) {
      array[i]=i;
    }
    return array;
  }

  /**
   * Récupère la page des commentaires souhaité.
   * @param {string} page
   */
  pageMangas(page: number){
    console.log("dans pageComments page : ", page);
    this.currentPage=page;
    console.log("dans pageComments currentPage : ", this.currentPage);
    this.mangaService.getMangas(page);
  }


  pagePrevious(){
    console.log("dans pagePrevious currentPage : ", this.currentPage);
    if(this.currentPage > 0){
      this.pageMangas(this.currentPage-1);
    }
  }
  pageNext(){
    console.log("dans pageNext currentPage : ", this.currentPage);
    if(this.currentPage < this.lastPage-1){
      this.pageMangas(this.currentPage+1);
    }
  }



  handleSubmit(e: SubmitEvent) {


  }

}
