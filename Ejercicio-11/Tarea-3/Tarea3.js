class Geolocalizacion {


    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verError.bind(this));
    }

    getPosicion(val) {
        this.longitud = val.coords.longitude;
        this.latitud = val.coords.latitude;
        this.error = "";
    }

    verError(err) {
        switch (err.code) {
            case err.PERMISSION_DENIED:
                this.error = "El usuario ha denegado los permisos de ubiación."
                break;
            case err.POSITION_UNAVAILABLE:
                this.error = "Información de ubicación no disponible."
                break;
            case err.TIMEOUT:
                this.error = "La petición ha caducado.";
                break;
            case err.UNKNOWN_ERROR:
                this.error = "Error desconocido.";
                break;
        }
    }

    escribirDatos() {
        var texto;
        if (this.error != "")
            texto = "<p>Se ha producido un error: " + this.error + "</p>";
        else
            texto = "<p>Longitud: " + this.longitud + ", latitud: " + this.latitud + "</p>";
        $('p:last-child').after(texto);
    }

    dibujarMapa() {
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        var centro = "center=" + this.latitud + "," + this.longitud;
        var zoom = "&zoom=10";
        var tamaño = "&size=800x600";
        var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        var sensor = "&sensor=false";
        var apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";
        var imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
        var texto = "<p><img src=\"" + imagenMapa + "\" alt=\"Mapa estático de Google Maps\"></p>";
        $('p:last-child').after(texto);
    }

    botones() {
        var context = this;

        $('document').ready(function () {
            $('input').click(function () {
                context.dibujarMapa();
            });
        });
    }


}

var g = new Geolocalizacion();
g.botones();