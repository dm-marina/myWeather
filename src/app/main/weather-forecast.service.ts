import { Injectable } from '@angular/core';
import { Forecast } from '../shared/forecast.model';
import {Subject} from 'rxjs';
import { CurrentWeatherForecast } from './current-weather/current-weather-forecast.model';

@Injectable({providedIn:'root'})
export class WeatherForecast{
    forecastChanged = new Subject<Forecast[]>();
    index:number;
    public days:Forecast[]|any=[];
    public currentWeather:CurrentWeatherForecast;
    public currentWeatherChanged = new Subject<CurrentWeatherForecast>();
    setDays(days:Forecast[]|CurrentWeatherForecast[]){
        this.days = days;
        this.forecastChanged.next(this.days);
    }
    getDays(){
        return this.days;
    }
    getDay(index:number){
        return this.days[index];
    }
    getCurrentWeather(){
        return this.currentWeather;
    }
    setCurrentWeather(weather:CurrentWeatherForecast){
        this.currentWeather = weather;
        this.currentWeatherChanged.next(this.currentWeather);
    }

   
   
}