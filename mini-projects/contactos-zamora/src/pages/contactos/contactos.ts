import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactosService } from '../../providers/contactos';
import { ContactoDetallesPage } from '../contacto.detalles/contacto.detalles';
import { CallNumber } from 'ionic-native';

@Component({
  selector: 'page-contactos',
  templateUrl: 'contactos.html'
})
export class ContactosPage {
  cadenaBusqueda:string = "";
  contactos: any;

  constructor(public navCtrl: NavController, public contactosService:ContactosService) {
    this.inicializar();
  }

  //Inicializa la lista de contactos con todos los contactos
  inicializar(){
    this.contactosService.obtenerTodos().then(result => {
      this.contactos = result;
    });
  }

  //Muestra la página de Detalles y le envía como parámetro al contacto
  verDetalles(contacto){
    this.navCtrl.push(ContactoDetallesPage, {
      contacto:contacto
    });
  }

  //Método para llamar nativamente.
  llamar(telefono:string){
    CallNumber.callNumber(telefono, true)
      .then(() => console.log('Llamando...'))
      .catch(() => console.log('Error al marcar.'));
  }

  //Filtra la lista. Envía como parámetro la cadena de búsqueda
  filtrarContactos(){
    this.contactos = this.contactosService.filtar(this.cadenaBusqueda);
  }
}
