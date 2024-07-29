import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {GenderService} from "../../../services/gender.service";
import {Gender} from "../../../types";

@Component({
  selector: 'app-genders',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
    <h2>Genre utilisateur</h2>
    <div class="flex flex-col gap-2 mt-4 admin-container">
      <table>
        <thead>
        <tr>
          <th>Label</th>

        </tr>
        </thead>
        <tbody>
          @for (gender of genders; track gender.id) {
            <tr class="border">
              <td>{{ gender.label  }}</td>
              <td>
                <a [routerLink]="'/admin/gender/' + gender.id">🔎</a>
                <button>🗑️</button>
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



export class GendersAdminComponent implements  OnInit{
  genders!: Gender[];

  constructor(
      private genderService: GenderService,
      private activatedRoute: ActivatedRoute,
  ){

  }
  ngOnInit() {
    this.genderService.getGenders()

    this.genderService.currentGender.subscribe(genders =>{
      this.genders = genders;
    })

  }

}
