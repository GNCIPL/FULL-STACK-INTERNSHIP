  // Testimonial Section
  const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let current = 0;
    let interval = setInterval(() => rotateTestimonials(), 5000);

    function showTestimonial(index) {
      clearInterval(interval); // Stop auto-rotate on manual click
      updateTestimonial(index);
      interval = setInterval(() => rotateTestimonials(), 5000);
    }

    function updateTestimonial(index) {
      testimonials.forEach((t, i) => {
        t.classList.remove('active', 'fade-in');
        dots[i].classList.remove('active');
      });
      testimonials[index].classList.add('active', 'fade-in');
      dots[index].classList.add('active');
      current = index;
    }

    function rotateTestimonials() {
      let next = (current + 1) % testimonials.length;
      updateTestimonial(next);
    }

    // Contact Section
    document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent actual form submission

    alert("Thank you! Your message has been submitted.");
    this.reset(); // Reset form fields
    });

    // Footer Section
    document.getElementById('newsletterForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert("Thanks for subscribing to our newsletter!");
    this.reset();
    });