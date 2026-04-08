"use strict";

//------------------------VARIABLES GLOBALES------------------------------------
var empresas =[];
var usuario_actual = new Usuario();
var creditos = [];
var notificaciones = [];
var citas = [];
var gestiones = [];
var FECHA = new Date();
var identificador_aux = 0;
//Variable que almacena el indice de la empresa
//con la que se van a filtrar los créditos
var indice_empresa = 0;


//-----------------------------PROTOTIPOS---------------------------------------
/*Prototipos que guardan los datos obtenidos al consumir los servicios.*/
function Usuario(){
  this.id = "";
  this.nombre = "";
  this.usuario =  "";
  this.contrasenia =  "";
  this.codigo_sesion = "";
  this.tipo_usuario = 0;    //0. N/A  1. Administrador  2. Gestor   3.Gestor externo
  this.toString = function(){
    return "Nombre: " + this.nombre
        + "\nIdentificador: " + this.id
        + "\nUsuario: " + this.usuario
        + "\nContraseña: " + this.contrasenia
        + "\nCódigo de sesión: " + this.codigo_sesion
        + "\nTipo de usuario: " + this.tipo_usuario
  }
};
function Credito(){
  this.id = 0;
  this.id_gestor = 0;
  this.gestor_nombre = "";
  this.id_agente = 0;
  this.agente_nombre = "";
  this.codigo_productor = 0;
  this.productor_nombre = "";
  this.id_zona = 0;
  this.zona = "";
  this.monto = 0;
  this.monto_actual = 0;
  this.monto_garantizado = 0;
  this.tipo_garantia = "";
  this.tipo_juicio = 0;
  this.estatus = 0;
  this.estatus_externo = 0;
  this.estatus_externo_nombre = "";
  this.fecha_asignacion = "";
  this.fecha_asignacion_externa = "";
  this.fecha_add = "";
  this.toString = function(){
    return "Identificador: " + this.id
        + "\nIdentificador del gestor: " + this.id_gestor
        + "\nNombre del gestor: " + this.gestor_nombre
        + "\nIdentificador del agente: " + this.id_agente
        + "\nNombre del agente: " + this.agente_nombre
        + "\nIdentificador del productor: " + this.codigo_productor
        + "\nNombre del productor: " + this.productor_nombre
        + "\nIdentificador de la zona: " + this.id_zona
        + "\nZona: " + this.zona
        + "\nMonto: " + this.monto
        + "\nMonto actual: " + this.monto_actual
        + "\nMonto garantizado: " + this.monto_garantizado
        + "\nTipo de garantía: " + this.tipo_garantia
        + "\nTipo Juicio: " + this.tipo_juicio
        + "\nEstatus: " + this.estatus
        + "\nEstatus externo: " + this.estatus_externo
        + "\nNombre estatus externo: " + this.estatus_externo_nombre
        + "\nFecha de asignación: " + this.fecha_asignacion
        + "\nFecha de asignación externa: " + this.fecha_asignacion_externa
        + "\nFecha de inserción: " + this.fecha_add
  }
};
function Empresa(){
  this.id = 0;
  this.nombre = "";
  this.toString = function(){
    return "Identificador: " + this.id
         + "\nNombre: " + this.nombre
  }
}
function Gestion(){
  this.id = 0;
  this.id_concepto = 0;
  this.id_credito = 0;
  this.id_forma_pago = 0;
  this.estatus = 0;
  this.monto = 0.0;
  this.telefono = "";
  this.tipo = 0;
  this.notas = "";
  this.fecha = "";
  this.fecha_add = "";
  this.fecha_edit = "";
  this.toString = function(){
    return "id: " + this.id
        + "\n idConcepto: " + this.id_concepto
        + "\n idCrédito: " + this.id_credito
        + "\n id forma de pago: " + this.id_forma_pago
        + "\n Estado: " + this.estatus
        + "\n Monto: " + this.monto
        + "\n Teléfono: " + this.telefono
        + "\n Tipo: " + this.tipo
        + "\n Notas: " + this.notas
        + "\n Fecha: " + this.fecha
        + "\n Fecha de creación: " + this.fecha_add
        + "\n Fecha de edición: " + this.fecha_edit
  }
};
function Cita(){
  this.id = 0;
  this.id_gestor = 0;
  this.gestor_nombre = "";
  this.codigo_productor = 0;
  this.productor_nombre = "";
  this.estatus = 0;
  this.fecha = "";
  this.fecha_edit = "";
  this.lugar = "";
  this.notas = "";
  this.notas_finales = "";
  this.titulo = "";
  this.toString = function(){
    return "id: " + this.id
        + "\nTitulo: " + this.titulo
        + "\nIdentificador del gestor: " + this.id_gestor
        + "\nNombre del gestor: " + this.gestor_nombre
        + "\nCódigo del productor: " + this.codigo_productor
        + "\nNombe del productor: " + this.productor_nombre
        + "\nEstatus: " + this.estatus
        + "\nFecha: " + this.fecha
        + "\nFecha de edición: " + this.fecha_edit
        + "\nLugar: " + this.lugar
        + "\nNotas: " + this.notas
        + "\nNotas finales: " + this.notas_finales
  }
};
function Notificacion(){
  this.id = 0;
  this.id_gestor = 0;
  this.gestor_nombre = ""
  this.codigo_productor = 0;
  this.productor_nombre = "";
  this.estatus = 0;
  this.fecha = "";
  this.mensaje = "";
  this.tipo = 0;
  this.toString = function(){
    return "id: " + this.id
        + "\nIdentificador del gestor: " + this.id_gestor
        + "\nNombre del gestor: " + this.gestor_nombre
        + "\nCódigo del productor: " + this.codigo_productor
        + "\nNombre del productor: " + this.productor_nombre
        + "\nEstatus: " + this.estatus
        + "\nFecha: " + this.fecha
        + "\nMensaje: " + this.mensaje
        + "\nTipo: " + this.tipo
  }
};


