import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { HomeComponent } from './views/home/home.component';
import { ScanComponent } from './views/scan/scan.component';
import { TreeSelectModule } from 'primeng/treeselect';
import { DropdownModule } from 'primeng/dropdown';
import { RecommendComponent } from './views/recommend/recommend.component';
import { FieldsetModule } from 'primeng/fieldset';
import { SwiperModule } from 'swiper/angular';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.services';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ScanComponent,
    RecommendComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MultiSelectModule,
    TreeSelectModule,
    DropdownModule,
    FieldsetModule,
    SwiperModule,
    ToastModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
