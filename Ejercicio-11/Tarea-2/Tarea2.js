class Geolocalizacion {


    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verError.bind(this));
    }

    getPosicion(val) {
        this.longitud = val.coords.longitude;
        this.latitud = val.coords.latitude;
        this.precision = val.coords.accuracy;
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
            default:
                this.error = "Error desconocido.";
                break;

        }
    }

    escribirDatos() {
        var texto;
        if (this.error != "")
            texto = "<p>Se ha producido un error: " + this.error + "</p>";
        else
            texto = "<p>Longitud: " + this.longitud + ", latitud: " + this.latitud + ", precisión de localización: " + this.precision + "</p>";
        $('p:last-child').after(texto);
    }

    botones() {
        var context = this;

        $('document').ready(function () {
            $('input').click(function () {
                context.escribirDatos();
            });
        });
    }


}

var g = new Geolocalizacion();
g.botones();