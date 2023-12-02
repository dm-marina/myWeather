import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { SettingsService } from 'src/app/shared/settings.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  authForm:NgForm;
  active:boolean = true;
  isLogginMode:boolean = true;
  error=null;
  isAuthenticated:boolean=false;
  alertButtons = ['Close'];
  toDark:boolean;
  toDarkSub:Subscription;
  constructor(
    private authService:AuthService, 
    private settingsService:SettingsService,
    private alertController:AlertController){}

  onSwitchMode(){
    this.active = this.active;
    this.isLogginMode = !this.isLogginMode;
  }
  ngOnInit(){
    this.toDarkSub = this.settingsService.toDarkSubject.subscribe(
      (toDark)=>{
        this.toDark = toDark;
      }
    );
  }
  onSubmit(form:NgForm){
    if(!form.valid){
      return
    }
    let authObs: Observable<AuthResponseData>;
    this.authService.name = form.value.name;
    this.authService.sname = form.value.sname;
    this.authService.email = form.value.email;
    this.authService.password = form.value.password;

     if(this.isLogginMode){
      authObs = this.authService.login( this.authService.email,  this.authService.password);
     }else{
      authObs = this.authService.signup( 
            this.authService.name,  
            this.authService.sname,  
            this.authService.email, 
            this.authService.password);
     }
     authObs.subscribe({
      next:(resData)=>{
        this.isAuthenticated=true;
        this.authService.isAuthentificated.next(this.isAuthenticated)
        console.log(resData);
      },
      error:(errorMessage)=>{
        console.log(errorMessage);
        this.error = errorMessage;
        this.presentAlert();
      }
    });
    form.reset();
  }
  onLogout(){
    this.authService.logout();
    this.isAuthenticated =false;
    this.authService.isAuthentificated.next(this.isAuthenticated);
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
