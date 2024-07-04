import { PictureService } from './../../services/picture.service';
import { CommentService } from '../../services/comment.service';
import { MangaService } from './../../services/manga.service';
import { Component, OnInit } from '@angular/core';
import { Comment, DataManga, Manga, Picture, User } from '../../types';
import { ActivatedRoute } from '@angular/router';
import { faBookBookmark, faMessage, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-manga',
  standalone: true,
  imports: [FontAwesomeModule],
  template: `

<div class="flex justify-center mb-5 mt-5">
<div class="block max-w-[20rem] rounded-lg bg-secondary text-white shadow-secondary-1">
    <div class="banner-1 background-color-black-c16a25 px-6 py-3">{{data?.manga?.title}}</div>
    <div class="banner-2 background-color-black-c60a10 px-6 py-3 flex justify-between">
        <div class="flex align-center flex-col -mt-4">
            <div class="opinions-stars-one">
                <div class="opinions-stars-one-empty"></div>
                <div class="opinions-stars-one-full" style="width:{{calculSatisfactionRate()}}%"></div>
            </div>
            <span>{{calculAverageVote()}}</span>
        </div>
        <div class="faMessage flex align-center flex-col"><fa-icon [icon]="faMessage" size="2x"></fa-icon><span>{{nbComments()}}</span></div>
        <div class="faHeart-{{colorIconHeart}} flex align-center flex-col cursor-pointer" (click)="addToMyFavorites()"><fa-icon [icon]="faHeart" size="2x"></fa-icon><span>{{calculNbLikes()}}</span></div>
    </div>
    <div class="banner-3 background-color-black-c37a50 px-6 py-3 flex justify-center">
        <div class="opinions-stars-one">
            <div class="opinions-stars-one-empty"></div>
            <div class="opinions-stars-one-full" style="width:{{calculSatisfactionRate()}}%"></div>
        </div>
        <div class="ml-4 content-center">
            <div>{{calculAverageVote()}}/5</div>
            <div class="text-xs">{{nbComments()}} vote</div>
        </div>
    </div>
    <div class="background-color-black-c16a50">
        <div class="flex justify-center mt-4 mb-5 h-30">
            <img class="poster" src="{{poster}}" alt="">
        </div>
        <div class="px-5 pb-44 mb-5  rounded-e-3xl  background-color-black">
            <p>Titre original : <span>{{data?.manga?.title}}</span></p>
            <p>Origine : </p>
            <p>Année VF : <span>{{data?.manga?.releaseDate}}</span></p>
            <p>Categorie : <span>{{data?.manga?.category?.name}}</span></p>
            <p class="flex flex-wrap">
                Genre : 
                @for (genre of data?.manga?.genres; track genre.id) {
                    <span class="ml-4">{{genre.label}}</span>
                }
            </p>
            <p>Thèmes : </p>
            <p class="flex flex-wrap">
                Auteur : 
                @for (author of data?.manga?.authors; track author.id) {
                    <span class="ml-4">{{author?.lastname}}</span>
                }
            </p>
            <p>Éditeur VO : </p>
            <p>Éditeur VF : </p>
            <p>Prépublié dans : </p>
            <p>Nb volume VO : 10 (Terminé)</p>
            <p>Nb volume VF : 0 (À paraître)</p>
            <p>Prix : <span>{{data?.manga?.price}} €</span></p>
            <p>Âge conseillé : </p>
            <p>Pour public averti : </p>
            <p>Se trouve dans le commerce en France : </p>
        </div>
    </div>
    <div class="opinions mb-4 h-56">
        <ul class="opinions-stars list-unstyled flex align-center">
            <div class="opinions-stars-empty"></div>
            <div class="opinions-stars-full" style="width:{{calculSatisfactionRate()}}%"></div>
        </ul>
        <div>
            <div class="flex justify-around mt-4">
                <div class="faHeart-{{colorIconHeart}} cursor-pointer" (click)="addToMyFavorites()"><fa-icon [icon]="faHeart" size="2x"></fa-icon><span class="nbOpinions">{{calculNbLikes()}}</span></div>
                <div class="faMessage"><fa-icon [icon]="faMessage" size="2x"></fa-icon><span class="nbOpinions">{{nbComments()}}</span></div>
            </div>
            <div class="faBookBookmark flex justify-center"><fa-icon [icon]="faBookBookmark" size="2x"></fa-icon></div>
        </div>
    </div>
    
    <div class="synopsis mb-72">
        <p class="title-synopsis pl-4 pt-8 background-color-black-c16a50 uppercase">synopsis</p>
        <p class="summary pt-8 px-8 pb-8 background-color-black-c16a25">{{data?.manga?.summary}} {{log(data?.manga!)}}</p>
    </div>

    <div class="commentaries mb-28">
        <div class="commentaries-box">
            <div class="mb-12"><p class="comments-title h-20  pl-4 pt-8 background-color-black-c16a25">COMMENTAIRES ({{nbComments()}})</p></div>
            <ul class="mb-12">
                @for (comment of data?.comments; track comment.id; let count=$index) {
                    <li class="">
                    <div>
                        <div class="comment-user items-center h-24 background-color-black-c16a25 flex">
                            <img class="img-user ml-8 mr-8" src="{{base64+comment.user.img}}" alt="{{comment.user.username}}">
                            <p class="pr-4">#{{count+1}}. Par <span class="">{{comment.user.username}}</span> le {{truncatDate(comment.createdAt)}}</p>
                        </div>
                    </div>
                    </li>
                    <li><p class="comment-body px-4 py-8 mb-8 background-color-black-c37a50">{{comment.comment}}</p></li>
                }
            </ul>
            <div class="comment-end h-20 pl-4 pt-8 background-color-black-c16a25 uppercase"></div>
        </div>
    </div>
</div>
</div>
  `,
  styles: [`

    .opinions-stars-one{
        position: relative;
        margin-left: 0px;
        vertical-align: middle;
        display: inline-block;
        color: #b1b1b1;
        overflow: hidden;
        margin-top: -17px;
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

    .faBookBookmark, .faHeart-yellow, .faMessage{
        color: rgba(231, 224, 139, 1);
    }
    .faHeart-grey{
        color: #b1b1b1;
    }
  `]
})

