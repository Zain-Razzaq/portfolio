// DOM Elements
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");

// Mobile Navigation Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Theme Toggle Functionality
function initThemeToggle() {
  // Check for saved theme preference or default to 'dark'
  const currentTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeToggleButton(currentTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeToggleButton(newTheme);

    // Add transition class for smooth theme change
    document.body.style.transition =
      "background-color 0.3s ease, color 0.3s ease";
    setTimeout(() => {
      document.body.style.transition = "";
    }, 300);
  });
}

function updateThemeToggleButton(theme) {
  if (theme === "dark") {
    themeIcon.className = "fas fa-sun";
    themeText.textContent = "Light";
  } else {
    themeIcon.className = "fas fa-moon";
    themeText.textContent = "Dark";
  }
}

// Interactive Card Animation
function initInteractiveCard() {
  const floatingCard = document.querySelector(".floating-card");
  if (!floatingCard) return;

  let isMouseOver = false;
  let mouseX = 0;
  let mouseY = 0;

  floatingCard.addEventListener("mouseenter", () => {
    isMouseOver = true;
    floatingCard.style.animationPlayState = "paused";
  });

  floatingCard.addEventListener("mouseleave", () => {
    isMouseOver = false;
    floatingCard.style.animationPlayState = "running";
    floatingCard.style.transform = "";
  });

  floatingCard.addEventListener("mousemove", (e) => {
    if (!isMouseOver) return;

    const rect = floatingCard.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;

    // Calculate mouse position relative to card center
    mouseX = (e.clientX - cardCenterX) / (rect.width / 2);
    mouseY = (e.clientY - cardCenterY) / (rect.height / 2);

    // Limit rotation range
    const maxRotation = 15;
    const rotateX = -mouseY * maxRotation;
    const rotateY = mouseX * maxRotation;

    floatingCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  });

  // Add click interaction for mobile devices
  floatingCard.addEventListener("click", () => {
    floatingCard.style.transform = "perspective(1000px) rotateY(180deg)";
    setTimeout(() => {
      floatingCard.style.transform = "";
    }, 1000);
  });
}

// Project Gallery Functionality
function initProjectGalleries() {
  const galleries = document.querySelectorAll(".project-gallery");

  galleries.forEach((gallery) => {
    const container = gallery.querySelector(".gallery-container");
    const slides = gallery.querySelectorAll(".gallery-slide");
    const indicators = gallery.querySelectorAll(".gallery-indicator");
    const prevBtn = gallery.querySelector(".gallery-nav.prev");
    const nextBtn = gallery.querySelector(".gallery-nav.next");

    let currentSlide = 0;
    let autoSlideInterval;

    // Update gallery display
    function updateGallery() {
      const translateX = -currentSlide * 100;
      container.style.transform = `translateX(${translateX}%)`;

      // Update indicators
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle("active", index === currentSlide);
      });
    }

    // Go to specific slide
    function goToSlide(index) {
      currentSlide = index;
      updateGallery();
    }

    // Next slide
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateGallery();
    }

    // Previous slide
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateGallery();
    }

    // Auto slide functionality
    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
    }

    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    // Event listeners
    nextBtn.addEventListener("click", () => {
      nextSlide();
      stopAutoSlide();
      setTimeout(startAutoSlide, 8000); // Restart auto-slide after 8 seconds
    });

    prevBtn.addEventListener("click", () => {
      prevSlide();
      stopAutoSlide();
      setTimeout(startAutoSlide, 8000);
    });

    // Indicator clicks
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        goToSlide(index);
        stopAutoSlide();
        setTimeout(startAutoSlide, 8000);
      });
    });

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    gallery.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    gallery.addEventListener("touchmove", (e) => {
      e.preventDefault(); // Prevent scrolling
    });

    gallery.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      const deltaX = startX - endX;
      const threshold = 50; // Minimum swipe distance

      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0) {
          nextSlide(); // Swipe left - next slide
        } else {
          prevSlide(); // Swipe right - previous slide
        }
        stopAutoSlide();
        setTimeout(startAutoSlide, 8000);
      }
    });

    // Pause auto-slide on hover
    gallery.addEventListener("mouseenter", stopAutoSlide);
    gallery.addEventListener("mouseleave", startAutoSlide);

    // Start auto-slide
    startAutoSlide();

    // Initialize gallery
    updateGallery();
  });
}

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const navbarHeight = document.querySelector(".navbar").offsetHeight;
      const targetPosition = targetSection.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Navbar background on scroll - removed since we're using CSS variables

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");
    }
  });
}, observerOptions);

// Add animation class to elements and observe them
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".skill-category, .timeline-item, .project-card, .about-text, .contact-content"
  );

  animateElements.forEach((el) => {
    el.classList.add("animate-on-scroll");
    observer.observe(el);
  });
});

// Typing animation for hero text
function typeWriter(element, text, speed = 50) {
  element.innerHTML = "";
  let i = 0;

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Particle animation for hero background
class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 2 + 1;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    this.ctx.fill();
  }
}

