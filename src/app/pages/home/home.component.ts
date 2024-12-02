import { AccountService } from './../../services/account.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { PictureService } from '../../services/picture.service';
import { MangaService } from '../../services/manga.service';
import {GenreService} from "../../services/genre.service";
import { Comment, Manga, Picture, Genre, User } from '../../types';
import { PicturesPipe } from '../../pipes/pictures.pipe';
import { NgClass } from '@angular/common';
import {CarouselComponent} from "../../components/carousel/carousel.component";
import {CarouselComponentDate} from "../../components/carousel-date/carousel-date.component";
import {CarouselGenreComponent} from "../../components/carousel/carouselGenre.component";


@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterModule, CardComponent, FontAwesomeModule, PicturesPipe, NgClass, CarouselComponent, CarouselComponent, CarouselComponent, CarouselComponent, CarouselComponentDate, CarouselGenreComponent],
    template: `
 

    <section class="container mx-auto px-5 md:px-10  my-5\t">
        <a routerLink="/mangas" class="flex flex-row items-center\tgap-2">
            <h2 class="my-5">Manga</h2>
            <fa-icon [icon]="faArrowRight"></fa-icon>
        </a>
        <ui-carousel>

        </ui-carousel>
        <div class="content-manga ">
            @for (manga of nineMangas; track manga.id) {
            <div class="content-manga__link">
                <a [routerLink]="'/manga/' + manga.id">
                <ui-card class="" size="card-manga">
                    <img class="h-64 w-40 rounded-xl" src="{{base64+ (manga | pictures)}}" alt="{{manga | pictures: false}}" />
                    <!--@for (picture of manga.pictures; track picture.id) {
                        <img alt="{{picture.title}}" src="{{base64+picture.img}}">
                    }-->
                    <p class="content-manga__title">{{ manga.title }}</p>
                    <div>
                        <p class="d-flex inline" [ngClass]="manga.discountPercentage ? 'content-manga__discount' : ''"><span class="font-normal">{{ priceUnity(manga.price, null) }}</span> <sup class="-top-1">{{ priceDecimal(manga.price, null) }} €</sup></p>
                        @if(manga.discountPercentage){
                            <p class="d-flex inline"><span class="font-normal">&emsp;&emsp;{{ priceUnity(manga.price, manga.discountPercentage) }}</span> <sup class="-top-1">{{ priceDecimal(manga.price, manga.discountPercentage) }} €</sup></p>                            
                        }
                    </div>
                </ui-card>
                </a>
            </div>
            }
        </div>
    </section>

    <div class="py-3 bg-dark flex flex-row justify-center items-center gap-10	utile-desktop">
        <div class="flex flex-row justify-center items-center gap-4 flex-wrap text-center	">
            <img src="assets/svg/shield.svg" alt="">
            <p>Fiable et sûr <br>10,000 référence</p>
        </div>
        <img src="assets/img/line-desktop2.png" alt="">

        <div class=" flex flex-row justify-center items-center gap-4 flex-wrap  text-center">
            <img src="assets/svg/customer-service.svg" alt="">
            <p>Service client <br> disponibles 24/7</p>
        </div>
        <img src="assets/img/line-desktop2.png" class="line-none" alt="">

        <div class="stars-none flex flex-col	 justify-center ">
            <img class="mx-auto " src="assets/img/stars.png" alt="">
            <p>Score <span>4.1 </span> | <span>1500 avis</span></p>
        </div>
    </div>

    <section class="container mx-auto px-5 md:px-10  my-5\t">
        <a routerLink="/mangas" class="flex flex-row items-center\tgap-2">
            <h2 class="my-5">les plus récents </h2>
            <fa-icon [icon]="faArrowRight"></fa-icon>
        </a>
        
      <ui-carousel-date>
          
      </ui-carousel-date>
        
        <div class="content-manga ">
            @for (manga of dateOrderMangas; track manga.id) {
            <div class="content-manga__link">
                <a [routerLink]="'/manga/' + manga.id">
                <ui-card class="" size="card-manga">
                    <img class="h-64 w-40 rounded-xl" src="{{base64+ (manga | pictures)}}" alt="{{manga | pictures: false}}" />
                    <!--@for (picture of manga.pictures; track picture.id) {
                        <img alt="{{picture.title}}" src="{{base64+picture.img}}">
                    }-->
                    <p class="content-manga__title">{{ manga.title }}</p>
                    <p class="d-flex inline" [ngClass]="manga.discountPercentage ? 'content-manga__discount' : ''"><span class="font-normal">{{ priceUnity(manga.price, null) }}</span> <sup class="-top-1">{{ priceDecimal(manga.price, null) }} €</sup></p>
                        @if(manga.discountPercentage){
                            <p class="d-flex inline"><span class="font-normal">&emsp;&emsp;{{ priceUnity(manga.price, manga.discountPercentage) }}</span> <sup class="-top-1">{{ priceDecimal(manga.price, manga.discountPercentage) }} €</sup></p>                            
                        }
                </ui-card>
                </a>
            </div>
            }
        </div>
    </section>

    <div class="bg-dark flex flex-col py-3 text-center avis-desktop">
        <img class="mx-auto py-3" src="assets/img/stars.png" alt="">
        <p>
            le meilleurs site pour le listing des mangas
            et le meilleur pour agrandir votre collection <br>
            <span>1500 </span>avis
        </p>
    </div>

    <section class="container mx-auto px-5 md:px-10	my-5">
        <a routerLink="/genres" class="flex flex-row items-center	gap-2">
            <h2 class="my-5">Genre</h2>
            <fa-icon [icon]="faArrowRight"></fa-icon>
        </a>

        
        
        <ui-carousel-genre>
            
        </ui-carousel-genre>
        <div class="content-genre">
            @for (genre of genres; track genre.id) {
            <div class="content-manga__link">                
                <a [routerLink]="'/genre/' + genre.id">
                <ui-card class="card" size="card-genre">
                    <img src="{{base64G+genre.img}}">
                    <p>{{ genre.label }}</p>
                </ui-card>
                </a>
            </div>
            }
        </div>
    </section>

    <div class="bg-dark flex flex-col py-3 text-center uppercase">
        <p>La référence dans le manga plus de 10 000 mangas</p>
    </div>


    <section class="mx-auto ">
        <a  [routerLink]="'/manga/' + justeOne?.id"></a>
        <div class="card_single_home">
            <div class="card_single_home__img">
                <img class="mx-auto" src="{{base64+ (justeOne! | pictures)}}" alt="{{justeOne! | pictures: false}}" />
            </div>
            <div class="card_single_home__infos">
                <h3>{{ justeOne?.title }}</h3>
                <ul>
                    <li><span>Genre:</span></li>  
                    @for (genre of justeOne?.genres; track genre.id) {
                        <li>{{genre.label}}, </li>
                    }
                </ul>
                <ul>
                    <li> <span>Auteur :</span></li>
                    @for(author of justeOne?.authors; track author.id){
                        <li>{{author.firstname}} {{author.lastname}}</li>
                    }
                </ul>
                <p><span>Catégorie : </span>  {{justeOne?.category?.name}}</p>   
                <p> <span>Résume : </span>{{ justeOne?.summary}}</p>
                <a class="btn"  [routerLink]="'/manga/' + justeOne?.id">Voir le manga</a>   
            </div>
        </div>
    </section>

  `,
    styles: [`

      ui-carousel,ui-carousel-date ,ui-carousel-genre{
        display: none;
      }
      
      
.content-manga__discount{
    text-decoration-line: line-through;
    color: rgb(113 113 122);
}

.content-manga__title{
    width: max-content;
}

.content-manga__link{
    width: 15.625rem;
}
        
.bg-dark{
background-color: #101010;
}


a{
h2{
  color:#E7E08B;
  text-transform: uppercase
}
}
.line-none{
display:none;
}
.stars-none{
display:none;
}

.card_single__home{
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  padding: 5px;
  border-radius: 10px;
  background-color: rgb(60,60,60,10%) ;
   img{
     border-radius: 10px;
   }
  h3{
     text-transform: uppercase;
      text-align: center;
    font-weight:bold;
   }
  ul{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 10px;
  }
  .card_single_home__infos{
        text-align: justify;
    }
}
@media (min-width: 1250px) {

.stars-none{
display:flex;
}
.line-none{
display:flex;
}
  .card_single_home__infos{

  }
  .card_single__home{
    width: 50%;
    margin: auto;
    background-color: rgb(60,60,60,10%) ;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    .card_single_home__img{
        width: 47rem;
        margin-right: 1rem;
    }
    .card_single_home__infos{
        text-align: justify;
    }
  }
}

.content-manga,.content-genre{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem 4rem;
}
      .bg-dark {
        background-color: #101010;
      }


      a {
        h2 {
          color: #E7E08B;
          text-transform: uppercase
        }
      }

      .line-none {
        display: none;
      }

      .stars-none {
        display: none;
      }

      .card_single_home {
        margin: 1rem auto;
        width: 80%;
        padding: 10px;
        border-radius: 10px;
        background-color: rgb(60, 60, 60, 10%);
        transition: transform 0.3s ease, box-shadow 0.3s ease;

        &:hover {
          transform: scale(1.1);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        img {
          border-radius: 10px;
          width: 70%;
        }

        .card_single_home__infos {
          background-color: #161616;
          width: 50%;
          padding: 15px;
          border-radius: 10px;

          h3 {
            text-transform: uppercase;
            text-align: center;
            font-weight: bold;
          }

          p {
            padding-top: 10px;
            padding-bottom: 10px;
          }

          ul {
            padding-top: 10px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            column-gap: 10px;
          }
        }
      }

      @media (min-width: 1250px) {

        .stars-none {
          display: flex;
        }
        .line-none {
          display: flex;
        }
        .card_single_home {
          width: 60%;
          background-color: rgb(60, 60, 60, 10%);
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;
          margin: 50px auto;

          .card_single_home__img {
            width: 50%;
          }

        }
      }

      .content-manga, .content-genre {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;
        gap: 2rem 20rem;
      }

      .card {
        img {
          border-radius: 10px;
          height: 100%;
          width: 100%;
        }


      }

@media (max-width: 768px) {
  ui-carousel,ui-carousel-date ,ui-carousel-genre{
    display: block;
  }
  .content-manga,.content-genre{
    display : none;
  }

 img{
   margin-bottom: 10px;
 }

  .card_single_home__infos {
    width: 100% !important;
    margin-right: auto;
    margin-left: auto;
  }

  
  
}


    `]
})
export class HomeComponent implements OnInit {

