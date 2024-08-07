import {Component, OnInit} from '@angular/core';
import {Author, DataAuthor} from "../../../types";
import {AuthorService} from "../../../services/author.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [
    FormsModule
  ],
  template: `

    <section class="user">
      <h1>Information sur  {{ data?.author?.firstname! }} </h1>


      <div>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <div>
          <p></p>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>

          </ul>

        </div>
      </div>
    </section>
    
    <form #authorForm="ngForm"  (submit)="handleSubmit($event)" >
      <div class="flex flex-col gap-1">
        <label class="text-sm" for="lastname">lastname </label>
        <input
            id="lastname"
            type="text"
            [(ngModel)]="lastname"
            name="lastname"
            
        >
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-sm" for="firstname">firstname </label>

        <input
            id="firstname"
            type="text"
            [(ngModel)]="firstname"
            name="firstname"
        >
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-sm" for="description">Déscription </label>

        <textarea
            id="description"
            type="text"
            [(ngModel)]="description"
            name="description">
        
          </textarea>
      
        <div class="flex justify-center">
          <button
              type="submit"
              class="bg-slate-600 text-white rounded px-4 py-2"
          >Submit</button>
        </div>
      </div>
    </form>
    

  `,
  styles:  [`
  .user{
    width: 80%;
    margin-right: auto;
    margin-left: auto;
    border-radius: 10px;
    background-color: rgb(37,37,37,50%) ;
    padding: 1rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
    
  }
  input{
    color:black;
  }
  textarea{
    color:black;
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


    const updatedAuthor: Author = {
      id: this.idOfUrl,
      firstname: this.firstname,
      lastname: this.lastname,
      description: this.description,
      img: this.img,
      createdAt: this.date
    };

    this.authorService.updateAuthor(updatedAuthor).subscribe(
        response => {
          // Gérez la réponse positive ici (par exemple, afficher un message de succès)
          console.log('Author updated successfully', response);
          this.router.navigate(['/admin/authors']); // Redirigez vers la liste des auteurs ou une autre page
        },
        error => {
          // Gérez l'erreur ici (par exemple, afficher un message d'erreur)
          console.error('Error updating author', error);
          this.error = 'Erreur lors de la mise à jour de l\'auteur';
        }
    );
  }




}
