import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, RouterModule} from "@angular/router";
import { DataUser, User,} from "../../../types";
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    
    <section class="user">
      <h1>Information sur l'utilisateur {{ dataUser?.user?.fisrtname }} , {{ dataUser?.user?.lastname }} </h1>
      <div>
        <p>Firstname:  {{ dataUser?.user?.fisrtname }}</p>
        <p>Lastname:  {{ dataUser?.user?.lastname }}</p>
        <p>Username:  {{ dataUser?.user?.username }}</p>
        <p>Email:  {{ dataUser?.user?.email }}</p>
        <p>Genre: {{ dataUser?.user?.gender?.label}}</p>
        <div>
          <p>Adresse:  </p>
          <ul>
            <li>{{ dataUser?.user?.address?.line1}}</li>
            <li>{{ dataUser?.user?.address?.line2}}</li>
            <li>{{ dataUser?.user?.address?.line3}}</li>
            <li>{{ dataUser?.user?.address?.postal_code}}</li>

          </ul>
          
        </div>
      </div>
    </section>
    
    
  `,
  styles: [`
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
