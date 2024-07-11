import { Component } from '@angular/core';
import {Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      modal works!
    </p>
  `,
  styles: ``
})
export class ModalComponent {

}
