// animar imagen de la seccion definicion
function animateDefinitionImage() {
    const image = document.querySelector('.definicion-img');
    let rotation = 0;
    let scale = 0;

    function animate() {
        rotation += 0.2;
        scale = Math.min(1, scale + 0.01);
        image.style.transform = `rotate(${rotation}deg) scale(${scale})`;
        image.style.opacity = scale;
        
        if (scale < 1) {
            requestAnimationFrame(animate);
        } else {
            requestAnimationFrame(rotateOnly);
        }
    }

    function rotateOnly() {
        rotation += 0.2;
        image.style.transform = `rotate(${rotation}deg)`;
        requestAnimationFrame(rotateOnly);
    }

    animate();
}

document.addEventListener('DOMContentLoaded', animateDefinitionImage);

// animar imagen de la seccion historia

function animateHistoriaImage() {
    const image = document.querySelector('.historia-img');
    let offset = 0;

    // Efecto de entrada
    image.style.opacity = '0';
    image.style.transform = 'translateY(50px)';

    function fadeIn() {
        let opacity = 0;
        let translateY = 50;
        const fadeInInterval = setInterval(() => {
            if (opacity >= 1 && translateY <= 0) {
                clearInterval(fadeInInterval);
                startAnimation();
            } else {
                opacity += 0.05;
                translateY -= 2.5;
                image.style.opacity = opacity;
                image.style.transform = `translateY(${translateY}px)`;
            }
        }, 20);
    }

    function startAnimation() {
        function animate() {
            offset += 0.5;
            image.style.transform = `translateX(${Math.sin(offset * 0.05) * 10}px) translateY(${Math.cos(offset * 0.05) * 10}px)`;
            requestAnimationFrame(animate);
        }
        animate();
    }

    fadeIn();
}

document.addEventListener('DOMContentLoaded', animateHistoriaImage);

// animar imagen de la seccion importancia Global
function animateImportImage() {
    const image = document.querySelector('.import-img');
    let offset = 0;

    // Efecto de entrada
    image.style.opacity = '0';
    image.style.transform = 'translateY(50px)';

    function fadeIn() {
        let opacity = 0;
        let translateY = 50;
        const fadeInInterval = setInterval(() => {
            if (opacity >= 1 && translateY <= 0) {
                clearInterval(fadeInInterval);
                startAnimation();
            } else {
                opacity += 0.05;
                translateY -= 2.5;
                image.style.opacity = opacity;
                image.style.transform = `translateY(${translateY}px)`;
            }
        }, 20);
    }

    function startAnimation() {
        function animate() {
            offset += 0.5;
            image.style.transform = `translateX(${Math.sin(offset * 0.05) * 10}px) translateY(${Math.cos(offset * 0.05) * 10}px)`;
            requestAnimationFrame(animate);
        }
        animate();
    }

    fadeIn();
}

document.addEventListener('DOMContentLoaded', animateImportImage);


// animar imagen de la seccion los 17 ods
function animateLos17OdsImage() {
    const image = document.querySelector('.los17ods-img');
    let offset = 0;

    image.style.opacity = '0';
    image.style.transform = 'translateY(50px)';

    function fadeIn() {
        let opacity = 0;
        let translateY = 50;
        const fadeInInterval = setInterval(() => {
            if (opacity >= 1 && translateY <= 0) {
                clearInterval(fadeInInterval);
                startAnimation();
            } else {
                opacity += 0.05;
                translateY -= 2.5;
                image.style.opacity = opacity;
                image.style.transform = `translateY(${translateY}px)`;
            }
        }, 20);
    }

    function startAnimation() {
        function animate() {
            offset += 0.5;
            image.style.transform = `translateX(${Math.sin(offset * 0.05) * 10}px) translateY(${Math.cos(offset * 0.05) * 10}px)`;
            requestAnimationFrame(animate);
        }
        animate();
    }

    fadeIn();
}

document.addEventListener('DOMContentLoaded', animateLos17OdsImage);

// aniamar imagen de la seccion desafios y oportunidades
function animateDesafiosImage() {
    const image = document.querySelector('.desafios-img');
    let offset = 0;

    image.style.opacity = '0';
    image.style.transform = 'translateY(50px)';

    function fadeIn() {
        let opacity = 0;
        let translateY = 50;
        const fadeInInterval = setInterval(() => {
            if (opacity >= 1 && translateY <= 0) {
                clearInterval(fadeInInterval);
                startAnimation();
            } else {
                opacity += 0.05;
                translateY -= 2.5;
                image.style.opacity = opacity;
                image.style.transform = `translateY(${translateY}px)`;
            }
        }, 20);
    }

    function startAnimation() {
        function animate() {
            offset += 0.5;
            image.style.transform = `translateX(${Math.sin(offset * 0.05) * 10}px) translateY(${Math.cos(offset * 0.05) * 10}px)`;
            requestAnimationFrame(animate);
        }
        animate();
    }

    fadeIn();
}

document.addEventListener('DOMContentLoaded', animateDesafiosImage);
