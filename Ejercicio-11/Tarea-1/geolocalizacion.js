class Geolocalizacion {


    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this));
    }

    getPosicion(val) {
        this.longitud = val.coords.longitude;
        this.latitud = val.coords.latitude;
    }

    escribirDatos() {
        $('p:last-child').after("<p>Longitud: " + this.longitud + ", latitud: " + this.latitud + "</p>");
    }


}

var g = new Geolocalizacion();
g.escribirDatos();