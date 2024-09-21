import {Component, OnInit} from '@angular/core';
import {Author, AuthorDto, DataAuthor} from "../../../types";
import {AuthorService} from "../../../services/author.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {catchError, finalize, tap} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [
    FormsModule
  ],
  template: `

    <section class="admin-container">
      <h1>Information sur l'auteur: {{ data?.author?.firstname! }} </h1>

      <div class="div-form">
        <form class="form-admin"   #authorForm="ngForm"  (submit)="handleSubmit($event)" >

          <div class="form-contain" >
            <input
                id="firstname"
                type="text"
                [(ngModel)]="firstname"
                name="firstname"
                placeholder="Nom"
            >
          </div>
          <div class="form-contain">
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

    </section>



  `,
  styles:  [`

    input{
      color:black;
    }
    textarea{
      color:black;
    }


    .form-contain{
      input{
        width: 100%;
      }
    }

    .div-form .form-admin{
      width: 100%;
    }

  `]
})
export class AuthorAdminComponent implements OnInit {
  idOfUrl!:number; // id du genre récupéré à partir de l'url.
  data! : DataAuthor | null;
  firstname: string ="";
  lastname: string ="";
  description: string="";
  id!: number;
  img!: string;
  date! : Date;
  error: string = "";
  article!: Author;

  constructor(
      private authorService: AuthorService,
      private activatedRoute: ActivatedRoute,
      private router: Router
  ){
    //  this.currentPage=0;
  }

  ngOnInit(): void {
    this.idOfUrl=parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);

    this.authorService.getMangaAuthor(this.idOfUrl)

    this.authorService.currentDataAuthor.subscribe( dataAuthor =>{
      this.data = dataAuthor
      if (dataAuthor) {
        // Initialiser les champs du formulaire avec les données de l'auteur
        this.firstname = dataAuthor?.author?.firstname;
        this.lastname = dataAuthor.author.lastname;
        this.description = dataAuthor.author.description;
      }

    } )

  }

  handleSubmit(e: Event) {


    const updatedAuthor: AuthorDto = {
      id: this.idOfUrl,
      firstName: this.firstname,
      description: this.description,
      lastName: this.lastname,
      img: this.img,
      createdAt: this.date
    };

    this.authorService.updateAuthor(updatedAuthor)
        .pipe(
            tap(response => {
              // Gérez la réponse positive ici
              console.log('Author updated successfully', response);
              this.router.navigate(['/admin/authors']); // Redirigez vers la liste des auteurs
            }),
            catchError(error => {
              // Gérez l'erreur ici
              console.error('Error updating author', error);
              this.error = 'Erreur lors de la mise à jour de l\'auteur';
              return throwError(error); // Relancez l'erreur pour un traitement supplémentaire si nécessaire
            }),
            finalize(() => {
              // Actions finales à réaliser, qu'il y ait une erreur ou non
            })
        )
        .subscribe(); // Nécessaire pour déclencher l'exécution du pipeline
  }




}
