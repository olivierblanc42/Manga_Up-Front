import {Component, OnInit} from '@angular/core';
import {AuthorDto, CategoryDto, Comment, DataManga, GenreDto, MangaDto, Picture, User} from "../../../types";
import {MangaService} from "../../../services/manga.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {FormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {CategoryService} from "../../../services/category.service";
import {GenreService} from "../../../services/genre.service";
import {catchError, finalize, tap} from "rxjs/operators";
import {throwError} from "rxjs";
import {AuthorService} from "../../../services/author.service";

@Component({
  selector: 'app-manga',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    DatePipe
  ],
  template: `
    <section class="admin-container">
      <h1>Information sur le manga {{ data?.manga?.title }} </h1>
      <div class="div-form">

      <form class="form-admin"   (submit)="handleSubmit($event)"   >
        <h2>Ajout d'un manga</h2>
        <div class="form-contain" >
          <input
              id="title"
              type="text"
              [(ngModel)]="title"
              name="title"
              placeholder="Titre"
          >
      
        </div>

        <div class="form-contain" >
          <input
              id="price"
              type="text"
              [(ngModel)]="price"
              name="price"
              placeholder="Prix du manga"
          >
        </div>
        <div class="form-contain" >
          <input
              id="pointFidelity"
              type="text"
              [(ngModel)]="pointFidelity"
              name="price"
              placeholder="pointFidelity"
          >
        </div>
        
        <div class="form-contain">
          <input
              id="oldCategory"
              type="text"
              [(ngModel)]="category"

              name="oldCategory"
              placeholder="Ancienne categorie"
              readonly
          >
        </div>
        <div class="form-contain" >
       
          <p>Nouvelle catégorie</p>
          <select id="author-select" name="author"  [(ngModel)]="selectedCategory" >
            <option value="" disabled selected>choisir une catégorie</option>
            @for ( category of categories ; track category.id){
              <option [value]="category.id">{{ category.name }}</option>
            }
          </select>
        </div>

        <fieldset>
          <legend>Gérer les genres</legend>
          @for(genre of genres; track genre.id){
            <div>
              <input
                  type="checkbox"
                  [value]="genre.id"
                  (change)="toggleGenreSelection(genre.id, $event)"
                  [checked]="isGenreSelected(genre.id)">
              <label for="{{genre.id}}">{{genre.label}} </label>
            </div>
          }
          </fieldset>
        <fieldset>
          <legend>Gérer les auteurs</legend>
          @for(author of authors; track author.id){
            <div>
              <input
                  type="checkbox"
                  [value]="author.id"
                  (change)="toggleAuthorSelection(author.id, $event)"
                  [checked]="isAuthorSelected(author.id)">
              <label for="{{author.id}}">{{author.firstName}} </label>
            </div>
          }
        </fieldset>
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

    <div>
      <div class="form-contain" >
        <p><span>Points de Fidélités:</span><br> {{ data?.manga?.pointFidelity}}</p>
      </div>

      <div class="form-contain" >
        <p><span>date de creation:</span><br> {{ data?.manga?.createdAt | date: 'dd-MM-yyyy' }}</p>

      </div>
      <div class="form-contain" >
        <p><span>date debut de publication:</span><br>{{ data?.manga?.releaseDate | date: 'dd-MM-yyyy' }}</p>
      </div>
    </div>
      
      
      
      <div>
        <h2> Liste des Auteurs</h2>
          <div class="flex flex-col gap-2 mt-4 admin-container">
            <table>
              <thead>
              <th>Nom et Prénom</th>
              <th>voir en détail</th>
              </thead>
              <tbody >
                @for (author of data?.manga?.authors ; track author.id) {
                  <tr class="border">
                    <td>{{ author.firstname}} {{author.lastname}}</td>
                    <td> <a [routerLink]="'/admin/author/' + author.id">🔎</a></td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

        <div>
          <h2> Liste des Genres</h2>
          <div class="flex flex-col gap-2 mt-4 admin-container">
            <table>
              <thead>
              <th>Nom du genre</th>
              <th>voir en détail</th>
              </thead>
              <tbody >
                @for (genre of data?.manga?.genres ; track genre.id) {
                  <tr class="border">
                    <td>{{ genre?.label }} </td>
                    <td> <a [routerLink]="'/admin/genre/' + genre.id">🔎</a></td>
                  </tr>
                }
              </tbody>
            </table>
          </div>




        </div>



      </div>
    
    </section>
  `,
  styles:  [`

  td{
    text-align: center;
  }
  .div-form .form-admin {
    width: 100%;
  }

  `]
})
export class MangaAdminComponent implements OnInit{

