import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactosService {
  data:any;
  
  constructor(public http: Http) {
   //Lista de contactos 
   this.data = [
      {
        nombre: "Autobuses",
        eslogan: "Ingresa para ver más contactos",
        telefonos: [{nombre: "Flecha Amarilla", numero: "515 12 37"},
                    {nombre: "La línea", numero: "515 11 19"}],
        imagen: "img/contactos/autobus.png",
        descripcion: "Central de autobuses de Zamora",
        categoria: "Transportes, Camiones, Camión, Flecha amarilla, Línea"
      },
      {
        nombre: "Buona Pizza",
        eslogan: "Pizzas a domicilio.",
        telefonos: [{nombre: "Principal", numero: "512 25 25"}],
        imagen: "img/contactos/buona.png",
        descripcion: "Haz tu reservación.",
        categoria: "Comida, Restaurante"
      },
      {
        nombre: "Carnicería La Guadalupana",
        eslogan: "Ubicada en la Ejidal.",
        telefonos: [{nombre: "Principal", numero: "517 94 01"}],
        imagen: "img/contactos/carniceria.png",
        descripcion: "Pregunta por nuestro servicio a domicilio.",
        categoria: "Res, Cerdo"
      },
      {
        nombre: "Carnitas El Aeropuerto",
        eslogan: "El sabor a domicilio.",
        telefonos: [{nombre: "Principal", numero: "351 145 7093"}],
        imagen: "img/contactos/restaurant.png",
        descripcion: "Contamos con servicio a domicilio.",
        categoria: "Comida, Restaurant"
      },
      {
        nombre: "Chocolatería Caricia",
        eslogan: "Suave y dulce como una caricia.",
        telefonos: [{nombre: "Principal", numero: "351 124 1176"}],
        imagen: "img/contactos/caricia.png",
        descripcion: "Trufas y chocolates por pedido. Servicio a domicilio",
        categoria: "Comida, Postres, Regalos"
      },
      {
        nombre: "Eco Gas",
        eslogan: "Servicio a domicilio.",
        telefonos: [{nombre: "Principal", numero: "351 127 6520"}],
        imagen: "img/contactos/ecogas.png",
        descripcion: "Pregunte por Ricardo.",
        categoria: ""
      },
      {
        nombre: "Emergencias",
        eslogan: "Ingresa para ver más contactos.",
        telefonos: [{nombre: "Ambulancias", numero: "517 92 61"},
                    {nombre: "Bomberos", numero: "515 05 45"},
                    {nombre: "Bomberos", numero: "515 01 01"},
                    {nombre: "Cruz Roja", numero: "512 05 35"},
                    {nombre: "Cruz Roja", numero: "512 05 94"},
                    {nombre: "Cruz Roja", numero: "065"},
                    {nombre: "Emergencias", numero: "060"},
                    {nombre: "Policia", numero: "512 00 22"},
                    {nombre: "Policia", numero: "512 00 43"},
                    {nombre: "Protección civil", numero: "515 09 11"},
                    {nombre: "Tránsito Zamora", numero: "515 33 56"}],
        imagen: "img/contactos/zamora.png",
        descripcion: "",
        categoria: "Bomberos, Cruz Roja, Policia, Ambulancia, Tránsito"
      },
      {
        nombre: "Farmacias",
        eslogan: "Ingresa para ver más contactos.",
        telefonos: [{nombre: "Del Ahorro 'Zamora'", numero: "800 711 22 22"},
                    {nombre: "Del Ahorro 'Jacona'", numero: "515 79 00"},
                    {nombre: "Benavides", numero: "512 24 75"},
                    {nombre: "Guadalajara", numero: "515 82 51"},
                    {nombre: "Zamora 'El Valle'", numero: "517 56 65"},
                    {nombre: "Zamora '20 nov.'", numero: "517 95 55"},
                    {nombre: "Zamora 'Glorieta'", numero: "512 33 75"}],
        imagen: "img/contactos/farmacia.png",
        descripcion: "",
        categoria: "Ahorro, Benavides, Guadalajara"
      },
      {
        nombre: "Fontanero y electricista",
        eslogan: "",
        telefonos: [{nombre: "Maestro Fco. Zarco", numero: "351 102 7481"}],
        imagen: "img/contactos/fontanero.png",
        descripcion: "Fontanería, electricidad, albañilería, pisos, azulejos y remodelaciones",
        categoria: "Albañil"
      },
      {
        nombre: "Ginecóloga Sandra",
        eslogan: "Salud femenina.",
        telefonos: [{nombre: "Principal", numero: "51 53 240"}],
        imagen: "img/contactos/ginecologa.png",
        descripcion: "Haz tu cita. Cerca de la prepa federal",
        categoria: ""
      },
      {
        nombre: "Grúas",
        eslogan: "Ingresa para ver más contactos.",
        telefonos: [{nombre: "Grúas el Pozo", numero: "517 14 20"},
                    {nombre: "Grúas Torres", numero: "517 03 76"},
                    {nombre: "Tyrsa, Renta de grúas", numero: "469 695 4445"},
                    {nombre: "Grúas Zamoranas", numero: "517 27 81"}],
        imagen: "img/contactos/grua.png",
        descripcion: "Grúas de arrastre y salvamento. Servicio 24 horas dentro y fuera del estado.",
        categoria: "Transporte, Gruas, Pozo, Torres, Tyrsa, Zamoranas"
      },
      {
        nombre: "Herrero",
        eslogan: "Reparación y construcción.",
        telefonos: [{nombre: "Alberto Guillen", numero: "351 143 5803"}],
        imagen: "img/contactos/herrero.png",
        descripcion: "Construcción y reparación de puertas, ventanas, estructuras metálicas y más. Trabajos para hogares y empresas.",
        categoria: "Construcción"
      },
      {
        nombre: "Hoteles",
        eslogan: "Ingresa para ver más contactos.",
        telefonos: [{nombre: "Calzada Inn", numero: "136 79 51"},
                    {nombre: "City Express", numero: "351 690 4000"},
                    {nombre: "Eco Hotel", numero: "512 49 95"},
                    {nombre: "Fénix", numero: "512 02 66"},
                    {nombre: "Jerico", numero: "530 98 00"},
                    {nombre: "Meson del Valle", numero: "516 30 50"}],
        imagen: "img/contactos/hotel.png",
        descripcion: "",
        categoria: "Calzada Inn, City Express, Eco, Fénix, Jerico, Meson, Valle"
      },
      {
        nombre: "Restaurante Lugarda",
        eslogan: "Con el sabor que te hará sentir en casa.",
        telefonos: [{nombre: "Principal", numero: "515 74 49"}],
        imagen: "img/contactos/restaurant.png",
        descripcion: "Música en vivo los fines de semana.",
        categoria: "Comida"
      },
      {
        nombre: "Maki Roll",
        eslogan: "Un pedazo de Japón en cada bocado.",
        telefonos: [{nombre: "Principal", numero: "51 55 050"}],
        imagen: "img/contactos/maki.png",
        facebook: "https://www.facebook.com/maki.roll.1232?fref=ts",
        descripcion: "Sushi y comida japonesa a domicilio",
        categoria: "Restaurante"
      },
      {
        nombre: "Mundo bebé",
        eslogan: "Bebé cómodo, bebé feliz.",
        telefonos: [{nombre: "Principal", numero: "351 145 7093"}],
        imagen: "img/contactos/bebe.png",
        facebook: "https://www.facebook.com/Mundobeebee/",
        descripcion: "Contamos con servicio a domicilio",
        categoria: "Niños, pañales, bebés"
      },
      {
        nombre: "Nutrióloga Erika Cortez",
        eslogan: "Come sano, come rico.",
        telefonos: [{nombre: "Principal", numero: "351 133 3387"}],
        facebook: "https://www.facebook.com/nutriologaerika.cortez?fref=ts",
        imagen: "img/contactos/nutriologa.png",
        descripcion: "Consulta nutricional, psiconutricional. Tratamientos faciales (arrugas, acné)." 
        + " Tratamientos corporales (celulitis, flacidez, reductivo, moldeador).",
        categoria: "Salud, Nutrición"
      },
      {
        nombre: "Norteño",
        eslogan: "Ambientación de fiestas y más.",
        telefonos: [{nombre: "Principal", numero: "351 119 5053"}],
        imagen: "img/contactos/norteño.png",
        descripcion: "Contrátanos",
        categoria: ""
      },
      {
        nombre: "Norteño Los K-Was",
        eslogan: "Ambientación de fiestas y más.",
        telefonos: [{nombre: "Principal", numero: "351 102 9216"},
                    {nombre: "Bajista", numero: "351 159 3939"},
                    {nombre: "Guitarrista", numero: "351 144 4763"},
                    {nombre: "Organizador", numero: "351 118 3519"}],
        imagen: "img/contactos/norteño.png",
        descripcion: "Contrátanos",
        categoria: ""
      },
      {
        nombre: "Nostra Chela",
        eslogan: "Sushi & Burger.",
        telefonos: [{nombre: "Suc. Morelos", numero: "51 21 597"},
                    {nombre: "Suc. Avila Camacho", numero: "515 22 84"}],
        imagen: "img/contactos/nostra.png",
        descripcion: "Hamburguesas y comida japonesa a domicilio",
        categoria: "Restaurante"
      },
      {
        nombre: "Pollería Gerardo",
        eslogan: "Pollos a domicilio.",
        telefonos: [{nombre: "Principal", numero: "443 245 5256"}],
        imagen: "img/contactos/pollo.png",
        descripcion: "Ordene usted.",
        categoria: "Pollo"
      },
      {
        nombre: "Pizzas Doña Mago",
        eslogan: "Pizzas con tradición.",
        telefonos: [{nombre: "Principal", numero: "512 52 93"}],
        imagen: "img/contactos/mago.png",
        facebook: "https://www.facebook.com/donamago.zamora?fref=ts",
        descripcion: "Ordene usted.",
        categoria: "Comida, Restaurant"
      },
      {
        nombre: "Rikorama",
        eslogan: "El sabor en el mejor lugar.",
        telefonos: [{nombre: "Principal", numero: "517 66 09"}],
        imagen: "img/contactos/rikorama.png",
        descripcion: "Tortas a domicilio.",
        categoria: "Comida, Restaurant, Loncheria"
      },
      {
        nombre: "Tortas Coquis",
        eslogan: "Tortas en Jacona.",
        telefonos: [{nombre: "Principal", numero: "351 127 7430"}],
        imagen: "img/contactos/restaurant.png",
        descripcion: "Tortas con sabor.",
        categoria: "Comida, Restaurant, Loncheria"
      },
      {
        nombre: "Tortas Peña",
        eslogan: "Las mejores tortas de la región.",
        telefonos: [{nombre: "Principal", numero: "512 06 68"}],
        imagen: "img/contactos/restaurant.png",
        descripcion: "Tortas con la mejor tradición.",
        categoria: "Comida, Restaurant, Loncheria"
      },
      {
        nombre: "Reconstrucción y Endodoncia RyE",
        eslogan: "Cuidando tus dientes.",
        telefonos: [{nombre: "Consultorio", numero: "126 11 36"},
                    {nombre: "Celular", numero: "351 107 44 40"}],
        imagen: "img/contactos/dentista.png",
        descripcion: "C.D.E.E Gerardo Armando Anaya López.",
        direccion: "Dr. Verduzco #107 Col. Centro",
        categoria: "Salud, Dentista"
      },
      {
        nombre: "Taxis",
        eslogan: "Ingresa para ver más números.",
        telefonos: [{nombre: "Taxis Azteca", numero: "517 96 79"},
                    {nombre: "Taxis Halcón Real", numero: "520 59 81"},
                    {nombre: "Taxis Halcón Real", numero: "520 58 58"},
                    {nombre: "Taxis Jardinadas", numero: "515 36 33"},
                    {nombre: "Taxis Plus", numero: "51 78 009"},
                    {nombre: "Taxis Villas", numero: "520 82 01"}],
        imagen: "img/contactos/taxi.png",
        descripcion: "",
        categoria: "Azteca, Halcón Real, Jardinadas, Plus, Villas"
      },
      {
        nombre: "Tintorería Ecoclean",
        eslogan: "",
        telefonos: [{nombre: "Principal", numero: "515 53 73"},
                    {nombre: "Celular Mario", numero: "351 129 0415"}],
        imagen: "img/contactos/ecoclean.png",
        descripcion: "",
        categoria: "Lavandería"
      },
      {
        nombre: "Ultraklin",
        eslogan: "Productos de limpieza a domicilio.",
        telefonos: [{nombre: "Nena", numero: "351 913 5457"}],
        imagen: "img/contactos/ultraklin.png",
        descripcion: "Jabón, limpiadores y mucho más.",
        categoria: ""
      }
    ];
  }
  //Retorna todos los objetos
  obtenerTodos(){
    return Promise.resolve(this.data);
  }
  //Filtra de acuedo a la cadena recibida. Busca en el nombre, la categoría o la descripción del contacto.
  filtar(cadena){
    return this.data.filter((contacto) => {
      return contacto.nombre.toLowerCase().indexOf(cadena.toLowerCase()) > -1 
      || contacto.categoria.toLowerCase().indexOf(cadena.toLowerCase()) > -1
      || contacto.descripcion.toLowerCase().indexOf(cadena.toLowerCase()) > -1;
    })
  }
}