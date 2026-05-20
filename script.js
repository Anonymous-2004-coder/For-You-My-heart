/* ===========================
   TYPEWRITER EFFECT
   =========================== */
const typewriterText = document.getElementById('typewriterText');
const text = "From the moment I met you, my world transformed into a beautiful dream ❤️";
let charIndex = 0;

function typeWriter() {
    if (charIndex < text.length) {
        typewriterText.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 80);
    }
}

// Start typewriter on page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

/* ===========================
   FLOATING HEARTS BACKGROUND
   =========================== */
const heartsContainer = document.getElementById('heartsContainer');
const heartSymbols = ['❤️', '💕', '💖', '💗', '💓', '💝'];

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    
    // Random position
    heart.style.left = Math.random() * 100 + '%';
    
    // Random animation duration
    const duration = Math.random() * 10 + 10; // 10-20 seconds
    heart.style.animationDuration = duration + 's';
    
    // Random delay
    heart.style.animationDelay = Math.random() * 5 + 's';
    
    // Random size
    const size = Math.random() * 10 + 15; // 15-25px
    heart.style.fontSize = size + 'px';
    
    heartsContainer.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, (duration + 5) * 1000);
}

// Create initial hearts
for (let i = 0; i < 15; i++) {
    setTimeout(createFloatingHeart, i * 500);
}

// Continue creating hearts
setInterval(createFloatingHeart, 2000);

/* ===========================
   ROSE PETALS ANIMATION
   =========================== */
const rosePetalsContainer = document.getElementById('rosePetalsContainer');
const petalSymbols = ['🌸', '🌺', '🌹', '💐'];

function createRosePetal() {
    const petal = document.createElement('div');
    petal.classList.add('rose-petal');
    petal.textContent = petalSymbols[Math.floor(Math.random() * petalSymbols.length)];
    
    petal.style.left = Math.random() * 100 + '%';
    const duration = Math.random() * 10 + 15;
    petal.style.animationDuration = duration + 's';
    petal.style.animationDelay = Math.random() * 5 + 's';
    const size = Math.random() * 10 + 20;
    petal.style.fontSize = size + 'px';
    
    rosePetalsContainer.appendChild(petal);
    
    setTimeout(() => {
        petal.remove();
    }, (duration + 5) * 1000);
}

// Create initial petals
for (let i = 0; i < 10; i++) {
    setTimeout(createRosePetal, i * 800);
}

// Continue creating petals
setInterval(createRosePetal, 3000);

/* ===========================
   LOVE LETTER ENVELOPE
   =========================== */
const envelope = document.getElementById('envelope');
const letterContent = document.getElementById('letterContent');
const envelopeContainer = document.getElementById('envelopeContainer');

if (envelope) {
    envelope.addEventListener('click', () => {
        envelope.classList.add('opened');
        playClickSound();
        
        setTimeout(() => {
            envelope.style.display = 'none';
            letterContent.classList.add('active');
            createHeartExplosion(envelopeContainer);
        }, 600);
    });
}

/* ===========================
   INTERACTIVE GIFT BOXES
   =========================== */
function openGift(giftNumber) {
    const giftBox = document.querySelector(`.gift-box[data-gift="${giftNumber}"]`);
    
    if (giftBox && !giftBox.classList.contains('opened')) {
        giftBox.classList.add('opened');
        playClickSound();
        createHeartExplosion(giftBox);
        
        // Add sparkle effect
        setTimeout(() => {
            createMiniConfetti(giftBox);
        }, 300);
    }
}

function createMiniConfetti(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const confettiSymbols = ['✨', '💖', '💕', '⭐'];
    
    for (let i = 0; i < 10; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = confettiSymbols[Math.floor(Math.random() * confettiSymbols.length)];
        confetti.style.position = 'fixed';
        confetti.style.left = centerX + 'px';
        confetti.style.top = centerY + 'px';
        confetti.style.fontSize = '20px';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '10000';
        
        document.body.appendChild(confetti);
        
        const angle = (Math.PI * 2 * i) / 10;
        const velocity = 100 + Math.random() * 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        confetti.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        }).onfinish = () => confetti.remove();
    }
}

