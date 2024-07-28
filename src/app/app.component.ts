import { FormsModule } from '@angular/forms';
import { SearchMangaService } from './services/search-manga.service';
import { Component, Input } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBook,
  faSearch,
  faUser,
  faCartShopping,
  faShuffle,
  faBars,
  faPen,
  faAddressCard, faTag
} from '@fortawesome/free-solid-svg-icons';
import { Manga } from './types';
import { PicturesPipe } from "./pipes/pictures.pipe"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FontAwesomeModule, FormsModule, PicturesPipe],
  template: `
  <div (click)="removeDisplaySearchManga()">
    <div class="container mx-auto">
      <!-- nav mobile -->
      <nav class="flex py-3 justify-evenly nav-mobile">
        <ul class="flex flex-row items-center gap-x-8">
          <li><a routerLink="/"><img src="assets/img/logo.png" alt=""></a></li>
          <li><a class="icon-menu"><img src="assets/svg/ri_bar-chart-horizontal-fill.svg"></a></li>
          <li><a routerLink="/login" class="icon-user"><img src="assets/svg/bx_bx-user-check.svg"></a></li>
          <li><a class="icon-panier"><img src="assets/svg/carbon_shopping-cart-plus.svg"></a></li>
        </ul>
      </nav>
    </div>

    <div class="bannierre">
      <div class="container mx-auto">
            @if(!msg){
              <div class="nav-desktop-box-mangas-find flex flex-wrap justify-around bg-black h-auto w-auto">
              @for (manga of mangas; track manga.id) {
                <div class="mb-4 mt-8 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a [routerLink]="'/manga/' + manga.id">
                      <img class="rounded-t-lg" src="{{base64+ (manga | pictures)}}" alt="{{manga | pictures: false}}" />
                  </a>
                  <div class="p-5">
                      <a [routerLink]="'/manga/' + manga.id">
                          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Synopsis</h5>
                      </a>
                      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{manga.summary}}</p>
                      <a [routerLink]="'/manga/' + manga.id" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Lire plus
                          <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                          </svg>
                      </a>
                  </div>
                </div>
              }
            </div>
            }
        <!-- nav desktop -->
        <nav class="py-3 flex flex-row px-10 justify-around nav-desktop">
          <a routerLink="/"><img src="assets/img/logo.png" alt=""></a>
          <div class="mb-5">
            <div class="search-div">
              <form (submit)="searchManga($event)">
                <div class="flex flex-row">
                  <input type="text" [(ngModel)]="manga" name="manga" placeholder="Search.." >
                  <button type="submit" class="ml-1 search-btn"><fa-icon [icon]="faSearch"></fa-icon></button>
                </div>
              </form>
            </div>

            <ul class="nav-desktop-box-items flex flex-row justify-around py-1">
              <li><a routerLink="/genres"  class="flex flex-row" href=""><fa-icon class="mr-1" [icon]="faBook"></fa-icon> Genres</a></li>
              <li><a  routerLink="/authors"  class="flex flex-row" href=""><fa-icon class="mr-1" [icon]="faAddressCard"></fa-icon> Autheur</a></li>
              <li><a  routerLink="/categories"    class="flex flex-row" href=""><fa-icon class="mr-1" [icon]="faTag"></fa-icon>Categories</a></li>
            </ul>
            @if(msg){
              <div class="text-center">{{msg}}</div>
            }
          </div>
          <div class="flex flex-row gap-10">
            <a class="icon-panier"><fa-icon [icon]="faCartShopping"></fa-icon></a>
            <a routerLink="/login" class="icon-user"><fa-icon [icon]="faUser"></fa-icon></a>
          </div>
        </nav>
      </div>
    </div>

    <router-outlet></router-outlet>

    <!-- Footer mobile -->
    <footer class="bg-dark-up py-3 text-white">
      <div class="flex flex-col md:flex-row md:px-10 justify-around items-center">
        <div class="flex flex-col w-1/3">
          <img class="mx-auto w-40" src="assets/img/logo.png" alt="">
          <div class="my-6 mx-auto">
            <img class="" src="assets/img/stars.png" alt="">
            <p class="infos">Score<span> 4.1</span> | <span>1500</span> avis</p>
          </div>
        </div>

        <div class="flex flex-col md:flex-row w-1/3 justify-between">
          <div class="text-center my-6 md:text-start">
            <ul class="list">
              <li><h4>Manga’up</h4></li>
              <li><a>Les conditions de vente</a></li>
              <li><a>Politique de confidentialité</a></li>
              <li><a>contact</a></li>
            </ul>
          </div>
          <div class="text-center md:text-start my-6">
            <ul class="list">
              <li><h4>Compte</h4></li>
              <li><a>Créer un compte</a></li>
              <li><a>Se connecter</a></li>
            </ul>
          </div>
        </div>

        <div class="flex flex-col md:flex-col w-1/3">
          <div class="flex flex-row mx-auto gap-4 my-6">
            <a href="https://discord.com/" target="_blank"><img src="assets/icon/discord_mobile.png" alt=""></a>
            <a href="https://x.com/home" target="_blank"><img src="assets/icon/x_mobile.png" alt=""></a>
            <a href="https://www.instagram.com/" target="_blank"><img src="assets/icon/insta_mobile.png" alt=""></a>
            <a href="https://www.facebook.com/" target="_blank"><img src="assets/icon/facebook_mobile.png" alt=""></a>
          </div>
          <img class="mx-auto" src="assets/img/android-btn.png" alt="">
        </div>
      </div>

      <img class="my-6 mx-auto w-8/12" src="assets/img/line_desktop.png" alt="">
      <p class="text-center">Copyright © 2024 Manga’up
        <br>Contact, Mention legale - All rights reserved
      </p>
    </footer>
    </div>
  `,
  styles: [`

    .bannierre{
      position:relative;
    }

    .nav-desktop-box-mangas-find{
      position:absolute;
      position: absolute;
      margin: 6rem 10rem;
      z-index: 9999;
    }

    .nav-desktop {
      display: none;
    }
    .footer-desktop {
      display: none;
    }
    input {
      color: black;
    }
    .bg-dark-up {
      background-color: rgb(16, 16, 16, 50%);
    }
    .list {
      line-height: 2rem;
    }
    .list>li>h4 {
      font-weight: bolder;
    }
    @media (min-width: 1250px) {
      .footer-mobile {
        display: none;
      }
      .nav-mobile {
        display: none;
      }
      .nav-desktop {
        display: flex;
      }
      .footer-desktop {
        display: flex;
      }
      
      // faire les media pour le background
      .bannierre {
        background-image: url("/assets/img/bannierre_mangas_mono.webp");
        color: #E7E08B;
        height: 593px;
        background-repeat: no-repeat;
        background-size: cover;
      }
      .search-div {
        width: 449px;
        overflow: hidden;
        input {
          width: 95%;
          padding: 2px 24px 2px 12px;
          height: 32px;
          border-radius: 30px;
          background-color: transparent;
          color: white;
          border: solid 2px;
          border-top-right-radius: 0%;
          border-bottom-right-radius: 0%;
          border-color: #E7E08B;
        }
        input:focus {
          outline: #E7E08B;
        }
        button {
          cursor: pointer;
        }
      }
      .search-btn {
        border: solid 2px;
        border-radius: 10px;
        border-top-left-radius: 0%;
        border-bottom-left-radius: 0%;
        border-left: none;
        border-color: #E7E08B;
        margin-left: 0px;
        padding-right: 4px;
        padding-left: 4px;
      }
    }
  `]
})
export class AppComponent {
  title = 'app';
  protected readonly faBook = faBook;
  protected readonly faShuffle = faShuffle;
  protected readonly faCartShopping = faCartShopping;
  protected readonly faUser = faUser;
  protected readonly faSearch = faSearch;
  protected readonly  faBars = faBars;
  protected readonly faPen = faPen;
  protected readonly faAddressCard = faAddressCard;
  protected readonly faTag = faTag;
  base64:string="data:image/webp;base64,";
  mangas!: Manga[];
  manga: string="";
  msg: string="";
  isClick: boolean=false;

  constructor(private searchMangaService: SearchMangaService, private router: Router){}

  ngOnInit(){
    this.searchMangaService.currentSearch.subscribe(mangas=>{
      this.mangas=mangas;
      console.log("isClick ", this.isClick);
      
      if(mangas.length===0 && this.isClick){
        this.msg="Le mangas n'a pas été trouvé";
        console.log("if!mangas");
        
        setTimeout(() => {
          this.msg="";
        }, 3000);
      }
    })
  }

  removeDisplaySearchManga(){
    this.isClick=false;
    this.mangas=[];
  }

  searchManga(event: Event){

    this.isClick=true;

    if(!this.manga){
      return;
    }

    event.preventDefault();
    this.searchMangaService.searchManga(this.manga);
    this.manga="";
  }



}
