function loadHTML(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;

            if (id === "navbar") {
                setActiveLink();
            }
        })
        .catch(error => console.error("Error loading file:", file));
}

function setActiveLink() {

    const currentPage = window.location.pathname;

    document.querySelectorAll(".nav-link").forEach(link => {

        const linkPath = new URL(link.href).pathname;

        if (linkPath === currentPage) {
            link.classList.add("active");
        }

    });
}

// Load Layout
loadHTML("navbar", "/nav.html");
loadHTML("footer", "/footer.html");