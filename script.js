// script.js
document.addEventListener('DOMContentLoaded', () => {
    const contactInfo = {
        nombre: "Alexis Bernal",
        profesion: "Analista programador",
        correo: "alexis.bernal@inacapmail.cl",
        telefono: "954571594",
        resumen: "inacap"
    };

    const contactInfoDiv = document.getElementById('contact-info');
    contactInfoDiv.innerHTML = `
        <p><strong>Nombre y apellido:</strong> ${contactInfo.nombre}</p>
        <p><strong>Profesión:</strong> ${contactInfo.profesion}</p>
        <p><strong>Correo:</strong> <a href="mailto:${contactInfo.correo}">${contactInfo.correo}</a></p>
        <p><strong>Número telefónico:</strong> ${contactInfo.telefono}</p>
        <p><strong>Resumen Laboral:</strong> ${contactInfo.resumen}</p>
    `;

    // Slider functionality
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');

    function showSlides() {
        slides.forEach(slide => slide.classList.remove('active'));
        slideIndex++;
        if (slideIndex > slides.length) slideIndex = 1;
        slides[slideIndex - 1].classList.add('active');
        setTimeout(showSlides, 3000); // Cambia la imagen cada 3 segundos
    }

    showSlides();

    // Carrusel functionality
    const track = document.querySelector('.carousel-track');
    const slidesCarousel = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button--right');
    const prevButton = document.querySelector('.carousel-button--left');
    const slideWidth = slidesCarousel[0].getBoundingClientRect().width;

    // Arrange the slides next to one another
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slidesCarousel.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    prevButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling || slidesCarousel[slidesCarousel.length - 1];

        moveToSlide(track, currentSlide, prevSlide);
    });

    nextButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling || slidesCarousel[0];

        moveToSlide(track, currentSlide, nextSlide);
    });

    // Mark the first slide as the current slide
    slidesCarousel[0].classList.add('current-slide');

    // Listado de aplicaciones informáticas
    const aplicaciones = [
        "Microsoft Office (Word, Excel, PowerPoint)",
        "Google Workspace (Docs, Sheets, Slides)",
        "Visual Studio Code",
        "Sublime Text",
        "Atom",
        "Adobe Photoshop",
        "Adobe Illustrator",
        "Adobe XD",
        "Sketch",
        "Figma"
        // Agrega más aplicaciones según sea necesario
    ];

    // Obtener el elemento de la lista de aplicaciones
    const appList = document.getElementById('app-list');

    // Agregar cada aplicación al HTML
    aplicaciones.forEach(aplicacion => {
        const listItem = document.createElement('li');
        listItem.textContent = aplicacion;
        appList.appendChild(listItem);
    });
});

function abrirSitio(url) {
    window.open(url, '_blank');
}

// Función para validar RUT
function validarRut() {
    // Obtener el valor del input del RUT
    const rutInput = document.getElementById('rut').value.trim();

    // Patrón de RUT (números seguidos de un guion y un dígito o la letra 'k' mayúscula)
    const rutPattern = /^\d{1,2}\.\d{3}\.\d{3}-[\dk]$/i;

    if (rutPattern.test(rutInput)) {
        // Formatear el RUT para quitar puntos y guión
        const rutClean = rutInput.replace(/\./g, '').replace('-', '');

        // Obtener el dígito verificador
        const dv = rutClean.slice(-1).toUpperCase();

        // Obtener los dígitos del RUT
        const rutDigits = rutClean.slice(0, -1);

        // Calcular el dígito verificador esperado
        let suma = 0;
        let multiplicador = 2;
        for (let i = rutDigits.length - 1; i >= 0; i--) {
            suma += parseInt(rutDigits.charAt(i)) * multiplicador;
            multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
        }
        const dvEsperado = 11 - (suma % 11);
        const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

        // Comparar el dígito verificador ingresado con el calculado
        if (dv === dvCalculado) {
            alert('El RUT es válido.');
        } else {
            alert('El RUT no es válido.');
        }
    } else {
        alert('Formato de RUT incorrecto.');
    }
}