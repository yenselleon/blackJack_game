
const btnNuevoJuego = document.getElementById('btnNuevoJuego');
const btnPedir = document.getElementById('btnPedir');
const btnDetener = document.getElementById('btnDetener');
const jugador_cartas = document.getElementById('jugador_cartas');
const computadora_cartas = document.getElementById('computadora_cartas');

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
    deck = _.shuffle(deck)
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

/*------------------------------------------*/
/*--funciones turno computadora--*/
/*------------------------------------------*/

const turnoComputadora = (valorMinimo) => {
    btnDetener.disabled = true
    btnPedir.disabled = true


    do{
        const carta = pedirCarta()
    
        puntosComputadora = puntosComputadora + valorCarta(carta);
        
        small[1].innerText = `${puntosComputadora}`;
        
        const imgCarta = document.createElement('img')
        imgCarta.classList.add('card')
        imgCarta.src = `./assets/cartas/${carta}.png`
    
        computadora_cartas.append(imgCarta);

        if( valorMinimo > 21 || puntosComputadora === 21){
            break;
        }

    }while ( puntosComputadora <= valorMinimo);

}

/*------------------------------------------*/
/*-- fin funciones turno computadora--*/
/*------------------------------------------*/


/*------------------------------------------*/
/*--Eventos--*/
/*------------------------------------------*/

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
        btnDetener.disabled = true
        turnoComputadora(puntosJugador)


    }else if( puntosJugador === 21 ){
        console.warn('Haz ganado la partida');
        turnoComputadora(puntosJugador)
        btnPedir.disabled = true
        btnDetener.disabled = true

    }

})


btnDetener.addEventListener('click', () => {

    turnoComputadora(puntosJugador)

})

btnNuevoJuego.addEventListener('click', () => {

    console.clear();
    deck = [];
    puntosJugador = 0;
    puntosComputadora = 0;

    small[0].innerText = 0
    small[1].innerText = 0

    jugador_cartas.innerHTML = ''
    computadora_cartas.innerHTML = ''

    btnPedir.disabled = false
    btnDetener.disabled = false
    crearDeck();

})




