import { Component, OnInit } from '@angular/core';

//import {cilUser} from "@coreui/icons";

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

//import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./style.css', './sign-in.css'],
  styles: [
  ]
})
export class LoginComponent implements OnInit{

  miFormulario: FormGroup = this.fb.group({
    //email:    ['admin', [Validators.required, Validators.email]],
    username: ['admin', [Validators.required, Validators.minLength(5)]],
    password: ['123', [Validators.required, Validators.minLength(3)]],
  });

  iniLogin: boolean = false;
  errorLogin: boolean = false;
  messageError: string = "";

  constructor(private fb: FormBuilder,
              private router: Router,
              private auteService: AuthService) {}


  ngOnInit(): void {
    /*
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    });
    */  
  }


  login(){

    //this.auteService.validarToken().subscribe(console.log);
    
    //console.log('Value', this.miFormulario.value);
    //console.log('Valid', this.miFormulario.valid);

    this.errorLogin = false;
    this.iniLogin = true;

    this.enableInputs(false);
    
    const {username, password} = this.miFormulario.value;
    
    this.auteService.login(username, password)
      .subscribe(result=>{
        console.log(result);
        if(result===true){
          this.enableInputs(true);
          this.iniLogin = false;
          this.router.navigateByUrl('/dashboard');
        }else{
          //TODO: mostrar mensaje de error
          //Swal.fire('Error', result, 'error');
          this.enableInputs(true);
          this.messageError = result;
          this.errorLogin = true;
          this.iniLogin = false;
          
        }
      });
  }

  enableInputs(enable: boolean){
    if(enable){
      this.miFormulario.controls['username'].enable();
      this.miFormulario.controls['password'].enable();
    }
    else{
      this.miFormulario.controls['username'].disable();
      this.miFormulario.controls['password'].disable();
    }
  }


}
