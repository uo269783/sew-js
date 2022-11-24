var parrafoMostrado = true;
var titulo1Mostrado = true;
var nParrafos = 1;

$('document').ready(function () {
    $('input[type=button]:nth-child(3)').click(function () {
        var texto = $('#texto').val();
        console.log(texto)
        $('h3').text(texto);
    });

    $('input[type=button]:nth-child(4)').click(function () {
        if (parrafoMostrado)
            $('p').hide();

        else
            $('p').show();
        parrafoMostrado = !parrafoMostrado;
    });

    $('input[type=button]:nth-child(5)').click(function () {
        if (titulo1Mostrado)
            $('h1').hide();
        else
            $('h1').show();
        titulo1Mostrado = !titulo1Mostrado;
    });

    $('input[type=button]:nth-child(6)').click(function () {
        var p = "<p>Párrafo añadido número: " + nParrafos++ + "</p>";
        if ($('p').length > 0)
            $('p:last-of-type').after(p);
        else
            $('h3').after(p);
    });

    $('input[type=button]:nth-child(7)').click(function () {
        $('p:last-of-type').remove();
    });

    $('input[type=button]:nth.child(8)').click(function () {
        $("*", "document").each()
    });



})