import {AuthorDto, Category, DataManga, Genre, Manga, MangaDto, Mangas, UpdateMangaDto} from './../types.d';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, firstValueFrom, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MangaService {
    url="/api/mangas";
    urlLike=`${this.url}/like`;
    urlAction="/api/mangas/manga";
    urlNineManga = "/api/mangas/nine";
    urlOneManga = "/api/mangas/oderOne";
    urlOrderDate  = "/api/mangas/oderDate" ;
    /**
     * Ajoute des options dans le header et dans le body
     */
    options = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
            "Accept":"application/json",
            "Access-Control-Allow-Methods":"GET,POST,PUT,DELETE",
            // "Access-Control-Allow-Origin": '*'

        }),
        body: {
            id: '',
        },
    };

    headers=new HttpHeaders()
        .set("content-type", "application/json")
        .set("Access-Control-Allow-Origin", '*');

    // Récupère la requête sql de neuf mangas.
    nineMangas =new BehaviorSubject<Manga[]>([]);
    currentTenMangas = this.nineMangas.asObservable()
    //   Récupère la requête de neuf mangas par ordre de creation du plus recent au plus ancien.
    orderDateManga =new BehaviorSubject<Manga[]>([]);
    currentOrderDateManga = this.orderDateManga.asObservable();
    // Récupère un seul Manga
    oneManga =  new BehaviorSubject<Manga | null>(null);
    currentMangaOne=this.oneManga.asObservable();

    //pageComments=new BehaviorSubject<Comment[]>([]);
    
    // Accept tous les mangas.
    mangas=new BehaviorSubject<Manga[]>([]);
    currentMangas=this.mangas.asObservable();
    
    manga=new BehaviorSubject<Manga | null>(null);
    currentManga=this.manga.asObservable();
    
    dataManga=new BehaviorSubject<DataManga | null>(null);
    currentDataManga=this.dataManga.asObservable();
    
    isFavorite=new BehaviorSubject<boolean | null>(null);
    currentIsFavorite=this.isFavorite.asObservable();
    //currentPageComments=this.pageComments.asObservable();

    // Accpet les mangas avec une pagination
    mangaPagination  = new BehaviorSubject<Mangas | null>(null);
    currentMangaPagination = this.mangaPagination.asObservable()
    // Dto
    mangaDto = new BehaviorSubject<MangaDto[]>([])



    constructor(
        private http: HttpClient,
    ) {

    }

    /**
     * recuprere   tout les mangas
     *
     */
    getAllManga( page: number=0, notPagination: boolean=false){
        this.http.get<Manga[]>(`${this.url}/all`, {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
        .pipe()
        .toPromise()
        .then((r)=>{
            if(!r) return;
            this.mangas.next(r);
        })
    }

    /**
     * recuprere tout les mangas avec pagination
     *
     */
    getMangas( page: number=0){
        this.http.get<Mangas>(`${this.url}?page=${page}`, {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
        .pipe()
        .toPromise()
        .then((r)=>{
            if(!r) return;

            this.mangaPagination.next(r);
        })
    }




    /**
     * recuprere   un seul Manga
     *
     */
    getOneManga(){
        this.http.get<Manga>(this.urlOneManga, {
            headers: {'Access-Control-Allow-Origin': '*'}
        })
            .pipe()
            .toPromise()
            .then((r)=>{
                if(!r) return;
                this.oneManga.next(r);
            })
    }

    /**
     * Récupère 9 mangas
     *
     */
    getTenManga(){
        this.http.get<Manga[]>(this.urlOrderDate)
            .pipe()
            .toPromise()
            .then((r) => {
                if (!r) return;
                console.log(r)
                this.orderDateManga.next(r);
            })

    }


    /**
     * Récupère 9 mangas par date
     *
     */
    getOrderDateManga(){
        this.http.get<Manga[]>(this.urlNineManga)
            .pipe()
            .toPromise()
            .then((r) => {
                if (!r) return;
                //console.log(r)
                this.nineMangas.next(r);
            })
    }

    /**
     * Récupère un manga.
     * @param id
     */
    getManga(id: number, page: number=0){
        this.http.get<DataManga>(`${this.url}/${id}?page=${page}`, {
            headers: this.options.headers
        })
            .pipe()
            .toPromise()
            .then((r)=>{
                if(!r) return;
                //console.log("getManga r :", r)
                this.dataManga.next(r);
            })
    }

    /**
     * Ajoute le manga en favoris pour l'utilisateur.
     * @param idManga
     * @param idUser
     */
    addUserInFavorite(idManga: number, idUser: number | undefined){
        this.options.body.id=String(idUser);
        this.http.post<boolean>(`${this.url}/${idManga}`, this.options.body, this.options)
            .subscribe((r) => {
                this.isFavorite.next(true);
            });
    }

    /**
     * Supprime le manga en favoris pour l'utilisateur.
     * @param idManga
     * @param idUser
     */
    deleteUserAsFavorite(idManga: number, idUser: number | undefined){
        this.options.body.id=String(idUser);
        this.http.delete<boolean>(`${this.url}/${idManga}`, this.options)
            .subscribe((r) => {
                this.isFavorite.next(false);
            })
    }

    /**
     * Ajoute un manga.
     *
     *
     */
    addMangaTest(mangaDto: Omit<MangaDto, "img"| "id"  >) {
        console.log('Adding manga:', mangaDto); // Vérifiez les données envoyées ici
        this.http.post<MangaDto>(`${this.urlAction}`, mangaDto, {
            headers: this.options.headers
        }).subscribe({
            next: (r) => {
                console.log('manga added successfully:', r);
                this.mangaDto.next([...this.mangaDto.getValue(), r]);
            },
            error: (err) => {
                console.error('Error adding manga:', err);
            }
        });
    }




    removeManga(id: number){
        firstValueFrom(this.http.delete<void>(`${this.urlAction}/${id}`, {
                headers: this.options.headers
            })
        )    .then(() => {
            console.log(`Category with ID ${id} has been deleted.`);

        })
            .catch((error) => {
                console.error('Error deleting category:', error);
            });

    }

    updateManga(mangaDto: UpdateMangaDto): Observable<UpdateMangaDto> {
        const url = `${this.urlAction}/${mangaDto.id}`;
        return this.http.put<MangaDto>(url, mangaDto);
    }


}