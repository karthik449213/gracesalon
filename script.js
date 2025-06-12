
        // Mobile Navigation Toggle
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });

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

        // Header scroll effect
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        });

        // Gallery Lightbox Functions
        function openLightbox(imageSrc) {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            lightboxImg.src = imageSrc;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            const lightbox = document.getElementById('lightbox');
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Close lightbox with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });

        // Form Validation and Submission
        const appointmentForm = document.getElementById('appointment-form');
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const service = formData.get('service');
            const date = formData.get('date');
            const time = formData.get('time');
            
            // Validation
            if (!name) {
                alert('Please enter your full name.');
                return;
            }
            
            if (!email || !isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            if (!service) {
                alert('Please select a service.');
                return;
            }
            
            if (!date) {
                alert('Please select a preferred date.');
                return;
            }
            
            if (!time) {
                alert('Please select a preferred time.');
                return;
            }
            
            // Check if date is not in the past
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                alert('Please select a future date for your appointment.');
                return;
            }
            
            // Success message
            alert(`Thank you, ${name}! Your appointment request for ${service} on ${date} at ${time} has been submitted. We'll contact you soon to confirm!`);
            
            // Reset form
            this.reset();
        });

        // Email validation helper function
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Chatbot Functionality
        const chatToggle = document.getElementById('chat-toggle');
        const chatbox = document.getElementById('chatbox');
        const chatMessages = document.getElementById('chat-messages');
        const chatInput = document.getElementById('chat-input');
        const chatSend = document.getElementById('chat-send');

        let chatOpen = false;

        // Toggle chatbot
        chatToggle.addEventListener('click', () => {
            chatOpen = !chatOpen;
            if (chatOpen) {
                chatbox.style.display = 'flex';
                chatToggle.innerHTML = '<i class="fas fa-times"></i>';
                chatInput.focus();
            } else {
                chatbox.style.display = 'none';
                chatToggle.innerHTML = '<i class="fas fa-comments"></i>';
            }
        });

        // Send message function
        function sendMessage() {
            const message = chatInput.value.trim();
            if (!message) return;

            // Add user message
            addMessage(message, 'user');
            chatInput.value = '';

            // Simulate bot response
            setTimeout(() => {
                const botResponse = getBotResponse(message.toLowerCase());
                addMessage(botResponse, 'bot');
            }, 1000);
        }

        // Add message to chat
        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', sender);
            messageDiv.textContent = text;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Bot response logic
        function getBotResponse(message) {
            const responses = {
                // Greetings
                'hello': 'Hello! Welcome to Glow & Grace! How can I assist you today?',
                'hi': 'Hi there! I\'m here to help you with our beauty services. What would you like to know?',
                'hey': 'Hey! Thanks for visiting Glow & Grace. How can I make your day more beautiful?',
                
                // Services
                'services': 'We offer haircuts & styling, facial treatments, makeup artistry, spa treatments, and nail care. Which service interests you?',
                'haircut': 'Our expert stylists provide precision cuts and creative styling. Would you like to book an appointment?',
                'facial': 'Our rejuvenating facials use premium products for glowing skin. We offer various facial treatments for different skin types.',
                'makeup': 'Our professional makeup artists create stunning looks for special occasions and everyday glamour.',
                'spa': 'Relax and unwind with our therapeutic spa treatments designed for complete wellness and rejuvenation.',
                'nails': 'We offer manicures, pedicures, and nail art with the latest trends and techniques.',
                
                // Booking
                'book': 'To book an appointment, please scroll down to our contact form or call us at (555) 123-4567. What service are you interested in?',
                'appointment': 'I\'d love to help you book an appointment! Please use our booking form below or call (555) 123-4567.',
                'price': 'Our prices vary by service. Please call (555) 123-4567 for detailed pricing information.',
                'cost': 'For pricing information, please contact us at (555) 123-4567 or visit us in person.',
                
                // Hours and Location
                'hours': 'We\'re open Monday-Saturday 9AM-7PM, Sunday 10AM-5PM. Walk-ins welcome, but appointments are recommended!',
                'location': 'We\'re located at 123 Beauty Street, Glamour City. You can find us on the map in our contact section!',
                'address': 'Our address is 123 Beauty Street, Glamour City, GC 12345.',
                
                // Products
                'products': 'We use only premium, professional-grade beauty products from top brands to ensure the best results.',
                
                // Staff
                'staff': 'Our team includes Master Stylist Sarah Johnson, Esthetician Emma Davis, and Makeup Artist Maria Rodriguez.',
                
                // Thanks
                'thank you': 'You\'re so welcome! Is there anything else I can help you with today?',
                'thanks': 'My pleasure! Let me know if you have any other questions about our services.',
                
                // Goodbye
                'bye': 'Goodbye! Thanks for visiting Glow & Grace. We can\'t wait to help you glow! ✨',
                'goodbye': 'Take care! Remember, you\'re always beautiful, but we\'re here when you want to glow even brighter! 💫'
            };

            // Check for keywords in the message
            for (const [keyword, response] of Object.entries(responses)) {
                if (message.includes(keyword)) {
                    return response;
                }
            }

            // Default responses for unrecognized messages
            const defaultResponses = [
                'That\'s a great question! For detailed information, please call us at (555) 123-4567 or visit our salon.',
                'I\'d love to help with that! Our team can provide more specific information when you book a consultation.',
                'Thanks for asking! Our experienced staff can give you personalized advice. Would you like to schedule an appointment?',
                'That sounds interesting! For the best answer, I recommend speaking with one of our beauty experts at (555) 123-4567.',
                'Great question! Every client is unique, so our specialists can provide tailored recommendations during your visit.'
            ];

            return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
        }

        // Chat input event listeners
        chatSend.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.service-card, .gallery-item, .staff-card').forEach(el => {
            observer.observe(el);
        });

        // Set minimum date for appointment form (today)
        const dateInput = document.getElementById('date');
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero');
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        });

        // Add loading effect to form submission
        const submitBtn = document.querySelector('.submit-btn');
        appointmentForm.addEventListener('submit', function() {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = 'Book Appointment';
                submitBtn.disabled = false;
            }, 2000);
        });

        // Add typing indicator for chatbot
        function showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.classList.add('message', 'bot', 'typing');
            typingDiv.innerHTML = '<i class="fas fa-ellipsis-h"></i>';
            typingDiv.id = 'typing-indicator';
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function removeTypingIndicator() {
            const typingIndicator = document.getElementById('typing-indicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        }

        // Update send message function to include typing indicator
        const originalSendMessage = sendMessage;
        sendMessage = function() {
            const message = chatInput.value.trim();
            if (!message) return;

            // Add user message
            addMessage(message, 'user');
            chatInput.value = '';

            // Show typing indicator
            showTypingIndicator();

            // Simulate bot response with typing delay
            setTimeout(() => {
                removeTypingIndicator();
                const botResponse = getBotResponse(message.toLowerCase());
                addMessage(botResponse, 'bot');
            }, 1500);
        };

        // Initialize chat with welcome message delay
        setTimeout(() => {
            if (!chatOpen) {
                chatToggle.style.animation = 'pulse 2s infinite';
            }
        }, 3000);

        // Add pulse animation to CSS via JavaScript
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            .typing {
                opacity: 0.7;
                animation: fade 1.5s infinite;
            }
            @keyframes fade {
                0%, 100% { opacity: 0.7; }
                50% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        console.log('🌟 Glow & Grace Beauty Salon Website Loaded Successfully! 🌟');
