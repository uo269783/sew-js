

class CalculadoraRPN {

    constructor() {
        this.pila = [];
        this.valor = "0";

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
        if (this.valor == "0")
            this.valor = valor;
        else
            this.valor += valor;
        this.mostrarPila();
    }

    igual() {
        this.pila.push(Number(this.valor));
        this.valor = "";
        this.mostrarPila();
    }

    operar(operador) {

        var val = this.pila.pop();

        if (val == NaN)
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

        this.mostrarPila();
    }

    punto() {
        if (!this.valor.includes(".")) {
            this.valor += ".";
        }
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
        var val = this.pila.pop();

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