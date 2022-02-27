/*
 * JuanMiguel @juanmiguells
 * Buenos Aires, 2022.
 * Código libre. Mencione la fuente.
 */

let tiempo = 0;

function setup() {
    createCanvas(800, 480);
    background(5);
    frameRate(1);
    strokeWeight(2);
    stroke(255, 255, 255, 25);
}

function draw() {
    if (millis() >= tiempo + 300000 || tiempo == 0) {
        tiempo = millis();
        background(5, 0, 5);
        arte = new Obscur();
        arte.genera();
    }
}

class Obscur {
    constructor() {
        this.puntoInicial = [floor(width / 2), floor(height / 2)];
        this.puntoFinal = [floor(width / 2), floor(height / 2)];
    }

    ultimaDireccion = "inicial";
    segmMin = 8;
    segmMax = 12;
    trazMin = 20;
    trazMax = 40;
    modificadorLargo = 0.2;

    // :number
    segmentos() {
        return floor(random(this.segmMin, this.segmMax));
    }

    // :number
    trazos() {
        return floor(random(this.trazMin, this.trazMax));
    }

    // :void
    centrar() {
        this.puntoInicial = [floor(width / 2), floor(height / 2)];
        this.puntoFinal = [floor(width / 2), floor(height / 2)];
    }

    // :void
    nuevoPuntoInicial() {
        this.puntoInicial = this.puntoFinal;
    }

    // :number
    largoSegmentoVertical() {
        return floor(random(height * this.modificadorLargo));
    }

    // :number
    largoSegmentoHorizontal() {
        return floor(random(width * this.modificadorLargo));
    }

    // :void
    nuevoPuntoFinal() {
        let direcciones = ["arriba", "abajo", "izquierda", "derecha"];
        let vert = this.largoSegmentoVertical();
        let hor = this.largoSegmentoHorizontal();
        let direccion = random(direcciones);

        while (direccion == this.ultimaDireccion) {
            direccion = random(direcciones);
        }

        direccion = random(direcciones);

        switch (direccion) {
            case "arriba":
                this.ultimaDireccion = direccion;
                return (this.puntoFinal =
                    this.puntoFinal[1] + vert >= height * 0.95
                        ? [this.puntoFinal[0], this.puntoFinal[1] - vert]
                        : [this.puntoFinal[0], this.puntoFinal[1] + vert]);

            case "abajo":
                this.ultimaDireccion = direccion;
                return (this.puntoFinal =
                    this.puntoFinal[1] - vert <= height * 0.05
                        ? [this.puntoFinal[0], this.puntoFinal[1] + vert]
                        : [this.puntoFinal[0], this.puntoFinal[1] - vert]);

            case "derecha":
                this.ultimaDireccion = direccion;
                return (this.puntoFinal =
                    this.puntoFinal[0] + hor >= width * 0.95
                        ? [this.puntoFinal[0] - hor, this.puntoFinal[1]]
                        : [this.puntoFinal[0] + hor, this.puntoFinal[1]]);

            case "izquierda":
                this.ultimaDireccion = direccion;
                return (this.puntoFinal =
                    this.puntoFinal[0] - hor <= width * 0.05
                        ? [this.puntoFinal[0] + hor, this.puntoFinal[1]]
                        : [this.puntoFinal[0] - hor, this.puntoFinal[1]]);
        }
    }

    // :display
    dibujaSegmento() {
        line(
            this.puntoInicial[0],
            this.puntoInicial[1],
            this.puntoFinal[0],
            this.puntoFinal[1]
        );
    }

    // :display
    genera() {
        for (let j = 0; j <= this.trazos(); j++) {
            this.centrar();
            let cantidad = this.segmentos();
            for (let i = 0; i <= cantidad; i++) {
                this.nuevoPuntoInicial();
                this.nuevoPuntoFinal();
                for (let k = 0; k < cantidad - i; k++) this.dibujaSegmento();
            }
        }
    }
}
