// Funcao que 'embaralha' os cartoes
'use strict';
function cardRandom(array) {
    let indexAtual = array.length,
        valorTemp, randomIndex;

    while (indexAtual !== 0) {
        randomIndex = Math.floor(Math.random() * indexAtual);
        indexAtual -= 1;
        valorTemp = array[indexAtual];
        array[indexAtual] = array[randomIndex];
        array[randomIndex] = valorTemp;
    }

    return array;
}


window.onload = function () {
    const cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"]; 
    let deck= [...cards, ...cards];
    let randomCards = cardRandom(deck);

    let cardElements = document.getElementsByClassName('symbols');

    let openedCards = [],
    matchedCards = [],
    cardO = [],
    firstCard = 0,
    moves = 0,
    restart = document.getElementsByClassName('restart'),
    modal = document.getElementById('myModal'),
    span = document.getElementsByClassName('close')[0];

// Reinicia o Jogo ao clicar no botao
    restart[0].addEventListener('click', function () {
        location.reload();

    })

    for (let i = 0; i < cardElements.length; i++) {
        cardElements[i].className = randomCards[i] + ' fa symbols';

    }
// Abre uma janela que dizendo quantos movimentos, e quantos segundos foram precisos
    function popup() {
        modal.style.display = "flex";
        document.getElementById('p1').innerHTML = 'Você venceu com apenas ' + moves + ' movimentos ' + ' e  ' + seconds + ' segundos.';
    }

    span.onclick = function closeX() {
        modal.style.display = "none";
    }


    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    let stopWatch = document.getElementById('timer'),
    time = 0,
    seconds = 0;
    // Inicia a contagem do Relógio
    function startTime() {
        time = setInterval(function () {
            seconds++;
            stopWatch.innerHTML = seconds + ' s';
        }, 1000);
    }
    
    
    // Interrompe o Relogio
    function stopTime() {
        clearInterval(time);
    }

    let displayCards = document.getElementsByClassName('card');
    console.log(displayCards);
    let clickFlag = true;

// Validacao dos cards ao serem 'selecionados' ou 'clicados'
    function cardClick() {
        if (!clickFlag) {
            return;
        }
        cardO = this;
        cardO.removeEventListener('click', cardClick);
        console.log(cardO);


        // Faz uma contagem de cada clique nos Cards.
        let countMoves = document.getElementById('moves');

        moves++;
        countMoves.innerHTML = moves;
        console.log(countMoves);

        // Aqui as Estrelas de 'dificuldade' se alteram de acordo com a quantidade de movimentos
        if (moves === 20) {
            let removeStar = document.getElementById('star3');
            removeStar.style.display = 'none';
        } else if (moves === 30) {
            let removeStarTwo = document.getElementById('star2');
            removeStarTwo.style.display = 'none';
        }

        if (moves === 1) {
            startTime();
        }

        
        cardO.classList.add('open', 'show');

        if (firstCard) {

            clickFlag = false;
            // Faz a validacao para os cards Iguais
            if (cardO.innerHTML === firstCard.innerHTML) {
                cardO.classList.add('match');
                firstCard.classList.add('match');
                matchedCards.push(cardO, firstCard);

                firstCard = null;


                if (deck.length === matchedCards.length) {


                    stopTime();

                    popup();

                }
                clickFlag = true;
            } else {
                // Feito para reiniciar a jogada a cada Card que nao é correspondente ou similar ao selecionado
                setTimeout(function () {

                    cardO.classList.remove('open', 'show');
                    firstCard.classList.remove('open', 'show');
                    cardO.addEventListener('click', cardClick);
                    firstCard.addEventListener('click', cardClick);
                    firstCard = null;
                    clickFlag = true;
                }, 500);
            }
        } else {
            firstCard = cardO;
            openedCards.push(this);
            clickFlag = true;
        }
    }
    //Funcao para listar os Eventos.'onclick'
    for (let i = 0; i < displayCards.length; i++) {
        displayCards[i].addEventListener('click', cardClick);

    }

}