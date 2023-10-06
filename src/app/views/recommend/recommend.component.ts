import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import SwiperCore, {Navigation, Pagination, EffectCoverflow} from 'swiper';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataService } from '../../services/data.services';
import { HttpClient, HttpHeaders } from '@angular/common/http';

SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css'],
  providers: [ConfirmationService, MessageService],
  encapsulation:ViewEncapsulation.None
})
export class RecommendComponent implements OnInit{
  selectedMovie: any; 
  movies: any[] = []; // Initialize it as an empty array
  Elenco: string = "Zucely Raxón,";
  isChanged: boolean = false;

  ngOnInit(): void {
    // Call the fillInfo() method when the component is initiated
    this.fillInfo();
  }

  constructor(private router: Router,
              private confirmationService: ConfirmationService, 
              private messageService: MessageService,private dataService: DataService, private http: HttpClient) {}

  exit(event: Event) {
    this.confirmationService.confirm({
      // target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: '' });
        this.router.navigate(['/home']);
      },
      reject: () => {
        // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }


  fillInfo(){
    let recommendations = this.dataService.response;
    if (recommendations && recommendations.response && recommendations.response.movies) {
      this.movies = Object.values(recommendations.response.movies);
    }
    //for test
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
    // let recommendations = this.dataService.response;
    // if (recommendations &&  recommendations.movies) {
    //   this.movies = Object.values(recommendations.movies);
    // }

  }
 // Function to select a movie and update the selectedMovie variable
 selectMovie(index: number) {
  this.selectedMovie = this.movies[index];
}

// Function to handle slide change event
onSlideChange(event: any) {
  // Here, you can do something when the slide (movie) changes
  // For example, you can log the current slide index
  console.log('Current slide index:', event.activeIndex);
  this.isChanged = !this.isChanged;
  // You can also update the selected movie here if needed
  // For example, if you want to select the movie corresponding to the current slide
  this.selectedMovie = this.movies[event.activeIndex];
}

  onSwiper(swiper: any) {
    console.log(swiper);
  }

} 
