import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {  map, tap } from 'rxjs/operators';
import { SavedCitiesService } from './saved-cities.service';
import { City } from '../shared/city.model';

@Injectable({ providedIn: 'root' })
export class CityStorageService {
  constructor(
    private http: HttpClient, 
    private savedCitiesService: SavedCitiesService) {}

  storeCities() {
    const citiesList = this.savedCitiesService.getSavedCities();
    this.http
      .put(
        'https://myweather-8953c-default-rtdb.firebaseio.com/city.json',
        citiesList
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchCities() {
    return this.http.get<City[]>(
      'https://myweather-8953c-default-rtdb.firebaseio.com/city.json')
      .pipe(
        map(citiesList => {
          return citiesList.map(city => {
            return {
              ...city,
            };
          });
        }),
        tap(citiesList => {
          this.savedCitiesService.setCities(citiesList);
        })
      )
  }
}
