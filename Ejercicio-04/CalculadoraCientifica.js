class Calculadora {

    constructor() {
        this.anterior = null;
        this.operador = null;
        this.editable = false;
        this.valor = "0";
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

    mostrarTexto() {
        var texto = document.getElementsByTagName("input")[0];
        texto.value = this.valor;
    }

    digitos(value) {

        if (this.valor == "0" || this.editable) {
            this.valor = "" + value;
            this.editable = false;
        }
        else
            this.valor += value;

        this.mostrarTexto();
    }

    punto() {

        if (!this.valor.includes("."))
            this.valor += ".";

        this.editable = false;
        this.mostrarTexto();
    }

    borrarTodo() {
        this.valor = "0";
        this.anterior = null;
        this.editable = true;
        this.operador = null;
        this.mostrarTexto();
    }

    borrar() {
        this.valor = "0";
        this.editable = true;
        this.mostrarTexto();
    }

    basica(operador) {

        //no hay numero anterior
        if (this.anterior == null || this.editable) {
            this.anterior = this.valor;
            this.valor = "0";
            this.operador = operador;
        }

        //hay numero anterior
        else {
            this.valor = eval(Number(this.anterior) + this.operador + Number(this.valor));
            this.anterior = this.valor;
            this.editable = true;
            this.operador = operador;
        }

        this.mostrarTexto();
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

        if (Number(this.valor) > 0) {
            this.valor = Math.sqrt(Number(this.valor));
        }

        this.mostrarTexto();
    }

    igual() {

        if (this.anterior == null) {
            this.valor = this.valor;
        }
        else {
            this.valor = eval(Number(this.anterior) + this.operador + Number(this.valor));
            this.editable = true;
            this.anterior = null;
            this.operador = null;
        }

        this.mostrarTexto();
    }

    porcentaje() {


        if (this.anterior == null) { //si no hay anterior, simplemente se pone a 0
            this.valor = "0";
        }
        else {
            var percent = Number(this.valor);
            this.valor = eval(Number(this.anterior) * percent / 100);
            this.editable = true;
        }

        this.mostrarTexto();
    }

    masMenos() {
        if (Number(this.valor) > 0)
            this.valor = Number("-" + this.valor);
        else
            this.valor = eval("0-" + Number(this.valor));

        this.mostrarTexto();
    }

    mrc() {
        this.valor = this.memoria.toString();
        this.editable = true;
        this.mostrarTexto();
    }

    mmas() {
        this.memoria += Number(this.valor);
        this.editable = true;
    }

    mmenos() {
        this.memoria -= Number(this.valor);
        this.editable = true;
    }

}

class CalculadoraCientifica extends Calculadora {

    constructor() {
        super();
        this.formula = "";
    }

    mostrarTexto() {
        var txFormula = document.getElementsByTagName("input")[0];
        var txValor = document.getElementsByTagName("input")[1];

        txFormula.value = this.formula;
        txValor.value = this.valor;
    }

    basica(operador) {

        if (!this.editable) {
            this.formula += this.valor + operador;
            this.valor = "0";
        }

        else {
            this.formula += operador;
            this.valor = "0";
            this.editable = false;
        }

        this.mostrarTexto();
    }

    digitos(value) {
        if (this.valor == "0" || this.editable) {
            this.valor = "" + value;

            if (this.editable) {
                this.formula = "";
            }

            this.editable = false;
        }
        else
            this.valor += value;

        this.mostrarTexto();
    }

    igual() {
        if (this.editable) {
            this.formula = this.valor;
        }
        else {
            this.formula += this.valor;
            this.valor = eval(this.formula);
            this.editable = true;
        }
        this.mostrarTexto();
    }

    borrarTodo() {
        this.formula = "";
        this.valor = "0";
    }

    abreParentesis() {
        this.formula += "(";
        this.mostrarTexto();
    }

    cierraParentesis() {
        this.formula += ")";
        this.mostrarTexto();
    }

    sin() {
        this.formula += Math.sin(this.valor);
        this.valor = "0";
    }

    cos() {
        this.formula += Math.cos(this.valor);
        this.valor = "0";
    }

    tan() {
        this.formula += Math.tan(this.valor);
        this.valor = "0";
    }

    arcsin() {
        if (this.valor >= -1 && this.valor <= 1)
            this.formula += Math.asin(this.valor);
        this.valor = "0";
    }

    shift() {

        if (!shiftPulsado) {
            var btsin = document.getElementsByTagName("input")[4];
            var btcos = document.getElementsByTagName("input")[5];
            var bttan = document.getElementsByTagName("input")[6];

            btsin.value = "sin-1";
            btsin.onclick(this.arcsin);
        }
    }

}

var calculadora = new CalculadoraCientifica();