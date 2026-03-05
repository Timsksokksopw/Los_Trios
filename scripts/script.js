const canvas = document.getElementById('lightningCanvas');
        const ctx = canvas.getContext('2d');
        
        // Canvas auf Vollbild setzen
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Bei Größenänderung anpassen
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // Blitz-Klasse
        class Lightning {
            constructor(startX, startY, endX, endY) {
                this.segments = [];
                this.opacity = 1;
                this.fadeRate = 0.01;
                this.thickness = Math.random() * 4 + 3;
                this.color = this.getRandomColor();
                this.generatePath(startX, startY, endX, endY);
            }

            getRandomColor() {
                const colors = [
                    '#ffffffff',    // Weiß
                    '#3f3f3f',    // Blau-Weiß
                    '#2b2b2b20',    // Helles Blau
                    '#0b0b0b0c',    // Helles Gelb
                    '#72002e0d',    // Cremiges Gelb
                    '#ff585817',    // Lilas
                    '#780026ff'     // Cyan
                ];
                return colors[Math.floor(Math.random() * colors.length)];
            }

            generatePath(startX, startY, endX, endY) {
                const segments = [];
                const numSegments = 12 + Math.floor(Math.random() * 8);
                
                let currentX = startX;
                let currentY = startY;
                segments.push({ x: currentX, y: currentY });
                
                for (let i = 1; i < numSegments; i++) {
                    const progress = i / numSegments;
                    const zigzagStrength = 80;
                    const verticalVariation = 30;
                    
                    const baseX = startX + (endX - startX) * progress;
                    const baseY = startY + (endY - startY) * progress;
                    
                    const randomOffsetX = (Math.random() - 0.5) * zigzagStrength;
                    const randomOffsetY = (Math.random() - 0.5) * verticalVariation;
                    
                    currentX = baseX + randomOffsetX;
                    currentY = baseY + randomOffsetY;
                    
                    segments.push({ x: currentX, y: currentY });
                }
                
                segments.push({ x: endX, y: endY });
                this.segments = segments;
                
                // Verzweigungen
                this.branches = [];
                for (let i = 3; i < segments.length - 3; i++) {
                    if (Math.random() < 0.4) {
                        this.createBranch(segments[i], i / segments.length);
                    }
                }
            }

            createBranch(startPoint, progress) {
                const branchLength = 40 + Math.random() * 80;
                const angle = (Math.random() - 0.5) * Math.PI;
                
                const endX = startPoint.x + Math.cos(angle) * branchLength;
                const endY = startPoint.y + Math.sin(angle) * branchLength;
                
                const branchSegments = [];  
                const numBranchSegments = 4 + Math.floor(Math.random() * 6);
                
                for (let i = 0; i <= numBranchSegments; i++) {
                    const branchProgress = i / numBranchSegments;
                    const x = startPoint.x + (endX - startPoint.x) * branchProgress + (Math.random() - 0.5) * 30;
                    const y = startPoint.y + (endY - startPoint.y) * branchProgress + (Math.random() - 0.5) * 15;
                    
                    branchSegments.push({ x, y });
                }
                
                this.branches.push({
                    segments: branchSegments,
                    thickness: this.thickness * 0.5
                });
            }

            draw() {
                if (this.opacity <= 0) return false;

                this.drawLightningPath(this.segments, this.thickness);
                
                this.branches.forEach(branch => {
                    this.drawLightningPath(branch.segments, branch.thickness);
                });

                this.drawGlow();
                this.opacity -= this.fadeRate;
                return this.opacity > 0;
            }

            drawLightningPath(segments, thickness) {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.strokeStyle = this.color;
                ctx.lineWidth = thickness;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                
                ctx.beginPath();
                ctx.moveTo(segments[0].x, segments[0].y);
                
                for (let i = 1; i < segments.length; i++) {
                    ctx.lineTo(segments[i].x, segments[i].y);
                }
                
                ctx.stroke();
                ctx.restore();
            }

            drawGlow() {
                ctx.save();
                ctx.globalAlpha = this.opacity * 0.3;
                ctx.strokeStyle = this.color;
                ctx.lineWidth = this.thickness * 3;
                ctx.lineCap = 'round';
                ctx.shadowColor = this.color;
                ctx.shadowBlur = 20;
                
                ctx.beginPath();
                ctx.moveTo(this.segments[0].x, this.segments[0].y);
                
                for (let i = 1; i < this.segments.length; i++) {
                    ctx.lineTo(this.segments[i].x, this.segments[i].y);
                }
                
                ctx.stroke();
                ctx.restore();
            }
        }

        // Power-Blitz-Klasse für die ersten beiden Blitze