/* ===========================
   CURSOR HEART TRAIL
   =========================== */
const cursorTrail = document.getElementById('cursorTrail');
let trailTimeout;

document.addEventListener('mousemove', (e) => {
    // Throttle trail creation
    if (!trailTimeout) {
        createTrailHeart(e.clientX, e.clientY);
        trailTimeout = setTimeout(() => {
            trailTimeout = null;
        }, 50);
    }
});

function createTrailHeart(x, y) {
    const heart = document.createElement('div');
    heart.classList.add('trail-heart');
    heart.textContent = '❤';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    
    cursorTrail.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 1000);
}

/* ===========================
   SMOOTH SCROLL TO SECTION
   =========================== */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        
        // Play click sound (optional)
        playClickSound();
    }
}

/* ===========================
   SCROLL ANIMATIONS (AOS-like)
   =========================== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
});

/* ===========================
   SURPRISE MESSAGE REVEAL
   =========================== */
const heartButton = document.getElementById('heartButton');
const surpriseLocked = document.getElementById('surpriseLocked');
const surpriseRevealed = document.getElementById('surpriseRevealed');

heartButton.addEventListener('click', () => {
    // Create heart explosion
    createHeartExplosion(heartButton);
    
    // Play sound
    playClickSound();
    
    // Reveal surprise message
    setTimeout(() => {
        surpriseLocked.style.display = 'none';
        surpriseRevealed.classList.add('active');
        
        // Scroll to revealed message
        surpriseRevealed.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 800);
});

/* ===========================
   HEART EXPLOSION ANIMATION
   =========================== */
function createHeartExplosion(button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = '24px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '10000';
        
        document.body.appendChild(heart);
        
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 200 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        heart.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        }).onfinish = () => heart.remove();
    }
}

/* ===========================
   YES/NO BUTTONS - PLAYFUL INTERACTION
   =========================== */
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const yesResponse = document.getElementById('yesResponse');
const buttonsContainer = document.getElementById('buttonsContainer');

let noButtonClicks = 0;

// Yes button - Creates celebration
if (yesButton) {
    yesButton.addEventListener('click', () => {
        // Create confetti
        createConfetti();
        
        // Play sound
        playClickSound();
        
        // Show response
        setTimeout(() => {
            yesResponse.classList.add('active');
            yesResponse.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);
        
        // Hide buttons
        buttonsContainer.style.display = 'none';
    });
}

// No button - Runs away when hovered or clicked
if (noButton) {
    // Initial random position
    setNoButtonPosition();
    
    noButton.addEventListener('mouseenter', () => {
        moveNoButton();
    });
    
    noButton.addEventListener('click', (e) => {
        e.preventDefault();
        moveNoButton();
        noButtonClicks++;
        
        // Make Yes button bigger and more appealing with each attempt
        if (yesButton) {
            const scale = 1 + (noButtonClicks * 0.1);
            yesButton.style.transform = `scale(${scale})`;
            yesButton.style.fontSize = `${1.3 + (noButtonClicks * 0.1)}rem`;
        }
        
        // Show encouraging messages
        showEncouragingMessage();
    });
    
    // Also run away on touch devices
    noButton.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveNoButton();
        noButtonClicks++;
        
        if (yesButton) {
            const scale = 1 + (noButtonClicks * 0.1);
            yesButton.style.transform = `scale(${scale})`;
        }
    });
}

function setNoButtonPosition() {
    const container = buttonsContainer.getBoundingClientRect();
    const button = noButton.getBoundingClientRect();
    
    // Random position within container
    const maxX = container.width - button.width - 100;
    const maxY = 50;
    
    const randomX = Math.random() * maxX - maxX / 2;
    const randomY = Math.random() * maxY - maxY / 2;
    
    noButton.style.left = `calc(50% + ${randomX}px)`;
    noButton.style.top = `${randomY}px`;
}

