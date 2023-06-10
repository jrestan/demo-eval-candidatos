import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  private _descSemaforos: string[][] = [
    ['G', 'No reporta información de deudas.'],
    ['V', 'Sin deudas vencidas.'],
    ['A', 'Deudas con poco atraso*'],
    ['R', 'Deudas con atraso significativo*'],
  ];
  get descSemaforos(): string[][]{
    return [...this._descSemaforos];
  }


  private _descCalifSBS: string[][] = [
    ['NOR','Normal'],
    ['CPP','Con Problemas Potenciales'],
    ['DEF','Deficiente'],
    ['DUD','Dudoso'],
    ['PER','Pérdida'],
    ['SCAL','Sin Calificación'],
  ];
  get descCalifSBS(): string[][]{
    return [...this._descCalifSBS];
  }
    
  private _cabeceraResumenFinanciero: string[][] =[
    ['Tipo documento', ' col-sm-2'],
    ['Ultima Actualización', ' col-sm-2'],
    ['Nota', ' col-sm-2'],
    ['Deuda Total', ' col-sm-2'],
    ['Act', ' col'],
    ['Prev', ' col'],
    ['12m', ' col']
  ];
  get cabeceraResumenFinanciero(): string[][]{
    return [...this._cabeceraResumenFinanciero];
  }


  private _cabeceraDatosGenerales: string[] =[
    'Fecha Nacimiento',
    'Genero',
    'Digito Verificador',
     //'Deuda Total',
    'Digito Verificador Anterior'
  ];
  get cabeceraDatosGenerales(): string[]{
    return [...this._cabeceraDatosGenerales];
  }


  private _cabeceraSbsMicrofinanzas: string[] =[
    'Entidad',
    'Monto',
    'Fecha Inf',
    'Calif (2)',
    'Dias Vencidos'
  ];
  get cabeceraSbsMicrofinanzas(): string[]{
    return [...this._cabeceraSbsMicrofinanzas];
  }

  private _cabeceraTarjetasCredito: string[] =[
    'Instituciones',
    'Linea Aprobada',
    'Linea No Utilizada',
    'Linea Utilizada',
    '% Linea Utilizada'
  ];
  get cabeceraTarjetasCredito(): string[]{
    return [...this._cabeceraTarjetasCredito];
  }


  private _cabeceraDetOtrosVencidos: string[] =[
    'Fuente - Acreedor',
    'Calif (3)',
    'Monto',
    'Dias Vencidos'
  ];
  get cabeceraDetOtrosVencidos(): string[]{
    return [...this._cabeceraDetOtrosVencidos];
  }

  private _cabeceraOtrosCreditos: string[] =[
    'Entidad',
    'Monto',
    'Fecha Inf',
    'Calif (2)',
    'Dias Vencidos'
  ];
  get cabeceraOtrosCreditos(): string[]{
    return [...this._cabeceraOtrosCreditos];
  }

  private _cabeceraRepresenLegalDe: string[][] =[
    ['RUC', ''],
    ['Razon Social', ' col-sm-2'],
    ['Act', ' col-sm-1'],
    ['Pre', ' col-sm-1'],
    ['12m', ' col-sm-1'],
    ['Fecha desde que ocupa cargo', ''],
    ['Cargo', ''],
    ['Estado', ''],
  ];
  get cabeceraRepresenLegalDe(): string[][]{
    return [...this._cabeceraRepresenLegalDe];
  }

  
  private _datosPrinc: string[][] = [
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
  get datosPrinc(): string[][]{
    return [...this._datosPrinc];
  }

  private _contenidoReporte: string[][] = [
    ['Información General', 'OK', ''],
    ['Consulta Rápida', 'OK', ''],
    ['Principales Acreedores', '', ''],
    ['Detalle Variación', '', ''],
    ['Posición Histórica', '', ''],
    ['Gráficos', '', ''],
    ['Reporte Vencidos', '', ''],
    ['Reporte SBS/Microf.', 'debts_microfinance', ''],
    ['SBS/Microf. Entidades', '', ''],
    ['Rectificaciones SBS', '', ''],
    ['Avalados/Avalistas', '', ''],
    ['Mancomunados', '', ''],
    ['Documentos CCL', '', ''],
    ['Detalle de Vencidos', 'debts_overdue', ''],
    ['Comercio Exterior', '', ''],
    ['Hechos de Importancia', '', ''],
    ['Otros Créditos', '', ''],
    ['Otros Créditos Entidades', '', ''],
  ];
  get contenidoReporte(): string[][]{
    return [...this._contenidoReporte];
  }

  
  private _tipoDocumento: string[][] = [
    ['4', 'CARNET DE EXTRANJERIA', 'Ingrese CE', '12', '12'],
    ['3', 'CARNET DE IDENTIDAD', 'Ingrese Número de Carnet', '15', '10'],
    ['7', 'CARNET IDENTIDAD FF AA', 'Ingrese Número de Carnet', '15', '10'],
    ['6', 'CARNET IDENTIDAD FF PP', 'Ingrese Número de Carnet', '15', '10'],
    ['A', 'CED. DIPLOMATICA DE IDENTIDAD', 'Ingrese Número de Cédula', '15', '10'],
    ['D', 'DNI', 'Ingrese DNI', '8', '8'],
    ['Y', 'DOC. IDENTIDAD (EXTRANJERO)', 'Ingrese Número de Documento', '15', '10'],
    ['B', 'DOC. TRIB. NO DOM. SIN RUC', 'Ingrese Número de Documento', '15', '10'],
    ['9', 'DOCUMENTO PROVISIONAL IDENTIDAD', 'Ingrese Número de Documento', '15', '10'],
    ['8', 'LIBRETA TRIBUTARIA', 'Ingrese Número de Documento', '15', '10'],
    ['5', 'PASAPORTE', 'Ingrese Pasaporte', '12', '12'],
    ['R', 'RUC', 'Ingrese RUC', '11', '11'],
  ];
  get tipoDocumento(): string[][]{
    return [...this._tipoDocumento];
  }


  //... Arrays para LISTAS RESTRICTIVAS ...

  private _cabeceraDatosGeneralesLR: string[][] =[
    ['Documento', ' col-sm-2'],
    ['Nombre o Razon Social', ' col-sm-2'],
    ['Ult Actualización', ''],
    ['Nota', ''],
    ['Monto Total', ''],
    ['Actual', ' col-sm-1'],
    ['Previo', ' col-sm-1'],
    ['6m', ' col-sm-1']
  ];
  get cabeceraDatosGeneralesLR(): string[][]{
    return [...this._cabeceraDatosGeneralesLR];
  }
    
  private _cabeceraListaRestric: string[][] = [
    ['Tipo ID', 'type_id',                      '2', '10'],
    ['Nro ID', 'number_id',                     '2', '10'],
    ['Nombre', 'name',                          '6', '10'],
    ['Coincidencia', 'coincidences',            '6', '10'],
    ['% Coincidencia', 'coincidence_porcentage','2', '10'],
    ['Alias', 'alias',                          '3', '10'],
    ['Origen de Lista', 'origen',               '6', '10'],
    ['Tipo de Lista', 'type',                   '6', '10'],
    ['Fecha Update', 'update_at',               '6', '10'],
    ['Relacionado con', 'related_to',           '6', '10'],
    ['ID Relacionado', 'related_id',            '6', '10'],
    //['Vínculo', 'link',                         '13', '10'],
    ['Observaciones', 'observations',           '13', '10'],
    ['Nacionalidad', 'nationality',             '6', '10'],
    ['Fecha de Consulta', 'consulted_at',       '6', '10']
  ];
  get cabeceraListaRestric(): string[][]{
    return [...this._cabeceraListaRestric];
  }

  private _cabeceraListaPEPs: string[][] = [
    ['Tipo ID', 'type_id',                      '2', '10'],
    ['Nro ID', 'number_id',                     '2', '10'],
    ['Nombre', 'name',                          '7', '10'],
    ['Coincidencia', 'coincidences',            '6', '10'],
    ['% Coincidencia', 'coincidence_porcentage','6', '10'],
    ['Origen de Lista', 'origen',               '3', '10'],
    ['Tipo de Lista', 'type',                   '7', '10'],
    ['Relacionado con', 'related_to',           '7', '10'],
    ['ID Relacionado', 'related_id',            '6', '10'],
    //['Vínculo', 'link',                         '6', '10'],

    ['Fecha Update', 'update_at',               '6', '10'],
    ['Nro Resolución Nombra.', 'named_id', '6', '10'],
    ['Fecha Nombra.', 'named_at',          '6', '10'],
    ['Nro Resolución Retiro Cargo', 'retired_id','6', '10'],
    ['Fecha Retiro Cargo', 'retired_at',        '6', '10'],
    ['Cargo Actual', 'last_care',               '6', '10'],
    ['Novedad', 'news',                         '6', '10'],
    ['Fecha consulta', 'consulted_at',          '6', '10']
  ];
  get cabeceraListaPEPs(): string[][]{
    return [...this._cabeceraListaPEPs];
  }

  private _cabeceraUsuarios: string[][] =[
    ['ID', ' col-sm-1'],
    ['Nombres y apellidos / Razon Social', ' col-sm-3'],
    ['Usuario', ''],
    //['Contraseña', ''],
    ['Perfil', ''],
    ['Estado', ''],
    ['Acciones', ''],
  ];
  get cabeceraUsuarios(): string[][]{
    return [...this._cabeceraUsuarios];
  }
  

  //... Estados de Response HTTP...

  private statusDescriptions: { [key: number]: string } = {
    100: 'Continue',
    101: 'Switching Protocols',
    102: 'Processing',
    103: 'Early Hints',
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    203: 'Non-Authoritative Information',
    204: 'No Content',
    205: 'Reset Content',
    206: 'Partial Content',
    207: 'Multi-Status',
    208: 'Already Reported',
    226: 'IM Used',
    300: 'Multiple Choices',
    301: 'Moved Permanently',
    302: 'Found',
    303: 'See Other',
    304: 'Not Modified',
    305: 'Use Proxy',
    307: 'Temporary Redirect',
    308: 'Permanent Redirect',
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Payload Too Large',
    414: 'URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Range Not Satisfiable',
    417: 'Expectation Failed',
    418: "I'm a Teapot",
    421: 'Misdirected Request',
    422: 'Unprocessable Entity',
    423: 'Locked',
    424: 'Failed Dependency',
    425: 'Too Early',
    426: 'Upgrade Required',
    428: 'Precondition Required',
    429: 'Too Many Requests',
    431: 'Request Header Fields Too Large',
    451: 'Unavailable For Legal Reasons',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported',
    506: 'Variant Also Negotiates',
    507: 'Insufficient Storage',
    508: 'Loop Detected',
    510: 'Not Extended',
    511: 'Network Authentication Required',
  };
    
  

  obtenerStatusDescriptions(status: number): string{
    return this.statusDescriptions[status]||'Unknown Error';
  }

  
  obtenerStatusDescriptionMsgError(status: number, error: string): string{
    const msgError = 'Error: ' + status + '. '+this.obtenerStatusDescriptions(status) + '. ' + error||'';
    return msgError;
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
    
    //return `--fa-primary-color: ${color1}; --fa-secondary-color: ${color2};`;
    return `--fa-primary-color: ${color1}; --fa-secondary-color: ${color2};`;
  }


  
  obtenerTipoDocumento(tipodoc: string): string{
    let _tipodoc: string = tipodoc;
    switch(tipodoc){
      case 'D': _tipodoc='DNI'; break;
      case 'R': _tipodoc='RUC'; break;
    }
    return _tipodoc;
  }

  obtenerDatosTipoDoc(tipodoc: string): string[]{
    let result: string[] = [];
    for (let i=0; i<this._tipoDocumento.length; i++) {
      if(this._tipoDocumento[i][0]===tipodoc){
        result = this._tipoDocumento[i];
        break;
      }
    }
    return result;
  }
  
  
}
