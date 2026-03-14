document.addEventListener("DOMContentLoaded", () => {
    // 1. Interactive AI Neural Network Canvas Background
    const canvas = document.getElementById("canvas-network");
    const ctx = canvas.getContext("2d");

    let width, height;
    let particles = [];
    
    // Resize canvas to full window
    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Particle settings
    const particleCount = window.innerWidth < 768 ? 40 : 100; // Fewer particles on mobile
    const connectionDistance = 150;
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 1.5;
            this.vy = (Math.random() - 0.5) * 1.5;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off walls
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = "#ffea00"; // yellow dots
            ctx.fill();
        }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Connect lines
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    const alpha = 1 - (distance / connectionDistance);
                    ctx.strokeStyle = `rgba(255, 15, 57, ${alpha * 0.5})`; // red connections
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();

    // Mouse Interaction with Particles
    const mouse = { x: null, y: null };
    window.addEventListener("mousemove", (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    // 2. Countdown Timer
    const targetDate = new Date("March 17, 2026 09:00:00").getTime();
    const deadlineDate = new Date("March 16, 2026 23:59:59").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        
        // Event countdown (existing)
        const distance = targetDate - now;
        const mainCountdown = document.getElementById("countdown");
        if (mainCountdown) {
            if (distance < 0) {
                mainCountdown.innerHTML = "<h3 style='color: var(--highlight-yellow)'>Event Started!</h3>";
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                document.getElementById("days").innerText = days.toString().padStart(2, "0");
                document.getElementById("hours").innerText = hours.toString().padStart(2, "0");
                document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0");
                document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0");
            }
        }

        // Registration deadline countdown (new)
        const deadlineDistance = deadlineDate - now;
        const deadlineContainers = document.querySelectorAll('.countdown-multi');
        
        if (deadlineDistance < 0) {
            deadlineContainers.forEach(container => {
                container.innerHTML = "<h3 style='color: var(--primary-red)'>⚠ Registration Closed</h3>";
            });
        } else {
            const dDays = Math.floor(deadlineDistance / (1000 * 60 * 60 * 24));
            const dHours = Math.floor((deadlineDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const dMinutes = Math.floor((deadlineDistance % (1000 * 60 * 60)) / (1000 * 60));
            const dSeconds = Math.floor((deadlineDistance % (1000 * 60)) / 1000);

            deadlineContainers.forEach(container => {
                const elDays = container.querySelector('.days');
                const elHours = container.querySelector('.hours');
                const elMinutes = container.querySelector('.minutes');
                const elSeconds = container.querySelector('.seconds');
                
                if(elDays) elDays.innerText = dDays.toString().padStart(2, "0");
                if(elHours) elHours.innerText = dHours.toString().padStart(2, "0");
                if(elMinutes) elMinutes.innerText = dMinutes.toString().padStart(2, "0");
                if(elSeconds) elSeconds.innerText = dSeconds.toString().padStart(2, "0");
            });
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 3. Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            if(targetId === "#") return;
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: "smooth"
                });
            }
        });
    });
});