  data!: DataManga | null;
  posterUser!:string[];
  pictures!:Picture[];
  picture!:Picture;
  comments!:Comment[];
  idOfUrl!:number;
  base64:string="data:image/webp;base64,";
  poster!:string;
  count:number=1;
  nbLikes:number=0;
  colorIconHeart:string="grey";
  user!:User | null;
  mangasIdOfUser!: number[];
  isFavorite!:boolean | null;
  test!: boolean;

  pages!: number[];
  lastPage!: number;
  currentPage!: number;
  isLoading:boolean=false;
  currentPageScroll!:number;
  oldCommentsScroll!:Comment[];
  oldIdOfUrl!:number;

  // update
  title!:string | undefined;
  createdAt!: Date;
  releaseDate!:Date;
  summary!:string | undefined;
  price!:number | undefined;
  error!:string;
  pointFidelity!: number | undefined;
  selectedAuthors :number[] = [];
  selectedGenres: number[] = [];
  genres!: GenreDto[];
  authors!: AuthorDto[];

  selectedCategory!:number| undefined;
  categories!: CategoryDto[];
  category!: string | undefined;

  constructor(
      private mangaService: MangaService,
      private activatedRoute: ActivatedRoute,
      private userService: UserService,
      private router: Router,
      private categoryService: CategoryService,
      private genreService: GenreService,
      private authorService: AuthorService

  ){
    this.currentPage=0;

    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  ngOnInit(): void {
    this.currentPageScroll=0;
    this.toggleLoading();

    this.idOfUrl=parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);

    this.mangaService.getManga(this.idOfUrl)
    this.mangaService.currentDataManga.subscribe(data=>{
      this.data=data;
      this.title = data?.manga.title;
      console.log( data?.manga.title)
      this.price = data?.manga.price;
      this.summary = data?.manga.summary;
      this.category=data?.manga.category.name;
      this.pointFidelity = data?.manga.pointFidelity;
      // Initialiser selectedGenres avec les genres déjà associés au manga
      if (this.data?.manga?.genres) {
        this.selectedGenres = this.data.manga.genres.map(g => g.id);
        console.log(this.selectedGenres)
      }
      if (this.data?.manga?.authors) {
        this.selectedAuthors = this.data.manga.authors.map(g => g.id);
        console.log(this.selectedAuthors)
      }
    })



    this.categoryService.getCategoriesDto()
    this.categoryService.currentCategoryDto.subscribe(category =>{
      this.categories = category;
    })

    this.genreService.getGenreDto()

    this.genreService.currentGenreDto.subscribe(genres =>{
      this.genres = genres;
    })

    this.authorService.getAuhtorDto();

    this.authorService.currentAuthorDTO.subscribe(authors =>{
      this.authors = authors
    })

  }


