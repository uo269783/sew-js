

class CalculadoraRPN {

    constructor() {
        this.pila = [];
        this.valor = "0";
        this.editable = false;
        //teclado
    }

    mostrarPila() {
        var texto = document.getElementsByTagName("textarea")[0];
        texto.value = "";

        this.pila.forEach(v => {
            texto.value += v + "\n";
        });

        texto.value += (this.valor + "\n");
    }

    digitos(valor) {
        if (this.valor == "0" || this.editable) {
            this.valor = "" + valor;
            this.editable = false;
        }
        else
            this.valor += "" + valor;
        this.mostrarPila();
    }

    enter() {
        this.pila.push(Number(this.valor));
        this.valor = "0";
        this.mostrarPila();
    }

    operar(operador) {

        var val = this.pila.pop();

        if (val == NaN || val == null)
            val = 0;

        switch (operador) {
            case '+':
                this.valor = (val + Number(this.valor));
                break;
            case '-':
                this.valor = (val - Number(this.valor));
                break;
            case '*':
                this.valor = (val * Number(this.valor));
                break;
            case '/':
                this.valor = (val / Number(this.valor));
                break;
        }

        this.editable = true;

        this.mostrarPila();
    }

    punto() {
        if (!this.valor.includes(".")) {
            this.valor += ".";
        }

        this.mostrarPila();
    }

    sumar() {
        this.operar("+");
    }

    restar() {
        this.operar("-");
    }

    dividir() {
        this.operar("/");
    }

    multiplicar() {
        this.operar("*");
    }

    sin() {
        this.trigonometrica("sin");
    }

    arcsin() {
        this.trigonometrica("arcsin");
    }

    cos() {
        this.trigonometrica("cos");
    }

    arccos() {
        this.trigonometrica("arccos");
    }

    tan() {
        this.trigonometrica("tan");
    }

    arctan() {
        this.trigonometrica("arctan");
    }

    borrar() {
        this.valor = "0";
        this.mostrarPila();
    }

    trigonometrica(operador) {
        var val = this.valor;

        switch (operador) {
            case "sin":
                this.valor = (Math.sin(val));
                break;
            case "cos":
                this.valor = (Math.cos(val));
                break;
            case "tan":
                this.valor = (Math.tan(val));
                break;
            case "arcsin":
                this.valor = (Math.asin(val));
                break;
            case "arccos":
                this.valor = (Math.acos(val));
                break;
            case "arctan":
                this.valor = (Math.atan(val));
                break;
            default:
                this.valor = (val);
                break;
        }
        this.editable = true;

        this.mostrarPila();
    }

}

var calculadora = new CalculadoraRPN();