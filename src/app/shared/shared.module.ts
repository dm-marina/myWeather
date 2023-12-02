import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToKmPipe } from './toKm/to-km.pipe';
import { ToCelsiusPipe } from './toCelsius/to-celsius.pipe';
import { HeaderComponent } from '../header/header.component';
import { TabsComponent } from '../tabs/tabs.component';
import { IonicModule } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
    declarations:[
        ToKmPipe,
        ToCelsiusPipe,
        HeaderComponent,
        TabsComponent

    ],
    imports:[
        BrowserModule,
        RouterModule.forRoot([]),
        IonicModule.forRoot(), 
        CommonModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
    ],
    exports:[
        ToCelsiusPipe,
        ToKmPipe,
        CommonModule,
        HeaderComponent,
        TabsComponent
    ]
})
export class SharedModule{}