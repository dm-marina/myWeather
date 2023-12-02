import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './user/login/login.component';
import { UserComponent } from './user/user.component';
import { SettingsComponent } from './user/settings/settings.component';
import { SharedModule } from './shared/shared.module';
import { WeatherModule } from './main/weather.module';
import { SavedCitiesModule } from './saved-cities/saved-cities.module';


@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent,
    UserComponent,
    SettingsComponent,
  ],
  imports: [
    RouterModule.forRoot([]),
    BrowserModule,
    IonicModule.forRoot(), 
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    WeatherModule,
    SavedCitiesModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