//----------VARIABLES Y FUNCIONES POR DEFECTO DE FRAMEWORK7---------------------
//Se inizializa la aplicación
var myApp = new Framework7({
  material: true
});

//Variable para usar la librería DOM
var $$ = Dom7;

//Se agrega la vista principal
var mainView = myApp.addView('.view-main', {
});

//Calendario
var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto' , 'Septiembre' , 'Octubre', 'Noviembre', 'Diciembre'];
var calendarInline = myApp.calendar({
  container: '#calendar-inline-container',
  value: [new Date()],
  weekHeader: false,
  header: false,
  footer: false,
  toolbarTemplate:
    '<div class="toolbar calendar-custom-toolbar">' +
      '<div class="toolbar-inner">' +
        '<div class="left">' +
          '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
        '</div>' +
        '<div class="center"></div>' +
        '<div class="right">' +
          '<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
        '</div>' +
      '</div>' +
    '</div>',
  onOpen: function (p) {
    $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
    $$('.calendar-custom-toolbar .left .link').on('click', function () {
      calendarInline.prevMonth();
    });
    $$('.calendar-custom-toolbar .right .link').on('click', function () {
      calendarInline.nextMonth();
    });
  },
  onMonthYearChangeStart: function (p) {
    $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
  },
  onDayClick: function (p, dayContainer, year, month, day){
    var aux = parseInt(month);
    FECHA = year + "-" + (++aux) + "-" + day;
    refrescar_calendario();
  }
});


//---------------------------------EVENTOS--------------------------------------
$(document).ready(function(){
  $(".login-screen input[name=username]").val("gestor@admix.com.mx");
  $(".login-screen input[name=password]").val("123456");

  $("#btn_ingresar").click(function(){
    usuario_actual.usuario = $(".login-screen input[name=username]").val();
    usuario_actual.contrasenia = $(".login-screen input[name=password]").val();
    iniciar_sesion();
    obtener_lista_empresas();
    publicar_lista_empresas();
    /*Se envía por defecto el indice 0 para que los créditos se
    filtren por la primera empresa*/
    refrescar_creditos();
  });
});
$$(document).on('ajaxStart', function (e) {
    if (e.detail.xhr.requestUrl.indexOf('autocomplete-languages.json') >= 0) {
        // Don't show preloader for autocomplete demo requests
        return;
    }
    myApp.showIndicator();
});
$$(document).on('ajaxComplete', function (e) {
    if (e.detail.xhr.requestUrl.indexOf('autocomplete-languages.json') >= 0) {
        // Don't show preloader for autocomplete demo requests
        return;
    }
    myApp.hideIndicator();
});
$$('#tab1').on('show', function () {
    refrescar_creditos();
});
$$('#tab2').on('show', function () {
    refrescar_calendario();
});
$$('#tab3').on('show', function () {
    refrescar_alertas()
});

//Eventos del panel lateral
$$('.open-right-panel').on('click', function (e) {
  myApp.openPanel('right');
});


