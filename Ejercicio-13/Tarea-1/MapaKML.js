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
        var xml = reader.result;
        var coords = $('coordinates', xml);

        for (var p = 0; p < coords.length; p++) {
            this.crearMarcador(coords[p].innerText);
        }

        this.escribirInformacion();

    }

    escribirInformacion() {
        var texto = "<p>Archivo cargado.</p>";
        $('main').before(texto);
    }

    crearMarcador(coords) {
        var latitud = Number(coords.split(',')[1]);
        var longitud = Number(coords.split(',')[0]);
        var punto = { lat: latitud, lng: longitud };

        var marker = new google.maps.Marker({ position: { lat: latitud, lng: longitud }, map: this.mapa })
    }

    initMap() {
        this.mapa = new google.maps.Map(document.getElementsByTagName("main")[0], { zoom: 10, center: this.centro });
    }
}

var mapa = new Mapa();