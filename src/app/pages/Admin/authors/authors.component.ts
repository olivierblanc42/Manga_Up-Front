import {Component, OnInit} from '@angular/core';
import {Author, Authors, DataAuthor} from "../../../types";
import {AuthorService} from "../../../services/author.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  template: `

      <h2 xmlns="http://www.w3.org/1999/html">Auteurs</h2>
    <div class="flex flex-col gap-2 mt-4 form-admin">
      <form #authorForm="ngForm"  (submit)="handleSubmit($event)" >
        <h2>Ajout d'un auteur</h2>
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
          @if (error) {
            <p class="text-red-500">{{error}}</p>
          }
          <div class="flex justify-center">
            <button
                type="submit"
                class="bg-slate-600 text-white rounded px-4 py-2"
            >Submit</button>
          </div>
        </div>
      </form>
    </div>
    
    <div class="flex flex-col gap-2 mt-4 admin-container">

      <table>
        <thead>
        <tr>
          <th>Author</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
          @for (author of authors?.content; track author.id) {
            <tr class="border">
              <td>{{ author.lastname + " " + author.firstname }}</td>
              <td>{{ author.description }}</td>
              <td>
                <a [routerLink]="'/admin/author/' + author.id">🔎</a>
                <button (click)="handleRemove(author.id)">🗑️</button>
              </td>
            </tr>
          }
        </tbody>
      </table>
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
      private router: Router
  ){

  }
  firstname: string ="";
  lastname: string ="";
  description: string="";
  authors!: Authors|null;
  base64G:string="data:image/webp;base64,";
  error: string = "";
  currentTime = new Date();

  ngOnInit(): void {
    this.authorService.getAuthors()

    this.authorService.currentAuthors.subscribe(authors =>{
      this.authors = authors
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
      firstname: this.firstname,
      description: this.description,
      lastname: this.lastname,
      createdAt : this.currentTime

    });

   this.reloadPage()

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
        if(confirm("Are you sure to delete" )) {
            this.authorService.removeAuthor(id)
            this.reloadPage()

        }
    }


    // Recharge la page pour refléter les nouvelles données
  reloadPage() {
   window.location.reload()
  }







}
