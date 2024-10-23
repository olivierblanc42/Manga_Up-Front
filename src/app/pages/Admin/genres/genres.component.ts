import {Component, OnInit} from '@angular/core';
import {GenreService} from "../../../services/genre.service";
import {Genres} from "../../../types";
import {RouterLink} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-genres',
    standalone: true,
    imports: [
        RouterLink,
        FormsModule,
        ReactiveFormsModule,
        NgClass
    ],
    template: `
        <h2>Genre des mangas</h2>
        <div class="flex flex-col gap-2 mt-4 admin-container">





            <div class="div-form">
                <form class="form-admin"     (submit)="handleSubmit($event)" >
                    <h2>Ajout d'un Genre</h2>
                    <div class="form-contain">
                        <input
                                id="Label"
                                type="text"
                                [(ngModel)]="label"
                                name="name"
                                placeholder="Label"
                                class="input-admin"
                        >
                    </div>
                    <div class="form-contain">

                        @if (error) {
                            <p class="text-red-500">{{error}}</p>
                        }

                    </div>
                    <div class="">
                        <button
                                type="submit"
                                class="bg-slate-600 text-white rounded px-4 py-2"
                        >Submit</button>
                    </div>
                </form>
            </div>



            <table  class="table-admin">
                <thead>
                <tr>
                    <th>Label</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    @for (genre of genres?.content; track genre.id) {
                        <tr>
                            <td>{{ genre.label  }}</td>

                            <td>
                                <a [routerLink]="'/admin/genre/' + genre.id">🔎</a>
                                <button (click)="handleRemove(genre.id)"   >🗑️</button>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>


        <div class="pagination">

            @for(page of pages; track page; let count=$index){
                @if(count===0){
                    <li>
                        <button
                                (click)="pagePrevious()"
                                [ngClass]="currentPage <= 0 ? 'grey-desactive-btn': 'blue-active-btn'"
                                class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >Previous</button>
                    </li>
                }
                <li>

                    <button (click)="pageGenres(page)"
                            class="flex items-center justify-center px-4 h-10 leading-tight text-black bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-yellow-100 dark:hover:text-gray-700"
                            [ngClass]="currentPage===page ? 'bg-yellow-100':'background-color-pagination-yellow'"
                    >
                        {{count+1}}
                    </button>
                </li>
                @if(count===lastPage-1){
                    <li>
                        <button
                                (click)="pageNext()"
                                [ngClass]="currentPage===lastPage-1 ? 'grey-desactive-btn': 'blue-active-btn'"
                                class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
                    </li>
                }
            }

        </div>



    `,
    styles:  [`
      .admin-container{
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        background-color: rgb(37,37,37,50%) ;
        border-radius: 10px;
        table{
          tbody{
            tr{
              // border: none;
            }
          }
        }
      }


      .div-form .form-admin .form-contain {
        gap: 0.5rem;
        width: 50%;
      }

    `]
})
export class GenresAdminComponent implements OnInit{

    constructor(
        private genreService: GenreService,

    ){
        this.currentPage=0;
    }

    genres!:Genres|null;
    pages!: number[]; // Nombre de page
    lastPage!: number;
    currentPage!: number;
    base64G:string="data:image/webp;base64,";
    label:string ="";
    error:string="";
    currentTime = new Date();

    ngOnInit(): void {
        this.genreService.getGenres()
        this.genreService.currentGenrePagination.subscribe(genres =>{
            this.genres = genres;
            this.pages = this.convertNumberToArray(this.genres?.totalPages!)
            this.lastPage =this.genres?.totalPages!;
        })

    }

    /**
     * Crée un tableau de la taille spécifiér en paramètre, contenant des valeurs allant de 0 à n+1.
     * @param size La taille du tableau à créer.
     * @returns {Array} Tableau contenant une suite de 0 à n+1.
     */
    convertNumberToArray(size: number){
        const array=new Array<number>(size);
        for (let i = 0; i < array.length; i++) {
            array[i]=i;
        }
        return array;
    }

    /**
     * Récupère la page des commentaires souhaité.
     * @param {string} page
     */
    pageGenres(page: number){
        console.log("dans pageGenres page : ", page);
        this.currentPage=page;
        console.log("dans pageGenres currentPage : ", this.currentPage);
        this.genreService.getGenres(page);
    }


    pagePrevious(){
        console.log("dans pagePrevious currentPage : ", this.currentPage);
        if(this.currentPage > 0){
            this.pageGenres(this.currentPage-1);
        }
    }
    pageNext(){
        console.log("dans pageNext currentPage : ", this.currentPage);
        if(this.currentPage < this.lastPage-1){
            this.pageGenres(this.currentPage+1);
        }
    }

    handleSubmit(e: SubmitEvent) {
        // Vérifie si le champ 'label' est vide
        if (!this.label) {
            // Définit un message d'erreur si 'label' est vide
            this.error = "label is required";
            return;
        }

        // Appelle le service pour ajouter un nouvel genre avec les données fournies
        this.genreService.addGenre({
            label: this.label,
            createdDate:this.currentTime
        });

        this.reloadPage()

        this.label ="";
        this.error="";
    }
    // Recharge la page pour refléter les nouvelles données
    reloadPage() {
        window.location.reload()
    }

    handleRemove(id: number){
        if(confirm("Are you sure to delete" )){
            this.genreService.removeGenre(id);
        }
    }

}
