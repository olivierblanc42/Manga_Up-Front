import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { PictureService } from './../../services/picture.service';
import { MangaService } from './../../services/manga.service';
import { Manga, Picture } from '../../types';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [NgClass],
  template: `
<div class=""
>
  <div class="card"
  [ngClass]="{
    'card-manga':size === 'card-manga',
    
    'card-genre' :size  === 'card-genre',
    
}">
    <img src="https://images.pexels.com/photos/16645682/pexels-photo-16645682/free-photo-of-close-up-of-green-leaves.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load" alt="" />

  </div>
  <p>test</p>
</div>

  `,
  styles: [`

          .card{
            img{
            border-radius: 10px;
            height:100%;
            width:100%;
            }
          }
            
         .card-manga {
           width: 167px;
           height: 300px;
          }
          .card-manga-desktop {
           width: 265px;
           height: 431px;
          }
     
         .card-genre {
           width: 240px;
           height: 146px;
          }

          .card-gender-desktop {
           width: 380px;
           height: 268px;
          }


    `]
})
export class CardComponent {

  @Input() size: "desktop-manga" | "card-manga" | "card-genre" | "desktop-gender" | "card-manga" = "card-manga";
  @Input() type: "primary" | "secondary" | "danger" | "warning" | "success" = "primary";
}