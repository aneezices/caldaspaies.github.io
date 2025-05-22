//ANIMAÇÃO DO MENU
const menuIcon = document.getElementById('menu-icon');
const menu = document.getElementById('menu');
const iconHamburger = document.getElementById('icon-hamburger');
const iconClose = document.getElementById('icon-close');

if (menuIcon && menu) {
    menuIcon.addEventListener('click', () => {
        menu.classList.toggle('show');
        if (menu.classList.contains('show')) {
            iconHamburger.style.display = 'none';
            iconClose.style.display = 'block';
        } else {
            iconHamburger.style.display = 'block';
            iconClose.style.display = 'none';
        }
    });
}

// CARROSSEL DE IMAGENS VERTICAL
const carrossel = document.querySelector('.carrossel');
const slides = document.querySelectorAll('.slide');
const bolinhas = document.querySelectorAll('#inicio nav a');

let currentIndex = 0; 
const totalSlides = slides.length;
const intervalTime = 3000; 

function mudarSlide(index) {
    carrossel.style.transform = `translateY(-${index * 100}vh)`;

    bolinhas.forEach((bolinha, i) => {
        bolinha.classList.toggle('active', i === index);
    });

    currentIndex = index;
}

function avancarSlide() {
    const nextIndex = (currentIndex + 1) % totalSlides;
    mudarSlide(nextIndex);
}

bolinhas.forEach((bolinha, index) => {
    bolinha.addEventListener('click', () => {
        mudarSlide(index);
    });
});

let slideInterval = setInterval(avancarSlide, intervalTime);

carrossel.addEventListener('mouseenter', () => clearInterval(slideInterval));
carrossel.addEventListener('mouseleave', () => {
    slideInterval = setInterval(avancarSlide, intervalTime);
});

window.addEventListener('resize', () => mudarSlide(currentIndex));

//INPUTS
const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');

inputs.forEach(function(input) {
  const defaultValue = input.value;

  input.addEventListener('focus', function() {
    if (this.value === defaultValue) {
      this.value = ''; 
    }
  });

  input.addEventListener('blur', function() {
    if (this.value.trim() === '') {
      this.value = defaultValue;
    }
  });
});

//FUNCIONALIDADE DO FORMULÁRIO
const form = document.getElementById('contactForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); 

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData
    });

    if (response.ok) {
      alert('Mensagem enviada com sucesso!');
      form.reset(); 
    } else {
      alert('Erro ao enviar a mensagem. Tente novamente.');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao enviar a mensagem. Tente novamente.');
  }
});