import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, RouterModule} from "@angular/router";
import { DataUser, User} from "../../../types";
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <p>
      {{ dataUser?.user?.username }}
    </p>
  `,
  styles: ``
})
export class UserComponent implements OnInit {

  dataUser! : DataUser | null;
  idOfUrl!: string | null; // id de l'utilisateur récupéré à partir de l'url.

  constructor(
      private userService: UserService,
      private activatedRoute: ActivatedRoute,

) {}

  ngOnInit(): void {
    this.idOfUrl = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.getUser(this.idOfUrl)

    this.userService.currentDataUser.subscribe(dataUser =>{
      this.dataUser = dataUser;
      console.log(this.dataUser)
    })

  }


}
