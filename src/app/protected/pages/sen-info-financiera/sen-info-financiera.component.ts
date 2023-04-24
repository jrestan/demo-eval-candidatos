import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { HttpErrorResponse } from '@angular/common/http';

import { ProtectedService } from '../../services/protected.service';
import { ISenInfoFinResponse, GeneralData, ISemaforoRes } from '../../interfaces/info-financiera';



@Component({
  selector: 'app-sen-info-financiera',
  templateUrl: './sen-info-financiera.component.html',
  styles: [
  ]
})
export class SenInfoFinancieraComponent {

  miFormulario: FormGroup = this.fb.group({
    dni: ['', [Validators.required, Validators.minLength(8), Validators.pattern("^[0-9]*$")]],
  });

  datosEncontrados: boolean = false;
  errorBusqueda: boolean = false;
  messageError: string = "";
  inibusqueda : boolean = false;
    
  senInfoFinanciera!: ISenInfoFinResponse;

  datosPrinc: string[][] = [
    ['RUC','ruc',''],
    ['Razon social','ruc_name',''],
    ['Nombre comercial','trade_name',''],
    ['Tipo de Contribuyente','trade_type',''],
    ['Estado del contribuyente','trade_status',''],
    ['Condicion del contribuyente','trade_condition',''],
    ['Dependencia','dependency',''],
    ['CIUU','ciuu',''],
    ['Inscripción','actived_at',''],
    ['Inicio de actividades','enrolled_at',''],
    ['Carnet Patronal','carnet_code',''],
    ['Folio','folio',''],
    ['Asiento','asiento',''],
    ['Direccion de domicilio fiscal','address',''],
  ];
  
  constructor(private fb: FormBuilder,
              private protecService: ProtectedService,
              private datePipe: DatePipe) {}

  iniciarBusqueda(){

    this.errorBusqueda = false;
    this.datosEncontrados = false;
    this.inibusqueda = true;

    const {dni} = this.miFormulario.value;

    this.protecService.buscarInfoFinancieraPorDNI(dni)
        .subscribe((infoFinResp)=>{
          console.log('infofin', infoFinResp);

          this.senInfoFinanciera = infoFinResp;

          this.validarDatosEncontrados(infoFinResp);

          this.datosEncontrados = true;
          this.inibusqueda = false;

        },(err)=>{  //(err: HttpErrorResponse)
          const msgError = 'Error: ' + err.status + '. '+err.message;
          console.log('Error', msgError);
          this.errorBusqueda = true;
          this.messageError = msgError;
          this.inibusqueda = false;
        });

    //this.datosEncontrados = false;
  }

  validarDatosEncontrados(senInfoFinanciera: ISenInfoFinResponse){

    //Datos Principales
    for (let i=0; i<this.datosPrinc.length; i++) {
      const campo = this.datosPrinc[i][1];

      if(campo==='actived_at'||
         campo==='enrolled_at'){
          this.datosPrinc[i][2] = this.datePipe.transform(senInfoFinanciera.general_data[campo]||'', 'dd/MM/yyyy')||'';
      }else{
        this.datosPrinc[i][2] = senInfoFinanciera.general_data[campo]||'';
      }
      //console.log(this.datosPrinc[i]);
    }

    // const fecha = '';
    // const datefor = this.datePipe.transform(fecha, 'dd/MM/yyyy')||'';
    // console.log('Date Pipe', datefor);

    // const semaforo = this.obtenerSemaforoUltimosDoceMeses("R16789");
    // console.log('Semaforo', semaforo);

  }

  getStyleColor(color: string): string{
    return "color: "+color;
  }

  getStyleColorDual(color: string[]): string{
    const color1 = color[0]||'#FFFFFF';
    const color2 = color[1]||color1;
    
    return `--fa-primary-color: ${color1}; --fa-secondary-color: ${color2};`;
  }

