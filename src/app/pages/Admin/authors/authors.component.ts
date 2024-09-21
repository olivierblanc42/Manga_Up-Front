import {Component, OnInit} from '@angular/core';
import {Author, Authors, DataAuthor,AuthorDto} from "../../../types";
import {AuthorService} from "../../../services/author.service";
import {ActivatedRoute, Router, RouterLink, RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {DatePipe, NgClass} from "@angular/common";

@Component({
    selector: 'app-authors',
    standalone: true,
    imports: [
        RouterLink,
        FormsModule,
        RouterModule,
        NgClass,
        DatePipe
    ],
    template: `

        <h2 >Auteurs</h2>
        <div class="div-form">
            <form class="form-admin"   #authorForm="ngForm"  (submit)="handleSubmit($event)" >
                <h2>Ajout d'un auteur</h2>
                <div class="form-contain" >
                    <input
                            id="firstname"
                            type="text"
                            [(ngModel)]="firstname"
                            name="firstname"
                            placeholder="Nom"

                    >
                    <input
                            id="lastname"
                            type="text"
                            [(ngModel)]="lastname"
                            name="lastname"
                            placeholder="Prénom"
                    >
                </div>

                <div class="form-contain text_area">
          <textarea
                  id="description"
                  type="text"
                  [(ngModel)]="description"
                  name="description"
                  placeholder="Description "

          >
          </textarea>
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

        <div class="flex flex-col gap-2 mt-4 admin-container">

            <table>
                <thead>
                <tr>
                    <th>Author</th>
                    <th>Description</th>
                    <th>Date de création</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    @for (author of authors?.content; track author.id) {
                        <tr class="border">
                            <td>{{ author.lastname + " " + author.firstname }}</td>
                            <td>{{ author.description }}</td>
                            <td>{{author.createdAt |  date: 'dd-MM-yyyy'}}</td>
                            <td>
                                <a [routerLink]="'/admin/author/' + author.id">🔎</a>
                                <button (click)="handleRemove(author.id)">🗑️</button>
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

                    <button (click)="pageAuthor(page)"
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


    `]
})
export class AuthorsAdminComponent implements OnInit {
    constructor(
        private authorService :AuthorService,
        private router: Router  )
    {
        this.currentPage=0;
    }
    firstname: string ="";
    lastname: string ="";
    description: string="";
    authors!: Authors|null;

    pages!: number[]; // Nombre de pages
    lastPage!: number;
    currentPage!: number;


    base64G:string="data:image/webp;base64,";
    error: string = "";

    ngOnInit(): void {
        this.authorService.getAuthors()


        this.authorService.currentAuthors.subscribe(authors =>{
            this.authors = authors
            this.pages = this.convertNumberToArray(this.authors?.totalPages!)
            this.lastPage =this.authors?.totalPages!;
        })
    }



    /**
     * handleSubmit est utilisé ici pour envoyé de nouvel donné en base
     *
     * */
    handleSubmit(e: SubmitEvent) {
        // Vérifie si le champ 'firstname' est vide
        if (!this.firstname) {
            // Définit un message d'erreur si 'firstname' est vide
            this.error = "Firstname is required";
            return;
        }
        // Vérifie si le champ 'lastname' est vide
        if (!this.lastname) {
            // Définit un message d'erreur si 'lastname' est vide
            this.error = "Lastname is required";
            return;
        }
        // Vérifie si le champ 'description' est vide
        if (!this.description) {
            // Définit un message d'erreur si 'description' est vide
            this.error = "description is required";
            return;
        }
        // Appelle le service pour ajouter un nouvel auteur avec les données fournies

        this.authorService.addAuthor({
            firstName: this.firstname,
            description: this.description,
            lastName: this.lastname,
            createdAt : new Date()
        });

        //Voir comment recharger la page ou les donné



        this.lastname ="";
        this.description="";
        this.error="";
        this.firstname="";

    }

    /**
     * handleRemove est utilisé ici supprimé des données en base
     *
     * */
    handleRemove(id: number){
        if(confirm("Êtes-vous sur de vouloirs supprimés l'auteur ?" )) {
            this.authorService.removeAuthor(id)


        }
    }




    reloadPage() {
        this.router.navigateByUrl('/admin/authors', { skipLocationChange: true }).then(() => {
            this.router.navigate([this.router.url]);
        });
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
    pageAuthor(page: number){
        console.log("dans pageComments page : ", page);
        this.currentPage=page;
        console.log("dans pageComments currentPage : ", this.currentPage);
        this.authorService.getAuthors(page);
    }


    pagePrevious(){
        console.log("dans pagePrevious currentPage : ", this.currentPage);
        if(this.currentPage > 0){
            this.pageAuthor(this.currentPage-1);
        }
    }
    pageNext(){
        console.log("dans pageNext currentPage : ", this.currentPage);
        if(this.currentPage < this.lastPage-1){
            this.pageAuthor(this.currentPage+1);
        }
    }




}
