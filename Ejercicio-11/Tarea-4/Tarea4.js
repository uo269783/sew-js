class MapaDinamico {



    constructor() {
        this.piedrasblancas = {
            lat: 43.5607904,
            lng: -5.9864433
        };
    }

    initMap() {
        var centro = this.piedrasblancas;
        var mapa = new google.maps.Map(document.getElementsByTagName("main")[0], { zoom: 10, center: centro });
        var marcador = new google.maps.Marker({ position: centro, map: mapa });
    }
}



var mapaDinamico = new MapaDinamico();