/**
 * UniMart - Main JavaScript File
 *
 * This file contains the core client-side functionality for the UniMart application.
 * As a senior developer, my approach is to write clean, efficient, and well-documented code
 * that is easy to understand, maintain, and scale.
 */

// ===================================================================================
// I. DATA STORE - Mock Product Data
// ===================================================================================
// In a real-world application, this data would come from a database via an API.
// For now, we'll use a local array of objects (JSON-like) to simulate that.
// This makes it easy to develop the front-end without a back-end setup.
// I've included some sample products relevant to students in Ghana.
const products = [
    {
        id: 1,
        name: "Handmade Beaded Bracelet",
        seller: "Adjoa Arts",
        university: "University of Ghana, Legon",
        price: 25.00,
        image: "https://placehold.co/600x400/EAD9C8/513C2C?text=Beaded+Bracelet",
        category: "accessories",
        description: "Beautiful, handcrafted beaded bracelet made with locally sourced beads. Perfect for adding a touch of Ghanaian culture to any outfit."
    },
    {
        id: 2,
        name: "Custom Graphic T-Shirt Printing",
        seller: "Kofi's Prints",
        university: "KNUST, Kumasi",
        price: 50.00,
        image: "https://placehold.co/600x400/333/FFF?text=Custom+T-Shirt",
        category: "clothing",
        description: "Get your custom designs printed on high-quality cotton t-shirts. Ideal for clubs, events, or personal style."
    },
    {
        id: 3,
        name: "Spicy Shito Sauce",
        seller: "Mama's Kitchen UCC",
        university: "University of Cape Coast",
        price: 15.00,
        image: "https://placehold.co/600x400/8B0000/FFFFFF?text=Spicy+Shito",
        category: "food",
        description: "Authentic and delicious homemade shito. The perfect spicy companion for your kenkey, rice, or waakye."
    },
    {
        id: 4,
        name: "Academic Note-Taking Service",
        seller: "Study Hub Ashesi",
        university: "Ashesi University",
        price: 75.00,
        image: "https://placehold.co/600x400/F0F8FF/00008B?text=Notes+Service",
        category: "services",
        description: "Comprehensive and well-organized notes for major courses. Save time and boost your grades."
    },
    {
        id: 5,
        name: "Laptop Repair & Servicing",
        seller: "Tech Fix Central",
        university: "UPSA, Accra",
        price: 100.00,
        image: "https://placehold.co/600x400/4F4F4F/FFFFFF?text=Laptop+Repair",
        category: "services",
        description: "Fast and reliable laptop repair services. Screen replacement, software troubleshooting, and hardware upgrades."
    },
    {
        id: 6,
        name: "Hand-painted Canvas Art",
        seller: "Creative Soul GH",
        university: "University of Ghana, Legon",
        price: 120.00,
        image: "https://placehold.co/600x400/FFD700/000000?text=Canvas+Art",
        category: "art",
        description: "Unique, vibrant canvas paintings inspired by Ghanaian landscapes and culture. A perfect decoration for your room."
    }
];

// ===================================================================================
// II. CORE APPLICATION LOGIC
// ===================================================================================

/**
 * The DOMContentLoaded event fires when the initial HTML document has been completely
 * loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
 * This is the modern and preferred way to start executing your script, ensuring all
 * HTML elements are available to be manipulated.
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log("UniMart App Initialized. Let's build something great!");

    // Select key elements from the DOM that we will interact with.
    // Caching these selectors in variables is a performance best practice.
    const productGrid = document.getElementById('product-grid');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const navLinks = document.getElementById('nav-links');

    // --- Function Calls ---
    // We call our main functions here to set up the page.
    if (productGrid) {
        displayProducts(products, productGrid);
    }

    // --- Event Listeners ---
    // This is where we make the page interactive.
    if (mobileMenuButton && navLinks) {
        setupMobileMenu(mobileMenuButton, navLinks);
    }
});


// ===================================================================================
// III. FUNCTIONS
// ===================================================================================

/**
 * Renders a list of products into a specified container element.
 * This function dynamically creates HTML for each product, making the site data-driven.
 * @param {Array} productsToDisplay - An array of product objects to display.
 * @param {HTMLElement} container - The HTML element to inject the product cards into.
 */
function displayProducts(productsToDisplay, container) {
    // Clear any existing content in the container. This is important for filtering later.
    container.innerHTML = '';

    // Loop through each product in the array.
    productsToDisplay.forEach(product => {
        // Create a new 'div' element for the product card.
        const productCard = document.createElement('div');

        // Add CSS classes for styling. Using a consistent naming convention like BEM
        // (Block, Element, Modifier) is good practice, but for simplicity, we'll use descriptive names.
        productCard.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300';

        // Use template literals (`) to create the inner HTML. This is much cleaner
        // than concatenating strings with '+'.
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/600x400/ccc/999?text=Image+Not+Found';">
            <div class="p-4">
                <h3 class="text-lg font-bold text-gray-800">${product.name}</h3>
                <p class="text-sm text-gray-600 mt-1">${product.seller} - <span class="font-semibold">${product.university}</span></p>
                <div class="flex justify-between items-center mt-4">
                    <span class="text-xl font-bold text-indigo-600">GH₵${product.price.toFixed(2)}</span>
                    <button class="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors">
                        View Item
                    </button>
                </div>
            </div>
        `;

        // Append the newly created card to the grid container.
        container.appendChild(productCard);
    });
}

/**
 * Sets up the toggle functionality for the mobile navigation menu.
 * @param {HTMLElement} button - The button element that triggers the menu.
 * @param {HTMLElement} menu - The navigation menu element to be toggled.
 */
function setupMobileMenu(button, menu) {
    button.addEventListener('click', () => {
        // The 'toggle' method on classList is a convenient way to add a class
        // if it doesn't exist, and remove it if it does.
        menu.classList.toggle('hidden');

        // Accessibility improvement: Update ARIA attribute for screen readers.
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', !isExpanded);
    });
}


// ===================================================================================
// IV. FUTURE IDEAS & SCALABILITY
// ===================================================================================
/*
    As we build out UniMart, we can add more functionality here:
    1.  Product Filtering: A function to filter products by university, category, or price.
        - We would add event listeners to filter controls (like dropdowns or checkboxes).
        - These listeners would call `displayProducts()` with a filtered version of the `products` array.
    2.  Product Modal: When a user clicks "View Item", show a pop-up (modal) with more details
        instead of navigating to a new page. This feels more modern and is faster.
    3.  Search Functionality: An input field that filters products in real-time as the user types.
    4.  Shopping Cart: A more complex feature involving state management to keep track of items
        the user wants to buy. We could store the cart in `localStorage`.
    5.  API Integration: Replace the mock `products` array with `fetch()` calls to a real backend API
        to get live data from a database.
*/
