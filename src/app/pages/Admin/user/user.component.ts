import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {DataUser, User} from "../../../types";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `

    <section class="admin-container">
      <h1>Information sur l'utilisateur <span>{{ dataUser?.user?.firstname }} , {{ dataUser?.user?.lastname }}</span> </h1>
      
      <div class="content-div">
        <p><span>Prénom : </span> {{ dataUser?.user?.firstname }}</p>
        <p><span>Nom : </span> {{ dataUser?.user?.lastname }}</p>
        <p><span>Pseudonyme : </span> {{ dataUser?.user?.username }}</p>
        <p><span>Email : </span> {{ dataUser?.user?.email }}</p>
        <p><span>Genre :</span> {{ dataUser?.user?.gender?.id}}</p>
        <div class="adresse">
          <p><span>Adresse :</span>  </p>
          <ul>
            <li>{{ dataUser?.user?.address?.line1}}</li>
            <li>{{ dataUser?.user?.address?.line2}}</li>
            <li>{{ dataUser?.user?.address?.line3}}</li>
            <li>{{ dataUser?.user?.address?.postalCode}}</li>
            <li>{{ dataUser?.user?.address?.department}}</li>
            <li>{{ dataUser?.user?.address?.country}}</li>
          </ul>
          
        </div>
      </div>
    </section>
    
    
  `,
  styles: [`
  .admin-container{
    width: 80%;
    margin-right: auto;
    margin-left: auto;
    border-radius: 10px;
    background-color: rgb(37,37,37,50%) ;
    padding: 1rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
  .content-div{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 1rem;
    span{
      font-weight: bolder;
      text-transform: uppercase;
    }
    .adresse li{
      padding-left: 0.8REM ;
    }
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
    })

  }


}
