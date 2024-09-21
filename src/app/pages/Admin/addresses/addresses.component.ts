import {Component, OnInit} from '@angular/core';
import {AuthorService} from "../../../services/author.service";
import {Router, RouterLink} from "@angular/router";
import {AddressService} from "../../../services/address.service";
import {Address, Addresses} from "../../../types";
import {NgClass} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    FormsModule
  ],
  template: `

    <h2>Adresses</h2>


    <div class="flex flex-col gap-2 mt-4 admin-container">
      <div class="div-form">
        <form class="form-admin"     (submit)="handleSubmit($event)" >
          <h2>Ajout d'une adresse</h2>
          <div class="form-contain">
            <input
                id="Label"
                type="text"
                [(ngModel)]="line1"
                name="name"
                placeholder="ligne 1"
            >
          </div>
          <div class="form-contain">
            <input
                id="Label"
                type="text"
                [(ngModel)]="line2"
                name="name"
                placeholder="ligne 2"
            >
          </div>

          <div class="form-contain">
            <input
                id="Label"
                type="text"
                [(ngModel)]="line3"
                name="name"
                placeholder="ligne 3"
            >
          </div>
          <div class="form-contain">
            <input
                id="Label"
                type="text"
                [(ngModel)]="postalCode"
                name="name"
                placeholder="Code Postal"
            >
          
          </div>
          <div class="form-contain">
            <input
                id="Label"
                type="text"
                [(ngModel)]="city"
                name="name"
                placeholder="Ville"
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
      <table>
        <thead>
        <tr>
          <th>Line 1</th>
          <th>Line 2</th>
          <th>Line 3</th>
          <th>Code postale</th>
          <th>Ville</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        @for(address of addresses?.content; track address.id){
          <tr class="border">
            <td>{{address.line1}}</td>
            <td>{{address.line2}}</td>
            <td>{{address.line3}}</td>
            <td>{{address.postalCode}}</td>
            <td>{{address.city}}</td>
            <td>
              <a [routerLink]="'/admin/address/' + address.id">🔎</a>
              <button  (click)="handleRemove(address.id)">🗑️</button>
            </td>
          </tr>
        }
        </tbody>
      </table>
    </div>
    <div class="pagination">

      @for (page of pages; track page; let count = $index) {
        @if (count === 0) {
          <li>
            <button
                (click)="pagePrevious()"
                [ngClass]="currentPage <= 0 ? 'grey-desactive-btn': 'blue-active-btn'"
                class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >Previous
            </button>
          </li>
        }
        <li>

          <button (click)="pageMangas(page)"
                  class="flex items-center justify-center px-4 h-10 leading-tight text-black bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-yellow-100 dark:hover:text-gray-700"
                  [ngClass]="currentPage===page ? 'bg-yellow-100':'background-color-pagination-yellow'"
          >
            {{ count + 1 }}
          </button>
        </li>
        @if (count === lastPage - 1) {
          <li>
            <button
                (click)="pageNext()"
                [ngClass]="currentPage===lastPage-1 ? 'grey-desactive-btn': 'blue-active-btn'"
                class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Next
            </button>
          </li>
        }
      }

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
export class AddressesComponent implements OnInit{

  addresses!: Addresses | null;
  pages!: number[]; // Nombre de pages
  lastPage!: number;
  currentPage!: number;
  line1: string="";
  line2: string="";
  line3: string="";
  postalCode: string="";
  city: string="";
  error:string="";

  constructor(
      private addressService :AddressService,
      private router: Router  )
  {
    this.currentPage=0;
  }

  ngOnInit(): void {
    this.addressService.getAddresses()

    this.addressService.currentAddressesPagination.subscribe(addresses =>{
      console.log(addresses)
        this.addresses  = addresses;
      this.pages = this.convertNumberToArray(this.addresses?.totalPages!)
      this.lastPage =this.addresses?.totalPages!;

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
  pageMangas(page: number){
    console.log("dans pageComments page : ", page);
    this.currentPage=page;
    console.log("dans pageComments currentPage : ", this.currentPage);
    this.addressService.getAddresses(page)


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

  handleSubmit(e: SubmitEvent) {
    // Vérifie si le champ 'line1' est vide
    if (!this.line1) {
      // Définit un message d'erreur si 'line1' est vide
      this.error = "line1 is required";
      return;
    }
    // Vérifie si le champ 'line2' est vide
    if (!this.line2) {
      // Définit un message d'erreur si 'line2' est vide
      this.error = "line2 is required";
      return;
    }
    // Vérifie si le champ 'line3' est vide
    if (!this.line3) {
      // Définit un message d'erreur si 'line3' est vide
      this.error = "line3 is required";
      return;
    }
    // Vérifie si le champ 'postalCode' est vide
    if (!this.postalCode) {
      // Définit un message d'erreur si 'line3' est vide
      this.error = "PostalCode is required";
      return;
    }
    // Vérifie si le champ 'postalCode' est vide
    if (!this.postalCode) {
      // Définit un message d'erreur si 'line3' est vide
      this.error = "PostalCode is required";
      return;
    }
    // Appelle le service pour ajouter un nouvel genre avec les données fournies
    this.addressService.addAddress({
      city:this.city,
      line1:this.line1,
      line2:this.line2,
      line3:this.line3,
      postalCode: this.postalCode
    })


        this.city ="";
        this.line1 ="";
        this.line2 ="";
        this.line3 ="";
        this.postalCode ="";

  }
  handleRemove(id: number){
    if(confirm("Are you sure to delete" )){
      this.addressService.removeAddresses(id);
    }
  }

}
