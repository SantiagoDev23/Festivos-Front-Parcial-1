import {ChangeDetectorRef, Component} from '@angular/core';
import {Festivo} from '../../../shared/entidades/Festivo';
import {ColumnMode, NgxDatatableModule} from '@swimlane/ngx-datatable';
import {MatDialog} from '@angular/material/dialog';
import {DecidirComponente} from '../../../shared/componentes/decidir-componente/decidir-componente';
import {FestivoServicio} from '../../../core/servicios/festivo-servicio';
import {FestivoEditarComponente} from '../festivo-editar-componente/festivo-editar-componente';
import {PaisServicio} from '../../../core/servicios/pais-servicio';
import {TipoFestivoServicio} from '../../../core/servicios/tipo-festivo-servicio';
import {Pais} from '../../../shared/entidades/Pais';
import {TipoFestivo} from '../../../shared/entidades/TipoFestivo';
import {ReferenciasMaterialModule} from '../../../shared/modulos/referencias-material.module';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-festivo-componente',
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgxDatatableModule
  ],
  templateUrl: './festivo-componente.html',
  styleUrl: './festivo-componente.css',
})
export class FestivoComponente {
  public textoBusqueda: string = "";

  public festivos: Festivo[] = [];
  public paises: Pais[] = [];
  public tipos: TipoFestivo[] = [];
  public festivoEscogido: Festivo | undefined;
  public indiceFestivoEscogido: number = -1;

  public columnas = [
    {name: "País", prop: "pais.nombre"},
    {name: "Nombre", prop: "nombre"},
    {name: "Día", prop: "dia"},
    {name: "Mes", prop: "mes"},
    {name: "Días de Pascua", prop: "diasPascua"},
    {name: "Tipo", prop: "tipo.tipo"}
  ];
  public modoColumna = ColumnMode;


  constructor(private festivoServicio: FestivoServicio,
              private paisServicio: PaisServicio,
              private tipoServicio: TipoFestivoServicio,
              private dialogoServicio: MatDialog,
              private cdr: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.listar();
    this.listarPaises();
    this.listarTipos();
  }

  public escoger(event: any) {
    if (event.type == "click") {
      this.festivoEscogido = event.row;
      this.indiceFestivoEscogido = this.festivos.findIndex(festivo => festivo == this.festivoEscogido);
    }
  }

  public listar() {
    this.festivoServicio.listar().subscribe(
      {
        next: respuesta => {
          this.festivos = respuesta.sort((a, b) => a.pais.nombre.localeCompare(b.pais.nombre)
            || a.mes - b.mes || a.dia - b.dia || a.nombre.localeCompare(b.nombre));
          this.cdr.markForCheck();
        },
        error: error => {
          window.alert(error.message);
        }
      }
    );
  }

  public listarPaises() {
    this.paisServicio.listar().subscribe(
      {
        next: response => {
          this.paises = response.sort((a, b) => a.nombre.localeCompare(b.nombre));
          this.cdr.markForCheck();
        },
        error: error => {
          window.alert(error.message);
        }
      }
    );
  }

  public listarTipos() {
    this.tipoServicio.listar().subscribe(
      {
        next: response => {
          this.tipos = response.sort((a, b) => a.id - b.id);
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
      this.festivoServicio.buscar(this.textoBusqueda).subscribe(
        {
          next: response => {
            this.festivos = response;
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
    const dialogoAgregar = this.dialogoServicio.open(FestivoEditarComponente, {
      width: '500px',
      height: '660px',
      data: {
        encabezado: `Agregando Festivo`,
        paises: this.paises,
        tipos: this.tipos,
        festivo: {
          id: 0,
          pais: {
            id: 0,
            nombre: ""
          },
          nombre: "",
          dia: 0,
          mes: 0,
          diasPascua: 0,
          tipo: {
            id: 0,
            tipo: ""
          }
        }
      },
      disableClose: true
    });
    dialogoAgregar.afterClosed().subscribe({
      next: datos => {
        if (datos) {
          this.festivoServicio.agregar(datos.festivo).subscribe({
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
    if (this.festivoEscogido) {
      const dialogoModificar = this.dialogoServicio.open(FestivoEditarComponente, {
        width: '500px',
        height: '660px',
        data: {
          encabezado: `Editando el festivo [${this.festivoEscogido.nombre}]`,
          festivo: {...this.festivoEscogido},
          paises: this.paises,
          tipos: this.tipos
        },
        disableClose: true
      });
      dialogoModificar.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.festivoServicio.modificar(datos.festivo).subscribe({
              next: respuesta => {
                this.festivos[this.indiceFestivoEscogido] = respuesta;
                this.festivos = [...this.festivos];
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
      window.alert("Debe escoger un Festivo");
    }
  }

  public verificarEliminar() {
    if (this.festivoEscogido) {
      const dialogoModificar = this.dialogoServicio.open(DecidirComponente, {
        width: '400px',
        height: '200px',
        data: {
          encabezado: `Está seguro de eliminar el festivo [${this.festivoEscogido.nombre}]?`,
          id: this.festivoEscogido.id
        },
        disableClose: true
      });
      dialogoModificar.afterClosed().subscribe({
        next: datos => {
          if (datos) {
            this.festivoServicio.eliminar(datos.id).subscribe({
              next: respuesta => {
                this.festivoEscogido = undefined;
                this.listar();
              },
              error: error => {
                window.alert(error.message);
              }
            })
          }
        }
      });
    } else {
      window.alert("Debe escoger un Festivo");
    }
  }

}
