import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Comment } from '../types';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    url="/api/comments";

    headers=new HttpHeaders()
        .set("content-type", "application/json")
        .set("Access-Control-Allow-Origin", '*');

    comments=new BehaviorSubject<Comment[]>([]);
    currentComments=this.comments.asObservable();


    constructor(
        private http: HttpClient
    ) { }

    /**
     * Récupère tout les commentaires qui sont liés à un manga.
     * @param id Id du manga.
     */
    getCommentsByIdManga(id: string){
        this.http.get<Comment[]>(`${this.url}/${id}`, {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
        .pipe()
        .toPromise()
        .then((r)=>{
            if(!r)return;
            this.comments.next(r);
        })
    }
}
