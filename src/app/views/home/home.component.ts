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
    movieGenres: new FormControl<Genders[]>([], Validators.required)
  })

  constructor(private router: Router,
              private messageService: MessageService) { 
    this.genders = [
      {name: 'Romance', code: 'Romance'},
      {name: 'Terror', code: 'Terror'},
      {name: 'Drama', code: 'Drama'}
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
}
