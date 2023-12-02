import { Component, Input, OnInit } from '@angular/core';
import { SettingsService } from '../shared/settings.service';
import { Subscription } from 'rxjs';
import { DataStorage } from '../shared/data-storage.service';
import { City } from '../shared/city.model';
import { SavedCitiesService } from './saved-cities.service';
import { AlertController } from '@ionic/angular';
import { CityStorageService } from './city-storage.service';

@Component({
  selector: 'app-saved-cities',
  templateUrl: './saved-cities.component.html',
  styleUrls: ['./saved-cities.component.scss'],
})
export class SavedCitiesComponent  implements OnInit {
  toDark:boolean;
  toDarkSub:Subscription;
  cityStr:string;
  savedCities:any=[]
  @Input()index:number;
  savedCitiesSub:Subscription;
  error=null;
  alertButtons = ['Close'];

  constructor(
    private settingsService:SettingsService,
    private dataStorage:DataStorage,
    private savedCitiesService:SavedCitiesService,
    private alertController:AlertController,
    private cityStorageService:CityStorageService
    ) { }

  ngOnInit() {
    this.toDarkSub = this.settingsService.toDarkSubject.subscribe(
      (toDark)=>{
        this.toDark = toDark;
      }
    )
    this.savedCities = this.savedCitiesService.getSavedCities();
    this.savedCitiesSub = this.savedCitiesService.savedCitiesChanged.subscribe(
      (savedCities:City[])=>{
        this.savedCities = savedCities;
      }
    );
    this.cityStorageService.fetchCities().subscribe();
  }
  saveCity(){
    this.dataStorage.getCityByName(this.cityStr).subscribe({
      next:(city:City)=>{
        this.dataStorage.city = city
        this.savedCitiesService.addCity(city);
        this.cityStorageService.storeCities();
        return this.dataStorage.city;
      },
      error:(errorMessage)=>{
        this.error = errorMessage;
        this.presentAlert();
      }
    });
  }
  updateList(){
    this.cityStorageService.storeCities();
  }
  async presentAlert(){
    const alert = await this.alertController.create({
      header:'Error',
      message: this.error,
      buttons:this.alertButtons
    })
    await alert.present();
  }

}
