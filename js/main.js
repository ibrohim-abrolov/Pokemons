let elForm = document.querySelector(".form");
let elInput = document.querySelector(".form__input");
let elList = document.querySelector(".pokemon__list");

let renderPokemon = function(array) {
    elList.innerHTML = "";
    array.forEach(item => {
        let liElement = document.createElement("li");
        let imgElement = document.createElement("img");
        let nameElement = document.createElement("p");
        // let weightElement = document.createElement("p");
        // let heightElement = document.createElement("p");
        // let eggElement = document.createElement("p");
        // let spawnElement = document.createElement("p");
        let moreInfo = document.createElement("button");

        
        // set attribute
        imgElement.setAttribute("src", item.img);
        imgElement.setAttribute("alt", item.name);
        imgElement.classList.add("pokemon-img");
        
        // textContentga, classlist qoshdik
        liElement.classList.add("pokemon__items");
        // weightElement.textContent = `Weight: ${item.weight}`;
        // weightElement.classList.add("item__weight");
        // heightElement.textContent = `Height: ${item.height}`;
        // heightElement.classList.add("item__height");
        // eggElement.textContent = `Egg: ${item.egg}`;
        // eggElement.classList.add("item__egg");
        // spawnElement.textContent = `Spawn time: ${item.spawn_time}`;
        // spawnElement.classList.add("item__spawn");
        nameElement.textContent = item.name;
        nameElement.classList.add("item__name");
        moreInfo.classList.add("btn", "btn-primary", "modal-btn");
        moreInfo.textContent = "More Info";


        moreInfo.dataset.id = item.id;
        moreInfo.setAttribute("data-bs-toggle", "modal");
        moreInfo.setAttribute("data-bs-target", "#exampleModal");

        // LIga ichidegilarni qoshib chqamiz
        // liElement.append(imgElement, nameElement, weightElement, heightElement);
        // liElement.append(eggElement, spawnElement);
        liElement.append(imgElement, nameElement, moreInfo);
        elList.appendChild(liElement);
    });
};

renderPokemon(pokemons);

// Submit qldik
elForm.addEventListener("submit", function(evt) {
    evt.preventDefault();

    let inputValue = elInput.value.trim().toLowerCase();

    let result = pokemons.filter(function(item) {
        return item.name.toLowerCase() == inputValue;
    });

    renderPokemon(result);
});


// Inputnni eshitdik
elInput.addEventListener("keyup", function() {
    let searchInputValue = elInput.value.trim().toLowerCase();

    let filtered = pokemons.filter(function(item) {
        let searchName = item.name.toLowerCase();
        return searchName.includes(searchInputValue);
    });
    renderPokemon(filtered);
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
renderPokemon(sortedPokemonNames);