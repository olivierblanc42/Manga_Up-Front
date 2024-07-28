import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Category, Categories,Genre, Genres, DataGenre,DataCategory} from '../types';



@Injectable({
    providedIn: 'root'
})

export class CategoryService {
    url="/api/categories";
    urlMangaInCategory = "/api/categories/category"
    /**
     * Ajoute des options dans le header et dans le body
     */
    options = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": '*'
        }),
        body: {
            id: '',
        },
    };


    categories=new BehaviorSubject<Category[]>([]);
    category=new BehaviorSubject<Category | null>(null);



    currentCategories = this.categories.asObservable();
    currentCategory =this.category.asObservable();

    // utilisation de la pagination
    genreCategoriesPagination = new  BehaviorSubject<Categories | null>(null);
    currentCategoryPagination = this.genreCategoriesPagination.asObservable()
    //pagination manga dans genre
    dataCategory = new  BehaviorSubject<DataCategory | null>(null);
    currentDataCategory = this.dataCategory.asObservable()
    constructor(
        private http: HttpClient
    ) { }









    /**
     * Récupère les categories pour la pagination
     *
     */

    getCategories(page :number=0){
        this.http.get<Categories>(`${this.url}?page=${page}`, {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
            .pipe()
            .toPromise()
            .then((r)=>{
                if(!r) return;
                console.log(r)
                this.genreCategoriesPagination.next(r);
            })
    }



    /**
     * Récupère une catégorie et ses manga associer.
     * @param id
     */
    getMangaCategory(id: number, page: number=0){
        this.http.get<DataCategory>(`${this.urlMangaInCategory}/${id}?page=${page}`, {
            headers: this.options.headers
        })
            .pipe()
            .toPromise()
            .then((r)=>{
                if(!r) return;
                console.log(r)
                this.dataCategory.next(r);
            })
    }


}