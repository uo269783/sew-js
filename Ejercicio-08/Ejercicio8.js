class ApiMeteo {

    apikey = "45a626aeb1c76b9584561dc2a38649ce";
    enlace = "http://api.openweathermap.org/data/2.5/weather?q=";
    unidades = "&units=metric";
    idioma = "&lang=es";
    ciudades = ["Piedrasblancas", "Salinas", "Gijón", "Oviedo", "Laviana"];

    constructor() {

    }

    cargarDatos() {
        $('body').append("<table><tr><th>Ciudad</th><th>Tiempo</th><th>Icono</th></tr></table>");
    }

}

var m = new ApiMeteo();
m.cargarDatos();

