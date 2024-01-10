const GRID_ELEMENT = 7

const container = document.querySelector('.container')
const won = document.querySelector('.won')

function addEstilo(elemento, ...estilos) {
    elemento.classList.add(...estilos)
}

function removerElementos() {
    container.innerText = ''
}

function criarComponentes() {

    const cores = ['vermelho', 'laranja', 'amarelo', 'verde', 'azul', 'anil', 'violeta']

    const divs = []

    for (let i = 0; i < GRID_ELEMENT; i++) {
        const div = document.createElement('div')
        // div.textContent = i + 1

        addEstilo(div, 'rainbow', cores[i])
    
        div.onclick = e => {
            setTimeout(() => {
                div.remove()
                container.appendChild(div)
            }, 150)
        }
        
        divs.push(div)
    }

    const button = document.createElement('div')
    button.textContent = 'restart'
    addEstilo(button, 'button')

    button.onclick = e => {
        button.classList.remove('roll-out-left-reverse')
        setTimeout(() => {
            removerElementos()
            addEstilo(button, 'roll-out-left')
            won.style.opacity = '0'
            addEstilo(won, 'won-text')
            jogo()
        }, 100)
    }

    const box = document.querySelector('.box')
    box.appendChild(button)

    return divs
}

function sortearNumero() {
    return Math.floor(Math.random() * GRID_ELEMENT)
}

function sortearArray() {

    const sorteados = []

    while (sorteados.length < GRID_ELEMENT) {

        const numero = sortearNumero()

        if (sorteados != []) {
            if (!sorteados.includes(numero)) {
                sorteados.push(numero)
            }
        }
        else {
            sorteados.push(numero)
        }
    }

    return sorteados
}

function adicionarElementos() {

    const componentes = criarComponentes()

    const numeros = sortearArray()

    numeros.forEach(n => container.appendChild(componentes[n]))
}

function checarVitoria() {

    const elementos = document.getElementsByClassName('rainbow')

    if (elementos[0].classList.contains('vermelho') && elementos[1].classList.contains('laranja') && elementos[2].classList.contains('amarelo') && elementos[3].classList.contains('verde') && elementos[4].classList.contains('azul') && elementos[5].classList.contains('anil') && elementos[6].classList.contains('violeta')) {
        return true
    }
}

function jogo() {

    adicionarElementos()

    const observer = new MutationObserver(mutations => {
        if (checarVitoria()) {
            setTimeout(() => {
                const button = document.querySelector('.button')
                won.classList.remove('won-text')
                won.style.opacity = '1'
                button.classList.remove('roll-out-left')
                addEstilo(button, 'roll-out-left-reverse')
            }, 50)
        }
    })

    observer.observe(document.body, { childList: true, subtree: true })
}

jogo()