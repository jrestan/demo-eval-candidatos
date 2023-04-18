import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: ()=>import('./auth/auth.module').then(m =>m.AuthModule)
  },
  {
    //path: 'dashboard',
    path: '',
    loadChildren: ()=>import('./protected/protected.module').then(m =>m.ProtectedModule),
    canActivate: [ ValidarTokenGuard ],
    canLoad: [ ValidarTokenGuard ]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  //imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, { useHash:false } )], //esto es para produccion, con true concatena un # en el url luego del dominio,, 
                                                               //funciona correctamente cuando se hace f5 en el dashboard,,, 
                                                               //pero despues volvera a false y se solucionara desde el backend
  exports: [RouterModule]
})
export class AppRoutingModule { }
