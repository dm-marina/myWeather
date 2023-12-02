import { Component, Input, OnInit } from '@angular/core';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { Forecast } from 'src/app/shared/forecast.model';
import { WeatherForecast } from '../weather-forecast.service';
import { Subscription } from 'rxjs';
import { SettingsService } from 'src/app/shared/settings.service';

@Component({
  selector: 'app-weather-forecast-list',
  templateUrl: './weather-forecast-list.component.html',
  styleUrls: ['./weather-forecast-list.component.scss']
})
export class WeatherForecastListComponent implements OnInit{
  @Input()days:Forecast[];
  cityName:string;
  cityNameSub:Subscription;
  forecastSub:Subscription;
  toDark:boolean;
  toDarkSub:Subscription;
  constructor(
    private dataStorage:DataStorage,
    private weatherForecastService:WeatherForecast,
    private settingsService:SettingsService
    ){}
  ngOnInit(): void {
    this.dataStorage.getCoordsPosition();
    this.cityNameSub = this.dataStorage.cityNameSub.subscribe((cityName)=>{
      this.cityName = cityName
    })
    console.log(this.cityName)
    this.dataStorage.getDays(this.cityName).subscribe();
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
