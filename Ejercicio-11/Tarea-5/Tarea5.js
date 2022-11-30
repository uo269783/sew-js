class MapaDinamico {

    constructor() {
        this.centro = {
            lat: 43.5607904,
            lng: -5.9864433
        };
    }

    initMap() {
        var mapa = new google.maps.Map(document.getElementsByTagName("main")[0], { zoom: 10, center: this.centro });

        var context = this;
        var infoWindow = new google.maps.InfoWindow;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (pos) {
                var position = { lat: pos.coords.latitude, lng: pos.coords.longitude };

                infoWindow.setPosition(position);
                infoWindow.setContent("Ubicación del usuario");
                infoWindow.open(mapa);
                mapa.setCenter(position);
            }, function () {
                context.verError("Geolocalización fallida", infoWindow, mapa);
            })
        } else {
            context.verError("Geolocalización deshabilitada", infoWindow, mapa);
        }

    }

    verError(mensaje, infoWindow, mapa) {
        infoWindow.setPosition(mapa.getCenter());
        infoWindow.setContent(mensaje);
        infoWindow.open(mapa);
    }

    dibujarPosicion() {
        console.log("sida");
        console.log(this.mapa)

    }
}



var mapaDinamico = new MapaDinamico();