// ************************************************************************************************************

// Cronômetro
// Rafael Queiroz

// **********************************************************************************************

// bloco que pega cada um dos inputs
let segundosEl = document.querySelector('#segundos');
let minutosEl = document.querySelector('#minutos');
let horasEl = document.querySelector('#horas');

// bloco que pega cada um dos botões
let botaoIniciarEl = document.querySelector('#iniciar');
let botaoZerarEl = document.querySelector('#zerar');
let botaoPausarEl = document.querySelector('#pausar');

// função responsável por formatar o valor do input de maneira correta. Ela é chamada
// quando necessário.
function formatarTempo(contador, elementoHTML) {
    // se algum dos contadores (segundos, horas ou minutos) for menor que 10, 
    // uso o método para concatenar strings, colocando o número zero antes.
    if (contador < 10) {
        elementoHTML.value = `0${contador}`;
    } else {
        elementoHTML.value = contador;
    }
}

// inicializo todos os contadores com 0
let segundos = 0;
let horas = 0;
let minutos = 0;

// função responsável por atualizar o cronômetro de maneira adequada. 
function atualizarCronometro() {
    // Incrementando os segundos, onde se segundos for igual á 60, segundos é reinicializado com o valor zero,
    // e minutos é incrementado.
    segundos++;
    if (segundos === 60) {
        segundos = 0;
        minutos++;

        // Se minutos for igual a 60, minutos é inicializado com o valor zero
        // e horas é incrementado.
        if (minutos === 60) {
            minutos = 0;
            horas++;
        }
    }
    // No final, chamo a função exibirTempo, para que os valores do input sejam mostrados corretamente.
    formatarTempo(segundos, segundosEl);
    formatarTempo(minutos, minutosEl);
    formatarTempo(horas, horasEl);
}

let intervalo;

// função por alterar o conteúdo do botão, sendo chamada quando necessário
function alterarConteudoDoBotao(elemento, conteudoAtual, conteudoNovo) {
    if (elemento.innerHTML === conteudoAtual) {
        elemento.innerHTML = conteudoNovo;
    }
}

// função responsável por zerar o cronômetro
function zerarCronometro() {
    botaoIniciarEl.classList.remove('invisivel');
    botaoPausarEl.classList.add('invisivel');
    botaoZerarEl.classList.add('invisivel');
    segundos = 0;
    minutos = 0;
    horas = 0;
    segundosEl.value = '00';
    minutosEl.value = '00';
    horasEl.value = '00';
    clearInterval(intervalo);
    alterarConteudoDoBotao(botaoPausarEl, 'Retomar', 'Pausar');
}

// função responsável por iniciar o cronômetro 
function iniciarCronometro() {
    // Essa função, quando ocorre o clique no botão "Iniciar", remove o 
    // botaoIniciarEl e adiciona o botãoPausarEl e o botaoZerarEl.
    botaoIniciarEl.classList.add('invisivel');
    botaoPausarEl.classList.remove('invisivel');
    botaoZerarEl.classList.remove('invisivel');

    // a cada um segundo a função atualizarCronometro é atualizada.
    intervalo = setInterval(atualizarCronometro, 1000);

    // no fim, chamo a função alterarConteudoDoBotao para garantir que, no momento que o 
    // cronômetro for iniciado, o conteúdo de botaoPausarEl seja o botão "Pausar".
    alterarConteudoDoBotao(botaoPausarEl, 'Retomar', 'Pausar');
}

// função responsável por retomar ou pausar o cronômetro, 
// dependendo do conteúdo do botão. 
function retomarOuPausarCronometro() {
    // Se o conteúdo do botão for 
    // o "Pausar", a função clearInterval é chamada para travar a função atualizarCronometro
    // no mesmo ponto onde o cronômetro estava e o conteúdo é alterado para "Retomar".
    if (botaoPausarEl.innerHTML === 'Pausar') {
        clearInterval(intervalo);
        botaoPausarEl.innerHTML = 'Retomar';
    } 
    // Senão, a função setInterval é novamente chamada do mesmo ponto onde a função
    // atualizarCronometro foi travado.
    else {
        intervalo = setInterval(atualizarCronometro, 1000);
        botaoPausarEl.innerHTML = 'Pausar';
    }
}

// função responsável por controlar o cronômetro. Ele recebe um parâmetro e.
function controlarCronometro(e) {
    // A função recupera o botão alvo do evento e, de acordo, com o elemento clicado, 
    // executa uma das funções.
    let botaoRecuperado = e.currentTarget;
    switch (botaoRecuperado) {
        case botaoZerarEl: zerarCronometro(); break;
        case botaoIniciarEl: iniciarCronometro(); break;
        case botaoPausarEl: retomarOuPausarCronometro();
    }
}
botaoIniciarEl.addEventListener('click', controlarCronometro);
botaoPausarEl.addEventListener('click', controlarCronometro);
botaoZerarEl.addEventListener('click', controlarCronometro);