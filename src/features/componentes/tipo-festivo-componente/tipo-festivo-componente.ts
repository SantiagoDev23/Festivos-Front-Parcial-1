import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ReferenciasMaterialModule} from '../../../shared/modulos/referencias-material.module';
import {FormsModule} from '@angular/forms';
import {ColumnMode, NgxDatatableModule} from '@swimlane/ngx-datatable';
import {TipoFestivo} from '../../../shared/entidades/TipoFestivo';
import {TipoFestivoServicio} from '../../../core/servicios/tipo-festivo-servicio';
import {MatDialog} from '@angular/material/dialog';
import {TipoFestivoEditarComponente} from '../tipo-festivo-editar-componente/tipo-festivo-editar-componente';
import {DecidirComponente} from '../../../shared/componentes/decidir-componente/decidir-componente';

@Component({
  selector: 'app-tipo-festivo-componente',
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgxDatatableModule
  ],
  templateUrl: './tipo-festivo-componente.html',
  styleUrl: './tipo-festivo-componente.css',
})
export class TipoFestivoComponente implements OnInit {
  public textoBusqueda: string = "";

  public tipos: TipoFestivo[] = [];
  public tipoEscogido: TipoFestivo | undefined;
  public indiceTipoEscogido: number = -1;

  public columnas = [
    {name: "Tipo", prop: "tipo"}
  ];
  public modoColumna = ColumnMode;


  constructor(private tipoServicio: TipoFestivoServicio,
              private dialogoServicio: MatDialog,
              private cdr: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.listar();
  }

  public escoger(event: any) {
    if (event.type == "click") {
      this.tipoEscogido = event.row;
      this.indiceTipoEscogido = this.tipos.findIndex(tipo => tipo == this.tipoEscogido);
    }
  }

  public listar() {
    this.tipoServicio.listar().subscribe(
      {
        next: respuesta => {
          this.tipos = respuesta.sort((a, b) => a.id - b.id);
          this.cdr.markForCheck();
        },
        error: error => {
          window.alert(error.message);
        }
      }
    );
  }

  public buscar() {
    if (this.textoBusqueda.length == 0) {
      this.listar();
    } else {
      this.tipoServicio.buscar(this.textoBusqueda).subscribe(
        {
          next: response => {
            this.tipos = response;
            this.cdr.markForCheck();
          },
          error: error => {
            window.alert(error.message);
          }
        }
      );
    }
  }

  public agregar() {
    const dialogoAgregar = this.dialogoServicio.open(TipoFestivoEditarComponente, {
      width: '500px',
      height: '250px',
      data: {
        encabezado: `Agregando Tipo de Festivo`,
        tipo: {
          id: 0,
          tipo: ""
        }
      },
      disableClose: true
    });
    dialogoAgregar.afterClosed().subscribe({
      next: datos => {
        if (datos) {
          this.tipoServicio.agregar(datos.tipo).subscribe({
            next: respuesta => {
              this.textoBusqueda = respuesta.tipo;
              this.buscar();
            },
            error: error => {
              window.alert(error.message);
            }
          })
        }
      }
    });
  }

  public modificar() {
    if (this.tipoEscogido) {
      const dialogoModificar = this.dialogoServicio.open(TipoFestivoEditarComponente, {
        width: '500px',
        height: '250px',
        data: {
          encabezado: `Editando el tipo de festivo [${this.tipoEscogido.tipo}]`,
          tipo: {...this.tipoEscogido}
        },
        disableClose: true
      });
      dialogoModificar.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.tipoServicio.modificar(datos.tipo).subscribe({
              next: respuesta => {
                this.tipos[this.indiceTipoEscogido] = respuesta;
                this.tipos = [...this.tipos];
                this.cdr.markForCheck();
              },
              error: error => {
                window.alert(error.message);
              }
            })
          }
        }
      });
    } else {
      window.alert("Debe escoger un Tipo de Festivo");
    }
  }

  public verificarEliminar() {
    if (this.tipoEscogido) {
      const dialogoModificar = this.dialogoServicio.open(DecidirComponente, {
        width: '400px',
        height: '200px',
        data: {
          encabezado: `Está seguro de eliminar el tipo de festivo [${this.tipoEscogido.tipo}]?`,
          id: this.tipoEscogido.id
        },
        disableClose: true
      });
      dialogoModificar.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.tipoServicio.eliminar(datos.id).subscribe({
              next: respuesta => {
                this.tipoEscogido = undefined;
                this.listar();
              },
              error: error => {
                if (error.status == 409) {
                  window.alert("No se puede eliminar el tipo porque tiene festivos asociados");
                } else {
                  window.alert(error.message);
                }
              }
            })
          }
        }
      });
    } else {
      window.alert("Debe escoger un Tipo de Festivo");
    }
  }
}