class PowerLightning extends Lightning {
    constructor(startX, startY, endX, endY) {
        super(startX, startY, endX, endY);
        
        // Stärkere Eigenschaften
        this.fadeRate = 0.01; // Viel langsamer verblassen (statt 0.04)
        this.thickness = Math.random() * 8 + 6; // Dicker (6-14px statt 3-7px)
        this.color = this.getPowerColor();
        
        // Mehr Verzweigungen
        this.createMoreBranches();
    }

    getPowerColor() {
        // Intensivere Farben für Power-Blitze
        const powerColors = [
            '#FFFFFF',    // Reines Weiß
            '#d11f00ff'     // Helles Gelb-Weiß
        ];
        return powerColors[Math.floor(Math.random() * powerColors.length)];
    }

    createMoreBranches() {
        // Zusätzliche Verzweigungen für brutaleren Look
        for (let i = 2; i < this.segments.length - 2; i++) {
            if (Math.random() < 0.7) { // 70% statt 40%
                this.createBranch(this.segments[i], i / this.segments.length);
            }
        }
    }

    drawGlow() {
        // Intensiverer Glow-Effekt
        ctx.save();
        ctx.globalAlpha = this.opacity * 0.5; // Stärker (0.5 statt 0.3)
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.thickness * 5; // Größerer Glow (5x statt 3x)
        ctx.lineCap = 'round';
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 40; // Mehr Blur (40 statt 20)
        
        ctx.beginPath();
        ctx.moveTo(this.segments[0].x, this.segments[0].y);
        
        for (let i = 1; i < this.segments.length; i++) {
            ctx.lineTo(this.segments[i].x, this.segments[i].y);
        }
        
        ctx.stroke();
        ctx.restore();
    }
}function createPowerLightning(startX = null, startY = null, endX = null, endY = null) {
    const sX = startX !== null ? startX : Math.random() * canvas.width;
    const sY = startY !== null ? startY : 0;
    const eX = endX !== null ? endX : Math.random() * canvas.width;
    const eY = endY !== null ? endY : canvas.height;
    
    const lightning = new PowerLightning(sX, sY, eX, eY);
    lightnings.push(lightning);
    
    // Stärkere Impact-Effekte
    createPowerImpactEffects(eX, eY);
}

