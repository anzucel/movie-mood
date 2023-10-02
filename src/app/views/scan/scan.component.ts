import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

interface Movie {
  name: string;
  code: string;
}

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent {
  movies: Movie[] | undefined;

  favoriteMoviesForm = new FormGroup({
    movie1: new FormControl(''/*, Validators.required*/),
    movie2: new FormControl(''),
    movie3: new FormControl('')
  })

  constructor(private router: Router) { }

  ngOnInit() {
    this.movies = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }

  next() {
    this.router.navigate(['/recommend']);
  }
}
