import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PromocionesService {
  data:any;

  constructor(public http: Http) {
    //Lista de promociones
    this.data = [
      {
        titulo: "Quejas y sugerencias",
        empresa: "Contactos: Zamora",
        imagen:"img/promociones/contactos.png",
        telefono: "351 547 77 41",
        validez: "Tu opinión importa.",
        descripcion: "Ayúdanos a mejorar.",
      }
    ];
  }
  //Retorna toda la lista de promociones
  obtenerPromociones(){
    return Promise.resolve(this.data);
  }
}