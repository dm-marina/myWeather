import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Forecast } from 'src/app/shared/forecast.model';
import { SettingsService } from 'src/app/shared/settings.service';
import { WeatherForecast } from 'src/app/main/weather-forecast.service';
@Component({
  selector: 'app-weather-forecast-item',
  templateUrl: './weather-forecast-item.component.html',
  styleUrls: ['./weather-forecast-item.component.scss']
})
export class WeatherForecastItemComponent implements OnInit{
 @Input() day:Forecast;
 @Input() dayIndex:Forecast;
 @Input() index:number;
  isModalOpen:boolean=false;
  toCelsiusSub:Subscription;
  toCelsius:boolean;
  toDarkSub:Subscription;
  toDark:boolean;
  constructor( private weatherForecastService:WeatherForecast, private settingsService:SettingsService){}
  ngOnInit(): void {
    this.toCelsiusSub = this.settingsService.toCelsiusSubject.subscribe((toCelsius)=>{
      this.toCelsius = toCelsius;
    });
    this.toDarkSub = this.settingsService.toDarkSubject.subscribe(
      (toDark)=>{
        this.toDark = toDark;
      }
    );
  }
  openModal(isOpen:boolean){
    this.isModalOpen = isOpen;
    this.dayIndex = this.weatherForecastService.getDay(this.index);
    this.weatherForecastService.index = this.index;
  }    
}


