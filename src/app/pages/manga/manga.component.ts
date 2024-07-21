import { UserService } from './../../services/user.service';
import { NgClass, CommonModule } from '@angular/common';
import { MangaService } from './../../services/manga.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Comment, DataManga, Picture, User } from '../../types';
import { ActivatedRoute } from '@angular/router';
import { faBookBookmark, faMessage, faHeart, faStar, faHouse, faHome, faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteScrollModule } from "ngx-infinite-scroll";


@Component({
  selector: 'app-manga',
  standalone: true,
  imports: [FontAwesomeModule, NgClass, CommonModule, InfiniteScrollModule],
  template: `


<div class="flex flex-col items-center justify-center mb-5 mt-5">
<div class="path block -ml-20 mb-20 text-sx"><a href="/"><span><fa-icon [icon]="faHouse" size="1x"></fa-icon></span></a><span>/{{data?.manga?.title}}</span></div>
<div class="detail-box block rounded-lg bg-secondary text-white shadow-secondary-1">
    <div class="banner-1 background-color-black-c16a25 px-6 py-3">{{data?.manga?.title}}</div>
    <div class="banner-2 background-color-black-c60a10 px-6 py-3 flex justify-between">
        <div class="star flex align-center flex-col -mt-2">
            <div class="opinions-stars-one">
                <div class="opinions-stars-one-empty"></div>
                <div class="opinions-stars-one-full" style="width:{{calculSatisfactionRate()}}%"></div>
            </div>
            <div class="opinions-star-one-vote"><span>{{calculAverageVote()}}</span></div>
        </div>
        <div class="faMessage flex align-center flex-col"><fa-icon [icon]="faMessage" size="2x"></fa-icon>
            <div class="faMessage-comments mt-4"><span>{{nbComments()}}</span></div>
        </div>
        <div class="faHeart faHeart-{{colorIconHeart}} flex align-center flex-col cursor-pointer" (click)="addToMyFavorites()">
            <fa-icon [icon]="faHeart" size="2x"></fa-icon>
            <div class="faHeart-likes mt-4"><span>{{calculNbLikes()}}</span></div>
        </div>
    </div>
    <div class="banner-3 background-color-black-c37a50 px-6 py-3 flex justify-center">
        <div class="opinions-stars-one-vote">
            <div class="opinions-stars-one-empty"></div>
            <div class="opinions-stars-one-full" style="width:{{calculSatisfactionRate()}}%"></div>
        </div>
        <div class="ml-4 content-center">
            <div>{{calculAverageVote()}}/5</div>
            <div class="text-xs">{{nbComments()}} vote</div>
        </div>
    </div>
    <div class="manga_box background-color-black-c16a50">
        <div class="manga_box-image flex justify-center mt-4 mb-5 h-30">
            <img class="poster" src="{{poster}}" alt="">
        </div>
        <div class="manga_box-info px-5 pb-44 mb-5  rounded-e-3xl  background-color-black">
            <p>Titre original : <span>{{data?.manga?.title}}</span></p>
            <p>Année VF : <span>{{dateFormatFrDMY(data?.manga?.releaseDate!)}}</span></p>
            <p>Categorie : <span>{{data?.manga?.category?.name}}</span></p>
            <p class="flex flex-wrap">
                Genre : 
                @for (genre of data?.manga?.genres; track genre.id) {
                    <span class="ml-4">{{genre.label}}</span>
                }
            </p>
            <p class="flex flex-wrap">
                Auteur : 
                @for (author of data?.manga?.authors; track author.id) {
                    <span class="ml-4">{{author?.lastname}}</span>
                }
            </p>
            <p>Prix : <span>{{data?.manga?.price}} €</span></p>
        </div>
    </div>
    <div class="opinions mb-4 h-56 background-color-black-c37a50 rounded-b-lg">
        <ul class="opinions-stars list-unstyled flex align-center">
            <div class="opinions-stars-empty"></div>
            <div class="opinions-stars-full" style="width:{{calculSatisfactionRate()}}%"></div>
        </ul>
        <div class="info-box">
            <div class="flex justify-around mt-4">
                <div class="faHeart faHeart-{{colorIconHeart}} cursor-pointer" (click)="addToMyFavorites()"><fa-icon [icon]="faHeart" size="2x"></fa-icon><span class="nbOpinions">{{calculNbLikes()}}</span></div>
                <div class="faMessage"><fa-icon [icon]="faMessage" size="2x"></fa-icon><span class="nbOpinions">{{nbComments()}}</span></div>
            </div>
            <div class="faBookBookmark flex justify-center"><fa-icon [icon]="faBookBookmark" size="2x"></fa-icon></div>
            <div class="faCartShopping flex justify-center"><fa-icon [icon]="faCartShopping" size="2x"></fa-icon></div>
        </div>
    </div>
    
    <div class="synopsis mb-24">
        <p class="title-synopsis pl-4 pt-8 background-color-black-c16a50 uppercase">synopsis</p>
        <p class="summary pt-8 px-8 pb-8 background-color-black-c16a25">{{data?.manga?.summary}}</p>
    </div>

    <div class="commentaries mb-28 ">
        <div class="commentaries-box">
            <div class="mb-12"><p class="comments-title h-20  pl-4 pt-8 background-color-black-c16a25">COMMENTAIRES ({{nbComments()}})</p></div>
            <ul class="commentaries-box-ul mb-12 scroll" 
                infiniteScroll 
                [infiniteScrollDistance]="2"
                [infiniteScrollThrottle]="500"
                (scrolled)="onScroll()"
                [scrollWindow]="false"
            >
                @for (comment of comments; track $index; let count=$index) {
                    <li class="data-card">
                    <div>
                        <div class="comment-user items-center h-24 background-color-black-c16a25 flex">
                            <img class="img-user ml-8 mr-8" src="{{base64+comment.user.img}}" alt="{{comment.user.username}}">
                            <p class="pr-4">#{{count+1}}. Par <span class="">{{comment.user.username}}</span> le {{dateFormatFrDMY(comment.createdAt)}}</p>
                        </div>
                    </div>
                    <p class="comment-body px-4 py-8 mb-8 background-color-black-c37a50">{{comment.comment}}</p>
                    </li>
                }
                @if(isLoading){
                <div>Loading...</div>
                }
            </ul>
            <div class="comment-end h-20 pl-4 pt-8 background-color-black-c16a25 uppercase">
                <div class="navigation">
                    <nav>
                        <ul class="inline-flex -space-x-px text-base h-10">
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
                                    <button (click)="pageComments(page)" 
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
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
  `,
  styles: [`

    .scroll{
        overflow: scroll;
        height:98rem;
    }

    .opinions-stars-one, .opinions-stars-one-vote{
        position: relative;
        margin-left: 0px;
        vertical-align: middle;
        display: inline-block;
        color: #b1b1b1;
        overflow: hidden;
        margin-top: -1rem;
    }

    .opinions-stars{
        margin-left: 2.4rem;
    }

    .opinions-stars, .opinions-stars-one{
        position: relative;
        vertical-align: middle;
        display: inline-block;
        color: #b1b1b1;
        overflow: hidden;
    }

    .opinions-stars-full, .opinions-stars-one-full{
        position: absolute;
        left: 0;
        top: 0;
        white-space: nowrap;
        overflow: hidden;
        color: rgba(254, 203, 4, 1);
    }

    .opinions-stars-one-empty:before,
    .opinions-stars-one-full:before {
        content: "\u2605";
        font-size: 3.5rem;
    }

    .opinions-stars-empty:before,
    .opinions-stars-full:before {
        content: "\u2605\u2605\u2605\u2605\u2605";
        font-size: 3.5rem;
    }

    .img-user{
        width:70px;
        height:70px;
    }

    .comment-end{
        margin-top: -80px;
    }

    .comments-title{
        color: white;
    }

    .commentaries{
        border-radius: 30px 30px 0 0;
    }

    .summary{
        min-height: 14rem;
        word-wrap: break-word;
    }

    .opinions, .summary, .comment-body, .comment-end{
        border-radius: 0 0 30px 30px;
    }

    .nbOpinions{
        font-size: 2rem;
        margin-left: 0.5rem;
    }

    .poster{
        width:18rem;
    }

    .title-synopsis{
        height: 80px;
    }

    .banner-1, .title-synopsis, .comment-user, .comments-title{
        border-radius: 30px 30px 0 0;
    }
    .banner-1, .banner-2, .banner-3{
        height: 80px;
        align-content: center;
        text-align: center;
    }

    span{
        color: rgba(231, 224, 139, 1);
        font-weight: inherit;
    }

    .faStar{
        color: rgba(254, 203, 4, 1);
    }

    .faBookBookmark, .faHeart, .faMessage, .faCartShopping{
        color: rgba(231, 224, 139, 1);
    }
    .faHeart-grey{
        color: #b1b1b1;
    }

    @media screen and (min-width: 360px){
        .faCartShopping{
            display:none;
        }

        .path{
            display:none;
        }

        .detail-box{
            width: 20rem;
        }

        .star{
            height: 5rem;
            margin-top: -1rem;
        }

        .navigation{
            display:none;
        }
    }

    @media screen and (min-width: 1920px){

        .grey-desactive-btn{
            background-color: grey;
            cursor: default;
            color: rgb(149 163 170);
        }

        .blue-active-btn{
            background-color: blue;
        }

        .navigation nav{
            margin-left: 2rem;
        }

        .navigation {
            display:block;
        }

        .comment-end{
            margin-top:0;
            height: 7rem;
        }

        .commentaries-box-ul{
            padding: 0 3rem;
        }

        .commentaries-box{
            background-color: rgba(16, 16, 16, 0.25);
            border-radius: 1rem;
        }

        .faBookBookmark, .faCartShopping{
            margin-top: 2rem;
            margin-left: 1rem;
            display:block;
        }

        .faMessage, .faHeart{
            margin-top: 0.75rem;
            margin-left: 1rem;
        }

        .info-box{
            display: flex;
        }

        .manga_box-info{
            margin-top: 2rem;
            padding-left: 2.5rem;
        }

        .poster{
            margin-top: -4rem;
            margin-left: 1rem;
        }

        .manga_box{
            display: flex;
        }

        .path{
            display: block;
            margin-left: 0;
            padding-right: 65rem;
            margin-bottom: 3rem;
        }

        .detail-box{
            width: 1280px;
        }

        .banner-1{
            display: flex;
            align-items: center;
            text-transform: uppercase;
            font-size: 1.5rem;

        }

        .banner-2{
            justify-content: flex-start;
            padding-left: 1rem;
        }

        .banner-3{
            padding-right: 32rem;
            text-align: center;
        }

        .faMessage{
            flex-direction: row;
        }

        .faHeart{
            flex-direction: row;
        }

        .star{
            flex-direction: row;
            margin-right: 1.5rem;
        }

        .faMessage-comments, .faHeart-likes{
            margin-left: 1rem;
            margin-top: 0rem;
        }

        .opinions{
            display: flex;
            justify-content: center;
            height: 6rem;
            margin-bottom: 12.5rem;
        }
        .opinions-stars{
            margin-left: 1rem;
        }

        .opinions-star-one-vote{
            margin-right: 1rem;
            margin-top: 1rem;
        }

        .opinions-stars-one{
            margin-right: 1rem
        }

        .faHeart, .faMessage, .faBookBookmark, .faCartShopping{
            margin-left: 5rem;
        }
    }
  `]
})

