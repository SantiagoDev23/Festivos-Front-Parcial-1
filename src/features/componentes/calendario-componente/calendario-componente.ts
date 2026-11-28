import {Component, OnInit} from '@angular/core';
import {ReferenciasMaterialModule} from '../../../shared/modulos/referencias-material.module';
import {FormsModule} from '@angular/forms';
import {NgFor, NgIf} from '@angular/common';
import {ColumnMode, NgxDatatableModule} from '@swimlane/ngx-datatable';
import {Pais} from '../../../shared/entidades/Pais';
import {FestivoFecha} from '../../../shared/entidades/FestivoFecha';
import {PaisServicio} from '../../../core/servicios/pais-servicio';
import {CalendarioServicio} from '../../../core/servicios/calendario-servicio';

@Component({
  selector: 'app-calendario-componente',
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgxDatatableModule,
    NgFor,
    NgIf
  ],
  templateUrl: './calendario-componente.html',
  styleUrl: './calendario-componente.css',
})
export class CalendarioComponente implements OnInit {
  public paises: Pais[] = [];
  public idPais: number = 0;

  public anio: number = new Date().getFullYear();
  public mes: number = new Date().getMonth() + 1;
  public dia: number = new Date().getDate();
  public resultado: string = "";

  public festivos: FestivoFecha[] = [];

  public columnas = [
    {name: "Festivo", prop: "festivo"},
    {name: "Fecha", prop: "fecha"}
  ];
  public modoColumna = ColumnMode;

  constructor(private paisServicio: PaisServicio,
              private calendarioServicio: CalendarioServicio) {

  }

  ngOnInit() {
    this.paisServicio.listar().subscribe(
      {
        next: respuesta => {
          this.paises = respuesta.sort((a, b) => a.nombre.localeCompare(b.nombre));
        },
        error: error => {
          window.alert(error.message);
        }
      }
    );
  }

  public verificar() {
    if (this.idPais == 0) {
      window.alert("Debe escoger un País");
      return;
    }
    this.calendarioServicio.verificar(this.idPais, this.anio, this.mes, this.dia).subscribe(
      {
        next: respuesta => {
          this.resultado = respuesta;
        },
        error: error => {
          window.alert(error.message);
        }
      }
    );
  }

  public listarFestivos() {
    if (this.idPais == 0) {
      window.alert("Debe escoger un País");
      return;
    }
    this.calendarioServicio.listarFestivos(this.idPais, this.anio).subscribe(
      {
        next: respuesta => {
          this.festivos = respuesta;
        },
        error: error => {
          window.alert(error.message);
        }
      }
    );
  }
}
