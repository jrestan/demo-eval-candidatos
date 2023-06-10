import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { USER_TYPES } from '../common/constants/common.constants';

@Injectable({
  providedIn: 'root'
})
export class ValidarTipoUserGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
    private router: Router){}
      
  /*
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }*/

  canActivate(): Observable<boolean> | boolean {
    
    const tipoUser = this.authService.obtenerTipoUsuarioLogueado();
    
    return of(tipoUser===USER_TYPES.ADMIN).pipe(
      tap(valid=>{
        if(!valid){
          this.router.navigateByUrl('/home');
        }
      })
    );
  }


  /*
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }*/
  canLoad(): Observable<boolean> | boolean {

    const tipoUser = this.authService.obtenerTipoUsuarioLogueado();
    //return (tipoUser===USER_TYPES.ADMIN);
    
    return of(tipoUser===USER_TYPES.ADMIN).pipe(
      tap(valid=>{
        if(!valid){
          this.router.navigateByUrl('/home');
        }
      })
    );
  }


}
