import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorage } from 'src/app/shared/data-storage.service';
import { WeatherForecast } from '../weather-forecast.service';
import { CurrentWeatherForecast } from './current-weather-forecast.model';
import { SettingsService } from 'src/app/shared/settings.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit{
  toCelsius:boolean;
  toCelsiusSub:Subscription;
  weather:CurrentWeatherForecast;
  cityName:string;
  cityNameSub:Subscription;
  currentWeatherSub:Subscription;
  toDark:boolean;
  toDarkSub:Subscription;
  toKm:boolean;
  toKmSub:Subscription;
  constructor(private dataStorage:DataStorage, 
              private weatherForecastService:WeatherForecast, 
              private settingsService:SettingsService){}
  ngOnInit(): void {
    this.cityNameSub = this.dataStorage.cityNameSub.subscribe((cityName)=>{
      this.cityName = cityName;
    })
    this.toCelsiusSub = this.settingsService.toCelsiusSubject.subscribe((toCelsius)=>{
      this.toCelsius = toCelsius;
    });
    this.dataStorage.getCurrentWeather(this.cityName).subscribe();
    this.currentWeatherSub = this.weatherForecastService.currentWeatherChanged
    .subscribe(
      (weather:CurrentWeatherForecast)=>{
        this.weather = weather;
      }
    );
    this.weather = this.weatherForecastService.getCurrentWeather();
    this.toDarkSub = this.settingsService.toDarkSubject.subscribe(
      (toDark)=>{
        this.toDark = toDark;
      }
    );
    this.toKmSub = this.settingsService.toKmSubject.subscribe((toKm)=>{
      this.toKm = toKm;
    });
    this.dataStorage.getCoordsPosition();
  }
}
