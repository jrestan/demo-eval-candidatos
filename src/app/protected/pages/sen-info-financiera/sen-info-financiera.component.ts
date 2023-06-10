import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { HttpErrorResponse } from '@angular/common/http';

import { ProtectedService } from '../../services/protected.service';
import { ISenInfoFinResponse, GeneralData, ISemaforoRes, FinancialHealth, BusquedaLinks, AuthorizedOf, Data } from '../../interfaces/info-financiera';

import * as html2pdf from 'html2pdf.js';

//import html2canvas from 'html2canvas';
//import { jsPDF } from 'jspdf';
//import { HttpStatusCode } from '@angular/common/http';
import { CommonService } from 'src/app/common/services/common.service';
import { USER_TYPES } from 'src/app/common/constants/common.constants';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-sen-info-financiera',
  templateUrl: './sen-info-financiera.component.html',
  styles: [
  ]
})
export class SenInfoFinancieraComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    tipodoc: ['D', [Validators.required] ],
    dni: ['', [Validators.required, Validators.minLength(8), Validators.pattern("^[0-9]*$")]]
  });


  constructor(
    private fb: FormBuilder,
    private protecService: ProtectedService,
    private authService: AuthService,
    private datePipe: DatePipe,
    public commonService: CommonService) {

  }
  
  datosEncontrados: boolean = false;
  errorBusqueda: boolean = false;
  messageError: string = "";
  inibusqueda : boolean = false;
  finTodabusqueda : boolean = false;

  msgSinInformacion: string = 'Sin información para mostrar';

  //strClassColHead1: string = 'col text-white fw-bold text-center d-flex align-items-center justify-content-center';
  //strClassColHead2: string = 'col-sm-12 text-white fw-bold d-flex align-items-center';
  //strClassColHead3: string = 'col border text-white text-center d-flex align-items-center justify-content-center';
  
  strClassColHead1: string = 'col text-center d-flex align-items-center justify-content-center';
  strStyleColHead1: string = 'background-color: #1F618D; min-height: 35px;';

  
  strClassColHead2: string = 'col-sm-12 d-flex align-items-center';
  strStyleColHead2: string = 'background-color: #626567; min-height: 35px;';
  
  
  strClassColHead3: string = 'col border text-center d-flex align-items-center justify-content-center';
  strStyleColHead3: string = 'background-color: #A6ACAF; min-height: 35px;';

                               
  strClassColContRep: string = 'col ms-2 text-white d-flex align-items-center justify-content-start';
  strStyleColContRep: string = 'background-color: #0393DD; height: 50px; font-size: 16px; ';

  strClassColSeccSide: string = 'col ms-2 d-flex align-items-center justify-content-start';
  strStyleColSeccSide: string = 'background-color: #D2D2D7; height: 50px; font-size: 16px; ';

  
  classColContent_Left: string = 'col border d-flex align-items-center';
  classColContent_Center: string = 'col border d-flex align-items-center justify-content-center';
  classColContent_Right: string = 'col border d-flex align-items-center justify-content-end';

  
    
  senInfoFinanciera!: ISenInfoFinResponse;
  financialHealth: FinancialHealth[] = [];
  busquedaLinks: BusquedaLinks[] = [];
  authorizedOf: AuthorizedOf[] = [];
  
  
  descSemaforos: string[][] = [];
  descCalifSBS: string[][] = [];
  cabeceraResumenFinanciero: string[][] = [];
  cabeceraDatosGenerales: string[] = [];
  cabeceraSbsMicrofinanzas: string[] = [];
  cabeceraTarjetasCredito: string[] = [];
  cabeceraDetOtrosVencidos: string[] = [];
  cabeceraOtrosCreditos: string[] = [];
  cabeceraRepresenLegalDe: string[][] = [];
  datosPrinc: string[][] = [];
  contenidoReporte: string[][] = [];
  tipoDocumento: string[][] = [];
  
  
  maxLengthInput: number = 8;
  placeholderInput: string = "Ingrese DNI";
  tipoDoc: string = 'D';

  isUserSoloConsulta: boolean = false;
  
  ngOnInit(): void {

    const tipoUser = this.authService.obtenerTipoUsuarioLogueado();
    this.isUserSoloConsulta = (tipoUser===USER_TYPES.CONSUL);
    
    this.descSemaforos = this.commonService.descSemaforos;
    this.descCalifSBS = this.commonService.descCalifSBS;
    this.cabeceraResumenFinanciero = this.commonService.cabeceraResumenFinanciero;
    this.cabeceraDatosGenerales = this.commonService.cabeceraDatosGenerales;
    this.cabeceraSbsMicrofinanzas = this.commonService.cabeceraSbsMicrofinanzas;
    this.cabeceraTarjetasCredito = this.commonService.cabeceraTarjetasCredito;
    this.cabeceraDetOtrosVencidos = this.commonService.cabeceraDetOtrosVencidos;
    this.cabeceraOtrosCreditos = this.commonService.cabeceraOtrosCreditos;
    this.cabeceraRepresenLegalDe = this.commonService.cabeceraRepresenLegalDe;
    this.datosPrinc = this.commonService.datosPrinc;
    this.contenidoReporte = this.commonService.contenidoReporte;
    this.tipoDocumento = this.commonService.tipoDocumento;
        
    this.miFormulario.get('tipodoc')?.valueChanges
      .subscribe( tipodoc=>{
        //console.log(tipodoc);
        
        let doc: string[] = this.commonService.obtenerDatosTipoDoc(tipodoc);
        if(doc.length>0){
          //console.log(doc);
          this.maxLengthInput = parseInt(doc[3]);
          const minlen = parseInt(doc[4])
          this.placeholderInput = doc[2];
          this.miFormulario.get('dni')?.reset('');  
          this.miFormulario.get('dni')?.clearValidators();
          this.miFormulario.get('dni')?.addValidators([Validators.required, Validators.minLength(minlen), Validators.pattern("^[0-9]*$")]);
        }
      });

  }
  
  iniciarBusqueda(){

    this.errorBusqueda = false;
    this.datosEncontrados = false;
    this.inibusqueda = true;
    this.finTodabusqueda = false;

    const {tipodoc, dni} = this.miFormulario.value;
    
    this.tipoDoc = tipodoc;
    
    //console.log(this.miFormulario.value);
    // const tipodoc = this.miFormulario.get('tipodoc')?.value;
    // const dni = this.miFormulario.get('dni')?.value;
    // console.log(tipodoc);
    // console.log(dni);

    this.enableInputs(false);
    
    
    this.protecService.buscarInfoFinancieraPorDNI_V2(tipodoc, dni)
        .subscribe((infoFinResp)=>{
          this.enableInputs(true);
          
          this.senInfoFinanciera = infoFinResp;

          //console.log('infofin', infoFinResp);
          //console.log('senInfoFinanciera', this.senInfoFinanciera);
          
          //this.validarDatosEncontrados(infoFinResp);
          this.obtenerDatosPrincipales(infoFinResp);
          this.obtenerContenidoReporte(infoFinResp);

          this.busquedaLinks.splice(0);
          this.authorizedOf.splice(0);

          this.financialHealth.splice(0);
          this.financialHealth.push(this.senInfoFinanciera.financial_health);

          this.buscarDocumentRelacionados(infoFinResp);
          
          //console.log('financialHealth', this.financialHealth);
          //console.log('authorizedOf', this.authorizedOf);
          
          this.datosEncontrados = true;
          this.inibusqueda = false;

        },(err)=>{  //(err: HttpErrorResponse)
          
          const msgError = this.commonService.obtenerStatusDescriptionMsgError(err.status, err.error);
          //console.log('err', err);
          //console.log('Error', msgError);
          
          this.enableInputs(true);
          this.errorBusqueda = true;
          this.messageError = msgError;
          this.inibusqueda = false;
        });
    //this.datosEncontrados = false;
  }

  iniciarBusquedaDocRelacionado(hRef: string){

    this.protecService.buscarInfoFinanciera_HipeLink(hRef)
        .subscribe((infoFinResp)=>{
          
          //console.log('documentos relacionados', infoFinResp);
          
          if(infoFinResp?.financial_health!==undefined){
            this.financialHealth.push(infoFinResp.financial_health);
          }
          
          this.buscarRepresentanteLegaDe();
          
        },(err)=>{  //(err: HttpErrorResponse)
          
          this.buscarRepresentanteLegaDe();
          
        });
  }

  iniciarBusquedaRepresentanteLegaDe(hRef: string, data: Data){

    this.protecService.buscarInfoFinanciera_HipeLink(hRef)
        .subscribe((infoFinResp)=>{
                   
          //console.log('representante legal', infoFinResp);
          
          this.authorizedOf.push(
            {
              document_type: infoFinResp.document_type,
              document_number: infoFinResp.document_number,
              fullname: infoFinResp.fullname,
              score_current: infoFinResp.financial_health.financial_summary.score_current,
              score_prev: infoFinResp.financial_health.financial_summary.score_prev,
              score_both: infoFinResp.financial_health.financial_summary.score_both,
              created_at: data.created_at,
              charge: data.charge,
              status: data.status
            }
          );
          //infoFinResp.general_data.actived_at,
          
          //console.log('Ok representante legal encontrado');
          
          this.buscarEnArrayRepresentanteLegaDe();
          
        },(err)=>{  //(err: HttpErrorResponse)
          //console.log('Err representante legal No encontrado');

          this.buscarEnArrayRepresentanteLegaDe();

        });
  }
  
  
  validarDatosEncontrados(senInfoFinanciera: ISenInfoFinResponse){
    let index: number = -1;

    for (let i=0; i<this.busquedaLinks.length; i++) {
      if(this.busquedaLinks[i].procesado===1){
        this.busquedaLinks[i].procesado=2;
      }
    }
  }


  buscarDocumentRelacionados(senInfoFinanciera: ISenInfoFinResponse){

    let hRef: string = '';

    if(senInfoFinanciera?.links!==undefined){
      
      for (let i=0; i<senInfoFinanciera?.links.length; i++) {
        
        if(senInfoFinanciera?.links[i].rel==='relDocument'){
          hRef = senInfoFinanciera?.links[i].href;
          break;
        }
      }
      
      if(hRef.length>0){

        this.iniciarBusquedaDocRelacionado(hRef);

      }else{
        
        this.buscarEnArrayRepresentanteLegaDe();

        //this.sinDatosEncontradosLR = true;
      }
    }
  }
  
  buscarEnArrayRepresentanteLegaDe(){
    //let hRef: string = '';
    let index: number = -1;

    for (let i=0; i<this.busquedaLinks.length; i++) {
      if(this.busquedaLinks[i].procesado===1){
        this.busquedaLinks[i].procesado=2;
      }
    }

    for (let i=0; i<this.busquedaLinks.length; i++) {
      if(this.busquedaLinks[i].procesado===0){
        this.busquedaLinks[i].procesado=1;
        //hRef = this.busquedaLinks[i].href;
        index = i;
        break;
      }
    }
    
    //if(hRef.length>0){
    if(index >= 0){
      
      this.iniciarBusquedaRepresentanteLegaDe(
              this.busquedaLinks[index].href, 
              this.busquedaLinks[index].data);

    }else{

      this.finTodabusqueda = true;
      
      //this.datosEncontrados = true;

      //console.log('authorizedOf final', this.authorizedOf);

      //this.sinDatosEncontradosLR = true;
    }
  }

  buscarRepresentanteLegaDe(){

    if(this.senInfoFinanciera?.links!==undefined){
      
      for (let i=0; i<this.senInfoFinanciera?.links.length; i++) {
        if(this.senInfoFinanciera?.links[i].rel==='esRepLegDe'){
          this.busquedaLinks.push({href: this.senInfoFinanciera?.links[i].href, procesado: 0, data: this.senInfoFinanciera?.links[i].data!});
        }
      }
      
      if(this.busquedaLinks.length>0){
        this.buscarEnArrayRepresentanteLegaDe();
      }else{
        this.finTodabusqueda = true;
        //this.sinDatosEncontradosLR = true;
      }
    }

  }

  obtenerDatosPrincipales(senInfoFinanciera: ISenInfoFinResponse){
    //Datos Principales
    for (let i=0; i<this.datosPrinc.length; i++) {
      const campo = this.datosPrinc[i][1];

      if(campo==='actived_at'||
         campo==='enrolled_at'){
          if(senInfoFinanciera.general_data[campo]==='0000-00-00'){
            this.datosPrinc[i][2] = '-';
          }else{
            this.datosPrinc[i][2] = this.datePipe.transform(senInfoFinanciera.general_data[campo]||'', 'dd/MM/yyyy')||'';
          }
      }else{
        this.datosPrinc[i][2] = senInfoFinanciera.general_data[campo]||'';
      }
    }
    //console.log('datosPrincipales', this.datosPrinc);
  }

  obtenerContenidoReporte(senInfoFinanciera: ISenInfoFinResponse){
    for (let i=0; i<this.contenidoReporte.length; i++) {
      const campo = this.contenidoReporte[i][1];
      
      if(campo===''){
        this.contenidoReporte[i][2]='';
      }else if(campo==='OK'){
        //Datos Generales
        this.contenidoReporte[i][2]='1';
      }
      else{
        //console.log(campo + '==>', senInfoFinanciera.financial_health?.[campo]);
        if(senInfoFinanciera.financial_health?.[campo]!==undefined){

           //console.log(campo + ' Length==>', senInfoFinanciera.financial_health?.[campo].length);

           if(senInfoFinanciera.financial_health?.[campo].length>0){
             this.contenidoReporte[i][2]='1';
           }
           else{
             this.contenidoReporte[i][2]='';
           }
        }
      }
    }
    //console.log('contenidoReporte', this.contenidoReporte);
  }
  
    
  obtenerSemaforoUltimosDoceMeses(credit_score: string, processed_at: Date): ISemaforoRes[]{
    
    //const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    const lenfal = (credit_score.length<12)?12-credit_score.length:0;
    const credaux = (lenfal>0)?String('X').repeat(lenfal)+credit_score:credit_score
    const cred_score = credaux.substring(credaux.length-12, credaux.length);

    // meses.reverse();
    // console.log('credit_score', credit_score);
    // console.log('credaux', credaux);
    // console.log('cred_score', cred_score);
    
    const array_credit_score: string[] = cred_score.split('');
    //
    //const fecha: number = new Date('2023-04-22').getMonth();
    //const numeroMes = fecha.getMonth();
    //console.log('numeroMes', fecha);

    //let mesIndex: number = new Date().getMonth();
    //let contaMeses: number = 0;
    let mesIndex: number = new Date(processed_at).getMonth();
    let result: ISemaforoRes[] = [];
    
    //console.log('Mes actual', mesIndex);
    mesIndex++;
    
    for (let i=0; i<array_credit_score.length; i++) {
      if(mesIndex===12)mesIndex=0;
      
      const mes = meses[mesIndex];
      const style = this.commonService.obtenerStyleColor_Codigo(array_credit_score[i]);
      
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
  
  obtenerStyleCalificacion(tipoCalif: string, typoVista: string): string{
    
    let style: string = "font-size: 12px; width:45px; ";

    if(typoVista==='med'){
      style = "font-size: 11px; width:40px; ";
    }

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

  enableInputs(enable: boolean){
    if(enable){
      this.miFormulario.get('tipodoc')?.enable();
      this.miFormulario.get('dni')?.enable();
      //this.miFormulario.controls['tipodoc']?.enable();
      //this.miFormulario.controls['dni']?.enable();
    }
    else{
      this.miFormulario.get('tipodoc')?.disable();
      this.miFormulario.get('dni')?.disable();
      //this.miFormulario.controls['tipodoc']?.disable();
      //this.miFormulario.controls['dni']?.disable();
    }
  }
  
  
  generarPDF() {
    
    const element = document.getElementById('print');

    //const main_container_width = element!.style.width;
    //console.log('with', main_container_width);
    
    const options = {
      filename: `${this.miFormulario.value.dni}.pdf`,
      image: { type: 'png', quality: 0.98 },
      html2canvas: { scale: 1.5, dpi: 200},
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      margin: 5
    };
    html2pdf().set(options).from(element).save();
    
    /*
    const element = document.getElementById('print');
    const scale = 2; // Valor de escala, ajusta según tus necesidades (0.5 para zoom out)

    html2canvas(element!, { scale }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, 0);
      pdf.save('tu-pagina.pdf');
    });
    */
    /*
    // Extraemos el
    const DATA = document.getElementById('print');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA!, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
    */
  
  }
}
