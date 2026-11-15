import { Pais } from "./Pais";
import { TipoFestivo } from "./TipoFestivo";

export interface Festivo {
    id: number;
    pais: Pais;
    nombre: string;
    dia: number;
    mes: number;
    diasPascua: number;
    tipo: TipoFestivo;
}
