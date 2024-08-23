import {Component, OnInit} from '@angular/core';
import {AuthorDto, Category, CategoryDto, GenreDto, Mangas, Picture} from "../../../types";
import {MangaService} from "../../../services/manga.service";
import {PictureService} from "../../../services/picture.service";
import {RouterLink} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {AuthorService} from "../../../services/author.service";
import {CategoryService} from "../../../services/category.service";
import {GenreService} from "../../../services/genre.service";

@Component({
  selector: 'app-mangas',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  template: `
    
    
    <h2>Mangas</h2>
 

    <div class="div-form">
      <form class="form-admin"   (submit)="handleSubmit($event)" >
        <h2>Ajout d'un manga</h2>
        <div class="form-contain" >
          <input
              id="title"
              type="text"
              [(ngModel)]="title"
              name="title"
              placeholder="Titre"
          >
          <input
              id="price"
              type="text"
              [(ngModel)]="price"
              name="price"
              placeholder="Prix du manga"
          >
        </div>
        <div class="form-contain" >
          <select id="author-select" name="author"  [(ngModel)]="selectedCategory" >
            <option value="" disabled selected>choisir une catégorie</option>
            @for ( category of categories ; track category.id){
              <option [value]="category.id">{{ category.name }}</option>
            }
          </select>
        </div>
        <div class="form-contain">
          <fieldset>
            <legend>Ajouter les auteurs</legend>
            @for(author of authors; track author.id){
              <div>
              <input type="checkbox" id="{{author.id}}" name="{{author.id}}"  (change)="toggleAuthorSelection(author.id,$event)"  />
              <label for="{{author.id}}">{{author.firstName}} {{author.lastName}}</label>
              </div>
            }
          </fieldset>
        </div>

        <div class="form-contain">
          <fieldset>
            <legend>Ajouter des genres</legend>
            @for(genre of genres; track genre.id){
              <div>
              <input type="checkbox" id="{{genre.id}}" name="{{genre.id}}" (change)="toggleGenreSelection(genre.id,$event) "  />
              <label for="{{genre.id}}">{{genre.label}} </label>
                </div>
            }
          </fieldset>
        </div>
        
        <div class="form-contain text_area">
          <textarea
              id="description"
              type="text"
              [(ngModel)]="summary"
              name="description"
              placeholder="Résumé"
          >
             
          
            </textarea>
         
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
  
  
      <div class="flex flex-col gap-2 mt-4 admin-container">
        <table>
          <thead>
          <tr>
            <th>Title</th>
            <th>Résumé</th>
            <th>Price</th>
            <th>Points de fidélité</th>
            <th>category</th>
            <th>releaseDate</th>
            <th>Date de création</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
            @for (manga of mangas?.content; track manga.id) {
              <tr class="border">
                <td>{{ manga.title}}</td>
                <td>{{manga.summary}}</td>
                <td>{{manga.price}}</td>
                <td>{{manga.pointFidelity}}</td>
                <td>{{manga.category.name}}</td>
                <td>{{manga.releaseDate}}</td>
                <td>{{manga.createdAt}}</td>
  
                <td>
                  <a [routerLink]="'/admin/manga/' + manga.id">🔎</a>
                  <button   (click)="handleRemove(manga.id)">🗑️</button>
                </td>
              </tr>
            }
          </tbody>
        </table>
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
  
  
  
`,
  styles: [`
    .admin-container{
      width: 80%;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
      background-color: rgb(37,37,37,50%) ;
      border-radius: 10px;
      table{
        tbody{
          tr{
      // border: none;
          }
        }
      }
    }

    .pagination{
      display: flex;
      flex-direction: row;
      justify-content: left;
      gap: 1rem;
      padding: 1rem;
      li{
        list-style: none;
      }
    }
    option,select{
      color: black;
    }
    
`]
})
export class MangasAdminComponent implements OnInit {

