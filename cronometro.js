let segundosEl = document.querySelector('#segundos');
let minutosEl = document.querySelector('#minutos');
let horasEl = document.querySelector('#horas');

let botaoIniciarEl = document.querySelector('#iniciar');
let botaoZerarEl = document.querySelector('#zerar');
let botaoPausarEl = document.querySelector('#pausar');

let segundos = 0;
let horas = 0;
let minutos = 0;

function exibirTempo(contador, elementoHTML) {
    if (contador < 10) {
        elementoHTML.value = `0${contador}`;
    } else {
        elementoHTML.value = contador;
    }
}

function atualizarCronometro() {
    segundos++;
    if (segundos === 60) {
        segundos = 0;
        minutos++;

        if (minutos === 60) {
            minutos = 0;
            horas++;
        }
    }
    exibirTempo(segundos, segundosEl);
    exibirTempo(minutos, minutosEl);
    exibirTempo(horas, horasEl);
}

let intervalo;

function alterarConteudoDoBotao(elemento, conteudoAntigo, conteudoNovo) {
    if (elemento.innerHTML === conteudoAntigo) {
        elemento.innerHTML = conteudoNovo;
    }
}

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

function iniciarCronometro() {
    botaoIniciarEl.classList.add('invisivel');
    botaoPausarEl.classList.remove('invisivel');
    botaoZerarEl.classList.remove('invisivel');
    intervalo = setInterval(atualizarCronometro, 1000);
    alterarConteudoDoBotao(botaoPausarEl, 'Retomar', 'Pausar');
}

function retomarOuPausarCronometro() {
    if (botaoPausarEl.innerHTML === 'Pausar') {
        clearInterval(intervalo);
        botaoPausarEl.innerHTML = 'Retomar';
    } else {
        intervalo = setInterval(atualizarCronometro, 1000);
        botaoPausarEl.innerHTML = 'Pausar';
    }
}

function controlarCronometro(e) {
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