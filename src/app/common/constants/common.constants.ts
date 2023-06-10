export const USER_TYPES = {
   ADMIN: 'ADMIN',
   CONSUL: 'CONSUL',
   CONIMP: 'CONIMP',
};


/*
export const USERS = {
   ADMIN:  { id: 'ADMIN', tipo: 'Administrador' },
   CONSUL: { id: 'CONSUL', tipo: 'Consulta' },
   CONIMP: { id: 'CONIMP', tipo: 'Consulta Impresión' },
};
*/

export const USERS: { [key: string]: { id: string, tipo: string } } = {
   ADMIN: { id: 'ADMIN', tipo: 'Administrador General' },
   CONSUL: { id: 'CONSUL', tipo: 'Consulta' },
   CONIMP: { id: 'CONIMP', tipo: 'Administrador' }
}

export const USER_STATUS: { [key: string]: { id: string, desc: string } } = {
   ACTIVE: { id: 'ACTIVE', desc: 'Activo' },
   INACTIVE: { id: 'INACTIVE', desc: 'No Activo' },
}

export const strClassColHead1 = 'col text-center d-flex align-items-center justify-content-center';
export const strClassColHead2 = 'col-sm-12 d-flex align-items-center';
//strClassColHead3: string = 'col border text-white text-center d-flex align-items-center justify-content-center';
export const strClassColHead3 = 'col border text-center d-flex align-items-center justify-content-center';

export const strClassColContRep = 'col ms-2 text-white d-flex align-items-center justify-content-start';
export const strClassColSeccSide = 'col ms-2 d-flex align-items-center justify-content-start';

export const classColContent_Left = 'col border d-flex align-items-center styleCont';
export const classColContent_Center = 'col border d-flex align-items-center justify-content-center styleCont';
export const classColContent_Right = 'col border d-flex align-items-center justify-content-end styleCont';

export const msgSinInformacion = 'Sin información para mostrar';