  mangas!: Mangas |null ;
  pictures!: Picture[];
  picture!:Picture;
  base64:string="data:image/webp;base64,";
  pages!: number[]; // Nombre de pages
  lastPage!: number;
  currentPage!: number;
  price: number ;
  title:string="";
  pointFidelity: number | undefined;
  summary:string="";
  error:string="";
  currentTime = new Date();
  publicationDate: Date ;
  authors!: AuthorDto[] ;
  categories!: CategoryDto[];
  genres!: GenreDto[];
  selectedAuthors: number[] = [];
  selectedGenres: number[] = [];
  selectedCategory!:number
  constructor(
      private mangaService: MangaService,
      private pictureService: PictureService,
      private authorService: AuthorService,
      private categoryService: CategoryService,
      private genreService: GenreService

  ){
    this.currentPage=0;
    this.price=1;
    this.publicationDate = new Date("2024-08-14T10:14:10.070Z")
  }


  ngOnInit(): void {

    this.mangaService.getMangas()
    this.mangaService.currentMangaPagination.subscribe(mangas =>{
      this.mangas = mangas
      this.pages = this.convertNumberToArray(this.mangas?.totalPages!)
      this.lastPage =this.mangas?.totalPages!;
    })

    this.pictureService.currentPictures.subscribe(pictures =>this.pictures = pictures)

    this.authorService.getAuhtorDto();
    this.authorService.currentAuthorDTO.subscribe( authors =>{
      this.authors = authors;

    })


    this.genreService.getGenreDto()

    this.genreService.currentGenreDto.subscribe(genres =>{
      this.genres = genres;
    })

    this.categoryService.getCategoryDto()
    this.categoryService.currentCategoryDto.subscribe(category =>{
      this.categories = category;
    })
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

  /**
   * Pour afficher un objet dans le html.
   * @param val l'objet à afficher
   * @param msg le message à afficher avec l'objet
   */
  log(val: Object, msg: string=""){
    console.log(msg, val);
  }


  handleRemove(id: number){
      this.mangaService.removeManga(id);
      this.reloadPage()

  }

  toggleAuthorSelection(authorId: number, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      if (!this.selectedAuthors.includes(authorId)) {
        // Ajouter l'ID uniquement s'il n'est pas déjà présent
        this.selectedAuthors.push(authorId);

      }
      console.log(this.selectedAuthors)
    } else {
      // Supprimer l'ID si la checkbox est décochée
      this.selectedAuthors = this.selectedAuthors.filter(id => id !== authorId);
    }

  }
  toggleGenreSelection(genreId: number, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      if (!this.selectedGenres.includes(genreId)) {
        // Ajouter l'ID uniquement s'il n'est pas déjà présent
        this.selectedGenres.push(genreId);
        console.log(this.selectedGenres)
      }
    } else {
      // Supprimer l'ID si la checkbox est décochée
      this.selectedGenres = this.selectedGenres.filter(id => id !== genreId);
    }

  }

  /**
   * handleSubmit est utilisé ici pour envoyé de nouvel donné en base
   *
   * */
  handleSubmit(e: SubmitEvent) {

    // Vérifie si le champ 'title' est vide
    if (!this.title) {
      // Définit un message d'erreur si 'title' est vide
      this.error = "title is required";
      return;
    }
    if (!this.summary  ) {
      // Définit un message d'erreur si 'summary' est vide
      this.error = "summary is required";
      return;
    }
    if (!this.price  ) {
      // Définit un message d'erreur si 'price' est vide
      this.error = "price is required";
      return;
    }
    if (this.price!==0 ) {
      // Définit un message d'erreur si 'price' = 0
      this.error = "le prix ne peux pas etre de zero";
      return;
    }

    // Appelle le service pour ajouter un nouvel auteur avec les données fournies

    this.mangaService.addMangaTest({
        title: this.title,
        summary:this.summary,
        price:this.price,
        releaseDate:this.publicationDate,
        pointFidelity: this.price/2,
        createdAt:this.currentTime,
        categoryId : this.selectedCategory,
        authorIds : this.selectedAuthors,
        genreIds: this.selectedGenres

    });



    this.summary="";
    this.title="";



  }

  // Recharge la page pour refléter les nouvelles données
  reloadPage() {
    window.location.reload()
  }


}
