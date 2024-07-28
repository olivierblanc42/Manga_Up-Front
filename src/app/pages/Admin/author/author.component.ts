import {Component, OnInit} from '@angular/core';
import {DataAuthor} from "../../../types";
import {AuthorService} from "../../../services/author.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [],
  template: `
    
    <section class="user">
      <h1>Information sur  {{ data?.author?.firstname +" " + data?.author?.lastname }}  </h1>
     
    

      <div>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <div>
          <p>   </p>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>

          </ul>

        </div>
      </div>
    </section>
    
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
  
  `]
})
export class AuthorAdminComponent implements OnInit {
  idOfUrl!:number; // id du genre récupéré à partir de l'url.
  data! : DataAuthor | null;

  constructor(
      private authorService: AuthorService,
      private activatedRoute: ActivatedRoute,
  ){
    //  this.currentPage=0;
  }

  ngOnInit(): void {
    this.idOfUrl=parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);

    this.authorService.getMangaAuthor(this.idOfUrl)

    this.authorService.currentDataAuthor.subscribe( dataAuthor =>{
      this.data = dataAuthor
    } )

  }
}