export class MangaComponent implements OnInit{

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

    //Icon list
    faStar=faStar;
    faHeart=faHeart;
    faMessage=faMessage;
    faBookBookmark=faBookBookmark;
    faHome=faHome;
    faHouse=faHouse;
    faCartShopping=faCartShopping;
   
    
    constructor(
        private mangaService: MangaService,
        private activatedRoute: ActivatedRoute,
        private userService: UserService
    ){
        this.currentPage=0;
    }
    
    ngOnInit(): void {
        this.currentPageScroll=0;
        this.toggleLoading();
        this.idOfUrl=parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
        this.mangaService.getManga(this.idOfUrl)

        this.currentDataMangaSubs();

        this.userService.getUser("5");
        this.currentDataUserSubs();

        this.currentIsFavoriteSubs();

    }

    /**
     * Récupération des dates traitements pour hydrater la vue.
     */
    currentDataMangaSubs(){
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
     * Récupération des data si on a cliqué sur favoris.
     */
    currentIsFavoriteSubs(){
        this.mangaService.currentIsFavorite.subscribe(favorite=>{
            this.isFavorite=favorite
            this.colorIconHeart=this.isFavorite ? "yellow" : "grey"
            this.mangaService.getManga(this.idOfUrl)
            this.mangaService.currentDataManga.subscribe(data=>{
                this.data=data;
            });
        })
    }

    /**
     * Méthode qui sera appelé si on scroll au delà du dernier commentaire.
     */
    onScroll(){
        this.currentPageScroll++;
        this.appendData();
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
}