export class MangaComponent implements OnInit{

    data!: DataManga | null;
    posterUser!:string[];
    pictures!:Picture[];
    picture!:Picture;
    comments!:Comment[];
    idUrl!:string; // id du manga récupéré à partir de l'url.
    base64:string="data:image/webp;base64,";
    poster!:string;
    count:number=1; // Pour compter le nombre de commentaires.
    nbLikes:number=0;
    colorIconHeart:string="grey"; // Définie la couleur lorsque le manga est en favorie ou pas.
    user!:User | null;
    isFavorit!:boolean;

    //Icon list
    faStar=faStar;
    faHeart=faHeart;
    faMessage=faMessage;
    faBookBookmark=faBookBookmark;
   
    
    constructor(
        private mangaService: MangaService,
        private activatedRoute: ActivatedRoute,
        private accountService: AccountService
    ){}
    
    ngOnInit(): void {
        this.idUrl=this.activatedRoute.snapshot.paramMap.get('id')!;
        this.mangaService.getManga(this.idUrl)
        
        this.mangaService.currentDataManga.subscribe(data=>{
            this.data=data
            this.strToLowerCaseAndFirstLetter();
            this.searchPicturesIsPoster();
            this.sortCommentByDate();
            this.nbComments();
            console.log("this.data?.comments : ", this.data?.comments)
            
            if(this.accountService.isLogged()){
                this.user=this.accountService.getUser();
                this.isFavorit=this.user?.mangas.filter((manga)=>manga.id===this.user?.id) ? true : false;
                this.colorIconHeart=this.isFavorit ? "yellow" : "grey"
            }
        });
    }

    addToMyFavorites(){
        console.log("addToMyFavorites");
        
        if(this.isFavorit){
            this.mangaService.deleteUserAsFavorite(this.idUrl, this.user?.id) 
        }else{
            this.mangaService.addUserInFavorite(this.idUrl, this.user?.id)
        }
    }

    calculNbLikes(){
        if(this.data){
            return this.nbLikes=this.data?.manga?.users?.length;
        }
        return 0;
    }

    calculAverageVote(){
        if(this.data){
            const sum=this.data?.comments?.reduce((a, b)=>a+b?.rating, 0);
            const total=sum/this.data?.comments.length;
            return Math.floor(total*100)/100;
        }
        return 0;
    }

    calculSatisfactionRate(){
         return (this.calculAverageVote()/5)*100;
    }

    nbComments(){
        return this.data?.comments.length;
    }

    truncatDate(date: Date){
        return date.toString().substring(0, date.toString().indexOf('T'))
    }

    counter(){
        return this.count++;
    }

    strToLowerCaseAndFirstLetter(){
        if(this.data){
            for (let genre of this.data?.manga?.genres) {
                let tmp=genre.label.toLocaleLowerCase();
                genre.label=tmp.charAt(0).toUpperCase()+tmp.slice(1);
            }
        }
    }

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

    sortCommentByDate(){
        if(this.data){
            this.data.comments.sort((a, b)=>{
                return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
            })
        }
    }

    log(val: Object){
        console.log("manga.component.ts : ", val);
    }
    
}