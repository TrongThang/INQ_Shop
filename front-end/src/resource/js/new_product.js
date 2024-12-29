const container_product_best_seller = document.querySelector('.product-container-best-seller'); // Container for best seller products
const container_product_new = document.querySelector('.product-container-new'); // Container for new products
const items_prodcut_best_seller = document.querySelectorAll('.product-items-best-seller');
const items_prodcut_new = document.querySelectorAll('.product-items-new'); // All product items in the new products section
const btnNext = document.querySelector('.next-btn'); // "Next" button for sliding right
const btnPrev = document.querySelector('.prev-btn'); // "Previous" button for sliding left
const btnPrev_new = document.querySelector('.prev-btn-new'); // "Previous" button for sliding left (new products)
const btnNext_new = document.querySelector('.next-btn-new'); // "Next" button for sliding right (new products)

// Calculate the width of each product item (including gap between them)
const itemWidth_best_seller = items_prodcut_best_seller[0].offsetWidth + parseInt(getComputedStyle(container_product_best_seller).gap || 0);
const itemWidth_new = items_prodcut_new[0].offsetWidth + parseInt(getComputedStyle(container_product_new).gap || 0);

let scrollPosition_best_seller = 0; // Current scroll position for best seller products
let scrollPosition_new = 0; // Current scroll position for new products

// Function to update the visibility of the buttons
function updateButtonVisibility() {
    const maxScrollLeft_best_seller = container_product_best_seller.scrollWidth - container_product_best_seller.clientWidth;
    const maxScrollLeft_new = container_product_new.scrollWidth - container_product_new.clientWidth;

    // Update buttons for best seller section
    if (scrollPosition_best_seller <= 0) {
        btnPrev.classList.add('hidden'); // Hide "Previous" button if scrolled to the start
    } else {
        btnPrev.classList.remove('hidden');
    }

    if (scrollPosition_best_seller >= maxScrollLeft_best_seller) {
        btnNext.classList.add('hidden'); // Hide "Next" button if scrolled to the end
    } else {
        btnNext.classList.remove('hidden');
    }

    // Update buttons for new product section
    if (scrollPosition_new <= 0) {
        btnPrev_new.classList.add('hidden'); // Hide "Previous" button if scrolled to the start
    } else {
        btnPrev_new.classList.remove('hidden');
    }

    if (scrollPosition_new >= maxScrollLeft_new) {
        btnNext_new.classList.add('hidden'); // Hide "Next" button if scrolled to the end
    } else {
        btnNext_new.classList.remove('hidden');
    }
}

// Event listener for "Next" button click (scroll to the right for best seller products)
btnNext.addEventListener('click', () => {
    scrollPosition_best_seller += itemWidth_best_seller; // Move by one product width
    const maxScrollLeft_best_seller = container_product_best_seller.scrollWidth - container_product_best_seller.clientWidth;
    if (scrollPosition_best_seller > maxScrollLeft_best_seller) {
        scrollPosition_best_seller = maxScrollLeft_best_seller; // Prevent scrolling beyond the last product
    }
    container_product_best_seller.scrollTo({
        left: scrollPosition_best_seller,
        behavior: 'smooth',
    });
    updateButtonVisibility(); // Update button visibility after scrolling
});

// Event listener for "Next" button click (scroll to the right for new products)
btnNext_new.addEventListener('click', () => {
    scrollPosition_new += itemWidth_new; // Move by one product width
    const maxScrollLeft_new = container_product_new.scrollWidth - container_product_new.clientWidth;
    if (scrollPosition_new > maxScrollLeft_new) {
        scrollPosition_new = maxScrollLeft_new; // Prevent scrolling beyond the last product
    }
    container_product_new.scrollTo({
        left: scrollPosition_new,
        behavior: 'smooth',
    });
    updateButtonVisibility(); // Update button visibility after scrolling
});

// Event listener for "Previous" button click (scroll to the left for best seller products)
btnPrev.addEventListener('click', () => {
    scrollPosition_best_seller -= itemWidth_best_seller; // Move back by one product width
    if (scrollPosition_best_seller < 0) {
        scrollPosition_best_seller = 0; // Prevent scrolling beyond the first product
    }
    container_product_best_seller.scrollTo({
        left: scrollPosition_best_seller,
        behavior: 'smooth',
    });
    updateButtonVisibility(); // Update button visibility after scrolling
});

// Event listener for "Previous" button click (scroll to the left for new products)
btnPrev_new.addEventListener('click', () => {
    scrollPosition_new -= itemWidth_new; // Move back by one product width
    if (scrollPosition_new < 0) {
        scrollPosition_new = 0; // Prevent scrolling beyond the first product
    }
    container_product_new.scrollTo({
        left: scrollPosition_new,
        behavior: 'smooth',
    });
    updateButtonVisibility(); // Update button visibility after scrolling
});

// Initialize button visibility when the page loads
updateButtonVisibility();
