import { NgClass } from '@angular/common';
import { MangaService } from '../../services/manga.service';
import { CartService } from './../../services/cart.service';
import { BasketLine, Manga } from './../../types.d';
import { Component, ElementRef } from '@angular/core';
import { PicturesPipe } from '../../pipes/pictures.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule, NgClass, PicturesPipe],
template: `
    <section id="panier-info" class="bg-white overflow-hidden shadow rounded-lg border">
        <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">

            <h2 class="title font-manrope font-bold text-2xl leading-10 mb-8 text-center text-black uppercase">Votre panier :
            </h2>
            <div class="hidden lg:grid grid-cols-2 py-6 uppercase">
                <div class="font-normal text-lg leading-8 text-gray-500">Désignation</div>
                <p class="font-normal text-lg leading-8 text-gray-500 flex items-center justify-between">
                    <span class="w-full max-w-[200px] text-center pl-20">Prix</span>
                    <span class="w-full max-w-[260px] text-center">Quantité</span>
                    <span class="w-full max-w-[260px] text-center">Sous-total</span>
                </p>
            </div>

            @for (basketLine of this.basketLines; track basketLine.id_manga) {
            <div class="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
                <div
                    class="article-info__box flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                    <div><img src="{{base64+ (basketLine.manga | pictures)}}" alt="{{basketLine.manga | pictures: false}}" class="article-info__box--img rounded-xl object-cover"></div>
                    <div class="article-info__box--txt pro-data w-full max-w-sm ">
                        <h6 class="font-semibold text-lg leading-8 text-black max-[550px]:text-center">{{basketLine.manga?.title}}</h6>
                        <h6 class="font-medium text-lg leading-8 text-indigo-600 max-[550px]:text-center uppercase" [ngClass]="isStock(basketLine.manga) ? 'article-info__box--stock-green' : 'article-info__box--stock-red'"></h6>
                    </div>
                </div>
                <div
                    class="quantity__box flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                    <div class="quantity__box--price font-manrope font-bold text-lg text-black w-full text-center">
                            @if(basketLine.manga?.discountPercentage){
                                <p class="quantity__box--discountPercentage">-{{discountPercentage(basketLine.manga!)}}%</p>
                                <p class="quantity__box--discountPercentage-text">Offre de réduction</p>
                                <p class="d-flex inline font-black"><span class="font-black">&emsp;&emsp;{{ priceUnity(basketLine.manga?.price, basketLine.manga?.discountPercentage) }}</span>€<sup class="-top-1">{{ priceDecimal(basketLine.manga?.price, basketLine.manga?.discountPercentage) }}</sup></p>                            
                            }
                            <p class="d-flex inline" [ngClass]="basketLine.manga?.discountPercentage ? 'content-manga__discount' : 'font-black' "><span class="font-normal">{{ priceUnity(basketLine.manga?.price, null) }}</span>€<sup class="-top-1">{{ priceDecimal(basketLine.manga?.price, null) }}</sup></p>
                    </div>
                    <div class="flex items-center w-full mx-auto justify-center">
                        <button
                            (click)="removeArticle(basketLine)"
                            class="quantity__box--btn-minus group rounded-l-full border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
                            <svg class="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                                fill="none">
                                <path d="M16.5 11H5.5" stroke="" stroke-width="1.6" stroke-linecap="round" />
                                <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                    stroke-linecap="round" />
                                <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                    stroke-linecap="round" />
                            </svg>
                        </button>
                        <input type="text"
                            class="quantity__box--qty border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg placeholder:text-gray-900 text-center bg-transparent"
                            name="quantity"
                            value="{{basketLine.quantity}}"
                            placeholder=>
                        <button
                            (click)="addArticle(basketLine)"
                            class="quantity__box--btn-more group rounded-r-full border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
                            <svg class="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                                fill="none">
                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-width="1.6"
                                    stroke-linecap="round" />
                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                    stroke-linecap="round" />
                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                    stroke-linecap="round" />
                            </svg>
                        </button>
                    </div>
                    <div class="font-manrope font-bold text-lg leading-9 text-black w-full max-w-[176px] text-center">
                        <p class="d-flex inline"><span class="font-normal">{{ priceUnity(subTotal(basketLine.manga, basketLine.quantity), null) }}</span>€<sup class="-top-1">{{ priceDecimal(subTotal(basketLine.manga, basketLine.quantity), null) }}</sup></p>
                    </div>
                </div>
            </div>
            }
            <hr>
            <div class="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
                <div class="flex items-center justify-end w-full py-6 pr-8">
                    <p class="font-manrope font-medium text-lg leading-9 text-gray-900 uppercase mr-6">Total ttc :</p>
                    <h6 class="font-manrope font-medium text-lg leading-9 text-indigo-500">
                        <p class="d-flex inline"><span class="font-normal">{{ priceUnity(total(), null) }}</span>€<sup class="-top-1">{{ priceDecimal(total(), null) }}</sup></p>
                    </h6>
                </div>
            </div>
            <div class="btn__box flex items-center flex-col sm:flex-row justify-center gap-3 mt-8 mb-8">
                <a
                    routerLink="/payment"
                    class="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700">Continue
                    to Payment
                    <svg class="ml-2" xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22"
                        fill="none">
                        <path d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998" stroke="white" stroke-width="1.6"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </a>
            </div>
        </div>
    </section>
    `,
    styles: [`

        .article-info__box--txt{
            padding-bottom: 7rem;
        }

        .article-info__box--img{
            height: 11rem;
            min-width: 8rem;
        }

        .article-info__box--stock-green:before{
            content: "En stock";
        }

        .article-info__box--stock-green{
            color: green;
        }

        .article-info__box--stock-red:before{
            content: "En rupture de stock";
        }

        .article-info__box--stock-red{
            color: red;
        }

        .btn__box{
            margin-left: 2rem;
        }

        .quantity__box--price{
            display: flex;
            align-items: end;
            flex-direction: column;
            padding-left: 0rem;
            width: 26rem;
        }

        .quantity__box--discountPercentage-text{
            font-size: 0.75rem;
            color: red;
            font-weight: 700;
        }

        .quantity__box--discountPercentage{
            background-color: rgb(204, 0, 0);
            margin: 0 0rem 0 3rem;
            border-radius: 0.25rem;
            font-size: 0.85rem;
            padding: 0 1rem;
        }

        .content-manga__discount{
            text-decoration-line: line-through;
            color: rgb(113 113 122);
            font-size: 0.85rem;
        }

        .quantity__box--btn-minus{
            height: 2rem;
            width: 2rem;
        }

        .quantity__box--btn-more{
            height: 2rem;
            width: 2rem;
        }

        .quantity__box--qty{
            width: 3rem;
            height: 2rem;
        }
    `]
})

