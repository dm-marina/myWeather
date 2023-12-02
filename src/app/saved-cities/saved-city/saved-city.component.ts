import { Component, Input, OnInit } from '@angular/core';
import { City } from 'src/app/shared/city.model';
import { SavedCitiesService } from '../saved-cities.service';
import { Subscription } from 'rxjs';
import { SettingsService } from 'src/app/shared/settings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorage } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-saved-city',
  templateUrl: './saved-city.component.html',
  styleUrls: ['./saved-city.component.scss'],
})
export class SavedCityComponent  implements OnInit {
  cityNameFromList:string;
  @Input() city:City;
  @Input() index:number;
  @Input() savedCities:any;
  savedCitiesSub:Subscription;
  toDark:boolean
  toDarkSub:Subscription;
  toCelsius:boolean;
  toCelsiusSub:Subscription;
  constructor(
    private savedCitiesService:SavedCitiesService,
    private settingsService:SettingsService,
    private router:Router,
    private route:ActivatedRoute,
    private dataStorage:DataStorage
    ) { }

  ngOnInit() {
    this.savedCities = this.savedCitiesService.getSavedCities();
    this.savedCitiesSub = this.savedCitiesService.savedCitiesChanged.subscribe(
      (savedCities:City[])=>{
        this.savedCities = savedCities;
      }
    );
    this.toCelsiusSub = this.settingsService.toCelsiusSubject.subscribe((toCelsius)=>{
      this.toCelsius = toCelsius;
    });
    this.toDarkSub = this.settingsService.toDarkSubject.subscribe(
      (toDark)=>{
        this.toDark = toDark;
      }
    );
  }
  deleteCity(){
    this.savedCitiesService.deleteCity(this.index)
  }
  openForecast(){
    this.cityNameFromList = this.savedCitiesService.getCityNameByID(this.index)
    this.dataStorage.cityListName.next(this.cityNameFromList);
    this.router.navigate(['/main'], { relativeTo: this.route });
  }

}
