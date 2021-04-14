
const btnNuevoJuego = document.getElementById('btnNuevoJuego');
const btnPedir = document.getElementById('btnPedir');
const btnDetener = document.getElementById('btnDetener');
const jugador_cartas = document.getElementById('jugador_cartas');

let small = document.querySelectorAll('small');

const img = document.createElement("img")

let deck = [];

const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'K', 'Q', 'J'];
let puntosJugador = 0;
let puntosComputadora = 0;

const crearDeck = () => {

    for (let i = 2; i <= 10; i++) {
        for(let tipo of  tipos){
            deck.push(i + tipo)
        }
        
    }

    for(let tipo of  tipos){
        for (const especial of especiales) {
            deck.push( especial + tipo )
        }
    }
    console.log(deck);
    deck = _.shuffle(deck)
    console.log(deck);
}

crearDeck();

const pedirCarta = () => {

    if(deck.length === 0){
        throw 'No hay mas cartas en el deck';
    }

    const carta = deck.pop()

    return carta;

}


const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1)
    return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1

}

const valor = valorCarta(pedirCarta());
console.log({valor});


//Eventos

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta()
    
    puntosJugador = puntosJugador + valorCarta(carta);
    
    small[0].innerText = `${puntosJugador}`;
    
    const imgCarta = document.createElement('img')
    imgCarta.classList.add('card')
    imgCarta.src = `./assets/cartas/${carta}.png`

    jugador_cartas.append(imgCarta);


    if( puntosJugador > 21 ){
        console.warn('Lo siento Perdiste');
        btnPedir.disabled = true

    }else if( puntosJugador === 21 ){
        console.warn('Haz ganado la partida');
        btnPedir.disabled = true

    }

})


