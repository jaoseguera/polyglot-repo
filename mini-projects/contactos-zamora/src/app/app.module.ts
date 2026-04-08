import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//Páginas
import { ContactosPage } from '../pages/contactos/contactos';
import { EventosPage } from '../pages/eventos/eventos';
import { TabsPage } from '../pages/tabs/tabs';
import { ContactoDetallesPage } from '../pages/contacto.detalles/contacto.detalles';
import { EventoDetallesPage } from '../pages/evento.detalles/evento.detalles';
import { PromocionesPage } from '../pages/promociones/promociones';
//Servicios
import { EventosService} from '../providers/eventos';
import { ContactosService} from '../providers/contactos';
import { PromocionesService} from '../providers/promociones';
 

@NgModule({
  declarations: [
    MyApp,
    ContactosPage,
    EventosPage,
    TabsPage,
    PromocionesPage,
    ContactoDetallesPage,
    EventoDetallesPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactosPage,
    EventosPage,
    TabsPage,
    PromocionesPage,
    ContactoDetallesPage,
    EventoDetallesPage 
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, EventosService, ContactosService, PromocionesService]
})

export class AppModule {}