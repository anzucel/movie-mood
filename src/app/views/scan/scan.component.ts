import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataService } from '../../services/data.services';
import { HttpClient } from '@angular/common/http';

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
    private messageService: MessageService,
    private dataService: DataService,
    private http: HttpClient) { }

  async ngOnInit() {
    this.movies = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }

  async recommend() {
    try {
      let id = this.dataService.sharedData;
      const formData = this.favoriteMoviesForm.value;

      const users = await this.http.get<object>('http://localhost:5000/api/users/' + id).toPromise();
      const str = JSON.stringify(users);
      const parsedObject = JSON.parse(str);
      const person = {
        age: 23,
        sex: 'Femenine',
        state_of_mind: 'happy',
        film_one: formData.movie1,
        film_two: formData.movie2,
        film_three: formData.movie3,
        categories: parsedObject.categories
      };

      const respuesta = await this.http.post('http://localhost:5000/api/users/' + id + '/analysis', person).toPromise();

      this.dataService.response = JSON.parse(JSON.stringify(respuesta));
      console.log(this.dataService.response);

    //   const response = {
    //     "movies": [
    //         {
    //             "extract": "Atomic Blonde is a 2017 American action thriller film directed by David Leitch from a screenplay by Kurt Johnstad, based on the 2012 graphic novel The Coldest City by Antony Johnston and Sam Hart. The film stars Charlize Theron, James McAvoy, John Goodman, Til Schweiger, Eddie Marsan, Sofia Boutella, and Toby Jones. The story revolves around a spy who has to find a list of double agents that is being smuggled into the West on the eve of the collapse of the Berlin Wall in 1989.",
    //             "genres": [
    //                 "Action",
    //                 "Thriller"
    //             ],
    //             "href": "Atomic_Blonde",
    //             "thumbnail": "https://upload.wikimedia.org/wikipedia/en/b/b5/Atomic_Blonde_poster.jpg",
    //             "title": "Atomic Blonde",
    //             "year": 2017
    //         },
    //         {
    //             "extract": "The Emoji Movie is a 2017 American computer-animated science fiction comedy film produced by Columbia Pictures and Sony Pictures Animation, and distributed by Sony Pictures Releasing. The film was directed by Tony Leondis from a screenplay he co-wrote with Eric Siegel and Mike White, based on a story by Leondis and Siegel. It stars the voices of T.J.",
    //             "genres": [
    //                 "Animated",
    //                 "Comedy",
    //                 "Science Fiction"
    //             ],
    //             "href": "The_Emoji_Movie",
    //             "thumbnail": "https://upload.wikimedia.org/wikipedia/en/4/4c/American_Underdog.jpg",
    //             "title": "The Emoji Movie",
    //             "year": 2017
    //         },
    //         {
    //             "extract": "The Legend of La Llorona is a 2022 American Horror film directed by Patricia Harris Seeley and written by José Prendes, Cameron Larson and Patricia Harris Seeley. The film stars Autumn Reeser, Danny Trejo, Antonio Cupo and Zamia Fardiño. The film was released on January 7, 2022.",
    //             "genres": [
    //                 "Horror"
    //             ],
    //             "href": "The_Legend_of_La_Llorona",
    //             "thumbnail": "https://upload.wikimedia.org/wikipedia/en/8/89/Memoria_poster.jpg",
    //             "title": "The Legend of La Llorona",
    //             "year": 2022
    //         }
    //     ]
    // }
    
    // this.dataService.response = JSON.parse(JSON.stringify(response));
    //   console.log(this.dataService.response);
      // Navigate to the next component after getting the response
      this.router.navigate(['/recommend']);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async next() {
    if (this.favoriteMoviesForm.valid) {
      await this.recommend();
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Campos Incompletos', detail: 'Es necesario completar todos los campos' });
    }
  }

  goToBack() {
    this.router.navigate(['/home']);
  }
}
