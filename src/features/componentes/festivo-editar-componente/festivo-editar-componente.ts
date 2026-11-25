import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Festivo} from '../../../shared/entidades/Festivo';
import {Pais} from '../../../shared/entidades/Pais';
import {TipoFestivo} from '../../../shared/entidades/TipoFestivo';
import {ReferenciasMaterialModule} from '../../../shared/modulos/referencias-material.module';
import {NgFor} from '@angular/common';
import {FormsModule} from '@angular/forms';

export interface DatosEdicionFestivo {
  encabezado: string;
  festivo: Festivo;
  paises: Pais[];
  tipos: TipoFestivo[];
}

@Component({
  selector: 'app-festivo-editar-componente',
  imports: [
    ReferenciasMaterialModule,
    NgFor,
    FormsModule
  ],
  templateUrl: './festivo-editar-componente.html',
  styleUrl: './festivo-editar-componente.css',
})
export class FestivoEditarComponente {
  constructor(@Inject(MAT_DIALOG_DATA) public datos: DatosEdicionFestivo,
              public dialogRef: MatDialogRef<FestivoEditarComponente>,
  ) {

  }

  compararPaises(p1: Pais, p2: Pais): boolean {
    return p1 && p2 ? p1.id === p2.id : p1 === p2;
  }

  compararTipos(t1: TipoFestivo, t2: TipoFestivo): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }
}
