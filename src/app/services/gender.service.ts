import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, firstValueFrom, Observable} from 'rxjs';
import {Category, DataManga, Gender, GenderDto, Genders, Genre} from "../types";

@Injectable({
    providedIn: 'root'
})

export class GenderService{
    url="http://localhost:8080/api/genders";
    urlDto="http://localhost:8080/api/genders/dto";
    urlPagination ="http://localhost:8080/api/genders/pagination"
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
    gender = new BehaviorSubject<Gender | null>(null);
    oneCurrentGender = this.gender.asObservable();

    genders = new BehaviorSubject<Gender[]>([]);
    currentGender = this.genders.asObservable()


    gendersPaginations = new BehaviorSubject<Genders | null>( null);
    currentGendersPaginations= this.gendersPaginations.asObservable();

    gendersDto = new BehaviorSubject<GenderDto[]>([])
    currentGenderDto = this.gendersDto.asObservable();

    constructor(
        private http: HttpClient
    ) { }


    getAllGendersPagination(page: number=0){
        firstValueFrom(this.http.get<Genders>(`${this.urlPagination}?page=${page}`,
            {  headers: this.options.headers}))
            .then((r)=>{
                if(!r) return;
                console.log(r)
                this.gendersPaginations.next(r);
            })
    }


    /**
     * Récupère les Genres des utilisateurs
     *
     */
    getGenders(){
        this.http.get<Gender[]>(this.url)
        .pipe()
        .toPromise()
        .then((r) =>{
            if(!r) return;
            console.log(r)
            this.genders.next(r);
        })
    }



    getGender(id: number | null){
        this.http.get<Gender>(`${this.url}/${id}`,{headers: this.options.headers})
            .pipe()
            .toPromise()
            .then(r =>{
                if(!r ) return;
                console.log(r)
                this.gender.next(r);
            })
    }

    addGender(gender: Omit<Gender,"id">){
        firstValueFrom(this.http.post<Gender>(this.url,gender,{
            headers: this.options.headers
        }))
            .then((r)=>{
                if(!r) return;
                console.log(r)
                this.gender.next(r)
            })
    }


    // avoir si c'est mieux de passé comme ça ou de faire comme le prof sur le projet angular
    updateGender(genderDto: GenderDto): Observable<GenderDto> {
        return this.http.put<GenderDto>(`${this.urlDto}/${genderDto.id}`, genderDto);
    }


    getGenderDto(){
        firstValueFrom(this.http.get<GenderDto[]>(this.urlDto))
            .then((r)=>{
                if(!r) return;
                console.log(r)
                this.gendersDto.next(r)
            })
    }

    removeGenderUser(id: string){
        firstValueFrom(this.http.delete<void>(`${this.urlDto}/${id}`, {
                headers: this.options.headers
            })
        )    .then(() => {
                console.log(`Gender with ID ${id} has been deleted.`);

        })
            .catch((error) => {
                console.error('Error deleting category:', error);
            });

    }
}