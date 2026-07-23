
        // Initialize Lucide Icons
        document.addEventListener('DOMContentLoaded', () => {
            lucide.createIcons();
        });

        // Mobile Menu Toggle
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking nav links
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        // Skills Category Filter Logic
        const skillTabs = document.querySelectorAll('.skill-tab');
        const skillCards = document.querySelectorAll('.skill-card');

        skillTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active tab styles
                skillTabs.forEach(t => {
                    t.classList.remove('bg-white', 'text-black', 'font-bold');
                    t.classList.add('bg-black', 'text-neutral-400');
                });
                tab.classList.add('bg-white', 'text-black', 'font-bold');
                tab.classList.remove('bg-black', 'text-neutral-400');

                const category = tab.getAttribute('data-category');

                skillCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Project Modal Logic
        function openModal(title, description, techArray) {
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-description').textContent = description;
            
            const techContainer = document.getElementById('modal-tech');
            techContainer.innerHTML = '';
            techArray.forEach(tech => {
                const tag = document.createElement('span');
                tag.className = 'px-2 py-1 bg-black border border-brand-border';
                tag.textContent = tech;
                techContainer.appendChild(tag);
            });

            document.getElementById('project-modal').classList.remove('hidden');
        }

        function closeModal() {
            document.getElementById('project-modal').classList.add('hidden');
        }

        // Copy Email to Clipboard
        function copyEmail() {
            const emailText = document.getElementById('email-text').innerText;
            const tempInput = document.createElement('input');
            tempInput.value = emailText;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);

            showToast('Email copied to clipboard!');
        }

        // Contact Form Handler Simulation
        function handleFormSubmit(e) {
            e.preventDefault();
            const submitBtn = document.getElementById('submit-btn');
            submitBtn.disabled = true;
            submitBtn.innerText = 'SENDING...';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerText = 'SEND MESSAGE';
                document.getElementById('contact-form').reset();
                showToast('Thank you! Your message has been sent.');
            }, 1200);
        }

        // Toast Notification System
        function showToast(message) {
            const toast = document.getElementById('toast');
            const toastText = document.getElementById('toast-text');
            
            toastText.textContent = message;
            toast.classList.remove('hidden');
            
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 3000);
        }

        // Scrollspy for Active Nav Indicator
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.active-nav');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            document.querySelectorAll('header nav a').forEach(a => {
                a.classList.remove('text-white', 'border-b', 'border-white');
                if (a.getAttribute('href') === `#${current}`) {
                    a.classList.add('text-white');
                }
            });
        });