function createPowerImpactEffects(x, y) {
    // Viel stärkerer Bildschirm-Flash
    screenFlash = 0.25; // 25% statt 12%
}

        let lightnings = [];
        let screenFlash = 0; // Für Bildschirm-Flash-Effekt
        let ambientFog = []; // Permanent vorhandener Nebel über die ganze Seite

        // Ambiente-Nebel-Klasse (permanent auf der ganzen Seite)
        class AmbientFog {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.baseOpacity = 0.3 + Math.random() * 0.4; // 0.3-0.7 Basis-Sichtbarkeit
                this.size = 80 + Math.random() * 120; // 80-200px (sehr große Wolken)
                this.driftX = (Math.random() - 0.5) * 0.1; // Sehr langsame Drift
                this.driftY = (Math.random() - 0.5) * 0.05; // Minimal vertikale Bewegung
                this.color = this.getRandomFogColor();
                this.particles = [];
                this.pulseSpeed = 0.005 + Math.random() * 0.01; // Sehr langsames Pulsieren
                this.pulseOffset = Math.random() * Math.PI * 2;
                
                // Viele überlappende Partikel für dichten Nebel
                for (let i = 0; i < 6; i++) {
                    this.particles.push({
                        offsetX: (Math.random() - 0.5) * this.size,
                        offsetY: (Math.random() - 0.5) * this.size * 0.8,
                        size: this.size * (0.5 + Math.random() * 0.5),
                        driftSpeed: (Math.random() - 0.5) * 0.02
                    });
                }
            }

            getRandomFogColor() {
                // Sehr dunkle Nebel-Farben (nur beim Flash sichtbar)
                const colors = [
                    'rgba(40, 40, 50, ',     // Sehr dunkelgrau
                    'rgba(35, 35, 45, ',     // Dunkel-Blau-Grau
                    'rgba(45, 40, 50, ',     // Dunkel-Lila-Grau
                    'rgba(38, 42, 48, ',     // Stahl-Grau
                    'rgba(42, 38, 45, ',     // Düster-Grau
                    'rgba(48, 45, 52, ',     // Schiefer-Grau
                ];
                return colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.x += this.driftX;
                this.y += this.driftY;
                this.pulseOffset += this.pulseSpeed;
                
                // Nebel bewegt sich über Bildschirmränder hinweg (wrap around)
                if (this.x > canvas.width + this.size) this.x = -this.size;
                if (this.x < -this.size) this.x = canvas.width + this.size;
                if (this.y > canvas.height + this.size) this.y = -this.size;
                if (this.y < -this.size) this.y = canvas.height + this.size;
                
                // Partikel bewegen sich unabhängig
                this.particles.forEach(particle => {
                    particle.offsetX += particle.driftSpeed;
                });
            }

            draw(flashIntensity = 0) {
                // Nebel ist nur beim Flash sichtbar
                // Fade-out basierend auf Y-Position (ab 70vh weniger Nebel)
const fadeStart = canvas.height * 0.3;
const fadeEnd = canvas.height * 1.6;
const fadeMultiplier = this.y < fadeStart ? 1 : 
    this.y > fadeEnd ? 0 : 
    1 - ((this.y - fadeStart) / (fadeEnd - fadeStart));

const visibility = this.baseOpacity * flashIntensity * fadeMultiplier;
                if (visibility <= 0.01) return; // Nicht zeichnen wenn zu schwach
                
                ctx.save();
                
                this.particles.forEach((particle, index) => {
                    const particleX = this.x + particle.offsetX;
                    const particleY = this.y + particle.offsetY;
                    
                    // Sanftes Pulsieren
                    const pulse = 0.8 + Math.sin(this.pulseOffset + index * 0.5) * 0.2;
                    const currentSize = particle.size * pulse;
                    
                    // Sehr weicher Nebel-Gradient
                    const gradient = ctx.createRadialGradient(
                        particleX, particleY, 0,
                        particleX, particleY, currentSize
                    );
                    
                    gradient.addColorStop(0, this.color + (visibility * 0.8) + ')');
                    gradient.addColorStop(0.4, this.color + (visibility * 0.5) + ')');
                    gradient.addColorStop(0.7, this.color + (visibility * 0.2) + ')');
                    gradient.addColorStop(1, this.color + '0)');
                    
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(particleX, particleY, currentSize, 0, Math.PI * 2);
                    ctx.fill();
                });
                
                ctx.restore();
            }
        }

        // Ambiente-Nebel über die ganze Seite generieren
        function generateAmbientFog() {
            ambientFog = [];
            
            // Nebel über die ganze Seite verteilen
            const fogDensity = (canvas.width * canvas.height) / 50000; // Dichte basierend auf Bildschirmgröße
            
            for (let i = 0; i < fogDensity; i++) {
                const x = Math.random() * (canvas.width + 200) - 100; // Etwas über Ränder hinaus
                const y = Math.random() * (canvas.height + 200) - 100;
                ambientFog.push(new AmbientFog(x, y));
            }
        }

        // Funktionen für externe Nutzung
        function createLightning(startX = null, startY = null, endX = null, endY = null) {
            const sX = startX !== null ? startX : Math.random() * canvas.width;
            const sY = startY !== null ? startY : 0;
            const eX = endX !== null ? endX : Math.random() * canvas.width;
            const eY = endY !== null ? endY : canvas.height;
            
            const lightning = new Lightning(sX, sY, eX, eY);
            lightnings.push(lightning);
            
            // Blitz-Einschlag-Effekte
            createImpactEffects(eX, eY);
        }

        function createImpactEffects(x, y) {
            // Bildschirm-Flash - macht den Nebel sichtbar
            screenFlash = 0.12; // 12% Helligkeit
        }

        function clearLightning() {
            lightnings = [];
            screenFlash = 0;
            // Nebel bleibt bestehen - nur Flash wird zurückgesetzt
        }

        function animate() {
            // Canvas leeren
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Ambiente-Nebel updaten (bewegt sich ständig)
            ambientFog.forEach(fog => fog.update());
            
            // Nebel wird nur beim Flash sichtbar
            if (screenFlash > 0) {
                // Nebel mit Flash-Intensität zeichnen
                ambientFog.forEach(fog => fog.draw(screenFlash * 8)); // Flash verstärkt die Sichtbarkeit
                
                // Zusätzlicher Bildschirm-Flash-Effekt
                ctx.save();
                ctx.globalAlpha = screenFlash;
                ctx.fillStyle = 'rgba(255, 255, 255, 1)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.restore();
                
                // Flash verblassen lassen
                screenFlash -= 0.001; // Langsamer verblassen für längere Nebel-Sichtbarkeit
                if (screenFlash < 0) screenFlash = 0;
            }
            
            // Blitze zeichnen
            lightnings = lightnings.filter(lightning => lightning.draw());
            
            requestAnimationFrame(animate);
        }

        // Animation starten
        animate();

        // Klick für Blitz
        canvas.addEventListener('click', function(e) {
            createLightning(e.clientX + (Math.random() - 0.5) * 100, 0, e.clientX, e.clientY);
        });

        // Automatische Blitze alle paar Sekunden
        setTimeout(() => {
            setInterval(() => {
                if (Math.random() < 0.5) {  // 80% Chance
                    createLightning();
                    if (Math.random() < 0.3) {  // 40% Chance für zweiten Blitz
                        setTimeout(() => createLightning(), 100);
                    }
                }
            }, 800);
        }, 3000);

        // Animation starten