//------------------FUNCIONES PARA CONSUMIR LOS SERVICIOS-----------------------
/*Funcines que consumen sus respectivos servicios. Realizan una
solicitud AJAX y guardan los datos en arreglos.*/
function iniciar_sesion(){
  $.ajax({
    url: "http://54.244.63.233:9090/SBBerries.svc/json/dbGestores_Sesion",
    method: "POST",
    dataType: "json",
    async: false,
    contentType: 'application/json; charset=utf-8',
    data: '{"Request": {"UserName": "' + usuario_actual.usuario + '", "Pwd": "'
          + usuario_actual.contrasenia+'"}}',

    success: function(data){
      var respuesta = data.Response;
      if(data.dbGestores_SesionResult){
        myApp.closeModal('.login-screen');
        //Almacenamos el objeto recibido en la variable usuario_actual
        usuario_actual.nombre = respuesta.Nombre;
        usuario_actual.codigo_sesion = respuesta.Codigo_Sesion;
        usuario_actual.tipo_usuario = respuesta.Tipo;
        usuario_actual.id = respuesta.id;
      }else{
        myApp.alert(respuesta.Error.Message + " " + respuesta.Error.Solution,
                    "ERROR: " + respuesta.Error.Code + ". ");
      }
      $(".login-screen input[name=password]").val("");
    },
  });
}
function obtener_lista_empresas(){
  $.ajax({
    url: "http://54.244.63.233:9090/SBBerries.svc/json/dbEmpresas_Get",
    method: "POST",
    dataType: "json",
    async: false,
    contentType: 'application/json; charset=utf-8',
    data: '{"Request": {"id": 0, "Codigo_Sesion": "'+ usuario_actual.codigo_sesion +'"}}',

    success: function(data){
      empresas = [];
      var respuesta = data.Response;
      if(data.dbEmpresas_GetResult){
        var aux;
        var empresa_aux;
        for(aux = 0; aux < respuesta.List_Empresas.length; aux++){
          empresa_aux = new Empresa();
          empresa_aux.nombre = respuesta.List_Empresas[aux].Nombre;
          empresa_aux.id = respuesta.List_Empresas[aux].id;

          empresas.push(empresa_aux);
        }
      }else{
        if(respuesta.Error.Code !== "EMPACS01"){
          myApp.alert(respuesta.Error.Message + " " + respuesta.Error.Solution,
          "ERROR: " + respuesta.Error.Code + ". ");
        }
      }
    },

    error: function(jqXHR, testStatus, ErrorThrown){
      console.log(jqXHR);
    }
  });
}
//Parámetro: Recibe el indice de la empresa en su arreglo para hacer el filtrado.
function obtener_lista_creditos(){
  $.ajax({
    url: "http://54.244.63.233:9090/SBBerries.svc/json/dbCreditos_GetAll",
    method: "POST",
    dataType: "json",
    async: false,
    contentType: 'application/json; charset=utf-8',
    data: '{"Request": {"id": 0, "Codigo_Sesion": "'+ usuario_actual.codigo_sesion +'",'
        +'"IdGestor":' + usuario_actual.id + ', "IdEmpresa":'+ empresas[indice_empresa].id + '}}',

    success: function(data){
      var respuesta = data.Response;
      if(data.dbCreditos_GetAllResult){
        var aux;
        var credito_aux;
        for(aux = 0; aux < respuesta.List_Creditos_All.length; aux++){
          credito_aux = new Credito();

          credito_aux.id = respuesta.List_Creditos_All[aux].id;
          credito_aux.id_gestor = respuesta.List_Creditos_All[aux].IdGestor;
          credito_aux.gestor_nombre = respuesta.List_Creditos_All[aux].GestorNombre;
          credito_aux.id_agente = respuesta.List_Creditos_All[aux].IdAgente;
          credito_aux.agente_nombre = respuesta.List_Creditos_All[aux].AgenteNombre;
          credito_aux.codigo_productor = respuesta.List_Creditos_All[aux].Cod_Prod;
          credito_aux.productor_nombre = respuesta.List_Creditos_All[aux].ProductorNombre;
          credito_aux.id_zona = respuesta.List_Creditos_All[aux].IdZona;
          credito_aux.zona = respuesta.List_Creditos_All[aux].Zona;
          credito_aux.monto = respuesta.List_Creditos_All[aux].Monto;
          credito_aux.monto_actual = respuesta.List_Creditos_All[aux].MontoActual;
          credito_aux.monto_garantizado = respuesta.List_Creditos_All[aux].Monto_Garantizado;
          credito_aux.tipo_garantia = respuesta.List_Creditos_All[aux].Tipo_Garantia;
          credito_aux.tipo_juicio = respuesta.List_Creditos_All[aux].Tipo_Juicio;
          credito_aux.estatus = respuesta.List_Creditos_All[aux].Estatus;
          credito_aux.estatus_externo = respuesta.List_Creditos_All[aux].Estatus_Externo;
          credito_aux.estatus_externo_nombre = respuesta.List_Creditos_All[aux].Estatus_ExternoNombre;
          credito_aux.fecha_asignacion = respuesta.List_Creditos_All[aux].Fecha_Asignacion;
          credito_aux.fecha_asignacion_externa = respuesta.List_Creditos_All[aux].Fecha_Asignacion_Externa;
          credito_aux.fecha_add = respuesta.List_Creditos_All[aux].Fecha_Add;

          creditos.push(credito_aux);
        }
      }else{
        if(respuesta.Error.Code === "CRA01"){
          myApp.alert("Ningún crédito ha sido asignado para esta empresa.",
          "Seleccione otra empresa.");
        }else{
          myApp.alert(respuesta.Error.Message + " " + respuesta.Error.Solution,
          "ERROR: " + respuesta.Error.Code + ". ");
        }
      }
    },

    error: function(jqXHR, testStatus, ErrorThrown){
      console.log(jqXHR);
    }
  });
}
function obtener_lista_gestiones(id){
  $.ajax({
    url: "http://54.244.63.233:9090/SBBerries.svc/json/dbCreditos_Gestiones_Get",
    method: "POST",
    dataType: "json",
    async: false,
    contentType: 'application/json; charset=utf-8',
    data: '{"Request": {"id": "0", "Codigo_Sesion": "'+ usuario_actual.codigo_sesion +'", "IdCredito":"' + id + '"}}',

    success: function(data){
      var respuesta = data.Response;
      if(data.dbCreditos_Gestiones_GetResult){
        var aux;
        var gestion_aux;
        for(aux = 0; aux < respuesta.List_Creditos_Gestiones.length; aux++){
          gestion_aux = new Gestion();
          gestion_aux.id = respuesta.List_Creditos_Gestiones[aux].id;
          gestion_aux.id_concepto = respuesta.List_Creditos_Gestiones[aux].IdConcepto;
          gestion_aux.id_credito = respuesta.List_Creditos_Gestiones[aux].IdCredito;
          gestion_aux.id_forma_pago = respuesta.List_Creditos_Gestiones[aux].IdFormaPago;
          gestion_aux.estatus = respuesta.List_Creditos_Gestiones[aux].Estatus;
          gestion_aux.monto = respuesta.List_Creditos_Gestiones[aux].Monto;
          gestion_aux.telefono = respuesta.List_Creditos_Gestiones[aux].Telefono;
          gestion_aux.tipo = respuesta.List_Creditos_Gestiones[aux].Tipo;
          gestion_aux.fecha = respuesta.List_Creditos_Gestiones[aux].Fecha;
          gestion_aux.fecha_add = respuesta.List_Creditos_Gestiones[aux].Fecha_Add;
          gestion_aux.fecha_edit = respuesta.List_Creditos_Gestiones[aux].Fecha_Edit;
          gestion_aux.notas = respuesta.List_Creditos_Gestiones[aux].Notas;
          gestiones.push(gestion_aux);
        };
      }else{
        myApp.alert(respuesta.Error.Message + " " + respuesta.Error.Solution,
        "ERROR: " + respuesta.Error.Code + ". ");
      }
     },

    error: function(jqXHR, testStatus, ErrorThrown){
      console.log(jqXHR);
    }
  });
};
function obtener_lista_citas(){
  $.ajax({
    url: "http://54.244.63.233:9090/SBBerries.svc/json/dbGestores_Agenda_GetAll",
    method: "POST",
    dataType: "json",
    async: false,
    contentType: 'application/json; charset=utf-8',
    data: '{"Request": {"id": "0", "Codigo_Sesion": "'+ usuario_actual.codigo_sesion +'", "FiltroFecha": "' + FECHA +'"}}',

    success: function(data){
      var respuesta = data.Response;
      if(data.dbGestores_Agenda_GetAllResult){
        var aux;
        var cita_aux;
        for(aux = 0; aux < respuesta.List_Gestores_Agenda_All.length; aux++){
          cita_aux = new Cita();
          cita_aux.id = respuesta.List_Gestores_Agenda_All[aux].id;
          cita_aux.titulo = respuesta.List_Gestores_Agenda_All[aux].Titulo;
          cita_aux.id_gestor = respuesta.List_Gestores_Agenda_All[aux].IdGestor;
          cita_aux.gestor_nombre = respuesta.List_Gestores_Agenda_All[aux].GestorNombre;
          cita_aux.productor_nombre = respuesta.List_Gestores_Agenda_All[aux].ProductorNombre;
          cita_aux.codigo_productor = respuesta.List_Gestores_Agenda_All[aux].Cod_Prod;
          cita_aux.estatus = respuesta.List_Gestores_Agenda_All[aux].Estatus;
          cita_aux.fecha = respuesta.List_Gestores_Agenda_All[aux].Fecha;
          cita_aux.fecha_edit = respuesta.List_Gestores_Agenda_All[aux].Fecha_Edit;
          cita_aux.lugar = respuesta.List_Gestores_Agenda_All[aux].Lugar;
          cita_aux.notas = respuesta.List_Gestores_Agenda_All[aux].Notas;
          cita_aux.notas_finales = respuesta.List_Gestores_Agenda_All[aux].Notas_Finales;
          citas.push(cita_aux);
        };
      }else{
        if(data.Response.Error.Code !== "GAA01"){
          myApp.alert(respuesta.Error.Message + " " + respuesta.Error.Solution,
          "ERROR: " + respuesta.Error.Code + ". ");
        }
      }
     },

    error: function(jqXHR, testStatus, ErrorThrown){
      console.log(jqXHR);

    }
  });
};
function obtener_lista_notificaciones(){
  $.ajax({
    url: "http://54.244.63.233:9090/SBBerries.svc/json/dbGestores_Alertas_GetAll",
    method: "POST",
    dataType: "json",
    async: false,
    contentType: 'application/json; charset=utf-8',
    data: '{"Request": {"Codigo_Sesion": "'+ usuario_actual.codigo_sesion +'", "id": 0}}',

    success: function(data){
      var respuesta = data.Response;
      if(data.dbGestores_Alertas_GetAllResult){
        var aux;
        var notificacion_aux;
        for(aux = 0; aux < respuesta.List_Gestores_Alertas_All.length; aux++){
          notificacion_aux = new Notificacion();
          notificacion_aux.id = respuesta.List_Gestores_Alertas_All[aux].id;
          notificacion_aux.id_gestor = respuesta.List_Gestores_Alertas_All[aux].IdGestor;
          notificacion_aux.codigo_productor = respuesta.List_Gestores_Alertas_All[aux].Cod_Prod;
          notificacion_aux.gestor_nombre = respuesta.List_Gestores_Alertas_All[aux].GestorNombre;
          notificacion_aux.productor_nombre = respuesta.List_Gestores_Alertas_All[aux].ProductorNombre;
          notificacion_aux.mensaje = respuesta.List_Gestores_Alertas_All[aux].Mensaje;
          notificacion_aux.fecha = respuesta.List_Gestores_Alertas_All[aux].Fecha_Add;
          notificacion_aux.estatus = respuesta.List_Gestores_Alertas_All[aux].Estatus;
          notificacion_aux.tipo = respuesta.List_Gestores_Alertas_All[aux].Tipo;

          notificaciones.push(notificacion_aux);
        }
      }else{
        myApp.alert(respuesta.Error.Message + " " + respuesta.Error.Solution,
        "ERROR: " + respuesta.Error.Code + ". ");
      }
    },

    error: function(jqXHR, testStatus, ErrorThrown){
      console.log(jqXHR);
    }
  });
};


