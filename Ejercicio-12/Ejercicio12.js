class Lector {

    constructor() {
    }

    escribirTexto(reader) {
        //$('section:first').text(reader.result);
        var parrafos = reader.result.split("\n");
        $('section:last').text("");
        $('section:last').append("<h2>Contenido</h2>");
        for (var p in parrafos)
            if (parrafos[p].trim() != "")
                $('section:first').append("<p>" + parrafos[p] + "</p>");
    }

    leerArchivo(files) {
        var archivo = files[0];
        var reader = new FileReader();
        var context = this;
        reader.onload = function () { context.escribirTexto(this) };

        console.log(archivo.type);
        switch (archivo.type) {
            case "text/plain":
            case "text/xml":
            case "text/json":
                reader.readAsText(archivo);
                break;
        }

        this.escribirDatos(archivo);
    }

    escribirDatos(archivo) {
        $('section:last').text("");
        $('section:last').append("<h2>Datos</h2>");

        var nombre = "<p>Nombre del archivo: " + archivo.name + "</p>";
        var tamaño = "<p>Tamaño del archivo: " + archivo.size + "</p>";
        var tipo = "<p>Tipo del archivo: " + archivo.type + "</p>";

        $('section:last').append(nombre + tamaño + tipo);
    }


}

var lector = new Lector();