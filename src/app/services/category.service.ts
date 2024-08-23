import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Category, Categories, Genre, Genres, DataGenre, DataCategory, DataAuthor, Author,CategoryDto} from '../types';
import { firstValueFrom } from 'rxjs';



@Injectable({
    providedIn: 'root'
})

export class CategoryService {
    url="/api/categories";
    urlMangaInCategory = "/api/categories/category"
    urlDto ="/api/categories/dto";
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

    constructor(
        private http: HttpClient
    ) { }
    categories=new BehaviorSubject<Category[]>([]);
    category=new BehaviorSubject<Category | null>(null);

    categoryDto = new BehaviorSubject<CategoryDto[]>([]);
    currentCategoryDto = this.categoryDto.asObservable();


    currentCategories = this.categories.asObservable();
    currentCategory =this.category.asObservable();

    // utilisation de la pagination
    genreCategoriesPagination = new  BehaviorSubject<Categories | null>(null);
    currentCategoryPagination = this.genreCategoriesPagination.asObservable()
    //pagination manga dans genre
    dataCategory = new  BehaviorSubject<DataCategory | null>(null);
    currentDataCategory = this.dataCategory.asObservable()










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
     * Récupère une catégorie et ses mangas associés.
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


    addcategory(category:  Omit<Category,"id">){
        this.http.post<Category>(`${this.url}`,category, {
            headers: this.options.headers
        })
            .pipe()
            .toPromise()
            .then((r)=>{
                if(!r) return;
                console.log(r)
                this.category.next(r);
            })
    }

        addCategoryTest(category:  Omit<Category,"id">){
        firstValueFrom(this.http.post<Category>(this.url,category,{
                headers: this.options.headers
            }))
            .then((r)=>{
                if(!r) return;
                console.log(r)
                this.category.next(r);
            })
        }


        removeCategory(id: number){
          firstValueFrom(this.http.delete<void>(`${this.url}/${id}`, {
                  headers: this.options.headers
              })
          )    .then(() => {
              console.log(`Category with ID ${id} has been deleted.`);

          })
              .catch((error) => {
                  console.error('Error deleting category:', error);
              });

        }




        getCategoryDto(){
           this.http.get<CategoryDto[]>(this.urlDto, {
               headers: this.options.headers
           })
               .pipe()
               .toPromise()
               .then((r)=>{
                   if(!r) return;
                   console.log(r)
                   this.categoryDto.next(r);
               })
        }


}