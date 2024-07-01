import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { PictureService } from '../../services/picture.service';
import { MangaService } from '../../services/manga.service';
import { Comment, Manga, Picture } from '../../types';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CardComponent, FontAwesomeModule],
  template: `


    <section class="container mx-auto px-5 md:px-10  my-5\t">

      <a routerLink="/mangas" class="flex flex-row items-center\tgap-2">
        <h2 class="my-5">Manga</h2>
        <fa-icon [icon]="faArrowRight"></fa-icon>
      </a>
      <div class="content-manga ">
        @for (manga of mangas; track manga.id) {

          <ui-card class="" size="card-manga">
            <p>{{ manga.title }}</p>
           
            @for (picture of pictures; track picture.id){
              <img alt="{{picture.title}}" src="{{base64 + picture.img}}">
            }
          </ui-card>

        }
      </div>
    </section>


    <div class="py-3 bg-dark flex flex-row justify-center items-center gap-10	utile-desktop">

    <div class="flex flex-row justify-center items-center gap-4	">
        <img src="assets/svg/shield.svg" alt="">
        <p>Fiable et sûr <br>10,000 référence</p>
    </div>
    <img src="assets/img/line-desktop2.png" alt="">

    <div class=" flex flex-row justify-center items-center gap-4		 ">
        <img src="assets/svg/customer-service.svg" alt="">
        <p>Service client <br> disponibles 24/7</p>
    </div>
    <img src="assets/img/line-desktop2.png" class="line-none" alt="">

    <div class="stars-none flex flex-col	 justify-center ">
        <img class="mx-auto " src="assets/img/stars.png" alt="">
        <p>Score <span>4.1 </span>| <span>1500 avis</span></p>
    </div>

</div>
<section class="container mx-auto px-5 md:px-10	my-5	">

    <a class="flex flex-row items-center 	gap-2 ">
        <h2 class="my-5">Les plus vue</h2>
        <fa-icon [icon]="faArrowRight"></fa-icon>
    </a>
    <div>

        <ui-card class="" size="card-manga"></ui-card>
    </div>
</section>

<div class="bg-dark flex flex-col py-3 text-center avis-desktop">
    <img class="mx-auto py-3" src="assets/img/stars.png" alt="">
    <p>le meilleurs site pour le listing des mangas
        et le meilleur pour agrandir votre collection <br>
        <span>1500 </span>avis
    </p>
</div>
<section class="container mx-auto px-5 md:px-10	my-5	">
          
    <a routerLink="/genres" class="flex flex-row items-center	gap-2">
        <h2 class="my-5">Genre</h2>
        <fa-icon [icon]="faArrowRight"></fa-icon>
    </a>
    <div>

        <ui-card class="" size="card-genre"></ui-card>
    </div>
</section>

<div class="bg-dark flex flex-col py-3 text-center uppercase">
    <p>La référence dans le manga plus de 10 000 mangas</p>
</div>


<section class="mx-auto ">
        <ui-card class="" size="card-manga"></ui-card>

</section>

`,
  styles: [`
.bg-dark{
background-color: #101010;
}


a{
color:#E7E08B;
text-transform: uppercase
}
.line-none{
display:none;
}
.stars-none{
display:none;
}


@media (min-width: 1250px) {

.stars-none{
display:flex;
}
.line-none{
display:flex;
}
}

.content-manga{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem 10rem;}



`]
})
export class HomeComponent implements OnInit {

  mangas!: Manga[] ;
  pictures!: Picture[];
  picture!:Picture;

  idUrl!: string;
  base64:string="data:image/webp;base64,";

  poster!:string;
  faArrowRight = faArrowRight;



  constructor(
      private mangaService: MangaService,
      private pictureService: PictureService,
      private activatedRoute: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.mangaService.getTenManga()

    this.mangaService.currentMangas.subscribe(mangas => this.mangas = mangas)
    this.pictureService.currentPictures.subscribe(pictures =>this.pictures = pictures)

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


  log(val: Object[]){
    console.log(val);
  }
}