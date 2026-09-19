/* =========================================================
   TYPING EFFECT
========================================================= */

const typingElement = document.getElementById("typing");

const words = [
    "AI & ML Developer",
    "Python Developer",
    "Machine Learning Enthusiast",
    "Problem Solver"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    if (!typingElement) {
        return;
    }

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingElement.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }
        }
    }

    setTimeout(
        typeEffect,
        deleting ? 50 : 100
    );
}

typeEffect();


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
    "section:not(#home), " +
    ".skill-category, " +
    ".project-card, " +
    ".education-card, " +
    ".experience-card, " +
    ".certificate-card, " +
    ".contact-item, " +
    ".contact-card, " +
    ".about-content, " +
    ".about-card"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(
    ".nav-links a"
);

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNavigation
);

updateActiveNavigation();


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
    document.getElementById("menu-toggle");

const mobileMenu =
    document.getElementById("nav-links");


if (menuToggle && mobileMenu) {

    menuToggle.addEventListener(
        "click",
        () => {

            mobileMenu.classList.toggle(
                "active"
            );

        }
    );


    navLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                mobileMenu.classList.remove(
                    "active"
                );

            }
        );

    });

}


/* =========================================================
   CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    (event) => {

        if (
            !menuToggle ||
            !mobileMenu
        ) {
            return;
        }

        const clickedInsideMenu =
            mobileMenu.contains(event.target);

        const clickedButton =
            menuToggle.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedButton
        ) {

            mobileMenu.classList.remove(
                "active"
            );

        }

    }
);


/* =========================================================
   GLOWING MOUSE
========================================================= */

const mouseGlow =
    document.querySelector(".mouse-glow");

if (mouseGlow) {

    window.addEventListener(
        "mousemove",
        (event) => {

            mouseGlow.style.left =
                `${event.clientX}px`;

            mouseGlow.style.top =
                `${event.clientY}px`;

        }
    );

}


/* =========================================================
   AI NETWORK BACKGROUND
========================================================= */

const canvas =
    document.getElementById(
        "network-canvas"
    );

if (canvas) {

    const ctx =
        canvas.getContext("2d");

    let particles = [];

    let animationFrame;


    /* -------------------------
       RESIZE CANVAS
    ------------------------- */

    function resizeCanvas() {

        const pixelRatio =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );

        canvas.width =
            window.innerWidth * pixelRatio;

        canvas.height =
            window.innerHeight * pixelRatio;

        canvas.style.width =
            `${window.innerWidth}px`;

        canvas.style.height =
            `${window.innerHeight}px`;

        ctx.setTransform(
            pixelRatio,
            0,
            0,
            pixelRatio,
            0,
            0
        );

    }


    /* -------------------------
       CREATE PARTICLES
    ------------------------- */

    function createParticles() {

        particles = [];

        const particleCount =
            window.innerWidth < 768
                ? 45
                : 90;


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            particles.push({

                x:
                    Math.random() *
                    window.innerWidth,

                y:
                    Math.random() *
                    window.innerHeight,

                size:
                    Math.random() * 1.8 + 0.5,

                speedX:
                    (Math.random() - 0.5) *
                    0.35,

                speedY:
                    (Math.random() - 0.5) *
                    0.35,

                brightness:
                    Math.random() *
                    0.6 + 0.4

            });

        }

    }


    resizeCanvas();

    createParticles();


    /* -------------------------
       WINDOW RESIZE
    ------------------------- */

    window.addEventListener(
        "resize",
        () => {

            resizeCanvas();

            createParticles();

        }
    );


    /* -------------------------
       DRAW NETWORK
    ------------------------- */

    function drawNetwork() {

        ctx.clearRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );


        /* -------------------------
           PARTICLES
        ------------------------- */

        particles.forEach(
            (particle) => {

                particle.x +=
                    particle.speedX;

                particle.y +=
                    particle.speedY;


                /* Screen wrapping */

                if (particle.x < 0) {
                    particle.x =
                        window.innerWidth;
                }

                if (
                    particle.x >
                    window.innerWidth
                ) {
                    particle.x = 0;
                }

                if (particle.y < 0) {
                    particle.y =
                        window.innerHeight;
                }

                if (
                    particle.y >
                    window.innerHeight
                ) {
                    particle.y = 0;
                }


                /* Particle */

                ctx.beginPath();

                ctx.arc(
                    particle.x,
                    particle.y,
                    particle.size,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    `rgba(0,229,255,${particle.brightness})`;

                ctx.shadowBlur = 10;

                ctx.shadowColor =
                    "#00e5ff";

                ctx.fill();

                ctx.shadowBlur = 0;

            }
        );


        /* -------------------------
           CONNECTION LINES
        ------------------------- */

        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < particles.length;
                j++
            ) {

                const p1 =
                    particles[i];

                const p2 =
                    particles[j];


                const dx =
                    p1.x - p2.x;

                const dy =
                    p1.y - p2.y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (distance < 150) {

                    const opacity =
                        (1 - distance / 150) *
                        0.30;


                    ctx.beginPath();

                    ctx.moveTo(
                        p1.x,
                        p1.y
                    );

                    ctx.lineTo(
                        p2.x,
                        p2.y
                    );

                    ctx.strokeStyle =
                        `rgba(0,180,255,${opacity})`;

                    ctx.lineWidth = 0.6;

                    ctx.stroke();

                }

            }

        }


        animationFrame =
            requestAnimationFrame(
                drawNetwork
            );

    }


    drawNetwork();

}