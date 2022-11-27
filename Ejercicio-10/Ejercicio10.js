class GoldPrice {

    enlace = "https://api.metalpriceapi.com/v1/latest";
    apikey = "?api_key=8feed350163099a22343a12014ec1325";
    base = "&base=XAU";
    divisas = "&currencies=EUR,USD,GBP";
    gramos = 28.3495; //gramos en una onza

    apiCall() {
        var gp = this;

        var url = this.enlace + this.apikey + this.base + this.divisas;

        $.ajax({
            dataType: "json",
            url: url,
            method: 'GET',
            success: function (data) {
                console.log(data);
                gp.mostrarDatos(data);
            },
            error: function () {
                console.log("Algo ha ido mal");
            }
        });
    }

    mostrarDatos(datos) {
        //precio por onza:
        var euros = datos.rates.EUR;
        var dolares = datos.rates.USD;
        var libras = datos.rates.GBP;

        this.crearParrafo(euros, "Euros");
        this.crearParrafo(dolares, "Dólares");
        this.crearParrafo(libras, "Libras esterlinas");

    }

    crearParrafo(val, moneda) {
        $('p:last-child').after("<h2>" + moneda + "</h2>");
        $('h2:last-child').after("<p>Precio por onza: " + val) + "</p>";
        $('p:last-child').after("<p>Precio por gramo: " + (val / this.gramos) + "</p>");
        $('p:last-child').after("<p>Precio por kilogramo: " + (val / this.gramos * 1000) + "</p>");
    }
}

var gp = new GoldPrice();
gp.apiCall();