animate();

// Ambiente-Nebel generieren
generateAmbientFog();

// Funktion um Gitarren-Positionen zu berechnen
function getGuitarPositions() {
    // Plektrum-Wrapper Größe (wie im CSS definiert)
    const wrapperSize = Math.min(
        Math.max(400, window.innerWidth * 0.6), 
        1200
    );
    
    // Center des Bildschirms
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Gitarren sind bei top: 15% des Wrappers
    const guitarY = centerY - (wrapperSize / 2) + (wrapperSize * 0.15);
    
    // Gitarren-Breite (18vw, min 100px, max 400px)
    const guitarWidth = Math.min(
        Math.max(100, window.innerWidth * 0.18),
        400
    );
    
    // Linke Gitarre: left: 26% des Wrappers
    const leftGuitarX = centerX - (wrapperSize / 2) + (wrapperSize * 0.26) + (guitarWidth / 2);
    
    // Rechte Gitarre: right: 26% des Wrappers  
    const rightGuitarX = centerX + (wrapperSize / 2) - (wrapperSize * 0.26) - (guitarWidth / 2);
    
    return {
        left: { x: leftGuitarX, y: guitarY },
        right: { x: rightGuitarX, y: guitarY }
    };
}

// Erste beiden POWER-Blitze in die Gitarren
setTimeout(() => {
    const positions = getGuitarPositions();
    
    // Power-Blitz in linke Gitarre
    createPowerLightning(
        positions.left.x - 100, 0,
        positions.left.x, positions.left.y
    );
}, 3000);

