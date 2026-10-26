// 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('open');
      });
    }

    if (menuClose && mobileMenu) {
      menuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    }

    function closeMobileMenu() {
      if (mobileMenu) {
        mobileMenu.classList.remove('open');
      }
    }

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Highlight active nav link & quicknav pill on scroll
      const sections = document.querySelectorAll('section[id], div[id="calculator"]');
      const scrollY = window.pageYOffset;

      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 140;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href*="#${sectionId}"]`);
        const quickPill = document.querySelector(`.quicknav-pill[href*="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
          document.querySelectorAll('.quicknav-pill').forEach(p => p.classList.remove('active'));
          if (navLink) navLink.classList.add('active');
          if (quickPill) quickPill.classList.add('active');
        }
      });
    });

    // 3. Category Filter
    function filterCategory(type, category) {
      const buttons = document.querySelectorAll('.filter-tabs .tab-btn');
      buttons.forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');

      const cards = document.querySelectorAll('#goldGrid .product-card');
      cards.forEach(card => {
        const cat = card.getAttribute('data-cat') || '';
        const catList = cat.split(' ');
        if (category === 'all' || catList.includes(category) || cat === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    // 4. Rate Calculator
    function calculateRate() {
      const metalRatePerTola = parseFloat(document.getElementById('calcMetal').value) || 301597;
      const unit = document.getElementById('calcUnit').value;
      const weightVal = parseFloat(document.getElementById('calcWeight').value) || 0;
      const makingPercent = parseFloat(document.getElementById('calcMaking').value) || 0;

      // Conversion to Tolas (1 Tola = 11.6638g)
      let tolas = 0;
      if (unit === 'tola') {
        tolas = weightVal;
      } else if (unit === 'gram') {
        tolas = weightVal / 11.6638;
      } else if (unit === 'aana') {
        tolas = weightVal / 16;
      } else if (unit === 'lal') {
        tolas = weightVal / 100;
      }

      const metalCost = tolas * metalRatePerTola;
      const makingCost = metalCost * (makingPercent / 100);
      const totalEstimated = metalCost + makingCost;

      const formatted = new Intl.NumberFormat('en-NP', {
        style: 'currency',
        currency: 'NPR',
        maximumFractionDigits: 0
      }).format(totalEstimated);

      document.getElementById('calcTotalDisplay').textContent = formatted.replace('NPR', 'NPR ');
    }

    // 5. FAQ Accordion
    function toggleFaq(element) {
      const item = element.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      // Close all FAQs
      document.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('active');
        el.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    }

    // 6. Contact Form Submit
    function handleFormSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('formName').value;
      const phone = document.getElementById('formPhone').value;
      const interest = document.getElementById('formInterest').value;

      alert(`Thank you, ${name}! Your inquiry for "${interest}" has been received. Our showroom team in Bardaghat will call you at ${phone} shortly.`);
      e.target.reset();
    }

    // 7. Resilient Image Loader for VS Code / Local / Live Server Environments
    document.addEventListener('DOMContentLoaded', () => {
      const allImages = document.querySelectorAll('img');
      allImages.forEach(img => {
        img.addEventListener('error', function() {
          const currentSrc = this.getAttribute('src');
          if (!currentSrc) return;
          
          const filename = currentSrc.split('/').pop();
          if (!this.dataset.retryCount) {
            this.dataset.retryCount = '1';
            this.src = 'assets/' + filename;
          } else if (this.dataset.retryCount === '1') {
            this.dataset.retryCount = '2';
            this.src = './' + filename;
          } else if (this.dataset.retryCount === '2') {
            this.dataset.retryCount = '3';
            this.src = '/' + filename;
          }
        });
      });
    });