    mangas!: Manga[] ;
    pictures!: Picture[];
    picture!:Picture;
    idUrl!: string;
    base64:string="data:image/webp;base64,";
    base64G:string="data:image/webp;base64,";
    poster!:string;
    faArrowRight = faArrowRight;
    genres!: Genre[];
    nineMangas! : Manga[];
    dateOrderMangas! : Manga[] ;
    justeOne! : Manga | null ;


    constructor(
        private mangaService: MangaService,
        private pictureService: PictureService,
        private activatedRoute: ActivatedRoute,
        private genreService : GenreService ,
    ){}
    ngOnInit(): void {
        this.mangaService.getTenManga()
        this.mangaService.currentTenMangas.subscribe(nineMangas =>{
            this.nineMangas = nineMangas;
        })

        this.mangaService.getOrderDateManga()
        this.mangaService.currentOrderDateManga.subscribe(dateOrderMangas =>{
            this.dateOrderMangas =dateOrderMangas;
        })


        this.mangaService.currentMangas.subscribe(mangas => {
            this.mangas = mangas

        })
        this.pictureService.currentPictures.subscribe(pictures =>this.pictures = pictures)

        // One manga
        this.mangaService.getOneManga()
        this.mangaService.currentMangaOne.subscribe(justeOne =>{
            this.justeOne = justeOne
            //this.searchPicturesIsPosterManga(this.justeOne!);
            console.log(this.justeOne)
        })

        //genre
        this.genreService.getSixgenre();
        this.genreService.currentGenresSix.subscribe(genres =>{
            this.genres = genres
        })
        // this.genreService.currentGenres.subscribe(genres => this.genres = genres)
    }

    priceUnity(price: number, discountPercentage: number | null){
        if(discountPercentage){
            price=price-price*discountPercentage;
        }
        let _price=JSON.stringify(price);
        return _price.split(".").shift();
    }

    priceDecimal(price: number, discountPercentage: number | null){
        if(discountPercentage){
            price=price-price*discountPercentage;
        }
        let _price=(Math.round(price * 100) / 100).toFixed(2)
        return _price.split(".").pop()
    }

    searchPicturesIsPoster(){
        if(this.mangas){
            for (const manga of this.mangas) {
                for (const picture of manga.pictures){
                    if(picture.isPoster) {
                        this.picture=picture;
                        break;

                    }
                }
                this.poster=this.base64+this?.picture?.img;
            }
        }
    }
    splitFonction(val : Object[]){
        val.splice(1,1)
    }

    log(val: any[]){
        console.log(val);
    }

    logNumber(val: number, msg: string){
        console.log(msg, val);
    }
}