setTimeout(() => {
    const positions = getGuitarPositions();
    
    // Power-Blitz in rechte Gitarre
    createPowerLightning(
        positions.right.x + 100, 0,
        positions.right.x, positions.right.y
    );
    
    // Normale automatische Blitze starten später
    setTimeout(() => {
        setInterval(() => {
            if (Math.random() < 0.3) {
                createLightning(); // Normale Blitze
            }
        }, 2000);
    }, 1000);
    
}, 3000);

function createImpactEffects(x, y) {
    // Bildschirm-Flash - macht den Nebel sichtbar
    screenFlash = 0.12;
    
    // Kein Shake bei normalen Blitzen
}

function createPowerImpactEffects(x, y) {
    // Viel stärkerer Bildschirm-Flash
    screenFlash = 0.25;
    
    // Power Shake-Effekt nur bei Power-Blitzen
    triggerShake(true);
}


// Monster-Element referenzieren
const monsterBackground = document.querySelector('.monster-background');

// Erweiterte triggerShake Funktion mit Monster-Effekt
function triggerShake(isPowerShake = false) {
    const body = document.querySelector('.body');
    const shakeClass = isPowerShake ? 'power-shake' : 'lightning-shake';
    
    // Entferne vorherige Shake-Klasse falls vorhanden
    body.classList.remove('lightning-shake', 'power-shake');
    
    // Füge neue Shake-Klasse hinzu
    body.classList.add(shakeClass);
    
    // Monster bei Power-Shake länger sichtbar machen
    if (isPowerShake) {
        showMonster(800); // 800ms sichtbar
    }
    
    // Entferne die Klasse nach der Animation
    setTimeout(() => {
        body.classList.remove(shakeClass);
    }, isPowerShake ? 1000 : 600);
}

// Monster anzeigen Funktion
function showMonster(duration = 300) {
    if (monsterBackground) {
        monsterBackground.classList.add('monster-visible');
        
        setTimeout(() => {
            monsterBackground.classList.remove('monster-visible');
        }, duration);
    }
}


function createImpactEffects(x, y) {
    // Bildschirm-Flash - macht den Nebel sichtbar
    screenFlash = 0.12;
    
    // Monster kurz sichtbar bei normalem Blitz
    showMonster(200); // Nur 200ms sichtbar
}

function createPowerImpactEffects(x, y) {
    // Viel stärkerer Bildschirm-Flash
    screenFlash = 0.25;
    
    // Power Shake-Effekt und Monster länger sichtbar
    triggerShake(true); // Monster wird hier für 800ms angezeigt
}

// Elektrisierenden Effekt für Gitarren aktivieren
function electrifyGuitars() {
    const leftGuitar = document.querySelector('.guitar-left');
    const rightGuitar = document.querySelector('.guitar-right');
    
    if (leftGuitar && rightGuitar) {
        // Electric Klassen hinzufügen
        leftGuitar.classList.add('guitar-electric', 'guitar-sparks');
        rightGuitar.classList.add('guitar-electric', 'guitar-sparks');
        
        // Effekt nach 8 Sekunden entfernen
        setTimeout(() => {
            leftGuitar.classList.remove('guitar-electric', 'guitar-sparks');
            rightGuitar.classList.remove('guitar-electric', 'guitar-sparks');
        }, 8000);
    }
}
    window.addEventListener('scroll', function() {
        const banner = document.querySelector('.banner-container');
        const scrollPosition = window.scrollY;
        
        // Banner erscheint ab 100px scrollen
        if (scrollPosition > 100) {
            banner.classList.add('visible');
        } else {
            banner.classList.remove('visible');
        }
    });