//--------------FUNCIONES QUE PUBLICAN LOS DATOS OBTENIDOS----------------------
function publicar_lista_empresas(){
  var x;
  var cadena = '<div class="panel-overlay"></div>'
  + '<div class="panel panel-right panel-cover">'
  +  '<div class="content-block">'
  +    '<h3>Empresas</h3>'
  +    '<div class="list-block">'
  +      '<ul>';

  for(x = 0; x < empresas.length; x++){
    var checked = "";
    if(x === 0){
      checked = "checked";
    }
    var empresa_aux = empresas[x];
    cadena += "<li>"
      + "<label onclick='cambiar_empresa_defecto(" + empresa_aux.id
      + ")' class='label-radio item-content'>"
      +   "<input type='radio' name='ks-radio' value='" + empresa_aux.nombre + "'" + checked + ">"
      +     "<div class='item-media'>"
      +       "<i class='icon icon-form-radio'></i>"
      +     "</div>"
      +     "<div class='item-inner'>"
      +       "<div class='item-title'>" + empresa_aux.nombre+ "</div>"
      +     "</div>"
      +   "</label>"
      + "</li>";
  }
    cadena +=  '</ul></div></div></div>'
    $(document.body).append(cadena);

};
function publicar_lista_creditos(){
  $("#lista_creditos").empty();
  var x;
  for(x = 0; x < creditos.length; x++){
    var credito_aux = creditos[x];
    var fecha = obtener_fecha(credito_aux.fecha_asignacion);
    $("#lista_creditos").append("<li>"
      + "<a onClick=\"publicar_detalles_credito(" + credito_aux.id
      + ")\" href=\"detalles_caso.html\" class=\"item-link item-content\">"
      +    "<div class=\"item-media\"><img src=\""
      + obtener_img_estado(credito_aux.estatus) + "\" width=\"80\"></div>"
      +       "<div class=\"item-inner\">"
      +           "<div class=\"item-title-row\">"
      +               "<div class=\"item-title\">Productor: "+ credito_aux.productor_nombre + "</div>"
      +                  "<div class=\"item-after\">Monto: "+ obtener_monto(credito_aux.monto)
      + "<br><br>Zona: " + credito_aux.zona + "</div>"
      +              "</div>"
      +           "<div class=\"item-subtitle\">Gestor: " + credito_aux.gestor_nombre
      + "<br>Agente: " + credito_aux.agente_nombre + "</div>"
      +       "</div>"
      + "</a>"
      + "</li>");
  }
};
function publicar_lista_citas(){
  $("#lista_citas").empty();
  var x;
  for(x = 0; x < citas.length; x++){
    var cita_aux = citas[x];
    var fecha = obtener_fecha(cita_aux.fecha);
    $("#lista_citas").append("<li>"
      + "<a href=\"detalles_calendario.html\" onclick = 'publicar_detalles_cita(" + cita_aux.id + ")' class=\"item-link item-content\">"
      +    "<div class=\"item-media\"><img src=\"" + obtener_img_estado_cita(cita_aux.estatus) + "\" width=\"80\"></div>"
      +       "<div class=\"item-inner\">"
      +           "<div class=\"item-title-row\">"
      +               "<div class=\"item-title\">"+ cita_aux.titulo + "</div>"
      +                  "<div class=\"item-after\">"+ fecha.toLocaleString() + "</div>"
      +              "</div>"
      +           "<div class=\"item-subtitle\">Productor: " + cita_aux.productor_nombre + "</div>"
      +           "<div class=\"item-text\">"
      +              "<p>Lugar: " + cita_aux.lugar + "</p>"
      +           "</div>"
      +       "</div>"
      + "</a>"
      + "</li>");

      if(cita_aux.estatus === 3){
        $("#lista_citas li:last-child").addClass("disabled");
      }
  }
};
function publicar_lista_notificaciones(){
  $("#lista_alarmas").empty();
  var x;
  for(x = 0; x < notificaciones.length; x++){
    var notificacion_aux = notificaciones[x];
    var fecha = obtener_fecha(notificacion_aux.fecha);
    $("#lista_alarmas").append("<li>"
      + "<a onClick=\"detalles_notificacion(" + notificacion_aux.id + ")\" href=\"detalles_alerta.html\" class=\"item-link item-content\">"
      +       "<div class=\"item-inner\">"
      +           "<div class=\"item-title-row\">"
      +               "<div class=\"item-title\">Productor: "+ notificacion_aux.productor_nombre + "</div>"
      +                  "<div class=\"item-after\">"+ fecha.toLocaleDateString() + "</div>"
      +              "</div>"
      +           "<div class=\"item-subtitle\">Mensaje: " + notificacion_aux.mensaje + "</div>"
      +           "<div class=\"item-text\">"
      +              "<p>" + obtener_tiempoDesde(notificacion_aux.fecha) + "</p>"
      +           "</div>"
      +       "</div>"
      + "</a>"
      + "</li>");

      if(notificacion_aux.estatus === 0){
        $("#lista_alarmas li:last-child").css("background-color", "#ecf0f7");
      }
  }
};
function publicar_lista_gestiones(){
  $("#lista_gestion_creditos").empty();
  var x;
  var gestion_aux;
  var cadena = "";
  var monto = "";
  var fecha;
  for(x = 0; x < gestiones.length; x++){
    gestion_aux = gestiones[x];
    fecha = obtener_fecha(gestion_aux.fecha_add);
    switch (gestion_aux.tipo) {
      case 1, 2, 4:
        monto = "<div class=\"item-subtitle\">" + obtener_monto(gestion_aux.monto) + "</div>";
        break;
      default:
        monto = "";
    }

    cadena += "<li>"
      + "<a onClick=\"detalles_gestion(" + gestion_aux.id + ")\" href=\"detalles_gestion.html\" class=\"item-link item-content\">"
      +    "<div class=\"item-media\"><img src=\"" + obtener_img_tipo_gestion(gestion_aux.tipo) + "\" width=\"80\"></div>"
      +       "<div class=\"item-inner\">"
      +           "<div class=\"item-title-row\">"
      +               "<div class=\"item-title\">"+ obtener_tipo_gestion(gestion_aux.tipo) + "</div>"
      +                  "<div class=\"item-after\">"+ fecha.getDay() + "/" + fecha.getMonth() + "/" + fecha.getFullYear() + "</div>"
      +              "</div>"
      +           monto
      +           "<div class=\"item-text\">"
      +              "<p>" + "Notas: " + gestion_aux.notas + "</p>"
      +           "</div>"
      +       "</div>"
      + "</a>"
      + "</li>";
  }
    setTimeout(function(){
      $("#lista_gestion_creditos").append(cadena);
    }, 100);
};
function publicar_detalles_credito(id_credito){
  var credito_aux;
  var x;
  var cadena;
  for(x = 0; x < creditos.length; x++){
    if(id_credito === creditos[x].id){
      credito_aux = creditos[x];

      var fecha_cartera = obtener_fecha(credito_aux.fecha_add);
      var fecha_asignacion = obtener_fecha(credito_aux.fecha_asignacion);
      var fecha_asignacion_externa = obtener_fecha(credito_aux.fecha_asignacion_externa)

      setTimeout(function(){
        $("#contenedor_caso").append("<div class='item-media detalles' style='display: inline-block'>"
        + "<img style='position: relative;top: 50%;transform: translateY(-50%);' src='" + obtener_img_estado(credito_aux.estatus) + "'></div><div style='display:inline-block; padding-left:5%'>"
        + "<p><span style=\"font-weight: bold\">Productor:</span> "+ credito_aux.productor_nombre + "</p>"
        + "<p><span style=\"font-weight: bold\">Gestor encargado: </span>" + credito_aux.gestor_nombre + "</p>"
        + "<p><span style=\"font-weight: bold\">Agente: </span>" + credito_aux.agente_nombre +"</p></div>"
        + '<div class="list-block accordion-list">'
        + '<ul><li class="accordion-item"><a href="#" class="item-link item-content">'
        + '<div class="item-inner"><div style="color: dodgerblue"class="item-title">Más información: </div>'
        + '</div></a><div class="accordion-item-content"><div class="content-block">'
        + '<p><span style=\"font-weight: bold\">Zona: </span>' + credito_aux.zona + '</p>'
        + '<p><span style=\"font-weight: bold\">En cartera desde: </span>' + fecha_cartera.toLocaleDateString() + '</p>'
        + '<p><span style=\"font-weight: bold\">Fecha de asignación: </span>' + fecha_asignacion.toLocaleDateString() + '</p>'
        + '<p><span style=\"font-weight: bold\">Fecha de asignación externa: </span>' + fecha_asignacion_externa.toLocaleDateString() + '</p>'
        + '<p><span style=\"font-weight: bold\">Saldo inicial: </span>' + obtener_monto(credito_aux.monto) + '</p>'
        + '<p><span style=\"font-weight: bold\">Saldo actual: </span>' + obtener_monto(credito_aux.monto_actual) + '</p>'
        + '<p><span style=\"font-weight: bold\">Monto garantizado: </span>' + obtener_monto(credito_aux.monto_garantizado) + '</p>'
        + '<p><span style=\"font-weight: bold\">Tipo de juicio: </span>' + credito_aux.tipo_juicio + '</p>'
        + '<p><span style=\"font-weight: bold\">Tipo de garantía: </span>' + credito_aux.tipo_garantia + '</p>'
        + '</div></div></li></ul>'
      );}
      , 100);

      refrescar_detalles_creditos(credito_aux.id);
    }
  }
}
function publicar_detalles_cita(id_cita){
  var cita_aux;
  var x;
  var cadena;
  for(x = 0; x < citas.length; x++){
    if(id_cita === citas[x].id){
      cita_aux = citas[x];

      var fecha = obtener_fecha(cita_aux.fecha);
      var fecha_edicion = obtener_fecha(cita_aux.fecha_edit);

      setTimeout(function(){
        $("#contenedor_detalles_credito").append("<div class='item-media detalles' style='display: inline-block'>"
        + "<img style='position: relative;top: 50%;transform: translateY(-50%);' src='"
        + obtener_img_estado_cita(cita_aux.estatus) + "'></div><div style='display:inline-block; padding-left:5%'>"
        + "<p><span style=\"font-weight: bold\">Titulo:</span> "+ cita_aux.titulo + "</p>"
        + "<p><span style=\"font-weight: bold\">Fecha: </span>" + fecha.toLocaleString() + "</p>"
        + "<p><span style=\"font-weight: bold\">Productor: </span>" + cita_aux.productor_nombre +"</p></div>"
        + '<div class="list-block accordion-list">'
        + '<ul><li class="accordion-item"><a href="#" class="item-link item-content">'
        + '<div class="item-inner"><div style="color: dodgerblue"class="item-title">Más información: </div>'
        + '</div></a><div class="accordion-item-content"><div class="content-block">'
        + '<p><span style=\"font-weight: bold\">Lugar: </span>' + cita_aux.lugar + '</p>'
        + '<p><span style=\"font-weight: bold\">Gestor: </span>' + cita_aux.gestor_nombre + '</p>'
        + '<p><span style=\"font-weight: bold\">Estado: </span>' + cita_aux.estatus + '</p>'
        + '<p><span style=\"font-weight: bold\">Última edición: </span>' + fecha_edicion.toLocaleString() + '</p>'
        + '<p><span style=\"font-weight: bold\">Notas finales: </span>' + cita_aux.notas_finales + '</p>'
        + '</div></div></li></ul>'
      );}
      , 100);

      setTimeout(function(){$("#notas_gestion").append(cita_aux.notas);}, 100);
    }
  }
}
function detalles_gestion(id_gestion){
  var gestion_aux;
  var x;
  var cadena = "";
  for(x = 0; x < gestiones.length; x++){
    if(id_gestion === gestiones[x].id){
      gestion_aux = gestiones[x];
      var fecha_agregacion = obtener_fecha(gestion_aux.fecha_add);
      var fecha = obtener_fecha(gestion_aux.fecha);

      cadena += "<div class='item-media detalles' style='display: inline-block'>"
      + "<img style='position: relative;top: 50%;transform: translateY(-50%);' src='"
      + obtener_img_tipo_gestion(gestion_aux.tipo) + "'></div><div style='display:inline-block; padding-left:5%'>"
      + "<p><span style=\"font-weight: bold\">Tipo:</span> "+ obtener_tipo_gestion(gestion_aux.tipo) + "</p>"
      + "<p><span style=\"font-weight: bold\">Fecha: </span>" + fecha.toLocaleDateString() +"</p>"
      + '<p><span style=\"font-weight: bold\">Fecha de agregación: </span>' + fecha_agregacion.toLocaleDateString() + '</p></div>'
      + '<div class="list-block accordion-list">'
      + '<ul><li class="accordion-item"><a href="#" class="item-link item-content">'
      + '<div class="item-inner"><div style="color: dodgerblue" class="item-title">Más información: </div>'
      + '</div></a><div class="accordion-item-content"><div class="content-block">';

      //Si es Abono, promesa de pago o gasto se mostrará el monto
      if(gestion_aux.tipo === 1 || gestion_aux.tipo === 2 || gestion_aux.tipo === 4){
        cadena += "<p><span style=\"font-weight: bold\">Monto: </span>" + obtener_monto(gestion_aux.monto) + "</p>"
        cadena += "<p><span style=\"font-weight: bold\">Forma de pago: </span>" + gestion_aux.id_forma_pago + "</p>"
      }
      //Si es gasto
      if(gestion_aux.tipo === 4){
        cadena += "<p><span style=\"font-weight: bold\">Concepto: </span>" + gestion_aux.id_concepto + "</p>"
      }

      //Si es llamada se muestra el número
      if(gestion_aux.tipo === 3){
        cadena += "<p><span style=\"font-weight: bold\">Teléfono: </span>" + gestion_aux.telefono + "</p>"
      }

      cadena += '<p><span style=\"font-weight: bold\">Estado: </span>' + gestion_aux.estatus + '</p>'
      + '</div></div></li></ul>';
      setTimeout(function(){$("#contenedor_detalles_credito").append(cadena);}, 100);
      setTimeout(function(){$("#notas_gestion").append(gestion_aux.notas);}, 100);
    }
  }
}
function detalles_notificacion(id_notificacion){
  var notificacion_aux;
  var x;
  var cadena = "";
  for(x = 0; x < notificaciones.length; x++){
    if(id_notificacion === notificaciones[x].id){
      notificacion_aux = notificaciones[x];
      var fecha = obtener_fecha(notificacion_aux.fecha);

      cadena += "<div class='item-media detalles' style='display: inline-block'>"
      + "<img style='position: relative;top: 50%;transform: translateY(-50%);' src='"
      + obtener_img_tipo_alerta(notificacion_aux.tipo) + "'></div><div style='display:inline-block; padding-left:5%'>"
      + "<p><span style=\"font-weight: bold\">Productor:</span> "+ notificacion_aux.productor_nombre + "</p>"
      + "<p><span style=\"font-weight: bold\">Gestor: </span>" + notificacion_aux.gestor_nombre +"</p>"
      + '<p><span style=\"font-weight: bold\">Fecha: </span>' + fecha.toLocaleDateString() + '</p></div>'

      setTimeout(function(){$("#contenedor_detalles_credito").append(cadena);}, 100);
      setTimeout(function(){$("#notas_gestion").append(notificacion_aux.mensaje);}, 100);

      cambiar_a_leido(x);
    }
  }
}



