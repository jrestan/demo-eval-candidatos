import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISenInfoFinResponse } from '../interfaces/info-financiera';

@Injectable({
  providedIn: 'root'
})
export class ProtectedService {

  private baseUrl: string = environment.baseUrlDash;

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

}
