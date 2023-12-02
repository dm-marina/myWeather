import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({providedIn:'root'})
export class SettingsService{
    
    toCelsius:boolean=false;
    public toCelsiusSubject = new BehaviorSubject<boolean>(this.toCelsius);
    
    toDark:boolean=true;
    public toDarkSubject = new BehaviorSubject<boolean>(this.toDark);

    toKm:boolean=false;
    public toKmSubject = new BehaviorSubject<boolean>(this.toKm);


}