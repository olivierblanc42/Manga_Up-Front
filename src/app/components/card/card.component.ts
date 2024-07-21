import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { PictureService} from "../../services/picture.service";
import { MangaService} from "../../services/manga.service";
import { Manga} from "../../types";
import {Picture} from "../../types";
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [NgClass],
  template: `

  <div class="card"
  [ngClass]="{
    'card-manga':size === 'card-manga',
    
    'card-genre' :size  === 'card-genre',
    
}">
    <ng-content></ng-content>

  </div>



  `,
  styles: [`

  
            
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

  @Input() size: "desktop-manga" |  "card-genre" | "desktop-gender" | "card-manga" = "card-manga";
}