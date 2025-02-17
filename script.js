// Sample restaurant data (this would ideally be fetched from a database or API)
const restaurants = [
    { name: 'Pizza Place', category: 'Pizza', image: 'https://ilforno.me/wp-content/uploads/2023/09/best-pizza-in-abu-dhabi.webp', description: 'Best pizza by Anshu Pizza wala!' },
    { name: 'The Coffee Shop', category: 'Cafe', image: 'https://chaingupshup.com/wp-content/uploads/2024/06/coffee-ai-generated-scaled.jpg', description: 'Cozy and comfy coffee experience.' },
    { name: 'Spicy Kitchen', category: 'Restaurant', image: 'https://spicykitchen.in/images/demo/slides/slide-image-02.jpg', description: 'Delicious spicy food for every taste.' },
    { name: 'Burger Shack', category: 'Restaurant', image: 'https://content.jdmagicbox.com/v2/comp/mumbai/q4/022pxx22.xx22.211113120716.q9q4/catalogue/jumboking-indian-burger-vashi-navi-mumbai-burger-joints-0f1khy3kzl-250.jpg', description: 'Indian Marvel Burgers.' },
    { name: 'Pasta World', category: 'Pizza', image: 'https://www.crunchykitchen.com/wp-content/uploads/2020/11/Masala-Macaroni-re.jpg', description: 'Taste the best pasta in town!' },
    { name: 'Cafe Latte', category: 'Cafe', image: 'https://c.ndtvimg.com/2022-12/l0i0d5b8_indian-snacks_625x300_19_December_22.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=738', description: 'Fresh coffee and snacks.' },
];

// Variables for the dynamic elements
const restaurantList = document.querySelector('.categories');
const searchInput = document.querySelector('.hero .search-form input');
const categoryFilters = document.querySelectorAll('.category');

// Function to render restaurants based on search and filter
function renderRestaurants(filter = '', search = '') {
    restaurantList.innerHTML = ''; // Clear the existing list

    const filteredRestaurants = restaurants.filter(restaurant => {
        const matchesCategory = filter ? restaurant.category.toLowerCase() === filter.toLowerCase() : true;
        const matchesSearch = restaurant.name.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Render filtered restaurants
    filteredRestaurants.forEach(restaurant => {
        const restaurantCard = document.createElement('div');
        restaurantCard.classList.add('category');
        restaurantCard.innerHTML = `
            <img src="${restaurant.image}" alt="${restaurant.name}" class="category-img">
            <p>${restaurant.name}</p>
            <p>${restaurant.description}</p>
        `;
        restaurantList.appendChild(restaurantCard);
    });

    if (filteredRestaurants.length === 0) {
        restaurantList.innerHTML = `<p>No restaurants found.</p>`;
    }
}

// Event listener for search input
searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value;
    const selectedCategory = document.querySelector('.category.selected');
    const filter = selectedCategory ? selectedCategory.dataset.category : '';
    renderRestaurants(filter, searchValue);
});

// Event listener for category filter buttons
categoryFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        categoryFilters.forEach(cat => cat.classList.remove('selected')); // Remove selected class from all
        filter.classList.add('selected'); // Add selected class to clicked category
        const filterCategory = filter.dataset.category;
        renderRestaurants(filterCategory, searchInput.value); // Re-render with selected filter
    });
});

// Initial render with all restaurants
renderRestaurants();
