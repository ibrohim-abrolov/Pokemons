const elForm = document.querySelector(".form");
const elInput = document.querySelector(".form__input");
const elList = document.querySelector(".pokemon__list");
const pokemonFragment = document.createDocumentFragment();

const renderPokemon = function(array, node, searchValue) {
    elList.innerHTML = "";
    array.forEach(item => {
        // Creating elements
        const liElement = document.createElement("li");
        const imgElement = document.createElement("img");
        const nameElement = document.createElement("p");
        const moreInfo = document.createElement("button");
        
        // set attribute
        imgElement.setAttribute("src", item.img);
        imgElement.setAttribute("alt", item.name);
        imgElement.classList.add("pokemon-img");
        
        // textContent and adding classes
        liElement.classList.add("pokemon__items");
        nameElement.classList.add("item__name");
        moreInfo.classList.add("btn", "btn-primary", "modal-btn");
        moreInfo.textContent = "More Info";
        moreInfo.dataset.id = item.id;
        moreInfo.setAttribute("data-bs-toggle", "modal");
        moreInfo.setAttribute("data-bs-target", "#exampleModal");
        
        // Making highligth
        if(searchValue) {
            const regEx = new RegExp(searchValue, 'gi');
            const marked = item.name.replace(regEx, `<mark>$&</mark>`);
        } else {
            nameElement.innerHTML = item.name;
        }

        // Appending elements
        liElement.append(imgElement, nameElement, moreInfo);
        pokemonFragment.appendChild(liElement);
    });
    node.appendChild(pokemonFragment);
};
renderPokemon(pokemons, elList, elInput);

// Submit event
elForm.addEventListener("submit", function(evt) {
    evt.preventDefault();

    const inputValue = elInput.value.trim().toLowerCase();

    const result = pokemons.filter(function(item) {
        return item.name.toLowerCase() == inputValue;
    });
    renderPokemon(result, elList);
});


// Inputnni eshitdik
elInput.addEventListener("keyup", function() {
    const searchInputValue = elInput.value.trim().toLowerCase();

    const filtered = pokemons.filter(function(item) {
        const searchName = item.name.toLowerCase();
        return searchName.includes(searchInputValue);
    });
    renderPokemon(filtered, elList);
});

// Modal olb keldik
const modalTitle = document.querySelector(".modal-title");
const elHeight = document.querySelector(".height");
const elWeight = document.querySelector(".weight");
const elEgg = document.querySelector(".egg");
const elSpawnTime = document.querySelector(".spawn-time");

elList.addEventListener("click", (evt) => {
    if(evt.target.matches(".modal-btn")) {
        const btnId = evt.target.dataset.id;
        const foundPokemon = pokemons.find((item) => {
            return item.id == btnId;
        });
        

        modalTitle.textContent = `Spawn time: ${foundPokemon.name}`;
        elHeight.textContent = `Height: ${foundPokemon.height}`;
        elWeight.textContent = `Weight: ${foundPokemon.weight}`;
        elEgg.textContent = `Egg: ${foundPokemon.egg}`;
        elSpawnTime.textContent = `Spawn_time: ${foundPokemon.spawn_time}`;
    }
});

const sortedPokemonNames = pokemons.sort((a, b) => {
    return a.name.toLowerCase().charCodeAt(0) - b.name.toLowerCase().charCodeAt(0);
});
renderPokemon(sortedPokemonNames, elList);