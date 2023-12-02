import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { City } from '../shared/city.model';

@Injectable({providedIn:'root'})
export class SavedCitiesService{
    public savedCitiesChanged = new Subject<any>();
    savedCities:City[]=[ ];
    id:number;

    getSavedCities(){
        return this.savedCities.slice();
    }
    getCityNameByID(index:number){
        return this.savedCities[index].address;
    }
    addCity(city:any){
        this.savedCities.push(city);
        this.savedCitiesChanged.next(this.savedCities.slice());
    }
    deleteCity(index:number){
        this.savedCities.splice(index, 1);
        this.savedCitiesChanged.next(this.savedCities.slice());
    }
    setCities(cities: City[]) {
        this.savedCities = cities;
        this.savedCitiesChanged.next(this.savedCities.slice());
      }
}