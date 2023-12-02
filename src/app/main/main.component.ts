import { Component, Input, OnInit } from '@angular/core';
import { Forecast } from '../shared/forecast.model';
import { Subscription } from 'rxjs';
import { DataStorage } from '../shared/data-storage.service';
import { WeatherForecast } from './weather-forecast.service';
import { SettingsService } from '../shared/settings.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent  implements OnInit {
  @Input()days:Forecast[];
  cityName:string='';
  cityListNameSub:Subscription;
  fullCityNameSub:Subscription;
  forecastSub:Subscription;
  toDarkSub:Subscription;
  toDark:boolean;
  constructor(
    private dataStorage:DataStorage, 
    private weatherForecastService:WeatherForecast, 
    private settingsService:SettingsService
  ){}
  ngOnInit(): void {
    this.cityListNameSub = this.dataStorage.cityListName.subscribe((cityName)=>{
      this.cityName =  'Click on input to watch the forecast';
    })
    this.fullCityNameSub = this.dataStorage.fullCityName.subscribe((cityName)=>{
      let check = /\d/;
      if(check.test(cityName)){
        this.cityName = 'Current position';
      } else{
        this.cityName = cityName;
      }
    })
    this.forecastSub = this.weatherForecastService.forecastChanged
    .subscribe(
      (days:Forecast[])=>{
        this.days = days;
      }
    )
    this.days = this.weatherForecastService.getDays();
    this.toDarkSub = this.settingsService.toDarkSubject.subscribe(
      (toDark)=>{
        this.toDark = toDark;
      }
    ); 
  }
}
