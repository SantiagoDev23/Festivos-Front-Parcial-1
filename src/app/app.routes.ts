import {Routes} from '@angular/router';
import {InicioComponent} from '../features/componentes/inicio/inicio';
import {PaisComponente} from '../features/componentes/pais-componente/pais-componente';
import {TipoFestivoComponente} from '../features/componentes/tipo-festivo-componente/tipo-festivo-componente';
import {FestivoComponente} from '../features/componentes/festivo-componente/festivo-componente';
import {AutorizacionGuarda} from '../core/guardas/autorizacion.guarda';

export const RUTA_DEFAULT = '/inicio';

export const routes: Routes = [
  {path: "", redirectTo: "inicio", pathMatch: "full"},
  {path: "inicio", component: InicioComponent},
  {path: "paises", component: PaisComponente, canActivate: [AutorizacionGuarda]},
  {path: "tipos", component: TipoFestivoComponente, canActivate: [AutorizacionGuarda]},
  {path: "festivos", component: FestivoComponente, canActivate: [AutorizacionGuarda]}
];
