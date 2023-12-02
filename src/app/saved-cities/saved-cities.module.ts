import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SavedCitiesComponent } from './saved-cities.component';
import { SavedCityComponent } from './saved-city/saved-city.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
    declarations:[
        SavedCitiesComponent,
        SavedCityComponent
    ],
    imports:[
        BrowserModule,
        RouterModule.forRoot([]),
        IonicModule.forRoot(), 
        CommonModule,
        HttpClientModule,
        FormsModule,
        SharedModule
    ],
    exports:[
        SavedCitiesComponent,
        SavedCityComponent,
        CommonModule
    ]
})
export class SavedCitiesModule{}