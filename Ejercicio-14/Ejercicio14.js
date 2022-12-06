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
        else if (archivo.type == "image/png" || archivo.type == "image/jpeg")
            this.parseImagen(archivo);

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

    parseImagen(archivo) {
        var canvas = document.getElementsByTagName("canvas")[0].getContext('2d');
        var img = new Image();
        img.src = archivo.name;

        img.onload = function () {
            console.log(img.width, img.height)
            canvas.drawImage(img, 0, 0, img.width, img.height);
        }
    }

    fullScreen() {
        var canvas = document.getElementsByTagName("canvas")[0];

        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        }
    }

    vaciarCanvas() {
        var canvas = document.getElementsByTagName("canvas")[0];
        var context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height);
    }

}

var lector = new Lector();