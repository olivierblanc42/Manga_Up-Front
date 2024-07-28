import {Component, OnInit} from '@angular/core';
import {Author, DataAuthor} from "../../../types";
import {AuthorService} from "../../../services/author.service";
import {ActivatedRoute, RouterLink} from "@angular/router";

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
    <div class="flex flex-col gap-2 mt-4 admin-container">
      <table>
        <thead>
        <tr>
          <th>NOM</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
          @for (author of authors; track author.id) {
            <tr class="border">
              <td>{{author.lastname +" "+ author.firstname}}</td>
              <td>{{author.description}}</td>
              <td>
                <a [routerLink]="'/admin/author/' + author.id">🔎</a>
                <button >🗑️</button>
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

  ){

  }
  authors!: Author[]|null;
  base64G:string="data:image/webp;base64,";


  ngOnInit(): void {
    this.authorService.getAuthors()

    this.authorService.currentAuthors.subscribe(authors =>{
      this.authors = authors
    })
  }
}
