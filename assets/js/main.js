const miModulo = (() => {
    'use strict';

    const btnNuevoJuego = document.getElementById('btnNuevoJuego'),
          btnPedir = document.getElementById('btnPedir'),
          btnDetener = document.getElementById('btnDetener'),
          jugador_cartas = document.getElementById('jugador_cartas'),
          computadora_cartas = document.getElementById('computadora_cartas'),
          img = document.createElement("img");

    
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'K', 'Q', 'J'];
    
    let deck = [],
        puntosJugadores= [],
        cartas_container = document.querySelectorAll('.cartas_container'),
        small = document.querySelectorAll('small');

    const inicializarJuego = ( jugadores = 2) => {
    
        //inicializar btn
        btnDetener.disabled = false
        btnPedir.disabled = false

        //inicializar y limpiar mesa
        let deck = crearDeck();
        puntosJugadores= [];
        
        //determinar numero de jugadores
        for(let i = 0; i < jugadores; i++){
            puntosJugadores.push(0)
        }

    
    }

    const crearDeck = () => {

        deck = [];
        
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo)
            }

        }

        for (let tipo of tipos) {
            for (const especial of especiales) {
                deck.push(especial + tipo)
            }
        }
        console.log(deck)
        return _.shuffle(deck)
    }

    
    //Obtener carta del array deck
    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay mas cartas en el deck';
        }

        const carta = deck.pop()

        return carta;

    }

    //Obtener el valor de la carta
    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1)
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10 :
            valor * 1

    }

    //crearCarta en el DOM
    const crearCarta = (carta,turno) => {

        const imgCarta = document.createElement('img')
        imgCarta.classList.add('card')
        imgCarta.src = `./assets/cartas/${carta}.png`

        cartas_container[turno].append(imgCarta);

    }

    /*------------------------------------------*/
    /*--Funciones Turno Jugadores--*/
    /*------------------------------------------*/
    const acumularPuntos = ( carta, turno ) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);

        small[turno].innerText = `${puntosJugadores[turno]}`;
        
    }

    /*------------------------------------------*/
    /*--Fin Funciones Turno Jugadores--*/
    /*------------------------------------------*/

    /*------------------------------------------*/
    /*--funciones turno computadora--*/
    /*------------------------------------------*/

    const turnoComputadora = (valorMinimo) => {
        btnDetener.disabled = true
        btnPedir.disabled = true


        do {
            const carta = pedirCarta()

            puntosComputadora = puntosComputadora + valorCarta(carta);

            small[1].innerText = `${puntosComputadora}`;

            crearCarta(carta, puntosJugadores.length - 1)

            if (valorMinimo > 21 || puntosComputadora === 21) {
                break;
            }

        } while (puntosComputadora <= valorMinimo);

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

        crearCarta(carta, 0)


        if (puntosJugador > 21) {
            console.warn('Lo siento Perdiste');
            btnPedir.disabled = true
            btnDetener.disabled = true
            turnoComputadora(puntosJugador)


        } else if (puntosJugador === 21) {
            console.warn('Haz ganado la partida');
            turnoComputadora(puntosJugador)
            btnPedir.disabled = true
            btnDetener.disabled = true

        }

    })


    btnDetener.addEventListener('click', () => {

        turnoComputadora(puntosJugador)

    })

    

    return {
        inicializarJuego
    }

})();