import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {Injectable} from '@angular/core'
import{catchError, map, tap} from 'rxjs/operators';
import { Forecast } from './forecast.model';
import { City } from "./city.model";
import { WeatherForecast } from '../main/weather-forecast.service';
import { BehaviorSubject, throwError } from 'rxjs';
import {environment} from '../../environments/environment';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({providedIn:'root'})
export class DataStorage{
  constructor(private http:HttpClient, private weatherForecast:WeatherForecast){}
  public fullCityName = new BehaviorSubject<string>('Fine, NY, United States');
  cityName:string;
  cityNameSub = new BehaviorSubject<string>('Fine, NY, United States')
  cityListName=new BehaviorSubject<string>('');
  days:Forecast[]|any[];
  city:City;
  currentWeather:Forecast;
  lat:number;
  lon:number;
  APIKey = environment.APIKey;

  getCityByName(cityName:string){
    return this.http.get<City|any>
    (`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=us&key=${this.APIKey}&contentType=json`)
    .pipe(catchError(this.handleCityError),
      map((city:City)=>{
        this.city = city;
        this.fullCityName.next(city.resolvedAddress);
        return this.city;
      })
    )
  }
  getDays(cityName:string){
    return this.http.get<City>
    (`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=us&key=${this.APIKey}&contentType=json`)
    .pipe(
      map((city:City)=>{
        this.days = city.days;
        return this.days;
      }),
      tap(days=>{
        this.weatherForecast.setDays(days);
      })
    )
  }
  getCurrentWeather(cityName:string){
    return this.http.get<City>
    (`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=us&key=${this.APIKey}&contentType=json`)
    .pipe(
      map((city:City)=>{
        this.currentWeather = city.currentConditions;
        return this.currentWeather;
      }),
      tap(currentWeather=>{
        this.weatherForecast.setCurrentWeather(currentWeather);
      })
    )
  }
  getCoordsPosition(){
    const printCurrentPosition = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      this.lat = coordinates.coords.latitude;
      this.lon = coordinates.coords.longitude;
      if(this.lat&&this.lon!=0){
        this.cityNameSub.next(`${this.lat},${this.lon}`);
        this.fullCityName.next('Current position');
      }
    };
    printCurrentPosition();
  }
  private handleCityError(errorRes: HttpErrorResponse){
    let errorMessage = 'Invalid location parameter value.'
        if(!errorRes.error || !errorRes.error.error){
            return throwError(()=>errorMessage)
        }
          return throwError(()=>errorMessage)
  }
}