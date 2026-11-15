import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ReferenciasMaterialModule} from '../../../shared/modulos/referencias-material.module';
import {FormsModule} from '@angular/forms';
import {ColumnMode, NgxDatatableModule} from '@swimlane/ngx-datatable';
import {Pais} from '../../../shared/entidades/Pais';
import {PaisServicio} from '../../../core/servicios/pais-servicio';
import {MatDialog} from '@angular/material/dialog';
import {PaisEditarComponente} from '../pais-editar-componente/pais-editar-componente';
import {DecidirComponente} from '../../../shared/componentes/decidir-componente/decidir-componente';

@Component({
  selector: 'app-pais-componente',
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgxDatatableModule
  ],
  templateUrl: './pais-componente.html',
  styleUrl: './pais-componente.css',
})
export class PaisComponente implements OnInit {
  public textoBusqueda: string = "";

  public paises: Pais[] = [];
  public paisEscogido: Pais | undefined;
  public indicePaisEscogido: number = -1;

  public columnas = [
    {name: "Nombre", prop: "nombre"}
  ];
  public modoColumna = ColumnMode;


  constructor(private paisServicio: PaisServicio,
              private dialogoServicio: MatDialog,
              private cdr: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.listar();
  }

  public escoger(event: any) {
    if (event.type == "click") {
      this.paisEscogido = event.row;
      this.indicePaisEscogido = this.paises.findIndex(pais => pais == this.paisEscogido);
    }
  }

  public listar() {
    this.paisServicio.listar().subscribe(
      {
        next: respuesta => {
          this.paises = respuesta.sort((a, b) => a.nombre.localeCompare(b.nombre));
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
      this.paisServicio.buscar(this.textoBusqueda).subscribe(
        {
          next: response => {
            this.paises = response;
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
    const dialogoAgregar = this.dialogoServicio.open(PaisEditarComponente, {
      width: '500px',
      height: '250px',
      data: {
        encabezado: `Agregando País`,
        pais: {
          id: 0,
          nombre: ""
        }
      },
      disableClose: true
    });
    dialogoAgregar.afterClosed().subscribe({
      next: datos => {
        if (datos) {
          this.paisServicio.agregar(datos.pais).subscribe({
            next: respuesta => {
              this.textoBusqueda = respuesta.nombre;
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
    if (this.paisEscogido) {
      const dialogoModificar = this.dialogoServicio.open(PaisEditarComponente, {
        width: '500px',
        height: '250px',
        data: {
          encabezado: `Editando el país [${this.paisEscogido.nombre}]`,
          pais: {...this.paisEscogido}
        },
        disableClose: true
      });
      dialogoModificar.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.paisServicio.modificar(datos.pais).subscribe({
              next: respuesta => {
                this.paises[this.indicePaisEscogido] = respuesta;
                this.paises = [...this.paises];
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
      window.alert("Debe escoger un País");
    }
  }

  public verificarEliminar() {
    if (this.paisEscogido) {
      const dialogoModificar = this.dialogoServicio.open(DecidirComponente, {
        width: '400px',
        height: '200px',
        data: {
          encabezado: `Está seguro de eliminar el país [${this.paisEscogido.nombre}]?`,
          id: this.paisEscogido.id
        },
        disableClose: true
      });
      dialogoModificar.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.paisServicio.eliminar(datos.id).subscribe({
              next: respuesta => {
                this.paisEscogido = undefined;
                this.listar();
              },
              error: error => {
                if (error.status == 409) {
                  window.alert("No se puede eliminar el país porque tiene festivos asociados");
                } else {
                  window.alert(error.message);
                }
              }
            })
          }
        }
      });
    } else {
      window.alert("Debe escoger un País");
    }
  }
}
