import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

import { USER_TYPES } from 'src/app/common/constants/common.constants';

@Component({
  selector: 'app-up-menu',
  templateUrl: './up-menu.component.html',
  styles: [  ]
})
export class UpMenuComponent {

  
  isAdmin: boolean = false;

  constructor(private router: Router,
    private authService: AuthService) {

      const tipoUser = authService.obtenerTipoUsuarioLogueado();
      this.isAdmin = (tipoUser===USER_TYPES.ADMIN);
    }


  logout(){
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }

}

/*
`
    body {
      background: #f2f2f2;
    }
    
    .navbar .nav-item:not(:last-child) {
      margin-right: 35px;
    }
    
    .dropdown-toggle::after {
      transition: transform 0.15s linear; 
    }
    
    .show.dropdown .dropdown-toggle::after {
      transform: translateY(3px);
    }
    
    .dropdown-menu {
      margin-top: 0;
    }
  `
*/