import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../types";
import {UserService} from "../../../services/user.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
      <div class="flex flex-col gap-2 mt-4 users-container">
          <table>
              <thead>
              <tr>
                  <th>Utilisateur</th>
                  <th>Email</th>
                  <th>Action</th>
              </tr>
              </thead>
              <tbody>
                  @for (user of users; track user.id) {
                      <tr class="border">
                          <td>{{"lastname: " +user.lastname + " " +" "+ user.fisrtname}}</td>
                          <td>{{user.email}}</td>
                          <td>
                              <a [routerLink]="'/users/' + user.id">🔎</a>
                              <button >🗑️</button>
                          </td>
                      </tr>
                  }
              </tbody>
          </table>
      </div>
      
  `,
  styles: [`
    .users-container{
      width: 80%;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
      background-color: rgb(37,37,37,50%) ;
      border-radius: 10px;
      table{
        tbody{
          tr{
       border: none;
          }
        }
      }
    }
`]
})
export class UsersComponent  implements OnInit {
   users! : User[];

  constructor(private userService: UserService) {}


  ngOnInit(): void {
     this.userService.getUsers()
     this.userService.currentUsers.subscribe( users => {
       this.users = users
     })
  }



}
