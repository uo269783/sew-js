class Lector {

    constructor() {

    }

    leerFichero(files) {
        var archivo = files[0];
        var reader = new FileReader();
        var context = this;

        if (archivo.type == "text/plain") {
            reader.onload = function () { context.parseFichero(this); }
            reader.readAsText(archivo);
        }
        else if (archivo.type == "image/png" || archivo.type == "image.jpeg")
            reader.onload = function () { context.parseImagen(this); }

    }

    parseFichero(reader) {
        var texto = "" + reader.result;
        var func;

        try {
            func = new Function(texto);
            func();
        } catch (e) {
            console.log(e);
        }

    }

    fullScreen() {
        var canvas = document.getElementsByTagName("canvas");
        console.log("llega");
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        }
    }

}

var lector = new Lector();