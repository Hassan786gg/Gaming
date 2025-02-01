// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile Navigation Toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Sample data for search
// Selectors
const searchBox = document.getElementById('search-box');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');

// Function to collect project data from the DOM
function getProjectsFromDOM() {
    const projectElements = document.querySelectorAll('.project-item'); // Assuming projects have a class "project-item"
    const projects = [];

    projectElements.forEach(project => {
        const name = project.querySelector('.project-name').textContent.trim(); // Assuming project name is inside an element with class "project-name"
        const description = project.querySelector('.project-description')?.textContent.trim() || 'This is battle royal game'; // Optional description
        const link = project.querySelector('a')?.href || ''; // Optional link
        projects.push({ name, description, link });
    });

    return projects;
}

// Function to filter and display results
function performSearch(query) {
    searchResults.innerHTML = ''; // Clear previous results

    if (!query.trim()) {
        searchResults.innerHTML = '<li>No results found. Please enter a keyword.</li>';
        return;
    }

    const projects = getProjectsFromDOM();
    const results = projects.filter(project =>
        project.name.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase())
    );

    if (results.length === 0) {
        searchResults.innerHTML = '<li>No results found for your query.</li>';
        return;
    }

    results.forEach(project => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${project.name}</strong>: ${project.description} 
                              <a href="${project.link}" target="_blank">View</a>`;
        searchResults.appendChild(listItem);
    });
}

// Event Listeners
searchButton.addEventListener('click', () => {
    const query = searchBox.value;
    performSearch(query);
});

searchBox.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        performSearch(event.target.value);
    }
});

// BGMI Download Functionality
function downloadBGMI() {
    const link = document.createElement('a');
    link.href = 'https://apkdownload.battlegroundsmobileindia.com/bgmi_3_6_0_19518.apk'; // Replace with actual APK link
    link.download = 'bgmi_3_6_0_19518.apk';
    link.click();
   // alert('Your download will begin shortly.');
}

function downloadedBGMI() {
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/file/d/12Y9oOjeXHkpeLec-11orLm653R2-2j2p/view?usp=drivesdk'; // Replace with actual APK link
    link.download = 'BGMI.apk';
    link.click();
   // alert('Your download will begin shortly.');
}

// PUBG Download Functionality
function downloadPUBG() {
    const link = document.createElement('a');
    link.href = 'https://f.gbcass.com/PUBGMOBILE_Global_3.6.0_uawebsite_livik01_D5903474E.apk'; // Replace with actual APK link
    link.download = 'PUBGMOBILE_Global_3.6.0_uawebsite_livik01_D5903474E.apk';
    link.click();
   // alert('Your download will begin shortly.');
}

function downloadedPUBG() {
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/file/d/17NGbvTmqNkDE3ho8GAXdJh3Kqe7nff0-/view?usp=drivesdk'; // Replace with actual APK link
    link.download = 'PUBGM GL🌍 3.6.0 Custom Menu 32BIT.apk';
    link.click();
   // alert('Your download will begin shortly.');
}

// Contact Form Validation and Modal
const contactForm = document.getElementById('contact-form');
const confirmationModal = document.getElementById('confirmation-modal');
const closeModalButton = document.getElementById('close-modal');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    confirmationModal.style.display = 'flex';
});

closeModalButton.addEventListener('click', () => {
    confirmationModal.style.display = 'none';
});

// Currency Converter Functionality with All Country Currencies
const convertButton = document.getElementById('convert-button');
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const conversionResult = document.getElementById('conversion-result');


// Base API URL
const API_URL = 'https://v6.exchangerate-api.com/v6/7ba9ca834b2feba54a6ad5cf/latest/USD';

// Populate currency options
async function populateCurrencyOptions() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.result === 'success') {
            const currencies = Object.keys(data.conversion_rates);

            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                const option2 = document.createElement('option');

                option1.value = currency;
                option1.textContent = `${currency}`;
                option2.value = currency;
                option2.textContent = `${currency}`;

                fromCurrency.appendChild(option1);
                toCurrency.appendChild(option2);
            });

            // Set default selected currencies
            fromCurrency.value = 'USD';
            toCurrency.value = 'INR';
        } else {
            throw new Error('Failed to fetch currency list.');
        }
    } catch (error) {
        console.error('Error populating currency options:', error);
        conversionResult.textContent = 'Unable to load currencies. Try again later.';
    }
}

// Fetch exchange rates and convert currency
async function fetchExchangeRates(baseCurrency) {
    try {
        const response = await fetch(`${API_URL.replace('USD', baseCurrency)}`);
        const data = await response.json();

        if (data.result === 'success') {
            return data.conversion_rates;
        } else {
            throw new Error('Failed to fetch exchange rates.');
        }
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        conversionResult.textContent = 'Unable to fetch exchange rates. Try again later.';
        return null;
    }
}

convertButton.addEventListener('click', async () => {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || amount <= 0) {
        conversionResult.textContent = 'Please enter a valid amount.';
        return;
    }

    if (from === to) {
        conversionResult.textContent = `Converted Amount: ${amount.toFixed(2)} ${to}`;
        return;
    }

    const rates = await fetchExchangeRates(from);
    if (rates && rates[to]) {
        const convertedAmount = amount * rates[to];
        conversionResult.textContent = `Converted Amount: ${convertedAmount.toFixed(2)} ${to}`;
    } else {
        conversionResult.textContent = 'Conversion rate not available.';
    }
});

// Selectors
const reloadButton = document.getElementById('reload-button');

// Populate currency options dynamically
async function populateCurrencyOptions() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.result === 'success') {
            const currencies = Object.keys(data.conversion_rates);

            // Clear existing options
            fromCurrency.innerHTML = '';
            toCurrency.innerHTML = '';

            // Populate dropdowns
            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                const option2 = document.createElement('option');

                option1.value = currency;
                option1.textContent = currency;
                option2.value = currency;
                option2.textContent = currency;

                fromCurrency.appendChild(option1);
                toCurrency.appendChild(option2);
            });

            // Set default selected currencies
            fromCurrency.value = 'USD';
            toCurrency.value = 'INR';

            conversionResult.textContent = 'Exchange rates updated successfully!';
        } else {
            throw new Error('Failed to fetch currency list.');
        }
    } catch (error) {
        console.error('Error populating currency options:', error);
        conversionResult.textContent = 'Unable to load currencies. Try again later.';
    }
}

// Reload button functionality
reloadButton.addEventListener('click', () => {
    conversionResult.textContent = 'Reloading exchange rates...';
    populateCurrencyOptions();
});

// Fetch rates and populate currencies on page load
populateCurrencyOptions();

// Populate currencies on page load
populateCurrencyOptions();