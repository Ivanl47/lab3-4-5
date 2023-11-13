class Bicycle {
    constructor(brand, name, price, country, image) {
        this.brand = brand;
        this.name = name;
        this.price = price;
        this.country = country;
        this.image = image;
    }
}

const bicyclesData = [
    new Bicycle('Forward', 'a8', 800, 'UK', './img/download.jpg'),
    new Bicycle('Ivan', 'a7', 700, 'UK', './img/download.jpg'),
];

let filteredBicycles = bicyclesData;

function renderBicycles(filteredBicycles) {
    const BicycleList = document.getElementById('bicycle-list');
    BicycleList.innerHTML = '';

    filteredBicycles.forEach((Bicycle, index) => {
        const BicycleItem = document.createElement('div');
        BicycleItem.classList.add('Bicycle-item');
        BicycleItem.innerHTML = `
            <img src="${Bicycle.image}" alt="${Bicycle.brand} ${Bicycle.name}" width="200">
            <p>Бренд: ${Bicycle.brand}</p>
            <p>Назва: ${Bicycle.name}</p>
            <p>Ціна: ${Bicycle.price}₴</p>
            <p>Країна: ${Bicycle.country}</p>
            <button class="edit-button" data-index="${index}">Редагувати</button>
        `;
        BicycleList.appendChild(BicycleItem);

        const editButton = BicycleItem.querySelector('.edit-button');

        editButton.addEventListener('click', () => {
            openEditModal(bicyclesData[index]);
        });
    });
}

console.log("1");
renderBicycles(filteredBicycles);

function searchBicyclesByName(searchTerm) {
    const filteredBicycles = bicyclesData.filter((bicycle) => {
        return bicycle.name.includes(searchTerm);
    });

    renderBicycles(filteredBicycles);
}

document.getElementById("search-button").addEventListener("click", () => {
    const searchTerm = document.getElementById("search-input").value;
    searchBicyclesByName(searchTerm);
});

const cancelSearchButton = document.getElementById("cancel-search-button");

cancelSearchButton.addEventListener("click", () => {
    document.getElementById('search-input').value = "";
    filteredBicycles = bicyclesData;
    renderBicycles(filteredBicycles);
    calculateTotalPrice();
});

document.getElementById('sort-by-price').addEventListener('click', () => {
    const sortedBicycles = [...filteredBicycles].sort((a, b) => a.price - b.price);
    renderBicycles(sortedBicycles);
});

document.getElementById('sort-by-brand').addEventListener('click', () => {
    const sortedBicycles = [...filteredBicycles].sort((a, b) => a.brand.localeCompare(b.brand));
    renderBicycles(sortedBicycles);
});

function calculateTotalPrice() {
    const totalAmount = filteredBicycles.reduce((total, Bicycle) => total + Bicycle.price, 0);
    document.getElementById('total-amount').textContent = totalAmount;
}

calculateTotalPrice();

// відкриття модального вікна для додавання товару
function openCreateModal() {
    const createModal = document.getElementById("create-modal");
    createModal.style.display = "block";
}

// додати слухача події для кнопки "Додати товар"
document.getElementById("open-create-modal-button").addEventListener("click", openCreateModal);

// додавання нового товару
function createBicycle() {
    const brand = document.getElementById("create-brand").value;
    const name = document.getElementById("create-name").value;
    const price = parseFloat(document.getElementById("create-price").value);
    const country = document.getElementById("create-country").value;
    const image = document.getElementById("create-image").value;

    const newBicycle = new Bicycle(brand, name, price, country, image);
    bicyclesData.push(newBicycle);

    closeModalCreate();

    renderBicycles(bicyclesData);
    calculateTotalPrice();
}

// Додавання слухача події для кнопки "зберегти" в модальному вікні для додавання товару
document.getElementById("create-modal-form").addEventListener("submit", function (event) {
    event.preventDefault();
    createBicycle();
});

//закриття модального вікна для додавання товару
function closeModalCreate() {
    const createModal = document.getElementById("create-modal");
    createModal.style.display = "none";
}

//функцію для закриття модального вікна для редагування товару
function closeModalEdit() {
    const editModal = document.getElementById("edit-modal");
    editModal.style.display = "none";
}

//додавання слухачі подій для закриття модальних вікон
document.getElementById("close-create-modal").addEventListener("click", closeModalCreate);
document.getElementById("close-edit-modal").addEventListener("click", closeModalEdit);

// відкриття модального вікна для редагування товару
// відкриття модального вікна для редагування товару
// відкриття модального вікна для редагування товару
// відкриття модального вікна для редагування товару
function openEditModal(bicycle) {
    const editModal = document.getElementById("edit-modal");
    editModal.style.display = "block";
    console.log("3");
    // редагування
    document.getElementById("edit-brand").value = bicycle.brand;
    document.getElementById("edit-name").value = bicycle.name;
    document.getElementById("edit-price").value = bicycle.price;
    document.getElementById("edit-country").value = bicycle.country;
    document.getElementById("edit-image").value = bicycle.image;
   
    //обробник події для збереження редагованого товару
    document.getElementById("edit-modal-form").addEventListener("submit", function (event) {
        event.preventDefault();
        saveEditedBicycle(bicycle);
    });

    
    function saveEditedBicycle(bicycle) {
        // оновлення редагування
        bicycle.brand = document.getElementById("edit-brand").value;
        bicycle.name = document.getElementById("edit-name").value;
        bicycle.price = parseFloat(document.getElementById("edit-price").value);
        bicycle.country = document.getElementById("edit-country").value;
        bicycle.image = document.getElementById("edit-image").value;

        closeModalEdit();

        renderBicycles(filteredBicycles);
        calculateTotalPrice();
    }
}

//обробник події для кнопки "зберегти зміни" в модальному вікні для редагування товару
document.getElementById("save-edit-button").addEventListener("click", saveEditedBicycle);

//функція для закриття модального вікна для редагування товару
function closeModalEdit() {
    const editModal = document.getElementById("edit-modal");
    editModal.style.display = "none";
}
