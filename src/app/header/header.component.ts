import { Component, OnInit} from '@angular/core';
import { City } from '../shared/city.model';
import { Subscription } from 'rxjs';
import { DataStorage } from '../shared/data-storage.service';
import { NgForm } from '@angular/forms';
import { SettingsService } from '../shared/settings.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit{
  city:City;
  searchStr:string;
  citySub:Subscription;
  coordsSub:Subscription;
  toDark:boolean;
  toDarkSub:Subscription;
  error=null;
  alertButtons = ['Close'];
  constructor(
    private dataStorage:DataStorage, 
    private settingsService:SettingsService,
    private alertController:AlertController){}
  onSubmit(form:NgForm){}
  ngOnInit(): void {
    this.citySub = this.dataStorage.cityListName.subscribe((cityName)=>{
      this.searchStr = cityName;
    })
    this.coordsSub = this.dataStorage.cityNameSub.subscribe((cityName)=>{
      this.searchStr = cityName
    })
    this.toDarkSub = this.settingsService.toDarkSubject.subscribe(
      (toDark)=>{
        this.toDark = toDark;
      }
    )
  }
  searchCity(){
    this.dataStorage.getCityByName(this.searchStr).subscribe({
      next:(city:City)=>{
        this.dataStorage.city = city
        this.dataStorage.cityName = this.searchStr;
        this.dataStorage.cityNameSub.next(this.searchStr)
        return this.dataStorage.city
      },
      error:(errorMessage)=>{
        console.log(errorMessage);
        this.error = errorMessage;
        this.presentAlert();
      }
    })
    this.dataStorage.getDays(this.searchStr).subscribe();
    this.dataStorage.getCurrentWeather(this.searchStr).subscribe()
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
