import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../shared/settings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent  implements OnInit {
  toDark:boolean;
  toDarkSub:Subscription;
  constructor(private settingsService:SettingsService) { }

  ngOnInit() {
    this.toDarkSub = this.settingsService.toDarkSubject.subscribe(
      (toDark)=>{
        this.toDark = toDark;
      }
    );
  }

}
