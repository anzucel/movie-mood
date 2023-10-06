import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

interface Genders {
  name: string,
  code: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
  inputValue: string = '';
  selectedGenders!: Genders[];
  genders!: Genders[];

  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    movieGenres: new FormControl<Genders[]>([], Validators.required)
  })

  constructor(private router: Router,
              private messageService: MessageService) { 
    this.genders = [
      {name: 'Action', code: 'Action'},
      {name: 'Adventure', code: 'Adventure'},
      {name: 'Animation', code: 'Animation'},
      {name: 'Comedy', code: 'Comedy'},
      {name: 'Crime', code: 'Crime'},
      {name: 'Drama', code: 'Drama'},
      {name: 'Family', code: 'Family'},
      {name: 'Fantasy', code: 'Fantasy'},
      {name: 'History', code: 'History'},
      {name: 'Horror', code: 'Horror'},
      {name: 'Music', code: 'Music'},
      {name: 'Mistery', code: 'Mistery'},
      {name: 'Romance', code: 'Romance'},
      {name: 'Science Fiction', code: 'Science-Fiction'},
      {name: 'Thriller', code: 'Thriller'},
      {name: 'TV Movie', code: 'TV-Movie'},
      {name: 'War', code: 'War'},
      {name: 'Western', code: 'Western'},
    ]
  }

  ngOnInit(): void {
  }

  nextForm() {
    if(this.profileForm.valid){
      this.router.navigate(['/scan']);
    }
    else{
      this.messageService.add({severity: 'warn', summary: 'Incomplete Fields', detail: 'All fields must be completed'});
    }
  }

  validateSelect(event: any) {
    if(event.value.length > 3) {
      event.value.pop();
      this.messageService.add({severity: 'warn', summary: 'Ups', detail: 'Please, only select 3 genres!'});
    }
  }
}
