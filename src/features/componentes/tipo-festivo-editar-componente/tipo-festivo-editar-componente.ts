import {Component, Inject} from '@angular/core';
import {TipoFestivo} from '../../../shared/entidades/TipoFestivo';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {ReferenciasMaterialModule} from '../../../shared/modulos/referencias-material.module';

export interface DatosEdicionTipoFestivo {
  encabezado: string;
  tipo: TipoFestivo;
}

@Component({
  selector: 'app-tipo-festivo-editar-componente',
  imports: [
    FormsModule,
    ReferenciasMaterialModule
  ],
  templateUrl: './tipo-festivo-editar-componente.html',
  styleUrl: './tipo-festivo-editar-componente.css',
})
export class TipoFestivoEditarComponente {

  constructor(@Inject(MAT_DIALOG_DATA) public datos: DatosEdicionTipoFestivo,
              public dialogRef: MatDialogRef<TipoFestivoEditarComponente>,
  ) {
  }

  public datosValidos(): boolean {
    return this.datos.tipo.tipo.trim().length > 0;
  }

}
