import { AccountService } from './../../services/account.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../types';
import { AuthService } from '../../services/auth.service';

// Compte le nombre de fois ou l'on refresh la page

@Component({
  selector: 'ui-flash-message',
  standalone: true,
  imports: [],
  template: `
    <div class="banner mt-5">
        <p class="txt">
        @if(msg !== ""){
            <div id="msg">{{ msg }}</div>
        }
        </p>
        <div class="logout-msg relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div class="sm:flex sm:items-start">
                                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                    </svg>
                                </div>
                                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Déconnexion</h3>
                                    <div class="mt-2">
                                        <p class="text-sm text-gray-500">Vous avez été déconnecté avec succès !</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `,
  styles: [`
    #msg{
        background-color: rgb(78, 91, 7);
        border: 1px solid rgb(162, 210, 70);
        text-align: center;
        font-size: 2rem;
    }

    .logout-msg{
        display:none;
    }

    `]
})
export class FlashMessageComponent {

    user!: User|null;
    msg: string="";
    msgLogin: string="";
    msgRegister: string="";
    isAlreadyLogin: Boolean=false;
    isRegistered: Boolean=false;
    _isLogged: Boolean=false;
    isAlreadyLogout: Boolean=false;

    constructor(
        private authService: AuthService, 
        private accountService: AccountService,
    ) {
        
    }

    ngOnInit(){
        //this.authService._isRegistered.subscribe(isRegistered=>{
        //    this.isRegistered=isRegistered;
        //    if(this.isRegistered){
        //        this.msgRegister="Vous avez été enregistré avec succès"
        //        this.timeout();
        //    }
        //});
        
        this.authService.current_isAlreadyLogout.subscribe(isAlreadyLogout=>{
            this.isAlreadyLogout=isAlreadyLogout;
            this.displayMsgLogout();
        })

        this.authService.currentUser.subscribe(user=>{
            this.user=user;
            this.displayMsgLogged(this.accountService.getUser()!);
        });
    }

    displayMsgLogout(){
        if(this.authService.isLogout() && ! this.stopMsgLogout()){
            console.log("flash");
            this.msg='Déconnexion réussie'
            this.timeout();
            localStorage.setItem("isAlreadyLogout", "true");
        }
    }

    displayMsgLogged(user: User){
        if(this.authService.isLogged() && ! this.stopMsgLogged()){
            this.msg='Bienvenu '+user?.username;
            console.log("this.msgLogin", this.msgLogin);
            this.timeout();
            localStorage.setItem("isAlreadyLogin", "true");
            localStorage.setItem("isLogout", "false");
        }
    }

    timeout(){
        setTimeout(() => {
            this.msgLogin="";
            this.msgRegister="";
            this.msg="";
        }, 3000);   
    }

    stopMsgLogout(){
        return JSON.parse(localStorage.getItem("isAlreadyLogout")!);
    }

    stopMsgLogged(){
        return JSON.parse(localStorage.getItem("isAlreadyLogin")!);
    }
}