function moveNoButton() {
    // Get random position away from cursor
    const containerRect = buttonsContainer.getBoundingClientRect();
    const buttonRect = noButton.getBoundingClientRect();
    
    // Calculate random position
    const randomX = (Math.random() - 0.5) * (containerRect.width - 200);
    const randomY = (Math.random() - 0.5) * 100;
    
    // Apply new position with animation
    noButton.style.transition = 'all 0.3s ease';
    noButton.style.left = `calc(50% + ${randomX}px)`;
    noButton.style.top = `${randomY}px`;
    
    // Also make it smaller
    const scale = Math.max(0.6, 1 - (noButtonClicks * 0.05));
    noButton.style.transform = `scale(${scale})`;
    
    // Play sound
    playClickSound();
}

function showEncouragingMessage() {
    const messages = [
        "Come on, you know you want to say Yes! 💕",
        "The No button doesn't work, silly! 😊",
        "Pondatiii, just say Yes already! ❤️",
        "You can't escape from my love! 💖",
        "The Yes button is waiting for you! 💗",
        "I won't give up! Say Yes! 💝",
        "Your heart says Yes, I know it! 💓"
    ];
    
    const message = messages[Math.min(noButtonClicks - 1, messages.length - 1)];
    
    // Create floating message
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 179, 198, 0.95);
        backdrop-filter: blur(10px);
        padding: 20px 40px;
        border-radius: 50px;
        font-size: 1.2rem;
        font-weight: 600;
        color: white;
        z-index: 10000;
        animation: fadeInOut 2s ease-in-out;
        pointer-events: none;
        box-shadow: 0 10px 30px rgba(255, 143, 163, 0.5);
    `;
    
    document.body.appendChild(messageEl);
    
    setTimeout(() => {
        messageEl.remove();
    }, 2000);
}

// Add fadeInOut animation
const style = document.createElement('style');
style.textContent += `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
`;
document.head.appendChild(style);

/* ===========================
   CONFETTI HEARTS
   =========================== */
const confettiContainer = document.getElementById('confettiContainer');

function createConfetti() {
    const confettiHearts = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '💞'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('confetti-heart');
            heart.textContent = confettiHearts[Math.floor(Math.random() * confettiHearts.length)];
            
            // Random horizontal position
            heart.style.left = Math.random() * 100 + '%';
            
            // Random drift amount
            const drift = (Math.random() - 0.5) * 400;
            heart.style.setProperty('--drift', drift + 'px');
            
            // Random animation duration
            const duration = Math.random() * 3 + 3; // 3-6 seconds
            heart.style.animationDuration = duration + 's';
            
            confettiContainer.appendChild(heart);
            
            // Remove after animation
            setTimeout(() => {
                heart.remove();
            }, duration * 1000);
        }, i * 50);
    }
    
    // Clear confetti container after 10 seconds
    setTimeout(() => {
        confettiContainer.innerHTML = '';
    }, 10000);
}

/* ===========================
   PARALLAX SCROLLING
   =========================== */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-section');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

/* ===========================
   SOUND EFFECTS (OPTIONAL)
   =========================== */
function playClickSound() {
    // Create a subtle click sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

/* ===========================
   GLOW EFFECT ON SCROLL
   =========================== */
const glowElements = document.querySelectorAll('.glow-text');

const glowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'glow 2s ease-in-out infinite alternate';
        }
    });
}, { threshold: 0.5 });

glowElements.forEach(element => {
    glowObserver.observe(element);
});

/* ===========================
   MEMORY CARD HOVER EFFECTS
   =========================== */
const memoryCards = document.querySelectorAll('.memory-card');

memoryCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const image = card.querySelector('.placeholder-image');
        if (image) {
            // Add glow effect
            image.style.boxShadow = '0 0 30px rgba(255, 143, 163, 0.8)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const image = card.querySelector('.placeholder-image');
        if (image) {
            image.style.boxShadow = '';
        }
    });
});

/* ===========================
   REASON CARD ANIMATIONS
   =========================== */
const reasonCards = document.querySelectorAll('.reason-card');

reasonCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) rotate(2deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

/* ===========================
   SMOOTH ENTRANCE ANIMATIONS
   =========================== */
// Add stagger effect to timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
});

/* ===========================
   INTERACTIVE HEART BUTTON
   =========================== */
// Add pulse effect when hovering over heart button
if (heartButton) {
    heartButton.addEventListener('mouseenter', () => {
        heartButton.style.animation = 'heartBeat 0.5s ease-in-out infinite';
    });
    
    heartButton.addEventListener('mouseleave', () => {
        heartButton.style.animation = '';
    });
}

/* ===========================
   TIMELINE ICON ANIMATIONS
   =========================== */
const timelineIcons = document.querySelectorAll('.timeline-icon');

const iconObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'iconPulse 1s ease-out';
        }
    });
}, { threshold: 0.5 });

style.textContent = `
    @keyframes iconPulse {
        0% { transform: translateX(-50%) scale(0); }
        50% { transform: translateX(-50%) scale(1.2); }
        100% { transform: translateX(-50%) scale(1); }
    }
