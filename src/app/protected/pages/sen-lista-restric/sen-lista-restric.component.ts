import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProtectedService } from '../../services/protected.service';
import { IListRestrictive, ISenInfoFinResponse, FinancialHealth } from '../../interfaces/info-financiera';

import * as html2pdf from 'html2pdf.js';
import { CommonService } from '../../../common/services/common.service';
import { AuthService } from '../../../auth/services/auth.service';
import { USER_TYPES } from 'src/app/common/constants/common.constants';

@Component({
  selector: 'app-sen-lista-restric',
  templateUrl: './sen-lista-restric.component.html',
  styles: [
  ]
})

export class SenListaRestricComponent implements OnInit{

  constructor(
    private fb: FormBuilder,
    private protecService: ProtectedService,
    private authService: AuthService,
    private datePipe: DatePipe,
    public commonService: CommonService) {}


  miFormulario: FormGroup = this.fb.group({
    tipodoc: ['D', [Validators.required] ],
    dni: ['', [Validators.required, Validators.minLength(8), Validators.pattern("^[0-9]*$")]],
  });

  datosEncontrados: boolean = false;
  errorBusqueda: boolean = false;
  messageError: string = "";
  inibusqueda : boolean = false;

  sinDatosEncontradosLR: boolean = false;
  datosEncontradosLR: boolean = false;
  errorBusquedaLR: boolean = false;
  inibusquedaLR: boolean = false;
  

  senInfoFinanciera!: ISenInfoFinResponse;
  financialHealth: FinancialHealth[] = [];
  senListaRestric!: IListRestrictive;

  msgSinInformacion: string = 'Sin información para mostrar';
    
  //strClassColHead1: string = 'col text-white fw-bold text-center d-flex align-items-center justify-content-center';
  strClassColHead1: string = 'col text-center d-flex align-items-center justify-content-center';
  //strStyleColHead1: string = 'background-color: #1F618D; min-height: 35px;';

  //strClassColHead2: string = 'col-sm-12 text-white fw-bold d-flex align-items-center';
  strClassColHead2: string = 'col-sm-12 d-flex align-items-center';
  //strStyleColHead2: string = 'background-color: #626567; min-height: 35px;';
  
  //strClassColHead3: string = 'col border text-white text-center d-flex align-items-center justify-content-center';
  strClassColHead3: string = 'col border text-center d-flex align-items-center justify-content-center';
  //strStyleColHead3: string = 'background-color: #A6ACAF; min-height: 35px;';
  
  strClassColContRep: string = 'col ms-2 text-white d-flex align-items-center justify-content-start';
  //strStyleColContRep: string = 'background-color: #0393DD; height: 50px; font-size: 16px; ';

  strClassColSeccSide: string = 'col ms-2 d-flex align-items-center justify-content-start';
  //strStyleColSeccSide: string = 'background-color: #D2D2D7; height: 50px; font-size: 16px; ';
  
  classColContent_Left: string = 'col border d-flex align-items-center';
  classColContent_Center: string = 'col border d-flex align-items-center justify-content-center';
  classColContent_Right: string = 'col border d-flex align-items-center justify-content-end';
  
  
  cabeceraDatosGenerales: string[][] =[];
  cabeceraListaRestric: string[][] = [];
  cabeceraListaPEPs: string[][] = [];
  descSemaforos: string[][] = [];
  tipoDocumento: string[][] = [];

  maxLengthInput: number = 8;
  placeholderInput: string = "Ingrese DNI";
  tipoDoc: string = 'D';

  isUserSoloConsulta: boolean = false;
    
