import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  miFormulario: FormGroup = this.fb.group({
    name:    ['test4', [Validators.required, Validators.minLength(5)]],
    email:    ['test4@test.com', [Validators.required, Validators.email]],
    password: ['987655ABC', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private auteService: AuthService) {}

  registrar(){

    console.log('Value', this.miFormulario.value);
    //console.log('Valid', this.miFormulario.valid);

    const {name, email, password} = this.miFormulario.value;

    this.auteService.register(name, email, password)
      .subscribe(result=>{
        console.log(result);
        if(result===true){
          this.router.navigateByUrl('/dashboard');
        }else{
          //TODO: mostrar mensaje de error
          //Swal.fire('Error', result, 'error');
        }
      });

    //this.router.navigateByUrl('/dashboard');
    
  }

}
