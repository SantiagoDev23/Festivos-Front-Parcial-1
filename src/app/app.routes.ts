import {Routes} from '@angular/router';
import {InicioComponent} from '../features/componentes/inicio/inicio';
import {PaisComponente} from '../features/componentes/pais-componente/pais-componente';
import {TipoFestivoComponente} from '../features/componentes/tipo-festivo-componente/tipo-festivo-componente';
import {FestivoComponente} from '../features/componentes/festivo-componente/festivo-componente';

export const routes: Routes = [
  {path: "", redirectTo: "inicio", pathMatch: "full"},
  {path: "inicio", component: InicioComponent},
  {path: "paises", component: PaisComponente},
  {path: "tipos", component: TipoFestivoComponente},
  {path: "festivos", component: FestivoComponente},
  {path: "**", redirectTo: "inicio"}
];
