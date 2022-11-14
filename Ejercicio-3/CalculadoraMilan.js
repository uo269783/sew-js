class Calculadora {

    constructor() {
        this.anterior = null;
        this.operador = null;
        this.editable = false;
    }

    digitos(value) {
        var texto = document.getElementsByTagName("input")[0] 
        if(texto.value=="0" || this.editable==true) {
            texto.value = value;
            this.editable = false;
        }
        else
            texto.value+=value;
    }

    punto() {
        var texto = document.getElementsByTagName("input")[0];
        
        if(!texto.value.includes("."))
            texto.value+=".";

        this.editable = false;
    }

    borrar() {
        document.getElementsByTagName("input")[0].value = "0";
    }

    operar(operador) {
        var texto = document.getElementsByTagName("input")[0];
        //no hay numero anterior
        if(this.anterior==null){
            this.anterior = texto.value;
            texto.value = "0";
            this.operador = operador;
        }

        //hay numero anterior
        else {
            texto.value = eval(Number(this.anterior)+this.operador+Number(texto.value));
            this.anterior = texto.value;
            this.editable = true;
            this.operador = operador;
        }
    }

    sumar() {
        this.operar("+");
    }

    restar() {
        this.operar("-");
    }

    multiplicar() {
        this.operar("*");
    }

    dividir() {
        this.operar("/");
    }

    raiz() {
        var texto = document.getElementsByTagName("input")[0];
        if(Number(texto.value)>0){
            texto.value = Math.sqrt(Number(texto.value));
        }
    }

    igual() {
        var texto = document.getElementsByTagName("input")[0];

        if(this.anterior==null){
            texto.value = texto.value;
        }
        else {
            texto.value = eval(Number(this.anterior)+this.operador+Number(texto.value));
            this.editable = true;
            this.anterior = null;
            this.operador = null;
        }
    }

    porcentaje() {
        var texto = document.getElementsByTagName("input")[0];
        texto.value+="%";
    }

    masMenos() {
        var texto = document.getElementsByTagName("input")[0];
        if(Number(texto.value)>0)
            texto.value=Number("-"+texto.value);
        else
            texto.value = eval("0-"+Number(texto.value));
    }
}

var calculadora = new Calculadora();