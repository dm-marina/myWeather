import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SettingsService } from '../shared/settings.service';
import { AuthService } from '../user/login/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent  implements OnInit {
  toDark:boolean;
  toDarkSub:Subscription;
  isAuth:boolean;
  isAuthSub:Subscription;
  constructor(private settingsService:SettingsService, private authService:AuthService) { }

  ngOnInit() {
    this.isAuthSub = this.authService.isAuthentificated.subscribe(
      (isAuth)=>{
        this.isAuth = isAuth;
        console.log(this.isAuth);
      })
    this.toDarkSub = this.settingsService.toDarkSubject.subscribe(
      (toDark)=>{
        this.toDark = toDark;
      }
    );
  }

}
