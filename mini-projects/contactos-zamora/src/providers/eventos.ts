import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EventosService {
  data: any;
  
  constructor(public http: Http) {
    //Lista de eventos
    this.data = [
      {
        titulo: "Estreno: La momia", 
        imagen:"img/eventos/momia.png",
        fecha: "Viernes, 9 de junio.",
        lugar: "",
        telefono: "",
        facebook: "http://www.cinepolis.com/pelicula/la-momia",
        descripcion: "Olvidada y enterrada dentro de una cripta en medio del desierto, una antigua reina, a quien su destino le fue arrebatado injustamente, es despertada "
                    + "en la época actual trayendo consigo toda la maldad y terror guardado por siglos que definirá el futuro de la humanidad.",
        categoria: "Cine"
      },
      {
        titulo: "Estreno: Cars 3", 
        imagen:"img/eventos/cars.png",
        fecha: "Viernes, 16 de junio.",
        lugar: "",
        telefono: "",
        facebook: "http://www.cinepolis.com/pelicula/cars-3",
        descripcion: "Sorprendido por una nueva generación de corredores ultra-rápidos, el legendario “El Rayo” McQueen repentinamente se encuentra dejado de lado en "
                    + "el deporte que adora. Para volver al ruedo, necesitará la ayuda de Cruz Ramirez, una vigorosa joven técnica de carreras, que tiene su propio plan "
                    + "para ganar, además de la inspiración del fabuloso difunto Hudson Hornet, y un par de giros inesperados. ¡Demostrar que el #95 aún no está terminado "
                    + "pondrá a prueba el corazón del campeón, en el más grande escenario de la Copa Pistón!",
        categoria: "Cine"
      }
    ];
  }
  //Retorna la lista completa de eventos.
  obtenerTodos(){
    return Promise.resolve(this.data);
  }
  //Filtra de acuerdo a la cadena recibida. Busca por el titulo, fecha, descripción, lugar o categoría.
  filtrar(cadena){
    return this.data.filter((evento) => {
      return evento.titulo.toLowerCase().indexOf(cadena.toLowerCase()) > -1 
      || evento.categoria.toLowerCase().indexOf(cadena.toLowerCase()) > -1
      || evento.fecha.toLowerCase().indexOf(cadena.toLowerCase()) > -1
      || evento.lugar.toLowerCase().indexOf(cadena.toLowerCase()) > -1
      || evento.descripcion.toLowerCase().indexOf(cadena.toLowerCase()) > -1;
    })
  }
}
