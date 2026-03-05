// ============================================
// ALBUM DATA
// ============================================

const albumsData = {
    overdose: {
        title: "Overdose of Everything",
        year: "2025",
        genre: "Los Trios",
        songs: "5 Songs",
        duration: "14,13",
        story: `Irgendöpper wo Bock het muss da no en Text schreibe. Wäri vo Vorteil wen die Person gschicht vo dene 3 Brüeder würi kenne und au chli verstaht um was es bi dem Album gaht.
        
        Also LWK fräg eifach de Lenny ich glaub suscht het da niemmert de Druchblick.
        
        Danke :)`,
tracks: [
    { number: 1, name: "Drogs in Mexico", duration: "4:23" },
    { number: 2, name: "Fuck yeah", duration: "4.31" },
    { number: 3, name: "Gun On The Ground", duration: "5.19" },
],
spotifyEmbed: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/21lmtqKdaTCLBWHvNnamf8?utm_source=generator&theme=0" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
    },
       killthebeast: {
        title: "Kill the Beast",
        year: "2026",
        genre: "Gothic Metal",
        songs: "Coming Soon",
        duration: "TBA",
        story: `The beast is rising. In the shadows of our darkest nightmares, something ancient awakens. "Kill the Beast" will be Los Trios' most brutal and atmospheric album yet.

        Currently being forged in the depths of our studio, this album explores themes of inner demons, primal rage, and the eternal battle between man and monster. Each track is a weapon, sharpened and ready to strike at the heart of darkness.

        The hunt begins soon. Are you ready to face the beast within?`,
        comingSoon: true,
        releaseDate: "Coming 2026"
    }
};

// ============================================
// DOM ELEMENTS
// ============================================

const albumsOverview = document.getElementById('albums-overview');
const albumDetail = document.getElementById('album-detail');
const backButton = document.getElementById('back-to-albums');
const albumCards = document.querySelectorAll('.album-card');

// ============================================
// EVENT LISTENERS
// ============================================

// Album Card Click - Show Details
albumCards.forEach(card => {
    card.addEventListener('click', function() {
        const albumId = this.getAttribute('data-album');
        showAlbumDetails(albumId);
    });
});

// Back Button - Return to Overview
backButton.addEventListener('click', function() {
    showAlbumsOverview();
});

// ============================================
// FUNCTIONS
// ============================================

function showAlbumDetails(albumId) {
    const album = albumsData[albumId];
    
    if (!album) {
        console.error('Album not found:', albumId);
        return;
    }

    // Update album details
    document.getElementById('detail-title').textContent = album.title;
    document.getElementById('detail-genre').textContent = album.genre;
    document.getElementById('detail-year').textContent = album.year;
    document.getElementById('detail-songs').textContent = album.songs;
    document.getElementById('detail-duration').textContent = album.duration;
    document.getElementById('story-text').textContent = album.story;

    // Generate tracklist
    const tracklistContainer = document.getElementById('tracklist');
    tracklistContainer.innerHTML = '';
    
    album.tracks.forEach(track => {
        const trackItem = document.createElement('div');
        trackItem.className = 'track-item';
        trackItem.innerHTML = `
            <div class="track-number">${String(track.number).padStart(2, '0')}</div>
            <div class="track-name">${track.name}</div>
            <div class="track-duration">${track.duration}</div>
        `;
        
        // Optional: Add click event for future play functionality
        trackItem.addEventListener('click', function() {
            console.log(`Playing: ${track.name}`);
            // Here you can add Spotify play functionality later
        });
        
        tracklistContainer.appendChild(trackItem);
    });

// Spotify Player
const spotifySection = document.getElementById('spotify-embed-container');
if (album.spotifyEmbed) {
    spotifySection.innerHTML = album.spotifyEmbed;
} else {
    spotifySection.innerHTML = `
        <div class="spotify-coming-soon">
            <div class="spotify-skull">💀</div>
            <p class="spotify-coming-text">Coming Soon to All Platforms</p>
            <p class="spotify-coming-sub">Kill the Beast — 2026</p>
        </div>
    `;
}

    // Switch views with smooth transition
    albumsOverview.style.display = 'none';
    albumDetail.style.display = 'block';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showAlbumsOverview() {
    // Switch views with smooth transition
    albumDetail.style.display = 'none';
    albumsOverview.style.display = 'flex';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', function(e) {
    // ESC key - Return to overview if in detail view
    if (e.key === 'Escape' && albumDetail.style.display === 'block') {
        showAlbumsOverview();
    }
});

// ============================================
// INITIALIZATION
// ============================================

console.log('Los Trios - Albums & Songs Page Loaded 🎸');
console.log('Available albums:', Object.keys(albumsData));

// ============================================
// MOBILE MENU TOGGLE (FIXED)
// ============================================

const navbar = document.querySelector('.navbar');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navbarMenu = document.querySelector('.navbar-menu');
const navLinks = document.querySelectorAll('.nav-link');

function closeMobileMenu() {
  if (!navbar || !mobileMenuToggle) return;

  navbar.classList.remove('menu-active');

  // Reset burger icon lines (remove inline transforms)
  const spans = mobileMenuToggle.querySelectorAll('span');
  if (spans.length >= 3) {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
}

function toggleMobileMenu() {
  if (!navbar || !mobileMenuToggle) return;

  navbar.classList.toggle('menu-active');

  const spans = mobileMenuToggle.querySelectorAll('span');
  if (spans.length >= 3) {
    if (navbar.classList.contains('menu-active')) {
      spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  }
}

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobileMenu();
  });
}

// Close menu when clicking a nav link (always, not only <=768)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMobileMenu();
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar) return;
  if (navbar.classList.contains('menu-active')) {
    // if click is not inside navbar -> close
    if (!navbar.contains(e.target)) closeMobileMenu();
  }
});

// Close menu when resizing (prevents weird stuck states)
window.addEventListener('resize', () => {
  closeMobileMenu();
});
