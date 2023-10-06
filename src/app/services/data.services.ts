import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // This providedIn option makes the service a singleton and provides it globally in the root injector
})
export class DataService {
  sharedData: any;
response: any;
}
