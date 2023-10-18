const cancelFindButton = document.getElementById("cancel_find_button");
const findInput = document.getElementById("find_input");

let bicycles = [];

class Bicycle {
    constructor(brand, model, price, color, image) {
        this.brand = brand;
        this.model = model;
        this.price = price;
        this.color = color;
        this.image = image;
    }
}

const bicyclesData = [
    new Bicycle('Forward', 'a8', 800, 'Black', './images/download.jpg'),
]

let filteredBicycles = bicyclesData;

function renderBicycles(bicycles) {
    const bicycleList = document.getElementById('bicycles-');
    bicycleList.innerHTML = '';

    bicycles.forEach(cycle => {
        const bicycleItem = document.createElement('div');
        bicycleItem.classList.add('bicycle-item');
        bicycleItem.innerHTML = `
            <img src="${cycle.image}" alt="${cycle.brand} ${cycle.model}" width="200">
            <p>Бренд: ${cycle.brand}</p>
            <p>Модель: ${cycle.model}</p>
            <p>Ціна: $${cycle.price}</p>
        `;
        bicycleList.appendChild(bicycleItem);
    });
    filteredBicycles = bicycles;
}

renderBicycles(filteredBicycles);

const cancelSearchButton = document.getElementById("cancel-search-button");

cancelSearchButton.addEventListener("click", () => {
    renderBicycles(bicyclesData);
    calculateTotalPrice();
    document.getElementById('search-input').value = "";
});

document.getElementById('sort-by-price').addEventListener('click', () => {
    const sortedBicycles = [...filteredBicycles].sort((a, b) => a.price - b.price);
    renderBicycles(sortedBicycles);
});

document.getElementById('sort-by-brand').addEventListener('click', () => {
    const sortedBicycles = [...filteredBicycles].sort((a, b) => a.brand.localeCompare(b.brand));
    renderBicycles(sortedBicycles);
});

document.getElementById('search-button').addEventListener('click', () => {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredBicycles = filteredBicycles.filter(bicycle =>
        bicycle.brand.toLowerCase().includes(searchTerm) ||
        bicycle.model.toLowerCase().includes(searchTerm)
    );
    renderBicycles(filteredBicycles);

    calculateTotalPrice();
});

function calculateTotalPrice() {
    const totalAmount = filteredBicycles.reduce((total, bicycle) => total + +bicycle.price, 0);
    document.getElementById('total-amount').textContent = totalAmount;
}

calculateTotalPrice();