// Get elements
const navbar = document.getElementById('navbar');
const navbarButtons = document.getElementById('navbarButtons');
const navbarToggle = document.getElementById('navbarToggle');
const menuIcon = document.getElementById('menuIcon');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// Navigation configuration with "Projects" dropdown
const navLinks = [
    { label: 'Home', url: './index.html', target: '_self' },
    { label: 'About Me', url: './about-me.html', target: '_self' },
    {
        label: 'Projects',
        subLinks: [
            { label: 'HomeLab', url: './projects/homelab.html', target: '_self' },
            { label: 'FlightSim', url: './projects/flightsim.html', target: '_self' },
            { label: 'Other', url: './projects/other.html', target: '_self' }
        ]
    },
    { label: 'Milestones', url: './milestones.html', target: '_self' },
    { label: 'Drive', url: 'https://drive.cjmcbnexus.com', target: '_blank' },
    { label: 'Employers', url: './employers.html', target: '_self' },
];

// Current page URL for highlighting
const currentUrl = window.location.href;

// Initialize theme based on localStorage
document.addEventListener('DOMContentLoaded', () => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        document.body.classList.add(storedTheme);
        themeIcon.textContent = storedTheme === 'dark-mode' ? '☀️' : '🌙';
    } else {
        document.body.classList.add('dark-mode'); // Default to dark mode
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark-mode'); // Save default theme
    }

    // Create Navbar Buttons
    createNavbar();
});

// Toggle Navbar
navbarToggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('open');
    menuIcon.textContent = isOpen ? '✖' : '☰';
});

// Toggle Dark/Light Mode
themeToggle.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode', !isDarkMode);
    themeIcon.textContent = isDarkMode ? '☀️' : '🌙';
    localStorage.setItem('theme', isDarkMode ? 'dark-mode' : 'light-mode');
});

// Create Navbar dynamically
function createNavbar() {
    navLinks.forEach(({ label, url, target, subLinks }) => {
        const button = document.createElement('button');
        button.className = 'nav-btn';
        button.textContent = label;

        // Add arrow for dropdown if there are sublinks
        if (subLinks) {
            const arrow = document.createElement('span');
            arrow.innerHTML = '&#9654;'; // Hollow arrow (►)
            arrow.className = 'dropdown-arrow';
            button.insertBefore(arrow, button.firstChild); // Place arrow on the left side

            button.classList.add('dropdown-btn');
            const dropdownContainer = document.createElement('div');
            dropdownContainer.className = 'dropdown-container';

            subLinks.forEach(subLink => {
                const subButton = document.createElement('button');
                subButton.className = 'nav-btn nav-sub-btn';
                subButton.textContent = subLink.label;
                subButton.addEventListener('click', () => {
                    window.open(subLink.url, subLink.target);
                });
                dropdownContainer.appendChild(subButton);
            });

            button.addEventListener('click', () => {
                const isExpanded = dropdownContainer.classList.toggle('show');
                arrow.innerHTML = isExpanded ? '&#9660;' : '&#9654;'; // Change arrow to down (▼) when expanded
            });

            navbarButtons.appendChild(button);
            navbarButtons.appendChild(dropdownContainer);
        } else {
            button.addEventListener('click', () => {
                window.open(url, target);
            });
            navbarButtons.appendChild(button);
        }
    });
}

// Enhanced URL-matching logic to handle subdomains and deeper paths
function isCurrentPage(url) {
    const urlWithoutTrailingSlash = currentUrl.endsWith('/')
        ? currentUrl.slice(0, -1)
        : currentUrl;

    const matchBase = urlWithoutTrailingSlash.startsWith(url);
    return matchBase || currentUrl === url;
}
