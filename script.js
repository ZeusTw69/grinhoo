// 1. Efeito de Scroll na Navbar (Escurecer fundo ao descer a página)
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
        nav.style.background = 'rgba(0, 0, 0, 0.6)';
    }
});

// 2. Animação de elementos aparecendo ao rolar a página (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // O elemento aparece quando 20% dele estiver visível
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            
            // Se o elemento for a seção de benefícios, inicia o contador
            if (entry.target.id === 'beneficios') {
                iniciarContadores();
            }
            
            observer.unobserve(entry.target); // Para a animação acontecer apenas uma vez
        }
    });
}, observerOptions);

// Seleciona todos os elementos com a classe .hidden e adiciona no observador
document.querySelectorAll('.hidden').forEach((el) => {
    observer.observe(el);
});

// 3. Animação dos contadores de números (Estatísticas)
let contadoresIniciados = false;

function iniciarContadores() {
    if (contadoresIniciados) return; // Evita rodar várias vezes
    contadoresIniciados = true;

    const counters = document.querySelectorAll('.counter');
    const speed = 100; // Velocidade da contagem (quanto menor, mais rápido)

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
}