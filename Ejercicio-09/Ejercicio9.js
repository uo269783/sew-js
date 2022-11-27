class Meteo {
    apikey = "45a626aeb1c76b9584561dc2a38649ce";
    enlace = "http://api.openweathermap.org/data/2.5/weather?q=";
    unidades = "&units=metric";
    xml = "&mode=xml";
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

    cargarCiudad = function (ciudad, xml) {
        var tiempo = $('weather', xml).attr('value');
        var temp = $('temperature', xml).attr('value');
        var viento = $('wind', xml);
        var velViento = $('speed', viento).attr('value');

        var info = "Tiempo: " + tiempo + ", temperatura: " + temp + "º, velocidad del viento: " + velViento + "m/s";
        var icono = this.enlaceIcono + $('weather', xml).attr('icon') + ".png";

        info += " <img src=\"" + icono + "\" alt=\"Tiempo en " + ciudad + "\" /></a>";

        $('dl').append("<dt>" + ciudad + ":</dt>");
        $('dt:last-child').after("<dd>" + info + "</dd>");
    };

    apiCall = function (ciudad) {
        var url = this.enlace + ciudad + this.xml + this.unidades + this.idioma + "&APPID=" + this.apikey;
        var meteo = this;

        $.ajax({
            dataType: "xml",
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