class Distancia {

    //utilizo la api de openweather ya que me devuelve las coordenadas de la ciudad buscada
    apikey = "45a626aeb1c76b9584561dc2a38649ce";
    enlace = "https://api.openweathermap.org/data/2.5/weather?q=";
    unidades = "&units=metric";
    idioma = "&lang=es";

    constructor() {
        this.getPosicion();
        var context = this;
        this.primera = true;
        $('document').ready(function () {
            $('input[type=button]').click(context.getDestino.bind(context))
        });


    }

    apiCall(ciudad) {
        var url = this.enlace + ciudad + this.unidades + this.idioma + "&APPID=" + this.apikey;
        var context = this;
        $.ajax({
            dataType: "json",
            url: url,
            method: 'GET',
            success: function (data) {
                context.crearMarcador(data.coord);
                context.obtenerDistancia(data.coord)
            },
            error: function () {
                console.log("Algo ha ido mal");
            }
        });

    }


    getPosicion() {
        var context = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (pos) {
                context.position = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                context.escribirPosicion("Posición del usuario");
            }, function () {
                context.position = {
                    lat: 43.5607904,
                    lng: -5.9864433
                };
                context.escribirPosicion("Piedrasblancas");
            });
        }
    }

    escribirPosicion(val) {
        var texto = "<p>Punto de partida: " + val + "</p>";

        $('form').after(texto);
    }

    dibujarMapa(destino) {
        this.apiCall(destino);
    }

    getDestino() {
        var ciudad = $('input[type=text]').val();
        this.apiCall(ciudad);
    }


    initMap() {
        //centro en Piedrasblancas
        var centro = {
            lat: 43.5607904,
            lng: -5.9864433
        };
        var mapa = new google.maps.Map(document.getElementsByTagName("main")[0], { zoom: 10, center: centro });
        this.mapa = mapa;

    }

    crearMarcador(coords) {
        if (this.marker != null)
            this.marker.setMap(null);
        var punto = { lat: coords.lat, lng: coords.lon };
        this.marker = new google.maps.Marker({ position: punto, map: this.mapa })
    }

    obtenerDistancia(coords) {
        var lat2 = Number(coords.lat);
        var lat1 = Number(this.position.lat);
        var lng2 = Number(coords.lon);
        var lng1 = Number(this.position.lng);

        var radio = 6371; //radio de la Tierra 

        var x1 = lat2 - lat1;
        var x2 = lng2 - lng1;

        var anguloLat = this.radianes(x1)
        var anguloLng = this.radianes(x2);

        var a = Math.sin(anguloLat / 2) * Math.sin(anguloLat / 2) +
            Math.cos(this.radianes(lat1)) * Math.cos(this.radianes(lat2)) *
            Math.sin(anguloLng / 2) * Math.sin(anguloLng / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = radio * c;
        d = Math.round((d + Number.EPSILON) * 100) / 100
        this.escribirDistancia(d);
    }

    escribirDistancia(val) {

        if (this.primera) {
            var texto = "<p>La distancia (en línea recta) es de " + val + " Km</p>";
            $('form+p').after(texto);
            this.primera = false;
        }
        else {
            var texto = "La distancia (en línea recta) es de " + val + " Km";
            $('form+p+p').text(texto);
        }
    }

    radianes(val) {
        return val * Math.PI / 180;
    }
}

var distancia = new Distancia();