document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
   });
  });
  });


  const scrollElements = document.querySelectorAll('.service-block');

function revealOnScroll() {
  scrollElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);

// Trigger once on load
revealOnScroll();


// back to the top button 
const backToTopBtn = document.getElementById('backToTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
});
});

// form section 

const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    feedback.textContent = 'Please fill in all fields.';
    feedback.style.color = 'red';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    feedback.textContent = 'Please enter a valid email address.';
    feedback.style.color = 'red';
    return;
  }

  feedback.style.color = 'green';
  feedback.textContent = 'Message sent successfully!';
  form.reset();
});

// contact form

document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const status = document.getElementById('form-status');
    const submitBtn = form.querySelector('.submit-btn');
    
    // Save original button text
    const originalBtnText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="btn-text">Sending...</span>';
    submitBtn.disabled = true;
    
    // Clear previous status
    status.className = 'status-message';
    status.style.display = 'none';
    
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        status.textContent = 'Message sent successfully! We will get back to you soon.';
        status.className = 'status-message success';
        status.style.display = 'block';
        form.reset();
        
        // Reset floating labels
        document.querySelectorAll('.form-group label').forEach(label => {
          label.style.top = '15px';
          label.style.fontSize = '1rem';
          label.style.color = '#7f8c8d';
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      status.textContent = 'Oops! There was a problem sending your message. Please try again later.';
      status.className = 'status-message error';
      status.style.display = 'block';
      console.error('Form submission error:', error);
    } finally {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
  });
  
  // Add input focus effects
  document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.querySelector('label').style.color = '#3498db';
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.querySelector('label').style.color = '#7f8c8d';
      }
    });
  });