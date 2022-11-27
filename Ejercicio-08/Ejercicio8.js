var m = new Object();

m.apikey = "45a626aeb1c76b9584561dc2a38649ce";
m.enlace = "http://api.openweathermap.org/data/2.5/weather?q=";
m.unidades = "&units=metric";
m.idioma = "&lang=es";
m.ciudades = ["Piedrasblancas", "La Braña", "Gijón", "Oviedo", "Laviana"];
m.enlaceIcono = "https://openweathermap.org/img/w/";

m.cargarDatos = function () {
    $('body').append("<dl></dl>");

    for (var c in m.ciudades) {
        m.apiCall(m.ciudades[c]);
    }
};

m.cargarCiudad = function (ciudad, json) {
    var info = "Tiempo: " + json.weather[0].description + ", temperatura: " + json.main.temp + "º, velocidad del viento: " + json.wind.speed + "m/s";
    var icono = this.enlaceIcono + json.weather[0].icon + ".png";

    info += " <img src=\"" + icono + "\" alt=\"Tiempo en " + ciudad + "\" /></a>";

    $('dl').append("<dt>" + ciudad + ":</dt>");
    $('dt:last-child').after("<dd>" + info + "</dd>");
};

m.apiCall = function (ciudad) {
    var url = m.enlace + ciudad + m.unidades + m.idioma + "&APPID=" + m.apikey;

    $.ajax({
        dataType: "json",
        url: url,
        method: 'GET',
        success: function (data) {
            m.cargarCiudad(ciudad, data);
        },
        error: function (error) {
            console.log("Algo ha ido mal: " + error);
        }
    });
}

m.cargarDatos();
