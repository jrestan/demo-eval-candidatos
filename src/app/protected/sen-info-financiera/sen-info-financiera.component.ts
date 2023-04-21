import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sen-info-financiera',
  templateUrl: './sen-info-financiera.component.html',
  styles: [
  ]
})
export class SenInfoFinancieraComponent {

  miFormulario: FormGroup = this.fb.group({
    dni: ['', [Validators.required, Validators.minLength(8)]],
  });

  datosEncontrados: boolean = false;


  constructor(private fb: FormBuilder) {}

  iniciarBusqueda(){

    this.datosEncontrados = true;

    console.log(this.datosEncontrados);
    

  }

}
