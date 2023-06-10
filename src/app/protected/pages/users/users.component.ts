import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CommonService } from 'src/app/common/services/common.service';
import { ProtectedService } from '../../services/protected.service';

import { USERS, USER_STATUS, classColContent_Center, classColContent_Left, classColContent_Right, msgSinInformacion, strClassColHead1, strClassColHead2, strClassColHead3 } from 'src/app/common/constants/common.constants';
import { IUsers, UserData } from '../../interfaces/users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit{

  miFormulario: FormGroup = this.fb.group({
    fullname: ['', [Validators.required]],
    nameuser: ['', [Validators.required, Validators.minLength(2),Validators.pattern(/^[a-zA-Z0-9]+$/)]],
    claveac: ['', [Validators.required, Validators.minLength(8),Validators.pattern(/^[a-zA-Z0-9]+$/)]],
    profile: ['', [Validators.required]],
    status: ['', [Validators.required]]
  });
  
  constructor(
    private fb: FormBuilder,
    private protecService: ProtectedService,
    private authService: AuthService,
    public commonService: CommonService) {}

  users!: IUsers;
  userData!: UserData;
  datosEncontrados: boolean = false;
  errorBusqueda: boolean = false;
  inibusqueda: boolean = false;
  sinDatosEncontrados: boolean = false;
  messageError: string = "";
    
  cabeceraUsuarios: string[][] =[];

  strClassColHead1: string = strClassColHead1;
  strClassColHead2: string = strClassColHead2;
  strClassColHead3: string = strClassColHead3;
  msgSinInformacion: string = msgSinInformacion;
  
  classColContent_Left: string = classColContent_Left;
  classColContent_Center: string = classColContent_Center;
  classColContent_Right: string = classColContent_Right;
  
  linkSelf: string = "";
  linkFirst: string = "";
  linkLast: string = "";
  linkNext: string = "";
  linkPrev: string = "";

  //tipoUsers = USERS;
  
  ngOnInit(): void {
    this.cabeceraUsuarios = this.commonService.cabeceraUsuarios;
    this.buscarUsuariosDelSistema('');

    /*this.miFormulario.get('claveac')?.valueChanges.subscribe(newValue=>{
      if(this.paswAleatorio.length==16){
        this.paswAleatorio = "";
        //let str: string = newValue;
        //this.miFormulario.get('claveac')?.setValue((str.length===1)?str:"");
        
        //this.miFormulario.get('claveac')?.setValue("");
        
        console.log("claveac", newValue);
      }else{
        this.miFormulario.get('claveac')?.setValue("");
      }
    });*/

  }

  validarPresKey(event: any): boolean{
    
    if(this.paswAleatorio.length==16){
      let val: string = this.miFormulario.get('claveac')?.value;
      if(val!=this.paswAleatorio){
        this.paswAleatorio = "";
        
        //const charCode = event.which ? event.which : event.keyCode;
        const allowedKeys = /^[a-zA-Z0-9]$/;

        if (allowedKeys.test(event.key)) {
          val = event.key;
          this.miFormulario.get('claveac')?.setValue(val);
        }else{
          this.miFormulario.get('claveac')?.setValue("");
        }
        
      }
    }
    
    return true;
  }

  obtenerTipoUsuario(user: string): string{
    return USERS[user]?.tipo||'';
  }
  obtenerIdUsuario(user: string): string{
    return USERS[user]?.id||'';
  }
  obtenerDescStatus(status: string): string{
    return USER_STATUS[status.toUpperCase()]?.desc||'';
  }
  
  buscarUsuariosDelSistema(href: string){
    
    if(href.length===0){
      href = '/api/v1/users';
    }
    
    this.inibusqueda = true;
    this.datosEncontrados = false;
    this.errorBusqueda = false;

    this.protecService.buscarUsuariosDelSistema(href).subscribe((users)=>{
      
      this.users = users;
      this.inibusqueda = false;
      this.sinDatosEncontrados = false;
      
      if(this.users.data.length){
        this.datosEncontrados = true;

        this.buscarLinks();

      }else{
        this.sinDatosEncontrados = true;
      }
      
    },(err)=>{  //(err: HttpErrorResponse)
      const msgError = this.commonService.obtenerStatusDescriptionMsgError(err.status, err.error);
      this.errorBusqueda = true;
      this.inibusqueda = false;
    });
  }

  buscarLinks(){
    
    const objSelf = this.users.links.find(objeto =>objeto.rel==="self");
    this.linkSelf = (objSelf)?objSelf?.href:'';
    
    const objFirst = this.users.links.find(objeto =>objeto.rel==="first");
    this.linkFirst = (objFirst)?objFirst?.href:'';

    const objNext = this.users.links.find(objeto =>objeto.rel==="next");
    this.linkNext = (objNext)?objNext?.href:'';

    const objPrev = this.users.links.find(objeto =>objeto.rel==="prev");
    this.linkPrev = (objPrev)?objPrev?.href:'';

    const objLast = this.users.links.find(objeto =>objeto.rel==="last");
    this.linkLast = (objLast)?objLast?.href:'';
  }
  
  onFirst(){
    if(this.linkFirst)this.buscarUsuariosDelSistema(this.linkFirst);
  }
  onNext(){
    if(this.linkNext)this.buscarUsuariosDelSistema(this.linkNext);
  }
  onPrev(){
    if(this.linkPrev)this.buscarUsuariosDelSistema(this.linkPrev);
  }
  onLast(){
    if(this.linkLast)this.buscarUsuariosDelSistema(this.linkLast);
  }


  msgErrorDataUser: string = "";
  initDelUser: boolean = false;
  initSavelUser: boolean = false;
  newDataUser: boolean = false;
  loadDataUser: boolean = false;
  errorDataUser: boolean = false;
  errorDelUser: boolean = false;
  errorSaveUser: boolean = false;
  paswAleatorio: string = "";

  onNewUser(){
    this.loadDataUser = true;
    this.newDataUser = true;
    this.initSavelUser = false;
    this.errorSaveUser = false;

    this.miFormulario.reset();
    
    this.miFormulario.get('fullname')?.setValue("");
    this.miFormulario.get('nameuser')?.setValue("");
    this.miFormulario.get('claveac')?.setValue("");
    this.miFormulario.get('profile')?.setValue("");
    this.miFormulario.get('status')?.setValue("");

  }

  onEditUser(user_id:number){
    this.newDataUser = false;
    this.loadDataUser = false;
    this.errorDataUser = false;
    this.initSavelUser = false;
    this.errorSaveUser = false;
    
    //console.log(user_id);
    //this.miFormulario.value.fullname;
    //this.miFormulario.get('fullname')?.setValue("JUAN PABLO II");
    
    this.protecService.buscarUsuario(user_id).subscribe((user)=>{
      
      this.userData = user;
      this.loadDataUser = true;

      this.paswAleatorio = this.obtenerStr16();

      this.miFormulario.reset();
      
      this.miFormulario.get('fullname')?.setValue(this.userData.fullname);
      this.miFormulario.get('nameuser')?.setValue(this.userData.username);
      this.miFormulario.get('claveac')?.setValue(this.paswAleatorio);
      this.miFormulario.get('profile')?.setValue(this.userData.profiles[0]);
      this.miFormulario.get('status')?.setValue(this.userData.status.toUpperCase());

    },(err)=>{  //(err: HttpErrorResponse)
      const msgError = this.commonService.obtenerStatusDescriptionMsgError(err.status, err.error);
      this.errorDataUser = true;
    });
  }

  onSave(){
    this.errorSaveUser = false;
    this.initSavelUser = true;

    if(this.newDataUser){
      const {fullname, nameuser, claveac, profile, status } = this.miFormulario.value;
      const body = {username: nameuser, password: claveac, profile, fullname };
      
      this.protecService.agregarUsuario(body).subscribe(()=>{
        
        if(this.linkSelf)this.buscarUsuariosDelSistema(this.linkSelf);
        
        this.initSavelUser = false;
        
        document.getElementById('btnclose')?.click();

      },(err)=>{  //(err: HttpErrorResponse)
        const msgError = this.commonService.obtenerStatusDescriptionMsgError(err.status, err.error);
        this.msgErrorDataUser = msgError;
        this.errorSaveUser = true;
        this.initSavelUser = false;
      });
    }
    else{
      const {fullname, nameuser, claveac, profile, status } = this.miFormulario.value;
      const body = (claveac!==this.paswAleatorio)?{password: claveac, profile, status}:{profile, status}

      console.log(body);
      
      this.protecService.actualizarUsuario(this.userData.id, body).subscribe(()=>{
        
        if(this.linkSelf)this.buscarUsuariosDelSistema(this.linkSelf);
        
        this.initSavelUser = false;
        
        document.getElementById('btnclose')?.click();

      },(err)=>{  //(err: HttpErrorResponse)
        const msgError = this.commonService.obtenerStatusDescriptionMsgError(err.status, err.error);
        this.msgErrorDataUser = msgError;
        this.errorSaveUser = true;
        this.initSavelUser = false;
      });
      
    }
    
    
  }

  onDelete(id: number){
    this.errorDelUser = false;
    this.loadDataUser = false;
    this.initDelUser = false;
    const userData = this.users.data.find(objeto =>objeto.id===id);
    if(userData){
      this.loadDataUser = true;
      this.userData = userData;
    }
  }
  onDeleteConfirmed(id: number){

    this.errorDelUser = false;
    this.initDelUser = true;

    //document.getElementById('btnOkDelete')?.setAttribute("disabled","true");

    this.protecService.eliminarUsuario(id).subscribe(()=>{
      
      if(this.linkSelf)this.buscarUsuariosDelSistema(this.linkSelf);
      document.getElementById('btncloseDelete')?.click();
      this.initDelUser = false;

    },(err)=>{  //(err: HttpErrorResponse)
      const msgError = this.commonService.obtenerStatusDescriptionMsgError(err.status, err.error);
      this.msgErrorDataUser = msgError;
      this.errorDelUser = true;
    });
  }

  obtenerStr16(): string {
    const caracteres = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let resultado = '';
  
    for (let i = 0; i < 16; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      resultado += caracteres.charAt(indiceAleatorio);
    }
  
    return resultado;
  }


}
