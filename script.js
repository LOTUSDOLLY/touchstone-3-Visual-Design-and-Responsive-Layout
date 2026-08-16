// ==========================================
// NORTH STAR BAKERY - TOUCHSTONE 4 SCRIPT
// ==========================================

// Arrays and Objects to manage data (Advanced Requirement)
const bakeryItems = [
    { id: 'sourdough', name: 'Signature Sourdough Loaf', price: 8.50 },
    { id: 'croissant', name: 'All-Butter Croissant', price: 3.50 },
    { id: 'cake', name: 'Custom Celebration Tier', price: 45.00 }
];

let userFavorites = [];

// Function 1: Initialize page and load stored data
document.addEventListener('DOMContentLoaded', () => {
    loadSavedPreferences();
    setupInteractiveFeature();
    setupFormValidation();
});

// Function 2: Interactive Feature (Product Favorites / Wishlist Tracker)
function setupInteractiveFeature() {
    const featureContainer = document.querySelector('main');
    if (!featureContainer) return;

    // Create a dynamic wishlist section on the products or home page
    const interactiveDiv = document.createElement('div');
    interactiveDiv.classList.add('wishlist-widget');
    interactiveDiv.innerHTML = `
        <h3>Quick Wishlist & Favorite Tracker</h3>
        <p>Select your favorite bakery item to save your preference:</p>
        <select id="favorite-item-select">
            <option value="">--Select an item--</option>
            <option value="Signature Sourdough Loaf">Signature Sourdough Loaf ($8.50)</option>
            <option value="All-Butter Croissant">All-Butter Croissant ($3.50)</option>
            <option value="Custom Celebration Tier">Custom Celebration Tier ($45.00+)</option>
        </select>
        <button id="save-favorite-btn" type="button">Save Favorite</button>
        <p id="wishlist-status" style="margin-top: 10px; font-weight: bold; color: #6B3E26;"></p>
    `;
    
    // Append feature to main content
    featureContainer.appendChild(interactiveDiv);

    const saveBtn = document.getElementById('save-favorite-btn');
    saveBtn.addEventListener('click', handleFavoriteSelection);
}

// Function 3: Handle user interaction and dynamic page update
function handleFavoriteSelection() {
    const selectElement = document.getElementById('favorite-item-select');
    const statusDisplay = document.getElementById('wishlist-status');
    const selectedValue = selectElement.value;

    if (selectedValue === "") {
        statusDisplay.textContent = "Please select a valid item before saving.";
        statusDisplay.style.color = "firebrick";
        return;
    }

    // Add to array
    userFavorites.push(selectedValue);

    // Save to localStorage (Browser Storage Requirement)
    localStorage.setItem('northStarFavorite', selectedValue);

    // Dynamic Page Update
    statusDisplay.textContent = `Success! "${selectedValue}" has been saved to your browser preferences.`;
    statusDisplay.style.color = "#2F2A26";
}

// Function 4: Load stored data from browser storage
function loadSavedPreferences() {
    const savedFavorite = localStorage.getItem('northStarFavorite');
    const statusDisplay = document.getElementById('wishlist-status');
    const selectElement = document.getElementById('favorite-item-select');
    const nameInput = document.getElementById('name');

    if (savedFavorite) {
        userFavorites.push(savedFavorite);
        if (statusDisplay) {
            statusDisplay.textContent = `Welcome back! Your saved favorite item is: ${savedFavorite}`;
        }
        if (selectElement) {
            selectElement.value = savedFavorite;
        }
    }

    // Bonus: Pre-fill a form field if applicable
    const savedName = localStorage.getItem('northStarUserName');
    if (nameInput && savedName) {
        nameInput.value = savedName;
    }
}

// Function 5: Form Validation Logic
function setupFormValidation() {
    const form = document.querySelector('form');
    if (!form) return;

    // Create error message containers dynamically near fields
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    const nameError = createErrorElement('name-error');
    const emailError = createErrorElement('email-error');

    nameInput.parentNode.appendChild(nameError);
    emailInput.parentNode.appendChild(emailError);

    form.addEventListener('submit', (event) => {
        let isValid = true;

        // Validation Check 1: Required & Length Check for Name
        if (nameInput.value.trim().length < 2) {
            nameError.textContent = "Error: Full name must be at least 2 characters long.";
            isValid = false;
        } else {
            nameError.textContent = "";
            // Save username to storage for UX improvement
            localStorage.setItem('northStarUserName', nameInput.value.trim());
        }

        // Validation Check 2: Email Format Validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            emailError.textContent = "Error: Please enter a valid email address (e.g., name@example.com).";
            isValid = false;
        } else {
            emailError.textContent = "";
        }

        // Prevent submission if invalid
        if (!isValid) {
            event.preventDefault();
        }
    });
}

// Helper function to generate error feedback elements
function createErrorElement(id) {
    const small = document.createElement('small');
    small.id = id;
    small.style.color = "firebrick";
    small.style.display = "block";
    small.style.marginTop = "4px";
    return small;
}