//------------------FUNCIONES DE APOYO PARA LA APLICACIÓN-----------------------
function cambiar_empresa_defecto(id){
  var x;
  for(x = 0; x < empresas.length; x++){
    if(empresas[x].id === id){
      indice_empresa = x;
    }
  }
  refrescar_creditos();
}
/*Función que recibe una fecha sin procesar y la retorna procesada*/
function obtener_fecha(fecha){
  var aux = fecha.slice(6, fecha.length-7);
  var fecha_procesada = new Date(parseFloat(aux));

  return fecha_procesada;
}
/*Funcion que recibe una fecha en formato 2016-12-31T24:00 y la convierte en Epoch*/
function aEpoch(fecha){
  var mes = parseInt((fecha.slice(5,7)));

  var epoch = new Date(fecha.slice(0,4), --mes, fecha.slice(8,10), fecha.slice(11,13),
          fecha.slice(14,16), 0, 0);
  return "/Date(" + epoch.getTime() + "-0600)/";
}
/*Función que agrega signos y comas al monto*/
function obtener_monto(monto){
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  return formatter.format(monto);
}
function obtener_estado(estatus){
  switch(estatus){
    case 0:
      return "No asignado";
      break;
    case 1:
      return "Activo";
      break;
    case 2:
      return "Convenio";
      break;
    case 3:
      return "Pagado";
      break;
    case 4:
      return "Jurídico externo";
      break;
    case 5:
      return "Castigado";
      break;
    default:
      return "Error al obtener el estado";
  }
};
function obtener_tipo_gestion(tipo){
  switch(tipo){
    case 0:
      return "N/A";
      break;
    case 1:
      return "Abono";
      break;
    case 2:
      return "Promesa de pago";
      break;
    case 3:
      return "Llamada";
      break;
    case 4:
      return "Gasto";
      break;
    case 5:
      return "Cita";
      break;
    default:
      return "Error";
  }
}
/*Función que retorna la url de la imagen que corresponde a cada estado del
crédito*/
function obtener_img_estado(estatus){
  var img_estatus = "";
  switch(estatus){
    case 0:
      img_estatus = "img/exclamation.png";
      break;
    case 1:
      img_estatus = "img/designated.png";
      break;
    case 2:
      img_estatus = "img/handshake.png";
      break;
    case 3:
      img_estatus = "img/checked.png";
      break;
    case 4:
      img_estatus = "img/institution.png";
      break;
    case 5:
      img_estatus = "img/law.png";
      break;
    default:
      img_estatus = "img/error.png";
  }
  return img_estatus;
};
function obtener_img_tipo_gestion(tipo){
  var img_tipo_gestion = "";
  switch(tipo){
    case 0:
      img_tipo_gestion = "img/exclamation.png";
      break;
    case 1:
      img_tipo_gestion = "img/bill.png";
      break;
    case 2:
      img_tipo_gestion = "img/conversation.png";
      break;
    case 3:
      img_tipo_gestion = "img/phone.png";
      break;
    case 4:
      img_tipo_gestion = "img/credit-card.png";
      break;
    case 5:
      img_tipo_gestion = "img/calendar.png";
      break;
    default:
      img_tipo_gestion = "img/error.png";
  }
  return img_tipo_gestion;
}
function obtener_img_estado_cita(tipo){
  var img_tipo_gestion = "";
  switch(tipo){
    case 0:
      img_tipo_gestion = "img/exclamation.png";
      break;
    case 1:
      img_tipo_gestion = "img/calendar.png";
      break;
    case 2:
      img_tipo_gestion = "img/checked.png";
      break;
    case 3:
      img_tipo_gestion = "img/cancel.png";
      break;
    default:
      img_tipo_gestion = "img/error.png";
  }
  return img_tipo_gestion;
}
function obtener_img_tipo_alerta(tipo){
  return "img/error.png";
}

