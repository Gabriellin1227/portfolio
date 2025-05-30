const toggleButton = document.getElementById('toggleButton');
const aboutBox = document.getElementById('about');
const icon = document.getElementById('icon');
const toggleText = document.getElementById('toggleText');

const track = document.getElementById('track');
const next = document.getElementById('next');
const prev = document.getElementById('prev');

const slides = Array.from(track.children);
let slideWidth = slides[0].getBoundingClientRect().width + 16; // slide + gap

// alg ler mais
toggleButton.addEventListener('click', () => {
    aboutBox.classList.toggle('collapsed');

    if (aboutBox.classList.contains('collapsed')) {
        icon.classList.remove('bi-caret-up');
        icon.classList.add('bi-caret-down');
        toggleText.textContent = 'Ler Mais';
    } else {
        icon.classList.remove('bi-caret-down');
        icon.classList.add('bi-caret-up');
        toggleText.textContent = 'Ler Menos';
    }
});

// carrosel

let currentIndex = 0;

function getVisibleSlides() {
    return window.innerWidth <= 768 ? 1 : 2;
}

window.addEventListener('resize', () => {
    slideWidth = slides[0].getBoundingClientRect().width + 16;
    updatePosition();
});

function updatePosition() {
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
}

next.addEventListener('click', () => {
    const visibleSlides = getVisibleSlides();
    const maxIndex = slides.length - visibleSlides;

    if (currentIndex < maxIndex) {
        currentIndex++;
        updatePosition();
    }
});

prev.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updatePosition();
    }
});

// validar form

const form = document.getElementById('formulario');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    let errors = [];

    if (nome.length < 3) {
        errors.push('Nome precisa ter pelo menos 3 caracteres.');
    }

    if (!validateEmail(email)) {
        errors.push('Email inválido.');
    }

    if (!/^\d{8,15}$/.test(numero)) {
        errors.push('Número deve conter apenas dígitos (entre 8 e 15 números).');
    }

    if (mensagem.length < 5) {
        errors.push('Mensagem muito curta.');
    }

    if (errors.length > 0) {
        alert(errors.join('\n'));
    } else {
        alert('✅ Formulário enviado com sucesso!');
        form.reset();
    }
});

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

//abrir menu

function menuShow() {
    let menuMobile = document.querySelector('.sp-navbar-mobile')
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open')
    } else {
        menuMobile.classList.add('open')
    }
}