// ============================================
// GALLERY FILTER FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Filter Buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryGrid = document.querySelector('.gallery-grid');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Filter Button Click Handler
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update Active Button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Alle Items als Array
            const itemsArray = Array.from(galleryItems);

            if (filterValue === 'all') {
                // "All": original Reihenfolge (data-order-all), alle sichtbar
                itemsArray
                    .sort((a, b) => {
                        return parseInt(a.dataset.orderAll) - parseInt(b.dataset.orderAll);
                    })
                    .forEach(item => {
                        galleryGrid.appendChild(item);
                        item.classList.remove('hidden');
                        item.classList.add('fade-in');
                    });
            } else {
                // Kategorie-Filter: nur passende Items, nach kategorie-spezifischer Reihenfolge sortiert
                const matching = itemsArray.filter(item => item.getAttribute('data-category') === filterValue);
                const nonMatching = itemsArray.filter(item => item.getAttribute('data-category') !== filterValue);

                // Passende nach category-order sortieren und vorne einreihen
                matching
                    .sort((a, b) => {
                        const orderKey = 'order' + filterValue.charAt(0).toUpperCase() + filterValue.slice(1);
                        return parseInt(a.dataset[orderKey] || 99) - parseInt(b.dataset[orderKey] || 99);
                    })
                    .forEach(item => {
                        galleryGrid.appendChild(item);
                        item.classList.remove('hidden');
                        item.classList.add('fade-in');
                    });

                // Nicht-passende Items verstecken (aber im DOM lassen)
                nonMatching.forEach(item => {
                    galleryGrid.appendChild(item);
                    item.classList.add('hidden');
                    item.classList.remove('fade-in');
                });
            }
        });
    });
    
    // Load More Button
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Hier würdest du normalerweise mehr Items laden
            // Für jetzt zeigen wir nur eine Animation
            const btnText = this.querySelector('.btn-text');
            const originalText = btnText.textContent;
            
            btnText.textContent = 'Loading...';
            this.style.opacity = '0.6';
            this.style.pointerEvents = 'none';
            
            // Simuliere Laden (in echt würdest du hier AJAX/Fetch verwenden)
            setTimeout(() => {
                btnText.textContent = originalText;
                this.style.opacity = '1';
                this.style.pointerEvents = 'auto';
                
                // Optional: Zeige Notification
                alert('More content coming soon! 🎸');
            }, 1500);
        });
    }
    
    // Gallery Item Click Handler (für Lightbox später)
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('.gallery-item-title')?.textContent;
            const category = this.getAttribute('data-category');
            
            console.log(`Clicked: ${title} (${category})`);
            
            // Hier kannst du später eine Lightbox öffnen
            // Für jetzt zeigen wir nur einen Alert
            if (title) {
                // alert(`${title}\n\nCategory: ${category}`);
            }
        });
    });
});

// ============================================
// GALLERY HOVER SOUND EFFECT (Optional)
// ============================================

// Wenn du Sound-Effekte beim Hover willst, kannst du das hier hinzufügen
// const hoverSound = new Audio('./sounds/hover.mp3');
// galleryItems.forEach(item => {
//     item.addEventListener('mouseenter', () => {
//         hoverSound.currentTime = 0;
//         hoverSound.play();
//     });
// });


// ========== NAVBAR FUNCTIONALITY ==========
const navbar = document.querySelector('.navbar');
let lastScrollPosition = 0;

