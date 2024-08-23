import {Component, OnInit} from '@angular/core';
import {Comment, DataManga, Picture, User} from "../../../types";
import {MangaService} from "../../../services/manga.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-manga',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
    <section class="admin-container">
      <h1>Information sur le manga {{ data?.manga?.title }} </h1>
      <div>
        <p><span>date de creation:</span> {{ data?.manga?.createdAt }}</p>
        <p><span>date debut de publication:</span> {{ data?.manga?.releaseDate }}</p>
        <ul>
         <li><span>Auteur(S): </span></li>
          @for (author of data?.manga?.authors; track author.id) {
            <li><a [routerLink]="'/admin/author/' + author.id">{{ author.firstname }}</a>,</li>
          }
        </ul>
        <p><span>Resumé: </span> {{ data?.manga?.summary }}</p>
        <p><span>price:</span> {{ data?.manga?.price }}</p>
        <p><span>Catégorie:</span> {{ data?.manga?.category?.name }}</p>
        <ul>
          <li><span>Genres:</span></li>
          @for(genre of data?.manga?.genres ; track genre.id ){
            <li><a [routerLink]="'/admin/genre/' + genre.id">{{ genre.label }}</a>,</li>

          }
        </ul>
        <ul>
          <li><span>autheurs:</span></li>
          @for(author of data?.manga?.authors ; track author.id ){
            <li><a [routerLink]="'/admin/genre/' + author.id">{{ author.firstname }},{{author.lastname}} </a>,</li>

          }
        </ul>
      </div>
    </section>
  `,
  styles:  [`

  
  `]
})
export class MangaAdminComponent implements OnInit{

  data!: DataManga | null;
  posterUser!:string[];
  pictures!:Picture[];
  picture!:Picture;
  comments!:Comment[];
  idOfUrl!:number; // id du manga récupéré à partir de l'url.
  base64:string="data:image/webp;base64,";
  poster!:string;
  count:number=1; // Pour compter le nombre de commentaires.
  nbLikes:number=0;
  colorIconHeart:string="grey"; // Définie la couleur lorsque le manga est en favorie ou pas.
  user!:User | null;
  mangasIdOfUser!: number[]; // Liste des id des mangas de l'utilisateur.
  isFavorite!:boolean | null;
  test!: boolean;

  pages!: number[]; // Nombre de page
  lastPage!: number;
  currentPage!: number;
  isLoading:boolean=false;
  currentPageScroll!:number;
  oldCommentsScroll!:Comment[];
  oldIdOfUrl!:number;




  constructor(
      private mangaService: MangaService,
      private activatedRoute: ActivatedRoute,
      private userService: UserService,
      private router: Router
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
    })
   // this.currentDataMangaSubs();

  //  this.userService.getUser("5");
   // this.currentDataUserSubs();

    //this.currentIsFavoriteSubs();

  }

  /**
   * Récupération des dates traitements pour hydrater la vue.
   */
 /* currentDataMangaSubs(){
    this.mangaService.currentDataManga.subscribe(data=>{
      this.data=data;
      if(this.oldCommentsScroll && this.currentPageScroll > 0 ){
        this.oldCommentsScroll=[...this.oldCommentsScroll, ...this.data?.comments.content!]
      }else{
        this.oldCommentsScroll=[...this.data?.comments.content!]
      }
      console.log("this.oldCommentsScroll : ", this.oldCommentsScroll);
      this.comments=this.oldCommentsScroll;

      this.pages=this.convertNumberToArray(this.data?.comments?.totalPages!)
      this.lastPage=this.data?.comments?.totalPages!;
      this.strToLowerCaseAndFirstLetter();
      this.searchPicturesIsPoster();
      this.nbComments();
    });
  }*/

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
   * Récupération des data si on a cliqué sur favoris.
   */
 /* currentIsFavoriteSubs(){
    this.mangaService.currentIsFavorite.subscribe(favorite=>{
      this.isFavorite=favorite
      this.colorIconHeart=this.isFavorite ? "yellow" : "grey"
      this.mangaService.getManga(this.idOfUrl)
      this.mangaService.currentDataManga.subscribe(data=>{
        this.data=data;
      });
    })
  }*/

  /**
   * Méthode qui sera appelé si on scroll au delà du dernier commentaire.
   */
 /* onScroll(){
    this.currentPageScroll++;
    this.appendData();
  }*/

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
}
