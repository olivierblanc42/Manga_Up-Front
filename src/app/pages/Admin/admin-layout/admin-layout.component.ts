import { Component } from '@angular/core';
import {RouterOutlet, RouterModule, RouterLink} from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <p>ADMIN</p>
    <router-outlet></router-outlet>

  `,
  styles: ``
})
export class AdminLayoutComponent {

}
