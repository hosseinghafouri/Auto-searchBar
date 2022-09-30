const $ = document;

import sugg from "./datas.js";

let autoCompleteWrapper = $.querySelector('.search-box');
let searchInputElem = $.querySelector('.search-input');
let autoCompleteBox = $.querySelector('.autocom-box');

searchInputElem.addEventListener('keyup', () => {
    let searchValue = searchInputElem.value;

    if (searchValue) {
        autoCompleteWrapper.classList.add("active");

        let filteredWords = sugg.filter(word => word.toLowerCase().startsWith(searchValue.toLowerCase()));
        suggestionsWordGenerator(filteredWords);

    } else {
        autoCompleteWrapper.classList.remove("active");
    };

});

function suggestionsWordGenerator(wordsArray) {
    let listItemsArray = wordsArray.map((word) => {
        return '<li>' + word + '</li>';
    });

    let customListItem;
    if (!listItemsArray.length) {
        customListItem = '<li>' + searchInputElem.value + '</li>';
    } else {
        customListItem = listItemsArray.join('');
    }

    autoCompleteBox.innerHTML = customListItem;
    selectList();
};

function selectList() {
    let allListItems = autoCompleteBox.querySelectorAll("li");
    allListItems.forEach((wordItem) => {
        wordItem.addEventListener('click', (event) => {
            searchInputElem.value = event.target.textContent;
            autoCompleteWrapper.classList.remove("active");
        });
    });
};