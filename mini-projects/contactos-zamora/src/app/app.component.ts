import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';
import { CallNumber } from 'ionic-native';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    //Cuando la plataforma esté lista y los plugins disponibles.
    platform.ready().then(() => {
      // Aquí se pueden realizar cosas nativas de alto nivel.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  //Método para llamar nativamente.
  llamar(telefono:string){
    CallNumber.callNumber(telefono, true)
      .then(() => console.log('Llamando...'))
      .catch(() => console.log('Error al marcar.'));
  }
}