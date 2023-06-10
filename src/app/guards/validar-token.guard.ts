import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private router: Router){}

  /*canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return true;
  }*/
  canActivate(): Observable<boolean> | boolean {
    
    //console.log('canActivate');
    
    //return true;
    return this.authService.validarToken()
            .pipe(
              tap(valid=>{
                if(!valid){
                  this.router.navigateByUrl('/auth')
                }
              })
            );
  }

  /*canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }*/
  canLoad(): Observable<boolean> | boolean {

    //console.log('canLoad');

    //return true;
    return this.authService.validarToken()
            .pipe(
              tap(valid=>{
                if(!valid){
                  this.router.navigateByUrl('/auth')
                }
              })
            );
  }

}
