// Funcao que 'embaralha' os cartoes
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
    let openedCards = [];
    matchedCards = [];
    atualCard = [];
    firstCard = 0;
    contadorMove = 0;
    restart = document.getElementsByClassName('restart');
    modal = document.getElementById('myModal');
    span = document.getElementsByClassName('close')[0];

// Reinicia o Jogo ao clicar no botao
    restart[0].addEventListener('click', function () {
        location.reload();

    })

    const cards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle',
        'fa-bomb', 'fa-bomb'
    ];
    let randomCards = cardRandom(cards);

    let cardElements = document.getElementsByClassName('symbols');

    for (i = 0; i < cardElements.length; i++) {
        cardElements[i].className = randomCards[i] + ' fa symbols';

    }
// Abre uma janela que dizendo quantos movimentos, e quantos segundos foram precisos
    function popup() {
        modal.style.display = "flex";
        document.getElementById('p1').innerHTML = 'Você venceu com apenas ' + contadorMove + ' movimentos ' + ' e  ' + seconds + ' segundos.';
    }

    span.onclick = function closeX() {
        modal.style.display = "none";
    }


    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    let stopWatch = document.getElementById('timer');
    time = 0;
    seconds = 0
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
        atualCard = this;
        atualCard.removeEventListener('click', cardClick);
        console.log(atualCard);


        // Faz uma contagem de cada clique nos Cards.
        let countMoves = document.getElementById('moves');

        contadorMove++;
        countMoves.innerHTML = contadorMove;
        console.log(countMoves);

        // Aqui as Estrelas de 'dificuldade' se alteram de acordo com a quantidade de movimentos
        if (contadorMove === 20) {
            let removeStar = document.getElementById('star3');
            removeStar.style.display = 'none';
        } else if (contadorMove === 30) {
            let removeStarTwo = document.getElementById('star2');
            removeStarTwo.style.display = 'none';
        }

        if (contadorMove === 1) {
            startTime();
        }

        
        atualCard.classList.add('open', 'show');

        if (firstCard) {

            clickFlag = false;
            // Faz a validacao para os cards Iguais
            if (atualCard.innerHTML === firstCard.innerHTML) {
                atualCard.classList.add('match');
                firstCard.classList.add('match');
                matchedCards.push(atualCard, firstCard);

                firstCard = null;


                if (cards.length === matchedCards.length) {


                    stopTime();

                    popup();

                }
                clickFlag = true;
            } else {
                // Feito para reiniciar a jogada a cada Card que nao é correspondente ou similar ao selecionado
                setTimeout(function () {

                    atualCard.classList.remove('open', 'show');
                    firstCard.classList.remove('open', 'show');
                    atualCard.addEventListener('click', cardClick);
                    firstCard.addEventListener('click', cardClick);
                    firstCard = null;
                    clickFlag = true;
                }, 500);
            }
        } else {
            firstCard = atualCard;
            openedCards.push(this);
            clickFlag = true;
        }
    }
    //Funcao para listar os Eventos.'onclick'
    for (i = 0; i < displayCards.length; i++) {
        displayCards[i].addEventListener('click', cardClick);

    }

}