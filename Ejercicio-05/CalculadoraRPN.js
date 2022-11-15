

class CalculadoraRPN {

    constructor() {
        this.pila = [];

        //teclado
    }

    mostrarPila() {
        var texto = document.getElementsByTagName("input")[0];

        for (var v in pila) {
            texto.value.concat(v + "\n");
        }
    }

    digitos(valor) {


    }

    operar(operador) {
        var val1 = pila.pop();
        var val2 = pila.pop();

        switch (operador) {
            case '+':
                this.pila.push(val1 + val2);
                break;
            case '-':
                this.pila.push(val1 - val2);
                break;
            case '*':
                this.pila.push(val1 * val2);
                break;
            case '/':
                this.pila.push(val1 / val2);
                break;
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

    trigonometrica(operador) {
        var val = pila.pop();

        switch (operador) {
            case "sin":
                this.pila.push(Math.sin(val));
                break;
            case "cos":
                this.pila.push(Math.cos(val));
                break;
            case "tan":
                this.pila.push(Math.tan(val));
                break;
            case "arcsin":
                this.pila.push(Math.arcsin(val));
                break;
            case "arccos":
                this.pila.push(Math.arccos(val));
                break;
            case "arctan":
                this.pila.push(Math.arctan(val));
                break;
            default:
                this.pila.push(val);
                break;
        }

        this.mostrarPila();
    }

}

var calculadora = new CalculadoraRPN();