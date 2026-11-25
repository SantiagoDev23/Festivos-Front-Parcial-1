import {Component, Inject} from '@angular/core';
import {Pais} from '../../../shared/entidades/Pais';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {ReferenciasMaterialModule} from '../../../shared/modulos/referencias-material.module';

export interface DatosEdicionPais {
  encabezado: string;
  pais: Pais;
}

@Component({
  selector: 'app-pais-editar-componente',
  imports: [
    FormsModule,
    ReferenciasMaterialModule
  ],
  templateUrl: './pais-editar-componente.html',
  styleUrl: './pais-editar-componente.css',
})
export class PaisEditarComponente {

  constructor(@Inject(MAT_DIALOG_DATA) public datos: DatosEdicionPais,
              public dialogRef: MatDialogRef<PaisEditarComponente>,
  ) {
  }

}
