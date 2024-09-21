import {Component, OnInit} from '@angular/core';
import {GenderService} from "../../../services/gender.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorDto, Gender, GenderDto} from "../../../types";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {catchError, finalize, tap} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
  selector: 'app-gender',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="flex flex-col gap-2 mt-4 admin-container">
      <h2>Information sur le genre : {{ gender?.label }}</h2>

      <div class="div-form">
        <form class="form-admin" (submit)="handleSubmit($event)">
          <div class="form-contain">
            <input
                id="Label"
                type="text"
                [(ngModel)]="label"
                name="Label"
            >
          </div>
          <div class="form-contain">

            @if (error) {
              <p class="text-red-500">{{ error }}</p>
            }

          </div>
          <div class="">
            <button
                type="submit"
                class="bg-slate-600 text-white rounded px-4 py-2"
            >Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: ``
})
export class GenderAdminComponent implements OnInit{
  idOfUrl!:number; // id du manga récupéré à partir de l'url.
  gender!: Gender | null;
  label:string="";
  error:string=""
  constructor(
      private gendersService : GenderService,
      private activatedRoute: ActivatedRoute,
      private router: Router
  ) {
  }

  ngOnInit() {
    this.idOfUrl=parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);

    this.gendersService.getGender( this.idOfUrl);


    this.gendersService.oneCurrentGender.subscribe(gender =>{
      this.gender = gender
      if(gender){
        this.label = gender?.label
      }
    })

  }

  handleSubmit(e: SubmitEvent) {

    const updatedGender: GenderDto = {
      id: this.idOfUrl,
      label: this.label,
    };



    this.gendersService.updateGender(updatedGender)
        .pipe(
            tap(response => {
              // Gérez la réponse positive ici (par exemple, afficher un message de succès)
              console.log('Author updated successfully', response);
              this.router.navigate(['/admin/genders']); // Redirigez vers la liste des auteurs ou une autre page
            }),
            catchError(error => {
              // Gérez l'erreur ici (par exemple, afficher un message d'erreur)
              console.error('Error updating gender', error);
              this.error = 'Erreur lors de la mise à jour du genre';
              return throwError(error); // Relancez l'erreur pour un traitement supplémentaire si nécessaire
            }),
            finalize(() => {
              // Actions finales à réaliser, qu'il y ait une erreur ou non
            })
        )
        .subscribe(); // Nécessaire pour déclencher l'exécution du pipeline
  }


}
