import { Pipe, PipeTransform } from '@angular/core';
import { Manga } from '../types';

@Pipe({
  name: 'pictures',
  standalone: true
})

export class PicturesPipe implements PipeTransform {

    transform(manga: Manga, searcheImg: boolean=true): String {
        if(!manga || !manga.pictures){
            return '';
        }
        let img="";
        let title="";
        for (const picture of manga.pictures) {
            if(picture.isPoster) {
                if(searcheImg){
                    img=picture.img;
                }else{
                    title=picture.title
                }
                break;
            }
        }
        return img ? img : title;
    }

}
