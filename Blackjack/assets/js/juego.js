
(() => {
    'use strict' // hace que js se ponga serio y no nos pase por alto ningun error
    let deck      = [];
    const tipos   = ['C', 'D', 'H', 'S']
    const figuras = ['A', 'J', 'Q', 'K']
    
    let puntosJugador   = 0,
        puntosOrdenador = 0;
    
    
    //REFERENCIAS HTML
    const btnPedir      = document.querySelector("#btnPedir");
    const btnDetener    = document.querySelector("#btnDetener");
    const btnNuevoJuego = document.querySelector("#btnNuevoJuego");
    
    const divCartasJugador   = document.querySelector('#jugador-cartas')
    const divCartasOrdenador = document.querySelector('#ordenador-cartas')
    
    const sumaPuntos         = document.querySelectorAll('small');
    
    //Creacion de la baraja
     const crearDeck = () => {
    
        for (let i = 2; i <= 10; i++) {
    
            for (let tipo of tipos) {
                deck.push(i + tipo)
            }
        }
    
        for (let i = 0; i < 4; i++) {
            especial = figuras[i];
            for (let tipo of tipos){
                deck.push(especial + tipo)
            }
        }
    
        deck = _.shuffle(deck);
     
     }
    
    crearDeck();
    
    //Peticion de carta
    
    const pedirCarta = () => {
        const carta = deck.pop();
        return carta;
    }
    
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1); //este metodo selecciona los caracteres que quieres que se vean del string
    
     return ( isNaN (valor) ) ?
                ( valor === 'A') ? 11 : 10
                : valor * 1;
    }
    
    //TURNO DEL ORDENADOR
    
    const turnoOrdenador = (puntosMinimos) => {
    
        do { // al menos se debe de ejecutar una vez siempre
            const carta = pedirCarta();
    
            puntosOrdenador = puntosOrdenador + valorCarta(carta);
            sumaPuntos[1].innerHTML = puntosOrdenador; // el 0 indica que apunte al primer small
        
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`
            imgCarta.classList.add("carta");
            divCartasOrdenador.append(imgCarta);
    
            if( puntosMinimos > 21 ) {
                break;
            }
    
        } while ( (puntosOrdenador < puntosMinimos) && (puntosMinimos <= 21));
    
        setTimeout(() => { 
            if (puntosOrdenador === puntosMinimos) {
                alert('Nadie gana')
            } else if (puntosMinimos > 21) {
                alert('Ordenador gana')
            } else if (puntosOrdenador > 21) {
                alert ('Jugador gana')
            } else {
                alert('Ordenador gana')
            }    
            }, 100); 
        
    }
    
    
    //EVENTOS
    btnPedir.addEventListener('click', () => { 
    
        const carta = pedirCarta();
        puntosJugador = puntosJugador + valorCarta(carta);
        sumaPuntos[0].innerHTML = puntosJugador; 
    
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`
        imgCarta.classList.add("carta");
        divCartasJugador.append(imgCarta);
    
        if (puntosJugador > 21) {
            console.warn('Perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoOrdenador(puntosJugador);
        }   else if (puntosJugador === 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoOrdenador(puntosJugador);     
        }
    
    }) 
    
    btnDetener.addEventListener('click', () => {
        btnDetener.disabled = true;
        btnPedir.disabled = true;
        turnoOrdenador(puntosJugador);
    
    })
    
    btnNuevoJuego.addEventListener('click', () => {
        deck = [];
        crearDeck();
        btnDetener.disabled = false;
        btnPedir.disabled = false;
        sumaPuntos[0].innerHTML = '0';
        sumaPuntos[1].innerHTML = '0';
        puntosJugador = 0;
        puntosOrdenador = 0;
        divCartasJugador.innerHTML = '';
        divCartasOrdenador.innerHTML = '';
    })
})(); // funcion autoinvocada, //esto se conoce como patron modulo