function refrescar_creditos(){
  creditos = [];
  obtener_lista_creditos();
  publicar_lista_creditos();
}
function refrescar_detalles_creditos(id_credito){
  gestiones = [];
  obtener_lista_gestiones(id_credito);
  publicar_lista_gestiones();
}
function refrescar_calendario(){
  citas = [];
  obtener_lista_citas();
  publicar_lista_citas();
}
function refrescar_alertas(){
  notificaciones = [];
  obtener_lista_notificaciones();
  publicar_lista_notificaciones();
}
//Función que se acciona desde el botón de regresar en la página detalles_caso
function actualizar_detalles_creditos(){
  refrescar_detalles_creditos(gestiones[0].id_credito);
}

function cambiar_a_leido(indice_alerta){
  $.ajax({
    url: "http://54.244.63.233:9090/SBBerries.svc/json/dbGestores_Alertas_Read",
    method: "POST",
    dataType: "json",
    async: false,
    contentType: 'application/json; charset=utf-8',
    data: '{"Request": {"id": ' + notificaciones[indice_alerta].id + ', "Codigo_Sesion": "'
    + usuario_actual.codigo_sesion +'"}}',

    success: function(data){
      if(data.dbGestores_Alertas_ReadResult){
        notificaciones[indice_alerta].estatus = 1;
      }else{
        myApp.alert(respuesta.Error.Message + " " + respuesta.Error.Solution,
        "ERROR: " + respuesta.Error.Code + ". ");
      }
    },

    error: function(jqXHR, testStatus, ErrorThrown){
      console.log(jqXHR);
    }
  });
}
function obtener_tiempoDesde(fecha){
  var fecha_procesar = fecha.slice(6,19);

  return timeSince(fecha_procesar)
}
function timeSince(fecha) {
    var segundos = Math.floor((new Date() - fecha) / 1000);
    var intervalo = Math.floor(segundos / 31536000);

    if (intervalo > 1) {
        return "Hace " + intervalo + " años";
    }
    intervalo = Math.floor(segundos / 2592000);
    if (intervalo > 1) {
        return "Hace " + intervalo + " meses";
    }
    intervalo = Math.floor(segundos / 86400);
    if (intervalo > 1) {
        return "Hace " + intervalo + " días";
    }
    intervalo = Math.floor(segundos / 3600);
    if (intervalo > 1) {
        return "Hace " + intervalo + " horas";
    }
    intervalo = Math.floor(segundos / 60);
    if (intervalo > 1) {
        return "Hace " + intervalo + " minutos";
    }
    return "Hace " + Math.floor(segundos) + " segundos";
}





