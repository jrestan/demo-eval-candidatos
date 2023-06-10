import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IListRestrictive, ISenInfoFinResponse } from '../interfaces/info-financiera';
import { IUsers, UserData } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class ProtectedService {

  private baseUrl: string = environment.baseUrlDash;
  private baseUrlMockup: string = environment.baseUrlMockup;
  
  constructor(private http: HttpClient) { }

  buscarInfoFinancieraPorDNI(dni: string): Observable<ISenInfoFinResponse>{
    
    const url = `${this.baseUrl}/financial/detail`;
    const autorization = 'Bearer '+sessionStorage.getItem('token')||'';
        
    //const headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY4MjI5MTEzNSwiZXhwIjoxNjgyMzc3NTM1fQ.kndSiPy_79O7RPJeRZBe--kQNUV6llwNHId6CU_adB0BLwtbE3xuWNK6rsx6ci_DCQBUJcVnhZnbnphyjQU1fg');
    //const params = new HttpParams().set('document_type', 'D').set('document_number',dni);

    const headers = new HttpHeaders().set('Authorization', autorization);

    const myObject: any = { document_type: 'D', document_number: dni};
    const httpParams: HttpParamsOptions = { fromObject: myObject } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers: headers };
    
    
    return this.http.get<ISenInfoFinResponse>(url, options );
  }
  
  buscarInfoFinancieraPorDNI_V2(tipodoc: string, dni: string): Observable<ISenInfoFinResponse>{
    
    const url = `${this.baseUrl}/financial/v2/detail`;
    const autorization = 'Bearer '+sessionStorage.getItem('token')||'';
    
    const headers = new HttpHeaders().set('Authorization', autorization);

    const myObject: any = { document_type: tipodoc, document_number: dni};

    const httpParams: HttpParamsOptions = { fromObject: myObject } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers: headers };
    
    return this.http.get<ISenInfoFinResponse>(url, options );
  }

  buscarInfoFinanciera_DocRelacionado(href: string): Observable<ISenInfoFinResponse>{
    
    const url = `${this.baseUrl}${href}`;
    const autorization = 'Bearer '+sessionStorage.getItem('token')||'';
    
    const headers = new HttpHeaders().set('Authorization', autorization);
    
    return this.http.get<ISenInfoFinResponse>(url, {headers: headers});
  }

  buscarInfoFinanciera_HipeLink(href: string): Observable<ISenInfoFinResponse>{
    
    const url = `${this.baseUrl}${href}`;
    const autorization = 'Bearer '+sessionStorage.getItem('token')||'';
    
    const headers = new HttpHeaders().set('Authorization', autorization);
    
    return this.http.get<ISenInfoFinResponse>(url, {headers: headers});
  }
  

  buscarListasRestrictivas(href: string): Observable<IListRestrictive>{
    
    //const url = `${this.baseUrlMockup}${href}`;
    const url = `${this.baseUrl}${href}`;
    const autorization = 'Bearer '+sessionStorage.getItem('token')||'';

    //console.log('URL Listas Restrictivas', url);
        
    const headers = new HttpHeaders().set('Authorization', autorization);
    
    return this.http.get<IListRestrictive>(url, {headers: headers});
  }

  buscarUsuariosDelSistema(href: string): Observable<IUsers>{

    const url = `${this.baseUrl}${href}`;
    const autorization = 'Bearer '+sessionStorage.getItem('token')||'';
    
    const headers = new HttpHeaders().set('Authorization', autorization);
    
    return this.http.get<IUsers>(url, {headers: headers});

  }

  buscarUsuario(id: number): Observable<UserData>{

    const url = `${this.baseUrl}/api/v1/users/${id}`;
    const autorization = 'Bearer '+sessionStorage.getItem('token')||'';
    
    const headers = new HttpHeaders().set('Authorization', autorization);
    
    return this.http.get<UserData>(url, {headers: headers});

  }

  eliminarUsuario(id: number) {

    const url = `${this.baseUrl}/api/v1/users/${id}`;
    const autorization = 'Bearer '+sessionStorage.getItem('token')||'';
    
    const headers = new HttpHeaders().set('Authorization', autorization);
    
    return this.http.delete(url, {headers: headers});
  }

  agregarUsuario(body: Object){

    const url = `${this.baseUrl}/api/v1/users`;
    const autorization = 'Bearer '+sessionStorage.getItem('token')||'';

    const headers = new HttpHeaders().set('Authorization', autorization);
    
    //const body = {username: 'user', password: '1234'};
    //const body = {"username": "prosales", "password": "prosales", "profile": "CONSUL", "fullname": "Pablo Rosales Arevalo" }

    return this.http.post(url, body, {headers: headers});
  }

  actualizarUsuario(id: number, body: Object){

    const url = `${this.baseUrl}/api/v1/users/${id}`;
    const autorization = 'Bearer '+sessionStorage.getItem('token')||'';
    
    const headers = new HttpHeaders().set('Authorization', autorization);
    
    return this.http.put(url, body, {headers: headers});
  }
  


}
