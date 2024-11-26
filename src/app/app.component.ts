import { AuthService } from './services/auth.service';
import { AccountService } from './services/account.service';
import { FormsModule } from '@angular/forms';
import { SearchMangaService } from './services/search-manga.service';
import { Component, ElementRef, HostListener, Output } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBook,
  faSearch,
  faUser,
  faUserLargeSlash,
  faCartShopping,
  faShuffle,
  faBars,
  faPen,
  faAddressCard, faTag
} from '@fortawesome/free-solid-svg-icons';
import { Manga, User } from './types';
import { PicturesPipe } from "./pipes/pictures.pipe"
import { FlashMessageComponent } from "./components/flash-message/flash-message.component";
import { LoginComponent } from "./pages/login/login.component";
import { CartService } from './services/cart.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FontAwesomeModule, FormsModule, PicturesPipe, FlashMessageComponent, LoginComponent],
  host: {'(document:click)':'closeMenu($event)'},
  template: `

<div (click)="removeDisplaySearchManga()" id="global-page">
    <!-- nav mobile -->
    <div class="container mx-auto">
        <nav class="flex py-3 justify-evenly nav-mobile">
            <ul class="flex flex-row items-center gap-x-8">
                <li><a routerLink="/"><img src="assets/img/logo.png" alt=""></a></li>
                <li><a class="icon-menu"><img src="assets/svg/ri_bar-chart-horizontal-fill.svg"></a></li>
                <li><a class="icon-panier"><img src="assets/svg/carbon_shopping-cart-plus.svg"></a></li>

                @if(isLogged()){
                <li><a class="icon-user" routerLink=""><fa-icon [icon]="faUser"></fa-icon></a></li>
                }@else {
                <li><a class="icon-user" routerLink="/login"><fa-icon [icon]="faUserLargeSlash"></fa-icon></a></li>
                }
            </ul>
        </nav>
    </div>

    <div class="banner">
        <div class="container mx-auto">
            @if(!msg){
            <div class="nav-desktop-box-mangas-find flex flex-wrap justify-between bg-black h-auto w-auto">
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
            
            <!-- NAV DESKTOP -->
            <div class="nav-desktop__box-search" (scroll)="scrollFunction()">
            <nav class="py-3 flex justify-between nav-desktop">
                <ul class="nav-desktop-box-items flex flex-row py-1 nav__box">
                    <li><a routerLink="/"><img class="nav__box--logo" src="assets/img/manga-up.png" alt=""></a></li>
                    <li><a routerLink="/genres" class="flex flex-row nav__box--genres" href=""><fa-icon class="mr-1 faBook" [icon]="faBook"></fa-icon> Genres</a></li>
                    <li><a routerLink="/authors" class="flex flex-row nav__box--auteurs" href=""><fa-icon class="mr-1 faAddressCard" [icon]="faAddressCard"></fa-icon> Auteur</a></li>
                    <li><a routerLink="/categories" class="flex flex-row nav__box--categories" href=""><fa-icon class="mr-1 faTag" [icon]="faTag"></fa-icon>Catégories</a></li>
                </ul>
                <div class="mb-5">
                    @if(msg){
                        <div class="text-center">{{msg}}</div>
                    }
                </div>
                <div class="icon__box flex flex-row items-center">
                    @if(isRoleAdmin()){
                        <a routerLink="/admin" class="nav__box--admin"> Administrateur</a>
                    }

                    <div>
                        <a routerLink="/cart" class="icon-panier"><fa-icon [icon]="faCartShopping"></fa-icon></a>
                        <span>{{ nbArticles }}</span>
                    </div>

                    @if(isLogged()){
                    <div type="button" (click)="userProfile($event)" class="icon-user"><fa-icon [icon]="faUser"></fa-icon></div>
                        <div id="user-info" class="bg-white overflow-hidden shadow rounded-lg border">
                            <div class="px-4 py-5 sm:px-6">
                                <h3 class="text-lg leading-6 font-medium text-gray-900">
                                    Profil de l'utilisateur
                                </h3>
                                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                                    Il s'agit de vos informations personnel
                                </p>
                            </div>
                            <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                                <dl class="sm:divide-y sm:divide-gray-200">
                                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500">
                                            Nom complet 
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {{user?.firstname}} {{user?.lastname}}
                                        </dd>
                                    </div>
                                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500">
                                            Adresse email
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {{user?.email}}
                                        </dd>
                                    </div>
                                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500">
                                            Nom d'utilisateur
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {{user?.username}}
                                        </dd>
                                    </div>
                                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500">
                                            Adresse
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {{user?.address?.line1}}<br>
                                            {{user?.address?.postalCode}} {{user?.address?.city}}, {{user?.address?.country}}
                                        </dd>
                                    </div>
                                    <div class="py-3 grid gap-4 px-6 text-center">
                                        <a class="user-info-logout" routerLink="/login" (click)="logout()">Déconnexion</a>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    }@else {
                        <a class="icon-user" routerLink="/login"><fa-icon [icon]="faUserLargeSlash"></fa-icon></a>
                    }
                </div>
            </nav>


            <div class="search-div">
                <form (submit)="searchManga($event)">
                <div class="flex flex-row">
                    <input type="text" [(ngModel)]="manga" name="manga" placeholder="Search.." >
                    <button type="submit" class="ml-1 search-btn"><fa-icon [icon]="faSearch"></fa-icon></button>
                </div>
                </form>
            </div>
            </div>
            <ui-flash-message></ui-flash-message>
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
    <p class="text-center">Copyright © 2024 Manga’up<br>Contact, Mention legale - All rights reserved</p>
    </footer>
</div>
  `,
  styles: [`

    #panier-info{
        visibility: hidden;
        position:absolute;
        top: 4rem;
        right: 9.5rem;
    }

    .icon-panier{
        cursor:pointer;
    }

    .icon-user{
        cursor:pointer;
    }

    #global-page{
        position:relative;
        z-index:0;
    }

    #user-info{
        visibility: hidden;
        position:absolute;
        top: 4rem;
        right: 6.5rem;
    }

    .nav-desktop-box-mangas-find{
      position:absolute;
      margin: 6rem 10rem;
      z-index: 9999;
    }

    .nav-desktop__box-search{
        transition: 0.4s; /* Adds a transition effect when the padding is decreased */
        position: fixed; /* Sticky/fixed navbar */
        padding: 0 0 2rem 0;
        width: 100%;
        top: 0; /* At the top */
        z-index: 99;
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
    .nav__box{
        align-items: center;
        a, fa-icon{
            font-size: 1.5rem;
        }
    }
    .nav__box--logo{
        height: 2.5rem;
    }
    .nav__box--admin,
    .nav__box--genres,
    .nav__box--auteurs,
    .nav__box--categories{
        color: rgb(150, 150, 0);
        font-size: 2rem;
        font-weight: 900;
        -webkit-text-stroke: 1px blue;
        margin: 0 0.5rem;
    }
    .icon__box{
        gap: 1.5rem;
        a{
            font-size: 2rem;
        }
    }
    .icon-menu, .icon-user, .icon-panier, .faBook, .faAddressCard, .faTag{
        font-size: 2rem;
        color: #E7E08B;
        fill: none;
        stroke-width: 1.5rem;
        stroke: blue; 
    }

    @media (min-width: 1163px) {
      .footer-mobile {
        display: none;
      }
      .nav-mobile {
        display: none;
      }
      .nav-desktop {
        display: flex;
        margin: 0 5rem;
      }
      .footer-desktop {
        display: flex;
      }
      
      // faire les media pour le background
      .banner {
        position:relative;
        background-image: url("/assets/img/banner_mangas_mono.webp");
        color: #E7E08B;
        height: 593px;
        background-repeat: no-repeat;
        background-size: cover;
        overflow: hidden;
      }
      .search-div {
        width: 50%;
        overflow: hidden;
        margin: 0 auto;
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
    protected readonly faUserLargeSlash = faUserLargeSlash;
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
    user!: User|null;
    msgLogin: string="";
    _isLogged: Boolean=false;
    _isLogout: Boolean=false;
    nbArticles!:number;

    constructor(
        private searchMangaService: SearchMangaService,
        private authService: AuthService,
        private accountService: AccountService,
        private elementRef:ElementRef,
        private cartService: CartService
    ){}

    ngOnInit(){
        this.searchMangaService.currentSearch.subscribe(mangas=>{
            this.mangas=mangas;
            if(mangas.length===0 && this.isClick){
                this.msg="Le mangas n'a pas été trouvé";
                setTimeout(() => {
                this.msg="";
                }, 3000);
            }
        });

        this.cartService.currentNbArticles.subscribe( nbArticles => {
            this.nbArticles = nbArticles
        });
        
        this.nbArticles=this.cartService.getNbArticles();
    }
    
    @HostListener('window:scroll', ['$event'])
    scrollFunction() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            this.elementRef.nativeElement.querySelector(".nav-desktop__box-search").style.backgroundColor = "aliceblue";
        }else {
            this.elementRef.nativeElement.querySelector(".nav-desktop__box-search").style.backgroundColor = "transparent";
        }
    }

    isRoleAdmin(){
        this.user=this.accountService.getUser();
        
        let obj = this.user?.roles?.find(o => o.role === 'ADMIN');
        if(obj?.role === 'undefined'){
            return false;
        }else if(obj?.role === 'ADMIN'){
            return true;
        }

        return obj?.role === 'ADMIN' ? true : false;
    }

    closeMenu(event: Event) {
        event.stopPropagation();
        const userInfo=document.querySelector("#user-info") as HTMLElement;
        if(userInfo){
            userInfo.style.visibility="hidden"
        }
	}

    userProfile(event: Event){
        event.stopPropagation();
        const userInfo=this.elementRef.nativeElement.querySelector("#user-info");
        userInfo.style.visibility=userInfo.style.visibility==="visible" ? "hidden" : "visible";
        document.body.addEventListener('click', this.closeMenu)
    }

    isLogout(){
        return this.authService.isLogout();
    }

    isLogged(){
        return this.authService.isLogged();
    }

    logout(){
        console.log("isalreadylogout", JSON.parse(localStorage.getItem("isAlreadyLogout")!))
        if( ! JSON.parse(localStorage.getItem("isAlreadyLogout")!)){
            this.authService.logout();
        }
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

    log(obj: Object, msg: string=""){
        console.log(msg, obj);
    }


}

