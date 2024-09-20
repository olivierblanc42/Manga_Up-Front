import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../types';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ui-flash-message',
  standalone: true,
  imports: [],
  template: `
    <div class="banner">
        <p class="txt">
        @if(msgLogin !== ""){
            <div id="msg__login">{{ msgLogin }}</div>
        }
        </p>
    </div>
  `,
  styles: [`
    #msg__login{
        background-color: rgb(78, 91, 7);
        border: 1px solid rgb(162, 210, 70);
        text-align: center;
        font-size: 2rem;
    }
    `]
})
export class FlashMessageComponent {

    user!: User|null;
    isAlreadyLogin: Boolean=false;
    msgLogin: string="";

    constructor(
        private authService: AuthService, 
    ) {}

    ngOnInit(){
        this.authService.currentUser.subscribe(user=>{
            this.user=user;
            if(! this.isAlreadyLogin && this.user){
                this.msgLogin='Bienvenu '+this.user.username;
                this.timeout();
            }
        })
    }

    timeout(){
        setTimeout(() => {
            this.msgLogin="";
            this.isAlreadyLogin=true;
        }, 3000);   
    }
}
