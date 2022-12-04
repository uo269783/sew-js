class Mapa {
    constructor() {
        this.centro = {
            lat: 43.3694815,
            lng: -5.8836772
        };

    }

    leerArchivo(files) {
        var archivo = files[0];
        var context = this;
        var reader = new FileReader();

        reader.onload = function () { context.procesarKML(this) }
        reader.readAsText(archivo);


    }

    procesarKML(reader) {
        var json = JSON.parse(reader.result);

        for (var p = 0; p < json.features.length; p++) {
            this.crearMarcador(json.features[p].geometry.coordinates);
        }

        this.escribirInformacion();

    }

    escribirInformacion() {
        var texto = "<p>Archivo cargado.</p>";
        $('main').before(texto);
    }

    crearMarcador(coords) {
        var latitud = Number(coords[1]);
        var longitud = Number(coords[0]);

        var marker = new google.maps.Marker({ position: { lat: latitud, lng: longitud }, map: this.mapa })
    }

    initMap() {
        this.mapa = new google.maps.Map(document.getElementsByTagName("main")[0], { zoom: 10, center: this.centro });
    }
}

var mapa = new Mapa();