document.querySelector('.toggle-button').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');

    const headings = document.querySelectorAll('.text h5, .text h6');

    headings.forEach(heading => {
        if (document.body.classList.contains('dark-mode')) {
            heading.style.backgroundColor = 'black';
            heading.style.color = 'white';

            heading.addEventListener('mouseover', handleMouseOver);
            heading.addEventListener('mouseout', handleMouseOut);
        } else {
            heading.style.backgroundColor = '';
            heading.style.color = '';

            heading.removeEventListener('mouseover', handleMouseOver);
            heading.removeEventListener('mouseout', handleMouseOut);
        }
    });
});

function handleMouseOver() {
    this.style.color = 'gold';
}

function handleMouseOut() {
    this.style.color = 'white';
}


var modal = document.getElementById("myModal");
var modalImg = document.getElementById("modalImage");

function showModal(src) {
    modal.style.display = "flex";
    modalImg.src = src; 
}

function closeModal() {
    modal.style.display = "none"; 
}

var closeBtn = document.getElementsByClassName("close")[0]; 
closeBtn.addEventListener("click", closeModal);

function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Sidebar Toggle Functionality
    const toggleButton = document.querySelector('.toggle-button');
    const sidebar = document.querySelector('.sidebar');
    const projectsContainer = document.getElementById('projects-container');

    toggleButton.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    });

    // Smooth scroll behavior
    projectsContainer.style.scrollBehavior = 'smooth';

    // Reveal animations for project cards with improved visibility check
    const revealElements = document.querySelectorAll('[data-reveal]');
    const projectCards = document.querySelectorAll('.project-card');
    
    function reveal() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('revealed');
            }
        });
    }

    // Check if each project card is in viewport
    function checkVisibility() {
        projectCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const isVisible = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
            
            if (isVisible) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }

    // Initialize visibility
    checkVisibility();
    reveal();

    // Add scroll event listeners
    projectsContainer.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
            checkVisibility();
            reveal();
        });
    });

    window.addEventListener('resize', () => {
        requestAnimationFrame(checkVisibility);
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            try {
                const formData = new FormData(this);
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData
                });
                
                if (response.ok) {
                    alert('Message sent successfully!');
                    this.reset();
                } else {
                    alert('There was an error sending your message. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('There was an error sending your message. Please try again.');
            }
        });
    }
});


