import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/shared/settings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent  implements OnInit {
  checked:boolean=false;
  toCelsius:boolean = false;
  toDark:boolean;
  toDarkSub:Subscription;
  toKm:boolean=false;
  constructor(private settingsService:SettingsService) { }

  ngOnInit() {
    this.toDarkSub = this.settingsService.toDarkSubject.subscribe(
      (toDark)=>{
        this.toDark = toDark;
      }
    );
  }
  runDarkMode(){
    this.checked !==this.checked;
    this.settingsService.toDark = this.checked;
    this.settingsService.toDarkSubject.next(this.settingsService.toDark);
  }

  dataToCelsius(){
    this.settingsService.toCelsiusSubject.next(!this.settingsService.toCelsius);
  }
  dataToKm(){
    this.settingsService.toKm =this.toKm;
    this.settingsService.toKmSubject.next(!this.settingsService.toKm);
  }
}
