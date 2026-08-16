// ==========================================
// NORTH STAR BAKERY - TOUCHSTONE 4 SCRIPT
// ==========================================

const bakeryItems = [
    { id: 'sourdough', name: 'Signature Sourdough Loaf', price: 8.50 },
    { id: 'croissant', name: 'All-Butter Croissant', price: 3.50 },
    { id: 'cake', name: 'Custom Celebration Tier', price: 45.00 }
];

let userFavorites = [];

// Initialize everything when the DOM loads
document.addEventListener('DOMContentLoaded', () => {
    setupInteractiveFeature();
    loadSavedPreferences();
    setupFormValidation();
});

// Interactive Feature: Wishlist / Favorite Tracker Widget
function setupInteractiveFeature() {
    const featureContainer = document.querySelector('main');
    if (!featureContainer) return;

    // Prevent duplicating if it already exists
    if (document.querySelector('.wishlist-widget')) return;

    const interactiveDiv = document.createElement('div');
    interactiveDiv.classList.add('wishlist-widget');
    interactiveDiv.style.margin = "20px 0";
    interactiveDiv.style.padding = "20px";
    interactiveDiv.style.backgroundColor = "#FFF8F0";
    interactiveDiv.style.border = "1px solid #D88C5A";
    interactiveDiv.style.borderRadius = "8px";
    
    interactiveDiv.innerHTML = `
        <h3>Quick Wishlist & Favorite Tracker</h3>
        <p>Select your favorite bakery item to save your preference:</p>
        <select id="favorite-item-select">
            <option value="">--Select an item--</option>
            <option value="Signature Sourdough Loaf">Signature Sourdough Loaf ($8.50)</option>
            <option value="All-Butter Croissant">All-Butter Croissant ($3.50)</option>
            <option value="Custom Celebration Tier">Custom Celebration Tier ($45.00+)</option>
        </select>
        <button id="save-favorite-btn" type="button" style="margin-left: 10px; padding: 5px 10px;">Save Favorite</button>
        <p id="wishlist-status" style="margin-top: 10px; font-weight: bold; color: #6B3E26;"></p>
    `;
    
    featureContainer.appendChild(interactiveDiv);

    const saveBtn = document.getElementById('save-favorite-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', handleFavoriteSelection);
    }
}

// Handle user selection and save to localStorage
function handleFavoriteSelection() {
    const selectElement = document.getElementById('favorite-item-select');
    const statusDisplay = document.getElementById('wishlist-status');
    
    if (!selectElement || !statusDisplay) return;
    
    const selectedValue = selectElement.value;

    if (selectedValue === "") {
        statusDisplay.textContent = "Please select a valid item before saving.";
        statusDisplay.style.color = "firebrick";
        return;
    }

    userFavorites.push(selectedValue);
    localStorage.setItem('northStarFavorite', selectedValue);

    statusDisplay.textContent = `Success! "${selectedValue}" has been saved to your browser preferences.`;
    statusDisplay.style.color = "#2F2A26";
}

// Load stored preferences on page load or refresh
function loadSavedPreferences() {
    const savedFavorite = localStorage.getItem('northStarFavorite');
    const statusDisplay = document.getElementById('wishlist-status');
    const selectElement = document.getElementById('favorite-item-select');

    if (savedFavorite) {
        if (!userFavorites.includes(savedFavorite)) {
            userFavorites.push(savedFavorite);
        }
        if (statusDisplay) {
            statusDisplay.textContent = `Welcome back! Your saved favorite item is: ${savedFavorite}`;
            statusDisplay.style.color = "#2F2A26";
        }
        if (selectElement) {
            selectElement.value = savedFavorite;
        }
    }
}

// Form Validation Logic
function setupFormValidation() {
    const form = document.querySelector('form');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    if (!nameInput || !emailInput) return;

    const nameError = createErrorElement('name-error');
    const emailError = createErrorElement('email-error');

    nameInput.parentNode.appendChild(nameError);
    emailInput.parentNode.appendChild(emailError);

    form.addEventListener('submit', (event) => {
        let isValid = true;

        if (nameInput.value.trim().length < 2) {
            nameError.textContent = "Error: Full name must be at least 2 characters long.";
            isValid = false;
        } else {
            nameError.textContent = "";
            localStorage.setItem('northStarUserName', nameInput.value.trim());
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            emailError.textContent = "Error: Please enter a valid email address (e.g., name@example.com).";
            isValid = false;
        } else {
            emailError.textContent = "";
        }

        if (!isValid) {
            event.preventDefault();
        }
    });
}

// Helper to generate error elements
function createErrorElement(id) {
    let existing = document.getElementById(id);
    if (existing) return existing;

    const small = document.createElement('small');
    small.id = id;
    small.style.color = "firebrick";
    small.style.display = "block";
    small.style.marginTop = "4px";
    return small;
}
