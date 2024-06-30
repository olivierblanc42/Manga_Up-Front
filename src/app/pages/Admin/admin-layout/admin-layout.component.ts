import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <p>
      admin-layout works!
    </p>
    <router-outlet />

  `,
  styles: ``
})
export class AdminLayoutComponent {

}
