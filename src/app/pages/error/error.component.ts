import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  template: `
    <div>
      <h1 class="text-center mb-4">Error {{code}}</h1>
      <img src="https://http.cat/{{code}}" />
    </div>
  `,
  styles: ``
})
export class ErrorComponent implements OnInit {
  code!: string;

  constructor(
    private activatedRoute: ActivatedRoute 
  ) { }

  ngOnInit(): void {
    this.code = this.activatedRoute.snapshot.paramMap.get('code')!;
  }
}