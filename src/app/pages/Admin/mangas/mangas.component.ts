import {Component, OnInit} from '@angular/core';
import {Mangas, Picture} from "../../../types";
import {MangaService} from "../../../services/manga.service";
import {PictureService} from "../../../services/picture.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-mangas',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
    <div class="flex flex-col gap-2 mt-4 admin-container">
      <table>
        <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
          @for (manga of mangas?.content; track manga.id) {
            <tr class="border">
              <td>{{ manga.title}}</td>
              <td>{{manga.price}}</td>
              <td>
                <a [routerLink]="'/admin/manga/' + manga.id">🔎</a>
                <button >🗑️</button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [`
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
export class MangasAdminComponent implements OnInit {

  mangas!: Mangas |null ;
  pictures!: Picture[];
  picture!:Picture;
  base64:string="data:image/webp;base64,";
  pages!: number[]; // Nombre de page
  lastPage!: number;
  currentPage!: number;

  constructor(
      private mangaService: MangaService,
      private pictureService: PictureService,

  ){}


  ngOnInit(): void {
    this.mangaService.getMangas()
    this.mangaService.currentMangaPagination.subscribe(mangas =>{
      this.mangas = mangas
      console.log(this.mangas)
    })

    this.pictureService.currentPictures.subscribe(pictures =>this.pictures = pictures)

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
  pageMangas(page: number){
    console.log("dans pageComments page : ", page);
    this.currentPage=page;
    console.log("dans pageComments currentPage : ", this.currentPage);
    this.mangaService.getManga(page);
  }


  pagePrevious(){
    console.log("dans pagePrevious currentPage : ", this.currentPage);
    if(this.currentPage > 0){
      this.pageMangas(this.currentPage-1);
    }
  }
  pageNext(){
    console.log("dans pageNext currentPage : ", this.currentPage);
    if(this.currentPage < this.lastPage-1){
      this.pageMangas(this.currentPage+1);
    }
  }

  /**
   * Pour afficher un objet dans le html.
   * @param val l'objet à afficher
   * @param msg le message à afficher avec l'objet
   */
  log(val: Object, msg: string=""){
    console.log(msg, val);
  }



}
