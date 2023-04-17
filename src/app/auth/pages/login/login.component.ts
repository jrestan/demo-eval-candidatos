import { Component } from '@angular/core';

//import {cilUser} from "@coreui/icons";

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    //email:    ['admin', [Validators.required, Validators.email]],
    username: ['admin', [Validators.required, Validators.minLength(5)]],
    password: ['123456', [] /*[Validators.required, Validators.minLength(6)]*/],
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private auteService: AuthService) {}

  login(){

    //this.auteService.validarToken().subscribe(console.log);
    
    console.log('Value', this.miFormulario.value);
    //console.log('Valid', this.miFormulario.valid);

    const {username, password} = this.miFormulario.value;
    
    this.auteService.login(username, password)
      .subscribe(result=>{
        console.log(result);
        if(result===true){
          this.router.navigateByUrl('/dashboard');
        }else{
          //TODO: mostrar mensaje de error
          Swal.fire('Error', result, 'error');
        }
      });
      
  }


}
