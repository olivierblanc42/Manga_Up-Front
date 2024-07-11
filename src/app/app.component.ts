import { Component, Input } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBook, faSearch, faUser, faCartShopping, faShuffle } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule,FontAwesomeModule],
  template: `

 
    
<div class="container mx-auto ">
       <!-- nav mobile -->
   <nav class="flex   py-3 justify-evenly nav-mobile" >
   <ul class="flex flex-row items-center gap-x-8 ">
    <li><a routerLink="/"><img  src="assets/img/logo.png" alt=""></a></li>
    <li><a class="icon-menu"><img src="assets/svg/ri_bar-chart-horizontal-fill.svg" ></a></li>
    <li><a class="icon-user"><img src="assets/svg/bx_bx-user-check.svg" ></a></li>
    <li><a class="icon-panier"><img src="assets/svg/carbon_shopping-cart-plus.svg" ></a></li>
   </ul>
   </nav>
</div>

<div class="bannierre">
  <div class="container mx-auto  ">
    <!-- nav desktop -->
    <nav class="py-3 flex flex-row px-10 justify-around nav-desktop ">
      <a routerLink="/"><img  src="assets/img/logo.png" alt=""></a>

      <div class="mb-5  ">

        <div class="search-div">
          <form action="/action_page.php">
            <div class=" flex flex-row">
              <input type="text" placeholder="Search.." name="search">
              <button type="submit" class="ml-1 search-btn"><fa-icon [icon]="faSearch"></fa-icon></button>
            </div>
          </form>

        </div>

        <ul class="flex flex-row justify-around py-1">
          <li ><a class="flex flex-row" href=""><fa-icon class="mr-1"  [icon]="faBook"></fa-icon> Genres</a></li>
          <li><a class="flex flex-row" href=""><img class="mr-1"  src="assets/svg/new.svg" alt="">News</a></li>
          <li><a class="flex flex-row" href=""><fa-icon class="mr-1"  [icon]="faShuffle"></fa-icon>Découverte</a></li>

        </ul>
      </div>
      <div class="flex flex-row gap-10">
        <a class="icon-panier"><fa-icon [icon]="faCartShopping"></fa-icon></a>
        <a class="icon-user"><fa-icon [icon]="faUser"></fa-icon></a>
      </div>
    </nav>

  </div>
</div>



    <router-outlet/>


         <!-- Footer mobile -->

     <footer class="bg-dark-up py-3 text-white" >
       <div class=" flex flex-col md:flex-row md:px-10 justify-around items-center	" >

 
    <div class=" flex flex-col w-1/3  "   >
         <img class=" mx-auto w-40"  src="assets/img/logo.png" alt="">

        <div class="my-6 mx-auto	">
            <img class="" src="assets/img/stars.png" alt="">
            <p class="infos">Score<span> 4.1</span> | <span>1500</span> avis</p>
        </div>
     </div>

<div class=" flex flex-col md:flex-row w-1/3 justify-between"   >
 <div class="text-center my-6 md:text-start"   >
            <ul class="list" >
                <li><h4>Manga’up</h4></li>
                <li><a>Les conditions de vente</a></li>
                <li><a>Politique de confidentialité</a></li>
                <li><a>contact</a></li>
            </ul>
        </div>

        <div class="text-center md:text-start my-6"  >
            <ul class="list">
                <li><h4>Compte</h4></li>
                <li><a>Créer un compte</a></li>
                <li><a>Se connecter</a></li>
            </ul>
        </div>
</div>

<div  class=" flex flex-col md:flex-col w-1/3  ">
        <div class="flex flex-row mx-auto gap-4 my-6 ">
            <a href="https://discord.com/" target="_blank"><img src="assets/icon/discord_mobile.png" alt=""></a>
            <a href="https://x.com/home" target="_blank"><img src="assets/icon/x_mobile.png" alt=""></a>
            <a href="https://www.instagram.com/" target="_blank"><img src="assets/icon/insta_mobile.png" alt=""></a>
            <a href="https://www.facebook.com/" target="_blank"><img src="assets/icon/facebook_mobile.png" alt=""></a>
        </div>
             <img class="mx-auto " src="assets/img/android-btn.png" alt="">
</div>
       </div> 
 


        <img class="my-6 		 mx-auto   w-8/12 "  src="assets/img/line_desktop.png" alt="">

        <p class="text-center "  >Copyright © 2024 Manga’up
       <br>Contact, Mention legale - All rights reserved</p>

    </footer>

  `,
  styles: [`
    

 .nav-desktop{
    display:none;
  }
.footer-desktop{
      display:none;
}
     input{
      color:black;
     }
    .bg-dark-up{
        background-color: rgb(16, 16, 16,50%);
    }

   .list{
     line-height: 2rem;
    } 

    .list>li>h4{
        font-weight: bolder;
     }




@media (min-width: 1250px) { 

  .footer-mobile{
    display:none;
  }
  .nav-mobile{
   display:none;
  }
 .nav-desktop{
    display:flex;
  }
.footer-desktop{
    display:flex;
}

.bannierre{
 background-image: url("/assets/img/bannierre_mangas_mono.webp");
 color: #E7E08B;
  height: 593px;
}
.search-div{
    width:449px;
    overflow: hidden;
    
    input{
      width:95%;
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
    input:focus{
        outline:  #E7E08B;

    }
     button {
  
  cursor: pointer;
}
  }
  
  .search-btn{
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






`  
  ],
})
export class AppComponent {
  title = 'app';
  faBook = faBook;
  faShuffle = faShuffle;
  faCartShopping = faCartShopping;
  faUser = faUser;
  faSearch = faSearch;
}