`;
document.head.appendChild(style);

timelineIcons.forEach(icon => {
    iconObserver.observe(icon);
});

/* ===========================
   MOBILE OPTIMIZATION
   =========================== */
// Reduce animations on mobile for better performance
if (window.innerWidth < 768) {
    // Reduce floating hearts on mobile
    heartsContainer.innerHTML = '';
    for (let i = 0; i < 8; i++) {
        setTimeout(createFloatingHeart, i * 500);
    }
    
    // Disable cursor trail on mobile
    document.removeEventListener('mousemove', createTrailHeart);
}

/* ===========================
   PREVENT ZOOM ON MOBILE
   =========================== */
document.addEventListener('gesturestart', (e) => {
    e.preventDefault();
});

/* ===========================
   PAGE LOAD ANIMATION
   =========================== */
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

/* ===========================
   EASTER EGG: KONAMI CODE
   =========================== */
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        // Secret message
        alert('You found the secret! ❤️ I love you even more for being so curious!');
        createConfetti();
    }
});

/* ===========================
   SECTION VISIBILITY TRACKING
   =========================== */
const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add any section-specific animations or effects here
            console.log(`Section ${entry.target.id} is visible`);
        }
    });
}, { threshold: 0.3 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

/* ===========================
   CUSTOM CURSOR (OPTIONAL)
   =========================== */
// Uncomment if you want a custom heart cursor
/*
const customCursor = document.createElement('div');
customCursor.textContent = '❤️';
customCursor.style.cssText = `
    position: fixed;
    pointer-events: none;
    font-size: 20px;
    z-index: 10000;
    transform: translate(-50%, -50%);
`;
document.body.appendChild(customCursor);

document.addEventListener('mousemove', (e) => {
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';
});
*/

/* ===========================
   AUTO-HIDE CURSOR TRAIL ON IDLE
   =========================== */
let idleTimer;
document.addEventListener('mousemove', () => {
    clearTimeout(idleTimer);
    cursorTrail.style.opacity = '1';
    
    idleTimer = setTimeout(() => {
        cursorTrail.style.opacity = '0';
    }, 3000);
});

/* ===========================
   SMOOTH SCROLL PROGRESS
   =========================== */
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // You can use this to show a progress bar if desired
    // progressBar.style.width = scrollPercent + '%';
});

/* ===========================
   ACCESSIBILITY: REDUCE MOTION
   =========================== */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.querySelectorAll('*').forEach(element => {
        element.style.animation = 'none';
        element.style.transition = 'none';
    });
}

console.log('💖 Love website loaded successfully! Happy Valentine\'s Day! ❤️');
