document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a');

  // Smooth scroll and active state handler
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      if (targetId.startsWith('#')) {
        e.preventDefault();
        
        // Update active class
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Scroll smoothly to section
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Update active nav link on scroll
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section, main');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        const sectionId = section.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
});