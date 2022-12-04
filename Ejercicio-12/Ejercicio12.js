class Lector {

    constructor() {
    }

    escribirTexto(reader) {
        //$('section:first').text(reader.result);

        $('section:first').text("");
        $('section:first').append("<h2>Contenido</h2>");

        var parrafos = reader.result.split("\n");
        for (var p in parrafos)
            if (parrafos[p].trim() != "")
                $('section:first').append("<p>" + parrafos[p] + "</p>");

    }

    escribirCodigo(reader) {
        $('section:first').text("");
        $('section:first').append("<h2>Contenido</h2>");

        $('section:first').append("<pre>" + reader.result + "</pre>");
    }


    leerArchivo(files) {
        var archivo = files[0];
        var reader = new FileReader();
        var context = this;

        switch (archivo.type) {
            case "text/plain":
                reader.onload = function () { context.escribirTexto(this) };
                reader.readAsText(archivo);
                break;
            case "text/xml":
            case "application/json":
                reader.onload = function () { context.escribirCodigo(this) };
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