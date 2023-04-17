import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse, AuthResponse, Usuario } from '../interfaces/interface';

import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;   //baseUrl es la url del backend
  private _usuario!: Usuario;

  get usuario(){
    return { ...this._usuario}
  }

  constructor(private http: HttpClient) { }


  register(name: string, email: string, password: string){

    const url = `${this.baseUrl}/auth/new`;
    const body = {name, email, password};

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp=> {
          if(resp.ok){
            localStorage.setItem('token', resp.token!);

            /*
            //Al final ya no es necesario poner este codigo aqui, basta con el que esta en el validarToken()
            //esto se debe a que validarToken() esta dentro de los guards
            this._usuario={
              name: resp.name!,
              uid: resp.uid!,
              email: resp.email!
            }
            */
          }
        }),
        map(resp=> resp.ok),
        catchError(err=> of(err.error.msg))
      );

  }


  login(username: string, password: string){
    
    const url = `${this.baseUrl}/auth/token`;
    //const url = `${this.baseUrl}/auth`;
    const body = {username, password};
    
    return this.http.post<LoginResponse>(url, body)
      .pipe(
        tap(resp=> {
          
          //if(resp.ok){
            localStorage.setItem('token', resp.token!);
            
            /*
            //Al final ya no es necesario poner este codigo aqui, basta con el que esta en el validarToken()
            //esto se debe a que validarToken() esta dentro de los guards
            this._usuario={
              name: resp.name!,
              uid: resp.uid!,
              email: resp.email!
            }
            */
          //}
          console.log("resp", resp);
          console.log("resp error", resp.error);
          console.log("resp token", resp.token);
          
        }),
        map(resp=> true /*resp.ok*/),
        //catchError(err=> of(err.error.msg))
        catchError(err=> of(err.error.error))
      );
  }

  validarToken(){

    //const url = `${this.baseUrl}/auth/renew`;
    //const headers = new HttpHeaders().set('x-token', localStorage.getItem('token')||'');
    
    const myRawToken = localStorage.getItem('token')||'';

    console.log("myRawToken",myRawToken);
    
    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(myRawToken);
    console.log("decodedToken",decodedToken);

    const expirationDate = helper.getTokenExpirationDate(myRawToken);
    console.log("expirationDate",expirationDate);

    const isExpired = helper.isTokenExpired(myRawToken);
    console.log("isExpired",isExpired);
    
    return of(!isExpired);
    /*
    return this.http.get<AuthResponse>(url, {headers: headers})
            .pipe(
              map(resp=>{

                //Se vuelve a ejecutar esto porque al revalidar genera un nuevo token
                localStorage.setItem('token', resp.token!);
                this._usuario={
                  name: resp.name!,
                  uid: resp.uid!,
                  email: resp.email!
                }

                return resp.ok
              }),
              catchError( err => of(false) )
            );*/

  }

  logout(){
    //localStorage.removeItem('token');
    localStorage.clear();
  }
}
