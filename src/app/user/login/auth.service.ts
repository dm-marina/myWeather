import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';
import { catchError,  tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { User } from './user.model';
import{environment} from '../../../environments/environment';
export interface AuthResponseData{
    name:string,
    sname:string,
    kind:string,
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId: string,
    registered?:boolean
}

@Injectable({providedIn:'root'})
export class AuthService{
    isAuthentificated = new BehaviorSubject<boolean>(false);
    firebaseAPI = environment.firebaseAPI;
    @Output()name!:string;
    @Output()sname!:string;
    @Output()email!:string;
    @Output()password!:string;

    constructor(private http:HttpClient, private router:Router){}

    user= new BehaviorSubject<User|any>(null);
   

    private tokenExpirationTimer:any;
    userChanged = new Subject<User[]>();

    signup(name:string, sname:string, email:string, password:string){
        return this.http.post<AuthResponseData>
        (`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.firebaseAPI}`,
        {
            name:name,
            sname:sname,
            email: email,
            password: password,
            returnSecureToken: true
        }
        )
        .pipe(
            catchError(this.handleError), tap(resData=>{
                this.handleAuthentication(
                    resData.name,
                    resData.sname,
                    resData.email, 
                    resData.localId, 
                    resData.idToken, 
                    +resData.expiresIn
                );
            }))
    }
    login(email:string, password:string){
        return this.http
         .post<AuthResponseData>
         (`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.firebaseAPI}`,
         { 
            email: email,
            password: password,
            returnSecureToken: true
         })
         .pipe(catchError(this.handleError), tap(resData=>{
             this.handleAuthentication(
                resData.name,
                resData.sname,
                 resData.email, 
                 resData.localId, 
                 resData.idToken, 
                 +resData.expiresIn
             );
         }))
    }
    logout(){
        this.user.next(null);
        localStorage.removeItem('userData')
    }
    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(()=>{
            this.logout();
        },expirationDuration)
    }
    autoLogin(){
        const userData:{
            name:string,
            sname:string,
            email:string,
            id:string,
            _token:string,
            _tokenExpirationDate:string,

        } = JSON.parse(localStorage.getItem('userData')||'{}');
        if(!userData){
            return;
        }

        const loadedUser= 
            new User(userData.name, 
                userData.sname, 
                userData.email, 
                userData.id, 
                userData._token, 
                new Date(userData._tokenExpirationDate)
            );

        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime()-new Date().getTime()
            this.autoLogout(expirationDuration)
        }
    }

    private handleAuthentication(name:string, sname:string, email: string, userId:string, token:string, expiresIn:number){
        const expirationDate = new Date(new Date().getTime()+ expiresIn*1000)
             const user = new User(
                name,
                sname,
                email, 
                userId, 
                token, 
                expirationDate
            );
            this.user.next(user);
            this.autoLogout(expiresIn*1000)
            localStorage.setItem('userData',JSON.stringify(user))
    }
    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = 'some error'
            if(!errorRes.error || !errorRes.error.error){
                return throwError(()=>errorMessage)
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                  errorMessage = 'This email exists ';
                  break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage='This email does not exists';
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage='This password is uncorrect';
              }
              return throwError(()=>errorMessage)
    }
}