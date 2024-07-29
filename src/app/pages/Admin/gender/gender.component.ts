import {Component, OnInit} from '@angular/core';
import {GenderService} from "../../../services/gender.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-gender',
  standalone: true,
  imports: [],
  template: `
    <p>
      gender works!
    </p>
  `,
  styles: ``
})
export class GenderAdminComponent implements OnInit{
  idOfUrl!:number; // id du manga récupéré à partir de l'url.

  constructor(
      private gendersService : GenderService,
       private activatedRoute: ActivatedRoute,

) {
  }

  ngOnInit() {
    this.idOfUrl=parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);

    this.gendersService.getGender( this.idOfUrl);
  }

}
