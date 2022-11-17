class Calculadora {

    constructor() {
        this.anterior = null;
        this.operador = null;
        this.editable = false;
        this.memoria = Number(0);

        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case '1':
                    this.digitos(1);
                    break;
                case '2':
                    this.digitos(2);
                    break;
                case '3':
                    this.digitos(3);
                    break;
                case '4':
                    this.digitos(4);
                    break;
                case '5':
                    this.digitos(5);
                    break;
                case '6':
                    this.digitos(6);
                    break;
                case '7':
                    this.digitos(7);
                    break;
                case '8':
                    this.digitos(8);
                    break;
                case '9':
                    this.digitos(9);
                    break;
                case '0':
                    this.digitos(0);
                    break;
                case '+':
                    this.sumar();
                    break;
                case '-':
                    this.restar();
                    break;
                case '*':
                    this.multiplicar();
                    break;
                case '/':
                    this.dividir();
                    break;
                case 'Enter':
                    this.igual();
                    break;
                case 'c':
                    this.borrarTodo();
                    break;
                case 'Backspace':
                    this.borrar();
                    break;
                case '.':
                    this.punto();
                    break;
                case 'r':
                    this.raiz();
                    break;
                case 'm':
                    this.mrc();
                    break;
                case 'n':
                    this.mmenos();
                    break;
                case 'b':
                    this.mmas();
                    break;
                case 's':
                    this.masMenos();
                    break;
                case 'p':
                    this.porcentaje();
                    break;
            }
        });
    }

    digitos(value) {
        var texto = document.getElementsByTagName("input")[0];

        if (texto.value == "0" || this.editable) {
            texto.value = value;
            this.editable = false;
        }
        else
            texto.value += value;
    }

    punto() {
        var texto = document.getElementsByTagName("input")[0];

        if (!texto.value.includes("."))
            texto.value += ".";

        this.editable = false;
    }

    borrarTodo() {
        document.getElementsByTagName("input")[0].value = "0";
        this.anterior = null;
        this.editable = true;
        this.operador = null;
    }

    borrar() {
        document.getElementsByTagName("input")[0].value = "0";
        this.editable = true;
    }

    basica(operador) {
        var texto = document.getElementsByTagName("input")[0];
        //no hay numero anterior
        if (this.anterior == null || this.editable) {
            this.anterior = texto.value;
            texto.value = "0";
            this.operador = operador;
        }

        //hay numero anterior
        else {
            texto.value = eval(Number(this.anterior) + this.operador + Number(texto.value));
            this.anterior = texto.value;
            this.editable = true;
            this.operador = operador;
        }
    }

    sumar() {
        this.basica("+");
    }

    restar() {
        this.basica("-");
    }

    multiplicar() {
        this.basica("*");
    }

    dividir() {
        this.basica("/");
    }

    raiz() {
        var texto = document.getElementsByTagName("input")[0];
        if (Number(texto.value) > 0) {
            texto.value = Math.sqrt(Number(texto.value));
        }
    }

    igual() {
        var texto = document.getElementsByTagName("input")[0];

        if (this.anterior == null) {
            texto.value = texto.value;
        }
        else {
            texto.value = eval(Number(this.anterior) + this.operador + Number(texto.value));
            this.editable = true;
            this.anterior = null;
            this.operador = null;
        }
    }

    porcentaje() {
        var texto = document.getElementsByTagName("input")[0];

        if (this.anterior == null) { //si no hay anterior, simplemente se pone a 0
            texto.value = "0";
        }
        else {
            var percent = Number(texto.value);
            texto.value = eval(Number(this.anterior) * percent / 100);
            this.editable = true;
        }
    }

    masMenos() {
        var texto = document.getElementsByTagName("input")[0];
        if (Number(texto.value) > 0)
            texto.value = Number("-" + texto.value);
        else
            texto.value = eval("0-" + Number(texto.value));
    }

    mrc() {
        var texto = document.getElementsByTagName("input")[0];
        texto.value = this.memoria.toString();
        this.editable = true;
    }

    mmas() {
        var texto = document.getElementsByTagName("input")[0]
        this.memoria += Number(texto.value)
        this.editable = true;
    }

    mmenos() {
        var texto = document.getElementsByTagName("input")[0]
        this.memoria -= Number(texto.value)
        this.editable = true;
    }

}

class CalculadoraCientifica extends Calculadora {
    
    constructor() {
        this.formula = "";
    }

    pi() {
        var texto = document.
    }
}

var calculadora = new Calculadora();