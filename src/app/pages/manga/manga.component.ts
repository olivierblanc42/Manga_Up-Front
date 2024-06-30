import { PictureService } from './../../services/picture.service';
import { CommentService } from '../../services/comment.service';
import { MangaService } from './../../services/manga.service';
import { Component, OnInit } from '@angular/core';
import { Comment, Manga, Picture } from '../../types';
import { ActivatedRoute } from '@angular/router';
import { faBookBookmark, faMessage, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-manga',
  standalone: true,
  imports: [FontAwesomeModule],
  template: `

<div class="flex justify-center mb-5 mt-5">
<div class="block max-w-[20rem] rounded-lg bg-secondary text-white shadow-secondary-1">
    <div class="banner-1 background-color-black-c16a25 px-6 py-3">{{manga?.title}}</div>
    <div class="banner-2 background-color-black-c60a10 px-6 py-3 flex justify-between">
        <div class="img"><img src="/assets/svg/star-white.svg" alt="star-white.svg"><span>12</span></div>
        <div class="img"><img src="/assets/svg/comment-white-fill.svg" alt="comment-white-fill.svg"><span>12</span></div>
        <div class="img"><img src="/assets/svg/heart-white-outline.svg" alt="heart-white-outline.svg"><span>12</span></div>
    </div>
    <div class="banner-3 background-color-black-c37a50 px-6 py-3 flex justify-center">
        <div><img src="/assets/svg/star-yellow.svg" alt="star-yellow"></div>
        <div class="ml-4">
            <div>-/5</div>
            <div class="text-xs">0 vote</div>
        </div>
    </div>
    <div class="background-color-black-c16a50">
        <div class="flex justify-center mt-4 mb-5 h-30">
            <img class="poster" src="{{base64}}" alt="">
        </div>
        <div class="px-5 pb-44 mb-5  rounded-e-3xl  background-color-black">
            <p>Titre original : <span>{{manga?.title}}</span></p>
            <p>Origine : </p>
            <p>Année VF : <span>{{manga?.releaseDate}}</span></p>
            <p>Type : <span>{{manga?.category?.name}}</span></p>
            <p class="flex flex-wrap">
                Genre : 
                @for (genre of manga?.genres; track genre.id) {
                    <span class="ml-4">{{genre.label}}</span>
                }
            </p>
            <p>Thèmes : </p>
            <p class="flex flex-wrap">
                Auteur : 
                @for (author of manga?.authors; track author.id) {
                    <span class="ml-4">{{author?.lastname}}</span>
                }
            </p>
            <p>Éditeur VO : </p>
            <p>Éditeur VF : </p>
            <p>Prépublié dans : </p>
            <p>Nb volume VO : 10 (Terminé)</p>
            <p>Nb volume VF : 0 (À paraître)</p>
            <p>Prix : <span>{{manga?.price}} €</span></p>
            <p>Âge conseillé : </p>
            <p>Pour public averti : </p>
            <p>Se trouve dans le commerce en France : </p>
        </div>
    </div>
    <div class="opinions mb-4 h-56">
        <ul class="list-unstyled flex justify-center">
            <div class="faStar"><fa-icon [icon]="faStar" size="2x"></fa-icon></div>
            <div class="faStar"><fa-icon [icon]="faStar" size="2x"></fa-icon></div>
            <div class="faStar"><fa-icon [icon]="faStar" size="2x"></fa-icon></div>
            <div class="faStar"><fa-icon [icon]="faStar" size="2x"></fa-icon></div>
            <div class="faStar"><fa-icon [icon]="faStar" size="2x"></fa-icon></div>
        </ul>
        <div>
            <div class="flex justify-around mt-4">
                <div class="faHeart"><fa-icon [icon]="faHeart" size="2x"></fa-icon><span class="nbOpinions">12</span></div>
                <div class="faMessage"><fa-icon [icon]="faMessage" size="2x"></fa-icon><span class="nbOpinions">12</span></div>
            </div>
            <div class="faBookBookmark flex justify-center"><fa-icon [icon]="faBookBookmark" size="2x"></fa-icon></div>
        </div>
    </div>
    
    <div class="synopsis mb-72">
        <p class="title-synopsis pl-4 pt-8 background-color-black-c16a50 uppercase">synopsis</p>
        <p class="summary pt-8 px-8 pb-8 background-color-black-c16a25">{{manga?.summary}}</p>
    </div>

    <div class="commentaries mb-28">
        <div class="commentaries-box">
            <div class="mb-12"><p class="comments-title h-20  pl-4 pt-8 background-color-black-c16a25">COMMENTAIRES (6)</p></div>
            <ul class="mb-12">
                @for (comment of comments; track comment.id) {
                    <li><p class="comment-user h-24 pl-4 pt-8 mt-8 background-color-black-c16a25"></p></li>
                    <li><p class="comment-body h-24 pl-4 pt-8 background-color-black-c37a50">{{comment.comment}}</p></li>
                }
            </ul>
            <div class="comment-end h-20 pl-4 pt-8 background-color-black-c16a25 uppercase"></div>
        </div>
    </div>
</div>
</div>
  `,
  styles: [`

    .comment-end{
        margin-top: -34px;
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

    .faBookBookmark, .faHeart, .faMessage{
        color: rgba(231, 224, 139, 1);
    }
  `]
})

export class MangaComponent implements OnInit{

    manga!: Manga | null;
    pictures!: Picture[];
    picture!: Picture;
    comments!: Comment[];
    idUrl!: string;
    base64:string="data:image/webp;base64,";


    //Icon list
    faStar=faStar;
    faHeart=faHeart;
    faMessage=faMessage;
    faBookBookmark=faBookBookmark;
    
    constructor(
        private mangaService: MangaService,
        private pictureService: PictureService,
        private commentService: CommentService,
        private activatedRoute: ActivatedRoute        
    ){}
    
    ngOnInit(): void {
        this.idUrl=this.activatedRoute.snapshot.paramMap.get('id')!;
        this.mangaService.getManga(this.idUrl)
        this.pictureService.getPicturesByIdManga(this.idUrl);
        this.commentService.getCommentsByIdManga(this.idUrl);
        
        this.mangaService.currentManga.subscribe(manga=>{
            this.manga=manga
            this.strToLowerCaseAndFirstLetter();
            
        });

        this.pictureService.currentPictures.subscribe(pictures=>{
            this.pictures=pictures;
            for (const picture of this.pictures) {
                if(picture.isPoster) {
                    this.picture=picture;
                    break;
                };
            }
            this.base64=this.base64+this.picture?.img;
        });

        this.commentService.currentComments.subscribe(comments=>{
            this.comments=comments;
        })
    }

    strToLowerCaseAndFirstLetter(){
        if(this.manga){
            for (let genre of this.manga?.genres) {
                let tmp=genre.label.toLocaleLowerCase();
                genre.label=tmp.charAt(0).toUpperCase()+tmp.slice(1);
            }
        }
    }

    log(val: Object){
        console.log(val);
    }
    
}





