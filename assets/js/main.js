

let deck = [];

const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'K', 'Q', 'J'];

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
    console.log(deck);
    console.log(carta);
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





