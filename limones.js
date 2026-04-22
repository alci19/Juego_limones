let canvas=document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");

const ALTURA_SUELO=20;
const ALTO_PERSONAJE=60;
const ANCHO_PERSONAJE=40;
const ANCHO_LIMON=20;
const ALTO_LIMON=20;

let personajeX=canvas.width/2;
let personajeY=canvas.height-(ALTURA_SUELO + ALTO_PERSONAJE);
let limonX=canvas.width/2;
let limonY=0;
let puntaje = 0;
let vidas = 3;
let velocidadCaida = 200
let intervalo;




function iniciarJuego(){   
    intervalo = setInterval(bajarLimon, velocidadCaida); // (funcion, tiempo en milisegundos) 
    dibujarSuelo();
    dibujarPersonaje();
    aparecerLimon();
}
function dibujarSuelo(){
    ctx.fillStyle="blue";
    ctx.fillRect(0, canvas.height - ALTURA_SUELO, canvas.width, ALTURA_SUELO);
}

function dibujarPersonaje(){
    ctx.fillStyle="yellow";
    ctx.fillRect(personajeX, personajeY, ANCHO_PERSONAJE, ALTO_PERSONAJE);
}

function moverIzquierda(){
    personajeX-=10;
    actualizarPantalla();
}

function moverDerecha(){
    personajeX+=10;
    actualizarPantalla();
}


function actualizarPantalla(){
    limpiarCanvas();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
}
function limpiarCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

}

function dibujarLimon(){
    ctx.fillStyle="green";
    ctx.fillRect(limonX, limonY, ANCHO_LIMON, ALTO_LIMON);
}

function bajarLimon(){
    limonY+=10;
    actualizarPantalla();
    detectarAtrapado();
    detectarPiso();
 
}

function detectarAtrapado(){
    if (limonX + ANCHO_LIMON > personajeX && 
        limonX < personajeX + ANCHO_PERSONAJE && 
        limonY + ALTO_LIMON > personajeY && 
        limonY < personajeY + ALTO_PERSONAJE) {
            
        //alert("ATRAPADO!");
        aparecerLimon();

        puntaje += 1;
        mostrarEnSpan("txtPuntaje", puntaje);
    }
     // Cambios de velocidad
        if (puntaje === 3){
            velocidadCaida = 150;
        }

        if (puntaje === 6){
            velocidadCaida = 100;
        }

        if (puntaje === 10){
            alert("¡Has dominado la lluvia de limones!");
            detenerJuego();
        }
}

function detectarPiso(){ 

    if(vidas > 0){
        if (limonY + ALTO_LIMON ==  canvas.height - ALTURA_SUELO) {
        aparecerLimon();
        vidas -= 1;  ;
        mostrarEnSpan("txtVidas", vidas);
         }
    }
        else{ 
            alert("GAME OVER");
            detenerJuego();
        }  
}

function detenerJuego(){
    clearInterval(intervalo);
}
function aparecerLimon(){
    limonX = generarAleatorio(0, canvas.width - ANCHO_LIMON);
    limonY = 0;
    actualizarPantalla();
}

function reiniciar(){
    //Reiniciar variables en código y en pantalla
    puntaje = 0;
    vidas = 3;
    velocidadCaida = 200;
    mostrarEnSpan("txtPuntaje", puntaje);
    mostrarEnSpan("txtVidas", vidas);

    iniciarJuego();

    
    
}