// Initialize particle system
function initParticles() {
  const heroSection = document.querySelector(".hero");
  if (!heroSection) return;

  const canvas = document.createElement("canvas");
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "1";
  heroSection.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const particles = [];

  function resizeCanvas() {
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
  }

  function createParticles() {
    const particleCount = Math.floor((canvas.width * canvas.height) / 10000);
    particles.length = 0;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas));
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    requestAnimationFrame(animate);
  }

  resizeCanvas();
  createParticles();
  animate();

  window.addEventListener("resize", () => {
    resizeCanvas();
    createParticles();
  });
}

// Skill items hover effect
function initSkillHover() {
  const skillItems = document.querySelectorAll(".skill-item");

  skillItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.background = `linear-gradient(135deg, 
                hsl(${Math.random() * 360}, 70%, 60%), 
                hsl(${Math.random() * 360}, 70%, 60%))`;
    });

    item.addEventListener("mouseleave", () => {
      item.style.background = "linear-gradient(135deg, #4338ca, #7c3aed)";
    });
  });
}

// Progress bar animation for skills
function animateProgressBars() {
  const skillCategories = document.querySelectorAll(".skill-category");

  skillCategories.forEach((category) => {
    const skillItems = category.querySelectorAll(".skill-item");

    skillItems.forEach((item, index) => {
      item.style.animation = `slideIn 0.5s ease-out ${index * 0.1}s both`;
    });
  });
}

// Add CSS for slideIn animation
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Contact form animation (if you add a form later)
function initContactForm() {
  const contactLinks = document.querySelectorAll(".contact-link");

  contactLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Add ripple effect
      const ripple = document.createElement("span");
      ripple.style.position = "absolute";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(255, 255, 255, 0.3)";
      ripple.style.transform = "scale(0)";
      ripple.style.animation = "ripple 0.6s linear";
      ripple.style.left = "50%";
      ripple.style.top = "50%";
      ripple.style.width = "20px";
      ripple.style.height = "20px";
      ripple.style.marginLeft = "-10px";
      ripple.style.marginTop = "-10px";

      link.style.position = "relative";
      link.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Add ripple animation CSS
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Cursor trail effect
function initCursorTrail() {
  const trail = [];
  const trailLength = 20;

  function createTrailElement() {
    const element = document.createElement("div");
    element.style.position = "fixed";
    element.style.width = "4px";
    element.style.height = "4px";
    element.style.background = "linear-gradient(135deg, #ff6b6b, #4ecdc4)";
    element.style.borderRadius = "50%";
    element.style.pointerEvents = "none";
    element.style.zIndex = "9999";
    element.style.transition = "all 0.3s ease";
    document.body.appendChild(element);
    return element;
  }

  for (let i = 0; i < trailLength; i++) {
    trail.push(createTrailElement());
  }

  document.addEventListener("mousemove", (e) => {
    trail.forEach((element, index) => {
      setTimeout(() => {
        element.style.left = e.clientX + "px";
        element.style.top = e.clientY + "px";
        element.style.opacity = (trailLength - index) / trailLength;
        element.style.transform = `scale(${
          (trailLength - index) / trailLength
        })`;
      }, index * 10);
    });
  });
}

// Loading animation
function initLoading() {
  const loading = document.createElement("div");
  loading.className = "loading";
  loading.innerHTML = '<div class="spinner"></div>';
  document.body.appendChild(loading);

  window.addEventListener("load", () => {
    setTimeout(() => {
      loading.classList.add("hidden");
      setTimeout(() => {
        loading.remove();
      }, 500);
    }, 1000);
  });
}

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll("[data-count]");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      counter.textContent = Math.floor(current);

      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      }
    }, 16);
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initLoading();
  initThemeToggle();
  initInteractiveCard();
  initProjectGalleries();
  initParticles();
  initSkillHover();
  initContactForm();

  // Add cursor trail on desktop only
  if (window.innerWidth > 768) {
    initCursorTrail();
  }

  // Add scroll-triggered animations
  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("skills")) {
          animateProgressBars();
        }
        if (entry.target.querySelector("[data-count]")) {
          animateCounters();
        }
      }
    });
  };

  const sectionObserver = new IntersectionObserver(observerCallback, {
    threshold: 0.3,
  });

  document.querySelectorAll("section").forEach((section) => {
    sectionObserver.observe(section);
  });
});

// Smooth scroll to top button
const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
    color: white;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.style.opacity = "1";
    scrollToTopBtn.style.transform = "translateY(0)";
  } else {
    scrollToTopBtn.style.opacity = "0";
    scrollToTopBtn.style.transform = "translateY(10px)";
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Add hover effects to buttons
scrollToTopBtn.addEventListener("mouseenter", () => {
  scrollToTopBtn.style.transform = "translateY(-3px) scale(1.1)";
  scrollToTopBtn.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.2)";
});

scrollToTopBtn.addEventListener("mouseleave", () => {
  scrollToTopBtn.style.transform = "translateY(0) scale(1)";
  scrollToTopBtn.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
});
