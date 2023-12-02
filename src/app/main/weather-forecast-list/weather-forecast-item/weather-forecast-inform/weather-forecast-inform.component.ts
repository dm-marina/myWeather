import { Component, Input, OnInit } from '@angular/core';
import { Forecast } from 'src/app/shared/forecast.model';
import { WeatherForecast } from '../../../weather-forecast.service';
import { Subscription } from 'rxjs';
import { SettingsService } from 'src/app/shared/settings.service';

@Component({
  selector: 'app-weather-forecast-inform',
  templateUrl: './weather-forecast-inform.component.html',
  styleUrls: ['./weather-forecast-inform.component.scss']
})
export class WeatherForecastInformComponent implements OnInit{
  @Input() day:Forecast;
  @Input() index:number;
  toCelsiusSub:Subscription;
  toCelsius:boolean;
  toDark:boolean;
  toDarkSub:Subscription;
  toKmSub:Subscription;
  toKm:boolean;
  constructor(private weatherForecastService:WeatherForecast, private settingsService:SettingsService){}
  ngOnInit(): void {
    this.index = this.weatherForecastService.index;
    this.day = this.weatherForecastService.getDay(this.index);
    this.toCelsiusSub = this.settingsService.toCelsiusSubject.subscribe((toCelsius)=>{
      this.toCelsius = toCelsius;
    });
    this.toDarkSub = this.settingsService.toDarkSubject.subscribe(
      (toDark)=>{
        this.toDark = toDark;
      }
    );
    this.toKmSub = this.settingsService.toCelsiusSubject.subscribe((toKm)=>{
      this.toKm = toKm;
    });
  }
}
