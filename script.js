// Iniciar animações AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// FAQ toggle with improved UX
document.querySelectorAll('.faq button').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const p = btn.nextElementSibling;
    const icon = btn.querySelector('i');
    
    // Close all other items
    document.querySelectorAll('.faq .item').forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.querySelector('p').classList.remove('active');
        otherItem.querySelector('button').classList.remove('active');
      }
    });
    
    // Toggle current item
    p.classList.toggle('active');
    btn.classList.toggle('active');
  });
});

// Pricing toggle (monthly/yearly)
const pricingToggle = document.getElementById('pricing-toggle');
if (pricingToggle) {
  pricingToggle.addEventListener('change', () => {
    const monthlyPrices = document.querySelectorAll('.price-monthly');
    const yearlyPrices = document.querySelectorAll('.price-yearly');
    
    if (pricingToggle.checked) {
      monthlyPrices.forEach(price => price.style.display = 'none');
      yearlyPrices.forEach(price => price.style.display = 'block');
    } else {
      monthlyPrices.forEach(price => price.style.display = 'block');
      yearlyPrices.forEach(price => price.style.display = 'none');
    }
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Form submission with validation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic validation
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = '#f87171';
        input.addEventListener('input', () => {
          input.style.borderColor = '#e2e8f0';
        });
      }
    });
    
    if (isValid) {
      // Show success message
      const button = form.querySelector('button[type="submit"]');
      const originalText = button.innerHTML;
      button.innerHTML = '<i class="fas fa-check"></i> Enviado com Sucesso!';
      button.style.background = '#4ade80';
      
      setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
        form.reset();
      }, 2000);
    }
  });
});

// Counter animation for stats
const animateCounters = () => {
  const counters = document.querySelectorAll('.stat-number');
  const options = {
    threshold: 0.7
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
          if (current < target) {
            current += increment;
            counter.textContent = Math.ceil(current).toLocaleString() + 
              (counter.textContent.includes('%') ? '%' : 
               counter.textContent.includes('+') ? '+' : 
               counter.textContent.includes('★') ? '★' : '');
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = counter.textContent; // Reset to original
          }
        };
        
        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, options);
  
  counters.forEach(counter => observer.observe(counter));
};

// Initialize counter animation
animateCounters();

// Countdown timer for urgency
const startCountdown = () => {
  const timerElement = document.querySelector('.timer strong');
  if (!timerElement) return;
  
  // Set countdown to 24 hours from now
  let timeLeft = 24 * 60 * 60; // 24 hours in seconds
  
  const updateTimer = () => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    
    timerElement.textContent = 
      `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (timeLeft > 0) {
      timeLeft--;
      setTimeout(updateTimer, 1000);
    }
  };
  
  updateTimer();
};

// Start countdown
startCountdown();

// Add hover effects to cards
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-8px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Progressive enhancement for browsers that support it
if ('IntersectionObserver' in window) {
  // Enhanced animations for elements coming into view
  const elementsToAnimate = document.querySelectorAll('.card, .step-item, .testimonial-card');
  
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animationObserver.observe(el);
  });
}

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .loaded {
    opacity: 1;
  }
  
  body {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
`;
document.head.appendChild(style);
