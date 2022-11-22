

class CalculadoraRPN {

    constructor() {
        this.pila = [];
        this.valor = "0";
        this.editable = false;

        document.addEventListener('keydown', (event) => this.procesarTeclas(event));
    }

    mostrarPila() {
        var textarea = document.getElementsByTagName("textarea")[0];
        var texto = document.getElementsByTagName("input")[0];

        textarea.value = "";

        this.pila.forEach(v => {
            textarea.value += v + "\n";
        });

        texto.value = this.valor;
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
        var check = this.pila.pop();

        if (check != null && !isNaN(check) && isFinite(check)) {
            //en caso de que se produzca algun error en una operacion
            this.pila.push(check);
        }

        this.pila.push(Number(this.valor));
        this.valor = "0";
        this.mostrarPila();
    }

    basica(operador) {

        var val2 = this.pila.pop();
        var val1 = this.pila.pop();

        if (isNaN(val1) || val1 == null || !isFinite(val1))
            val1 = 0;
        if (isNaN(val2) || val2 == null || !isFinite(val2))
            val2 = 0;

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

    punto() {
        if (!this.valor.includes(".")) {
            this.valor += ".";
        }

        if (this.editable)
            this.editable = false;

        this.mostrarPila();
    }

    sumar() {
        this.basica("+");
    }

    restar() {
        this.basica("-");
    }

    dividir() {
        this.basica("/");
    }

    multiplicar() {
        this.basica("*");
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

    borrarPila() {
        this.pila = [];
        this.valor = "0";
        this.mostrarPila();
    }

    trigonometrica(operador) {
        var val = this.pila.pop();

        if (val != NaN || val != null)
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
                    this.pila.push(Math.asin(val));
                    break;
                case "arccos":
                    this.pila.push(Math.acos(val));
                    break;
                case "arctan":
                    this.pila.push(Math.atan(val));
                    break;
            }
        this.editable = true;

        this.mostrarPila();
    }

    masMenos() {
        var val = this.pila.pop();
        this.pila.push(-1 * val);
        this.mostrarPila();
    }

    raiz() {
        var val = this.pila.pop();
        this.pila.push(Math.sqrt(val));
        this.mostrarPila();
    }

    procesarTeclas(event) {
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
                this.enter();
                break;
            case 'c':
                this.borrarPila();
                break;
            case '.':
                this.punto();
                break;
            case 'r':
                this.raiz();
                break;
            case 'a':
                this.cos();
                break;
            case 's':
                this.sin();
                break;
            case 'd':
                this.tan();
                break;
            case 'f':
                this.arccos();
                break;
            case 'g':
                this.arcsin();
                break;
            case 'h':
                this.arctan();
                break;
            case 'Backspace':
                this.borrar();
                break;
            case 'm':
                this.masMenos();
                break;

        }
    }

}

var calculadora = new CalculadoraRPN();