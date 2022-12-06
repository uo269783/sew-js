class Meteo {
    apikey = "45a626aeb1c76b9584561dc2a38649ce";
    enlace = "https://api.openweathermap.org/data/2.5/weather?q=";
    unidades = "&units=metric";
    idioma = "&lang=es";
    ciudades = ["Piedrasblancas", "La Braña", "Gijón", "Oviedo", "Laviana"];
    enlaceIcono = "https://openweathermap.org/img/w/";

    constructor() {

    }

    cargarDatos() {
        $('body').append("<dl></dl>");

        for (var c in this.ciudades) {
            this.apiCall(this.ciudades[c]);
        }


    };

    cargarCiudad(ciudad, json) {
        var info = "Tiempo: " + json.weather[0].description + ", temperatura: " + json.main.temp + "º, velocidad del viento: " + json.wind.speed + "m/s";
        var icono = this.enlaceIcono + json.weather[0].icon + ".png";

        info += " <img src=\"" + icono + "\" alt=\"Tiempo en " + ciudad + "\" /></a>";

        $('dl').append("<dt>" + ciudad + ":</dt>");
        $('dt:last-child').after("<dd>" + info + "</dd>");
    };

    apiCall(ciudad) {
        var url = this.enlace + ciudad + this.unidades + this.idioma + "&APPID=" + this.apikey;
        var meteo = this;
        $.ajax({
            dataType: "json",
            url: url,
            method: 'GET',
            success: function (data) {
                meteo.cargarCiudad(ciudad, data);
            },
            error: function () {
                console.log("Algo ha ido mal");
            }
        });

    }

}

var meteo = new Meteo();
meteo.cargarDatos();