  ngOnInit(): void {
    
    const tipoUser = this.authService.obtenerTipoUsuarioLogueado();
    this.isUserSoloConsulta = (tipoUser===USER_TYPES.CONSUL);

    this.cabeceraDatosGenerales = this.commonService.cabeceraDatosGeneralesLR;
    this.cabeceraListaRestric = this.commonService.cabeceraListaRestric;
    this.cabeceraListaPEPs = this.commonService.cabeceraListaPEPs;
    this.descSemaforos = this.commonService.descSemaforos;
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

    const {tipodoc, dni} = this.miFormulario.value;

    this.tipoDoc = tipodoc;

    this.enableInputs(false);

    this.protecService.buscarInfoFinancieraPorDNI_V2(tipodoc, dni)
        .subscribe((infoFinResp)=>{
          console.log('infofin', infoFinResp);

          this.enableInputs(true);

          this.senInfoFinanciera = infoFinResp;

          this.financialHealth.splice(0);
          this.financialHealth.push(this.senInfoFinanciera.financial_health);

          this.buscarDocumentRelacionados(infoFinResp);

          this.buscarListasRestrictivas(infoFinResp);
                    
          //this.validarDatosEncontrados(infoFinResp);

          this.datosEncontrados = true;
          this.inibusqueda = false;

        },(err)=>{  //(err: HttpErrorResponse)
          const msgError = this.commonService.obtenerStatusDescriptionMsgError(err.status, err.error);
                    
          //console.log('Error', msgError);
          this.enableInputs(true);
          this.errorBusqueda = true;
          this.messageError = msgError;
          this.inibusqueda = false;
        });
    
  }

  iniciarBusquedaDocRelacionado(hRef: string){

    this.protecService.buscarInfoFinanciera_HipeLink(hRef)
        .subscribe((infoFinResp)=>{
                   
          //console.log('documentos relacionados', infoFinResp);
          
          if(infoFinResp?.financial_health!==undefined){
            this.financialHealth.push(infoFinResp.financial_health);
          }
          
        },(err)=>{  //(err: HttpErrorResponse)

          //this.buscarRepresentanteLegaDe();
          
        });
  }


  iniciarBusquedaListRestric(hRef: string){
    this.sinDatosEncontradosLR = false;
    this.errorBusquedaLR = false;
    this.datosEncontradosLR = false;
    this.inibusquedaLR = true;

    this.enableInputs(false);

    this.protecService.buscarListasRestrictivas(hRef)
        .subscribe((listRestric)=>{

          console.log('listRestric', listRestric);

          this.enableInputs(true);
          
          this.senListaRestric = listRestric;

          if(this.senListaRestric.notices.length){
            this.datosEncontradosLR = true;
          }else{
            this.sinDatosEncontradosLR = true;
          }
          
          this.inibusquedaLR = false;

        },(err)=>{  //(err: HttpErrorResponse)
          //console.log('err', err);
          const msgError = this.commonService.obtenerStatusDescriptionMsgError(err.status, err.error);
          
          //console.log('Error', msgError);
          this.enableInputs(true);
          this.errorBusqueda = true;
          this.messageError = msgError;
          this.inibusquedaLR = false;
        });
    
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
        //this.sinDatosEncontradosLR = true;
      }
    }
  }
    

  buscarListasRestrictivas(senInfoFinanciera: ISenInfoFinResponse){
    /*let hRef: string = '';
    
    senInfoFinanciera.links.forEach(element => {
      //console.log('rel', element.rel);
      if(element.rel==='listRestricted'){ hRef = element.href; }
    });

    if(hRef.length>0){

      this.iniciarBusquedaListRestric(hRef);

    }else{
      this.sinDatosEncontradosLR = true;
    }*/
    
    let hRef: string = '';

    if(senInfoFinanciera?.links!==undefined){
      
      for (let i=0; i<senInfoFinanciera?.links.length; i++) {
        
        if(senInfoFinanciera?.links[i].rel==='listRestricted'){
          hRef = senInfoFinanciera?.links[i].href;
          break;
        }
      }
      
      if(hRef.length>0){

        this.iniciarBusquedaListRestric(hRef);

      }else{
        this.sinDatosEncontradosLR = true;
      }
    }


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

  generarPDF()
  {
    const element = document.getElementById('print');

    //const main_container_width = element!.style.width;
    //console.log('with', main_container_width);
    
    const options = {
      filename: `${this.miFormulario.value.dni}.pdf`,
      image: { type: 'png', quality: 0.98 },
      html2canvas: { scale: 1.5, dpi: 200},
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
      margin: 5
    };
    html2pdf().set(options).from(element).save();

  }
  
}
