import { Component, ViewEncapsulation } from '@angular/core';
import SwiperCore, {Navigation, Pagination, EffectCoverflow} from 'swiper';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css'],
  providers: [ConfirmationService, MessageService],
  encapsulation:ViewEncapsulation.None
})
export class RecommendComponent {
  Elenco: string = "Zucely Raxón,";
  isChanged: boolean = false;

  constructor(private router: Router,
              private confirmationService: ConfirmationService, 
              private messageService: MessageService) {}

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

  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange(event: any) {
    this.isChanged = !this.isChanged;
    console.log('slide change', event[0].activeIndex); //card activa 
  }
} 
