import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Genders {
  name: string,
  code: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  inputValue: string = '';
  selectedGenders!: Genders[];
  genders!: Genders[];

  profileForm = new FormGroup({
    name: new FormControl(''/*, Validators.required*/),
    movieGenres: new FormControl('')
  })

  constructor(private router: Router) { 
    this.genders = [
      {name: 'Romance', code: 'Romance'},
      {name: 'Terror', code: 'Terror'},
      {name: 'Drama', code: 'Drama'}
    ]
  }

  ngOnInit(): void {
  }

  nextForm() {
    console.log(this.profileForm);
    this.router.navigate(['/scan']);
  }
}