  obtenerStyleColor_Codigo(cod_color: string): string{
    const color0 = '#FFFFFF';
    let color1 = '';
    let color2 = '';

    switch(cod_color) {
      case "1":
      case "R":
        //Rojo
        color1 = '#dc3545'; color2 = '#dc3545';
        break;
      case "2":
      case "A":
        //Amarillo
        color1 = '#ffc107'; color2 = '#ffc107';
        break;
      case "3":
      case "G":
        //Gris
        color1 = '#6c757d'; color2 = '#6c757d';
        break;
      case "4":
      case "V":
        //Verde
        color1 = '#198754'; color2 = '#198754';
        break;
      case "6":
        //Rojo - Amarillo
        color1 = '#dc3545'; color2 = '#ffc107';
        break;
      case "7":
        //Rojo - Verde
        color1 = '#dc3545'; color2 = '#198754';
        break;
      case "8":
        //Amarillo - Rojo
        color1 = '#ffc107'; color2 = '#dc3545';
        break;
      case "9":
        //Amarillo - Verde
        color1 = '#ffc107'; color2 = '#198754';
        break;
      case "10":
        //Verde - Rojo
        color1 = '#198754'; color2 = '#dc3545';
        break;
      case "11":
        //Verde - Amarillo
        color1 = '#198754'; color2 = '#ffc107';
        break;
      case "12":
        //Gris - Rojo
        color1 = '#6c757d'; color2 = '#dc3545';
        break;
      case "13":
        //Gris - Amarillo
        color1 = '#6c757d'; color2 = '#ffc107';
        break;
      case "14":
        //Gris - Verde
        color1 = '#6c757d'; color2 = '#198754';
        break;
      case "16":
        //Rojo - Gris
        color1 = '#dc3545'; color2 = '#6c757d';
        break;
      case "17":
        //Amarillo - Gris
        color1 = '#ffc107'; color2 = '#6c757d';
        break;
      default:
        //Blanco
        color1 = '#FFFFFF'; color2 = '#FFFFFF';
        break;
    }
    
    return `--fa-primary-color: ${color1}; --fa-secondary-color: ${color2};`;
  }
  
  obtenerSemaforoUltimosDoceMeses(credit_score: string): ISemaforoRes[]{
    
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const lenfal = (credit_score.length<12)?12-credit_score.length:0;
    const credaux = (lenfal>0)?String('X').repeat(lenfal)+credit_score:credit_score
    const cred_score = credaux.substring(credaux.length-12, credaux.length);

    // meses.reverse();
    // console.log('credit_score', credit_score);
    // console.log('credaux', credaux);
    // console.log('cred_score', cred_score);
    
    const array_credit_score: string[] = cred_score.split('');
    let mesIndex: number = new Date().getMonth();
    let contaMeses: number = 0;
    let result: ISemaforoRes[] = [];
    
    for (let i=0; i<array_credit_score.length; i++) {
      if(mesIndex===12)mesIndex=0;
      
      const mes = meses[mesIndex];
      const style = this.obtenerStyleColor_Codigo(array_credit_score[i]);
      
      result.push({mes,style});
      mesIndex++;
    }

    /*[
      {"style":"", "mes":"Abril"}, {"style":"", "mes":"Mayo"}
    ]*/
    return result;
  }

  obtenerYearAnterior(){
    return new Date().getFullYear()-1;
  }

  obtenerYearActual(){
    return new Date().getFullYear();
  }
  
  obtenerStyleCalificacion(tipoCalif: string): string{
    
    let style: string = "font-size: 13px; width:50px; ";

    switch(tipoCalif){
    case "NOR":
      style = style + "background-color:#1E8449;";
      break;
    case "CPP":
      style = style + "background-color:#ffc107;";
      break;
    case "DEF":
      style = style + "background-color:#BA4A00;";
      break;
    case "DUD":
      style = style + "background-color:#dc3545;";
      break;
    case "PER":
      style = style + "background-color:#D7DBDD; color:#17202A;";
      break;
    case "SCAL":
      style = style + "background-color:#6c757d;";
      break;
    default:
      style = style + "background-color:#FFFFFF; color:#FFFFFF;";
      break;
    }
    return style;    
  }

  validarSoloNumeros(e: any): boolean {
    this.errorBusqueda = false;
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false
    }
    return true
  }


}
