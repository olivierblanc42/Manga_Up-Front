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
        <div 
            class="card mb-6 text-center"
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
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        border-radius: 15px;
        &:hover {
          transform: scale(1.1); 
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); 
        }
      
      }

     
        
        .card-genre {
          width: 310px;
          height: 268px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 15px;
          &:hover {
            transform: scale(1.1);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          }
        }
    `]
})
export class CardComponent {
  @Input() size: "card-genre" | "card-manga" = "card-manga";
}