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
                    event.preventDefault();
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
            this.valor = "" + eval(Number(this.anterior) + this.operador + Number(this.valor));
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
            this.valor = "" + Math.sqrt(Number(this.valor));
            this.editable = true;
        }
        this.mostrarTexto();
    }

    igual() {
        if (this.anterior == null) {
            this.valor = "" + this.valor;
        }
        else {
            this.valor = "" + eval(Number(this.anterior) + this.operador + Number(this.valor));
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
            this.valor = "" + eval(Number(this.anterior) * percent / 100);
            this.editable = true;
        }

        this.mostrarTexto();
    }

    masMenos() {
        this.valor = "" + eval(Number(this.valor) + "*-1");
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
        this.grados = "deg";
        this.hyp = false;
        this.shiftPulsado = false;
    }

    basica(operador) {
        if (this.anterior != null) { //solo se cambia el valor de anterior con el metodo potencia()
            this.valor = "" + Math.pow(Number(this.anterior), Number(this.valor));
            this.anterior = null;
        }
        if (this.formula != null && this.formula.charAt(this.formula.length - 1) == ')') {
            this.formula += operador;
        }
        else {
            if (!this.editable) {
                this.formula += this.valor + operador;
                this.valor = "0";
            }

            else {
                this.formula = this.valor + operador;
                this.valor = "0";
                this.editable = false;
            }
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
        if (this.anterior != null) { //solo se cambia el valor de anterior con el metodo potencia()
            this.valor = "" + Math.pow(Number(this.anterior), Number(this.valor));
            this.anterior = null;
        }
        try {
            if (this.valor == "0") {
                try {
                    this.valor = eval(this.formula);
                    this.editable = true;
                } catch (exception) {
                    this.formula += this.valor
                    this.valor = eval(this.formula)
                    this.editable = true;
                }
            }
            else {

                if (this.editable) {
                    if (!this.ultimoCharEsNumero()) {
                        this.formula += this.valor;
                        this.valor = eval(this.formula);
                        this.editable = true;
                    } else {
                        this.formula = "" + this.valor;
                        this.editable = true;
                    }
                }
                else {
                    this.formula += this.valor;
                    this.valor = eval(this.formula);
                    this.editable = true;
                }
            }
        } catch (exception) {
            this.valor = "Math Error";
            this.editable = true;
        }

        this.mostrarTexto();
    }

    ultimoCharEsNumero() {
        var char = this.formula.charAt(this.formula.length - 1);

        for (var i = 0; i <= 9; i++) {
            if (char == "" + i)
                return true;
        }

        return false;
    }

    borrarTodo() {
        this.formula = "";
        this.valor = "0";
        this.mostrarTexto();
    }

    modulo() {
        this.basica("%");
    }

    borrar() {
        this.valor = "0";
        this.mostrarTexto();
    }

    retroceder() {
        if (this.valor.length > 0)
            this.valor = this.valor.substring(0, this.valor.length - 1);

        if (this.valor == "")
            this.valor = "0";
        this.mostrarTexto();
    }

    abreParentesis() {
        if (this.editable) {
            this.formula = "(";
            this.editable = false;
        }
        else
            this.formula += "(";
        this.mostrarTexto();
    }

    cierraParentesis() {
        this.formula += this.valor + ")";
        this.valor = "0";
        this.mostrarTexto();
    }

    trigonometrica(operador) {
        var value;

        if (this.grados == "deg") {
            console.log(this.valor);
            this.valor = parseFloat(Number(this.valor)) * (Math.PI / 180);
            console.log(this.valor);
        }
        else if (this.grados == "grad") {
            this.valor = Number(this.valor) * 63.662;
        }

        switch (operador) {
            case "sin":
                value = this.sin();
                break;
            case "cos":
                value = this.cos();
                break;
            case "tan":
                value = this.tan();
                break;
        }

        this.editable = true;
        this.valor = "" + value;
        this.mostrarTexto();
    }

    sin() {
        if (this.hyp) {
            if (this.shiftPulsado)
                return Math.asinh(this.valor);
            else {
                return Math.sinh(this.valor);
            }
        }
        else {
            if (this.shiftPulsado) {
                if (this.valor <= 1 && this.valor >= -1)
                    return Math.asin(this.valor);

            }
            else {
                return Math.sin(this.valor);
            }
        }


    }

    cos() {
        if (this.hyp) {
            if (this.shiftPulsado)
                return Math.acosh(this.valor);
            else {
                return Math.cosh(this.valor);
            }
        }
        else {
            if (this.shiftPulsado) {
                if (this.valor <= 1 && this.valor >= -1)
                    return Math.acos(this.valor);

            }
            else {
                return Math.cos(this.valor);
            }
        }
    }

    tan() {
        if (this.hyp) {
            if (this.shiftPulsado)
                return Math.atanh(this.valor);
            else {
                return Math.tanh(this.valor);
            }
        }
        else {
            if (this.shiftPulsado) {
                return Math.tans(this.valor);

            }
            else {
                return Math.tan(this.valor);
            }
        }
    }

    logaritmo() {
        var value;
        if (this.shiftPulsado)
            value = Math.log(Number(this.valor));
        else
            value = Math.log10(Number(this.valor));

        if (this.editable) {
            this.formula = value
        }
        else {
            this.formula += value;
        }
    }

    cambiarGrados() {
        switch (this.grados) {
            case "deg":
                this.grados = "rad";
                break;
            case "rad":
                this.grados = "grad";
                break;
            case "grad":
                this.grados = "deg";
                break;
        }

        document.getElementsByTagName("input")[2].value = this.grados.toUpperCase();
    }

    factorial() {
        var fact = 1;

        for (var i = 1; i <= this.valor; i++) {
            fact *= i;
        }

        this.valor = "" + fact;
        this.mostrarTexto();
    }

    potencia() {
        this.anterior = this.valor;
        this.valor = "0";
        this.mostrarTexto();
    }

    pi() {
        this.valor = "" + Math.PI;
        this.mostrarTexto();
    }

    potencia10() {
        var val = Math.pow(10, Number(this.valor));
        this.valor = "" + val;
        this.mostrarTexto();
    }

    cuadrado() {
        this.valor = "" + Math.pow(Number(this.valor), 2);
        this.mostrarTexto();
    }

    shift() {
        this.shiftPulsado = !this.shiftPulsado;
        this.cambiarBotones();
    }

    toggleHyp() {
        this.hyp = !this.hyp;
        this.cambiarBotones();
    }

    toggleFE() {
        this.fe = !this.fe;
        this.mostrarTexto();
    }

    memoria0() {
        this.memoria = "0";
    }

    memoriaAlmacenar() {
        this.memoria = "" + Number(this.valor);
    }

    exponencial() {
        this.valor = this.valor + "e+";
        this.mostrarTexto();
    }

    cambiarBotones() {
        var btsin = document.getElementsByTagName("input")[12];
        var btcos = document.getElementsByTagName("input")[13];
        var bttan = document.getElementsByTagName("input")[14];
        var btLog = document.getElementsByTagName("input")[17];

        if (this.shiftPulsado) {
            btLog.value = "ln";
            if (this.hyp) {
                btsin.value = "sinh-1";
                btcos.value = "cosh-1";
                bttan.value = "tanh-1";
            }
            else {
                btsin.value = "sin-1";
                btcos.value = "cos-1";
                bttan.value = "tan-1";
            }
        }

        else {
            btLog.value = "log";
            if (this.hyp) {
                btsin.value = "sinh";
                btcos.value = "cosh";
                bttan.value = "tanh";
            }
            else {
                btsin.value = "sin";
                btcos.value = "cos";
                bttan.value = "tan";
            }
        }
    }

    mostrarTexto() {
        var txFormula = document.getElementsByTagName("input")[0];
        var txValor = document.getElementsByTagName("input")[1];

        txFormula.value = this.formula;
        if (this.fe)
            txValor.value = parseFloat(this.valor).toExponential();
        else
            txValor.value = this.valor;
    }

}

var calculadora = new CalculadoraCientifica();