  toggleGenreSelection(genreId: number, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      if (!this.selectedGenres.includes(genreId)) {
        this.selectedGenres.push(genreId);
        console.log(genreId)
      }
    } else {
      this.selectedGenres = this.selectedGenres.filter(id => id !== genreId);
    }
    console.log(this.selectedGenres);
  }



  isGenreSelected(genreId: number): boolean {
    return this.selectedGenres.includes(genreId);
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


  isAuthorSelected(authorId: number): boolean {
    return this.selectedAuthors.includes(authorId);
  }


  /**
   * Récupération des data du user.
   */
  currentDataUserSubs(){
    this.userService.currentDataUser.subscribe(dataUser => {
      this.user=dataUser?.user!
      this.mangasIdOfUser=dataUser?.mangasId!;
      this.isFavorite=this.searchIfMangaIsFavorite(this.mangasIdOfUser);
      this.colorIconHeart=this.isFavorite ? "yellow" : "grey"
    })
  }



  /**
   * Récupère les 6 commentaires suivant en faisant appel au back
   */
  appendData(){
    this.toggleLoading();
    this.mangaService.getManga(this.idOfUrl, this.currentPageScroll);
  }

  /**
   * Pour passer de true à false ou inversement si le chargement est effectué ou pas.
   */
  toggleLoading(){
    this.isLoading=!this.isLoading;
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
   * Récupère la page précédente des commentaires si ont est en mode desktop.
   */
  pagePrevious(){
    if(this.currentPage > 0){
      this.pageComments(this.currentPage-1);
    }
  }

  /**
   * Récupère la page suivante des commentaires si ont est en mode desktop.
   */
  pageNext(){
    if(this.currentPage < this.lastPage-1){
      this.pageComments(this.currentPage+1);
    }
  }

  /**
   * Récupère la page des commentaires souhaité si on est en mode desktop.
   * @param {string} page
   */
  pageComments(page: number){
    this.currentPage=page;
    this.mangaService.getManga(this.idOfUrl, page);
  }

  /**
   * Cherche si l'utilisateur à mis en favoris le manga
   * @param {number[]} mangasIdUser
   * @returns {boolean} true si en favoris sinon false
   */
  searchIfMangaIsFavorite(mangasIdUser: number[]){
    const tab=mangasIdUser.filter((mangaIdUser)=>{
      return mangaIdUser===this.idOfUrl
    })
    if(tab.length === 0) return false;
    return true;
  }

  /**
   * Ajoute ou supprime le manga en favoris
   */
  addToMyFavorites(){
    if(this.isFavorite){
      this.mangaService.deleteUserAsFavorite(this.idOfUrl, this.user?.id);
    }else{
      this.mangaService.addUserInFavorite(this.idOfUrl, this.user?.id);
    }
  }

  /**
   * Calcule le nombre de like
   * @returns {number} Retourne le nombre de like ou 0
   */
  calculNbLikes(){
    if(this.data){
      return this.nbLikes=this.data?.manga?.users?.length;
    }
    return 0;
  }

  /**
   * Calcule la moyenne des votes.
   * @returns {number} Retourne la moyenne des votes ou 0
   */
  calculAverageVote(){
    if(this.data){
      //const sum=this.data?.comments?.content.reduce((a, b)=>a+b?.rating, 0);
      const sum=this.data?.ratingAll.reduce((a, b)=>a+b, 0);
      const total=sum/this.nbComments()!
      return Math.floor(total*100)/100;
    }
    return 0;
  }

  /**
   * Calcule le taux satisfactions des utilisateurs
   * @returns {number}
   */
  calculSatisfactionRate(){
    return (this.calculAverageVote()/5)*100;
  }

  /**
   * Calcul le nombre de commentaire
   * @returns {number}
   */
  nbComments(){
    return this.data?.comments?.totalElements;
  }

  /**
   * Suppression des secondes et milliseconde.
   * @param date
   * @returns {string} Retourne la date.
   */
  truncatDate(date: Date){
    return date.toString().substring(0, date.toString().indexOf('T'))
  }

  dateFormatFrDMY(date: Date){
    let frDate=this.truncatDate(date)
    return frDate.split('-').reverse().join('-');
  }

  /**
   * Met un mot un minuscule sauf la première lettre
   */
  strToLowerCaseAndFirstLetter(){
    if(this.data){
      this.data?.manga?.genres.sort((a, b)=>{
        return a.label.localeCompare(b.label);
      });
      for (let genre of this.data?.manga?.genres) {
        let tmp=genre.label.toLocaleLowerCase();
        genre.label=tmp.charAt(0).toUpperCase()+tmp.slice(1);
      }
    }
  }

  /**
   * Cherche le poster du manga
   */
  searchPicturesIsPoster(){
    if(this.data){
      for (const picture of this.data.manga.pictures) {
        if(picture.isPoster) {
          this.picture=picture;
          break;
        };
      }

      this.poster=this.base64+this?.picture?.img;
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


  handleSubmit(e: Event) {


    const updatedManga: Omit<MangaDto, "img"| 'createdAt'  > ={
      id: this.idOfUrl,
      summary:this.summary || "",
      price:this.price,
      title:this.title || "",
      releaseDate:this.releaseDate,
      pointFidelity: this.pointFidelity || 1,
      categoryId: this.selectedCategory || 1,
      genreIds: this.selectedGenres,
      authorIds:this.selectedAuthors
    }

    this.mangaService.updateManga(updatedManga)
        .pipe(
            tap(response =>{
              console.log('category update')
                 this.router.navigate(['/admin/mangas']);
            }),
            catchError(error => {
              console.error('Error updating category', error);
              this.error = 'Erreur lors de la mise à jour de la category';
              return throwError(error);
            }),
            finalize(() => {
            })
        )
        .subscribe();



  }




}
