document.addEventListener("DOMContentLoaded", function() {
    const teamMembers = document.querySelectorAll('.team-member');

    teamMembers.forEach(member => {
        const info = member.querySelector('.member-info');
        const image = member.querySelector('.member-image');
        
        // Animaciones al pasar el mouse
        member.addEventListener('mouseenter', function() {
            this.classList.add('active');
            info.style.transform = 'translateY(0)';
            info.style.opacity = '1';
            image.style.transform = 'scale(1.1)';
            
            // Efecto de brillo
            const shine = document.createElement('div');
            shine.classList.add('shine-effect');
            this.appendChild(shine);
            
            // Animación de iconos sociales
            const socialIcons = this.querySelectorAll('.social-icon');
            socialIcons.forEach((icon, index) => {
                icon.style.animation = `popIn 0.3s ${index * 0.1}s forwards`;
            });
        });

        member.addEventListener('mouseleave', function() {
            this.classList.remove('active');
            info.style.transform = 'translateY(100%)';
            info.style.opacity = '0';
            image.style.transform = 'scale(1)';
            
            const shine = this.querySelector('.shine-effect');
            if (shine) this.removeChild(shine);
            
            const socialIcons = this.querySelectorAll('.social-icon');
            socialIcons.forEach(icon => {
                icon.style.animation = '';
            });
        });

        member.classList.add('fade-in');
    });

    // Sección de equipo
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    teamMembers.forEach(member => {
        observer.observe(member);
    });
});


// Preguntas Frecuentes
const faqSections = document.querySelectorAll('.faq-section');

faqSections.forEach(section => {
    const icon = section.querySelector('.faq-icon');
    const answer = section.querySelector('p');

    section.addEventListener('click', function() {
        const isOpen = answer.style.display === 'block';
        
        // Close all other sections
        faqSections.forEach(sec => {
            sec.querySelector('p').style.display = 'none';
            sec.querySelector('.faq-icon').textContent = '+';
        });

        // Toggle current section
        if (isOpen) {
            answer.style.display = 'none';
            icon.textContent = '+';
        } else {
            answer.style.display = 'block';
            icon.textContent = '-';
        }
    });
});