//Agrega una nueva cita/abono/llamada/etc a la BD
function enviar_nueva_cita() {
  var storedData = myApp.formGetData('form_cita');
  if(storedData) {
    if(storedData.Cita_Titulo === "" || storedData.Cita_Lugar === "" || storedData.Notas === ""){
      myApp.alert("Todos los campos son requeridos", "ERROR:");
    }
    console.log(storedData);
  }
  else {
    myApp.alert('No hay datos en la forma');
  }
}
function enviar_nueva_llamada() {
  var storedData = myApp.formGetData('form_llamada');
  if(storedData) {
    if(storedData.Telefono === "" || storedData.Notas === ""){
      myApp.alert("Todos los campos son requeridos", "ERROR:");
    }
    console.log(storedData);
  }
  else {
    myApp.alert('No hay datos en la forma');
  }
}
function enviar_nueva_promesa() {
  var storedData = myApp.formGetData('form_promesa');
  console.log(storedData);
  /*
  if(storedData) {
    if(storedData.Telefono === "" || storedData.Notas === ""){
      myApp.alert("Todos los campos son requeridos", "ERROR:");
    }

  }
  else {
    myApp.alert('No hay datos en la forma');
  }*/
}
//Introduce los valores por defecto de la ventana agregar cita, abono, gasto, etc.
function valores_defecto_cita(){
  var storedData = myApp.formStoreData('form_cita', {
    'Cita_Titulo': '',
    'Cita_Lugar': '',
    'Fecha': fecha_actual(),
    'Notas': "",
  });
}
function valores_defecto_llamada(){
  var storedData = myApp.formStoreData('form_llamada', {
    'Telefono': '',
    'Fecha': fecha_actual(),
    'Notas': "",
  });
}
function valores_defecto_promesa(){
  var storedData = myApp.formStoreData('form_promesa', {
    'Fecha': fecha_actual(),
    'Monto': '0.0',
    'Notas': "",
  });
}
//Retorna la fecha actual con formato 2016-12-31T13:00:00:00.000 para ponerlas por
//defecto en las ventanas de agregar cita, abono, gasto, etc...
function fecha_actual(){
  var fecha = new Date();
  var dia;
  if(fecha.getDate() < 10){
    dia = "0" + fecha.getDate();
  }else{
    dia = fecha.getDate();
  }

  return fecha.getFullYear() + "-" + (fecha.getMonth()+1) + "-" + dia + "T" + (fecha.getHours()+1) + ":00:00.000";
}
//Separa los números de teléfono con un guión
function agrupar_telefono(){
  var num = $$("input[name='Telefono']").val();
  var phone;
  var patron = /([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})/;

  if(patron.test(num)){
    console.log("valido");
  }else{
    console.log("invalido");
  }

  var length = num.toString().length;
  console.log(length);

  if(length >= 4 && length < 7){
    phone = num.replace(/\D*(\d{3})\D*(\d{1})\D*/, '$1 $2');
  }else if(length > 6 && length <= 10){
    phone = num.replace(/\D*(\d{3})\D*(\d{3})\D*(\d{1})\D*/, '$1 $2 $3');
  }

  $$("input[name='Telefono']").val(phone);
}