export class CartComponent {

    basketLines!: BasketLine[];
    mangas!: Manga[];
    base64:string="data:image/webp;base64,";

    constructor(
        private elementRef:ElementRef,
        private cartService: CartService,
        private mangaService: MangaService,
    ){}


    ngOnInit(){
        this.basketLines= this.cartService.getBasketLines();
        this.mangaService.getAllManga();
        this.mangaService.currentMangas.subscribe(mangas =>{
            this.mangas = mangas;
            this.cartService.getBasketLines().id_Manga
            this.mangas.map(manga => {
                this.basketLines.map((elem: BasketLine, i)=> {
                    if(elem.id_manga === manga.id){
                        this.basketLines[i]['manga']=manga;
                    }
                })
            })
        })
    }

    removeArticle(basketLine: BasketLine){
        let nbArticles=this.cartService.getNbArticles()-1;
        basketLine.quantity-=1;
        if(basketLine.quantity < 1){
            this.basketLines=this.basketLines.filter(elem => elem.id_manga !== basketLine.id_manga)
            this.cartService.setBasketLines(this.basketLines);
        }
        this.cartService.setBasketLines(this.basketLines);
        this.cartService.setNbArticles(nbArticles);
    }

    addArticle(basketLine: BasketLine){
        let nbArticles=this.cartService.getNbArticles()+1;
        basketLine.quantity+=1;
        this.cartService.setBasketLines(this.basketLines);
        this.cartService.setNbArticles(nbArticles);
    }

    total(){
        let total=0;
        this.basketLines.map(elem => {
            total+=this.subTotal(elem.manga, elem.quantity)
        });
        
        return Math.round(total*100)/100;
    }

    subTotal(manga: Manga|null|undefined, quantity: number){
        let price=manga?.price;
        let percentage=manga?.discountPercentage;
        
        if(percentage){
            price=price!-price!*percentage!
            price=Math.round(price*100)/100;
            return price*quantity;
        }

        return price!*quantity;
    }

    discountPercentage(manga: Manga|null|undefined){
        let number;
        let isInteger;
        if(manga){
            number=manga.discountPercentage*100;
            isInteger=Number.isInteger(manga.discountPercentage*100);
        }
        if( ! isInteger && number){
            let nb=parseInt(number.toFixed(2));
            if((nb % 1)*10 === 0 && (nb % 1)*100 === 0){
                return Number(number.toFixed(2));
            }
            return number.toFixed(2);
        }
        return number;
    }

    isStock(manga: Manga|null){
        if(manga?.stockQuantity){
            return true;
        }
        return false;
    }

    priceUnity(price: number|undefined, discountPercentage: number|null|undefined ){
        if(discountPercentage && price){
            price=price-price*discountPercentage;
        }
        let _price=JSON.stringify(price);
        return _price.split(".").shift();
    }

    priceDecimal(price: number|undefined, discountPercentage: number|null|undefined){
        if(discountPercentage && price){
            price=price-price*discountPercentage;
        }
        let _price='';
        if(price){
            _price=(Math.round(price * 100) / 100).toFixed(2)
        }
        return _price.split(".").pop()
    }

    closePanierInfo(event: Event) {
        event.stopPropagation();
        console.log('panierInfo closePanierInfo')
        const panierInfo=document.querySelector("#panier-info") as HTMLElement;
        if(panierInfo){
            console.log('salut');
            panierInfo.style.visibility="hidden"
        }
	}

    panierInfo(event: Event){
        console.log("panierInfo")
        event.stopPropagation();
        const panierInfo=this.elementRef.nativeElement.querySelector("#panier-info");
        console.log("panierInfo :", panierInfo)
        panierInfo.style.visibility=panierInfo.style.visibility==="visible" ? "hidden" : "visible";
        document.body.addEventListener('click', this.closePanierInfo)
    }
}
