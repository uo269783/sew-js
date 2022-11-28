class Ejercicio7 {


    constructor() {
        this.parrafoMostrado = true;
        this.titulo1Mostrado = true;
        this.nParrafos = 1;
    }

    botones() {
        var context = this;
        $('document').ready(function () {
            $('input[type=button]:nth-child(3)').click(function () {
                var texto = $('input[type=text]').val();
                console.log(texto)
                $('h3').text(texto);
            });

            $('input[type=button]:nth-child(4)').click(function () {
                if (context.parrafoMostrado)
                    $('p').hide();

                else
                    $('p').show();
                context.parrafoMostrado = !context.parrafoMostrado;
            });

            $('input[type=button]:nth-child(5)').click(function () {
                if (context.titulo1Mostrado)
                    $('h1').hide();
                else
                    $('h1').show();
                context.titulo1Mostrado = !context.titulo1Mostrado;
            });

            $('input[type=button]:nth-child(6)').click(function () {
                var p = "<p>Párrafo añadido número: " + context.nParrafos++ + "</p>";
                if ($('p').length > 0)
                    $('p:last-of-type').after(p);
                else
                    $('h3').after(p);
            });

            $('input[type=button]:nth-child(7)').click(function () {
                $('p:last-of-type').remove();
            });

            $('input[type=button]:nth-child(8)').click(function () {
                var padre;
                var tipo;
                $('h2').val("Árbol DOM recorrido:");
                $("*", document.body).each(function () {
                    padre = $(this).parent().get(0).tagName;
                    tipo = $(this).get(0).tagName;


                    $('h2').after("<p>Elemento: " + tipo + ", etiqueta del padre: " + padre + ". </p>");
                });
            });

            $('input[type=button]:nth-child(9)').click(function () {
                var nFilas = $('tr').length;

                var nColumnas = $('*', 'tr:first-child').length;

                $('p:last-of-type').after("<p>Filas: " + nFilas + ", columnas: " + nColumnas + ", suma: " + (nFilas + nColumnas) + ", número de elementos: " + (nFilas * nColumnas));

            });

        });
    }


}
var ej7 = new Ejercicio7();
ej7.botones();