window.addEventListener('scroll', function() {
    const currentScrollPosition = window.scrollY;
    
    // Navbar erscheint ab 150px scrollen
    if (currentScrollPosition > 150) {
        navbar.classList.add('navbar-visible');
    } else {
        navbar.classList.remove('navbar-visible');
    }
    
    lastScrollPosition = currentScrollPosition;
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navbarElement = document.querySelector('.navbar');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        navbarElement.classList.toggle('menu-active');
    });
}

// Navigation Links aktiv setzen beim Klicken
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Entferne active Klasse von allen Links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Füge active Klasse zum geklickten Link hinzu
        this.classList.add('active');
        
        // Schließe Mobile Menu wenn geöffnet
        if (window.innerWidth <= 768) {
            navbarElement.classList.remove('menu-active');
        }
    });
});

// Schließe Mobile Menu beim Klick außerhalb
document.addEventListener('click', function(e) {
    if (!navbar.contains(e.target) && navbarElement.classList.contains('menu-active')) {
        navbarElement.classList.remove('menu-active');
    }
});

// Smooth Scroll für Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Nur smooth scroll wenn es ein interner Link ist (#...)
        if (href && href.startsWith('#')) {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// FOOTER NEWSLETTER FUNCTIONALITY
// Add this to script.js
// ============================================

// Newsletter Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.newsletter-input');
            const submitButton = this.querySelector('.newsletter-button');
            const email = emailInput.value;
            
            // Validation
            if (!email || !isValidEmail(email)) {
                showNewsletterMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Save original button text
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Subscribing...';
            submitButton.style.opacity = '0.7';
            submitButton.disabled = true;
            
            // Simulate API call (replace with actual API call)
            setTimeout(() => {
                // Success
                showNewsletterMessage('Successfully subscribed! Welcome to the darkness 🤘', 'success');
                emailInput.value = '';
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.style.opacity = '1';
                submitButton.disabled = false;
                
                // In real implementation, you would send data to your backend:
                // fetch('/api/newsletter', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({ email: email })
                // })
                // .then(response => response.json())
                // .then(data => {
                //     showNewsletterMessage('Successfully subscribed!', 'success');
                // })
                // .catch(error => {
                //     showNewsletterMessage('Error subscribing. Please try again.', 'error');
                // });
                
            }, 1500);
        });
    }
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show newsletter message
function showNewsletterMessage(message, type) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.newsletter-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `newsletter-message newsletter-message-${type}`;
    messageDiv.textContent = message;
    
    // Style the message
    messageDiv.style.cssText = `
        margin-top: 15px;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 0.95rem;
        text-align: center;
        animation: messageSlideIn 0.3s ease;
        ${type === 'success' 
            ? 'background: rgba(0, 139, 0, 0.3); border: 2px solid #00ff00; color: #00ff00;' 
            : 'background: rgba(139, 0, 0, 0.3); border: 2px solid #ff0000; color: #ff6b6b;'
        }
    `;
    
    // Add message to form
    const form = document.querySelector('.newsletter-form');
    form.appendChild(messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'messageSlideOut 0.3s ease';
        setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes messageSlideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes messageSlideOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// SMOOTH SCROLL FOR FOOTER LINKS
// ============================================

document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only smooth scroll for internal links
        if (href && href.startsWith('#')) {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// FOOTER LOGO ANIMATION
// ============================================

const footerLogo = document.querySelector('.footer-logo-small');

if (footerLogo) {
    footerLogo.addEventListener('click', function() {
        // Scroll to top with smooth animation
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Add rotation animation
        this.style.animation = 'logoSpin 1s ease-out';
        
        setTimeout(() => {
            this.style.animation = '';
        }, 1000);
    });
}

// Add logo spin animation
const logoStyle = document.createElement('style');
logoStyle.textContent = `
    @keyframes logoSpin {
        from {
            transform: rotate(0deg) scale(1);
        }
        50% {
            transform: rotate(180deg) scale(1.2);
        }
        to {
            transform: rotate(360deg) scale(1);
        }
    }
`;
document.head.appendChild(logoStyle);

