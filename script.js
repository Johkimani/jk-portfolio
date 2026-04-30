document.addEventListener("DOMContentLoaded", () => {
    // 1. ScrollSpy: Highlight active navigation link on scroll
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Adjust offset to trigger slightly before the section hits the top
            if (scrollY >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (current && link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Handle hover effect for project cards (dynamic glow effect)
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 2. Handle Contact Form Submission
    const contactForm = document.getElementById("contactForm");
    
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault(); // Prevent page reload
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            // Show loading state
            submitBtn.innerText = "Sending...";
            submitBtn.style.opacity = "0.7";
            submitBtn.style.cursor = "not-allowed";
            
            // Gather form data
            const formData = new FormData(contactForm);

            // Send request to FormSubmit
            fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Hide form and show success message
                    contactForm.style.display = "none";
                    const successDiv = document.getElementById("formSuccessMessage");
                    if(successDiv) successDiv.style.display = "flex";
                    contactForm.reset();
                } else {
                    alert("Oops! There was a problem sending your message. Please try again.");
                }
            })
            .catch(error => {
                alert("Oops! There was a problem sending your message. Please check your internet connection.");
            })
            .finally(() => {
                // Reset button state
                submitBtn.innerText = originalText;
                submitBtn.style.opacity = "1";
                submitBtn.style.cursor = "pointer";
            });
        });

        // Handle "Send Another Message" button
        const sendAnotherBtn = document.getElementById("sendAnotherBtn");
        if(sendAnotherBtn) {
            sendAnotherBtn.addEventListener("click", () => {
                document.getElementById("formSuccessMessage").style.display = "none";
                contactForm.style.display = "flex";
            });
        }
    }
});
