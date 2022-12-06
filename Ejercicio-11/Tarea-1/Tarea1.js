class Geolocalizacion {


    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this));
    }

    getPosicion(val) {
        this.longitud = val.coords.longitude;
        this.latitud = val.coords.latitude;
        this.precision = val.coords.accuracy;
    }

    escribirDatos() {
        //tan solo se muestran estos tres valores ya que el resto daban un valor de undefined.
        $('p:last-child').after("<p>Longitud: " + this.longitud + ", latitud: " + this.latitud + ", precisión de localización: " + this.precision + "</p>");
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