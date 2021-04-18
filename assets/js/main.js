const miModulo = (() => {
    'use strict';

    const btnNuevoJuego = document.getElementById('btnNuevoJuego'),
          btnPedir = document.getElementById('btnPedir'),
          btnDetener = document.getElementById('btnDetener'),
          img = document.createElement("img");

    
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'K', 'Q', 'J'];
    
    let deck = [],
        puntosJugadores= [],
        cartas_container = document.querySelectorAll('.cartas_container'),
        small = document.querySelectorAll('small');

    const inicializarJuego = ( jugadores = 2) => {
    
        //inicializar btn
        btnPedir.disabled = false

        //inicializar y limpiar mesa
        let deck = crearDeck();
        puntosJugadores= [];
        cartas_container.forEach(e => e.innerHTML = "")
        small.forEach(e => e.innerText = "")
        
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
        
        return deck = _.shuffle(deck);
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
        
        btnDetener.disabled = true;
        

        do {
            const carta = pedirCarta()

            acumularPuntos(carta, puntosJugadores.length - 1)

            crearCarta(carta, puntosJugadores.length - 1)

            if (valorMinimo > 21 || puntosJugadores[puntosJugadores.length - 1] === 21) {
                break;
            }

        } while (puntosJugadores[puntosJugadores.length - 1] <= valorMinimo);

    }

    /*------------------------------------------*/
    /*-- fin funciones turno computadora--*/
    /*------------------------------------------*/



    /*------------------------------------------*/
    /*--Eventos--*/
    /*------------------------------------------*/

    btnPedir.addEventListener('click', () => {
        btnDetener.disabled = false
        const carta = pedirCarta()

        acumularPuntos(carta, 0)

        crearCarta(carta, 0)


        if (puntosJugadores[0] > 21) {
            console.warn('Lo siento Perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugadores[0])


        } else if (puntosJugadores[0] === 21) {
            console.warn('Haz ganado la partida');
            turnoComputadora(puntosJugadores[0])
            btnPedir.disabled = true
            btnDetener.disabled = true

        }

    })


    btnDetener.addEventListener('click', () => {

        turnoComputadora(puntosJugadores[0])
        btnPedir.disabled = true
        btnDetener.disabled = true
    })

    

    return {
        inicializarJuego
    }

})();