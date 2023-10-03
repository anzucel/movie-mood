import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

interface Movie {
  name: string;
  code: string;
}

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css'],
  providers: [MessageService]
})
export class ScanComponent {
  movies: Movie[] | undefined;

  favoriteMoviesForm = new FormGroup({
    movie1: new FormControl('', Validators.required),
    movie2: new FormControl('', Validators.required),
    movie3: new FormControl('', Validators.required)
  })

  constructor(private router: Router,
              private messageService: MessageService) { }

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
    if(this.favoriteMoviesForm.valid){
      this.router.navigate(['/recommend']);
    }
    else {
      this.messageService.add({severity: 'warn', summary: 'Campos Imcompletos', detail: 'Es necesario completar todos los campos'});
    }
  }

  goToBack() {
    this.router.navigate(['/home']);
  }
}
