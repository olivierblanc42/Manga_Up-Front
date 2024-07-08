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
      <div class="flex flex-col gap-2 mt-4">
          <table>
              <thead>
              <tr>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Action</th>
              </tr>
              </thead>
              <tbody>
                  @for (user of users; track user.id) {
                      <tr class="border">
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
  styles: ``
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
