import { Component, ViewEncapsulation } from '@angular/core';
import SwiperCore, {Navigation, Pagination, EffectCoverflow} from 'swiper';

SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class RecommendComponent {
  Elenco: string = "Zucely Raxón,";
} 
