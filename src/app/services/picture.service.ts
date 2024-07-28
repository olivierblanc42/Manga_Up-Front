import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Picture } from '../types';

@Injectable({
  providedIn: 'root'
})
export class PictureService {
    url="/api/pictures";

    headers=new HttpHeaders()
        .set("content-type", "application/json")
        .set("Access-Control-Allow-Origin", '*');

    pictures=new BehaviorSubject<Picture[]>([]);
    currentPictures=this.pictures.asObservable();

    constructor(
        private http: HttpClient,
    ) { }

    /**
     * Récupère tout les images qui sont liés à un manga.
     * @param id :Id du manga
     */
    getPicturesByIdManga(id: string){
        this.http.get<Picture[]>(`${this.url}/${id}`, {
            headers: {'Access-Control-Allow-Origin': '*'}
         })
        .pipe()
        .toPromise()
        .then((r)=>{
            if(!r) return;
            this.pictures.next(r);
        })
    }
}

