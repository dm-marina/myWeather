import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WeatherForecastListComponent } from './weather-forecast-list/weather-forecast-list.component';
import { WeatherForecastItemComponent } from './weather-forecast-list/weather-forecast-item/weather-forecast-item.component';
import { WeatherForecastInformComponent } from './weather-forecast-list/weather-forecast-item/weather-forecast-inform/weather-forecast-inform.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IvyCarouselModule } from 'carousel-angular';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main.component';


@NgModule({
    declarations:[
        MainComponent,
        WeatherForecastListComponent,
        WeatherForecastItemComponent,
        WeatherForecastInformComponent,
        CurrentWeatherComponent
    ],
    imports:[
        RouterModule.forRoot([]),
        BrowserModule,
        IonicModule.forRoot(), 
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        IvyCarouselModule,
        CommonModule,
        SharedModule
    ],
    exports:[
        MainComponent,
        WeatherForecastListComponent,
        WeatherForecastItemComponent,
        WeatherForecastInformComponent,
        CurrentWeatherComponent, 
        CommonModule
    ]
})
export class WeatherModule{}