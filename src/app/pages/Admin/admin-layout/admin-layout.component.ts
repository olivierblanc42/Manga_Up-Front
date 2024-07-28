import { Component } from '@angular/core';
import {RouterOutlet, RouterModule, RouterLink} from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <p>ADMIN</p>
    <div>
    <a class="btn-admin"  [routerLink]="'/admin/users'"> users</a>
    <a class="btn-admin" [routerLink]="'/admin/categories'"> catégories</a>
    <a class="btn-admin" [routerLink]="'/admin/authors'"> Auteurs</a>
    <a class="btn-admin" [routerLink]="'/admin/genres'"> genres</a>
    <a class="btn-admin" [routerLink]="'/admin/mangas'"> mangas</a>
    </div>
    <router-outlet></router-outlet>
 
  `,
  styles: [`
  .btn-admin{
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 4px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: #fff;
    background-color: #337ab7;
    border-color: #2e6da4;
  }
     
  `]
})
export class AdminLayoutComponent {

}
