import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  template: `
    <form #contactForm="ngForm" (submit)="handleSubmit($event)"  class="w-full max-w-lg mx-auto">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="firstname">
            First Name
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="firstname" type="text" placeholder="Jane" name="firstname">
          <p class="text-red-500 text-xs italic">Champ requis.</p>
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
            Last Name
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" name="lastname">
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">
            E-mail
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email"  [(ngModel)]="email"
                 name="email">
          <p class="text-gray-600 text-xs italic">Some tips - as long as needed</p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
            Message
          </label>
          <textarea class=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none" id="message"></textarea>
          <p class="text-gray-600 text-xs italic">Re-size can be disabled by set by resize-none / resize-y / resize-x / resize</p>
        </div>
      </div>
      <div class="md:flex md:items-center">
        <div class="md:w-1/3">
          <button class="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
            Submit
          </button>
        </div>
        <div class="md:w-2/3"></div>
      </div>
      <!--
      @if (error) {
        <p class="text-red-500">{{error}}</p>
      }
      <div class="flex justify-center">
        <button
            type="submit"
            class="bg-slate-600 text-white rounded px-4 py-2"
        >Submit</button>
      </div>-->
    </form>
    <!--<p>
      contact works!
    </p>-->
  `,
  styles: ``
})
export class ContactComponent {

  email: string = "";

  firstname: string = "";

  lastname: string = "";

  error: string = "";

  handleSubmit(e: SubmitEvent) {
    if (!this.email) {
      this.error = "Email is required";
      return;
    }
    if (!this.firstname) {
      this.error = "firstname is required";
      return;
    }

    if (!this.lastname) {
      this.error = "lastname is required";
      return;
    }

  }
}
